'use server';

import api from '@/infra/http/api';
import { ApiNotificationRepository } from '@/infra/repositories/notification/notification.repository';
import { MarkAllNotificationsAsReadUseCase } from '@/core/application/notification/mark-all-notifications-as-read.usecase';

export async function markAllNotificationsAsReadAction() {
  try {
    const repository = new ApiNotificationRepository(api);
    const useCase = new MarkAllNotificationsAsReadUseCase(repository);

    await useCase.execute();

    return {
      success: true,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : typeof error === 'object' && error !== null && 'error' in error
          ? String(error.error)
          : (error as string);

    return {
      success: false,
      message:
        errorMessage ||
        'Falha ao marcar notificações como lidas. Tente novamente mais tarde.',
    };
  }
}
