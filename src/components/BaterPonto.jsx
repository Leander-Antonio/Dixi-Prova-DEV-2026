import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

function BaterPonto() {
  const [ativo, setAtivo] = useState(false);
  return (
    <div className="min-h-screen flex justify-center font-sans">
      <div className="w-[1200px]">
        <h1 className="text-[#3379BC] text-4xl font-bold mb-1 ml-8 mt-10">
          Bater Ponto
        </h1>
        <h2 className="text-[#7A7A7A] text-lg font-semibold mb-4 ml-8">
          Registre o Ponto no Sistema
        </h2>

        {/* Card */}
        <div className="h-[650px] bg-white rounded-2xl shadow-md flex overflow-hidden">
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <span className="text-gray-400 text-sm">Foto Desabilitada</span>
          </div>
          {/* infos */}
          <div className="w-[360px] bg-white p-6 flex flex-col justify-between ">
            <div>
              <p className="text-[#3379BC] font-bold mb-2 text-3xl">
                Terça-Feira
              </p>

              <div className="flex items-end gap-2">
                <span className="text-[#3379BC] text-7xl font-bold font-sans">
                  12:32
                </span>
                <span className="text-[#7A7A7A] text-3xl mb-1 font-semibold">
                  36
                </span>
              </div>

              <p className="text-[#3379BC] mt-2 font-bold text-2xl">
                21 / 02 / 2026
              </p>

              <p className="text-[#7A7A7A] text-sm mt-4">
                A data e hora serão registrados no sistema ao realizar a
                marcação.
              </p>

              {/* Toggle tirar foto */}
              <div className="flex items-center gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setAtivo((prev) => !prev)}
                  className={`relative w-15 h-7 flex items-center rounded-full p-1 transition-colors ${
                    ativo
                      ? "bg-[#3379BC]"
                      : "bg-white border-3 border-[#3379BC]"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-[#3379BC] rounded-full shadow-md transform transition-transform ${
                      ativo
                        ? "bg-white translate-x-8"
                        : "bg-[#3379BC] translate-x-0"
                    }`}
                  />
                </button>

                <span className="text-[#7A7A7A] text-sm font-semibold">
                  Tirar foto para bater o ponto
                </span>
              </div>
            </div>
            {/* Botão */}
            <button className="bg-[#3379BC] text-white font-semibold py-3 rounded-lg hover:bg-[#40A5DD] transition flex items-center justify-center gap-2">
              Registrar Ponto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BaterPonto;
