// Página de listagem de vendas
import ListaVendas from '../components/ListaVendas';

function ListaVendasPage() {
  return (
    <div style={estilos.pagina}>
      {/* Cabeçalho da página com título e botão de nova venda */}
      <div style={estilos.topo}>
        <h1 style={estilos.titulo}>Vendas</h1>
        <a href="/vendas/nova" style={estilos.botaoNovo}>+ Nova Venda</a>
      </div>

      {/* Link para voltar ao dashboard */}
      <a href="/" style={estilos.voltar}>← Dashboard</a>

      {/* Componente com a tabela de vendas */}
      <ListaVendas />
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
    borderBottom: '2px solid #28a745',
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

export default ListaVendasPage;
