import { NotificationRepository } from '@/core/domain/notification/notification.repository';
import { AxiosResponse } from 'axios';
import { LoadUserNotificationsResponseDTO } from '@/core/application/notification/load-user-notifications-response.dto';
import { Page } from '@/core/application/book/load-book-reading-page-response.dto';

export class LoadUserNotificationsUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {}

  async execute(): Promise<
    AxiosResponse<Page<LoadUserNotificationsResponseDTO>>
  > {
    return await this.notificationRepository.loadNotifications();
  }
}
