import { BookRepository } from '@/core/domain/book/book.repository';
import { AxiosResponse } from 'axios';
import { BookResponseDTO } from '@/core/application/book/book-response.dto';
import { Page } from '@/core/application/book/load-book-reading-page-response.dto';

export class LoadPopularBooksUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute(): Promise<AxiosResponse<Page<BookResponseDTO>>> {
    return await this.bookRepository.buscarLivrosPopulares();
  }
}
