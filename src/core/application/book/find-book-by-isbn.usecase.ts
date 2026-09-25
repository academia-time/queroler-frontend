import { BookRepository } from '@/core/domain/book/book.repository';
import { FindBookByIsbnResponseDTO } from '@/core/application/book/find-book-by-isbn-response.dto';

export class FindBookByIsbnUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute(isbn: string): Promise<FindBookByIsbnResponseDTO> {
    return await this.bookRepository.buscarPeloIsbn(isbn);
  }
}
