import { getBookDetailsAction } from '@/app/actions/getBookDetails.actions';
import { BookDetails } from '@/presentation/pages/bookDetails/BookDetails';

interface RouteParams {
  params: Promise<{ id: number }>;
}

export default async function DetalhamentoLivroPage({ params }: RouteParams) {
  const { id } = await params;

  const response = await getBookDetailsAction(id);

  if (!response.success) {
    return <div>Erro!</div>;
  }

  return <BookDetails detalhesLivro={response.response} />;
}
