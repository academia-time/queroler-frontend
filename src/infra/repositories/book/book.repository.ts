import { FindBookByIsbnResponseDTO } from '@/core/application/book/find-book-by-isbn-response.dto';
import { LoadBookReadingPageResponseDTO } from '@/core/application/book/load-book-reading-page-response.dto';
import { BookRepository } from '@/core/domain/book/book.repository';
import { AxiosInstance } from 'axios';

export class ApiBookRepository implements BookRepository {
  constructor(private readonly api: AxiosInstance) {}

  async create(dados: string, imagem?: string): Promise<void> {
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

  async buscarPeloIsbn(isbn: string): Promise<FindBookByIsbnResponseDTO> {
    try {
      return await this.api.get(`/livros/buscar/${isbn}`);
    } catch (error: unknown) {
      throw (
        (error as { response?: { data?: unknown } }).response?.data || error
      );
    }
  }

  async buscarTelaDeLeitura(
    idUsuario: number
  ): Promise<LoadBookReadingPageResponseDTO> {
    try {
      const response = await this.api.get(
        `/livros/tela_de_leitura/usuario/${idUsuario}`
      );

      return response.data;
    } catch (error: unknown) {
      throw (
        (error as { response?: { data?: unknown } }).response?.data || error
      );
    }
  }
}
