'use client';

import { Search, ChevronDown, Check, Book } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { mockSearchResults21 } from '@/presentation/shared/components/searchBar/mockSearchResults';

interface Livro {
  id: string;
  titulo: string;
  autores: { nome: string }[];
  editora: string;
  capaUrl: string | null;
}

interface RespostaBack {
  content: Livro[];
  totalElements: number;
}

export function SearchBar() {
  const [filtroOpen, setFiltroOpen] = useState(false);
  const [filtroSelecionado, setFiltroSelecionado] = useState('Título');
  const [query, setQuery] = useState('');
  const opcoesFiltro = ['Título', 'Autor(a)', 'Editora'];
  const [livros, setLivros] = useState<Livro[]>([]);
  const [total, setTotal] = useState(0);
  const [erro, setErro] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function buscarLivros() {
      try {
        if (!query.trim()) {
          setLivros([]);
          setTotal(0);
          return;
        }

        // const resposta = await fetch(
        //   `${process.env.NEXT_PUBLIC_API_URL}/livros/busca?query=${query}`
        // );

        // if (!resposta.ok) return;

        // const dados: RespostaBack = await resposta.json();

        const dados = mockSearchResults21;

        const filtrados = dados.content
          .filter((livro) => {
            const termo = query.toLowerCase();

            if (filtroSelecionado === 'Título') {
              return livro.titulo.toLowerCase().includes(termo);
            }

            if (filtroSelecionado === 'Autor(a)') {
              return livro.autores?.some((autor) =>
                autor.nome.toLowerCase().includes(termo)
              );
            }

            if (filtroSelecionado === 'Editora') {
              return livro.editora?.toLowerCase().includes(termo);
            }

            return false;
          })
          .sort((a, b) => Number(a.id) - Number(b.id));

        setLivros(filtrados);
        setTotal(filtrados.length);
      } catch (error) {
        if (error instanceof Error) {
          setErro(error.message);
        } else {
          setErro('Erro inesperado.');
        }
      }
    }

    buscarLivros();
  }, [query]);

  return (
    <div className="relative">
      <div className="flex items-center gap-2 bg-search-border border border-border-default rounded-md m-1 mb-6 px-2 py-2 lg:px-3 lg:py-3">
        <div className="flex-1 flex items-center gap-2 bg-card-bg border border-border-default rounded-sm px-1 py-1 lg:px-4 lg:py-3">
          <Search size={16} className="text-text-secondary" />
          <input
            data-testid="search-input"
            type="text"
            placeholder="Pesquisar na sua biblioteca..."
            className="flex-1 bg-transparent text-text-primary text-sm outline-none placeholder:text-text-secondary"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="relative w-[20px] lg:w-[110px]">
          <div
            onClick={() => setFiltroOpen(!filtroOpen)}
            className="w-full flex items-center justify-between bg-darker-gray rounded-sm px-1 py-1 lg:px-4 lg:py-3 cursor-pointer"
          >
            <span className="text-text-primary text-sm hidden lg:block">
              {filtroSelecionado}
            </span>
            <ChevronDown size={14} className="text-text-secondary" />
          </div>

          {filtroOpen && (
            <div className="absolute right-0 mt-2 w-[110px] bg-card-bg border border-border rounded-lg shadow-lg z-50 flex flex-col p-1 flex flex-col p-1">
              {opcoesFiltro.map((opcao) => (
                <button
                  key={opcao}
                  onClick={() => {
                    setFiltroSelecionado(opcao);
                    setFiltroOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm rounded-lg flex items-center justify-between
                  ${
                    filtroSelecionado === opcao
                      ? 'text-text-primary bg-search-border'
                      : 'text-text-primary hover:opacity-80'
                  }`}
                >
                  {opcao}
                  {filtroSelecionado === opcao && (
                    <Check size={14} className="text-text-primary" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {query && (
        <div className="absolute top-full left-0 w-full bg-card-bg border border-border rounded-lg mt-2 z-50">
          {livros.length === 0 ? (
            <div className="p-4 text-sm text-text-secondary">
              Nenhum livro encontrado
            </div>
          ) : (
            <>
              {livros.slice(0, 5).map((livro) => (
                <div
                  key={livro.id}
                  className="flex items-start gap-3 p-3 hover:bg-search-border cursor-pointer"
                >
                  {livro.capaUrl ? (
                    <img
                      src={livro.capaUrl}
                      alt={livro.titulo}
                      className="w-18 h-24 object-cover rounded"
                    />
                  ) : (
                    <div className="w-18 h-24 rounded flex-shrink-0 bg-darker-gray flex items-center justify-center text-center px-1">
                      <span className="text-[10px] text-text-secondary leading-tight">
                        Capa não cadastrada
                      </span>
                    </div>
                  )}

                  <div className="flex flex-col">
                    <span className="text-base font-semibold text-text-primary">
                      {livro.titulo}
                    </span>
                    <span className="text-sm text-text-secondary">
                      {livro.autores?.[0]?.nome}
                    </span>

                    {livro.editora && (
                      <div className="flex items-center gap-1 mt-9">
                        <Book
                          size={12}
                          className="text-text-secondary opacity-70"
                        />
                        <span className="text-xs text-text-secondary">
                          {livro.editora}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {livros.length > 5 && (
                <div className="p-3 text-center border-t border-border">
                  <button
                    onClick={() =>
                      router.push(
                        `/livro-resultados?query=${query}&filtro=${filtroSelecionado}`
                      )
                    }
                    className="text-sm text-brand hover:underline"
                  >
                    Ver todos os {total} resultados
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
