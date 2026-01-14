import { BrowserRouter, Routes, Route } from "react-router-dom";

import SideBar from "./components/SideBar";
import BaterPonto from "./pages/BaterPonto/index";
import HistoricoPonto from "./pages/HistoricoPonto/HistoricoPonto";

function App() {
  return (
    <BrowserRouter>
      <div className="font-sans">
        <SideBar />

        {/* Conteúdo das páginas */}
        <div className="ml-[120px] min-h-screen bg-white p-6">
          <Routes>
            <Route path="/" element={<BaterPonto />} />
            <Route path="/bater-ponto" element={<BaterPonto />} />
            <Route path="/historico-ponto" element={<HistoricoPonto />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
