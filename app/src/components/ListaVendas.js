// Componente de listagem de vendas com tabela
import { useState, useEffect } from 'react';

function ListaVendas() {
  // Estado para armazenar a lista de vendas
  const [vendas, setVendas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Carrega as vendas ao montar o componente
  useEffect(() => {
    async function carregarVendas() {
      try {
        const resposta = await fetch('http://localhost:5000/sales');
        const dados = await resposta.json();
        setVendas(dados);
      } catch (erro) {
        console.error('Erro ao carregar vendas:', erro);
      } finally {
        setCarregando(false);
      }
    }
    carregarVendas();
  }, []);

  if (carregando) return <p>Carregando vendas...</p>;

  return (
    <div>
      {/* Mensagem quando não há vendas */}
      {vendas.length === 0 && (
        <p style={estilos.semDados}>Nenhuma venda registrada.</p>
      )}

      {/* Tabela de vendas */}
      {vendas.length > 0 && (
        <table style={estilos.tabela}>
          <thead>
            <tr style={estilos.cabecalho}>
              <th style={estilos.th}>ID</th>
              <th style={estilos.th}>Produto</th>
              <th style={estilos.th}>Quantidade</th>
              <th style={estilos.th}>Vendedor</th>
              <th style={estilos.th}>Total</th>
              <th style={estilos.th}>Data</th>
            </tr>
          </thead>
          <tbody>
            {/* Renderiza uma linha para cada venda */}
            {vendas.map((venda) => (
              <tr key={venda.id} style={estilos.linha}>
                <td style={estilos.td}>{venda.id}</td>
                <td style={estilos.td}>{venda.product_name || venda.product_id}</td>
                <td style={estilos.td}>{venda.quantity}</td>
                <td style={estilos.td}>{venda.seller_name}</td>
                <td style={estilos.td}>R$ {Number(venda.total).toFixed(2)}</td>
                <td style={estilos.td}>
                  {/* Formata a data para o padrão brasileiro */}
                  {venda.created_at
                    ? new Date(venda.created_at).toLocaleDateString('pt-BR')
                    : '-'}
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
    backgroundColor: '#28a745',
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
  semDados: {
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: '20px',
  },
};

export default ListaVendas;
