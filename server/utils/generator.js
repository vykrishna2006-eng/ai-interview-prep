const fs = require("fs");
const path = require("path");

const {
    Document,
    Packer,
    Paragraph,
    TextRun,
    AlignmentType,
    BorderStyle,
    ExternalHyperlink,
    UnderlineType,
    Footer,
    PageNumber
} = require("docx");

// ==========================================
// Create Upload Folder
// ==========================================

const resumeFolder = path.join(
    __dirname,
    "..",
    "uploads",
    "resumes"
);

if (!fs.existsSync(resumeFolder)) {
    fs.mkdirSync(resumeFolder, { recursive: true });
}

// ==========================================
// Helper: Divider
// ==========================================

function divider() {
    return new Paragraph({
        border: {
            bottom: {
                style: BorderStyle.SINGLE,
                color: "D9D9D9",
                size: 2
            }
        },
        spacing: {
            after: 120
        }
    });
}

// ==========================================
// Helper: Section Heading
// ==========================================

function sectionHeading(title) {
    return new Paragraph({
        spacing: {
            before: 220,
            after: 100
        },
        border: {
            bottom: {
                style: BorderStyle.SINGLE,
                color: "1E40AF",
                size: 4
            }
        },
        children: [
            new TextRun({
                text: title.toUpperCase(),
                bold: true,
                color: "1E40AF",
                size: 26
            })
        ]
    });
}

// ==========================================
// Bullet
// ==========================================

function bullet(text) {
    return new Paragraph({
        bullet: {
            level: 0
        },
        spacing: {
            after: 50
        },
        indent: {
            left: 420
        },
        children: [
            new TextRun({
                text,
                size: 21
            })
        ]
    });
}

// ==========================================
// Hyperlink
// ==========================================

function hyperlink(text, url) {
    return new ExternalHyperlink({
        children: [
            new TextRun({
                text,
                color: "0563C1",
                underline: {
                    type: UnderlineType.SINGLE
                }
            })
        ],
        link: url
    });
}

// ==========================================
// Summary
// ==========================================

function summarySection(resume) {
    const sections = [];

    sections.push(sectionHeading("PROFESSIONAL SUMMARY"));

    sections.push(
        new Paragraph({
            spacing: {
                after: 180
            },
            children: [
                new TextRun({
                    text: (resume.summary ||
                        "Results-driven Software Engineer.").replace(/\n/g, " "),
                    size: 22
                })
            ]
        })
    );

    return sections;
}

// ==========================================
// Skills
// ==========================================

function skillsSection(resume) {
    const sections = [];

    sections.push(sectionHeading("TECHNICAL SKILLS"));

    const skills = resume.skills || {};

    const addSkill = (title, values) => {
        if (!values || values.length === 0) return;

        sections.push(
            new Paragraph({
                spacing: {
                    after: 80
                },
                children: [
                    new TextRun({
                        text: `${title}: `,
                        bold: true,
                        size: 22
                    }),
                    new TextRun({
                        text: values.join(", "),
                        size: 22
                    })
                ]
            })
        );
    };

    addSkill("Programming Languages", skills.languages);
    addSkill("Frameworks & Libraries", skills.frameworks);
    addSkill("Databases", skills.databases);
    addSkill("Cloud Platforms", skills.cloud);
    addSkill("Tools", skills.tools);
    addSkill("Core CS Subjects", skills.core);

    return sections;
}

// ==========================================
// Education
// ==========================================

function educationSection(resume) {
    const sections = [];

    sections.push(sectionHeading("EDUCATION"));

    (resume.education || []).forEach(edu => {
        sections.push(
            new Paragraph({
                spacing: {
                    after: 50
                },
                children: [
                    new TextRun({
                        text: `🎓 ${edu.institution || ""}`,
                        bold: true,
                        size: 24
                    })
                ]
            })
        );

        sections.push(
            new Paragraph({
                spacing: {
                    after: 40
                },
                children: [
                    new TextRun({
                        text: `${edu.degree || ""}   ${edu.duration || ""}`,
                        italics: true,
                        size: 21
                    })
                ]
            })
        );

        if (edu.cgpa) {
            sections.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `CGPA: ${edu.cgpa}`,
                            size: 21
                        })
                    ]
                })
            );
        }
    });

    return sections;
}

// ==========================================
// Experience
// ==========================================

function experienceSection(resume) {
    const sections = [];

    if (!resume.experience || resume.experience.length === 0)
        return sections;

    sections.push(sectionHeading("PROFESSIONAL EXPERIENCE"));

    resume.experience.forEach(exp => {
        sections.push(
            new Paragraph({
                spacing: {
                    before: 100,
                    after: 40
                },
                children: [
                    new TextRun({
                        text: (exp.role || "").toUpperCase(),
                        bold: true,
                        size: 24
                    }),
                    new TextRun({
                        text: ` • ${exp.company || ""}`,
                        italics: true,
                        size: 22
                    })
                ]
            })
        );

        sections.push(
            new Paragraph({
                spacing: {
                    after: 80
                },
                children: [
                    new TextRun({
                        text: exp.duration || "",
                        color: "666666",
                        size: 20
                    })
                ]
            })
        );

        (exp.points || []).forEach(point => {
            sections.push(bullet(point));
        });

        sections.push(divider());
    });

    return sections;
}

