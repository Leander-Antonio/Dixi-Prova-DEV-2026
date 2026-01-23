function TabelaMarcacoesDesconsideradas({ linhas = [], onSelectMarcacao }) {
  const formatarDataBR = (dataISO) => {
    if (!dataISO) return "";
    const [ano, mes, dia] = String(dataISO).split("-");
    if (!ano || !mes || !dia) return String(dataISO);
    return `${dia}/${mes}/${ano}`;
  };

  const formatarHora = (momento) => {
    if (!momento) return "-";

    const dt = new Date(momento);
    if (Number.isNaN(dt.getTime())) return "-";

    return dt.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const motivoLabel = (motivo) => {
    const m = (motivo ?? "").toUpperCase();

    if (m === "DUPLICADA" || m === "MARCACAO_DUPLICADA") return "Duplicada";
    if (m === "ADMIN" || m === "DESCONSIDERADA_PELO_ADMIN") return "Admin";

    return motivo ? "Outro" : "-";
  };

  return (
    <div className="overflow-auto rounded-2xl">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#EBEDEE] text-[#3379BC] font-semibold text-[1.18rem]">
            <th className="py-1.5 p-2 w-[140px] border-b border-gray-300">
              Data
            </th>
            <th className="py-1.5 p-2 border-b border-gray-300 border-l">
              Marcações
            </th>
          </tr>
        </thead>

        <tbody>
          {linhas.map((linha) => (
            <tr key={linha.data} className="font-semibold">
              <td className="py-3 px-2 border-t border-gray-300 text-center">
                <span className="text-lg font-medium text-gray-700">
                  {formatarDataBR(linha.data)}
                </span>
              </td>

              <td className="py-3 pl-6 border-t border-gray-300 border-l text-left">
                <div className="flex flex-wrap gap-2">
                  {linha.marcacoes?.map((m, idx) => (
                    <button
                      key={m?.id ?? idx}
                      type="button"
                      onClick={() => onSelectMarcacao?.(m)}
                      className="min-w-[55px] py-1 rounded-lg border border-[#3379BC] text-[#3379BC] font-semibold
hover:bg-[#3379BC] hover:text-white transition cursor-pointer text-center"
                      title={motivoLabel(m?.motivo)}
                    >
                      {formatarHora(m?.momento)}
                    </button>
                  ))}
                </div>
              </td>
            </tr>
          ))}

          {linhas.length === 0 && (
            <tr>
              <td
                colSpan={2}
                className="py-6 text-center text-gray-400 font-semibold"
              >
                Nenhuma marcação desconsiderada no período.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TabelaMarcacoesDesconsideradas;
