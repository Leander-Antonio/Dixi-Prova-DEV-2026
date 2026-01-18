import ClockStatic from "./ClockStatic";
import { XMarkIcon, VideoCameraSlashIcon } from "@heroicons/react/24/outline";

function DadosMarcacao({ foto, momento, onFechar }) {
  if (!momento) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl w-[900px] h-[480px] flex flex-col relative overflow-hidden">
        {/* botão fechar */}
        <button
          onClick={onFechar}
          className="absolute border-3 border-[#3379BC] rounded-md top-4 right-4 text-[#3379BC] hover:bg-[#3379BC] hover:text-white cursor-pointer"
        >
          <XMarkIcon className="w-6 h-6 stroke-2" />
        </button>

        {/* título */}
        <h2 className="text-2xl font-bold text-[#3379BC] mt-4 ml-8">
          Dados da Marcação
        </h2>

        {/* conteúdo principal */}
        <div className="flex flex-1 px-6 py-4">
          {/* foto */}
          <div className="w-1/2 flex items-center justify-center">
            {foto ? (
              <img
                src={foto}
                alt="Marcação"
                className="rounded-xl object-cover w-full h-full"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <VideoCameraSlashIcon className="w-24 h-24 stroke-1" />
                <p className="font-semibold">Registro sem foto</p>
              </div>
            )}
          </div>

          {/* infos */}
          <div className="w-1/2 flex flex-col items-center justify-center gap-6">
            <div className="text-center">
              <ClockStatic data={momento} />
            </div>

            <p className="text-gray-600 text-lg font-semibold text-center">
              Detalhes da marcação selecionada.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DadosMarcacao;
