import { AxiosResponse } from 'axios';
import { LoadUserNotificationsResponseDTO } from '@/core/application/notification/load-user-notifications-response.dto';
import { Page } from '@/core/application/book/load-book-reading-page-response.dto';

export interface NotificationRepository {
  loadNotifications(): Promise<
    AxiosResponse<Page<LoadUserNotificationsResponseDTO>>
  >;

  markAllAsRead(): Promise<void>;
}
