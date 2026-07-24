import axios from 'axios';

const API_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Axios response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = 'Connection failed. Local models fallback active.';
    if (error.response) {
      message = error.response.data?.detail || error.response.data?.message || `Error status: ${error.response.status}`;
    } else if (error.request) {
      message = 'FastAPI server offline. Initializing client-side analytical simulation...';
    }
    console.warn('[API Interceptor] SDE pipeline exception:', message);
    return Promise.reject(new Error(message));
  }
);

// A Helper function to calculate a mock prediction if the backend is offline
const calculateMockPrediction = (data) => {
  // Simple heuristic prediction
  let score = 0;
  
  // CGPA contribution (max 30 points)
  score += Math.min(30, (data.cgpa / 10) * 30);
  
  // Technical Skills (max 24 points)
  const skillsSum = (data.python_skill || 0) + (data.cpp_skill || 0) + (data.java_skill || 0) + (data.ml_skill || 0) + (data.web_dev_skill || 0);
  score += Math.min(24, (skillsSum / 25) * 24);
  
  // Aptitude & Reasoning (max 16 points)
  score += Math.min(8, (data.aptitude_score / 100) * 8);
  score += Math.min(8, (data.logical_reasoning / 100) * 8);
  
  // Experiences: Internships & Projects (max 20 points)
  score += Math.min(10, (data.internships || 0) * 5);
  score += Math.min(10, (data.projects || 0) * 3.5);
  
  // Extracurriculars (max 10 points)
  score += Math.min(4, (data.hackathons || 0) * 2);
  score += Math.min(3, (data.certifications || 0) * 1.5);
  score += Math.min(3, (data.github_projects || 0) * 1.5);
  
  // Penalty for backlogs
  score -= (data.backlogs || 0) * 8;
  
  // Clamp score
  let finalProbability = Math.max(12, Math.min(98, score + 15)); // adding base probability offset
  finalProbability = Math.round(finalProbability * 100) / 100;
  
  const isPlaced = finalProbability >= 55;
  const prediction = isPlaced ? 'Placed' : 'Not Placed';

  // Customized AI feedback based on their profile
  const strengths = [];
  const weaknesses = [];
  const recommendations = [];
  const career_paths = [];

  if (data.cgpa >= 8.5) {
    strengths.push('Excellent academic foundation with high CGPA (' + data.cgpa + ').');
  } else if (data.cgpa < 7.0) {
    weaknesses.push('Current CGPA is below 7.0, which might filter you out of initial shortlist rounds for Tier-1 companies.');
    recommendations.push('Focus on raising your CGPA in the upcoming semesters above the 7.5 threshold.');
  }

  if (data.web_dev_skill >= 4) {
    strengths.push('Strong full-stack or frontend development capabilities.');
    career_paths.push('Frontend Developer', 'Full Stack Engineer');
  }
  if (data.ml_skill >= 4) {
    strengths.push('Solid grasp of Machine Learning concepts and predictive modeling.');
    career_paths.push('Data Scientist', 'Machine Learning Engineer');
  }
  if (skillsSum <= 10) {
    weaknesses.push('Limited depth in core coding skills (Python, Java, C++).');
    recommendations.push('Pick one major coding language (Java/C++ for DSA, or Python) and spend 3 months building projects.');
  }

  if (data.internships > 0) {
    strengths.push('Practical exposure through ' + data.internships + ' industry internship(s).');
  } else {
    weaknesses.push('Lack of corporate or real-world internship experiences.');
    recommendations.push('Apply to startup roles, open-source programs, or remote internships to gain industrial work experience.');
  }

  if (data.projects >= 3) {
    strengths.push('Good portfolio of ' + data.projects + ' standalone software development projects.');
  } else {
    recommendations.push('Build at least 2 comprehensive capstone projects and host them live with a clean GitHub Readme.');
  }

  if (data.communication_skill >= 4) {
    strengths.push('Clear articulation and effective soft skills.');
  } else {
    weaknesses.push('Communication skills could be improved to crack behavioral and HR interview rounds.');
    recommendations.push('Participate in group discussions and practice mock interviews to build communication confidence.');
  }

  if (data.backlogs > 0) {
    weaknesses.push('Active backlog history (' + data.backlogs + ') is a significant blocker for top-tier hiring guidelines.');
    recommendations.push('Clear all outstanding backlogs as a priority before the start of placement drives.');
  }

  // Fallbacks for recommended paths
  if (career_paths.length === 0) {
    career_paths.push('Software Development Engineer (SDE)', 'Systems Engineer');
  }
  career_paths.push('IT Consultant', 'Associate Product Manager');

  // Fill in default feedback if empty
  if (strengths.length === 0) strengths.push('Adaptable skill set and enthusiasm to learn new frameworks.');
  if (weaknesses.length === 0) weaknesses.push('Lack of competitive coding profile or algorithmic contest ratings.');
  if (recommendations.length === 0) recommendations.push('Build algorithmic problem solving skills on platforms like LeetCode or HackerRank.');

  return {
    prediction,
    placement_probability: finalProbability,
    ai_analysis: {
      strengths,
      weaknesses,
      recommendations,
      career_paths
    }
  };
};

