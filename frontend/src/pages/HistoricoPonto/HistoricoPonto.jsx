import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import api from "../../services/api";
import { useEffect, useState } from "react";
import DadosMarcacao from "../../components/DadosMarcacao";
import TabelaHistorico from "../../components/TabelaHistorico";
import Alert from "../../components/Alert";
import DateInput from "../../components/DateInput";

function HistoricoPonto() {
  // PESQUISA INICIAL ULTIMOS 10 DIAS
  const pad = (n) => String(n).padStart(2, "0");
  const toISO = (d) =>
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

  const hoje = new Date();
  const dezDiasAtras = new Date();
  dezDiasAtras.setDate(hoje.getDate() - 4);

  const dataInicialPadrao = toISO(dezDiasAtras);
  const dataFinalPadrao = toISO(hoje);

  const [dataInicial, setDataInicial] = useState(dataInicialPadrao);
  const [dataFinal, setDataFinal] = useState(dataFinalPadrao);

  const [linhas, setLinhas] = useState([]);
  const [marcacaoSelecionada, setMarcacaoSelecionada] = useState(null);

  // ALERTA
  const [alerta, setAlerta] = useState({
    open: false,
    variant: "success",
    message: "",
  });

  const showAlert = (variant, message) => {
    const texto = String(message || "").toLowerCase();

    if (texto.includes("marcação já existente")) {
      setAlerta({
        open: true,
        variant: "error",
        message: message,
      });
      return;
    }

    setAlerta({ open: true, variant, message });
  };

  const buscarComAlert = async () => {
    try {
      const dados = await buscar();

      if (!dados || dados.length === 0) {
        showAlert("success", "Nenhuma marcação encontrada no período");
      } else {
        showAlert("success", "Pesquisa concluída com sucesso");
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        "Erro ao buscar histórico de ponto";
      showAlert("error", String(msg));
    }
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

      showAlert("error", String(msg));
    }
  };

  useEffect(() => {
    // primeiro carregamento sem alert
    (async () => {
      try {
        await buscar();
      } catch (err) {
        const msg =
          err?.response?.data?.message ||
          err?.response?.data ||
          "Erro ao buscar histórico de ponto";
        showAlert("error", String(msg));
      }
    })();
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
          <DateInput
            label="Data Inicial"
            required
            widthClass="w-[180px]"
            name="inicio"
            value={dataInicial}
            onChange={(e) => setDataInicial(e.target.value)}
          />

          <DateInput
            label="Data Final"
            required
            widthClass="w-[180px]"
            name="fim"
            value={dataFinal}
            onChange={(e) => setDataFinal(e.target.value)}
          />

          <button
            type="button"
            onClick={buscarComAlert}
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
        variant={alerta.variant}
        message={alerta.message}
        onClose={() => setAlerta((a) => ({ ...a, open: false }))}
      />
    </div>
  );
}

export default HistoricoPonto;
