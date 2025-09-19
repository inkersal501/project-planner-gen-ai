import { BsMagic } from 'react-icons/bs';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type ButtonProps = {
  showLoading: boolean;
};

const Button: React.FC<ButtonProps> = ({ showLoading }) => {
  return (
    <button
      disabled={showLoading}
      type="submit"
      className={`
        w-full flex items-center justify-center gap-2 
        px-6 py-3 rounded-xl font-semibold 
        transition-all duration-300 
        text-white shadow-md 
        ${showLoading 
          ? "bg-gradient-to-r from-purple-400 to-purple-600 cursor-not-allowed" 
          : "bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-[1.03] hover:shadow-lg cursor-pointer"}
      `}
    >
      {showLoading ? (
        <>
          <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" />
          <span className="animate-pulse">Generating Plan...</span>
        </>
      ) : (
        <>
          <BsMagic className="h-5 w-5" />
          <span>Generate Plan with AI</span>
        </>
      )}
    </button>
  );
};

export default Button;