// ==========================================
// Projects
// ==========================================

function projectsSection(resume) {
    const sections = [];

    if (!resume.projects || resume.projects.length === 0)
        return sections;

    sections.push(sectionHeading("PROJECTS"));

    resume.projects.forEach(project => {
        sections.push(
            new Paragraph({
                spacing: {
                    before: 120,
                    after: 40
                },
                children: [
                    new TextRun({
                        text: (project.title || "").toUpperCase(),
                        bold: true,
                        size: 24
                    })
                ]
            })
        );

        if (project.techStack) {
            sections.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "TECH STACK: ",
                            bold: true,
                            size: 21
                        }),
                        new TextRun({
                            text: project.techStack,
                            size: 21
                        })
                    ]
                })
            );
        }

        const links = [];

        if (project.githubLink) {
            links.push(hyperlink("GitHub", project.githubLink));
        }

        if (project.liveLink) {
            if (links.length)
                links.push(new TextRun({ text: " | " }));

            links.push(hyperlink("Live Demo", project.liveLink));
        }

        if (links.length) {
            sections.push(
                new Paragraph({
                    children: links
                })
            );
        }

        if (project.description) {
            sections.push(
                new Paragraph({
                    spacing: {
                        after: 60
                    },
                    children: [
                        new TextRun({
                            text: project.description,
                            italics: true,
                            size: 21
                        })
                    ]
                })
            );
        }

        (project.points || []).forEach(point => {
            sections.push(bullet(point));
        });

        sections.push(divider());
    });

    return sections;
}

// ==========================================
// Certificates
// ==========================================

function certificatesSection(resume) {
    const sections = [];

    if (!resume.certificates || resume.certificates.length === 0)
        return sections;

    sections.push(sectionHeading("CERTIFICATIONS"));

    resume.certificates.forEach(cert => {
        sections.push(bullet(`🏆 ${cert}`));
    });

    return sections;
}

// ==========================================
// Achievements
// ==========================================

function achievementsSection(resume) {
    const sections = [];

    if (!resume.achievements || resume.achievements.length === 0)
        return sections;

    sections.push(sectionHeading("ACHIEVEMENTS"));

    resume.achievements.forEach(item => {
        sections.push(bullet(`⭐ ${item}`));
    });

    return sections;
}

// ==========================================
// Languages
// ==========================================

function languagesSection(resume) {
    const sections = [];

    if (!resume.languages || resume.languages.length === 0)
        return sections;

    sections.push(sectionHeading("LANGUAGES"));

    sections.push(
        new Paragraph({
            children: [
                new TextRun({
                    text: resume.languages.join(" • "),
                    size: 22
                })
            ]
        })
    );

    return sections;
}

// ==========================================
// Optional Links Section
// ==========================================

function profileLinks(resume) {
    const sections = [];

    sections.push(sectionHeading("ONLINE PROFILES"));

    const add = (title, url) => {
        if (!url) return;

        sections.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: title + ": ",
                        bold: true
                    }),
                    hyperlink(url, url)
                ]
            })
        );
    };

    add("LinkedIn", resume.linkedin);
    add("GitHub", resume.github);
    add("Portfolio", resume.portfolio);
    add("LeetCode", resume.leetcode);
    add("HackerRank", resume.hackerrank);
    add("CodeChef", resume.codechef);

    return sections;
}

// ==========================================
// ATS Score Section
// ==========================================

function atsSection(resume) {
    const sections = [];

    sections.push(sectionHeading("RESUME ANALYSIS"));

    sections.push(
        new Paragraph({
            spacing: {
                after: 120
            },
            children: [
                new TextRun({
                    text: "Resume Score: ",
                    bold: true,
                    size: 22
                }),
                new TextRun({
                    text: `${resume.resumeScore || 90}/100`,
                    color: "008000",
                    bold: true,
                    size: 22
                })
            ]
        })
    );

    sections.push(
        new Paragraph({
            spacing: {
                after: 120
            },
            children: [
                new TextRun({
                    text: "ATS Score: ",
                    bold: true,
                    size: 22
                }),
                new TextRun({
                    text: `${resume.atsScore || 95}/100`,
                    color: "008000",
                    bold: true,
                    size: 22
                })
            ]
        })
    );

    return sections;
}

// ==========================================
// Suggestions
// ==========================================

