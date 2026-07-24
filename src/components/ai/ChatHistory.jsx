import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '../ui/Cards';

export const ChatHistory = ({ chatHistory }) => {
  return (
    <Card hoverEffect={false} className="p-5 h-full flex flex-col justify-between overflow-y-auto border-white/5 font-sans">
      <div className="space-y-4">
        <CardHeader className="mb-0">
          <CardTitle className="text-xs uppercase tracking-wider text-slate-500 font-heading">
            Recent Chats
          </CardTitle>
        </CardHeader>
        
        <div className="space-y-2">
          {chatHistory.map((chat) => (
            <div 
              key={chat.id} 
              className="p-3 rounded-lg border border-white/5 hover:border-white/10 hover:bg-slate-900/40 cursor-pointer transition-all flex items-center gap-3.5"
            >
              <MessageSquare className="w-4 h-4 text-slate-500" />
              <div className="max-w-[130px]">
                <p className="text-xs text-slate-300 truncate font-medium">{chat.title}</p>
                <span className="text-[9px] text-slate-500 mt-0.5 block">{chat.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 rounded-lg bg-slate-950/60 border border-white/5 text-[11px] leading-relaxed text-slate-500">
        AI Coach version 2.4. Prompt guidelines updated daily based on hiring market logs.
      </div>
    </Card>
  );
};
export default ChatHistory;
