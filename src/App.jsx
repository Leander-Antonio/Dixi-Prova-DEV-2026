import { BrowserRouter, Routes, Route } from "react-router-dom";

import SideBar from "./components/SideBar";
import BaterPonto from "./components/BaterPonto";

function App() {
  return (
    <BrowserRouter>
      <SideBar />

      {/* Conteúdo das páginas */}
      <div className="ml-[120px] min-h-screen bg-white p-6">
        <Routes>
          <Route path="/" element={<BaterPonto />} />
          <Route path="/bater-ponto" element={<BaterPonto />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
