import { ClockIcon, VideoCameraSlashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

function BaterPonto() {
  const [ativo, setAtivo] = useState(false);
  {
    /* Acessar a Cam */
  }
  const [cameraAtiva, setCameraAtiva] = useState(false);
  const [erroCamera, setErroCamera] = useState(false);
  const [stream, setStream] = useState(null);

  const ativarCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });

      setStream(mediaStream);
      setCameraAtiva(true);
      setErroCamera(false);
    } catch (error) {
      console.error("Erro câmera:", error.name);
      setErroCamera(true);
      setCameraAtiva(false);
    }
  };

  const desligarCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setStream(null);
    setCameraAtiva(false);
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  {
    /* Hora real */
  }
  const [agora, setAgora] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setAgora(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  const hora = agora.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const segundos = agora.toLocaleTimeString("pt-BR", {
    second: "2-digit",
  });

  const data = agora.toLocaleDateString("pt-BR");

  const diaSemana = agora.toLocaleDateString("pt-BR", {
    weekday: "long",
  });

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
          {/* Parte da camera*/}
          <div className="flex-1 relative bg-gray-50 overflow-hidden flex items-center justify-center">
            {cameraAtiva && stream && (
              <video
                autoPlay
                playsInline
                ref={(video) => {
                  if (video && stream) {
                    video.srcObject = stream;
                  }
                }}
                className="w-full h-full object-cover"
              />
            )}

            {cameraAtiva && (
              <>
                {/* Overlay escuro com recorte */}
                <div className="absolute inset-0 bg-black/50 pointer-events-none" />

                {/* Janela transparente */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    width: "380px",
                    height: "440px",
                    boxShadow: "0 0 0 9999px rgba(0,0,0,0.5)",
                    borderRadius: "16px",
                  }}
                />

                {/* Texto + Moldura */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="text-white font-semibold mb-6 drop-shadow-lg text-2xl">
                    Centralize o rosto na moldura para tirar a foto.
                  </p>

                  <div className="relative w-[380px] h-[440px]">
                    <span className="absolute -top-1 -left-1 w-12 h-12 border-t-8 border-l-8 border-white rounded-tl-2xl" />
                    <span className="absolute -top-1 -right-1 w-12 h-12 border-t-8 border-r-8 border-white rounded-tr-2xl" />
                    <span className="absolute -bottom-1 -left-1 w-12 h-12 border-b-8 border-l-8 border-white rounded-bl-2xl" />
                    <span className="absolute -bottom-1 -right-1 w-12 h-12 border-b-8 border-r-8 border-white rounded-br-2xl" />
                  </div>
                </div>
              </>
            )}

            {!cameraAtiva && erroCamera && (
              <div className="flex flex-col items-center justify-center text-center gap-4">
                <VideoCameraSlashIcon className="w-20 h-20 text-gray-400" />

                <p className="text-gray-500 text-sm max-w-xs font-semibold">
                  Não foi possível acessar a webcam!
                  <br />
                  Altere as permissões do navegador para continuar.
                </p>

                <button
                  onClick={ativarCamera}
                  className="border border-[#3379BC] text-[#3379BC] px-5 py-2 rounded-full font-semibold hover:bg-[#3379BC] hover:text-white transition"
                >
                  Ative a Permissão
                </button>
              </div>
            )}

            {!cameraAtiva && !erroCamera && (
              <span className="text-gray-400 text-sm">Foto Desabilitada</span>
            )}
          </div>

          {/* parte das infos */}
          <div className="w-[360px] bg-white p-6 flex flex-col justify-between ">
            <div>
              <p className="text-[#3379BC] font-bold mb-2 text-3xl capitalize">
                {diaSemana}
              </p>

              <div className="flex items-end gap-2">
                <span className="text-[#3379BC] text-7xl font-bold font-sans">
                  {hora}
                </span>
                <span className="text-[#7A7A7A] text-3xl mb-1 font-semibold">
                  {segundos}
                </span>
              </div>

              <p className="text-[#3379BC] mt-2 font-bold text-2xl">{data}</p>

              <p className="text-[#7A7A7A] text-sm mt-4 font-semibold">
                A data e hora serão registrados no sistema ao realizar a
                marcação.
              </p>

              {/* Toggle tirar foto */}
              <div className="flex items-center gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    if (ativo) {
                      // usuário quer DESLIGAR
                      desligarCamera();
                      setErroCamera(false);
                      setAtivo(false);
                    } else {
                      // usuário quer LIGAR
                      setAtivo(true);
                      ativarCamera();
                    }
                  }}
                  className={`relative w-15 h-7 flex items-center rounded-full p-1 transition-colors ${
                    ativo
                      ? "bg-[#3379BC]"
                      : "bg-white border-2 border-[#3379BC]"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full shadow-md transform transition-transform ${
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
              <ClockIcon className=" h-7 stroke-2 " />
              Registrar Ponto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BaterPonto;
