import { AxiosInstance, AxiosResponse } from 'axios';
import { NotificationRepository } from '@/core/domain/notification/notification.repository';
import { LoadUserNotificationsResponseDTO } from '@/core/application/notification/load-user-notifications-response.dto';
import { Page } from '@/core/application/book/load-book-reading-page-response.dto';

export class ApiNotificationRepository implements NotificationRepository {
  constructor(private readonly api: AxiosInstance) {}

  async loadNotifications(): Promise<
    AxiosResponse<Page<LoadUserNotificationsResponseDTO>>
  > {
    try {
      return await this.api.get<Page<LoadUserNotificationsResponseDTO>>(
        '/notificacoes'
      );
    } catch (error: unknown) {
      throw (
        (error as { response?: { data?: unknown } }).response?.data || error
      );
    }
  }

  async markAllAsRead(): Promise<void> {
    try {
      await this.api.put('/notificacoes');
    } catch (error: unknown) {
      throw (
        (error as { response?: { data?: unknown } }).response?.data || error
      );
    }
  }
}
