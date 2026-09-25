import { IdiomaEnum } from '@/core/domain/book/language.enum';

export interface BookResponseDTO {
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

export interface BookResponseDetailedDTO {
  titulo: string;
  isbn: string;
  editora: string;
  anoDePublicacao: string;
  numeroDePaginas: number;
  idioma: IdiomaEnum;
  sinopse: string;
  urlCapaDoLivro: string;
  dataDeCadastro: string;
  autores: AutorResponse[];
  mediaAvaliacao: number;
  totalAvaliacoes: number;
  quantidadeQueremLer: number;
  quantidadeEstaoLendo: number;
  quantidadeJaLeRAM: number;
  quantidadeAbandonaram: number;
  resenhas: ResenhaPublicaResponse[];
}

export interface ResenhaPublicaResponse {
  nomeDoAutora: string;
  tituloDaResenhaa: string;
  resenhaa: string;
  spoiler: boolean;
  nota: number;
  data: string;
}

export interface AutorResponse {
  id: number;
  nome: string;
}
