import { BookRepository } from '@/core/domain/book/book.repository';
import { AxiosResponse } from 'axios';
import { BookResponseDTO } from '@/core/application/book/book-response.dto';

export class FindBookByIsbnUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute(isbn: string): Promise<AxiosResponse<BookResponseDTO>> {
    return await this.bookRepository.buscarPeloIsbn(isbn);
  }
}
