import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useEffect, useState } from "react";
import DadosMarcacao from "../../components/DadosMarcacao";
import TabelaHistorico from "../../components/TabelaHistorico";
import Alert from "../../components/Alert";

function HistoricoPonto() {
  const navigate = useNavigate();

  const [linhas, setLinhas] = useState([]);
  const [resultadoCalculo, setResultadoCalculo] = useState({}); // { "2026-01-18": "4h 41m" }
  const [calculado, setCalculado] = useState(false);
  const [resultadoIntervalo, setResultadoIntervalo] = useState({});
  const [marcacaoSelecionada, setMarcacaoSelecionada] = useState(null);

  const [alerta, setAlerta] = useState({
    open: false,
    type: "success",
    message: "",
  });

  const showAlert = (type, message) => {
    setAlerta({ open: true, type, message });
  };

  const buscar = async () => {
    const inicio = "2026-01-01";
    const fim = "2026-01-31";

    const res = await api.get("/pontos/historico", { params: { inicio, fim } });
    setLinhas(res.data);

    setResultadoCalculo({});
    setCalculado(false);
  };

  const calcular = async () => {
    const inicio = "2026-01-01";
    const fim = "2026-01-31";

    const res = await api.get("/pontos/historico/calcular", {
      params: { inicio, fim },
    });

    const mapaTrabalhadas = {};
    const mapaIntervalo = {};

    for (const dia of res.data) {
      mapaTrabalhadas[dia.data] = dia.horasTrabalhadas;
      mapaIntervalo[dia.data] = dia.intervalo;
    }

    setResultadoCalculo(mapaTrabalhadas);
    setResultadoIntervalo(mapaIntervalo);
    setCalculado(true);
  };

  const desconsiderarMarcacao = async () => {
    if (!marcacaoSelecionada?.id) {
      showAlert("error", "Essa marcação não pode ser desconsiderada.");
      return;
    }

    try {
      await api.post(`/pontos/${marcacaoSelecionada.id}/desconsiderar`, {
        motivo: "ADMIN",
      });

      showAlert("success", "Marcação desconsiderada!");
      setMarcacaoSelecionada(null);

      await buscar();
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        "Falhou ao desconsiderar a marcação.";

      showAlert("error", msg);
    }
  };

  useEffect(() => {
    buscar();
  }, []);

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
              {calculado ? "Recalcular" : "Calcular"}
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

        {/* TABELA */}
        <TabelaHistorico
          linhas={linhas}
          calculado={calculado}
          resultadoCalculo={resultadoCalculo}
          resultadoIntervalo={resultadoIntervalo}
          onSelectMarcacao={(m) => {
            setMarcacaoSelecionada({
              id: m.id,
              momento: m.momento,
              foto: m.fotoBase,
              localizacao: { latitude: m.latitude, longitude: m.longitude },
              motivo: m.motivo,
            });
          }}
        />
      </div>

      <DadosMarcacao
        foto={marcacaoSelecionada?.foto}
        momento={marcacaoSelecionada?.momento}
        localizacao={marcacaoSelecionada?.localizacao}
        onFechar={() => setMarcacaoSelecionada(null)}
        onDesconsiderar={desconsiderarMarcacao}
        modo="desconsiderar"
      />

      <Alert
        open={alerta.open}
        type={alerta.type}
        message={alerta.message}
        onClose={() => setAlerta((a) => ({ ...a, open: false }))}
      />
    </div>
  );
}

export default HistoricoPonto;
