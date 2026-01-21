import { Link } from "react-router-dom";
import {
  DocumentTextIcon,
  ClockIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

function SideBar() {
  return (
    <div className="bg-[#3379BC] w-[130px] h-full fixed top-0 left-0 ">
      <img
        src="/LogoDixi.png"
        alt="Logo Dixi"
        className="w-[100px] mt-[21px] ml-4"
      />
      <div className="w-full h-px bg-white my-4 "></div>

      <Link
        to="/bater-ponto"
        className="text-white flex flex-col items-center justify-center font-semibold h-[100px] w-full hover:bg-[#2a66a3]"
      >
        <ClockIcon className=" h-9 stroke-2 mb-1" />
        <span>Bater Ponto</span>
      </Link>

      <div className="w-full h-px bg-white my-4 "></div>

      <Link
        to="/historico-ponto"
        className="text-white flex flex-col items-center justify-center font-semibold h-[100px] w-full hover:bg-[#2a66a3]"
      >
        <DocumentTextIcon className="h-8 w-8 text-white stroke-2 mb-1" />
        <span>Histórico</span>
        <span>de Ponto</span>
      </Link>

      <div className="w-full h-px bg-white my-4 "></div>
      <Link
        to="/marcacoes-desconsideradas"
        className="text-white flex flex-col items-center justify-center font-semibold h-[100px] w-full hover:bg-[#2a66a3]"
      >
        <XCircleIcon className="h-9 w-9 stroke-2 mb-1" />
        <span>Marcações</span>
        <span>Desconsideradas</span>
      </Link>

      <div className="w-full h-px bg-white my-4"></div>
    </div>
  );
}

export default SideBar;
