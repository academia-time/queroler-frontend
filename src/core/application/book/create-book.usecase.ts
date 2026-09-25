import { BookRepository } from '@/core/domain/book/book.repository';

export class CreateBookUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute(dados: string, imagem?: string): Promise<void> {
    await this.bookRepository.create(dados, imagem);
  }
}
