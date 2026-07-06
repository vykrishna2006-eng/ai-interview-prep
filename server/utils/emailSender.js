const axios = require('axios');
const fs = require('fs');

// Render's free tier blocks outbound SMTP ports (25/465/587), which is why
// nodemailer + Gmail SMTP times out in production even with correct
// credentials. Brevo's API sends over plain HTTPS (port 443), so it works
// on Render's free tier without any firewall issues.
const BREVO_API_KEY = (process.env.BREVO_API_KEY || '').trim();
const emailUser = (process.env.EMAIL_USER || '').trim(); // must be a Brevo-verified sender

if (!BREVO_API_KEY || !emailUser) {
  console.warn('⚠️  BREVO_API_KEY or EMAIL_USER is missing — report emails will fail.');
}

const sendTestReportEmail = async (user, testResult, pdfPath) => {
  const sectionRows = testResult.sectionResults.map(s =>
    `<tr>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;">${s.skill}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;">${s.score}/${s.maxScore}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;color:${s.percentage >= 70 ? '#10B981' : s.percentage >= 50 ? '#F59E0B' : '#EF4444'}">
        ${s.percentage}%
      </td>
    </tr>`
  ).join('');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8"><title>Test Report</title></head>
    <body style="font-family:'Segoe UI',Arial,sans-serif;background:#f4f4f8;margin:0;padding:0;">
      <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(108,99,255,0.12);">

        <!-- Header -->
        <div style="background:linear-gradient(135deg,#6C63FF,#4F46E5);padding:40px 40px 30px;">
          <h1 style="color:#fff;margin:0;font-size:28px;">InterviewGen AI</h1>
          <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:16px;">Your Interview Test Report is Ready!</p>
        </div>

        <!-- Body -->
        <div style="padding:40px;">
          <h2 style="color:#1a1a2e;margin:0 0 6px;">Hello ${user.name} 👋</h2>
          <p style="color:#6B7280;margin:0 0 30px;">You have successfully completed your interview test. Here's your performance summary:</p>

          <!-- Overall Score -->
          <div style="background:linear-gradient(135deg,#6C63FF15,#4F46E515);border:2px solid #6C63FF;border-radius:12px;padding:20px 24px;margin-bottom:30px;text-align:center;">
            <p style="color:#6C63FF;font-size:14px;font-weight:600;margin:0 0 8px;text-transform:uppercase;letter-spacing:1px;">Overall Score</p>
            <h1 style="color:#1a1a2e;font-size:56px;margin:0;">${testResult.overallPercentage}%</h1>
            <p style="color:#6B7280;margin:8px 0 0;">${testResult.correct} of ${testResult.totalQuestions} questions correct</p>
          </div>

          <!-- Section Results -->
          <h3 style="color:#1a1a2e;margin:0 0 16px;">Section-wise Performance</h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:30px;">
            <thead>
              <tr style="background:#f9fafb;">
                <th style="padding:10px 12px;text-align:left;color:#374151;font-size:13px;border-bottom:2px solid #e5e7eb;">Section</th>
                <th style="padding:10px 12px;text-align:left;color:#374151;font-size:13px;border-bottom:2px solid #e5e7eb;">Score</th>
                <th style="padding:10px 12px;text-align:left;color:#374151;font-size:13px;border-bottom:2px solid #e5e7eb;">Percentage</th>
              </tr>
            </thead>
            <tbody>${sectionRows}</tbody>
          </table>

          <p style="color:#6B7280;font-size:14px;margin:0 0 24px;">📎 The detailed PDF report with all questions, your answers, ideal answers, and AI feedback is attached to this email.</p>

          <a href="${process.env.CLIENT_URL}/dashboard"
             style="display:inline-block;background:linear-gradient(135deg,#6C63FF,#4F46E5);color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;">
            View Dashboard →
          </a>
        </div>

        <!-- Footer -->
        <div style="background:#f9fafb;padding:20px 40px;text-align:center;border-top:1px solid #e5e7eb;">
          <p style="color:#9CA3AF;font-size:13px;margin:0;">
            InterviewGen AI • Smart Resume Analyzer & Interview Preparation<br>
            <a href="${process.env.CLIENT_URL}" style="color:#6C63FF;">interviewgen.ai</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  const payload = {
    sender: { name: 'InterviewGen AI', email: emailUser },
    to: [{ email: user.email, name: user.name }],
    subject: '🎯 Your Interview Test Report – InterviewGen AI',
    htmlContent
  };

  // Attach PDF as base64, same as before, but Brevo's API takes attachments
  // as base64 content rather than a file path.
  if (pdfPath && fs.existsSync(pdfPath)) {
    const pdfBase64 = fs.readFileSync(pdfPath).toString('base64');
    payload.attachment = [
      {
        content: pdfBase64,
        name: `InterviewReport_${user.name.replace(' ', '_')}.pdf`
      }
    ];
  }

  try {
    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      payload,
      {
        headers: {
          'api-key': BREVO_API_KEY,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );
    return response.data;
  } catch (err) {
    // Surface Brevo's actual error message (e.g. unverified sender, bad key)
    // instead of a generic axios error, since that's usually the real cause.
    const brevoError = err.response?.data?.message || err.message;
    console.error('❌ Brevo email send FAILED:', brevoError);
    throw new Error(`Email send failed: ${brevoError}`);
  }
};

module.exports = { sendTestReportEmail };
