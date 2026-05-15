export interface BookCardProps {
  title: string;
  author?: string;
  cover: string;
  id: string;
  editora?: string;
  numeroDePaginas?: number;
  anoDePublicacao?: string;
}

export function BookCard({
  title,
  author,
  cover,
  id,
  editora,
  numeroDePaginas,
  anoDePublicacao,
}: BookCardProps) {
  return (
    <div className="w-full bg-card-bg border border-border rounded-xl shadow-xs flex-shrink-0">
      <a href={`/livros/${id}`}>
        {cover ? (
          <img
            src={cover}
            alt={title}
            className="w-full h-[150px] lg:h-[200px] object-cover rounded-t-xl"
          />
        ) : (
          <div className="w-full h-[150px] lg:h-[200px] bg-border flex flex-col items-center justify-center gap-2 rounded-t-xl">
            <span className="text-text-secondary text-xs text-center px-4">
              Capa não cadastrada
            </span>
          </div>
        )}
      </a>
      <div className="p-4 text-left">
        <span className="block text-text-primary text-sm lg:text-base font-semibold mb-1">
          {title}
        </span>
        <div className="flex flex-col gap-1 text-xs lg:text-sm text-text-secondary">
          <div className="flex justify-between">
            <span>{author}</span>
            {numeroDePaginas && <span>{numeroDePaginas} páginas</span>}
          </div>
          <div className="flex justify-between">
            {editora && <span>{editora}</span>}
            {anoDePublicacao && <span>{anoDePublicacao}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
