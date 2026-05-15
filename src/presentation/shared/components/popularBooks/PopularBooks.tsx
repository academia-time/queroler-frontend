'use client';

import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { BookCard } from '@/presentation/shared/components/bookCard/BookCard';
import { FieldError } from '@/presentation/shared/components/fieldError/FieldError';
import { mockPopularBooks5 } from '@/presentation/shared/components/popularBooks/mockPopularBooks';

interface Livro {
  id: string;
  titulo: string;
  autores: { nome: string }[];
  capaUrl: string | null;
}

//interface RespostaBack {
//  content: Livro[];
//  totalElements: number;
//}

export function PopularBooks() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [total, setTotal] = useState(0);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function listarPopulares() {
      try {
        // const resposta = await fetch(
        //   `${process.env.NEXT_PUBLIC_API_URL}/livros/populares`
        // );

        // if (!resposta.ok) return;

        // const dados: RespostaBack = await resposta.json();

        const dados = mockPopularBooks5;

        setLivros(dados.content);
        setTotal(dados.totalElements);
      } catch (error) {
        if (error instanceof Error) {
          setErro(error.message);
        } else {
          setErro('Erro inesperado.');
        }
      }
    }

    listarPopulares();
  }, []);

  return (
    //<>
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
            {total} livros
          </span>
        </div>
      </div>

      <FieldError message={erro} />

      <div className="flex gap-4 overflow-x-auto pt-2 pb-3 pl-2 custom-scroll">
        {livros.slice(0, 5).map((livro) => (
          <BookCard
            key={livro.id}
            id={livro.id}
            title={livro.titulo}
            author={livro.autores?.[0]?.nome || ''}
            cover={livro.capaUrl || ''}
          />
        ))}
      </div>
    </div>
  );
}
