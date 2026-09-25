import { ReadingDiaryForm } from '@/presentation/pages/readingDiaryForm/ReadingDiaryForm';

export default async function DiarioPage({
  params,
}: {
  params: Promise<{ livroId: string }>;
}) {
  const { livroId } = await params;

  return <ReadingDiaryForm livroId={livroId} />;
}
