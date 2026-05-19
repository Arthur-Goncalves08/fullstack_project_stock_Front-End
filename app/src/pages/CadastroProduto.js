// Página de cadastro de novo produto
import FormProduto from '../components/FormProduto';

function CadastroProduto() {
  return (
    <div style={estilos.pagina}>
      {/* Cabeçalho da página */}
      <h1 style={estilos.titulo}>Cadastrar Novo Produto</h1>

      {/* Link para voltar à lista */}
      <a href="/produtos" style={estilos.voltar}>← Voltar para Lista</a>

      {/* Formulário em modo criação */}
      <FormProduto mode="create" />
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

export default CadastroProduto;
