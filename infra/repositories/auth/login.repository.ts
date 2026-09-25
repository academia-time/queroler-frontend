import {
  AuthRepository,
  LoginData,
  LoginResponse,
} from '@/core/domain/auth/auth.repository';
import { AxiosInstance } from 'axios';

export class ApiAuthRepository implements AuthRepository {
  constructor(private readonly api: AxiosInstance) {}

  async login(data: LoginData): Promise<LoginResponse> {
    try {
      const payload = {
        user: data.email,
        senha: data.password,
      };
      const response = await this.api.post('/logins', payload);

      const setCookieHeader = response.headers?.['set-cookie'];
      const setCookie = Array.isArray(setCookieHeader)
        ? setCookieHeader
        : setCookieHeader
          ? [setCookieHeader]
          : [];

      let responseData: Record<string, unknown> = {};

      if (typeof response.data === 'boolean') {
        responseData = { primeiroLogin: response.data };
      } else if (response.data && typeof response.data === 'object') {
        responseData = response.data as Record<string, unknown>;
      }

      if (
        responseData.message &&
        !responseData.accessToken &&
        !setCookie.some((cookie) => cookie.startsWith('jwt='))
      ) {
        throw new Error(String(responseData.message));
      }

      return {
        ...(responseData as unknown as LoginResponse),
        setCookie,
      };
    } catch (error: unknown) {
      throw (
        (error as { response?: { data?: unknown } }).response?.data || error
      );
    }
  }
}
