import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import api from "../../services/api";
import DadosMarcacao from "../../components/DadosMarcacao";
import TabelaMarcacoesDesconsideradas from "../../components/TabelaMarcacoesDesconsideradas";

function MarcacoesDesconsideradas() {
  const [linhas, setLinhas] = useState([]);
  const [marcacaoSelecionada, setMarcacaoSelecionada] = useState(null);

  const [dataInicial, setDataInicial] = useState("01/01/2026");
  const [dataFinal, setDataFinal] = useState("31/01/2026");

  const buscar = async () => {
    const inicio = "2026-01-01";
    const fim = "2026-01-31";

    const res = await api.get("/pontos/desconsideradas", {
      params: { inicio, fim },
    });

    setLinhas(res.data);
  };

  useEffect(() => {
    buscar();
  }, []);

  return (
    <div className="w-full ml-20 mt-10">
      {/* TÍTULO */}
      <h1 className="text-[#3379BC] text-4xl font-bold mb-2 ml-8">
        Marcações Desconsideradas
      </h1>
      <h2 className="text-[#7A7A7A] text-lg font-semibold mb-4 ml-8">
        Confira as marcações ignoradas no cálculo do ponto
      </h2>

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-md p-6 w-[90%]">
        {/* FILTROS */}
        <div className="flex gap-6 w-full items-end justify-end mb-6">
          {/* CAMPO 1 */}
          <div className="flex flex-col w-[150px]">
            <label className="text-[#3379BC] font-semibold">
              Data Inicial <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={dataInicial}
              onChange={(e) => setDataInicial(e.target.value)}
              className="bg-white border border-gray-300 rounded p-1.5 w-full placeholder-gray-400 placeholder:font-semibold"
              placeholder="00/00/0000"
            />
          </div>

          {/* CAMPO 2 */}
          <div className="flex flex-col w-[150px]">
            <label className="text-[#3379BC] font-semibold">
              Data Final <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={dataFinal}
              onChange={(e) => setDataFinal(e.target.value)}
              className="bg-white border border-gray-300 rounded p-1.5 w-full placeholder-gray-400 placeholder:font-semibold"
              placeholder="00/00/0000"
            />
          </div>

          {/* BOTÃO */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={buscar}
              className="bg-[#3379BC] w-[180px] h-9 shadow rounded
                text-white font-semibold text-[18px]
                flex items-center justify-center gap-2
                hover:bg-[#40A5DD] cursor-pointer"
            >
              <MagnifyingGlassIcon className="h-6 w-6 stroke-2" />
              Pesquisar
            </button>
          </div>
        </div>

        {/* TABELA */}
        <TabelaMarcacoesDesconsideradas
          linhas={linhas}
          onSelectMarcacao={(m) =>
            setMarcacaoSelecionada({
              id: m.id,
              momento: m.momento,
              foto: m.fotoBase,
              localizacao: {
                latitude: m.latitude,
                longitude: m.longitude,
              },
            })
          }
        />
      </div>

      <DadosMarcacao
        foto={marcacaoSelecionada?.foto}
        momento={marcacaoSelecionada?.momento}
        localizacao={marcacaoSelecionada?.localizacao}
        onFechar={() => setMarcacaoSelecionada(null)}
        onReconsiderar={async () => {
          await api.post(`/pontos/${marcacaoSelecionada.id}/reconsiderar`);
          setMarcacaoSelecionada(null);
          buscar();
        }}
        modo="reconsiderar"
      />
    </div>
  );
}

export default MarcacoesDesconsideradas;
