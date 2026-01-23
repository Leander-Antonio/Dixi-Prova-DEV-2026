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

  const buscar = async () => {
    const inicio = dataInicial;
    const fim = dataFinal;

    const res = await api.get("/pontos/historico", { params: { inicio, fim } });
    setLinhas(res.data);
  };

  // ALERTA
  const [alerta, setAlerta] = useState({
    open: false,
    type: "success",
    message: "",
  });

  const showAlert = (type, message) => {
    setAlerta({ open: true, type, message });
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
          <DateInput
            label="Data Inicial"
            required
            widthClass="w-[180px]"
            name="inicio"
            value={dataInicial}
            onChange={(e) => setDataInicial(e.target.value)}
          />

          {/* CAMPO 2 */}
          <DateInput
            label="Data Final"
            required
            widthClass="w-[180px]"
            name="fim"
            value={dataFinal}
            onChange={(e) => setDataFinal(e.target.value)}
          />

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
