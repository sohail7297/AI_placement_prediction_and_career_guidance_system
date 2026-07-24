import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, Trash2, ArrowUpRight, Sparkles } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Card } from '../components/ui/Cards';
import { Button } from '../components/ui/Buttons';
import { useTheme } from '../context/ThemeContext';
import { apiService } from '../services/api';
import toast from 'react-hot-toast';

// Subcomponents imports
import ChatFeed from '../components/ai/ChatFeed';
import ChatHistory from '../components/ai/ChatHistory';

export const AICareerAssistant = () => {
  const { accent } = useTheme();
  const messagesEndRef = useRef(null);
  const [inputMessage, setInputMessage] = useState('');
  const [sending, setSending] = useState(false);

  // Active theme classes
  const accentColor = accent === 'cyan' ? 'text-cyan-400' : 'text-purple-400';
  const accentBorder = accent === 'cyan' ? 'border-cyan-500/25' : 'border-purple-500/25';

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `Hello Sohail! I am your SDE career coach. I can review your resume, outline target study roadmaps, prepare mock questions, or analyze your capability diagnostics.
      
What is on your mind today?`,
      time: '10:30 AM'
    }
  ]);

  const [chatHistory, setChatHistory] = useState([
    { id: 1, title: 'Resume ATS guidelines', date: 'Today' },
    { id: 2, title: 'SDE interview preparation roadmap', date: 'Yesterday' },
    { id: 3, title: 'React 19 Server Actions analysis', date: '3 days ago' }
  ]);

  const suggestedPrompts = [
    'How do I optimize my SDE resume for ATS?',
    'What projects should I build for Full-Stack SDE roles?',
    'Give me a 3-month roadmap for cracking placements.',
    'Draft a cold email template for internship applications.'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, sending]);

  const handleSend = async (textToSend) => {
    const msg = textToSend || inputMessage;
    if (!msg.trim()) return;

    const userMsgId = Date.now();
    const formattedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setMessages((prev) => [
      ...prev,
      { id: userMsgId, sender: 'user', text: msg, time: formattedTime }
    ]);
    
    setInputMessage('');
    setSending(true);

    try {
      const historyLog = messages.map(m => ({ role: m.sender === 'bot' ? 'assistant' : 'user', content: m.text }));
      const response = await apiService.chatWithAI(msg, historyLog);
      
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: response.reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (error) {
      toast.error('Failed to communicate with Career AI.');
    } finally {
      setSending(false);
    }
  };

  const handlePromptClick = (prompt) => {
    handleSend(prompt);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        sender: 'bot',
        text: 'Hello Sohail! Chat history cleared. What topic or study roadmap shall we outline next?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    toast.success('Chat history cleared.');
  };

  // Simple Markdown & Code rendering helper
  const renderMessageContent = (text) => {
    if (text.includes('```')) {
      const parts = text.split('```');
      return parts.map((part, idx) => {
        if (idx % 2 === 1) {
          const lines = part.split('\n');
          const language = lines[0].trim() || 'javascript';
          const code = lines.slice(1).join('\n').trim();
          return (
            <div key={idx} className="my-3 rounded-lg overflow-hidden border border-white/5 font-mono text-[11px] sm:text-xs">
              <div className="px-4.5 py-1.5 bg-slate-950 text-slate-500 border-b border-white/5 flex justify-between items-center">
                <span>{language}</span>
                <span className="text-[9px] uppercase font-bold tracking-wide">AI Block</span>
              </div>
              <pre className="p-4 bg-slate-950/80 overflow-x-auto text-slate-300 leading-normal select-text">
                <code>{code}</code>
              </pre>
            </div>
          );
        }
        return <span key={idx}>{renderTextBlocks(part)}</span>;
      });
    }
    return renderTextBlocks(text);
  };

  const renderTextBlocks = (text) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      if (line.trim().startsWith('###')) {
        return (
          <h4 key={idx} className="text-xs sm:text-sm font-extrabold font-heading text-white mt-3.5 mb-1.5 tracking-wide uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> {line.replace('###', '').trim()}
          </h4>
        );
      }
      
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        const clean = line.trim().replace(/^[\s*-]+/, '').trim();
        return (
          <li key={idx} className="text-slate-300 text-xs font-sans list-disc ml-5 mt-1.5 leading-relaxed">
            {parseInlineStyles(clean)}
          </li>
        );
      }

      if (/^\d+\.\s/.test(line.trim())) {
        const clean = line.trim().replace(/^\d+\.\s+/, '').trim();
        return (
          <li key={idx} className="text-slate-300 text-xs font-sans list-decimal ml-5 mt-1.5 leading-relaxed">
            {parseInlineStyles(clean)}
          </li>
        );
      }

      return (
        <p key={idx} className="text-slate-300 text-xs sm:text-sm font-sans mt-2.5 leading-relaxed">
          {parseInlineStyles(line)}
        </p>
      );
    });
  };

  const parseInlineStyles = (line) => {
    if (line.includes('**') || line.includes('`')) {
      const boldParts = line.split('**');
      return boldParts.map((bPart, bIdx) => {
        if (bIdx % 2 === 1) {
          if (bPart.includes('`')) {
            return <strong key={bIdx} className="text-white font-bold">{parseCode(bPart)}</strong>;
          }
          return <strong key={bIdx} className="text-white font-bold">{bPart}</strong>;
        }
        return parseCode(bPart);
      });
    }
    return line;
  };

  const parseCode = (text) => {
    if (text.includes('`')) {
      const cParts = text.split('`');
      return cParts.map((cPart, cIdx) => {
        if (cIdx % 2 === 1) {
          return <code key={cIdx} className="px-1.5 py-0.5 rounded bg-slate-950 border border-white/5 font-mono text-cyan-400 text-xs">{cPart}</code>;
        }
        return cPart;
      });
    }
    return text;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-gradient tracking-tight flex items-center gap-2">
              <Bot className="w-8 h-8 text-cyan-400" /> AI Career Assistant
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm font-sans mt-0.5">
              Consult with your SDE coach, write cold-outreach letters, or practice coding principles.
            </p>
          </div>
          
          <Button variant="outline" size="sm" onClick={clearChat} icon={<Trash2 className="w-3.5 h-3.5" />}>
            Clear Thread
          </Button>
        </div>

        {/* Messaging Box */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-230px)] min-h-[500px]">
          
          <div className="hidden lg:block lg:col-span-1">
            <ChatHistory chatHistory={chatHistory} />
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3 h-full flex flex-col justify-between relative">
            <Card hoverEffect={false} className="flex-1 flex flex-col justify-between p-5 overflow-hidden border-white/5">
              
              <ChatFeed 
                messages={messages} 
                sending={sending} 
                renderMessageContent={renderMessageContent} 
              />
              
              <div ref={messagesEndRef} />

              <div className="border-t border-white/5 pt-4.5 mt-4 space-y-4">
                
                {messages.length <= 2 && !sending && (
                  <div className="flex flex-wrap gap-2.5">
                    {suggestedPrompts.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => handlePromptClick(p)}
                        className="px-3.5 py-2 rounded-lg bg-slate-900 border border-white/5 hover:border-white/12 text-slate-400 hover:text-white text-xs font-semibold font-sans tracking-wide transition-all cursor-pointer inline-flex items-center gap-1.5"
                      >
                        {p} <ArrowUpRight className="w-3.5 h-3.5 opacity-55" />
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex gap-3">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    disabled={sending}
                    placeholder="Ask AI Career Coach SDE recommendations, cover letters templates, SQL exercises..."
                    className="flex-grow px-4 py-3 rounded-lg bg-slate-900 border border-slate-800 focus:outline-none focus:border-cyan-500/80 text-white font-sans text-xs sm:text-sm"
                  />
                  <Button 
                    variant="primary" 
                    onClick={() => handleSend()}
                    disabled={sending || !inputMessage.trim()}
                    icon={<Send className="w-4.5 h-4.5 text-black" />}
                  >
                    Send
                  </Button>
                </div>
              </div>

            </Card>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};
export default AICareerAssistant;
