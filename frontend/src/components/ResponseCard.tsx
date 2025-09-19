import React from "react";
import { AiOutlineCopy } from "react-icons/ai";
import { toast } from "react-toastify";
import { MdChecklist } from "react-icons/md";
import { TbKeyframes } from "react-icons/tb";

interface AIResponse {
  mvpFeatures: string[];
  suggestedArchitecture: string;
  estimatedTimeline: string;
  nextSteps: string[];
}

interface ResponseCardProps {
  aiResponse: AIResponse;
}

const ResponseCard: React.FC<ResponseCardProps> = ({ aiResponse }) => {

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const sections = [
    { icon: <MdChecklist size={24}/>, title: "Features", content: aiResponse.mvpFeatures.join("\n") },
    { icon: <TbKeyframes size={24}/>, title: "🧱 Suggested Architecture", content: aiResponse.suggestedArchitecture },
    { icon: <TbKeyframes size={24}/>, title: "⏱ Estimated Timeline", content: aiResponse.estimatedTimeline },
    { icon: <TbKeyframes size={24}/>, title: "🔜 Next Steps", content: aiResponse.nextSteps.join("\n") },
  ];

  return (
    <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl mt-10 p-6 md:p-8">
      <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-600 mb-6">
        AI Project Plan
      </h2>

      {sections.map((section, idx) => (
        <details
          key={idx}
          className="border border-gray-200 rounded-xl mb-4 p-3 hover:border-purple-400 transition-all cursor-pointer"
        >
          <summary className="flex justify-between items-center font-semibold text-gray-700">
           <span className="flex gap-2 items-center">{section.icon} {section.title}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(section.content);
              }}
              title="Copy"
              className="ml-2 text-gray-500 hover:text-purple-600 transition-colors cursor-pointer"
            >
              <AiOutlineCopy size={18} />
            </button>
          </summary>
          <div className="mt-2 text-gray-800 whitespace-pre-line">
            {section.content}
          </div>
        </details>
      ))}
    </div>
  );
};

export default ResponseCard;
