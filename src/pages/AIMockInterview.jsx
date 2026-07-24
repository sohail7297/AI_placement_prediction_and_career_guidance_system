import React, { useState, useEffect, useRef } from 'react';
import { Mic } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { apiService } from '../services/api';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

// Subcomponents imports
import InterviewSetup from '../components/interview/InterviewSetup';
import InterviewStream from '../components/interview/InterviewStream';
import InterviewEvaluation from '../components/interview/InterviewEvaluation';

export const AIMockInterview = () => {
  const [step, setStep] = useState('setup'); // setup, active, evaluation
  const [role, setRole] = useState('Software Engineer');
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState(null);
  
  // Active Interview state
  const [questionIdx, setQuestionIdx] = useState(0);
  const [timer, setTimer] = useState(0);
  const [recording, setRecording] = useState(false);
  const [answerText, setAnswerText] = useState('');
  const [answers, setAnswers] = useState([]);
  
  // Timer interval reference
  const timerIntervalRef = useRef(null);

  useEffect(() => {
    if (step === 'active') {
      setTimer(0);
      timerIntervalRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [step, questionIdx]);

  const handleStart = async () => {
    setLoading(true);
    try {
      const sess = await apiService.startInterview({ role });
      setSession(sess);
      setAnswers([]);
      setQuestionIdx(0);
      setStep('active');
      toast.success(`Mock Interview initialized for ${role}`);
    } catch (error) {
      toast.error('Failed to initialize mock interview.');
    } finally {
      setLoading(false);
    }
  };

  const handleMicToggle = () => {
    if (!recording) {
      setRecording(true);
      toast.success('Microphone simulator active. Speak your answer now.');
      
      setTimeout(() => {
        setAnswerText((prev) => {
          const defaultAnswers = {
            'Software Engineer': 'A process is an active execution program with dedicated memory space assigned by the OS. A thread is a smaller subset of a process that shares memory and resources with other threads in the same process, which makes inter-thread communication faster but introduces concurrency risks.',
            'Frontend Developer': 'React 19 introduces Server Actions which allow you to submit forms and mutate data directly on the server without manually writing API fetch endpoints. It also adds compiler support and use hooks to handle async state pending states smoothly.',
            'Data Scientist': 'The bias-variance tradeoff represents the balance between underfitting and overfitting. High bias means the model is too simple and misses patterns (underfitting), while high variance means the model is too complex and memorizes noise (overfitting). We balance them using regularization or cross-validation.'
          };
          return defaultAnswers[role] || 'To optimize the codebase, I would audit the network logs, identify database query overheads, set up indexing thresholds, and use custom caching mechanisms to speed up the page render latency.';
        });
        setRecording(false);
        toast.success('Speech transcribed successfully.');
      }, 4000);
    } else {
      setRecording(false);
    }
  };

  const handleNextQuestion = () => {
    if (!answerText.trim()) {
      toast.error('Please record or type your response before submitting.');
      return;
    }

    setAnswers((prev) => [...prev, { question: session.questions[questionIdx], answer: answerText, time: timer }]);
    setAnswerText('');

    if (questionIdx < session.questions.length - 1) {
      setQuestionIdx((prev) => prev + 1);
    } else {
      setStep('evaluation');
      toast.success('Mock Interview complete! Evaluating results.');
    }
  };

  const resetInterview = () => {
    setSession(null);
    setAnswers([]);
    setStep('setup');
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const evalScore = 78;
  const evaluationFeedback = [
    {
      metric: 'Technical Accuracy',
      score: 82,
      text: 'Good understanding of core concepts. Explained structural differences with clarity, highlighting memory distribution details.'
    },
    {
      metric: 'Communication Clarity',
      score: 75,
      text: 'Delivery was logical, but featured slight hesitation during complex explanations. Try utilizing bullet formatting in verbal structure.'
    },
    {
      metric: 'Problem Solving Method',
      score: 78,
      text: 'Systematically walked through scenarios. Could be strengthened by referencing quantified industrial impacts in coding examples.'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-gradient tracking-tight flex items-center gap-2">
              <Mic className="w-8 h-8 text-cyan-400" /> AI Mock Interview
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm font-sans mt-0.5">
              Practice engineering screening boards with our interactive voice question reader and diagnostic graders.
            </p>
          </div>
        </div>

        {/* Dynamic setup panels */}
        <AnimatePresence mode="wait">
          
          {step === 'setup' && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="max-w-xl mx-auto"
            >
              <InterviewSetup 
                role={role} 
                setRole={setRole} 
                handleStart={handleStart} 
                loading={loading} 
              />
            </motion.div>
          )}

          {step === 'active' && session && (
            <motion.div
              key="active"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
            >
              <InterviewStream
                session={session}
                questionIdx={questionIdx}
                timer={timer}
                formatTime={formatTime}
                recording={recording}
                answerText={answerText}
                setAnswerText={setAnswerText}
                handleMicToggle={handleMicToggle}
                handleNextQuestion={handleNextQuestion}
                resetInterview={resetInterview}
                role={role}
              />
            </motion.div>
          )}

          {step === 'evaluation' && (
            <motion.div
              key="evaluation"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
            >
              <InterviewEvaluation
                evalScore={evalScore}
                evaluationFeedback={evaluationFeedback}
                resetInterview={resetInterview}
                accent={accent}
              />
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </DashboardLayout>
  );
};
export default AIMockInterview;
