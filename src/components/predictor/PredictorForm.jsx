import React from 'react';
import { Input, Select } from '../ui/Inputs';

export const PredictorForm = ({ currentStep, formData, handleInputChange }) => {
  return (
    <div className="font-sans">
      {/* STEP 1: ACADEMICS */}
      {currentStep === 1 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Input 
            label="Current CGPA" id="cgpa" type="number" step="0.01" min="0" max="10" required 
            value={formData.cgpa} onChange={(e) => handleInputChange('cgpa', e.target.value)} 
            placeholder="e.g. 8.45" 
          />
          <Input 
            label="Active Backlogs" id="backlogs" type="number" min="0" required 
            value={formData.backlogs} onChange={(e) => handleInputChange('backlogs', e.target.value)} 
            placeholder="e.g. 0" 
          />
          <Input 
            label="Attendance Percentage" id="attendance" type="number" step="0.1" min="0" max="100" required 
            value={formData.attendance} onChange={(e) => handleInputChange('attendance', e.target.value)} 
            placeholder="e.g. 85.0" 
          />
          <Input 
            label="10th Standard Percentage" id="tenth_percentage" type="number" step="0.1" min="0" max="100" required 
            value={formData.tenth_percentage} onChange={(e) => handleInputChange('tenth_percentage', e.target.value)} 
            placeholder="e.g. 90.0" 
          />
          <Input 
            label="12th Standard Percentage" id="twelfth_percentage" type="number" step="0.1" min="0" max="100" required 
            value={formData.twelfth_percentage} onChange={(e) => handleInputChange('twelfth_percentage', e.target.value)} 
            placeholder="e.g. 85.0" 
          />
          <Select 
            label="Engineering Branch" id="branch" required
            value={formData.branch} onChange={(e) => handleInputChange('branch', e.target.value)}
            options={['CSE', 'IT', 'ECE', 'EE', 'ME', 'CE']}
          />
          <Select 
            label="College Tier" id="college_tier" required
            value={formData.college_tier} onChange={(e) => handleInputChange('college_tier', e.target.value)}
            options={[
              { value: 1, label: 'Tier 1 (IIT, NIT, Premium)' },
              { value: 2, label: 'Tier 2 (Reputed State/Private)' },
              { value: 3, label: 'Tier 3 (Affiliated Colleges)' }
            ]}
          />
          <Input 
            label="Age" id="age" type="number" min="18" max="30" required 
            value={formData.age} onChange={(e) => handleInputChange('age', e.target.value)} 
            placeholder="e.g. 21" 
          />
        </div>
      )}

      {/* STEP 2: TECHNICAL COMPETENCIES */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Select 
              label="Python Competency" id="python_skill" required
              value={formData.python_skill} onChange={(e) => handleInputChange('python_skill', e.target.value)}
              options={['1 - Novice', '2 - Familiar', '3 - Proficient', '4 - Advanced', '5 - SDE Expert']}
            />
            <Select 
              label="C++ Competency" id="cpp_skill" required
              value={formData.cpp_skill} onChange={(e) => handleInputChange('cpp_skill', e.target.value)}
              options={['1 - Novice', '2 - Familiar', '3 - Proficient', '4 - Advanced', '5 - SDE Expert']}
            />
            <Select 
              label="Java Competency" id="java_skill" required
              value={formData.java_skill} onChange={(e) => handleInputChange('java_skill', e.target.value)}
              options={['1 - Novice', '2 - Familiar', '3 - Proficient', '4 - Advanced', '5 - SDE Expert']}
            />
            <Select 
              label="Machine Learning Depth" id="ml_skill" required
              value={formData.ml_skill} onChange={(e) => handleInputChange('ml_skill', e.target.value)}
              options={['1 - Novice', '2 - Familiar', '3 - Proficient', '4 - Advanced', '5 - SDE Expert']}
            />
            <Select 
              label="Web Development Depth" id="web_dev_skill" required
              value={formData.web_dev_skill} onChange={(e) => handleInputChange('web_dev_skill', e.target.value)}
              options={['1 - Novice', '2 - Familiar', '3 - Proficient', '4 - Advanced', '5 - SDE Expert']}
            />
            <Select 
              label="Communication Clearability" id="communication_skill" required
              value={formData.communication_skill} onChange={(e) => handleInputChange('communication_skill', e.target.value)}
              options={['1 - Novice', '2 - Familiar', '3 - Proficient', '4 - Advanced', '5 - SDE Expert']}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-white/5 pt-6">
            <Input 
              label="Aptitude Test Score (0-100)" id="aptitude_score" type="number" min="0" max="100" required 
              value={formData.aptitude_score} onChange={(e) => handleInputChange('aptitude_score', e.target.value)} 
              placeholder="e.g. 75" 
            />
            <Input 
              label="Logical Reasoning Score (0-100)" id="logical_reasoning" type="number" min="0" max="100" required 
              value={formData.logical_reasoning} onChange={(e) => handleInputChange('logical_reasoning', e.target.value)} 
              placeholder="e.g. 80" 
            />
          </div>
        </div>
      )}

      {/* STEP 3: EXPERIENCE & PORTFOLIO */}
      {currentStep === 3 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Input 
            label="Internships Completed" id="internships" type="number" min="0" required 
            value={formData.internships} onChange={(e) => handleInputChange('internships', e.target.value)} 
            placeholder="e.g. 1" 
          />
          <Input 
            label="Portfolio Projects" id="projects" type="number" min="0" required 
            value={formData.projects} onChange={(e) => handleInputChange('projects', e.target.value)} 
            placeholder="e.g. 3" 
          />
          <Input 
            label="GitHub Repositories" id="github_projects" type="number" min="0" required 
            value={formData.github_projects} onChange={(e) => handleInputChange('github_projects', e.target.value)} 
            placeholder="e.g. 5" 
          />
          <Input 
            label="Hackathons Attended" id="hackathons" type="number" min="0" required 
            value={formData.hackathons} onChange={(e) => handleInputChange('hackathons', e.target.value)} 
            placeholder="e.g. 1" 
          />
          <Input 
            label="Industry Certifications" id="certifications" type="number" min="0" required 
            value={formData.certifications} onChange={(e) => handleInputChange('certifications', e.target.value)} 
            placeholder="e.g. 2" 
          />
          <Input 
            label="Contest Rating (CodeChef/LeetCode)" id="coding_contest_rating" type="number" min="0" required 
            value={formData.coding_contest_rating} onChange={(e) => handleInputChange('coding_contest_rating', e.target.value)} 
            placeholder="e.g. 1450" 
          />
        </div>
      )}

      {/* STEP 4: BEHAVIORAL & DEMOGRAPHICS */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <Select 
              label="Teamwork capability" id="teamwork" required
              value={formData.teamwork} onChange={(e) => handleInputChange('teamwork', e.target.value)}
              options={['1 - Low', '2 - Moderate', '3 - Proficient', '4 - Strong', '5 - Leadership Level']}
            />
            <Select 
              label="Leadership Capability" id="leadership" required
              value={formData.leadership} onChange={(e) => handleInputChange('leadership', e.target.value)}
              options={['1 - Low', '2 - Moderate', '3 - Proficient', '4 - Strong', '5 - Leadership Level']}
            />
            <Select 
              label="Problem Solving Rate" id="problem_solving" required
              value={formData.problem_solving} onChange={(e) => handleInputChange('problem_solving', e.target.value)}
              options={['1 - Low', '2 - Moderate', '3 - Proficient', '4 - Strong', '5 - Leadership Level']}
            />
            <Select 
              label="Time Management Rate" id="time_management" required
              value={formData.time_management} onChange={(e) => handleInputChange('time_management', e.target.value)}
              options={['1 - Low', '2 - Moderate', '3 - Proficient', '4 - Strong', '5 - Leadership Level']}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 border-t border-white/5 pt-6">
            <Select 
              label="Gender" id="gender" required
              value={formData.gender} onChange={(e) => handleInputChange('gender', e.target.value)}
              options={['Male', 'Female', 'Other']}
            />
            <Select 
              label="Home City Tier" id="city_tier" required
              value={formData.city_tier} onChange={(e) => handleInputChange('city_tier', e.target.value)}
              options={[
                { value: 1, label: 'Tier 1 (Metro)' },
                { value: 2, label: 'Tier 2 (Urban)' },
                { value: 3, label: 'Tier 3 (Semi-urban/Rural)' }
              ]}
            />
            <Input 
              label="Annual Family Income (LPA)" id="family_income" type="number" step="0.1" min="0" required 
              value={formData.family_income} onChange={(e) => handleInputChange('family_income', e.target.value)} 
              placeholder="e.g. 6.5" 
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default PredictorForm;
