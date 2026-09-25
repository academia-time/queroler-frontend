'use client';

import { SearchBookResponseDTO } from '@/core/application/book/search-book-response.dto';
import { BookSearchCard } from '@/presentation/shared/components/bookSearchCard/BookSearchCard';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { BookSearchDetailedCard } from '@/presentation/shared/components/bookSearchDetailedCard/BookSearchDetailedCard';

interface SearchResultsProps {
  livros: SearchBookResponseDTO[];
  isLoading: boolean;
  totalPages: number;
  totalElements: number;
  currentPage: number;
  isExpanded: boolean;
  onExpand: () => void;
  onPageChange: (novaPagina: number) => void;
}

export function SearchResults({
  livros,
  isLoading,
  totalPages,
  totalElements,
  currentPage,
  isExpanded,
  onExpand,
  onPageChange,
}: SearchResultsProps) {
  return (
    <div className="p-4 pt-0 m-1">
      {isLoading ? (
        <div className="text-text-subtitle text-sm animate-pulse py-4">
          Buscando livros...
        </div>
      ) : livros.length === 0 ? (
        <div className="text-text-subtitle text-sm py-2">
          Nenhum livro encontrado para essa pesquisa.
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {livros.map((livro, _index) => {
              if (isExpanded) {
                return (
                  <BookSearchDetailedCard
                    key={`expanded-${livro.id}-${livro.titulo}`}
                    id={String(livro.id)}
                    title={livro.titulo}
                    author={`${livro.autores && livro.autores.length > 0 ? (livro.autores.length <= 3 ? livro.autores.map((autor) => autor.nome).join(', ') : livro.autores[0].nome) : 'Autor Desconhecido'}`}
                    cover={livro.urlCapaDoLivro}
                    editora={livro.editora}
                    numeroPaginas={livro.numeroDePaginas}
                    anoPublicacao={livro.anoDePublicacao}
                  />
                );
              }
              return (
                <BookSearchCard
                  key={`${livro.editora}-${livro.titulo}`}
                  id={String(livro.id)}
                  title={livro.titulo}
                  author={`${livro.autores && livro.autores.length > 0 ? (livro.autores.length <= 3 ? livro.autores.map((autor) => autor.nome).join(', ') : `${livro.autores[0].nome}, e outros.`) : 'Autor desconhecido'}`}
                  cover={livro.urlCapaDoLivro}
                />
              );
            })}
          </div>

          {!isExpanded && totalElements > 5 && (
            <div className="flex justify-center pt-2">
              <button
                onClick={onExpand}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-text-primary bg-search-border border border-border rounded-md hover:opacity-90 transition-all cursor-pointer shadow-xs"
              >
                <Maximize2 size={14} />
                Ver todos os {totalElements} resultados
              </button>
            </div>
          )}

          {isExpanded && totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4 border-t border-border-default/50">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="p-2 rounded-md hover:bg-search-border disabled:opacity-40 disabled:hover:bg-transparent text-text-primary transition-colors cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => onPageChange(index)}
                    className={`w-8 h-8 rounded-md text-sm font-medium transition-all ${
                      currentPage === index
                        ? 'bg-search-border border border-border text-text-primary cursor-pointer'
                        : 'text-text-subtitle hover:bg-search-border/50 cursor-pointer'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                className="p-2 rounded-md hover:bg-search-border disabled:opacity-40 disabled:hover:bg-transparent text-text-primary transition-colors cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
