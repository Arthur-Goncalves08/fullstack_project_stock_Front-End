// Página de listagem de produtos
import ListaProdutos from '../components/ListaProdutos';

function ListaProdutosPage() {
  return (
    <div style={estilos.pagina}>
      {/* Cabeçalho da página com título e botão de novo produto */}
      <div style={estilos.topo}>
        <h1 style={estilos.titulo}>Produtos</h1>
        <a href="/produtos/novo" style={estilos.botaoNovo}>+ Novo Produto</a>
      </div>

      {/* Link para voltar ao dashboard */}
      <a href="/" style={estilos.voltar}>← Dashboard</a>

      {/* Componente com a tabela de produtos */}
      <ListaProdutos />
    </div>
  );
}

const estilos = {
  pagina: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  topo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2px solid #007bff',
    paddingBottom: '10px',
    marginBottom: '10px',
  },
  titulo: {
    color: '#333',
    margin: 0,
  },
  botaoNovo: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  voltar: {
    color: '#007bff',
    textDecoration: 'none',
    display: 'inline-block',
    marginBottom: '20px',
    fontSize: '14px',
  },
};

export default ListaProdutosPage;
