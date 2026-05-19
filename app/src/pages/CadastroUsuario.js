// Página de cadastro de novo usuário
import FormUsuario from '../components/FormUsuario';

function CadastroUsuario() {
  return (
    <div style={estilos.pagina}>
      {/* Cabeçalho da página */}
      <h1 style={estilos.titulo}>Cadastrar Novo Usuário</h1>

      {/* Link para voltar à lista */}
      <a href="/usuarios" style={estilos.voltar}>← Voltar para Usuários</a>

      {/* Formulário de cadastro de usuário */}
      <FormUsuario />
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
    borderBottom: '2px solid #6f42c1',
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

export default CadastroUsuario;
