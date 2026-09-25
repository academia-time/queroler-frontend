'use client';
import {
  ArrowLeft,
  Bell,
  ChevronDown,
  LogOut,
  NotebookPen,
  User,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/presentation/shared/lib/auth-context';
import { usePathname, useRouter } from 'next/navigation';
import { Profile } from '@/core/domain/user/profile.enum';
import { NotificationModal } from '@/presentation/shared/components/modal/NotificationModal';
import { loadUserNotificationsAction } from '@/app/actions/loadUserNotifications.actions';
import { markAllNotificationsAsReadAction } from '@/app/actions/markAllNotificationsAsRead.actions';
import { LoadUserNotificationsResponseDTO } from '@/core/application/notification/load-user-notifications-response.dto';

export interface HeaderProps {
  fotoDePerfil: string;
  nomeUsuario: string;
  email: string;
  profile: Profile;
}

export function Header({
  nomeUsuario,
  email,
  fotoDePerfil,
  profile,
}: HeaderProps) {
  const { logout } = useAuth();
  const [menuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState<
    LoadUserNotificationsResponseDTO[]
  >([]);
  const mostrarBotaoVoltar =
    pathname === '/detalhamento-livro' || pathname === '/diario';

  useEffect(() => {
    async function loadNotifications() {
      const result = await loadUserNotificationsAction();

      if (result.success && result.response) {
        const notifications = result.response.content;

        setNotifications(notifications);

        const unreadCount = notifications.filter(
          (notification) => !notification.visualizada
        ).length;

        setUnreadNotifications(unreadCount);
      }
    }

    loadNotifications();
  }, []);

  async function handleNotificationClick() {
    if (notificationOpen) {
      const result = await markAllNotificationsAsReadAction();

      if (result.success) {
        setUnreadNotifications(0);

        setNotifications((previous) =>
          previous.map((notification) => ({
            ...notification,
            visualizada: true,
          }))
        );
      }
    }

    setNotificationOpen((previous) => !previous);
  }

  return (
    <header className="relative w-full flex items-center justify-between px-4 py-3 lg:px-8 lg:py-4 bg-color-background border-b border-border">
      <div className="flex items-center">
        {mostrarBotaoVoltar && (
          <button
            data-testid="btn-voltar-header"
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-sm text-text-primary hover:text-text-primary cursor-pointer"
          >
            <ArrowLeft size={14} />
            Voltar para a home
          </button>
        )}
      </div>

      <Image
        src="/logo-small.svg"
        alt="Quero Ler"
        width={120}
        height={36}
        priority
        className={`h-auto w-auto absolute top-1/2 -translate-y-1/2 ${
          mostrarBotaoVoltar
            ? 'left-1/2 -translate-x-1/2'
            : 'left-4 lg:left-8 translate-x-0'
        }`}
      />

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="relative">
          <button
            type="button"
            onClick={() => router.push('/diario')}
            className="relative flex items-center justify-center hover:text-brand cursor-pointer"
          >
            <div className="relative">
              <NotebookPen size={20} className="text-color-text-primary" />

              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-card-bg border border-border text-text-primary text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Diário de leitura
              </span>
            </div>
          </button>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={handleNotificationClick}
            className="relative flex items-center justify-center cursor-pointer"
          >
            <div className="relative">
              <Bell data-testid="bell-icon" size={20} />

              {unreadNotifications > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white px-1">
                  {unreadNotifications > 99 ? '99+' : unreadNotifications}
                </span>
              )}
            </div>
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-card-bg border border-border text-text-primary text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Notificação
            </span>
          </button>

          {notificationOpen && (
            <NotificationModal
              unreadNotifications={unreadNotifications}
              notifications={notifications}
            />
          )}
        </div>

        <div className="w-px h-5 bg-border hidden lg:block" />

        <div className="relative">
          <button
            data-testid="user-menu-trigger"
            onClick={() => setIsMenuOpen(!menuOpen)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center">
              {fotoDePerfil !== 'Foto não encontrada.' ? (
                <Image
                  src={fotoDePerfil}
                  alt="User Profile"
                  width={150}
                  height={150}
                  className="rounded-full aspect-square object-cover"
                />
              ) : (
                <User size={16} />
              )}
            </div>
            <span className="text-text-primary text-sm hidden lg:block">
              {nomeUsuario}
            </span>
            <ChevronDown size={16} className="text-text-secondary" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-3 w-max bg-card-bg border border-border rounded-lg shadow-lg z-50">
              <div className="gap-2 px-4 py-3">
                <p className="text-text-primary text-sm font-medium">
                  {Profile[profile] === Profile.LEITOR
                    ? nomeUsuario.split(' ').slice(0, 2).join(' ')
                    : Profile[profile] === Profile.ADMINISTRADOR
                      ? 'Administrador'
                      : 'Moderador'}
                </p>
                <p className="text-text-secondary text-xs pt-1">{email}</p>
              </div>
              <div className="mx-4 h-px bg-text-secondary" />

              <div className="cursor-pointer">
                <button
                  data-testid="profile-button"
                  onClick={() => router.push('/perfil')}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-text-primary hover:text-brand cursor-pointer"
                >
                  <User size={14} />
                  Meu perfil
                </button>
              </div>
              <div className="mx-4 h-px bg-text-secondary" />

              <div className="cursor-pointer">
                <button
                  data-testid="logout-button"
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-text-primary hover:text-brand cursor-pointer"
                >
                  <LogOut size={14} />
                  Sair
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