function suggestionSection(resume) {
    const sections = [];

    if (!resume.suggestions || resume.suggestions.length === 0)
        return sections;

    sections.push(sectionHeading("AI SUGGESTIONS"));

    resume.suggestions.forEach(s => {
        sections.push(bullet(s));
    });

    return sections;
}

// ==========================================
// Professional Header
// ==========================================

function professionalHeader(resume) {
    const sections = [];

    sections.push(
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: {
                after: 100
            },
            children: [
                new TextRun({
                    text: (resume.name || "Candidate").toUpperCase(),
                    bold: true,
                    size: 40,
                    color: "1A1A1A"
                })
            ]
        })
    );

    const contact = [];

    if (resume.phone) {
        contact.push(
            new TextRun({
                text: `📞 ${resume.phone}    `,
                size: 20
            })
        );
    }

    if (resume.email) {
        contact.push(
            new TextRun({
                text: `✉ ${resume.email}    `,
                size: 20
            })
        );
    }

    sections.push(
        new Paragraph({
            alignment: AlignmentType.CENTER,
            children: contact
        })
    );

    const links = [];

    if (resume.linkedin) {
        links.push(hyperlink("LinkedIn", resume.linkedin));
    }

    if (resume.github) {
        if (links.length)
            links.push(new TextRun({ text: " | " }));

        links.push(hyperlink("GitHub", resume.github));
    }

    if (resume.portfolio) {
        if (links.length)
            links.push(new TextRun({ text: " | " }));

        links.push(hyperlink("Portfolio", resume.portfolio));
    }

    if (resume.leetcode) {
        if (links.length)
            links.push(new TextRun({ text: " | " }));

        links.push(hyperlink("LeetCode", resume.leetcode));
    }

    sections.push(
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: {
                after: 200
            },
            children: links
        })
    );

    sections.push(
        new Paragraph({
            border: {
                bottom: {
                    style: BorderStyle.SINGLE,
                    size: 8,
                    color: "2E75B6"
                }
            }
        })
    );

    return sections;
}

// ==========================================
// Save Resume
// ==========================================

async function saveResume(document, resume) {
    try {
        const buffer = await Packer.toBuffer(document);

        const safeName = (resume.name || "Resume").replace(/[^a-zA-Z0-9]/g, "_");

        const filename = `${safeName}_${Date.now()}.docx`;

        const filepath = path.join(resumeFolder, filename);

        console.log("Saving to:");
        console.log(filepath);

        fs.writeFileSync(filepath, buffer);
        console.log("File exists:", fs.existsSync(filepath));
        console.log("Saved file:", filename);

        console.log("File Saved Successfully");
        console.log("Exists:", fs.existsSync(filepath));

        return filename;
    } catch (err) {
        console.error("SAVE ERROR:");
        console.error(err);
        throw err;
    }
}
// ==========================================
// Build Complete Resume
// ==========================================

async function generateResumeDocx(resume) {
    const children = [];

    // Header
    children.push(...professionalHeader(resume));

    // Summary
    children.push(...summarySection(resume));

    // Skills
    children.push(...skillsSection(resume));

    // Education
    children.push(...educationSection(resume));

    // Experience
    children.push(...experienceSection(resume));

    // Projects
    children.push(...projectsSection(resume));

    // Certificates
    children.push(...certificatesSection(resume));

    // Achievements
    children.push(...achievementsSection(resume));

    // Languages
    children.push(...languagesSection(resume));

    // Online Profiles
    children.push(...profileLinks(resume));

    // ATS Analysis
    children.push(...atsSection(resume));

    // Suggestions
    children.push(...suggestionSection(resume));

    // Footer
    const footer = new Footer({
        children: [
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                    new TextRun({
                        text: "Generated by InterviewGen AI",
                        color: "777777",
                        italics: true,
                        size: 18
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                    new TextRun({
                        children: [PageNumber.CURRENT]
                    })
                ]
            })
        ]
    });

    const doc = new Document({
        creator: "InterviewGen AI",
        title: `${resume.name || "Resume"} Resume`,
        description: "Professional ATS Resume",
        subject: "Software Engineer Resume",
        keywords: ["Resume", "ATS", "InterviewGen AI"],
        sections: [
            {
                properties: {},
                footers: {
                    default: footer
                },
                children
            }
        ]
    });

    const filename = await saveResume(doc, resume);

    return filename;
}

// ==========================================
// Future PDF Generator
// ==========================================

async function generateResumePDF(resume) {
    /*
        Future Implementation

        HTML Template
              ↓
        Puppeteer
              ↓
        PDF
    */

    return null;
}

// ==========================================
// Future HTML Template
// ==========================================

async function generateResumeHTML(resume) {
    /*
        Modern Resume Template

        Resume.io
        Rezi
        Novoresume
    */

    return "";
}

// ==========================================

module.exports = {
    generateResumeDocx,
    generateResumePDF,
    generateResumeHTML
};