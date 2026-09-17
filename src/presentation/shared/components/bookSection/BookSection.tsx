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

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 min-h-[120px] min-w-0">
        {livros && livros.length > 0 ? (
          livros
            ?.slice(0, 4)
            .map((livro) => <BookCard key={livro.id} {...livro} />)
        ) : (
          <p className="text-text-secondary text-sm self-center">
            Nenhum livro ainda.
          </p>
        )}
      </div>
    </div>
  );
}
