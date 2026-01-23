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

  // MOTIVO
  const motivoLabel = (motivo) => {
    const m = (motivo ?? "").toUpperCase();

    if (m === "DUPLICADA" || m === "MARCACAO_DUPLICADA") return "Duplicada";
    if (m === "ADMIN" || m === "DESCONSIDERADA_PELO_ADMIN") return "Admin";

    return motivo ? "Outro" : "-";
  };

  // VALIDA MARCAÇÕES EXISTENTES NO DIA
  const toISODate = (d) => {
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  };

  const linhasComDias = (() => {
    if (!linhas || linhas.length === 0) return [];

    const ordenadas = [...linhas].sort((a, b) =>
      String(a.data).localeCompare(String(b.data)),
    );

    const porData = new Map(ordenadas.map((l) => [String(l.data), l]));

    const inicio = new Date(`${ordenadas[0].data}T00:00:00`);
    const fim = new Date(`${ordenadas[ordenadas.length - 1].data}T00:00:00`);

    const result = [];
    for (let d = new Date(inicio); d <= fim; d.setDate(d.getDate() + 1)) {
      const dataISO = toISODate(d);
      result.push(porData.get(dataISO) ?? { data: dataISO, marcacoes: [] });
    }
    return result;
  })();

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
          {linhasComDias.map((linha) => (
            <tr key={linha.data} className="font-semibold">
              <td className="py-3 px-2 border-t border-gray-300 text-center">
                <span className="text-lg font-medium text-gray-700">
                  {formatarDataBR(linha.data)}
                </span>
              </td>

              <td className="py-3 pl-6 border-t border-gray-300 border-l text-left">
                {linha.marcacoes && linha.marcacoes.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {linha.marcacoes.map((m, idx) => (
                      <button
                        key={m?.id ?? idx}
                        type="button"
                        onClick={() => onSelectMarcacao?.(m)}
                        className="min-w-[55px] py-1 rounded-lg border border-[#3379BC]
                          text-[#3379BC] font-semibold
                          hover:bg-[#3379BC] hover:text-white transition
                          cursor-pointer text-center"
                        title={motivoLabel(m?.motivo)}
                      >
                        {formatarHora(m?.momento)}
                      </button>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-400 ml-1">
                    Nenhuma marcação desconsiderada no dia
                  </span>
                )}
              </td>
            </tr>
          ))}

          {linhasComDias.length === 0 && (
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
