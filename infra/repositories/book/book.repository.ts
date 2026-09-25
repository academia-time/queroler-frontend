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
import { BookRepository } from '@/core/domain/book/book.repository';
import { AxiosInstance, AxiosResponse } from 'axios';

export class ApiBookRepository implements BookRepository {
  constructor(private readonly api: AxiosInstance) {}

  async create(dados: string, imagem?: File): Promise<void> {
    try {
      const formData = new FormData();
      if (imagem) formData.append('imagem', imagem);
      formData.append('dados', dados);
      await this.api.post('/livros', formData);
    } catch (error: unknown) {
      throw (
        (error as { response?: { data?: unknown } }).response?.data || error
      );
    }
  }

  async buscarPeloIsbn(isbn: string): Promise<AxiosResponse<BookResponseDTO>> {
    try {
      return await this.api.get(`/livros/buscar/${isbn}`);
    } catch (error: unknown) {
      throw (
        (error as { response?: { data?: unknown } }).response?.data || error
      );
    }
  }

  async buscarCapaDoLivro(route: string): Promise<AxiosResponse<ArrayBuffer>> {
    try {
      return await this.api.get(`${route}`, { responseType: 'arraybuffer' });
    } catch (error: unknown) {
      throw (
        (error as { response?: { data?: unknown } }).response?.data || error
      );
    }
  }

  async buscarTelaDeLeitura(): Promise<
    AxiosResponse<LoadBookReadingPageResponseDTO>
  > {
    try {
      return await this.api.get<LoadBookReadingPageResponseDTO>(
        '/livros/tela_de_leitura'
      );
    } catch (error: unknown) {
      throw (
        (error as { response?: { data?: unknown } }).response?.data || error
      );
    }
  }

  async buscarLivrosPopulares(): Promise<AxiosResponse<Page<BookResponseDTO>>> {
    try {
      return await this.api.get('/livros/populares');
    } catch (error: unknown) {
      throw (
        (error as { response?: { data?: unknown } }).response?.data || error
      );
    }
  }

  async buscarLivrosPeloAtributo(
    data: FindBooksByAttributeDTO
  ): Promise<AxiosResponse<Page<SearchBookResponseDTO>>> {
    try {
      return await this.api.get('/livros', {
        params: {
          [data.filtro]: data.termo,
          page: data.page,
          size: data.size,
          sort: 'dataDeCadastro,desc',
        },
      });
    } catch (error: unknown) {
      throw (
        (error as { response?: { data?: unknown } }).response?.data || error
      );
    }
  }

  async buscarDetalhamentoDoLivro(
    id: number
  ): Promise<AxiosResponse<BookResponseDetailedDTO>> {
    try {
      return await this.api.get(`/livros/${id}`);
    } catch (error: unknown) {
      throw (
        (error as { response?: { data?: unknown } }).response?.data || error
      );
    }
  }
}
