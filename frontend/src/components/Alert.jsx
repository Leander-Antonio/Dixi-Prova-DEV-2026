import { useEffect } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

const PRESETS = {
  success: {
    title: "Sucesso",
    duration: 2700,
    border: "border-green-300",
    icon: <CheckCircleIcon className="w-6 h-6 stroke-2 text-green-600" />,
    bar: "bg-green-500",
  },
  error: {
    title: "Erro",
    duration: 3500,
    border: "border-red-300",
    icon: <XCircleIcon className="w-6 h-6 stroke-2 text-red-600" />,
    bar: "bg-red-500",
  },
  info: {
    title: "Aguarde",
    duration: 1800,
    border: "border-blue-300",
    icon: <InformationCircleIcon className="w-6 h-6 stroke-2 text-blue-600" />,
    bar: "bg-blue-500",
  },
};

export default function Alert({ open, message, variant = "success", onClose }) {
  const texto = String(message || "").toLowerCase();

  const effectiveVariant =
    texto.includes("marcação já existente") ||
    texto.includes("marcacao ja existente")
      ? "error"
      : variant;

  const config = PRESETS[effectiveVariant] ?? PRESETS.success;

  useEffect(() => {
    if (!open) return;

    const t = setTimeout(onClose, config.duration);
    return () => clearTimeout(t);
  }, [open, onClose, config.duration]);

  if (!open) return null;

  return (
    <div className="fixed top-6 right-6 z-[9999]">
      <div
        className={`relative overflow-hidden
          min-w-[380px] max-w-[480px]
          rounded-xl border shadow-lg bg-white
          p-4 flex items-start gap-3
          ${config.border}`}
      >
        {/* ícone */}
        <div className="mt-0.5">{config.icon}</div>

        {/* texto */}
        <div className="flex-1">
          <p className="font-semibold text-gray-900">{config.title}</p>
          <p className="text-sm text-gray-600 break-words">{message}</p>
        </div>

        {/* fechar */}
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Fechar"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        {/* barra */}
        <div className="absolute bottom-0 left-0 w-full h-[4px] bg-gray-200">
          <div
            className={`h-full ${config.bar} animate-alert-progress`}
            style={{ animationDuration: `${config.duration}ms` }}
          />
        </div>
      </div>
    </div>
  );
}
