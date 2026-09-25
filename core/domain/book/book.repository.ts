import {
  BookResponseDetailedDTO,
  BookResponseDTO,
} from '@/core/application/book/book-response.dto';
import { FindBooksByAttributeDTO } from '@/core/application/book/find-books-by-attribute.dto';
import {
  LoadBookReadingPageResponseDTO,
  Page,
} from '@/core/application/book/load-book-reading-page-response.dto';
import { SearchBookResponseDTO } from '@/core/application/book/search-book-response.dto';
import { AxiosResponse } from 'axios';

export interface CreateBookData {
  titulo: string;
  isbn: string;
  editora: string;
  anoDePublicacao: string;
  numeroDePaginas: number;
  idioma: string;
  sinopse: string;
  autores: { nome: string }[];
}

export interface BookRepository {
  create(dados: string, imagem?: File): Promise<void>;
  buscarPeloIsbn(isbn: string): Promise<AxiosResponse<BookResponseDTO>>;
  buscarCapaDoLivro(route: string): Promise<AxiosResponse<ArrayBuffer>>;
  buscarTelaDeLeitura(): Promise<AxiosResponse<LoadBookReadingPageResponseDTO>>;
  buscarLivrosPopulares(): Promise<AxiosResponse<Page<BookResponseDTO>>>;
  buscarLivrosPeloAtributo(
    data: FindBooksByAttributeDTO
  ): Promise<AxiosResponse<Page<SearchBookResponseDTO>>>;
  buscarDetalhamentoDoLivro(
    id: number
  ): Promise<AxiosResponse<BookResponseDetailedDTO>>;
}
