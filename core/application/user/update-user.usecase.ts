import { UserRepository } from '@/core/domain/user/user.repository';

export class UpdateUserProfileUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(dados: string, imagem?: File) {
    await this.repository.updateProfile(dados, imagem);
  }
}
