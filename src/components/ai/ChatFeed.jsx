import React from 'react';
import { Bot, User, Sparkles } from 'lucide-react';

export const ChatFeed = ({ messages, sending, renderMessageContent }) => {
  return (
    <div className="flex-1 overflow-y-auto space-y-5.5 pr-2.5 max-h-[calc(100vh-390px)] font-sans">
      {messages.map((msg) => {
        const isBot = msg.sender === 'bot';
        return (
          <div 
            key={msg.id}
            className={`flex gap-3.5 max-w-[85%] ${isBot ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
          >
            {/* Avatar */}
            <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center flex-shrink-0 border ${isBot ? 'bg-slate-900 border-white/15 text-cyan-400' : 'bg-slate-800 border-white/15 text-purple-400'}`}>
              {isBot ? <Bot className="w-4.5 h-4.5" /> : <User className="w-4.5 h-4.5" />}
            </div>
            
            {/* Speech bubble */}
            <div className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed ${isBot ? 'bg-slate-900/60 border border-white/5 rounded-tl-none' : 'bg-slate-800 border border-white/8 rounded-tr-none text-white font-medium'}`}>
              {renderMessageContent(msg.text)}
              <span className="text-[9px] text-slate-500 font-sans block text-right mt-2 font-medium">{msg.time}</span>
            </div>
          </div>
        );
      })}

      {/* Animated Typing bubble loader */}
      {sending && (
        <div className="flex gap-3.5 max-w-[80%] mr-auto items-center">
          <div className="w-8.5 h-8.5 rounded-full bg-slate-900 border border-white/15 flex items-center justify-center text-cyan-400">
            <Bot className="w-4.5 h-4.5 animate-pulse" />
          </div>
          <div className="p-3.5 px-4 bg-slate-900/60 border border-white/5 rounded-xl rounded-tl-none flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]" />
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        </div>
      )}
    </div>
  );
};
export default ChatFeed;
