import './Produtos.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, TextField, Box, MenuItem } from '@mui/material';

const Button = ({ tipo, onClick, children }) => {
    const classe = tipo === "finalizar" ? "botao-finalizar" : "botao-adicionar";
    return <button className={classe} onClick={onClick}>{children}</button>;
};

function Produtos() {
    const navigate = useNavigate();
    const [quantidades, setQuantidades] = useState({});
    const [total, setTotal] = useState(0);
    const [nome, setNome] = useState('');
    const [nomeError, setNomeError] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [sexo, setSexo] = useState('');
    const [sexoError, setSexoError] = useState(false);
    const totalFormatado = `Total: R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

    const produtos = [
        { id: 1, nome: 'AirPods Apple Fones de ouvido', imagem: 'imagens/Produtos/produto-01.jpeg', preco: 'R$ 1.499,00', parcelas: 12, descontoAVista: 10 },
        { id: 2, nome: 'Capa de Silicone para Iphone 8/7 cor Areia - rosa', imagem: 'imagens/Produtos/produto-02.jpeg', preco: 'R$ 299,00', parcelas: 12, descontoAVista: 10 },
        { id: 3, nome: 'Apple Pencil', imagem: 'imagens/Produtos/produto-03.jpeg', preco: 'R$ 729,00', parcelas: 12, descontoAVista: 10 },
        { id: 4, nome: 'Magic Mouse 2 - Prateado', imagem: 'imagens/Produtos/produto-04.jpeg', preco: 'R$ 549,00', parcelas: 12, descontoAVista: 10 },
        { id: 5, nome: 'Caixa prateada de alumínio com pulseira esportiva branca', imagem: 'imagens/Produtos/produto-05.jpeg', preco: 'R$ 2.899,00', parcelas: 12, descontoAVista: 10 },
        { id: 6, nome: 'Cabo de lightning para USB (1m)', imagem: 'imagens/Produtos/produto-06.jpeg', preco: 'R$ 149,00', parcelas: 12, descontoAVista: 10 },
        { id: 7, nome: 'Smart Keyboard para iPad Pro 12,9 polegadas - inglês (EUA)', imagem: 'imagens/Produtos/produto-07.jpeg', preco: 'R$ 1.099,00', parcelas: 12, descontoAVista: 10 },
        { id: 8, nome: 'Carregador USB de 5W Apple', imagem: 'imagens/Produtos/produto-08.jpeg', preco: 'R$ 149,00', parcelas: 12, descontoAVista: 10 },
    ];

    const formatarComoMoeda = (valor) => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const calcularPagamento = (preco, parcelas, desconto) => {
        const valorSemFormatacao = parseFloat(preco.replace('R$', '').replace('.', '').replace(',', '.'));
        const valorParcela = valorSemFormatacao / parcelas;
        const valorAVista = valorSemFormatacao * (1 - desconto / 100);
        return {
            parcela: `Em até ${parcelas}x de ${formatarComoMoeda(valorParcela)}`,
            aVista: `${formatarComoMoeda(valorAVista)} à vista (${desconto}% de desconto)`
        };
    };

    const alterarQuantidade = (id, valor) => {
        setQuantidades(prev => {
            let quantidadeAtual = prev[id] || 0;
            if (valor === -1 && quantidadeAtual > 0) quantidadeAtual -= 1;
            if (valor === 1) quantidadeAtual += 1;
            return { ...prev, [id]: quantidadeAtual };
        });
    };

    const adicionarAoTotal = (precoProduto, id) => {
        setTotal(prevTotal => {
            const quantidade = quantidades[id] || 0;
            const valorProduto = parseFloat(precoProduto.replace('R$', '').replace(/\./g, '').replace(',', '.'));
            return prevTotal + valorProduto * quantidade;
        });
    };

    const finalizarCompra = () => {
        validateNome();
        validateEmail();
        validateSexo();
        if (!nomeError && !emailError && !sexoError && nome && email && sexo) {
            navigate('/compra-finalizada', { state: { nome: nome, total: total.toFixed(2) } });
        }
    };

    const handleNomeChange = (event) => {
        const valor = event.target.value;
        setNome(valor);
        if (valor) {
            setNomeError(false);
        }
    };

    const handleEmailChange = (event) => {
        const valor = event.target.value;
        setEmail(valor);
        if (valor && /@\w+\.\w+/.test(valor)) {
            setEmailError(false);
        }
    };

    const handleSexoChange = (event) => {
        const valor = event.target.value;
        setSexo(valor);
        if (valor) {
            setSexoError(false);
        }
    };

    const validateNome = () => {
        setNomeError(!nome);
    };

    const validateEmail = () => {
        setEmailError(!email || !/@\w+\.\w+/.test(email));
    };

    const validateSexo = () => {
        setSexoError(!sexo);
    };

    return (
        <div className="pagina-produtos">
            <div className='produtos-titulo'>
                <Typography variant="h4" align="left">Produtos</Typography>
            </div>
            <hr />
            <div className='lista-produtos'>
                <Grid container spacing={2} justifyContent="center">
                    {produtos.map((produto) => (
                        <Grid key={produto.id} item xs={12} sm={6} md={4} lg={3} style={{ maxWidth: '350px', margin: '7px' }} className='produto-item'>
                            <div className="produto-wrapper">
                                <div className="produto-imagem">
                                    <img src={produto.imagem} alt={produto.nome} />
                                </div>
                                <div className="produto-info">
                                    <Typography variant="h6" align="center">{produto.nome}</Typography>
                                    <Typography variant="body1" align="center">{produto.preco}</Typography>
                                    <div className="produto-pagamento-info">
                                        <Typography variant="body2" align="center">
                                            {calcularPagamento(produto.preco, produto.parcelas, produto.descontoAVista).parcela}
                                        </Typography>
                                        <Typography variant="body2" align="center">
                                            {calcularPagamento(produto.preco, produto.parcelas, produto.descontoAVista).aVista}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="produto-acoes">
                                    <div className="quantidade-btn-container">
                                        <img
                                            src="imagens/botoes/baseline-remove-24px.svg"
                                            alt="Diminuir"
                                            className="quantidade-menos"
                                            onClick={() => alterarQuantidade(produto.id, -1)}
                                        />
                                        <span className="quantidade-display">{quantidades[produto.id] || 0}</span>
                                        <img
                                            src="imagens/botoes/baseline-add-24px.svg"
                                            alt="Aumentar"
                                            className="quantidade-mais"
                                            onClick={() => alterarQuantidade(produto.id, 1)}
                                        />
                                    </div>
                                    <Button tipo="adicionar" onClick={() => adicionarAoTotal(produto.preco, produto.id)}>Adicionar</Button>
                                </div>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </div>
            <div className="dados-cliente">
                <Typography variant="h5">Dados do Cliente</Typography>
            </div>
            <hr />
            <div className="input">
                <Box
                    component="form"
                    className="form-container"
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        error={nomeError}
                        id="outlined-required"
                        label="Nome"
                        defaultValue=""
                        placeholder="Nome do cliente aqui"
                        variant="outlined"
                        onChange={handleNomeChange}
                        onBlur={validateNome}
                        helperText={nomeError ? 'Campo obrigatório' : ''}
                        className="form-field"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        error={emailError}
                        id="outlined-email"
                        label="Email"
                        value={email}
                        placeholder="Digite seu email aqui"
                        variant="outlined"
                        onChange={handleEmailChange}
                        onBlur={validateEmail}
                        helperText={emailError ? 'Insira um e-mail válido' : ''}
                        className="form-field"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        error={sexoError}
                        id="outlined-select-sexo"
                        select
                        label="Sexo"
                        value={sexo}
                        variant="outlined"
                        onChange={handleSexoChange}
                        onBlur={validateSexo}
                        helperText={sexoError ? 'Selecione uma opção' : ''}
                        className="form-field-sexo"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        SelectProps={{
                            displayEmpty: true,
                            renderValue: sexo !== '' ? undefined : () => 'Selecione',
                        }}
                    >
                        <MenuItem value="" disabled>
                            Selecione
                        </MenuItem>
                        <MenuItem value="M">Masculino</MenuItem>
                        <MenuItem value="F">Feminino</MenuItem>
                    </TextField>
                </Box>
                <div className="total-compra">
                    <Typography variant="h6" align="right">{totalFormatado}</Typography>
                    <Button tipo="finalizar" onClick={finalizarCompra}>FINALIZAR COMPRA</Button>
                </div>
            </div>
        </div>
    );
}

export default Produtos;