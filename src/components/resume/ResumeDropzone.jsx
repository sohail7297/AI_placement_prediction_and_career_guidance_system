import React from 'react';
import { UploadCloud, FileCheck, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '../ui/Cards';
import { Button } from '../ui/Buttons';

export const ResumeDropzone = ({
  selectedFile,
  dragOver,
  analyzing,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  fileInputRef,
  handleFileChange,
  clearFile,
  handleAnalyze,
  accentColor,
  accentBorder
}) => {
  return (
    <Card hoverEffect={false} className="p-6 border-white/5">
      <CardHeader className="mb-4">
        <CardTitle className="text-sm">Upload Resume File</CardTitle>
      </CardHeader>
      
      {!selectedFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-xl p-8 text-center cursor-pointer select-none flex flex-col items-center justify-center gap-4.5
            transition-all duration-200 min-h-[220px] bg-slate-900/10
            ${dragOver 
              ? 'border-cyan-500 bg-cyan-500/5' 
              : 'border-slate-800 hover:border-slate-600 hover:bg-slate-900/30'
            }
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.doc"
            onChange={handleFileChange}
            className="hidden"
          />
          <UploadCloud className="w-12 h-12 text-slate-500" />
          <div>
            <p className="text-sm text-white font-semibold font-heading">Drag and drop file here</p>
            <p className="text-slate-500 text-[10px] mt-1 font-sans">Accepts PDF, DOCX, DOC files (Max 5MB)</p>
          </div>
          <Button variant="outline" size="sm">
            Select File
          </Button>
        </div>
      ) : (
        <div className="space-y-6 font-sans">
          <div className="p-4.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg bg-slate-950 border ${accentBorder} flex items-center justify-center`}>
                <FileCheck className={`w-5 h-5 ${accentColor}`} />
              </div>
              <div className="max-w-[140px] sm:max-w-none">
                <p className="text-xs text-white font-semibold truncate">{selectedFile.name}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <button 
              onClick={clearFile}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4.5 h-4.5" />
            </button>
          </div>

          <Button 
            variant="primary" 
            className="w-full text-center" 
            onClick={handleAnalyze}
            disabled={analyzing}
            isLoading={analyzing}
          >
            Start Scanner Analysis
          </Button>
        </div>
      )}
    </Card>
  );
};
export default ResumeDropzone;
