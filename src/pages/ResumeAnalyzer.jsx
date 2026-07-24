import React, { useState, useRef } from 'react';
import { FileText, FileCode } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { ProgressBar } from '../components/ui/Progress';
import { Spinner } from '../components/ui/Loaders';
import { Card } from '../components/ui/Cards';
import { useTheme } from '../context/ThemeContext';
import { apiService } from '../services/api';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

// Subcomponents imports
import ResumeDropzone from '../components/resume/ResumeDropzone';
import ResumeATSOverview from '../components/resume/ResumeATSOverview';

export const ResumeAnalyzer = () => {
  const { accent } = useTheme();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const accentColor = accent === 'cyan' ? 'text-cyan-400' : 'text-purple-400';
  const accentBorder = accent === 'cyan' ? 'border-cyan-500/25' : 'border-purple-500/25';
  const activeGlow = accent === 'cyan' ? 'glow-cyan' : 'glow-purple';

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      validateAndSetFile(files[0]);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      validateAndSetFile(files[0]);
    }
  };

  const validateAndSetFile = (file) => {
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!['pdf', 'docx', 'doc'].includes(fileExtension)) {
      toast.error('Only PDF, DOC, or DOCX resume formats are supported.');
      return;
    }
    setSelectedFile(file);
    setAnalysisResult(null);
    toast.success(`Resume selected: ${file.name}`);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setAnalyzing(true);

    try {
      const result = await apiService.analyzeResume(selectedFile);
      setAnalysisResult(result);
      toast.success('Resume analysis finished successfully!');
    } catch (error) {
      toast.error('Resume scanning failed.');
    } finally {
      setAnalyzing(false);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setAnalysisResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-gradient tracking-tight flex items-center gap-2">
              <FileText className="w-8 h-8 text-cyan-400" /> ATS Resume Analyzer
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm font-sans mt-0.5">
              Drag and drop your SDE resume to evaluate keyword density, layout compliance, and ATS readability.
            </p>
          </div>
        </div>

        {/* Upload Container & Results view */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Upload panel */}
          <div className="lg:col-span-1 space-y-6">
            <ResumeDropzone
              selectedFile={selectedFile}
              dragOver={dragOver}
              analyzing={analyzing}
              handleDragOver={handleDragOver}
              handleDragLeave={handleDragLeave}
              handleDrop={handleDrop}
              fileInputRef={fileInputRef}
              handleFileChange={handleFileChange}
              clearFile={clearFile}
              handleAnalyze={handleAnalyze}
              accentColor={accentColor}
              accentBorder={accentBorder}
            />

            {/* Simulating scanning action loader */}
            {analyzing && (
              <Card hoverEffect={false} className="p-5 space-y-4 border-white/5">
                <div className="flex items-center gap-3">
                  <Spinner size="sm" color={accent} />
                  <span className="text-xs font-semibold text-white font-sans">Parsing resume structure...</span>
                </div>
                <ProgressBar value={45} height="h-1.5" showPercentage={false} />
              </Card>
            )}
          </div>

          {/* Result view */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {analysisResult ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.3 }}
                >
                  <ResumeATSOverview
                    analysisResult={analysisResult}
                    accent={accent}
                    activeGlow={activeGlow}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-8 border border-white/5 rounded-xl bg-slate-900/10"
                >
                  <FileCode className="w-12 h-12 text-slate-600 mb-4 animate-float" />
                  <h3 className="text-sm font-bold font-heading text-white tracking-wide">Analysis Panel Ready</h3>
                  <p className="text-slate-500 text-xs font-sans max-w-sm mt-1 leading-relaxed">
                    Once you upload your resume file and click "Start Scanner Analysis", comprehensive ATS diagnostic data will populate here.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};
export default ResumeAnalyzer;
