// App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VistaCliente from './pages/VistaCliente';
import VistaCamarero from './pages/VistaCamarero';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cliente" element={<VistaCliente />} />
      <Route path="/camarero" element={<VistaCamarero />} />
    </Routes>
  );
}

export default App;
