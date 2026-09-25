export interface LoadBookReadingPageItemDTO {
  id: number;
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

export interface Page<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
