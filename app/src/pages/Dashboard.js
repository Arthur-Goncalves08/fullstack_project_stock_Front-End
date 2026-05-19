// Página de Dashboard - exibe resumo geral do sistema de estoque
import { useState, useEffect } from 'react';

function Dashboard() {
  // Estado para armazenar os dados vindos da API
  const [dados, setDados] = useState(null);

  // useEffect carrega os dados do dashboard ao montar o componente
  useEffect(() => {
    async function carregarDashboard() {
      try {
        const resposta = await fetch('http://localhost:5000/dashboard');
        const json = await resposta.json();
        setDados(json);
      } catch (erro) {
        console.error('Erro ao carregar dashboard:', erro);
      }
    }
    carregarDashboard();
  }, []);

  return (
    <div style={estilos.pagina}>
      {/* Cabeçalho da página */}
      <h1 style={estilos.titulo}>Dashboard - Controle de Estoque</h1>

      {/* Menu de navegação */}
      <nav style={estilos.nav}>
        <a href="/produtos" style={estilos.link}>Produtos</a>
        <a href="/vendas" style={estilos.link}>Vendas</a>
        <a href="/usuarios" style={estilos.link}>Usuários</a>
      </nav>

      {/* Exibe mensagem enquanto os dados carregam */}
      {!dados && <p>Carregando dados...</p>}

      {/* Cards com os indicadores principais */}
      {dados && (
        <div style={estilos.containerCards}>
          {/* Card: Total de produtos cadastrados */}
          <div style={estilos.card}>
            <h2 style={estilos.cardTitulo}>Total de Produtos</h2>
            <p style={estilos.cardValor}>{dados.total_products}</p>
          </div>

          {/* Card: Produtos ativos */}
          <div style={estilos.card}>
            <h2 style={estilos.cardTitulo}>Produtos Ativos</h2>
            <p style={estilos.cardValor}>{dados.active_products}</p>
          </div>

          {/* Card: Vendas realizadas hoje */}
          <div style={estilos.card}>
            <h2 style={estilos.cardTitulo}>Vendas Hoje</h2>
            <p style={estilos.cardValor}>{dados.total_sales_today}</p>
          </div>

          {/* Card: Receita total do dia */}
          <div style={estilos.card}>
            <h2 style={estilos.cardTitulo}>Receita Hoje</h2>
            <p style={estilos.cardValor}>
              R$ {Number(dados.total_revenue_today).toFixed(2)}
            </p>
          </div>
        </div>
      )}

      {/* Links rápidos de ação */}
      <div style={estilos.acoesRapidas}>
        <h3>Ações Rápidas</h3>
        <a href="/produtos/novo" style={estilos.botao}>+ Novo Produto</a>
        <a href="/vendas/nova" style={estilos.botao}>+ Nova Venda</a>
        <a href="/usuarios/novo" style={estilos.botao}>+ Novo Usuário</a>
      </div>
    </div>
  );
}

// Estilos inline da página
const estilos = {
  pagina: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    maxWidth: '900px',
    margin: '0 auto',
  },
  titulo: {
    color: '#333',
    borderBottom: '2px solid #007bff',
    paddingBottom: '10px',
  },
  nav: {
    marginBottom: '30px',
    display: 'flex',
    gap: '15px',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  containerCards: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    marginBottom: '30px',
  },
  card: {
    backgroundColor: '#f0f4ff',
    border: '1px solid #c0d0ff',
    borderRadius: '8px',
    padding: '20px',
    minWidth: '180px',
    flex: '1',
    textAlign: 'center',
  },
  cardTitulo: {
    fontSize: '14px',
    color: '#555',
    margin: '0 0 10px 0',
  },
  cardValor: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#007bff',
    margin: 0,
  },
  acoesRapidas: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  botao: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default Dashboard;
