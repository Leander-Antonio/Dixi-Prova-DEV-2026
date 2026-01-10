import { useEffect, useState } from "react";

function Clock() {
  const [agora, setAgora] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setAgora(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <p className="text-[#3379BC] font-bold text-4xl capitalize">
        {agora.toLocaleDateString("pt-BR", { weekday: "long" })}
      </p>

      <div className="flex items-end gap-2">
        <span className="text-[#3379BC] text-8xl font-bold">
          {agora.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        <span className="text-[#7A7A7A] text-4xl mb-1 font-semibold">
          {agora.toLocaleTimeString("pt-BR", { second: "2-digit" })}
        </span>
      </div>

      <p className="text-[#3379BC] mt-2 font-bold text-3xl">
        {agora.toLocaleDateString("pt-BR")}
      </p>
    </>
  );
}

export default Clock;
