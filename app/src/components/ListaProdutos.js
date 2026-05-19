// Componente de listagem de produtos com tabela e ações
import { useState, useEffect } from 'react';

function ListaProdutos() {
  // Estado para armazenar a lista de produtos
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Carrega os produtos ao montar o componente
  useEffect(() => {
    carregarProdutos();
  }, []);

  // Função para buscar produtos na API
  async function carregarProdutos() {
    try {
      const resposta = await fetch('http://localhost:5000/products');
      const dados = await resposta.json();
      setProdutos(dados);
    } catch (erro) {
      console.error('Erro ao carregar produtos:', erro);
    } finally {
      setCarregando(false);
    }
  }

  // Função para desativar/excluir produto via DELETE
  async function desativarProduto(id) {
    const confirmado = window.confirm('Tem certeza que deseja desativar este produto?');
    if (!confirmado) return;

    try {
      const api = await fetch(`http://localhost:5000/products/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (api.ok) {
        alert('Produto desativado com sucesso!');
        // Recarrega a lista após desativar
        carregarProdutos();
      } else {
        alert('Erro ao desativar produto.');
      }
    } catch (erro) {
      alert('Erro de conexão com o servidor.');
      console.error(erro);
    }
  }

  if (carregando) return <p>Carregando produtos...</p>;

  return (
    <div>
      {/* Mensagem quando não há produtos */}
      {produtos.length === 0 && (
        <p style={estilos.semDados}>Nenhum produto cadastrado.</p>
      )}

      {/* Tabela de produtos */}
      {produtos.length > 0 && (
        <table style={estilos.tabela}>
          <thead>
            <tr style={estilos.cabecalho}>
              <th style={estilos.th}>ID</th>
              <th style={estilos.th}>Nome</th>
              <th style={estilos.th}>Categoria</th>
              <th style={estilos.th}>Preço</th>
              <th style={estilos.th}>Estoque</th>
              <th style={estilos.th}>Status</th>
              <th style={estilos.th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {/* Renderiza uma linha para cada produto */}
            {produtos.map((produto) => (
              <tr key={produto.id} style={estilos.linha}>
                <td style={estilos.td}>{produto.id}</td>
                <td style={estilos.td}>{produto.name}</td>
                <td style={estilos.td}>{produto.category}</td>
                <td style={estilos.td}>R$ {Number(produto.price).toFixed(2)}</td>
                <td style={estilos.td}>{produto.stock_quantity}</td>
                <td style={estilos.td}>
                  {/* Exibe o status do produto com cor diferente */}
                  <span style={produto.active ? estilos.ativo : estilos.inativo}>
                    {produto.active ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td style={estilos.td}>
                  {/* Botão Editar - redireciona para a página de edição */}
                  <button
                    onClick={() => { window.location.href = '/produtos/editar/' + produto.id; }}
                    style={estilos.botaoEditar}
                  >
                    Editar
                  </button>

                  {/* Botão Desativar - chama DELETE na API */}
                  <button
                    onClick={() => desativarProduto(produto.id)}
                    style={estilos.botaoDesativar}
                  >
                    Desativar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// Estilos inline da tabela
const estilos = {
  tabela: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
  },
  cabecalho: {
    backgroundColor: '#007bff',
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
  botaoEditar: {
    backgroundColor: '#ffc107',
    color: '#333',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '3px',
    cursor: 'pointer',
    marginRight: '5px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  botaoDesativar: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '3px',
    cursor: 'pointer',
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

export default ListaProdutos;
