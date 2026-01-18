function ClockStatic({ data }) {
  if (!data) return null;

  let dt;

  if (data instanceof Date) {
    dt = data;
  } else if (typeof data === "string") {
    // se vier só "HH:mm"
    const soHora = /^\d{2}:\d{2}$/.test(data);

    if (soHora) {
      const [hh, mm] = data.split(":").map(Number);
      dt = new Date();
      dt.setHours(hh, mm, 0, 0);
    } else {
      // ISO / "YYYY-MM-DD" / etc.
      dt = new Date(data);
    }
  }

  if (!dt || Number.isNaN(dt.getTime())) return null;

  return (
    <>
      <p className="text-gray-600 font-bold text-4xl capitalize">
        {dt.toLocaleDateString("pt-BR", { weekday: "long" })}
      </p>

      <div className="flex items-end gap-2">
        <span className="text-gray-600 text-8xl font-bold">
          {dt.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      <p className="text-gray-600 mt-2 font-bold text-3xl">
        {dt.toLocaleDateString("pt-BR")}
      </p>
    </>
  );
}

export default ClockStatic;
