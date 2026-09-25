import { UserEntity } from '@/core/domain/user/user.entity';
import { LoadUserProfileResponseDTO } from '@/core/application/user/load-user-profile-page-response.dto';
import {
  ChangePasswordData,
  UserRepository,
} from '@/core/domain/user/user.repository';
import { AxiosInstance, AxiosResponse } from 'axios';

export class ApiUserRepository implements UserRepository {
  constructor(private readonly api: AxiosInstance) {}

  async create(
    data: string
  ): Promise<{ user: UserEntity; setCookie: string[] }> {
    try {
      const formData = new FormData();
      formData.append('dados', data);
      const response = await this.api.post('/usuarios', formData);

      const setCookieHeader = response.headers?.['set-cookie'];
      const setCookie = Array.isArray(setCookieHeader)
        ? setCookieHeader
        : setCookieHeader
          ? [setCookieHeader]
          : [];

      if (
        !response.data.accessToken &&
        !setCookie.some((cookie) => cookie.startsWith('jwt='))
      ) {
        throw new Error(String(response.data.message));
      }

      return {
        user: response.data,
        setCookie,
      };
    } catch (error: unknown) {
      throw (
        (error as { response?: { data?: unknown } }).response?.data || error
      );
    }
  }

  async carregarTelaDePerfilLeitura(): Promise<
    AxiosResponse<LoadUserProfileResponseDTO>
  > {
    try {
      return await this.api.get<LoadUserProfileResponseDTO>('/usuarios');
    } catch (error: unknown) {
      throw (
        (error as { response?: { data?: unknown } }).response?.data || error
      );
    }
  }

  async delete(): Promise<void> {
    try {
      await this.api.delete('/usuarios');
    } catch (error: unknown) {
      throw (
        (error as { response?: { data?: unknown } }).response?.data || error
      );
    }
  }

  async updateProfile(dados: string, imagem?: File): Promise<void> {
    try {
      const formData = new FormData();

      if (imagem) {
        formData.append('imagem', imagem);
      }

      formData.append('dados', dados);

      await this.api.put('/usuarios', formData);
    } catch (error: unknown) {
      throw (
        (error as { response?: { data?: unknown } }).response?.data || error
      );
    }
  }

  async changePassword(data: ChangePasswordData): Promise<void> {
    try {
      await this.api.put('/usuarios/alterar-senha', data);
    } catch (error: unknown) {
      throw (
        (error as { response?: { data?: unknown } }).response?.data || error
      );
    }
  }
}
