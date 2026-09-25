import { LoginDTO } from '@/core/application/auth/login.dto';
import {
  AuthRepository,
  LoginData,
  LoginResponse,
} from '@/core/domain/auth/auth.repository';

export class LoginUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(data: LoginDTO): Promise<LoginResponse> {
    const payload: LoginData = {
      email: data.email,
      password: data.password,
    };

    return this.authRepository.login(payload);
  }
}
