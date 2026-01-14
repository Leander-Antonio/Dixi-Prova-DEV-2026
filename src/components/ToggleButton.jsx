function ToggleBotton({ ativo, onToggle }) {
  return (
    <div className="flex items-center gap-3 mt-4">
      <button
        type="button"
        onClick={onToggle}
        className={`relative w-15 h-7 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
          ativo ? "bg-[#3379BC]" : "bg-white border-2 border-[#3379BC]"
        }`}
      >
        <div
          className={`w-5 h-5 rounded-full shadow-md transform transition-transform ${
            ativo ? "bg-white translate-x-8" : "bg-[#3379BC] translate-x-0"
          }`}
        />
      </button>

      <span className="text-[#7A7A7A] text-1xl font-semibold">
        Tirar foto para bater o ponto
      </span>
    </div>
  );
}

export default ToggleBotton;
