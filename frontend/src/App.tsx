import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import ProjectForm from "./components/ProjectForm";
import ResponseCard from "./components/ResponseCard";

interface AIResponse {
  mvpFeatures: string[];
  suggestedArchitecture: string;
  estimatedTimeline: string;
  nextSteps: string[];
}

const apiEndpoint = import.meta.env.VITE_API_BASE_URL;

const App: React.FC = () => {
  const [aiResponse, setAIResponse] = useState<AIResponse | null>(null);
  const [showLoading, setShowLoading] = useState(false);
  const responseRef = useRef<HTMLDivElement>(null);
  const handleGenerate = async (idea: string, techStack: string) => {
    try {
      setShowLoading(true);
      const res = await fetch(`${apiEndpoint}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea, techStack }),
      });
      const { data } = await res.json();
      setAIResponse(data.response);
      toast.success("AI Plan generated!");
      setShowLoading(false);
      setTimeout(() => {
        responseRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate AI plan.");
      setShowLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 transition-colors duration-500 flex flex-col">
      <Header />
 
      <main className="flex flex-col items-center px-4 mt-10 w-full max-w-5xl mx-auto space-y-10">
        <ProjectForm onGenerate={handleGenerate} showLoading={showLoading} />

        {aiResponse && (
          <div ref={responseRef} className="w-full mb-6">
            <ResponseCard aiResponse={aiResponse} />
          </div>
        )}
      </main> 
    </div>
  );
};

export default App;
