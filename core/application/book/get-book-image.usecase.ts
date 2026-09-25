import { BookRepository } from '@/core/domain/book/book.repository';
import { AxiosResponse } from 'axios';

export class GetBookImageUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute(route: string): Promise<AxiosResponse<ArrayBuffer>> {
    return await this.bookRepository.buscarCapaDoLivro(route);
  }
}
