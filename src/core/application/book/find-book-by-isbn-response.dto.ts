import { IdiomaEnum } from '@/core/domain/book/language.enum';

export interface FindBookByIsbnResponseDTO {
  id: number;
  titulo: string;
  isbn: string;
  editora: string;
  anoDePublicacao: string;
  numeroDePaginas: number;
  idioma: IdiomaEnum;
  sinopse: string;
  capaUrl: string;
  dataDeCadstro: string;
  autores: AutorResponse[];
}

export interface AutorResponse {
  id: number;
  nome: string;
}
