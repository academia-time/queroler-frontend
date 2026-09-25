'use client';

import { LoadUserNotificationsResponseDTO } from '@/core/application/notification/load-user-notifications-response.dto';

interface NotificationModalProps {
  unreadNotifications: number;
  notifications: LoadUserNotificationsResponseDTO[];
}

export function NotificationModal({
  unreadNotifications,
  notifications,
}: NotificationModalProps) {
  return (
    <div className="absolute right-0 top-[42px] z-50 w-[320px] rounded-lg border border-border bg-card-bg p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">
          Notificações
        </h3>

        <span className="text-xs text-text-secondary">
          {unreadNotifications} não lida
        </span>
      </div>

      <div className="my-3 h-px bg-border" />

      <div
        className={
          notifications.length > 2
            ? 'max-h-[190px] overflow-y-auto scrollbar-hidden'
            : ''
        }
      >
        {notifications.map((notification, index) => (
          <div key={index}>
            <button className="w-full text-left">
              <h4
                className={`text-sm font-medium ${
                  !notification.visualizada
                    ? 'text-text-primary'
                    : 'text-text-secondary'
                }`}
              >
                Titulo - {notification.id}
              </h4>

              <p
                className={`mt-1 text-xs leading-5 ${
                  !notification.visualizada
                    ? 'text-text-primary'
                    : 'text-text-secondary'
                }`}
              >
                {notification.notificacao}
              </p>
            </button>

            {index < notifications.length - 1 && (
              <div className="my-3 h-px bg-border" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
