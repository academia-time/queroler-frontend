'use client';

import { Profile } from '@/core/domain/user/profile.enum';
import { Header } from '@/presentation/shared/components/header/header';
import { useUserStore } from '@/presentation/shared/lib/user-store';
import { useEffect, useState } from 'react';
import { loadReadingDiaryAction } from '@/app/actions/loadReadingDiary.actions';
import { getBookDetailsAction } from '@/app/actions/getBookDetails.actions';
import { LoadReadingDiaryResponseDTO } from '@/core/application/diary/load-reading-diary-response.dto';
import { BookResponseDetailedDTO } from '@/core/application/book/book-response.dto';
import { ReadingDiaryBookCard } from '@/presentation/shared/components/readingDiaryBookCard/ReadingDiaryBookCard';
import { ReadingDiaryTracking } from '@/presentation/shared/components/readingDiary/ReadingDiaryTracking/ReadingDiaryTracking';
import { ReadingDiaryReview } from '@/presentation/shared/components/readingDiary/ReadingDiaryReview/ReadingDiaryReview';
import { ReadingDiaryTimeline } from '@/presentation/shared/components/readingDiary/ReadingDiaryTimeline/ReadingDiaryTimeline';

export interface ReadingDiaryFormProps {
  livroId?: string;
  title?: string;
  author?: string;
  cover?: string;
  editora?: string;
  numeroPaginas?: number | string;
  anoPublicacao?: number | string;
  idioma?: string;
  isbn?: number | string;
  rating?: number;
}

export function ReadingDiaryForm({ livroId }: ReadingDiaryFormProps) {
  const [diario, setDiario] = useState<LoadReadingDiaryResponseDTO | null>(
    null
  );

  const [livro, setLivro] = useState<BookResponseDetailedDTO | null>(null);

  const user = useUserStore((state) => state.user);

  const carregarDiario = async (idLivro: number) => {
    const resultadoDiario = await loadReadingDiaryAction(idLivro);

    if (resultadoDiario.success && resultadoDiario.response) {
      setDiario(resultadoDiario.response);
    } else {
      setDiario(null);
    }
  };

  useEffect(() => {
    async function carregarDados() {
      if (!livroId) return;

      const idLivro = Number(livroId);

      await carregarDiario(idLivro);

      const resultadoLivro = await getBookDetailsAction(idLivro);

      if (!resultadoLivro.success || !resultadoLivro.response) {
        return;
      }

      setLivro(resultadoLivro.response);
    }

    carregarDados();
  }, [livroId]);

  const handleRegistroSalvo = async () => {
    if (!livroId) return;

    await carregarDiario(Number(livroId));
  };

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
          <h1 className="text-text-primary text-2xl lg:text-3xl font-bold mb-1">
            Diário de Leitura
          </h1>

          <p className="text-text-secondary text-sm lg:text-base mb-8 lg:mb-6">
            Registre e atualize o andamento da sua jornada.
          </p>

          {livro && (
            <ReadingDiaryBookCard
              id={String(livroId)}
              title={livro.titulo}
              author={livro.autores?.[0]?.nome}
              cover={livro.urlCapaDoLivro}
              editora={livro.editora}
              idioma={livro.idioma}
              isbn={livro.isbn}
              numeroPaginas={livro.numeroDePaginas}
              mostrarBotaoEditar={false}
            />
          )}
          <ReadingDiaryTimeline
            diarioId={diario?.id}
            livroId={Number(livroId)}
            inicioDaLeitura={diario?.inicioDaLeitura ?? ''}
            terminoDaLeitura={diario?.terminoDaLeitura ?? ''}
            onDiarioSalvo={handleRegistroSalvo}
          />

          {diario && (
            <ReadingDiaryTracking
              diarioId={diario.id}
              numeroDePaginas={diario.livro.numeroDePaginas}
              acompanhamentos={diario.acompanhamentos}
              onRegistroSalvo={handleRegistroSalvo}
            />
          )}
          {diario?.terminoDaLeitura && (
            <ReadingDiaryReview
              diarioId={diario.id}
              nota={diario.nota}
              tituloDaResenha={diario.tituloDaResenha}
              resenha={diario.resenha}
              spoilers={diario.spoilers}
              onAvaliacaoSalva={handleRegistroSalvo}
            />
          )}
        </main>
      </div>
    </div>
  );
}
