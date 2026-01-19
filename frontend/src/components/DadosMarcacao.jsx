import ClockStatic from "./ClockStatic";
import {
  XMarkIcon,
  VideoCameraSlashIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

function DadosMarcacao({ foto, momento, localizacao, onFechar }) {
  if (!momento) return null;

  const lat = localizacao?.latitude;
  const lon = localizacao?.longitude;

  const textoLocalizacao =
    lat != null && lon != null ? `${lat.toFixed(6)}, ${lon.toFixed(6)}` : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl w-[1200px] h-[480px] flex flex-col relative overflow-hidden border-4 border-[#3379BC]">
        {/* fechar */}
        <button
          onClick={onFechar}
          className="absolute border-2 border-[#3379BC] rounded-md top-4 right-4 text-[#3379BC] hover:bg-[#3379BC] hover:text-white cursor-pointer"
        >
          <XMarkIcon className="w-6 h-6 stroke-2" />
        </button>

        <h2 className="text-2xl font-bold text-[#3379BC] mt-4 ml-8">
          Dados da Marcação
        </h2>

        <div className="grid grid-cols-3 flex-1 px-8 py-4 items-center">
          {/* ESQUERDA */}
          <div className="flex items-center justify-start">
            {foto ? (
              <img
                src={foto}
                alt="Marcação"
                className="rounded-xl object-cover w-[360px] h-[360px]"
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 bg-gray-100 border border-gray-300 rounded-xl w-[360px] h-[360px] text-gray-400">
                <VideoCameraSlashIcon className="w-24 h-24 stroke-1" />
                <p className="font-semibold">Registro sem foto</p>
              </div>
            )}
          </div>

          {/* CENTRO */}
          <div className="flex flex-col items-center justify-center">
            <ClockStatic data={momento} />
          </div>

          {/* DIREITA */}
          <div className="flex items-center justify-end">
            {lat != null && lon != null && (
              <div className="w-[360px] h-[360px] rounded-xl overflow-hidden border border-gray-200">
                <iframe
                  title="Mapa da marcação"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                    lon - 0.002
                  },${lat - 0.002},${lon + 0.002},${
                    lat + 0.002
                  }&layer=mapnik&marker=${lat},${lon}`}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DadosMarcacao;
