import { useEffect } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function Alert({
  open,
  type = "success",
  message,
  onClose,
  duration = 2700,
}) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [open, duration, onClose]);

  if (!open) return null;

  const isSuccess = type === "success";

  return (
    <div className="fixed top-6 right-6 z-[9999]">
      <div
        className={`relative overflow-hidden
          min-w-[380px] max-w-[480px]
          rounded-xl border shadow-lg bg-white
          p-4 flex items-start gap-3
          ${isSuccess ? "border-green-300" : "border-red-300"}`}
      >
        {/* conteúdo */}
        <div className="mt-0.5">
          {isSuccess ? (
            <CheckCircleIcon className="w-6 h-6 stroke-2 text-green-600" />
          ) : (
            <XCircleIcon className="w-6 h-6 stroke-2 text-red-600" />
          )}
        </div>

        <div className="flex-1">
          <p className="font-semibold text-gray-900">
            {isSuccess ? "Sucesso" : "Erro"}
          </p>
          <p className="text-sm text-gray-600 break-words">{message}</p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Fechar"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        <div className="absolute bottom-0 left-0 w-full h-[4px] bg-gray-200">
          <div
            className={`h-full
              ${isSuccess ? "bg-green-500" : "bg-red-500"}
              animate-alert-progress`}
            style={{ animationDuration: `${duration}ms` }}
          />
        </div>
      </div>
    </div>
  );
}
