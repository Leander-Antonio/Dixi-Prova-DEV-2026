function MotivoDesconsideracao({ motivo }) {
  if (!motivo) return null;

  const m = String(motivo).toUpperCase();

  const formatar = () => {
    if (m === "ADMIN" || m === "DESCONSIDERADA_PELO_ADMIN") {
      return {
        titulo: "Marcação desconsiderada",
        detalhe: "Desconsiderada pelo administrador",
        badge: "ADMIN",
      };
    }

    if (m === "MARCACAO_DUPLICADA" || m === "DUPLICADA") {
      return {
        titulo: "Marcação desconsiderada",
        detalhe: "Marcação já existente",
        badge: "DUPLICADA",
      };
    }

    return {
      titulo: "Marcação desconsiderada",
      detalhe: motivo,
      badge: "MOTIVO",
    };
  };

  const info = formatar();

  return (
    <div className="mt-12 w-[260px] text-center border border-gray-200 rounded-xl p-4 bg-gray-50">
      {/* TÍTULO */}
      <p className="text-lg font-bold text-gray-800">{info.titulo}</p>

      {/* QUADRINHO */}
      <div className="flex justify-center mt-2">
        <span className="text-[11px] font-bold px-3 py-0.5 rounded-full border border-orange-600 text-orange-700 bg-orange-50">
          {info.badge}
        </span>
      </div>

      {/* MOTIVO */}
      <p className="mt-3 text-sm text-gray-600">{info.detalhe}</p>
    </div>
  );
}

export default MotivoDesconsideracao;
