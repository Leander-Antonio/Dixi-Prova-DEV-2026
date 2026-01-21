function TabelaHistorico({ linhas = [], onSelectMarcacao }) {
  const formatarDataBR = (dataISO) => {
    if (!dataISO) return "";
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <div className="overflow-auto rounded-2xl">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#EBEDEE] text-[#3379BC] font-semibold text-[1.18rem]">
            <th className="py-1.5 p-2 w-[60px] border-b border-gray-300">
              Data
            </th>
            <th className="py-1.5 p-2 w-[580px] border-b border-gray-300 border-l">
              Marcações
            </th>
            <th className="py-1.5 p-2 w-[80px] border-b border-gray-300 border-l">
              Horas Trabalhadas
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
                  {linha.marcacoes?.map((m, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => onSelectMarcacao?.(m)}
                      className="min-w-[55px] py-1 rounded-lg border border-[#3379BC] text-[#3379BC] font-semibold
hover:bg-[#3379BC] hover:text-white transition cursor-pointer text-center"
                    >
                      {m.momento}
                    </button>
                  ))}
                </div>
              </td>

              <td className="py-3 p-2 border-t border-gray-300 border-l text-center">
                {linha.horasTrabalhadas ?? "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TabelaHistorico;
