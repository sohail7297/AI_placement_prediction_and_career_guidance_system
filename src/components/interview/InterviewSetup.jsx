import React from 'react';
import { Play, ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Cards';
import { Button } from '../ui/Buttons';
import { Select } from '../ui/Inputs';

export const InterviewSetup = ({ role, setRole, handleStart, loading }) => {
  return (
    <Card hoverEffect={false} className="p-6 space-y-6 border-white/5">
      <CardHeader>
        <div className="text-center w-full">
          <CardTitle className="justify-center">Setup Interview Session</CardTitle>
          <CardDescription>Select your SDE discipline to fetch target screening banks</CardDescription>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-5 font-sans">
        <Select 
          label="Target Engineering Role" 
          id="interview_role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          options={['Software Engineer', 'Frontend Developer', 'Data Scientist']}
        />

        <div className="p-4 rounded-lg bg-slate-900 border border-white/5 space-y-2.5 text-xs text-slate-400">
          <p className="font-bold text-white flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-cyan-400" /> Guidelines</p>
          <p>• The session contains 5 role-specific questions.</p>
          <p>• Press the microphone toggle to record your answer, or type inside the input area.</p>
          <p>• Feedback grades are delivered immediately upon completing the evaluation deck.</p>
        </div>

        <Button 
          variant="primary" 
          className="w-full text-center py-3" 
          onClick={handleStart}
          disabled={loading}
          isLoading={loading}
          icon={<Play className="w-4 h-4 text-black" />}
        >
          Start Interview
        </Button>
      </CardContent>
    </Card>
  );
};
export default InterviewSetup;
