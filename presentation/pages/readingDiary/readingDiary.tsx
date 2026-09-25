'use client';

import { Profile } from '@/core/domain/user/profile.enum';
import { Header } from '@/presentation/shared/components/header/header';
import { Pagination } from '@/presentation/shared/components/pagination/Pagination';
import { ReadingDiaryBookCard } from '@/presentation/shared/components/readingDiaryBookCard/ReadingDiaryBookCard';
import { useUserStore } from '@/presentation/shared/lib/user-store';
import { loadReadingTrackerPageAction } from '@/app/actions/loadReadingTrackerPage.actions';
import { LoadReadingTrackerResponseDTO } from '@/core/application/diary/load-reading-tracker-page-response.dto';
import { BookOpen } from 'lucide-react';
import { useEffect, useState } from 'react';

const LIVROS_POR_PAGINA = 4;

export function ReadingDiary() {
  const user = useUserStore((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [diarios, setDiarios] = useState<LoadReadingTrackerResponseDTO[]>([]);

  useEffect(() => {
    async function carregarDiarios() {
      setLoading(true);

      const result = await loadReadingTrackerPageAction();

      if (!result.success || !result.response) {
        setLoading(false);
        return;
      }

      setDiarios(result.response);
      setLoading(false);
    }

    carregarDiarios();
  }, []);

  const totalPages = Math.ceil(diarios.length / LIVROS_POR_PAGINA);

  const inicio = (currentPage - 1) * LIVROS_POR_PAGINA;
  const fim = inicio + LIVROS_POR_PAGINA;

  const diariosDaPagina = diarios.slice(inicio, fim);

  const nenhumDiario = !loading && diarios.length === 0;

  return (
    <div>
      <Header
        nomeUsuario={user?.nome ?? ''}
        email={user?.email ?? ''}
        fotoDePerfil={user?.fotoUrl ?? 'Foto não encontrada.'}
        profile={user?.profile ?? Profile.LEITOR}
      />

      <div className="min-h-screen lg:mx-50 flex flex-col">
        <main className="flex-1 px-4 py-6 lg:px-8">
          {loading ? null : nenhumDiario ? (
            <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
                <BookOpen
                  size={32}
                  strokeWidth={1.8}
                  className="text-gray-300"
                />
              </div>

              <h1 className="text-text-primary text-base font-medium">
                Nenhuma leitura em andamento
              </h1>

              <p className="text-text-secondary mt-3 max-w-xl text-sm">
                Abra o diário de um livro e informe a data de início para
                acompanhar aqui.
              </p>
            </div>
          ) : (
            <>
              <h1 className="text-text-primary mb-1 text-2xl font-bold lg:text-3xl">
                Diário de Leitura - Minha Jornada
              </h1>

              <p className="text-text-secondary mb-8 text-sm lg:mb-6 lg:text-base">
                Acompanhe as obras da sua jornada literária.
              </p>

              <div className="flex flex-col gap-5 md:gap-8">
                {diariosDaPagina.map((diario) => (
                  <ReadingDiaryBookCard
                    key={diario.diarioId}
                    id={String(diario.livroId)}
                    title={diario.titulo}
                    author={diario.autores?.[0]?.nome || ''}
                    cover={diario.urlCapa}
                    editora="Editora"
                    numeroPaginas={500}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