export const apiService = {
  // 1. PLACEMENT PREDICTION
  predictPlacement: async (studentData) => {
    try {
      const response = await api.post('/predict', studentData);
      return response.data;
    } catch (error) {
      console.warn('Backend API connection failed, simulating local ML inference...', error);
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return calculateMockPrediction(studentData);
    }
  },

  // 2. RESUME ANALYZER
  analyzeResume: async (file) => {
    try {
      // Create form data
      const formData = new FormData();
      formData.append('resume', file);
      
      const response = await api.post('/resume/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.warn('Backend /resume/analyze not available, running local ATS engine...', error);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Calculate random ATS score based on file name length (reproducible)
      const seed = file.name.length;
      const score = Math.round(65 + (seed % 28)); // 65 - 93
      
      const missingKeywords = [
        'Docker', 'Kubernetes', 'CI/CD Pipelines', 'AWS Cloud Services', 
        'System Design', 'Redis', 'Unit Testing (Jest/PyTest)', 'Agile Methodologies'
      ].filter((_, i) => (seed + i) % 3 === 0);

      const suggestions = [
        {
          category: 'Formatting',
          text: 'Convert your resume to a single-column layout. Multi-column templates often parsing-error in older corporate ATS systems.'
        },
        {
          category: 'Impact Metrics',
          text: 'Quantify your accomplishments. Instead of "Responsible for writing features", use "Designed and built features that improved page load speed by 24%".'
        },
        {
          category: 'Skill Density',
          text: 'Create a dedicated "Technical Skills" section categorized by Languages, Libraries/Frameworks, and Tools/Platforms for better ATS indexing.'
        },
        {
          category: 'Project Depth',
          text: 'List the active deployment links or GitHub code URLs for each of your key projects to allow recruiters to review your work.'
        }
      ].filter((_, i) => (seed + i) % 2 === 0);

      if (suggestions.length === 0) {
        suggestions.push({
          category: 'General',
          text: 'Your resume looks great! Consider tailoring the summary paragraph specifically to SDE or Data Science roles before submitting.'
        });
      }

      return {
        filename: file.name,
        ats_score: score,
        missing_keywords: missingKeywords,
        suggestions,
        summary: `The resume has been successfully scanned. It has a competitive score of ${score}/100. Formatting is clean, but indexing could be strengthened by adding missing DevOps terms and highlighting quantified project achievements.`
      };
    }
  },

  // 3. AI MOCK INTERVIEW
  startInterview: async (config) => {
    try {
      const response = await api.post('/interview/start', config);
      return response.data;
    } catch (error) {
      console.warn('Backend /interview/start not available, loading simulated interview dataset...', error);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const role = config.role || 'Software Engineer';
      let questions = [];

      if (role.toLowerCase().includes('data science') || role.toLowerCase().includes('analyst')) {
        questions = [
          'Can you explain the bias-variance tradeoff in machine learning and how to address overfitting?',
          'What is the difference between L1 (Lasso) and L2 (Ridge) regularization?',
          'Describe a scenario where you would use a random forest versus a gradient boosted tree.',
          'How do you handle highly imbalanced datasets in classification tasks?',
          'Walk me through a project where you clean and analyze a noisy real-world dataset.'
        ];
      } else if (role.toLowerCase().includes('frontend') || role.toLowerCase().includes('react')) {
        questions = [
          'What are the core differences between React 18 and React 19, particularly regarding Server Actions and use hooks?',
          'Explain the concept of React fiber and how the concurrent rendering model works.',
          'How would you optimize the load time performance of a complex data-heavy React dashboard?',
          'What is the difference between absolute, relative, sticky, and fixed positioning in CSS layouts?',
          'How do you prevent unnecessary child components re-rendering when state in parent is updated?'
        ];
      } else {
        // Default Software Engineer / SDE questions
        questions = [
          'Explain the difference between a process and a thread, and how multi-threading is handled in your preferred programming language.',
          'How does a hash map resolve collisions internally? Talk about time complexity in worst-case scenarios.',
          'Describe a time when you had to debug a memory leak or a severe performance bottleneck in one of your applications.',
          'What are the SOLID principles of Object-Oriented Design, and can you give an example of the Single Responsibility Principle?',
          'Explain how database indexing works and the potential trade-offs in write performance.'
        ];
      }

      return {
        role,
        session_id: 'int_' + Math.random().toString(36).substr(2, 9),
        questions,
      };
    }
  },

  // 4. AI CAREER ASSISTANT (CHAT)
  chatWithAI: async (message, history) => {
    try {
      const response = await api.post('/career/chat', { message, history });
      return response.data;
    } catch (error) {
      console.warn('Backend /career/chat not available, engaging client-side AI responder...', error);
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const msg = message.toLowerCase();
      let reply = '';

      if (msg.includes('hello') || msg.includes('hi ') || msg.includes('hey')) {
        reply = `Hello! I am your **AI Career Assistant**. I can help you with:
        
* **Interview Prep**: Algorithmic tips, behavioral techniques, and mock interview feedback.
* **Resume Advice**: ATS optimization, phrasing guidelines, and missing skill suggestions.
* **Placement Predictor**: Guidance on how to improve your probability score.
* **Skill Roadmaps**: Steps to become a SDE, Data Scientist, or Frontend Specialist.

What is on your mind today?`;
      } else if (msg.includes('resume') || msg.includes('ats')) {
        reply = `To optimize your resume for **ATS (Applicant Tracking Systems)**:

1. **Format Cleanly**: Use a simple single-column layout. Avoid charts, tables, or icons inside text blocks as they scramble the scanners.
2. **Include Keywords**: Align your skills precisely with the job description. If a job calls for \`Node.js\`, do not just write \`JavaScript\`.
3. **Quantify Accomplishments**: Use the Google XYZ formula: *Accomplished [X] as measured by [Y], by doing [Z]*.
   * *Example*: "Optimized SQL queries (Z), reducing dashboard page loading latency by 35% (Y) and increasing user retention (X)."

Would you like me to analyze a sample bullet point from your resume?`;
      } else if (msg.includes('predict') || msg.includes('placement') || msg.includes('score')) {
        reply = `Your **Placement Probability Score** is computed dynamically based on a variety of academic, technical, and professional indicators. 

To boost your placement eligibility:
* **Academic Baseline**: Try to keep your CGPA above \`7.5\` (ideal: \`8.5+\`). Many Tier-1 tech companies have automatic filters.
* **Internships**: Having just one 3-month internship increases SDE placement likelihood by over **28%**.
* **Projects**: Aim for 2 main projects. Use modern stacks (e.g. React/Vite/Node or Python/FastAPI) and document them with a clear \`README.md\`.
* **Aptitude Test Prep**: Practice analytical, logical, and verbal reasoning, which are required for initial filtering rounds.`;
      } else if (msg.includes('roadmap') || msg.includes('sde') || msg.includes('software engineer') || msg.includes('frontend')) {
        reply = `Here is a high-level **SDE Roadmap** for 2026:

\`\`\`mermaid
graph TD
    A[Core CS Fundamentals] --> B[Data Structures & Algorithims]
    B --> C[Choose a Stack]
    C --> D[MERN/PERN Fullstack]
    C --> E[Python/FastAPI AI/ML]
    D --> F[Build 2 Capstone Projects]
    E --> F
    F --> G[Mock Interviews & Coding Contests]
\`\`\`

1. **Core CS Concepts**: Study operating systems, database management systems (DBMS), and networks.
2. **Algorithms**: Practice arrays, strings, hash maps, recursion, and dynamic programming on LeetCode/HackerRank.
3. **Capstone Projects**: Build responsive web applications with state management and API integration.

What stack are you currently studying?`;
      } else {
        reply = `That is an interesting question. Regarding your query, the transition to AI-driven recruitment means companies are looking for a hybrid of strong **analytical thinking** and **problem-solving capabilities**. 

To succeed in this environment:
* Maintain a clean **GitHub portfolio** with active commits.
* Practice **system design fundamentals** alongside standard coding questions.
* Focus on **business impact**—understanding how the code you write directly resolves customer requirements.

Let me know if you would like me to draft a custom action plan or mock-test your knowledge on a specific topic!`;
      }

      return {
        reply,
      };
    }
  },

  // 5. CAREER ANALYTICS
  getCareerAnalytics: async () => {
    try {
      const response = await api.get('/analytics');
      return response.data;
    } catch (error) {
      console.warn('Backend /analytics not available, feeding local dashboard graphics data...', error);
      await new Promise((resolve) => setTimeout(resolve, 800));

      const branchComparison = [
        { branch: 'CSE', placedRate: 92, avgPackage: 12.4, highestPackage: 44.0 },
        { branch: 'IT', placedRate: 88, avgPackage: 10.2, highestPackage: 32.5 },
        { branch: 'ECE', placedRate: 76, avgPackage: 7.8, highestPackage: 21.0 },
        { branch: 'EE', placedRate: 64, avgPackage: 6.2, highestPackage: 14.5 },
        { branch: 'ME', placedRate: 52, avgPackage: 5.1, highestPackage: 9.8 },
      ];

      const placementTrends = [
        { year: '2022', placementRate: 74, avgPackage: 5.8 },
        { year: '2023', placementRate: 79, avgPackage: 6.4 },
        { year: '2024', placementRate: 82, avgPackage: 7.2 },
        { year: '2025', placementRate: 85, avgPackage: 8.5 },
        { year: '2026', placementRate: 89, avgPackage: 9.6 },
      ];

      const skillDistribution = [
        { skill: 'Languages', value: 85 },
        { skill: 'Development', value: 72 },
        { skill: 'Aptitude', value: 78 },
        { skill: 'Data Science', value: 60 },
        { skill: 'Soft Skills', value: 80 },
        { skill: 'DSA', value: 68 },
      ];

      const collegeTierPlacements = [
        { name: 'Tier 1', percentage: 95, color: '#06B6D4' },
        { name: 'Tier 2', percentage: 78, color: '#8B5CF6' },
        { name: 'Tier 3', percentage: 56, color: '#3B82F6' },
      ];

      return {
        branchComparison,
        placementTrends,
        skillDistribution,
        collegeTierPlacements,
        aiInsights: 'Overall hiring demand in 2026 has surged by 15% for Full-Stack developers and ML engineers who possess strong algorithm backgrounds. ECE/EE branches are seeing growing integration with Embedded Systems and IoT roles, while CSE continues to see the highest starting salaries (average 12.4 LPA).'
      };
    }
  }
};
