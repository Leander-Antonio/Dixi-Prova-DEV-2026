import { ClockIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import CameraPreview from "../../components/Camera";
import Clock from "../../components/Clock";
import ToggleCamera from "../../components/ToggleButton";
import Previa from "../../components/Previa";

function BaterPonto() {
  const [ativo, setAtivo] = useState(false);
  const [foto, setFoto] = useState(null);
  const [mostrarPrevia, setMostrarPrevia] = useState(false);
  const [momentoMarcacao, setMomentoMarcacao] = useState(null);
  const [permissaoCameraNegada, setPermissaoCameraNegada] = useState(false);
  const podeRegistrar = !ativo || (ativo && !permissaoCameraNegada);

  return (
    <div className="min-h-screen flex justify-center font-sans">
      {/* card */}
      <div className="w-[1300px]">
        <h1 className="text-[#3379BC] text-4xl font-bold mb-1 ml-8 mt-10">
          Bater Ponto
        </h1>
        <h2 className="text-[#7A7A7A] text-lg font-semibold mb-4 ml-8">
          Registre o Ponto no Sistema
        </h2>
        {/* Camera*/}
        <div className="h-[650px] bg-white rounded-2xl shadow-md flex overflow-hidden">
          <CameraPreview
            ativo={ativo}
            onCapture={(imagem) => {
              setFoto(imagem);
              setMomentoMarcacao(new Date());
              setMostrarPrevia(true);
            }}
            onPermissaoNegada={() => {
              setPermissaoCameraNegada(true);
            }}
          />
          {/* parte das infos */}
          <div className="w-[500px] p-6 flex flex-col justify-between">
            <div>
              <Clock />
              <p className="text-[#7A7A7A] text-1xl mt-4 font-semibold ">
                A data e hora serão registrados no sistema ao realizar a
                marcação.
              </p>
              <ToggleCamera
                ativo={ativo}
                onToggle={() => {
                  setAtivo(!ativo);
                  setPermissaoCameraNegada(false);
                }}
              />
            </div>
            {/* botão registrar */}
            <button
              disabled={!podeRegistrar}
              onClick={() => {
                if (!ativo) {
                  // registro sem foto
                  setFoto(null);
                  setMomentoMarcacao(new Date());
                  setMostrarPrevia(true);
                } else {
                  // registro com foto
                  document.getElementById("capturar-foto")?.click();
                }
              }}
              className={`font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2
    ${
      podeRegistrar
        ? "bg-[#3379BC] text-white hover:bg-[#40A5DD]"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }
  `}
            >
              <ClockIcon className="h-7 stroke-2" />
              Registrar Ponto
            </button>
          </div>
        </div>
      </div>
      {mostrarPrevia && (
        <Previa
          foto={foto}
          momento={momentoMarcacao}
          onFechar={() => setMostrarPrevia(false)}
          onRefazer={() => {
            setFoto(null);
            setMomentoMarcacao(null); // 👈 importante
            setMostrarPrevia(false);
          }}
          onConfirmar={() => {
            console.log("Ponto registrado!");
            setMostrarPrevia(false);
            setFoto(null);
            setMomentoMarcacao(null);
          }}
        />
      )}
    </div>
  );
}

export default BaterPonto;
