import ClockStatic from "./ClockStatic";
import {
  XMarkIcon,
  VideoCameraSlashIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

function DadosMarcacao({ foto, momento, localizacao, onFechar }) {
  if (!momento) return null;

  const textoLocalizacao =
    localizacao?.latitude && localizacao?.longitude
      ? `${localizacao.latitude.toFixed(6)}, ${localizacao.longitude.toFixed(6)}`
      : null;

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
          Dados da Marcação
        </h2>

        <div className="flex flex-1 px-6 py-4">
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

          <div className="w-1/2 flex flex-col items-center justify-center gap-6">
            <div className="text-center">
              <ClockStatic data={momento} />
            </div>

            {/* localização */}
            <div className="flex items-center gap-2">
              <MapPinIcon className="w-6 h-6 text-[#3379BC] stroke-2" />
              {textoLocalizacao ? (
                <p className="text-gray-700 font-semibold">
                  {textoLocalizacao}
                </p>
              ) : (
                <p className="text-gray-400 font-semibold">
                  Localização não informada
                </p>
              )}
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
