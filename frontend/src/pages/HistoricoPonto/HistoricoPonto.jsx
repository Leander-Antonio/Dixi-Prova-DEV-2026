import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useEffect, useState } from "react";
import DadosMarcacao from "../../components/DadosMarcacao";
import TabelaHistorico from "../../components/TabelaHistorico";
import Alert from "../../components/Alert";

function HistoricoPonto() {
  const navigate = useNavigate();

  const [linhas, setLinhas] = useState([]);
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
          <div className="flex flex-col w-[180px]">
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
          <div className="flex flex-col w-[180px]">
            <label className="text-[#3379BC] font-semibold">
              Data Final <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="bg-white border border-gray-300 rounded p-1.5 w-full placeholder-gray-400 placeholder:font-semibold"
              placeholder="00/00/0000"
            />
          </div>

          {/* BOTÃO */}
          <button
            type="button"
            onClick={buscar}
            className="bg-[#3379BC] w-[220px] h-9 shadow rounded
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
