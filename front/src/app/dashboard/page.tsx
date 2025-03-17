// import { Can } from '../ui/Can';

import { requireAuth } from "@/lib/auth/auth";
import DashboardWelcome from "./components/DashboardWelcome";

export default async function DashboardContent() {
  await requireAuth();

  return (
    <div>
      <DashboardWelcome />
      {/* Seção de Administração - Visível apenas para administradores */}
      {/* <Can I="manage" a="all">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
          <h3 className="text-lg font-semibold mb-3">Painel de Administração</h3>
          <p className="text-gray-600 mb-4">
            Você tem permissões de administrador. Aqui você pode gerenciar todos os aspectos do sistema.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="p-3 bg-purple-100 hover:bg-purple-200 rounded">
              Gerenciar Usuários
            </button>
            <button className="p-3 bg-purple-100 hover:bg-purple-200 rounded">
              Configurações do Sistema
            </button>
            <button className="p-3 bg-purple-100 hover:bg-purple-200 rounded">
              Logs de Atividades
            </button>
            <button className="p-3 bg-purple-100 hover:bg-purple-200 rounded">
              Relatórios
            </button>
          </div>
        </div>
      </Can> */}
      {/* Seção de Conteúdo - Visível para editores e administradores */}
      {/* <Can I="update" a="Post">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold mb-3">Gerenciamento de Conteúdo</h3>
          <p className="text-gray-600 mb-4">
            Você pode criar e editar conteúdo do site.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="p-3 bg-blue-100 hover:bg-blue-200 rounded">
              Criar Nova Postagem
            </button>
            <button className="p-3 bg-blue-100 hover:bg-blue-200 rounded">
              Editar Postagens
            </button>
            <button className="p-3 bg-blue-100 hover:bg-blue-200 rounded">
              Moderar Comentários
            </button>
          </div>
        </div>
      </Can> */}
      {/* Seção para todos os usuários */}
      <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
        <h3 className="text-lg font-semibold mb-3">Área do Usuário</h3>
        <p className="text-gray-600 mb-4">
          Acesse suas informações pessoais e preferências.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="p-3 bg-green-100 hover:bg-green-200 rounded">
            Meu Perfil
          </button>
          <button className="p-3 bg-green-100 hover:bg-green-200 rounded">
            Minhas Preferências
          </button>
        </div>
      </div>
    </div>
  );
}
