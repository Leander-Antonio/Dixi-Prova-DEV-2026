function TabelaHistorico({ linhas = [], onSelectMarcacao }) {
  const formatarDataBR = (dataISO) => {
    if (!dataISO) return "";
    const [ano, mes, dia] = String(dataISO).split("-");
    if (!ano || !mes || !dia) return String(dataISO);
    return `${dia}/${mes}/${ano}`;
  };

  const formatarHora = (momento) => {
    if (!momento) return "";
    const dt = new Date(momento);
    if (Number.isNaN(dt.getTime())) return "";
    return dt.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
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
          {linhas.map((linha) => {
            const data = linha.data;

            return (
              <tr key={data} className="font-semibold">
                {/* DATA */}
                <td className="py-3 px-2 border-t border-gray-300 text-center">
                  <span className="text-lg font-medium text-gray-700">
                    {formatarDataBR(data)}
                  </span>
                </td>

                {/* MARCAÇÕES */}
                <td className="py-3 pl-6 border-t border-gray-300 border-l text-left">
                  <div className="flex flex-wrap gap-2">
                    {linha.marcacoes?.map((m, idx) => (
                      <button
                        key={m?.id ?? idx}
                        type="button"
                        onClick={() => onSelectMarcacao?.(m)}
                        className="min-w-[55px] py-1 rounded-lg border border-[#3379BC]
                          text-[#3379BC] font-semibold
                          hover:bg-[#3379BC] hover:text-white transition
                          cursor-pointer text-center"
                      >
                        {formatarHora(m?.momento)}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TabelaHistorico;
