import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useEffect, useState } from "react";
import DadosMarcacao from "../../components/DadosMarcacao";
import TabelaHistorico from "../../components/TabelaHistorico";

function HistoricoPonto() {
  const navigate = useNavigate();
  const [linhas, setLinhas] = useState([]);
  const [marcacaoSelecionada, setMarcacaoSelecionada] = useState(null);

  const buscar = async () => {
    const inicio = "2026-01-01";
    const fim = "2026-01-31";

    const res = await api.get("/pontos/historico", { params: { inicio, fim } });
    setLinhas(res.data);
    setCalculado(false);
  };

  const [calculado, setCalculado] = useState(false);

  const calcular = async () => {
    const inicio = "2026-01-01";
    const fim = "2026-01-31";

    const res = await api.get("/pontos/historico/calcular", {
      params: { inicio, fim },
    });
    setLinhas(res.data);
    setCalculado(true);
  };

  const formatarDataBR = (dataISO) => {
    if (!dataISO) return "";

    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <div className="w-full ml-20 mt-10">
      {/* TÍTULO */}
      <h1 className="text-[#3379BC] text-4xl font-bold mb-2 ml-8">
        Histórico de Ponto
      </h1>
      <h2 className="text-[#7A7A7A] text-lg font-semibold mb-4 ml-8">
        Veja os pontos registrados no sistema
      </h2>

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-md p-6  w-[90%]">
        {/* FILTROS */}
        <div className="flex gap-6 w-full items-end justify-end mb-6">
          {/* CAMPO 1 */}
          <div className="flex flex-col w-[150px]">
            <label className="text-[#3379BC] font-semibold">
              Data Inicial <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
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
              className="bg-white border border-gray-300 rounded p-1.5 w-full placeholder-gray-400 placeholder:font-semibold"
              placeholder="00/00/0000"
            />
          </div>

          {/* BOTÕES */}
          <div className="relative group">
            <button
              type="button"
              onClick={calcular}
              className="w-[180px] h-9 shadow rounded border border-[#3379BC]
      text-[#3379BC] font-semibold text-[18px]
      flex items-center justify-center gap-2
      hover:bg-[#3379BC] hover:text-white transition cursor-pointer"
            >
              <PlusIcon className="h-6 w-6" />
              Calcular
            </button>

            {/* Tooltip */}
            <div
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
      hidden group-hover:block
      bg-gray-400 text-white text-sm px-3 py-2 rounded-md
      whitespace-nowrap z-50"
            >
              Para o cálculo ser correto, é necessário ter um número <b>par</b>{" "}
              de marcações.
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={buscar}
              className="bg-[#3379BC] w-[180px] h-9 shadow rounded
    text-white font-semibold text-[18px] flex items-center justify-center gap-2 hover:bg-[#40A5DD] cursor-pointer"
            >
              <MagnifyingGlassIcon className="h-6 w-6 stroke-2" />
              Pesquisar
            </button>
          </div>
        </div>

        {/* TABELA */}
        <TabelaHistorico
          linhas={linhas}
          onSelectMarcacao={(m) =>
            setMarcacaoSelecionada({
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
      />
    </div>
  );
}

export default HistoricoPonto;
