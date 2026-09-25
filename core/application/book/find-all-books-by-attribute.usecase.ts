import { BookRepository } from '@/core/domain/book/book.repository';
import { AxiosResponse } from 'axios';
import { Page } from '@/core/application/book/load-book-reading-page-response.dto';
import { FindBooksByAttributeDTO } from '@/core/application/book/find-books-by-attribute.dto';
import { SearchBookResponseDTO } from '@/core/application/book/search-book-response.dto';

export class FindAllBooksByAttributeUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute(
    data: FindBooksByAttributeDTO
  ): Promise<AxiosResponse<Page<SearchBookResponseDTO>>> {
    return await this.bookRepository.buscarLivrosPeloAtributo(data);
  }
}
