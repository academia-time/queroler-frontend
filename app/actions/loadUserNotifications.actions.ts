'use server';

import api from '@/infra/http/api';
import { ApiNotificationRepository } from '@/infra/repositories/notification/notification.repository';
import { LoadUserNotificationsUseCase } from '@/core/application/notification/load-user-notifications.usecase';

export async function loadUserNotificationsAction() {
  try {
    const repository = new ApiNotificationRepository(api);
    const useCase = new LoadUserNotificationsUseCase(repository);

    const response = await useCase.execute();

    return {
      success: true,
      response: response.data,
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
        'Falha ao carregar notificações do usuário. Tente novamente mais tarde.',
    };
  }
}
