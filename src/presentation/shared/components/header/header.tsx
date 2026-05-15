'use client';

import { Bell, ChevronDown, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { BookOpen } from 'lucide-react';
import { useAuth } from '@/presentation/shared/lib/auth-context';
<<<<<<< feat/adiciona-animacoes-de-hover
=======
import { useRouter } from 'next/navigation';
>>>>>>> feat/tela-leitura

export function Header() {
  const { logout } = useAuth();
  const [menuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full flex items-center justify-between px-4 py-3 lg:px-8 lg:py-4 bg-color-background border-b border-border">
      {/* Logo na esquerda */}
      <Image
        src="/logo-small.svg"
        alt="Quero Ler"
        width={120}
        height={36}
        priority
        className="h-auto w-auto"
      />

      {/* Ícones e Usuário na direita */}
      <div className="flex items-center gap-3 lg:gap-6">
        {/* Ícone livro desabilitado */}
        <div
          className="relative group cursor-pointer"
          onClick={() => router.push('/')}
        >
          <BookOpen size={20} className="text-color-text-primary" />
          <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-card-bg border border-border text-text-primary text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Leitura
          </span>
        </div>

        {/* Sino desabilitado */}
        <div className="relative group">
          <Bell
            data-testid="bell-icon"
            size={20}
            className="text-text-secondary opacity-40"
          />
          <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-card-bg border border-border text-text-primary text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Notificação
          </span>
        </div>

        <div className="w-px h-5 bg-border hidden lg:block" />

        <div className="relative">
          <button
            data-testid="user-menu-trigger"
            onClick={() => setIsMenuOpen(!menuOpen)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <span className="text-text-primary text-sm hidden lg:block">
              Nome do usuário
            </span>
            <ChevronDown size={16} className="text-text-secondary" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-card-bg border border-border rounded-lg shadow-lg z-50">
              <button
                data-testid="logout-button"
                onClick={logout}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-text-primary hover:bg-border rounded-lg cursor-pointer"
              >
                <LogOut size={14} />
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
