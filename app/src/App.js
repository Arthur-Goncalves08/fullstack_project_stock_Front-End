// Importação do React Router para gerenciamento de rotas
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importação das páginas do sistema
import Dashboard from './pages/Dashboard';
import ListaProdutos from './pages/ListaProdutos';
import CadastroProduto from './pages/CadastroProduto';
import EditarProduto from './pages/EditarProduto';
import ListaVendas from './pages/ListaVendas';
import CadastroVenda from './pages/CadastroVenda';
import ListaUsuarios from './pages/ListaUsuarios';
import CadastroUsuario from './pages/CadastroUsuario';

// Estilos globais
import './App.css';

function App() {
  return (
    // BrowserRouter envolve toda a aplicação para habilitar o roteamento
    <BrowserRouter>
      <Routes>
        {/* Rota principal - Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Rotas de Produtos */}
        <Route path="/produtos" element={<ListaProdutos />} />
        <Route path="/produtos/novo" element={<CadastroProduto />} />
        <Route path="/produtos/editar/:id" element={<EditarProduto />} />

        {/* Rotas de Vendas */}
        <Route path="/vendas" element={<ListaVendas />} />
        <Route path="/vendas/nova" element={<CadastroVenda />} />

        {/* Rotas de Usuários */}
        <Route path="/usuarios" element={<ListaUsuarios />} />
        <Route path="/usuarios/novo" element={<CadastroUsuario />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
