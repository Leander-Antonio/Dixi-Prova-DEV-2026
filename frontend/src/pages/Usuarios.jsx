import api from "../services/api";
import { useEffect, useState } from "react";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    api
      .get("/usuarios")
      .then((res) => setUsuarios(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Usuários</h1>

      <ul className="space-y-2">
        {usuarios.map((u) => (
          <li key={u.id} className="border p-2 rounded">
            <strong>{u.nome}</strong> — {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Usuarios;
