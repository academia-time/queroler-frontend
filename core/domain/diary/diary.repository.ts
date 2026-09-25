import { LoadReadingTrackerResponseDTO } from '@/core/application/diary/load-reading-tracker-page-response.dto';
import { LoadReadingDiaryResponseDTO } from '@/core/application/diary/load-reading-diary-response.dto';
import { CreateReadingTrackingDTO } from '@/core/application/diary/create-reading-tracking.dto';
import { CreateReadingDiaryDTO } from '@/core/application/diary/create-reading-diary.dto';
import { UpdateReadingDiaryDTO } from '@/core/application/diary/update-reading-diary.dto';
import { AxiosResponse } from 'axios';

export interface DiaryRepository {
  carregarTelaAcompanhamentoDeLeitura(): Promise<
    AxiosResponse<LoadReadingTrackerResponseDTO[]>
  >;

  buscarDiarioPorLivro(
    livroId: number
  ): Promise<AxiosResponse<LoadReadingDiaryResponseDTO>>;

  salvarAcompanhamento(
    diarioId: number,
    data: CreateReadingTrackingDTO
  ): Promise<AxiosResponse<void>>;

  criarDiario(data: CreateReadingDiaryDTO): Promise<AxiosResponse<void>>;

  atualizarDiario(
    diarioId: number,
    data: UpdateReadingDiaryDTO
  ): Promise<AxiosResponse<void>>;
}
