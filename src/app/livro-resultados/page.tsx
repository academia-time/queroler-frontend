'use client';

import { useSearchParams } from 'next/navigation';
import { BookResults } from '@/presentation/pages/bookResults/BookResults';

export default function LivroResultadosPage() {
  const searchParams = useSearchParams();

  const query = searchParams.get('query') || '';
  const filtro = searchParams.get('filtro') || 'Título';

  return <BookResults query={query} filtro={filtro} />;
}
