import { VideoCameraSlashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState, useRef } from "react";

function Camera({ ativo, onCapture, onPermissaoNegada }) {
  const [cameraAtiva, setCameraAtiva] = useState(false);
  const [erroCamera, setErroCamera] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

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
      onPermissaoNegada?.();
    }
  };

  const desligarCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setStream(null);
    setCameraAtiva(false);
  };

  // reage ao toggle
  useEffect(() => {
    if (ativo) {
      ativarCamera();
    } else {
      desligarCamera();
      setErroCamera(false);
    }
  }, [ativo]);

  // conecta stream ao video
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  // cleanup
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  // foto
  const capturarFoto = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imagem = canvas.toDataURL("image/jpeg");
    onCapture(imagem);
  };

  return (
    <div className="flex-1 relative bg-gray-50 flex items-center justify-center overflow-hidden">
      {cameraAtiva && stream && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
      )}

      {cameraAtiva && (
        <>
          <div className="absolute inset-0 bg-black/50 pointer-events-none" />

          <div
            className="absolute pointer-events-none mt-2"
            style={{
              width: "440px",
              height: "500px",
              boxShadow: "0 0 0 9999px rgba(0,0,0,0.2)",
              borderRadius: "16px",
            }}
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-white font-semibold mb-6 text-2xl">
              Centralize o rosto na moldura para tirar a foto.
            </p>

            <div className="relative w-[440px] h-[500px] mb-12">
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
            className="border border-[#3379BC] text-[#3379BC] px-5 py-2 rounded-full font-semibold hover:bg-[#3379BC] hover:text-white transition cursor-pointer"
          >
            Ative a Permissão
          </button>
        </div>
      )}

      {!cameraAtiva && !erroCamera && (
        <span className="text-gray-400 text-sm">Foto Desabilitada</span>
      )}
      <button id="capturar-foto" onClick={capturarFoto} className="hidden" />
    </div>
  );
}

export default Camera;
