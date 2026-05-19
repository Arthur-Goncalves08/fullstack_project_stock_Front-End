// Página de listagem de usuários do sistema
import { useState, useEffect } from 'react';

function ListaUsuarios() {
  // Estado para armazenar a lista de usuários
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Carrega os usuários ao montar o componente
  useEffect(() => {
    async function carregarUsuarios() {
      try {
        const resposta = await fetch('http://localhost:5000/users');
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch (erro) {
        console.error('Erro ao carregar usuários:', erro);
      } finally {
        setCarregando(false);
      }
    }
    carregarUsuarios();
  }, []);

  return (
    <div style={estilos.pagina}>
      {/* Cabeçalho com título e botão de novo usuário */}
      <div style={estilos.topo}>
        <h1 style={estilos.titulo}>Usuários</h1>
        <a href="/usuarios/novo" style={estilos.botaoNovo}>+ Novo Usuário</a>
      </div>

      {/* Link para voltar ao dashboard */}
      <a href="/" style={estilos.voltar}>← Dashboard</a>

      {/* Exibe mensagem enquanto carrega */}
      {carregando && <p>Carregando usuários...</p>}

      {/* Mensagem quando não há usuários */}
      {!carregando && usuarios.length === 0 && (
        <p style={estilos.semDados}>Nenhum usuário cadastrado.</p>
      )}

      {/* Tabela de usuários */}
      {!carregando && usuarios.length > 0 && (
        <table style={estilos.tabela}>
          <thead>
            <tr style={estilos.cabecalho}>
              <th style={estilos.th}>ID</th>
              <th style={estilos.th}>Nome</th>
              <th style={estilos.th}>E-mail</th>
              <th style={estilos.th}>Perfil</th>
              <th style={estilos.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Renderiza uma linha para cada usuário */}
            {usuarios.map((usuario) => (
              <tr key={usuario.id} style={estilos.linha}>
                <td style={estilos.td}>{usuario.id}</td>
                <td style={estilos.td}>{usuario.name}</td>
                <td style={estilos.td}>{usuario.email}</td>
                <td style={estilos.td}>
                  {/* Exibe o perfil com destaque para admin */}
                  <span style={usuario.role === 'admin' ? estilos.admin : estilos.vendedor}>
                    {usuario.role === 'admin' ? 'Administrador' : 'Vendedor'}
                  </span>
                </td>
                <td style={estilos.td}>
                  <span style={usuario.active !== false ? estilos.ativo : estilos.inativo}>
                    {usuario.active !== false ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
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
  topo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2px solid #6f42c1',
    paddingBottom: '10px',
    marginBottom: '10px',
  },
  titulo: {
    color: '#333',
    margin: 0,
  },
  botaoNovo: {
    backgroundColor: '#6f42c1',
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
  tabela: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
  },
  cabecalho: {
    backgroundColor: '#6f42c1',
    color: 'white',
  },
  th: {
    padding: '10px 12px',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  td: {
    padding: '8px 12px',
    borderBottom: '1px solid #eee',
  },
  linha: {
    backgroundColor: 'white',
  },
  admin: {
    backgroundColor: '#e2d9f3',
    color: '#4a235a',
    padding: '3px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  vendedor: {
    backgroundColor: '#d1ecf1',
    color: '#0c5460',
    padding: '3px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  ativo: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '3px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  inativo: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '3px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  semDados: {
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: '20px',
  },
};

export default ListaUsuarios;
