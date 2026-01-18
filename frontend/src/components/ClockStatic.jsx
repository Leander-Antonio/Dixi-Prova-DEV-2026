function ClockStatic({ data }) {
  if (!data) return null;

  return (
    <>
      <p className="text-gray-600 font-bold text-4xl capitalize">
        {data.toLocaleDateString("pt-BR", { weekday: "long" })}
      </p>

      <div className="flex items-end gap-2">
        <span className="text-gray-600 text-8xl font-bold">
          {data.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      <p className="text-gray-600 mt-2 font-bold text-3xl">
        {data.toLocaleDateString("pt-BR")}
      </p>
    </>
  );
}

export default ClockStatic;
