import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { FiMic, FiMicOff, FiCheck, FiChevronRight, FiSend, FiList, FiAlertCircle } from 'react-icons/fi'
import Navbar from '../components/Navbar'
import api from '../utils/api'

export default function TestPage() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { testId } = useParams()

  const [sections, setSections] = useState(state?.sections || {})
  const [skillsList, setSkillsList] = useState(state?.skillsList || [])
  const [currentSkillIdx, setCurrentSkillIdx] = useState(0)
  const [currentQIdx, setCurrentQIdx] = useState(0)
  const [answers, setAnswers] = useState({})
  const [evaluations, setEvaluations] = useState({})
  const [currentTestId, setCurrentTestId] = useState(testId === 'new' ? null : testId)
  const [sectionSubmitted, setSectionSubmitted] = useState({})
  const [sectionScores, setSectionScores] = useState({})
  const [isListening, setIsListening] = useState(false)
  const [evaluating, setEvaluating] = useState(false)
  const [submittingSection, setSubmittingSection] = useState(false)
  const [submittingTest, setSubmittingTest] = useState(false)
  const [showOptions, setShowOptions] = useState({})
  const [selectedOption, setSelectedOption] = useState({})

  const recognitionRef = useRef(null)
  const textareaRef = useRef(null)
  const autoSubmittedRef = useRef({})       // prevent double auto-submit
  const testIdRef = useRef(currentTestId)   // keep ref in sync for async callbacks

  useEffect(() => { testIdRef.current = currentTestId }, [currentTestId])

  const currentSkill = skillsList[currentSkillIdx]
  const currentQuestions = sections[currentSkill] || []
  const currentQuestion = currentQuestions[currentQIdx]
  const answerKey = `${currentSkill}_${currentQIdx}`

  // ── Auto-submit sections that have 0 questions so they don't block completion ──
  const autoSubmitEmptySection = useCallback(async (skill, existingTestId) => {
    if (autoSubmittedRef.current[skill]) return
    autoSubmittedRef.current[skill] = true

    try {
      const res = await api.post('/evaluate/section', {
        testId: existingTestId || testIdRef.current,
        skill,
        answers: []   // empty — section had no questions
      })
      if (res.data.testId && !testIdRef.current) {
        setCurrentTestId(res.data.testId)
        testIdRef.current = res.data.testId
      }
      setSectionScores(prev => ({ ...prev, [skill]: res.data.sectionResult }))
      setSectionSubmitted(prev => ({ ...prev, [skill]: true }))
    } catch (err) {
      // Still mark as submitted so it doesn't block the flow
      console.warn(`Auto-submit failed for empty section ${skill}:`, err.message)
      setSectionSubmitted(prev => ({ ...prev, [skill]: true }))
      setSectionScores(prev => ({ ...prev, [skill]: { percentage: 0, score: 0, maxScore: 0 } }))
    }
  }, [])

  // On mount: auto-submit any empty sections immediately
  useEffect(() => {
    skillsList.forEach(skill => {
      if ((sections[skill] || []).length === 0) {
        autoSubmitEmptySection(skill, currentTestId)
      }
    })
  }, [skillsList, sections]) // eslint-disable-line

  // Speech recognition setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SR()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = 'en-US'

      recognitionRef.current.onresult = (event) => {
        let transcript = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript
        }
        setAnswers(prev => ({ ...prev, [answerKey]: transcript }))
      }

      recognitionRef.current.onend = () => setIsListening(false)
      recognitionRef.current.onerror = () => { setIsListening(false); toast.error('Microphone error') }
    }
  }, [answerKey])

  const toggleListening = () => {
    if (!recognitionRef.current) return toast.error('Speech recognition not supported in this browser')
    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      recognitionRef.current.start()
      setIsListening(true)
      toast('🎤 Listening... Speak your answer', { duration: 2000 })
    }
  }

  const handleCheckAnswer = async () => {
    const userAnswer = answers[answerKey] || ''
    if (!userAnswer.trim()) return toast.error('Please write or speak your answer first')

    setEvaluating(true)
    try {
      const res = await api.post('/evaluate/answer', {
        question: currentQuestion.question,
        userAnswer,
        idealAnswer: currentQuestion.idealAnswer,
        skill: currentSkill
      })
      setEvaluations(prev => ({ ...prev, [answerKey]: res.data.result }))
    } catch (err) {
      toast.error('Evaluation failed: ' + (err.response?.data?.message || err.message))
    } finally {
      setEvaluating(false)
    }
  }

  const handleSubmitSection = async () => {
    if (currentQuestions.length === 0) {
      // Empty section — just mark as submitted
      await autoSubmitEmptySection(currentSkill, currentTestId)
      toast.success(`${currentSkill} section marked complete`)
      return
    }

    const sectionAnswers = currentQuestions.map((q, i) => ({
      questionId: q._id,
      question: q.question,
      userAnswer: answers[`${currentSkill}_${i}`] || '',
      idealAnswer: q.idealAnswer
    }))

    setSubmittingSection(true)
    try {
      const res = await api.post('/evaluate/section', {
        testId: currentTestId,
        skill: currentSkill,
        answers: sectionAnswers
      })
      setCurrentTestId(res.data.testId)
      testIdRef.current = res.data.testId
      setSectionScores(prev => ({ ...prev, [currentSkill]: res.data.sectionResult }))
      setSectionSubmitted(prev => ({ ...prev, [currentSkill]: true }))

      const evalAnswers = res.data.evaluatedAnswers || []
      const newEvals = {}
      evalAnswers.forEach((a, i) => {
        newEvals[`${currentSkill}_${i}`] = {
          isCorrect: a.isCorrect,
          score: a.score,
          accuracyPercent: a.accuracyPercent,
          feedback: a.aiFeedback
        }
      })
      setEvaluations(prev => ({ ...prev, ...newEvals }))
      toast.success(`${currentSkill} submitted! Score: ${res.data.sectionResult.percentage}%`)
    } catch (err) {
      toast.error('Section submission failed: ' + (err.response?.data?.message || err.message))
    } finally {
      setSubmittingSection(false)
    }
  }

  const handleSubmitTest = async () => {
    const tid = currentTestId || testIdRef.current
    if (!tid) return toast.error('No test ID found. Please submit at least one section first.')

    // Auto-submit any remaining unsubmitted sections silently before final submit
    const unsubmitted = skillsList.filter(s => !sectionSubmitted[s])
    if (unsubmitted.length > 0) {
      toast('Finalizing remaining sections...', { duration: 2000 })
      for (const skill of unsubmitted) {
        try {
          const qs = sections[skill] || []
          const sectionAnswers = qs.map((q, i) => ({
            questionId: q._id,
            question: q.question,
            userAnswer: answers[`${skill}_${i}`] || '',
            idealAnswer: q.idealAnswer
          }))
          const res = await api.post('/evaluate/section', {
            testId: tid,
            skill,
            answers: sectionAnswers
          })
          setSectionSubmitted(prev => ({ ...prev, [skill]: true }))
          setSectionScores(prev => ({ ...prev, [skill]: res.data.sectionResult }))
        } catch (err) {
          console.warn(`Could not submit section ${skill}:`, err.message)
          setSectionSubmitted(prev => ({ ...prev, [skill]: true }))
        }
      }
    }

    setSubmittingTest(true)
    try {
      const res = await api.post(`/report/submit/${tid}`)
      toast.success('Test submitted! Sending email report... 📧')
      navigate(`/results/${tid}`, { state: { result: res.data.result } })
    } catch (err) {
      toast.error('Test submission failed: ' + (err.response?.data?.message || err.message))
    } finally {
      setSubmittingTest(false)
    }
  }

  const evaluation = evaluations[answerKey]
  const allSectionsSubmitted = skillsList.length > 0 && skillsList.every(s => sectionSubmitted[s])

  // Find the next non-empty section index
  const nextNonEmptySection = () => {
    for (let i = currentSkillIdx + 1; i < skillsList.length; i++) {
      if ((sections[skillsList[i]] || []).length > 0) return i
    }
    return currentSkillIdx + 1 < skillsList.length ? currentSkillIdx + 1 : -1
  }

  return (
    <div className="animated-bg min-h-screen">
      <Navbar />
      <div className="pt-20 pb-12 px-4 max-w-6xl mx-auto">
        <div className="flex gap-6">

          {/* Sidebar */}
          <div className="w-56 flex-shrink-0 hidden lg:block">
            <div className="card sticky top-24">
              <h3 className="text-sm font-bold text-white/60 mb-3 uppercase tracking-wider">Sections</h3>
              <div className="space-y-1">
                {skillsList.map((skill, i) => {
                  const qCount = (sections[skill] || []).length
                  return (
                    <button key={skill} onClick={() => { setCurrentSkillIdx(i); setCurrentQIdx(0) }}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200
                        ${currentSkillIdx === i ? 'bg-primary-500/20 text-primary-400 font-semibold' : 'text-white/60 hover:text-white hover:bg-white/5'}
                        ${sectionSubmitted[skill] ? 'border-l-2 border-emerald-500' : ''}
                        ${qCount === 0 ? 'opacity-50' : ''}`}>
                      <div className="flex items-center justify-between">
                        <span>{skill}</span>
                        {sectionSubmitted[skill] ? (
                          <span className="text-emerald-400 text-xs font-bold">{sectionScores[skill]?.percentage ?? 0}%</span>
                        ) : (
                          <span className="text-white/30 text-xs">{qCount}Q</span>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

              {allSectionsSubmitted && (
                <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  onClick={handleSubmitTest} disabled={submittingTest}
                  className="btn-primary w-full mt-4 text-sm py-3 flex items-center justify-center gap-2">
                  {submittingTest
                    ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : '🏁'}
                  {submittingTest ? 'Submitting...' : 'SUBMIT TEST'}
                </motion.button>
              )}

              {/* Always-visible submit button once a testId exists */}
              {!allSectionsSubmitted && currentTestId && (
                <button onClick={handleSubmitTest} disabled={submittingTest}
                  className="btn-outline w-full mt-3 text-xs py-2 flex items-center justify-center gap-1 opacity-60 hover:opacity-100">
                  Submit & Finish Early
                </button>
              )}
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">

            {/* Section header */}
            <div className="card mb-4 flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-xl font-black">{currentSkill} <span className="text-white/40 text-base font-normal">Section</span></h2>
                <p className="text-white/40 text-sm">
                  {currentQuestions.length === 0
                    ? 'No questions in this section'
                    : `Question ${currentQIdx + 1} of ${currentQuestions.length}`}
                </p>
              </div>
              {!sectionSubmitted[currentSkill] ? (
                <button onClick={handleSubmitSection} disabled={submittingSection}
                  className="btn-primary py-2 px-5 text-sm flex items-center gap-2">
                  {submittingSection
                    ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : <FiSend size={14} />}
                  Submit Section
                </button>
              ) : (
                <span className="badge bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <FiCheck size={12} /> {sectionScores[currentSkill]?.percentage ?? 0}%
                </span>
              )}
            </div>

            {/* Empty section notice */}
            {currentQuestions.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="card border-yellow-500/30 bg-yellow-500/5 mb-4 flex items-start gap-3">
                <FiAlertCircle className="text-yellow-400 mt-0.5 shrink-0" size={18} />
                <div>
                  <p className="text-yellow-400 font-semibold text-sm">No questions loaded for {currentSkill}</p>
                  <p className="text-white/50 text-xs mt-1">
                    This section was auto-submitted. Move to the next section or submit the test when ready.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Question navigator */}
            {currentQuestions.length > 0 && (
              <div className="flex gap-2 mb-4 flex-wrap">
                {currentQuestions.map((_, i) => {
                  const key = `${currentSkill}_${i}`
                  const hasAnswer = answers[key]?.trim()
                  const isCorrect = evaluations[key]?.isCorrect
                  return (
                    <button key={i} onClick={() => setCurrentQIdx(i)}
                      className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all duration-200
                        ${currentQIdx === i ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' :
                          isCorrect === true ? 'bg-emerald-500/30 text-emerald-400 border border-emerald-500/40' :
                          isCorrect === false ? 'bg-red-500/30 text-red-400 border border-red-500/40' :
                          hasAnswer ? 'bg-white/10 text-white/80' :
                          'glass border border-white/10 text-white/40 hover:text-white'}`}>
                      {i + 1}
                    </button>
                  )
                })}
              </div>
            )}

            {/* Question card */}
            {currentQuestion && (
              <AnimatePresence mode="wait">
                <motion.div key={answerKey} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="card mb-4">
                  <div className="flex items-start gap-3 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center text-primary-400 text-sm font-bold flex-shrink-0 mt-0.5">
                      {currentQIdx + 1}
                    </div>
                    <div className="flex-1">
                      <span className="badge bg-white/10 text-white/50 text-xs mb-2">{currentQuestion.difficulty || 'medium'}</span>
                      <p className="text-lg font-medium leading-relaxed">{currentQuestion.question}</p>
                    </div>
                  </div>

                  {/* Show Options Button */}
                  {currentQuestion.options?.length > 0 && !sectionSubmitted[currentSkill] && (
                    <div className="mb-4">
                      <button
                        onClick={() => setShowOptions(prev => ({ ...prev, [answerKey]: !prev[answerKey] }))}
                        className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl glass border border-white/10
                          hover:border-primary-500/40 text-white/60 hover:text-white transition"
                      >
                        <FiList size={14} />
                        {showOptions[answerKey] ? 'Hide Options' : 'Show Options'}
                      </button>

                      <AnimatePresence>
                        {showOptions[answerKey] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }} className="mt-3 space-y-2 overflow-hidden"
                          >
                            {currentQuestion.options.map((opt, oi) => {
                              const picked = selectedOption[answerKey] === oi
                              return (
                                <button key={oi} onClick={() => {
                                  setSelectedOption(prev => ({ ...prev, [answerKey]: oi }))
                                  setAnswers(prev => ({ ...prev, [answerKey]: opt }))
                                }}
                                  className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all border
                                    ${picked
                                      ? 'bg-primary-500/20 border-primary-500/50 text-white'
                                      : 'glass border-white/10 text-white/70 hover:border-white/25 hover:text-white'}`}
                                >
                                  <span className="font-semibold text-primary-400/70 mr-2">{['A', 'B', 'C', 'D'][oi]}.</span>
                                  {opt}
                                </button>
                              )
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* Answer area */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm text-white/60">Your Answer</label>
                      <button onClick={toggleListening}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                          ${isListening
                            ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse'
                            : 'glass border border-white/10 text-white/60 hover:border-primary-500/40 hover:text-white'}`}>
                        {isListening ? <><FiMicOff size={14} /> Stop</> : <><FiMic size={14} /> Speak</>}
                      </button>
                    </div>
                    <textarea ref={textareaRef}
                      value={answers[answerKey] || ''}
                      onChange={e => {
                        setAnswers(prev => ({ ...prev, [answerKey]: e.target.value }))
                        setSelectedOption(prev => ({ ...prev, [answerKey]: undefined }))
                      }}
                      placeholder="Type your answer here, pick an option above, or click Speak"
                      className="input-field min-h-32 resize-y text-sm leading-relaxed"
                      rows={5}
                      disabled={sectionSubmitted[currentSkill]}
                    />
                  </div>

                  {/* Check answer */}
                  {!sectionSubmitted[currentSkill] && (
                    <button onClick={handleCheckAnswer} disabled={evaluating || !answers[answerKey]?.trim()}
                      className="btn-outline text-sm py-2 px-5 flex items-center gap-2">
                      {evaluating
                        ? <div className="w-4 h-4 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
                        : <FiCheck size={14} />}
                      Check Answer
                    </button>
                  )}

                  {/* Evaluation result */}
                  {evaluation && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className={`mt-4 p-4 rounded-xl border ${
                        evaluation.score === 2 ? 'bg-emerald-500/10 border-emerald-500/30' :
                        evaluation.score === 1 ? 'bg-yellow-500/10 border-yellow-500/30' :
                        'bg-red-500/10 border-red-500/30'
                      }`}>
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={`text-sm font-bold ${
                          evaluation.score === 2 ? 'text-emerald-400' :
                          evaluation.score === 1 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {evaluation.score === 2 ? '✅ Correct' : evaluation.score === 1 ? '⚠️ Partially Correct' : '❌ Incorrect'}
                        </span>
                        <span className="text-white/40 text-sm">
                          — {evaluation.accuracyPercent}% accuracy — {evaluation.score}/2 marks
                        </span>
                      </div>
                      <p className="text-white/70 text-sm">{evaluation.feedback}</p>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center mt-2">
              <button
                onClick={() => setCurrentQIdx(q => Math.max(0, q - 1))}
                disabled={currentQIdx === 0}
                className="btn-outline text-sm py-2 px-5 disabled:opacity-30">
                ← Previous
              </button>

              <div className="flex gap-2">
                {/* Next question */}
                {currentQIdx < currentQuestions.length - 1 && (
                  <button onClick={() => setCurrentQIdx(q => q + 1)}
                    className="btn-primary text-sm py-2 px-5 flex items-center gap-2">
                    Next <FiChevronRight />
                  </button>
                )}

                {/* Next section */}
                {currentQIdx >= currentQuestions.length - 1 && currentSkillIdx < skillsList.length - 1 && (
                  <button onClick={() => {
                    const next = nextNonEmptySection()
                    if (next >= 0 && next < skillsList.length) {
                      setCurrentSkillIdx(next)
                      setCurrentQIdx(0)
                    }
                  }}
                    className="btn-primary text-sm py-2 px-5 flex items-center gap-2">
                    Next Section <FiChevronRight />
                  </button>
                )}

                {/* Submit test — last section */}
                {currentSkillIdx >= skillsList.length - 1 && allSectionsSubmitted && (
                  <button onClick={handleSubmitTest} disabled={submittingTest}
                    className="btn-primary text-sm py-2 px-6 flex items-center gap-2 glow">
                    {submittingTest
                      ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      : '🏁'} SUBMIT TEST
                  </button>
                )}
              </div>
            </div>

            {/* Mobile submit test */}
            {allSectionsSubmitted && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lg:hidden mt-4">
                <button onClick={handleSubmitTest} disabled={submittingTest}
                  className="btn-primary w-full py-4 text-lg glow flex items-center justify-center gap-2">
                  {submittingTest
                    ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : '🏁'} SUBMIT TEST
                </button>
              </motion.div>
            )}

            {/* Sticky bottom submit bar once at least one section done */}
            {currentTestId && !allSectionsSubmitted && (
              <div className="fixed bottom-4 right-4 z-50 lg:hidden">
                <button onClick={handleSubmitTest} disabled={submittingTest}
                  className="btn-primary px-5 py-3 text-sm shadow-2xl flex items-center gap-2">
                  🏁 Finish & Submit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
