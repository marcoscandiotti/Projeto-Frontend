import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CompraFinalizada from './componentes/FinalizarCompra/CompraFinalizada';
import './App.css';
import Produtos from './componentes/Produtos/Produto';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Produtos />} />
          <Route path="/compra-finalizada" element={<CompraFinalizada />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;