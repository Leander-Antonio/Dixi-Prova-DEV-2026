import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function HistoricoPonto() {
  const navigate = useNavigate();

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
      <div className="bg-white rounded-2xl shadow-md p-6  w-[90%]">
        {/* FILTROS */}
        <div className="flex gap-6 w-full items-end justify-end mb-6">
          {/* CAMPO 1 */}
          <div className="flex flex-col w-[150px]">
            <label className="text-[#3379BC] font-semibold">
              Data Inicial <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="bg-white border border-gray-300 rounded p-1.5 w-full placeholder-gray-400 placeholder:font-semibold"
              placeholder="00/00/0000"
            />
          </div>

          {/* CAMPO 2 */}
          <div className="flex flex-col w-[150px]">
            <label className="text-[#3379BC] font-semibold">
              Data Final <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="bg-white border border-gray-300 rounded p-1.5 w-full placeholder-gray-400 placeholder:font-semibold"
              placeholder="00/00/0000"
            />
          </div>

          {/* BOTÕES */}
          <button
            className="w-[180px] h-9 shadow rounded border border-[#3379BC]
              text-[#3379BC] font-semibold text-[18px]
              flex items-center justify-center gap-2
              hover:bg-[#3379BC] hover:text-white transition cursor-pointer"
          >
            <PlusIcon className="h-6 w-6" />
            Calcular
          </button>

          <div className="flex gap-4">
            <button
              className="bg-[#3379BC] w-[180px] h-9 shadow rounded
              text-white font-semibold text-[18px] flex items-center justify-center gap-2 hover:bg-[#40A5DD] cursor-pointer"
            >
              <MagnifyingGlassIcon className="h-6 w-6 stroke-2" />
              Pesquisar
            </button>
          </div>
        </div>

        {/* TABELA */}
        <div className="overflow-auto rounded-2xl">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#EBEDEE] text-[#3379BC] font-semibold text-[1.18rem]">
                <th className="py-1.5 p-2 w-[60px] border-b border-gray-300">
                  Data
                </th>
                <th className="py-1.5 p-2 w-[580px] border-b border-gray-300 border-l">
                  Marcações
                </th>
                <th className="py-1.5 p-2 w-[80px] border-b border-gray-300 border-l">
                  Horas Trabalhadas
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="text-center font-semibold">
                <td className="py-3 p-2 border-t border-gray-300">
                  05/01/2025
                </td>
                <td className="py-3 p-2 border-t border-gray-300 border-l">
                  08:00 • 12:00 • 13:00 • 17:00
                </td>
                <td className="py-3 p-2 border-t border-gray-300 border-l">
                  8h
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HistoricoPonto;
