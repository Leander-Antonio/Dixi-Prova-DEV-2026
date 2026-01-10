import { Link } from "react-router-dom";
import {
  UserIcon,
  DocumentTextIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

function SideBar() {
  return (
    <div className="bg-[#3379BC] w-[120px] h-full fixed top-0 left-0 ">
      <img
        src="/LogoDixi.png"
        alt="Logo Dixi"
        className="w-[90px] mt-[21px] ml-3"
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
        to="/espelho"
        className="text-white flex flex-col items-center justify-center font-semibold h-[100px] w-full hover:bg-[#2a66a3]"
      >
        <DocumentTextIcon className="h-8 w-8 text-white stroke-2 mb-1" />
        <span>Histórico</span> <span>de Ponto</span>
      </Link>

      <div className="w-full h-px bg-white my-4 "></div>
    </div>
  );
}

export default SideBar;
