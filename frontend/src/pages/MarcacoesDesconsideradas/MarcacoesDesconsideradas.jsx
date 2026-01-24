import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import api from "../../services/api";
import DadosMarcacao from "../../components/DadosMarcacao";
import TabelaMarcacoesDesconsideradas from "../../components/TabelaMarcacoesDesconsideradas";
import Alert from "../../components/Alert";
import DateInput from "../../components/DateInput";

function MarcacoesDesconsideradas() {
  const [linhas, setLinhas] = useState([]);
  const [marcacaoSelecionada, setMarcacaoSelecionada] = useState(null);

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

  const buscar = async () => {
    const inicio = dataInicial;
    const fim = dataFinal;

    try {
      const res = await api.get("/pontos/desconsideradas", {
        params: { inicio, fim },
      });
      setLinhas(res.data);
      return res.data;
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        "Erro ao buscar marcações desconsideradas";
      showAlert("error", String(msg));
      return null;
    }
  };

  const buscarComAlert = async () => {
    const dados = await buscar();
    if (!dados) return;

    if (dados.length === 0) {
      showAlert("success", "Nenhuma marcação encontrada no período");
    } else {
      showAlert("success", "Pesquisa concluída com sucesso");
    }
  };

  // ALERTA
  const [alerta, setAlerta] = useState({
    open: false,
    variant: "success",
    message: "",
  });

  const showAlert = (variant, message) => {
    setAlerta({ open: true, variant, message });
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
          <div className="flex gap-4">
            <button
              type="button"
              onClick={buscarComAlert}
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
              motivo: m.motivo,
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
        motivoDesconsideracao={marcacaoSelecionada?.motivo}
        onFechar={() => setMarcacaoSelecionada(null)}
        onReconsiderar={async () => {
          try {
            await api.post(`/pontos/${marcacaoSelecionada.id}/reconsiderar`);

            showAlert("success", "Marcação reconsiderada com sucesso");

            setMarcacaoSelecionada(null);
            await buscar();
          } catch (err) {
            const msg =
              err?.response?.data?.message ||
              err?.response?.data ||
              "Erro ao reconsiderar";

            showAlert("error", String(msg));
          }
        }}
        modo="reconsiderar"
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

export default MarcacoesDesconsideradas;
