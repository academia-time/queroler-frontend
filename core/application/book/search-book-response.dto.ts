import { AutorResponse } from '@/core/application/book/book-response.dto';

export interface SearchBookResponseDTO {
  id: number;
  titulo: string;
  editora: string;
  anoDePublicacao: string;
  numeroDePaginas: number;
  urlCapaDoLivro: string;
  dataDeCadastro: string;
  autores: AutorResponse[];
}
