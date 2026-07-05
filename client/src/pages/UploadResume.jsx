import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'
import { FiUpload, FiFile, FiCheckCircle, FiX, FiZap, FiStar } from 'react-icons/fi'
import Navbar from '../components/Navbar'
import api from '../utils/api'

const QUESTION_COUNTS = [10, 15, 20, 25, 30, 40, 50]

export default function UploadResume() {
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [parsed, setParsed] = useState(null)
  const [questionsPerSection, setQuestionsPerSection] = useState(10)
  const [generatingTest, setGeneratingTest] = useState(false)

  const onDrop = useCallback((accepted) => {
    if (accepted[0]) setFile(accepted[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'], 'application/msword': ['.doc'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024
  })

  const handleUpload = async () => {
    if (!file) return toast.error('Please select a resume file')
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('resume', file)
      const res = await api.post('/resume/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setParsed(res.data.resume)
      toast.success('Resume parsed successfully! 🎉')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleStartTest = async () => {
    if (!parsed) return
    setGeneratingTest(true)
    try {
      const skills = parsed.parsedData.skills.slice(0, 6)
      if (!skills || skills.length === 0) {
        return toast.error('No skills detected in resume. Please upload a resume with clear skills.')
      }
      const res = await api.post('/questions/generate-test', { skills, questionsPerSection })
      toast.success('Test generated! Let\'s go 🚀')
      navigate('/test/new', { state: { sections: res.data.sections, skillsList: res.data.skillsList, resumeId: parsed._id } })
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to generate questions'
      toast.error(msg)
      console.error('Generate test error:', err.response?.data || err.message)
    } finally {
      setGeneratingTest(false)
    }
  }

  return (
    <div className="animated-bg min-h-screen">
      <Navbar />
      <div className="pt-20 pb-12 px-4 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-black mb-2">Upload Your <span className="gradient-text">Resume</span></h1>
          <p className="text-white/50 mb-8">AI will extract your skills and generate personalized interview questions</p>

          {!parsed ? (
            <>
              {/* Drop Zone */}
              <div {...getRootProps()}
                className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300
                  ${isDragActive ? 'border-primary-500 bg-primary-500/10' : 'border-white/20 hover:border-primary-500/50 hover:bg-white/5'}
                  ${file ? 'border-emerald-500/50 bg-emerald-500/5' : ''}`}>
                <input {...getInputProps()} />
                {file ? (
                  <div className="flex flex-col items-center gap-3">
                    <FiFile size={48} className="text-emerald-400" />
                    <p className="text-emerald-400 font-semibold text-lg">{file.name}</p>
                    <p className="text-white/40 text-sm">{(file.size / 1024).toFixed(1)} KB</p>
                    <button onClick={(e) => { e.stopPropagation(); setFile(null) }}
                      className="text-white/40 hover:text-red-400 transition-colors flex items-center gap-1 text-sm">
                      <FiX size={14} /> Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-primary-500/20 flex items-center justify-center">
                      <FiUpload size={32} className="text-primary-400" />
                    </div>
                    <p className="text-lg font-semibold text-white/80">
                      {isDragActive ? 'Drop it here!' : 'Drop your resume here'}
                    </p>
                    <p className="text-white/40 text-sm">or <span className="text-primary-400">browse files</span></p>
                    <p className="text-white/30 text-xs mt-2">Supports PDF, DOC, DOCX — Max 10MB</p>
                  </div>
                )}
              </div>

              {file && (
                <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  onClick={handleUpload} disabled={uploading}
                  className="btn-primary w-full mt-4 flex items-center justify-center gap-2 text-lg py-4">
                  {uploading ? (
                    <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Parsing Resume with AI...</>
                  ) : <><FiZap /> Parse Resume with AI</>}
                </motion.button>
              )}
            </>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {/* Parsed Results */}
              <div className="card border-emerald-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <FiCheckCircle size={24} className="text-emerald-400" />
                  <h2 className="text-xl font-bold text-emerald-400">Resume Parsed Successfully!</h2>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {parsed.parsedData.name && <div><span className="text-white/40 text-sm">Name</span><p className="font-semibold">{parsed.parsedData.name}</p></div>}
                  {parsed.parsedData.email && <div><span className="text-white/40 text-sm">Email</span><p className="font-semibold">{parsed.parsedData.email}</p></div>}
                  {parsed.parsedData.college && <div><span className="text-white/40 text-sm">College</span><p className="font-semibold">{parsed.parsedData.college}</p></div>}
                  {parsed.parsedData.cgpa && <div><span className="text-white/40 text-sm">CGPA</span><p className="font-semibold">{parsed.parsedData.cgpa}</p></div>}
                </div>
              </div>

              {/* Scores */}
              <div className="grid grid-cols-2 gap-4">
                <div className="card text-center">
                  <div className="text-4xl font-black gradient-text">{parsed.resumeScore}%</div>
                  <div className="text-white/50 text-sm mt-1">Resume Score</div>
                </div>
                <div className="card text-center">
                  <div className="text-4xl font-black text-emerald-400">{parsed.atsScore}%</div>
                  <div className="text-white/50 text-sm mt-1">ATS Score</div>
                </div>
              </div>

              {/* Skills */}
              <div className="card">
                <h3 className="font-bold mb-3 flex items-center gap-2"><FiStar className="text-yellow-400" /> Skills Detected</h3>
                <div className="flex flex-wrap gap-2">
                  {parsed.parsedData.skills.map(skill => (
                    <span key={skill} className="badge bg-primary-500/20 text-primary-300 border border-primary-500/30 text-sm">{skill}</span>
                  ))}
                </div>
              </div>

              {/* Suggestions */}
              {parsed.suggestions?.length > 0 && (
                <div className="card">
                  <h3 className="font-bold mb-3">💡 AI Suggestions</h3>
                  <ul className="space-y-2">
                    {parsed.suggestions.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                        <span className="text-primary-400 mt-0.5">→</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Question count selector */}
              <div className="card">
                <h3 className="font-bold mb-3">Questions Per Section</h3>
                <div className="flex flex-wrap gap-2">
                  {QUESTION_COUNTS.map(n => (
                    <button key={n} onClick={() => setQuestionsPerSection(n)}
                      className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200
                        ${questionsPerSection === n
                          ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                          : 'glass border border-white/10 text-white/60 hover:border-primary-500/40 hover:text-white'}`}>
                      {n}
                    </button>
                  ))}
                </div>
                <p className="text-white/30 text-xs mt-2">
                  {parsed.parsedData.skills.slice(0, 6).length + 1} sections × {questionsPerSection} questions = {(parsed.parsedData.skills.slice(0, 6).length + 1) * questionsPerSection} total
                </p>
              </div>

              {/* Start Test Button */}
              <button onClick={handleStartTest} disabled={generatingTest}
                className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4 glow">
                {generatingTest ? (
                  <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating Questions...</>
                ) : <><FiZap /> Start Interview Test</>}
              </button>

              <button onClick={() => { setParsed(null); setFile(null) }}
                className="btn-outline w-full text-center py-3">
                Upload Different Resume
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
