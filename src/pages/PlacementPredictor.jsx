import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, ArrowRight, ArrowLeft, RefreshCw, Sparkles } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Cards';
import { Button } from '../components/ui/Buttons';
import { apiService } from '../services/api';
import toast from 'react-hot-toast';

// Subcomponent import
import PredictorForm from '../components/predictor/PredictorForm';

export const PlacementPredictor = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State initialized with standard high-potential defaults
  const [formData, setFormData] = useState({
    age: 21,
    cgpa: 8.2,
    backlogs: 0,
    attendance: 85.0,
    tenth_percentage: 88.5,
    twelfth_percentage: 84.0,
    branch: 'CSE',
    college_tier: 2,
    
    python_skill: 4,
    cpp_skill: 3,
    java_skill: 2,
    ml_skill: 3,
    web_dev_skill: 4,
    communication_skill: 4,
    
    aptitude_score: 78,
    logical_reasoning: 80,
    
    internships: 1,
    projects: 3,
    github_projects: 4,
    hackathons: 1,
    certifications: 2,
    coding_contest_rating: 1450,
    
    teamwork: 4,
    leadership: 3,
    problem_solving: 4,
    time_management: 4,
    
    gender: 'Male',
    city_tier: 2,
    family_income: 6.5,
  });

  const handleInputChange = (field, value) => {
    let parsedValue = value;
    
    if (['age', 'backlogs', 'college_tier', 'python_skill', 'cpp_skill', 'java_skill', 
         'ml_skill', 'web_dev_skill', 'communication_skill', 'aptitude_score', 
         'logical_reasoning', 'internships', 'projects', 'github_projects', 
         'hackathons', 'certifications', 'coding_contest_rating', 'teamwork', 
         'leadership', 'problem_solving', 'time_management', 'city_tier'].includes(field)) {
      parsedValue = parseInt(value, 10) || 0;
    } else if (['cgpa', 'attendance', 'tenth_percentage', 'twelfth_percentage', 'family_income'].includes(field)) {
      parsedValue = parseFloat(value) || 0.0;
    }

    setFormData((prev) => ({
      ...prev,
      [field]: parsedValue,
    }));
  };

  const handlePreFill = (type) => {
    if (type === 'elite') {
      setFormData({
        age: 21, cgpa: 9.4, backlogs: 0, attendance: 92.0, tenth_percentage: 95.0, twelfth_percentage: 92.5,
        branch: 'CSE', college_tier: 1, python_skill: 5, cpp_skill: 4, java_skill: 3, ml_skill: 4,
        web_dev_skill: 5, communication_skill: 5, aptitude_score: 95, logical_reasoning: 92,
        internships: 2, projects: 4, github_projects: 8, hackathons: 3, certifications: 4, coding_contest_rating: 1850,
        teamwork: 5, leadership: 4, problem_solving: 5, time_management: 4, gender: 'Male', city_tier: 1, family_income: 12.0
      });
      toast.success('Pre-filled Elite SDE Profile');
    } else if (type === 'average') {
      setFormData({
        age: 22, cgpa: 7.1, backlogs: 1, attendance: 76.5, tenth_percentage: 75.0, twelfth_percentage: 71.0,
        branch: 'IT', college_tier: 3, python_skill: 3, cpp_skill: 2, java_skill: 2, ml_skill: 1,
        web_dev_skill: 3, communication_skill: 3, aptitude_score: 60, logical_reasoning: 64,
        internships: 0, projects: 1, github_projects: 1, hackathons: 0, certifications: 1, coding_contest_rating: 1200,
        teamwork: 3, leadership: 2, problem_solving: 3, time_management: 3, gender: 'Female', city_tier: 3, family_income: 4.2
      });
      toast.success('Pre-filled Standard Profile');
    }
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(4, prev + 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(1, prev - 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    toast.promise(
      apiService.predictPlacement(formData),
      {
        loading: 'Running predictive neural modeling...',
        success: (res) => {
          setLoading(false);
          navigate('/results', { state: { predictionResult: res, studentProfile: formData } });
          return 'Prediction complete!';
        },
        error: (err) => {
          setLoading(false);
          return 'Prediction failed. Please try again.';
        }
      }
    );
  };

  const stepsInfo = [
    { title: 'Academic Foundation' },
    { title: 'Technical Competency' },
    { title: 'Experience & Portfolios' },
    { title: 'Soft Skills & Demographics' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-gradient tracking-tight flex items-center gap-2">
              <Award className="w-8 h-8 text-cyan-400" /> Placement Predictor
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm font-sans mt-0.5">
              Enter academic metrics, coding profiles, and projects to run simulated placement outcomes.
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handlePreFill('elite')} icon={<Sparkles className="w-3.5 h-3.5 text-cyan-400" />}>
              Elite SDE
            </Button>
            <Button variant="outline" size="sm" onClick={() => handlePreFill('average')} icon={<RefreshCw className="w-3.5 h-3.5 text-purple-400" />}>
              Standard
            </Button>
          </div>
        </div>

        {/* Progress Tracker */}
        <Card hoverEffect={false} className="p-4 sm:p-5 border-white/5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-[10px] font-sans font-bold text-slate-500 uppercase tracking-widest">
                Step {currentStep} of 4
              </span>
              <h3 className="text-sm font-bold font-heading text-white tracking-wide mt-0.5">
                {stepsInfo[currentStep - 1].title}
              </h3>
            </div>

            {/* Visual steps */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {[1, 2, 3, 4].map((step) => (
                <div 
                  key={step}
                  className={`
                    h-2 rounded-full transition-all duration-300
                    ${step === currentStep 
                      ? 'w-10 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.4)]' 
                      : step < currentStep 
                        ? 'w-6 bg-cyan-500/50' 
                        : 'w-6 bg-slate-800'
                    }
                  `}
                />
              ))}
            </div>
          </div>
        </Card>

        {/* Form Wizard body */}
        <form onSubmit={handleSubmit}>
          <Card hoverEffect={false} className="p-6 border-white/5">
            <CardContent>
              <PredictorForm 
                currentStep={currentStep} 
                formData={formData} 
                handleInputChange={handleInputChange} 
              />
            </CardContent>
          </Card>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-6">
            <Button
              variant="outline"
              size="md"
              onClick={prevStep}
              disabled={currentStep === 1 || loading}
              icon={<ArrowLeft className="w-4.5 h-4.5" />}
            >
              Back
            </Button>
            
            {currentStep < 4 ? (
              <Button
                variant="primary"
                size="md"
                onClick={nextStep}
                disabled={loading}
                icon={<ArrowRight className="w-4.5 h-4.5 text-black" />}
              >
                Continue
              </Button>
            ) : (
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                disabled={loading}
                isLoading={loading}
                icon={<Sparkles className="w-4.5 h-4.5 text-white" />}
              >
                Generate Prediction Analysis
              </Button>
            )}
          </div>
        </form>

      </div>
    </DashboardLayout>
  );
};
export default PlacementPredictor;
