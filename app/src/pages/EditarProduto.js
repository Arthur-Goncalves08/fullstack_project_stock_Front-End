// Página de edição de produto existente
// Usa useParams para obter o ID da URL e carrega os dados do produto
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FormProduto from '../components/FormProduto';

function EditarProduto() {
  // Obtém o ID do produto da URL (ex: /produtos/editar/3)
  const { id } = useParams();

  // Estado para armazenar os dados do produto carregado
  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Carrega os dados do produto ao montar o componente
  useEffect(() => {
    async function carregarProduto() {
      try {
        const resposta = await fetch(`http://localhost:5000/products/${id}`);
        if (resposta.ok) {
          const dados = await resposta.json();
          setProduto(dados);
        } else {
          alert('Produto não encontrado.');
          window.location.href = '/produtos';
        }
      } catch (erro) {
        alert('Erro ao carregar produto.');
        console.error(erro);
      } finally {
        setCarregando(false);
      }
    }
    carregarProduto();
  }, [id]);

  return (
    <div style={estilos.pagina}>
      {/* Cabeçalho da página */}
      <h1 style={estilos.titulo}>Editar Produto #{id}</h1>

      {/* Link para voltar à lista */}
      <a href="/produtos" style={estilos.voltar}>← Voltar para Lista</a>

      {/* Exibe mensagem enquanto carrega */}
      {carregando && <p>Carregando dados do produto...</p>}

      {/* Formulário em modo edição com os dados do produto */}
      {!carregando && produto && (
        <FormProduto mode="edit" produto={produto} />
      )}
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
    borderBottom: '2px solid #ffc107',
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

export default EditarProduto;
