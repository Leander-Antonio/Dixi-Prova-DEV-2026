import { XMarkIcon } from "@heroicons/react/24/outline";

function BotaoFechar({ onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`absolute top-4 right-4 
        border border-[#3379BC] rounded-md
        text-[#3379BC] hover:bg-[#3379BC] hover:text-white
        transition cursor-pointer ${className}`}
    >
      <XMarkIcon className="w-6 h-6" />
    </button>
  );
}

export default BotaoFechar;
