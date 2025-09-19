import React, { useState } from "react";
import Button from "./Button";
import { toast } from "react-toastify";

interface FormProps {
  onGenerate: (idea: string, techStack: string) => void;
  showLoading: boolean;
}

const ProjectForm: React.FC<FormProps> = ({ onGenerate, showLoading }) => {
  const [idea, setIdea] = useState("");
  const [techStack, setTechStack] = useState("");

  const commonTechStacks = ["MERN", "Next.js", "React + Firebase", "React + Node.js", "React + Django"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea) return toast.error("Please enter your project idea.");
    if (!techStack) return toast.error("Please enter your preferred tech stack.");
    onGenerate(idea, techStack);
  };

    return (
    <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">
        Describe Your Project
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        <div className="relative">
          <label
            htmlFor="project-idea"
            className="text-gray-500 text-md peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all"
          >
            Project Idea
          </label>
          <textarea
            id="project-idea"
            placeholder=" "
            rows={4}
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            className="peer w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors resize-none bg-gray-50 text-gray-900"
          ></textarea>
        </div>

        <div className="relative">
          <label
            htmlFor="tech-stack"
            className="text-gray-500 text-md peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all"
          >
            Preferred Tech Stack
          </label>
          <input
            id="tech-stack"
            type="text"
            placeholder=" "
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            list="tech-options"
            className="peer w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors bg-gray-50 text-gray-900"
          />
          <datalist id="tech-options">
            {commonTechStacks.map((tech, idx) => (
              <option key={idx} value={tech} />
            ))}
          </datalist>
        </div>

        <Button showLoading={showLoading} />
      </form>
    </div>
  );
};

export default ProjectForm;
