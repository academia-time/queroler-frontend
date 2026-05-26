import { ReactNode } from 'react';
import {
  BookCard,
  BookCardProps,
} from '@/presentation/shared/components/bookCard/BookCard';

interface BookSectionProps {
  title: string;
  tag: string;
  tagColor: string;
  icon: ReactNode;
  livros?: BookCardProps[];
}

export function BookSection({
  title,
  tag,
  tagColor,
  icon,
  livros,
}: BookSectionProps) {
  return (
    <div className="bg-card-bg border border-border rounded-xl px-4 lg:p-6 py-3 lg:py-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-text-primary text-sm lg:text-base font-semibold">
            {title}
          </span>
        </div>

        <span
          className={`${tagColor} flex items-center gap-1 text-xs font-thin px-2 py-1 rounded-xs`}
        >
          {tag}
        </span>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-2 min-h-[120px]">
        {livros && livros.length > 0 ? (
          livros.map((livro) => (
            <div
              key={livro.id}
              className="min-w-[140px] max-w-[160px] lg:min-w-[180px] lg:max-w-[200px] flex-shrink-0"
            >
              <BookCard {...livro} />
            </div>
          ))
        ) : (
          <p className="text-text-secondary text-sm self-center">
            Nenhum livro ainda.
          </p>
        )}
      </div>
    </div>
  );
}
