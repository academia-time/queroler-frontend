'use server';

import { loginSchema, LoginDTO } from '@/core/application/auth/login.dto';
import { LoginUseCase } from '@/core/application/auth/login.usecase';
import api from '@/infra/http/api';
import { ApiAuthRepository } from '@/infra/repositories/auth/login.repository';
import { cookies } from 'next/headers';
import z from 'zod';

export async function extractJwtCookieValue(
  setCookies: string[]
): Promise<string | undefined> {
  const jwtCookie = setCookies.find((cookie) => cookie.startsWith('jwt='));
  if (!jwtCookie) return undefined;

  const firstPart = jwtCookie.split(';')[0];
  return firstPart.slice('jwt='.length);
}

export async function loginAction(data: LoginDTO) {
  const validated = loginSchema.safeParse(data);

  if (!validated.success) {
    const { fieldErrors } = z.flattenError(validated.error);
    return {
      success: false,
      message: 'Dados inválidos. Verifique o formulário e tente novamente.',
      errors: fieldErrors,
    };
  }

  try {
    const repository = new ApiAuthRepository(api);
    const useCase = new LoginUseCase(repository);
    const result = await useCase.execute(validated.data);

    const jwt = await extractJwtCookieValue(result.setCookie ?? []);
    if (jwt) {
      const cookieStore = await cookies();
      if (result.primeiroLogin) {
        cookieStore.set('primeiroLoginPendente', 'true', {
          maxAge: 60 * 5,
          secure: process.env.NODE_ENV === 'production',
          path: '/',
          sameSite: 'strict',
        });
      }
      cookieStore.set('jwt', jwt, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      });
    }

    return {
      success: true,
      message: 'Login realizado com sucesso.',
      data: result,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      message:
        errorMessage || 'Falha ao realizar login. Tente novamente mais tarde.',
    };
  }
}
