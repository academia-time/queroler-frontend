import Image from 'next/image';
import { useRouter } from 'next/navigation';

export interface BookCardProps {
  title: string;
  author?: string;
  cover: string;
  id: number;
}

export function BookCard({ id, title, author, cover }: BookCardProps) {
  const router = useRouter();
  return (
    <div
      className="w-full min-w-0 bg-card-bg border border-border rounded-xl shadow-xs relative hover:z-10 transition-all duration-200 cursor-pointer hover:shadow-md hover:scale-[1.02] hover:-translate-y-1"
      onClick={() => router.push(`/detalhamento-livro/${id}`)}
    >
      {cover && cover !== 'Capa não cadastrada.' ? (
        <div className="relative w-full h-[120px] lg:h-[170px]">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${cover}`}
            alt={title}
            fill
            sizes="(max-width: 768px) 150px, 215px"
            className="object-cover rounded-t-xl"
            priority={false}
            loading="eager"
          />
        </div>
      ) : (
        <div className="w-full h-[120px] lg:h-[170px] bg-border flex flex-col items-center justify-center gap-2 rounded-t-xl">
          <span className="text-text-secondary text-xs text-center px-4">
            Capa não cadastrada
          </span>
        </div>
      )}
      <div className="p-4 text-left">
        <span className="text-text-primary text-sm lg:text-base font-semibold">
          {title}
        </span>

        {author && (
          <span className="text-text-secondary text-sm font-thin mt-1 line-clamp-1">
            {author}
          </span>
        )}
      </div>
    </div>
  );
}
