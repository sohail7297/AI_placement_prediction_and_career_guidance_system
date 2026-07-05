import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Predictor() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const [formData, setFormData] = useState({
    age: "",
    cgpa: "",
    backlogs: "",
    attendance: "",
    tenth_percentage: "",
    twelfth_percentage: "",

    branch: "CSE",
    college_tier: 1,

    python_skill: "",
    cpp_skill: "",
    java_skill: "",
    ml_skill: "",
    web_dev_skill: "",
    communication_skill: "",

    aptitude_score: "",
    logical_reasoning: "",

    internships: "",
    projects: "",
    github_projects: "",
    hackathons: "",
    certifications: "",

    coding_contest_rating: "",

    teamwork: "",
    leadership: "",
    problem_solving: "",
    time_management: "",

    gender: "Male",
    city_tier: 1,
    family_income: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePredict = async () => {
    try {
      setLoading(true);

      const payload = {
        ...formData,

        age: Number(formData.age || 21),
        cgpa: Number(formData.cgpa || 7),
        backlogs: Number(formData.backlogs || 0),
        attendance: Number(formData.attendance || 80),
        tenth_percentage: Number(formData.tenth_percentage || 75),
        twelfth_percentage: Number(formData.twelfth_percentage || 75),

        python_skill: Number(formData.python_skill || 5),
        cpp_skill: Number(formData.cpp_skill || 5),
        java_skill: Number(formData.java_skill || 5),
        ml_skill: Number(formData.ml_skill || 5),
        web_dev_skill: Number(formData.web_dev_skill || 5),
        communication_skill: Number(formData.communication_skill || 5),

        aptitude_score: Number(formData.aptitude_score || 50),
        logical_reasoning: Number(formData.logical_reasoning || 50),

        internships: Number(formData.internships || 0),
        projects: Number(formData.projects || 0),
        github_projects: Number(formData.github_projects || 0),
        hackathons: Number(formData.hackathons || 0),
        certifications: Number(formData.certifications || 0),

        coding_contest_rating: Number(
          formData.coding_contest_rating || 1000
        ),

        teamwork: Number(formData.teamwork || 5),
        leadership: Number(formData.leadership || 5),
        problem_solving: Number(formData.problem_solving || 5),
        time_management: Number(formData.time_management || 5),

        city_tier: Number(formData.city_tier || 1),
        family_income: Number(formData.family_income || 500000),
        college_tier: Number(formData.college_tier || 1),
      };

      console.log("Payload:", payload);

      const response = await api.post("/predict", payload);

      setResult(response.data);
    } catch (error) {
      console.error(error);
      console.log(error.response?.data);

      alert("Prediction Failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const academicFields = [
    { name: "age", label: "Age" },
    { name: "cgpa", label: "CGPA" },
    { name: "attendance", label: "Attendance %" },
    { name: "backlogs", label: "Backlogs" },
    { name: "tenth_percentage", label: "10th Percentage" },
    { name: "twelfth_percentage", label: "12th Percentage" },
  ];

  const technicalFields = [
    { name: "python_skill", label: "Python Skill" },
    { name: "cpp_skill", label: "C++ Skill" },
    { name: "java_skill", label: "Java Skill" },
    { name: "ml_skill", label: "ML Skill" },
    { name: "web_dev_skill", label: "Web Dev Skill" },
    { name: "communication_skill", label: "Communication Skill" },
  ];

  const experienceFields = [
    { name: "internships", label: "Internships" },
    { name: "projects", label: "Projects" },
    { name: "github_projects", label: "GitHub Projects" },
    { name: "hackathons", label: "Hackathons" },
    { name: "certifications", label: "Certifications" },
  ];

  const softSkillFields = [
    { name: "aptitude_score", label: "Aptitude Score" },
    { name: "logical_reasoning", label: "Logical Reasoning" },
    { name: "teamwork", label: "Teamwork" },
    { name: "leadership", label: "Leadership" },
    { name: "problem_solving", label: "Problem Solving" },
    { name: "time_management", label: "Time Management" },
  ];

    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <Navbar />

        <div className="px-4 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
            AI Placement Intelligence Platform
          </h1>

          <p className="text-gray-400 text-lg">
            Predict Placement Chances & Get Career Insights
          </p>
        </div>

        {/* Academic Details */}
        <div className="bg-slate-900 border border-purple-500/20 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-purple-400 mb-6">
            Academic Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {academicFields.map((field) => (
              <input
                key={field.name}
                type="number"
                name={field.name}
                placeholder={field.label}
                value={formData[field.name]}
                onChange={handleChange}
                className="bg-black border border-zinc-700 rounded-xl p-3"
              />
            ))}

            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="bg-black border border-zinc-700 rounded-xl p-3"
            >
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
            </select>

            <select
              name="college_tier"
              value={formData.college_tier}
              onChange={handleChange}
              className="bg-black border border-zinc-700 rounded-xl p-3"
            >
              <option value="1">Tier 1</option>
              <option value="2">Tier 2</option>
              <option value="3">Tier 3</option>
            </select>
          </div>
        </div>

        {/* Technical Skills */}
        <div className="bg-slate-900 border border-purple-500/20 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-purple-400 mb-6">
            Technical Skills
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {technicalFields.map((field) => (
              <input
                key={field.name}
                type="number"
                min="1"
                max="10"
                name={field.name}
                placeholder={`${field.label} (1-10)`}
                value={formData[field.name]}
                onChange={handleChange}
                className="bg-black border border-zinc-700 rounded-xl p-3"
              />
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="bg-slate-900 border border-purple-500/20 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-purple-400 mb-6">
            Experience
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {experienceFields.map((field) => (
              <input
                key={field.name}
                type="number"
                name={field.name}
                placeholder={field.label}
                value={formData[field.name]}
                onChange={handleChange}
                className="bg-black border border-zinc-700 rounded-xl p-3"
              />
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div className="bg-slate-900 border border-purple-500/20 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-purple-400 mb-6">
            Soft Skills & Aptitude
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {softSkillFields.map((field) => (
              <input
                key={field.name}
                type="number"
                name={field.name}
                placeholder={field.label}
                value={formData[field.name]}
                onChange={handleChange}
                className="bg-black border border-zinc-700 rounded-xl p-3"
              />
            ))}
          </div>
        </div>

        {/* Additional Details */}
        <div className="bg-slate-900 border border-purple-500/20 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-purple-400 mb-6">
            Additional Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            <input
              type="number"
              name="coding_contest_rating"
              placeholder="Coding Contest Rating"
              value={formData.coding_contest_rating}
              onChange={handleChange}
              className="bg-black border border-zinc-700 rounded-xl p-3"
            />

            <input
              type="number"
              name="family_income"
              placeholder="Family Income"
              value={formData.family_income}
              onChange={handleChange}
              className="bg-black border border-zinc-700 rounded-xl p-3"
            />

            <select
              name="city_tier"
              value={formData.city_tier}
              onChange={handleChange}
              className="bg-black border border-zinc-700 rounded-xl p-3"
            >
              <option value="1">City Tier 1</option>
              <option value="2">City Tier 2</option>
              <option value="3">City Tier 3</option>
            </select>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="bg-black border border-zinc-700 rounded-xl p-3"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        {/* Predict Button */}
        <div className="flex justify-center mb-10">
          <button
            onClick={handlePredict}
            disabled={loading}
            className="px-10 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-lg hover:scale-105 transition-all"
          >
            {loading ? "Analyzing..." : "Predict Placement"}
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className="bg-slate-900 border border-green-500/30 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Prediction Result
            </h2>

            <div className="text-6xl font-bold text-green-400 mb-4">
              {result.placement_probability}%
            </div>

            <div className="text-2xl font-semibold mb-6">
              {result.prediction}
            </div>

            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-black rounded-xl p-4">
                <h3 className="text-purple-400 font-bold mb-3">
                  Strengths
                </h3>

                <ul className="space-y-2 text-gray-300">
                  <li>✓ Technical Skills</li>
                  <li>✓ Academic Performance</li>
                  <li>✓ Project Experience</li>
                </ul>
              </div>

              <div className="bg-black rounded-xl p-4">
                <h3 className="text-purple-400 font-bold mb-3">
                  Improvement Areas
                </h3>

                <ul className="space-y-2 text-gray-300">
                  <li>⚡ Participate in Hackathons</li>
                  <li>⚡ Build More Projects</li>
                  <li>⚡ Improve Communication Skills</li>
                </ul>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  </div>
  );
}

export default Predictor;