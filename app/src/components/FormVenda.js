// Componente de formulário para registrar uma nova venda
import { useState, useEffect } from 'react';

function FormVenda() {
  // Estados para controlar os campos do formulário
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [sellerName, setSellerName] = useState('');

  // Estado para armazenar a lista de produtos disponíveis no select
  const [produtos, setProdutos] = useState([]);

  // Carrega a lista de produtos ao montar o componente (para preencher o select)
  useEffect(() => {
    async function carregarProdutos() {
      try {
        const resposta = await fetch('http://localhost:5000/products');
        const dados = await resposta.json();
        // Filtra apenas produtos ativos para exibir no select
        const ativos = dados.filter((p) => p.active !== false);
        setProdutos(ativos);
      } catch (erro) {
        console.error('Erro ao carregar produtos:', erro);
      }
    }
    carregarProdutos();
  }, []);

  // Função de envio do formulário - registra a venda na API
  async function handleSubmit() {
    // Validação dos campos obrigatórios
    if (!productId || !quantity || !sellerName) {
      alert('Por favor, preencha todos os campos: produto, quantidade e vendedor.');
      return;
    }

    if (parseInt(quantity) <= 0) {
      alert('A quantidade deve ser maior que zero.');
      return;
    }

    // Monta o objeto da venda
    const dados = {
      product_id: parseInt(productId),
      quantity: parseInt(quantity),
      seller_name: sellerName,
    };

    try {
      // Chamada à API para registrar a venda
      const api = await fetch('http://localhost:5000/sales', {
        method: 'POST',
        body: JSON.stringify(dados),
        headers: { 'Content-Type': 'application/json' },
      });

      if (api.ok) {
        alert('Venda registrada com sucesso!');
        // Redireciona para a lista de vendas após salvar
        window.location.href = '/vendas';
      } else {
        const erro = await api.json();
        alert('Erro: ' + (erro.message || 'Não foi possível registrar a venda.'));
      }
    } catch (erro) {
      alert('Erro de conexão com o servidor.');
      console.error(erro);
    }
  }

  return (
    <div style={estilos.formulario}>
      {/* Select de produtos */}
      <div style={estilos.grupo}>
        <label style={estilos.label}>Produto *</label>
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          style={estilos.input}
        >
          <option value="">-- Selecione um produto --</option>
          {/* Renderiza cada produto como uma opção */}
          {produtos.map((produto) => (
            <option key={produto.id} value={produto.id}>
              {produto.name} - R$ {Number(produto.price).toFixed(2)} (Estoque: {produto.stock_quantity})
            </option>
          ))}
        </select>
      </div>

      {/* Campo Quantidade */}
      <div style={estilos.grupo}>
        <label style={estilos.label}>Quantidade *</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="1"
          min="1"
          style={estilos.input}
        />
      </div>

      {/* Campo Nome do Vendedor */}
      <div style={estilos.grupo}>
        <label style={estilos.label}>Nome do Vendedor *</label>
        <input
          type="text"
          value={sellerName}
          onChange={(e) => setSellerName(e.target.value)}
          placeholder="Nome do vendedor"
          style={estilos.input}
        />
      </div>

      {/* Botões de ação */}
      <div style={estilos.botoes}>
        <button onClick={handleSubmit} style={estilos.botaoSalvar}>
          Registrar Venda
        </button>
        <button
          onClick={() => { window.location.href = '/vendas'; }}
          style={estilos.botaoCancelar}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

// Estilos inline do formulário
const estilos = {
  formulario: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    maxWidth: '500px',
  },
  grupo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: '14px',
  },
  input: {
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
    width: '100%',
    boxSizing: 'border-box',
  },
  botoes: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  },
  botaoSalvar: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  botaoCancelar: {
    backgroundColor: '#6c757d',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default FormVenda;
