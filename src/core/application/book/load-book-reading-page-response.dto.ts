export interface LoadBookReadingPageItemDTO {
  titulo: string;
  status:
    | 'LIVROS_LIDOS'
    | 'LIVROS_QUE_QUERO_LER'
    | 'LIVROS_QUE_ESTOU_LENDO'
    | 'LIVROS_ABANDONADOS';
  urlCapa: string;
}

export interface LoadBookReadingPageResponseDTO {
  content: LoadBookReadingPageItemDTO[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
