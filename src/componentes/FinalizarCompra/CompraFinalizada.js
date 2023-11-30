import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CompraFinalizada.css'; 

const CompraFinalizada = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { nome, total } = location.state || { total: 0 };
  const totalNumerico = parseFloat(total);
  const totalFormatado = totalNumerico.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const iniciarNovaCompra = () => {
    navigate('/');
  };

  useEffect(() => {
    document.body.style.backgroundColor = "#f0f0f0";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <div className="compra-finalizada-page">
      <div className="container-finalizacao">
        <div className="card-finalizacao">
          <div className="texto-finalizacao">
            <h2>{nome},</h2>
            <p>Sua compra no valor de <span>{totalFormatado}</span> foi finalizada com sucesso</p>
          </div>
          <div className="icone-sucesso">
            <img src="/imagens/purchase.png" alt="Sucesso" />
          </div>
          <button className="botao-nova-compra" onClick={iniciarNovaCompra}>INICIAR NOVA COMPRA</button>
        </div>
      </div>
    </div>
  );
};

export default CompraFinalizada;