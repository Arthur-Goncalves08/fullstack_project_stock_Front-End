// Componente de formulário para cadastro de novo usuário
import { useState } from 'react';

function FormUsuario() {
  // Estados para controlar os campos do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('vendedor');

  // Função de envio do formulário - cadastra o usuário na API
  async function handleSubmit() {
    // Validação dos campos obrigatórios
    if (!name || !email || !password || !role) {
      alert('Por favor, preencha todos os campos: nome, e-mail, senha e perfil.');
      return;
    }

    // Validação básica de formato de e-mail
    if (!email.includes('@')) {
      alert('Por favor, informe um e-mail válido.');
      return;
    }

    // Validação de tamanho mínimo de senha
    if (password.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    // Monta o objeto com os dados do usuário
    const dados = {
      name,
      email,
      password,
      role,
    };

    try {
      // Chamada à API para cadastrar o usuário
      const api = await fetch('http://localhost:5000/users', {
        method: 'POST',
        body: JSON.stringify(dados),
        headers: { 'Content-Type': 'application/json' },
      });

      if (api.ok) {
        alert('Usuário cadastrado com sucesso!');
        // Redireciona para a lista de usuários após salvar
        window.location.href = '/usuarios';
      } else {
        const erro = await api.json();
        alert('Erro: ' + (erro.message || 'Não foi possível cadastrar o usuário.'));
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
          placeholder="Nome completo"
          style={estilos.input}
        />
      </div>

      {/* Campo E-mail */}
      <div style={estilos.grupo}>
        <label style={estilos.label}>E-mail *</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="usuario@exemplo.com"
          style={estilos.input}
        />
      </div>

      {/* Campo Senha */}
      <div style={estilos.grupo}>
        <label style={estilos.label}>Senha *</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mínimo 6 caracteres"
          style={estilos.input}
        />
      </div>

      {/* Select de perfil (role) */}
      <div style={estilos.grupo}>
        <label style={estilos.label}>Perfil *</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={estilos.input}
        >
          <option value="vendedor">Vendedor</option>
          <option value="admin">Administrador</option>
        </select>
      </div>

      {/* Botões de ação */}
      <div style={estilos.botoes}>
        <button onClick={handleSubmit} style={estilos.botaoSalvar}>
          Cadastrar Usuário
        </button>
        <button
          onClick={() => { window.location.href = '/usuarios'; }}
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

export default FormUsuario;
