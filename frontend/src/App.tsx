import React, { useState } from 'react'; 
import { BsMagic } from 'react-icons/bs';
import logo from "./assets/logo.png";
import "./App.css";
import { toast } from 'react-toastify';

const apiEndpoint = import.meta.env.VITE_API_BASE_URL;

interface AIResponse {
  mvpFeatures: string[];
  suggestedArchitecture: string;
  estimatedTimeline: string;
  nextSteps: string[];
}

const App: React.FC = () => {
  const [idea, setIdea] = useState<string>('');
  const [techStack, setTechStack] = useState<string>('');
  const [aiResponse, setAIResponse] = useState<AIResponse | null>(null);

  const handleGeneratePlan = async (e: React.FormEvent) => {
    e.preventDefault(); 
    if(!idea)
        toast.error("Please enter your project idea.");
    if(!techStack)
        toast.error("Please enter your preferred tech stack");

    try {
      const res = await fetch(`${apiEndpoint}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea, techStack }),
      });

      const data = await res.json();
      
      const parsed = JSON.parse(data.data.response); // AI response

      setAIResponse(parsed);
      toast.success("AI Plan generated!");

    } catch (error) {
      console.error("Error generating plan:", error);
      toast.error("Failed to generate plan.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-4 mb-8"> 
          <div className="p-1 bg-purple-100 rounded-full">
            <img src={logo} alt="" className='w-15 md:w-25'/>
          </div> 
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Project Planner AI</h1>
        </div>

        <form onSubmit={handleGeneratePlan} className="space-y-6">
          <div>
            <label htmlFor="project-idea" className="block text-sm font-medium text-gray-700 mb-1">
              Project Idea
            </label>
            <textarea
              id="project-idea"
              placeholder="Describe your app idea..."
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              rows={5}
              className="w-full input px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-colors duration-200 resize-none"
            ></textarea>
          </div>

          <div>
            <label htmlFor="tech-stack" className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Tech Stack
            </label>
            <input
              id="tech-stack"
              type="text"
              placeholder="e.g., MERN, Next.js, Firebase"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              className="w-full input px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-colors duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 cursor-pointer bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            <span>Generate Plan with AI</span> 
            <BsMagic className="h-5 w-5" />
          </button>
        </form>
      </div>
      {aiResponse && (
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl mt-10 p-8">
          <h2 className="text-xl font-bold text-purple-700 mb-4">🧠 AI Project Plan</h2>

          <div className="mb-4">
            <h3 className="font-semibold text-gray-700">✅ MVP Features:</h3>
            <ul className="list-disc list-inside text-gray-800">
              {aiResponse.mvpFeatures.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-gray-700">🧱 Suggested Architecture:</h3>
            <p className="text-gray-800">{aiResponse.suggestedArchitecture}</p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-gray-700">⏱ Estimated Timeline:</h3>
            <p className="text-gray-800">{aiResponse.estimatedTimeline}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">🔜 Next Steps:</h3>
            <ul className="list-disc list-inside text-gray-800">
              {aiResponse.nextSteps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;