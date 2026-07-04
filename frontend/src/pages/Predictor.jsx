import { useState } from "react";
import api from "../services/api";

function Predictor() {
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

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

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

      console.log(payload);
      const response = await api.post("/predict", payload);

      setResult(response.data);
    } catch (error) {
      console.log("FULL ERROR:", error);
      console.log("RESPONSE:", error.response);
      console.log("DATA:", error.response?.data);

      alert("Prediction Failed. Open F12 Console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Placement Predictor 🚀
          </h1>

          <p className="text-gray-400 text-lg">
            Analyze your placement chances using AI
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Academic Details */}
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
            <h2 className="text-2xl font-semibold mb-6">
              Academic Details
            </h2>

            <div className="space-y-4">
              <input
                type="number"
                name="cgpa"
                placeholder="CGPA"
                value={formData.cgpa}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-black border border-gray-700"
              />

              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-black border border-gray-700"
              />

              <input
                type="number"
                name="attendance"
                placeholder="Attendance %"
                value={formData.attendance}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-black border border-gray-700"
              />
            </div>
          </div>

          {/* Skills */}
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
            <h2 className="text-2xl font-semibold mb-6">
              Skills
            </h2>

            <div className="space-y-4">
              <input
                type="number"
                name="python_skill"
                placeholder="Python Skill (1-10)"
                value={formData.python_skill}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-black border border-gray-700"
              />

              <input
                type="number"
                name="java_skill"
                placeholder="Java Skill (1-10)"
                value={formData.java_skill}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-black border border-gray-700"
              />

              <input
                type="number"
                name="cpp_skill"
                placeholder="C++ Skill (1-10)"
                value={formData.cpp_skill}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-black border border-gray-700"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={handlePredict}
            className="px-10 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-lg font-semibold transition"
          >
            {loading ? "Predicting..." : "Predict Placement"}
          </button>
        </div>

        {result && (
          <div className="mt-10 bg-gray-900 p-8 rounded-2xl border border-gray-800 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Prediction Result
            </h2>

            <p className="text-6xl font-bold text-blue-500 mb-4">
              {result.placement_probability}%
            </p>

            <p className="text-2xl font-semibold">
              {result.prediction}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Predictor;