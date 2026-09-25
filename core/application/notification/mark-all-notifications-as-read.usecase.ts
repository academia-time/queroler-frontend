import { NotificationRepository } from '@/core/domain/notification/notification.repository';

export class MarkAllNotificationsAsReadUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {}

  async execute(): Promise<void> {
    await this.notificationRepository.markAllAsRead();
  }
}
