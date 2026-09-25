export interface LoadReadingDiaryResponseDTO {
  id: number;
  livro: {
    id: number;
    titulo: string;
    numeroDePaginas: number;
  };
  inicioDaLeitura: string;
  terminoDaLeitura: string | null;
  acompanhamentos: LoadReadingDiaryTrackingResponseDTO[];
  nota: number;
  tituloDaResenha: string | null;
  resenha: string | null;
  spoilers: boolean;
}

export interface LoadReadingDiaryTrackingResponseDTO {
  id: number;
  paginaInicial: number;
  paginaFinal: number;
  comentario: string;
}
