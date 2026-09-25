'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export interface BookSearchCardProps {
  id: string;
  title: string;
  author?: string;
  cover: string;
}

export function BookSearchCard({
  id,
  title,
  author,
  cover,
}: BookSearchCardProps) {
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
      className="flex gap-4 items-center p-3 rounded-lg hover:bg-search-border/30 transition-colors cursor-pointer w-full group"
      onClick={() => router.push(`/detalhamento-livro/${id}`)}
    >
      <div className="w-[76px] h-[110px] bg-darker-gray border border-border rounded-md relative overflow-hidden flex-shrink-0 flex items-center justify-center shadow-sm">
        {temCapa ? (
          <Image
            src={srcCapa}
            alt={`Capa do livro ${title}`}
            fill
            sizes="76px"
            className="object-cover rounded-md group-hover:scale-105 transition-transform duration-200"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-border/50 flex items-center justify-center p-2 text-center">
            <span className="text-[10px] text-text-secondary leading-tight">
              Capa não cadastrada
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center min-w-0 flex-1">
        <h3 className="text-text-primary text-base font-semibold truncate group-hover:text-text-primary/90 transition-colors">
          {title}
        </h3>
        {author && (
          <p className="text-text-subtitle text-sm text-text-secondary truncate mt-1 font-normal">
            {author || 'Autor desconhecido'}
          </p>
        )}
      </div>
    </div>
  );
}
