'use client';

import Image from 'next/image';
import { IdiomaEnum } from '@/core/domain/book/language.enum';
import { useRouter } from 'next/navigation';

export interface ReadingDiaryBookCardProps {
  id: string;
  title: string;
  author?: string;
  cover: string;
  editora?: string;
  idioma?: IdiomaEnum;
  isbn?: string;
  numeroPaginas?: number | string;
  mostrarBotaoEditar?: boolean;
}

export function ReadingDiaryBookCard({
  id,
  title,
  author,
  cover,
  editora,
  idioma,
  isbn,
  numeroPaginas,
  mostrarBotaoEditar = true,
}: ReadingDiaryBookCardProps) {
  const temCapa =
    cover && cover !== 'Capa não cadastrada.' && cover.trim() !== '';

  const srcCapa = temCapa
    ? cover.startsWith('http')
      ? cover
      : `${process.env.NEXT_PUBLIC_API_URL}${cover}`
    : '';

  const router = useRouter();

  return (
    <div className="flex gap-3 sm:gap-4 p-3 rounded-md bg-secondary-bg border border-border w-full group shadow-xs">
      <div className="w-[72px] h-[106px] sm:w-[107px] sm:h-[157px] bg-darker-gray rounded-lg relative overflow-hidden flex-shrink-0 flex items-center justify-center shadow-md">
        {temCapa ? (
          <Image
            src={srcCapa}
            alt={`Capa do livro ${title}`}
            fill
            sizes="(min-width: 640px) 107px, 72px"
            className="object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-border/50 border border-border rounded-lg flex items-center justify-center p-2 text-center">
            <span className="text-[10px] text-text-secondary leading-tight">
              Sem Capa
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between min-w-0 flex-1 py-1 sm:p-2 lg:p-6">
        <div className="min-w-0">
          <h1 className="text-text-primary text-sm sm:text-md lg:text-2xl font-bold truncate">
            {title}
          </h1>
          <p className="text-text-secondary text-sm lg:text-base truncate mt-1 sm:mt-3 font-medium">
            {author || 'Autor desconhecido'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between min-w-0 flex-1 gap-1 sm:gap-4 mt-4">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2 sm:gap-4 text-xs text-text-primary font-thin">
              {editora && (
                <div className="flex items-center gap-1.5 min-w-0 truncate">
                  <span className="truncate">
                    Editora{' '}
                    <strong className="font-sm text-text-primary">
                      {editora}
                    </strong>
                  </span>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-4">
                {numeroPaginas && (
                  <div className="flex items-center gap-1.5">
                    <span className="truncate">
                      <strong className="font-normal text-text-primary">
                        {numeroPaginas}
                      </strong>{' '}
                      páginas
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {idioma && (
                  <div className="flex items-center gap-1.5">
                    <span className="truncate">
                      <strong className="font-normal text-text-primary">
                        {idioma}
                      </strong>{' '}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {isbn && (
                  <div className="flex items-center gap-1.5">
                    <span className="truncate">
                      ISBN{' '}
                      <strong className="font-normal text-text-primary">
                        {isbn}
                      </strong>{' '}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {mostrarBotaoEditar && (
        <div className="flex items-end">
          <button
            data-testid="btn-editar"
            type="button"
            onClick={() => router.push(`/diario/${id}`)}
            className="px-3 sm:px-7 py-2 text-[10px] text-white rounded-sm bg-brand font-bold hover:opacity-80 whitespace-nowrap cursor-pointer"
          >
            Editar
          </button>
        </div>
      )}
    </div>
  );
}
