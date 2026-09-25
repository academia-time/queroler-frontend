'use client';

import { BookResponseDetailedDTO } from '@/core/application/book/book-response.dto';
import { LIVRO_IDIOMA_LABEL } from '@/core/domain/book/language.enum';
import { Profile } from '@/core/domain/user/profile.enum';
import { BookReview } from '@/presentation/shared/components/bookReview/BookReview';
import { BookStatistic } from '@/presentation/shared/components/bookStatistic/bookStatistic';
import { Header } from '@/presentation/shared/components/header/header';
import { useUserStore } from '@/presentation/shared/lib/user-store';
import {
  Ban,
  BookHeart,
  BookOpen,
  CheckCircle,
  ChevronDown,
  NotebookPen,
  Pencil,
  RefreshCw,
  ChartNoAxesColumnDecreasing,
  Star,
} from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export function BookDetails({
  detalhesLivro,
}: {
  detalhesLivro: BookResponseDetailedDTO | undefined;
}) {
  const user = useUserStore((state) => state.user);
  const [menuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <Header
        nomeUsuario={user?.nome ?? ''}
        email={user?.email ?? ''}
        fotoDePerfil={user?.fotoUrl ?? 'Foto não encontrada.'}
        profile={user?.profile ?? Profile.LEITOR}
      />

      <div className="min-h-screen lg:mx-50 flex flex-col">
        <main className="flex-1 px-4 py-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-3 lg:items-stretch">
            <div className="flex flex-col gap-3 w-full lg:w-[240px] shrink-0">
              <div className="relative w-60 h-90 bg-border flex flex-col items-center justify-center gap-2 rounded-xl overflow-hidden">
                {detalhesLivro?.urlCapaDoLivro &&
                detalhesLivro.urlCapaDoLivro !== 'Capa não cadastrada.' ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${detalhesLivro.urlCapaDoLivro}`}
                    alt={`Capa do livro ${detalhesLivro.titulo}`}
                    fill
                    className="object-cover"
                    sizes="240px"
                    priority
                  />
                ) : (
                  <span className="text-text-secondary text-xs text-center px-4">
                    Capa não cadastrada
                  </span>
                )}
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-1">
                <h1 className="text-text-primary text-3xl lg:text-5xl font-bold">
                  {detalhesLivro?.titulo}
                </h1>
                <p className="text-text-secondary text-2xl py-4 lg:pt-7 lg:text-4xl">
                  {detalhesLivro?.autores[0].nome}
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex flex-wrap gap-4 lg:gap-6">
                  <div className="text-text-primary text-lg lg:text-xl font-semibold">
                    {detalhesLivro?.editora}
                  </div>
                  <div className="text-text-primary text-lg lg:text-xl font-semibold">
                    {detalhesLivro?.anoDePublicacao}
                  </div>
                  <div className="text-text-primary text-lg lg:text-xl font-semibold">
                    {detalhesLivro?.numeroDePaginas} páginas
                  </div>
                  <div className="text-text-primary text-lg lg:text-xl font-semibold">
                    {detalhesLivro?.idioma
                      ? LIVRO_IDIOMA_LABEL[detalhesLivro.idioma]
                      : 'Idioma'}
                  </div>
                  <div className="text-text-primary text-lg lg:text-xl font-semibold">
                    ISBN {detalhesLivro?.isbn}
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row lg:flex-wrap justify-start gap-2">
                <div className="relative w-full lg:w-auto">
                  <button
                    data-testid="btn-add-lista"
                    onClick={() => setIsMenuOpen(!menuOpen)}
                    className={`w-full lg:w-70 flex items-center justify-between lg:mr-6 px-4 py-3 text-sm rounded-xs font-bold transition-opacity duration-200 text-white hover:brightness-110 cursor-pointer ${menuOpen ? 'bg-dark-purple' : 'bg-brand'}`}
                  >
                    Adicionar à lista
                    <ChevronDown size={16} className="text-text-primary/60" />
                  </button>
                  {menuOpen && (
                    <div className="absolute left-0 mt-2 w-full lg:w-max bg-card-bg border border-border rounded-lg shadow-lg z-50">
                      <button
                        data-testid="profile-button"
                        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-text-primary hover:text-brand"
                      >
                        <BookHeart size={22} className="text-desired" />
                        Quero ler
                      </button>
                      <div className="mx-4 h-px bg-text-secondary" />
                      <div className="cursor-pointer">
                        <button
                          data-testid="profile-button"
                          className="w-full flex items-center gap-2 px-4 py-3 text-sm text-text-primary hover:text-brand"
                        >
                          <BookOpen size={22} className="text-active" />
                          Estou lendo
                        </button>
                      </div>
                      <div className="mx-4 h-px bg-text-secondary" />
                      <div className="cursor-pointer">
                        <button
                          data-testid="profile-button"
                          className="w-full flex items-center gap-2 px-4 py-3 text-sm text-text-primary hover:text-brand"
                        >
                          <CheckCircle size={22} className="text-completed" />
                          Livro lidos
                        </button>
                      </div>
                      <div className="mx-4 h-px bg-text-secondary" />
                      <div className="cursor-pointer">
                        <button
                          data-testid="profile-button"
                          className="w-full flex items-center gap-2 px-4 py-3 text-sm text-text-primary hover:text-brand"
                        >
                          <Ban size={22} className="text-pause" />
                          Livros abandonados
                        </button>
                      </div>
                      <div className="mx-4 h-px bg-text-secondary" />
                      <div className="cursor-pointer">
                        <button
                          data-testid="profile-button"
                          className="w-full flex items-center gap-2 px-4 py-3 text-sm text-text-primary hover:text-brand"
                        >
                          <RefreshCw size={22} className="text-repeating" />
                          Relendo
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  data-testid="btn-reading-diary"
                  type="submit"
                  className="w-full lg:w-auto lg:min-w-55 flex items-center justify-center gap-2 px-4 py-3 text-sm rounded-lg font-semibold transition-opacity duration-200 bg-dark-purple text-white hover:brightness-110 cursor-pointer whitespace-nowrap"
                >
                  <NotebookPen size={12} />
                  Diário de leitura
                </button>
              </div>
            </div>
          </div>

          <div className="py-12">
            <div className="border border-border rounded-md p-4 ">
              <h2 className="flex items-center gap-2 text-text-primary text-md lg:text-lg font-semibold pb-6">
                <Pencil size={16} />
                Sinopse
              </h2>
              <p className="font-thin text-primary text-sm lg:text-base">
                {detalhesLivro?.sinopse}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 lg:gap-6 border border-border rounded-md p-4">
              <h2 className="flex items-center gap-2 text-text-primary text-md lg:text-lg font-semibold">
                <ChartNoAxesColumnDecreasing size={16} />
                Estatísticas da Comunidade
              </h2>
              <div>
                <div className="grid grid-cols-2 lg:flex lg:flex-wrap lg:justify-around gap-4 lg:gap-6">
                  <BookStatistic
                    title="Avaliação"
                    icon={<Star size={26} />}
                    iconColor="text-rating"
                    numero={3.8}
                    numeroAvaliacoes={112}
                  />
                  <BookStatistic
                    title="Querem ler"
                    icon={<BookHeart size={26} />}
                    iconColor="text-desired"
                    numero={500}
                  />
                  <BookStatistic
                    title="Estão lendo"
                    icon={<BookOpen size={26} />}
                    iconColor="text-active"
                    numero={120}
                  />
                  <BookStatistic
                    title="Já leram"
                    icon={<CheckCircle size={26} />}
                    iconColor="text-completed"
                    numero={300}
                  />
                  <BookStatistic
                    title="Abandonados"
                    icon={<Ban size={26} />}
                    iconColor="text-pause"
                    numero={50}
                  />
                  <BookStatistic
                    title="Relendo"
                    icon={<RefreshCw size={26} />}
                    iconColor="text-repeating"
                    numero={20}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 py-12">
            <div className="flex flex-col gap-4 lg:gap-6 bg-secondary-bg border border-border rounded-md p-4">
              <h2 className="flex items-center gap-2 text-text-primary text-md lg:text-lg font-semibold">
                <BookHeart size={14} />
                Resenhas
              </h2>
              <div className="flex flex-col gap-6">
                <BookReview
                  containSpoilers={false}
                  rating={4.5}
                  reviewTitle="Título da resenha"
                  reviewText="“O Morro dos Ventos Uivantes” (Wuthering Heights), de Emily Brontë, é um romance clássico da literatura inglesa publicado em 1847. A história mistura amor intenso, vingança e tragédia em um ambiente sombrio e emocionalmente carregado.
                  A trama acompanha a relação entre Heathcliff, um órfão adotado pela família Earnshaw, e Catherine Earnshaw, sua amiga de infância e grande paixão. Apesar do amor profundo entre os dois, Catherine decide se casar com o rico e elegante Edgar Linton,
                  buscando ascensão social e estabilidade. Sentindo-se traído e humilhado, Heathcliff desaparece por alguns anos e retorna rico e decidido a se vingar de todos que o fizeram sofrer.
                  Consumido pelo ressentimento, Heathcliff manipula e destrói a vida das famílias Earnshaw e Linton, criando um ciclo de dor que atravessa gerações. Ao mesmo tempo, o romance mostra como o amor entre ele e Catherine é tão forte quanto destrutivo.
                  A obra é conhecida por seus personagens intensos, atmosfera melancólica e temas como paixão obsessiva, orgulho, vingança e sofrimento emocional. Até hoje, é considerada um dos maiores clássicos da literatura mundial."
                  reviewerEmail="giovanni.lopes@dbserver.com.br"
                  reviewDate="30/04/2026"
                />
                <BookReview
                  containSpoilers={true}
                  rating={3}
                  reviewTitle="Resenha com spoilers"
                  reviewText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                  reviewerEmail="giovanni.lopes@dbserver.com.br"
                  reviewDate="30/04/2026"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
