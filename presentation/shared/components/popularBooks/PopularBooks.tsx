'use client';

import { Star } from 'lucide-react';
import { BookCard } from '@/presentation/shared/components/bookCard/BookCard';
import { BookResponseDTO } from '@/core/application/book/book-response.dto';

export function PopularBooks({
  livros,
}: {
  livros: BookResponseDTO[] | undefined;
}) {
  return (
    <div className="bg-card-bg border border-border rounded-xl px-4 py-3 lg:p-6 lg:py-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Star size={18} className="text-brand" />
          <span className="text-text-primary text-sm lg:text-base font-semibold">
            Livros populares
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-thin px-2 py-1 rounded-xs">
            {livros ? livros.length : 0} livros
          </span>
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto pt-2 pb-3 pl-2 custom-scroll">
        {livros?.map((livro) => (
          <BookCard
            key={livro.id}
            id={livro.id}
            title={livro.titulo}
            author={livro.autores?.[0]?.nome || ''}
            cover={livro.capaUrl}
          />
        ))}
      </div>
    </div>
  );
}
