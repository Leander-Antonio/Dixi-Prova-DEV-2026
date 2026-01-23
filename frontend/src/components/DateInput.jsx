import { CalendarIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";

function DateInput({
  label,
  required = false,
  value,
  onChange,
  widthClass = "w-[180px]",
  name,
}) {
  const dateRef = useRef(null);

  const abrirCalendario = () => {
    dateRef.current?.showPicker?.();
    dateRef.current?.focus();
  };

  return (
    <div className={`flex flex-col ${widthClass}`}>
      <label className="text-[#3379BC] font-semibold">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <input
          ref={dateRef}
          name={name}
          type="date"
          value={value}
          onChange={onChange}
          onClick={abrirCalendario}
          className={`bg-white border border-gray-300 rounded p-1.5 pr-9 w-full
            focus:outline-none focus:border-[#3379BC] cursor-pointer
            ${value ? "font-semibold text-gray-600" : "font-normal text-gray-500"}
            [color-scheme:light]
            appearance-none`}
        />

        <CalendarIcon
          className="absolute right-2 top-1/2 -translate-y-1/2
            h-5 w-5 text-[#3379BC]/60 pointer-events-none"
        />
      </div>
    </div>
  );
}

export default DateInput;
