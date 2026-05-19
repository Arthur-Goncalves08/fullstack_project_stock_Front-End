// Componente de formulário reutilizável para criar e editar produtos
// Recebe props: mode ("create" | "edit"), produto (objeto com dados para edição)
import { useState, useEffect } from 'react';

function FormProduto({ mode, produto }) {
  // Estados para controlar os campos do formulário
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [category, setCategory] = useState('');

  // Preenche os campos com os dados do produto quando em modo edição
  useEffect(() => {
    if (mode === 'edit' && produto) {
      setName(produto.name || '');
      setDescription(produto.description || '');
      setPrice(produto.price || '');
      setStockQuantity(produto.stock_quantity || '');
      setCategory(produto.category || '');
    }
  }, [mode, produto]);

  // Função de envio do formulário - cria ou atualiza produto conforme o mode
  async function handleSubmit() {
    // Validação dos campos obrigatórios
    if (!name || !price || !stockQuantity || !category) {
      alert('Por favor, preencha todos os campos obrigatórios: nome, preço, quantidade e categoria.');
      return;
    }

    // Monta o objeto com os dados do produto
    const dados = {
      name,
      description,
      price: parseFloat(price),
      stock_quantity: parseInt(stockQuantity),
      category,
    };

    try {
      let url = 'http://localhost:5000/products';
      let metodo = 'POST';

      // Se for edição, altera a URL e o método HTTP
      if (mode === 'edit' && produto) {
        url = `http://localhost:5000/products/${produto.id}`;
        metodo = 'PUT';
      }

      // Chamada à API para salvar o produto
      const api = await fetch(url, {
        method: metodo,
        body: JSON.stringify(dados),
        headers: { 'Content-Type': 'application/json' },
      });

      if (api.ok) {
        alert(mode === 'create' ? 'Produto cadastrado com sucesso!' : 'Produto atualizado com sucesso!');
        // Redireciona para a lista de produtos após salvar
        window.location.href = '/produtos';
      } else {
        const erro = await api.json();
        alert('Erro: ' + (erro.message || 'Não foi possível salvar o produto.'));
      }
    } catch (erro) {
      alert('Erro de conexão com o servidor.');
      console.error(erro);
    }
  }

  return (
    <div style={estilos.formulario}>
      {/* Campo Nome */}
      <div style={estilos.grupo}>
        <label style={estilos.label}>Nome *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome do produto"
          style={estilos.input}
        />
      </div>

      {/* Campo Descrição */}
      <div style={estilos.grupo}>
        <label style={estilos.label}>Descrição</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição do produto"
          style={{ ...estilos.input, height: '80px', resize: 'vertical' }}
        />
      </div>

      {/* Campo Preço */}
      <div style={estilos.grupo}>
        <label style={estilos.label}>Preço *</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="0.00"
          min="0"
          step="0.01"
          style={estilos.input}
        />
      </div>

      {/* Campo Quantidade em Estoque */}
      <div style={estilos.grupo}>
        <label style={estilos.label}>Quantidade em Estoque *</label>
        <input
          type="number"
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
          placeholder="0"
          min="0"
          style={estilos.input}
        />
      </div>

      {/* Campo Categoria */}
      <div style={estilos.grupo}>
        <label style={estilos.label}>Categoria *</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Categoria do produto"
          style={estilos.input}
        />
      </div>

      {/* Botões de ação */}
      <div style={estilos.botoes}>
        <button onClick={handleSubmit} style={estilos.botaoSalvar}>
          {mode === 'create' ? 'Cadastrar Produto' : 'Salvar Alterações'}
        </button>
        <button
          onClick={() => { window.location.href = '/produtos'; }}
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

export default FormProduto;
