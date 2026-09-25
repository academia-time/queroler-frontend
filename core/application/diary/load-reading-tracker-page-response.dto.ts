export interface LoadReadingTrackerResponseDTO {
  diarioId: number;
  livroId: number;
  titulo: string;
  urlCapa: string;
  autores: {
    id: number;
    nome: string;
  }[];
  inicioDaLeitura: string;
}
