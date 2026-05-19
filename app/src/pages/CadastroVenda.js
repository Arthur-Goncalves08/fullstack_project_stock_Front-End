// Página de registro de nova venda
import FormVenda from '../components/FormVenda';

function CadastroVenda() {
  return (
    <div style={estilos.pagina}>
      {/* Cabeçalho da página */}
      <h1 style={estilos.titulo}>Registrar Nova Venda</h1>

      {/* Link para voltar à lista de vendas */}
      <a href="/vendas" style={estilos.voltar}>← Voltar para Vendas</a>

      {/* Formulário de venda */}
      <FormVenda />
    </div>
  );
}

const estilos = {
  pagina: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  titulo: {
    color: '#333',
    borderBottom: '2px solid #28a745',
    paddingBottom: '10px',
  },
  voltar: {
    color: '#007bff',
    textDecoration: 'none',
    display: 'inline-block',
    marginBottom: '20px',
    fontSize: '14px',
  },
};

export default CadastroVenda;
