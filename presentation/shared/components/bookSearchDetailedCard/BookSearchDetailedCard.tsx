'use client';

import Image from 'next/image';
import { Calendar, FileText, BookMarked } from 'lucide-react';
import { useRouter } from 'next/navigation';

export interface BookSearchDetailedCardProps {
  id: string;
  title: string;
  author?: string;
  cover: string;
  editora?: string;
  numeroPaginas?: number | string;
  anoPublicacao?: number | string;
}

export function BookSearchDetailedCard({
  id,
  title,
  author,
  cover,
  editora,
  numeroPaginas,
  anoPublicacao,
}: BookSearchDetailedCardProps) {
  const router = useRouter();
  const temCapa =
    cover && cover !== 'Capa não cadastrada.' && cover.trim() !== '';

  const srcCapa = temCapa
    ? cover.startsWith('http')
      ? cover
      : `${process.env.NEXT_PUBLIC_API_URL}${cover}`
    : '';

  return (
    <div
      className="flex gap-4 p-4 rounded-xl bg-darker-gray/30 border border-border-default/60 hover:bg-search-border/20 transition-all duration-200 cursor-pointer w-full group shadow-xs"
      onClick={() => router.push(`/detalhamento-livro/${id}`)}
    >
      <div className="w-[80px] h-[116px] bg-darker-gray border border-border rounded-lg relative overflow-hidden flex-shrink-0 flex items-center justify-center shadow-md">
        {temCapa ? (
          <Image
            src={srcCapa}
            alt={`Capa do livro ${title}`}
            fill
            sizes="80px"
            className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-border/50 flex items-center justify-center p-2 text-center">
            <span className="text-[10px] text-text-secondary leading-tight">
              Sem Capa
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between min-w-0 flex-1 py-0.5">
        <div className="min-w-0">
          <h3 className="text-text-primary text-base font-bold truncate group-hover:text-text-primary/90 transition-colors">
            {title}
          </h3>
          <p className="text-text-subtitle text-sm truncate mt-0.5 font-medium">
            {author || 'Autor desconhecido'}
          </p>
        </div>

        <div className="flex flex-col gap-1.5 mt-2 border-t border-border-default/30 pt-2 text-xs text-text-secondary font-thin">
          {editora && (
            <div className="flex items-center gap-1.5 truncate">
              <BookMarked
                size={12}
                className="text-text-secondary/70 flex-shrink-0"
              />
              <span className="truncate">
                Editora:{' '}
                <strong className="font-normal text-text-subtitle">
                  {editora}
                </strong>
              </span>
            </div>
          )}

          <div className="flex items-center gap-4 flex-wrap">
            {numeroPaginas && (
              <div className="flex items-center gap-1.5">
                <FileText size={12} className="text-text-secondary/70" />
                <span>
                  <strong className="font-normal text-text-subtitle">
                    {numeroPaginas}
                  </strong>{' '}
                  págs.
                </span>
              </div>
            )}

            {anoPublicacao && (
              <div className="flex items-center gap-1.5">
                <Calendar size={12} className="text-text-secondary/70" />
                <span>
                  Ano:{' '}
                  <strong className="font-normal text-text-subtitle">
                    {anoPublicacao}
                  </strong>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
