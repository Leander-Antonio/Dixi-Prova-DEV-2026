import ClockStatic from "./ClockStatic";
import BotaoFechar from "./BotaoFechar";
import MotivoDesconsideracao from "./MotivoDesconsideracao";

import {
  ArrowPathIcon,
  TrashIcon,
  VideoCameraSlashIcon,
} from "@heroicons/react/24/outline";

function DadosMarcacao({
  foto,
  momento,
  localizacao,
  onFechar,
  onDesconsiderar,
  onReconsiderar,
  modo = "desconsiderar",
  motivoDesconsideracao,
}) {
  if (!momento) return null;

  const lat = localizacao?.latitude;
  const lon = localizacao?.longitude;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl w-[1200px] h-[450px] flex flex-col relative overflow-hidden">
        {/* fechar */}
        <BotaoFechar onClick={onFechar} />

        <h2 className="text-3xl font-bold text-[#3379BC] mt-4 ml-8">
          Dados da Marcação
        </h2>

        <div className="grid grid-cols-3 flex-1 px-8 py-1 items-center">
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

            <MotivoDesconsideracao motivo={motivoDesconsideracao} />
          </div>

          {/* DIREITA */}
          <div className="flex flex-col items-end justify-center gap-3">
            {lat != null && lon != null && (
              <div className="w-[360px] h-[280px] rounded-xl overflow-hidden border border-gray-200 mb-20">
                <iframe
                  title="Mapa da marcação"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                    lon - 0.002
                  },${lat - 0.002},${lon + 0.002},${lat + 0.002}&layer=mapnik&marker=${lat},${lon}`}
                />
              </div>
            )}

            {/* Botão desconsiderar */}
            <button
              type="button"
              onClick={
                modo === "desconsiderar" ? onDesconsiderar : onReconsiderar
              }
              className="absolute bottom-7 right-7.5 w-[360px] h-11
    bg-[#3379BC] shadow rounded
    text-white font-semibold text-[16px]
    flex items-center justify-center gap-2
    hover:bg-[#40A5DD] transition cursor-pointer"
            >
              {modo === "desconsiderar" ? (
                <>
                  <TrashIcon className="w-5 h-5 stroke-2" />
                  Desconsiderar marcação
                </>
              ) : (
                <>
                  <ArrowPathIcon className="w-5 h-5 stroke-2" />
                  Reconsiderar marcação
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DadosMarcacao;
