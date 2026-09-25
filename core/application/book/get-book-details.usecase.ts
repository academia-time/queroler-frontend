import { BookRepository } from '@/core/domain/book/book.repository';
import { AxiosResponse } from 'axios';
import { BookResponseDetailedDTO } from '@/core/application/book/book-response.dto';

export class GetBookDetailsUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute(id: number): Promise<AxiosResponse<BookResponseDetailedDTO>> {
    return await this.bookRepository.buscarDetalhamentoDoLivro(id);
  }
}
