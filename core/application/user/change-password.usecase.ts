import {
  ChangePasswordData,
  UserRepository,
} from '@/core/domain/user/user.repository';
import { ChangePasswordDTO } from '@/core/application/user/change-password.dto';

export class ChangePasswordUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: ChangePasswordDTO): Promise<void> {
    const payload: ChangePasswordData = {
      senhaAtual: data.senhaAtual,
      senhaNova: data.senhaNova,
    };

    await this.userRepository.changePassword(payload);
  }
}
