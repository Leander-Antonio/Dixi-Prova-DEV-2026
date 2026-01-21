function TabelaMarcacoesDesconsideradas({ linhas = [], onSelectMarcacao }) {
  const formatarDataBR = (dataISO) => {
    if (!dataISO) return "";
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const motivoLabel = (motivo) => {
    const m = (motivo ?? "").toUpperCase();

    if (m === "DUPLICADA" || m === "MARCACAO_DUPLICADA") return "Duplicada";
    if (m === "ADMIN" || m === "DESCONSIDERADA_PELO_ADMIN") return "Admin";

    return motivo ? "Outro" : "-";
  };

  const resumoMotivosDoDia = (marcacoes = []) => {
    const labels = marcacoes
      .map((m) => motivoLabel(m?.motivo))
      .filter((x) => x && x !== "-");

    if (labels.length === 0) return "-";

    const unicos = Array.from(new Set(labels));
    if (unicos.length === 1) return unicos[0];

    return `${unicos.length} motivos`;
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
              <td className="py-3 p-2 border-t border-gray-300 text-center">
                {formatarDataBR(linha.data)}
              </td>

              <td className="py-3 pl-6 border-t border-gray-300 border-l text-left">
                <div className="flex flex-wrap gap-2">
                  {linha.marcacoes?.map((m, idx) => {
                    const label = motivoLabel(m?.motivo);

                    return (
                      <button
                        key={m.id ?? idx}
                        type="button"
                        onClick={() => onSelectMarcacao?.(m)}
                        className="min-w-[55px] py-1 rounded-lg border border-[#3379BC] text-[#3379BC] font-semibold
hover:bg-[#3379BC] hover:text-white transition cursor-pointer text-center"
                        title={m?.motivo ?? ""}
                      >
                        <span>{m.momento ?? "-"}</span>

                        {label !== "-" && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full border border-[#3379BC]">
                            {label}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </td>
            </tr>
          ))}

          {linhas.length === 0 && (
            <tr>
              <td
                colSpan={4}
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
