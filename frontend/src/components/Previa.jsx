import ClockStatic from "./ClockStatic";
import { useEffect } from "react";

import {
  XMarkIcon,
  ArrowPathIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

function Previa({
  foto,
  momento,
  localizacao,
  localizacaoNegada,
  carregandoLocalizacao,
  onSolicitarLocalizacao,
  onFechar,
  onRefazer,
  onConfirmar,
}) {
  if (!momento) return null;

  useEffect(() => {
    if (!localizacao && !localizacaoNegada) {
      onSolicitarLocalizacao();
    }
  }, [localizacao, localizacaoNegada, onSolicitarLocalizacao]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl w-[900px] h-[480px] flex flex-col relative overflow-hidden">
        <button
          onClick={onFechar}
          className="absolute border-3 border-[#3379BC] rounded-md top-4 right-4 text-[#3379BC] hover:bg-[#3379BC] hover:text-white cursor-pointer"
        >
          <XMarkIcon className="w-6 h-6 stroke-2" />
        </button>

        <h2 className="text-2xl font-bold text-[#3379BC] mt-4 ml-8">
          Prévia da Marcação
        </h2>

        <div className="flex flex-1 px-6 py-4">
          <div className="w-1/2 flex items-center justify-center">
            {foto ? (
              <img
                src={foto}
                alt="Prévia"
                className="rounded-xl object-cover w-full h-full"
              />
            ) : (
              <p className="text-gray-400 text-lg font-semibold">
                Registro sem foto
              </p>
            )}
          </div>

          <div className="w-1/2 flex flex-col items-center justify-center gap-6">
            <div className="text-center">
              <ClockStatic data={momento} />
            </div>

            {/* estado carregando */}
            {carregandoLocalizacao && !localizacao && (
              <p className="text-blue-600 text-sm font-semibold">
                Obtendo localização...
              </p>
            )}

            {/* permissão negada */}
            {!localizacao && !carregandoLocalizacao && localizacaoNegada && (
              <div className="flex flex-col items-center gap-2 mt-2">
                <p className="text-red-400 text-sm font-semibold text-center">
                  Ative a permissão de localização do navegador para registrar o
                  ponto.
                </p>
              </div>
            )}

            <p className="text-gray-600 text-lg font-semibold text-center">
              Você deseja registrar esse ponto?
            </p>
          </div>
        </div>

        <div className="ml-6 mr-6 mb-6 mt-2 flex gap-4">
          <button
            onClick={onRefazer}
            className="flex-1 border border-[#3379BC] text-[#3379BC] py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#3379BC] hover:text-white transition cursor-pointer"
          >
            <ArrowPathIcon className="w-5 h-5 stroke-2" />
            Tirar outra foto
          </button>

          <button
            onClick={onConfirmar}
            disabled={!localizacao || carregandoLocalizacao}
            className={`flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition
              ${
                localizacao
                  ? "bg-[#3379BC] text-white hover:bg-[#40A5DD] cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            <CheckIcon className="w-5 h-5 stroke-3" />
            Registrar Ponto
          </button>
        </div>
      </div>
    </div>
  );
}

export default Previa;
