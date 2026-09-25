import { LoadReadingTrackerResponseDTO } from '@/core/application/diary/load-reading-tracker-page-response.dto';
import { LoadReadingDiaryResponseDTO } from '@/core/application/diary/load-reading-diary-response.dto';
import { CreateReadingTrackingDTO } from '@/core/application/diary/create-reading-tracking.dto';
import { CreateReadingDiaryDTO } from '@/core/application/diary/create-reading-diary.dto';
import { UpdateReadingDiaryDTO } from '@/core/application/diary/update-reading-diary.dto';
import { DiaryRepository } from '@/core/domain/diary/diary.repository';
import { AxiosInstance, AxiosResponse } from 'axios';

export class ApiDiaryRepository implements DiaryRepository {
  constructor(private readonly api: AxiosInstance) {}

  async carregarTelaAcompanhamentoDeLeitura(): Promise<
    AxiosResponse<LoadReadingTrackerResponseDTO[]>
  > {
    try {
      return await this.api.get<LoadReadingTrackerResponseDTO[]>(
        '/diario/acompanhamento'
      );
    } catch (error: unknown) {
      throw (
        (error as { response?: { data?: unknown } }).response?.data || error
      );
    }
  }

  async buscarDiarioPorLivro(
    livroId: number
  ): Promise<AxiosResponse<LoadReadingDiaryResponseDTO>> {
    try {
      return await this.api.get<LoadReadingDiaryResponseDTO>('/diario', {
        params: {
          livroId,
        },
      });
    } catch (error: unknown) {
      throw (
        (error as { response?: { data?: unknown } }).response?.data || error
      );
    }
  }

  async salvarAcompanhamento(
    diarioId: number,
    data: CreateReadingTrackingDTO
  ): Promise<AxiosResponse<void>> {
    try {
      return await this.api.post(`/leituras/${diarioId}/comentarios`, data);
    } catch (error: unknown) {
      throw (
        (error as { response?: { data?: unknown } }).response?.data || error
      );
    }
  }

  async criarDiario(data: CreateReadingDiaryDTO): Promise<AxiosResponse<void>> {
    try {
      return await this.api.post('/diario', data);
    } catch (error: unknown) {
      throw (
        (error as { response?: { data?: unknown } }).response?.data || error
      );
    }
  }

  async atualizarDiario(
    diarioId: number,
    data: UpdateReadingDiaryDTO
  ): Promise<AxiosResponse<void>> {
    try {
      return await this.api.put(`/diario/${diarioId}`, data);
    } catch (error: unknown) {
      throw (
        (error as { response?: { data?: unknown } }).response?.data || error
      );
    }
  }
}
