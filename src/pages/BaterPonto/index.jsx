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
              setMostrarPrevia(true);
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
              <ToggleCamera ativo={ativo} onToggle={() => setAtivo(!ativo)} />
            </div>
            {/* botão registrar */}
            <button
              onClick={() => {
                // dispara a captura da foto
                document.getElementById("capturar-foto")?.click();
              }}
              className="bg-[#3379BC] text-white font-semibold py-3 rounded-lg hover:bg-[#40A5DD] transition flex items-center justify-center gap-2"
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
          onFechar={() => setMostrarPrevia(false)}
          onRefazer={() => {
            setFoto(null);
            setMostrarPrevia(false);
          }}
          onConfirmar={() => {
            console.log("Ponto registrado!");
            setMostrarPrevia(false);
            setFoto(null);
          }}
        />
      )}
    </div>
  );
}

export default BaterPonto;
