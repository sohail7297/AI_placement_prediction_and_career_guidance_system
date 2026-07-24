import React from 'react';
import { Clock, Square, Mic, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '../ui/Cards';
import { Button } from '../ui/Buttons';

export const InterviewStream = ({
  session,
  questionIdx,
  timer,
  formatTime,
  recording,
  answerText,
  setAnswerText,
  handleMicToggle,
  handleNextQuestion,
  resetInterview,
  role
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
      {/* Question Screen */}
      <div className="lg:col-span-2 space-y-6">
        <Card hoverEffect={false} className="p-6 space-y-5 border-white/5">
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest font-sans">
              Question {questionIdx + 1} of {session.questions.length}
            </span>
            <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20 font-heading flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 animate-pulse" /> {formatTime(timer)}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold font-heading text-white leading-relaxed">
            {session.questions[questionIdx]}
          </h3>
          
          {/* Sound Wave Animation */}
          {recording && (
            <div className="flex items-center justify-center gap-1 py-4.5 bg-cyan-500/5 rounded-lg border border-cyan-500/20">
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-1.5 h-8 bg-cyan-500 rounded-full animate-[soundWave_1.2s_infinite]"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
              <style dangerouslySetInnerHTML={{ __html: `
                @keyframes soundWave {
                  0%, 100% { height: 8px; }
                  50% { height: 32px; }
                }
              `}} />
            </div>
          )}

          <div className="space-y-3.5">
            <label htmlFor="answer-input" className="text-xs font-bold font-heading text-slate-400 tracking-wide block">Your Answer Response</label>
            <textarea
              id="answer-input"
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              placeholder="Type your explanation or click the microphone to simulate speech input..."
              className="w-full min-h-[120px] p-4 rounded-lg bg-slate-900 border border-slate-800 focus:outline-none focus:border-cyan-500/80 text-white font-sans text-xs sm:text-sm leading-relaxed"
            />
          </div>

          <div className="flex justify-between items-center gap-4">
            <Button 
              variant={recording ? 'danger' : 'outline'} 
              size="md" 
              onClick={handleMicToggle}
              icon={recording ? <Square className="w-4 h-4 text-white" /> : <Mic className="w-4 h-4 text-cyan-400 animate-pulse" />}
            >
              {recording ? 'Stop Mic' : 'Simulate Mic Speech'}
            </Button>

            <Button 
              variant="primary" 
              size="md" 
              onClick={handleNextQuestion}
              icon={<ChevronRight className="w-4.5 h-4.5 text-black" />}
            >
              {questionIdx === session.questions.length - 1 ? 'Finish & Grade' : 'Next Question'}
            </Button>
          </div>
        </Card>
      </div>

      {/* Session Meta side card */}
      <div className="lg:col-span-1">
        <Card hoverEffect={false} className="p-5 space-y-4 h-full flex flex-col justify-between border-white/5">
          <div className="space-y-4">
            <CardHeader className="mb-0">
              <div>
                <CardTitle className="text-sm">Active Session</CardTitle>
                <CardDescription>{role}</CardDescription>
              </div>
            </CardHeader>
            
            <div className="space-y-3 border-t border-white/5 pt-4 text-xs text-slate-400">
              <p className="flex justify-between"><span>Interview Type:</span> <span className="text-white font-semibold">Technical / Coding</span></p>
              <p className="flex justify-between"><span>Total Questions:</span> <span className="text-white font-semibold">5 Items</span></p>
              <p className="flex justify-between"><span>Simulation State:</span> <span className="text-cyan-400 font-semibold animate-pulse">Live</span></p>
            </div>
          </div>

          <Button variant="outline" size="sm" className="w-full text-center" onClick={resetInterview}>
            Abort Session
          </Button>
        </Card>
      </div>
    </div>
  );
};
export default InterviewStream;
