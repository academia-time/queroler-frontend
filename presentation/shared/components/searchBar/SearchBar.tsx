'use client';
import { Search, ChevronDown, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useBebounce';

export enum Filtros {
  titulo = 'Título',
  autor = 'Autor(a)',
  editora = 'Editora',
  isbn = 'ISBN',
}

interface SearchBarProps {
  onSearch: (filtro: keyof typeof Filtros, termo: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [filtroOpen, setFiltroOpen] = useState(false);
  const [filtroSelecionado, setFiltroSelecionado] = useState<
    'titulo' | 'autor' | 'editora' | 'isbn'
  >('titulo');
  const [query, setQuery] = useState('');

  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    onSearch(filtroSelecionado, debouncedQuery);
  }, [debouncedQuery, filtroSelecionado, onSearch]);

  return (
    <div className="relative">
      <div className="flex items-center gap-2 m-1 mb-4 px-2 py-2 lg:px-3 lg:py-3">
        <div className="flex-1 flex items-center gap-2 bg-card-bg border border-border-default rounded-sm px-1 py-1 lg:px-4 lg:py-3">
          <Search size={16} className="text-text-secondary" />
          <input
            data-testid="search-input"
            type="text"
            placeholder="Pesquisar na sua biblioteca"
            className="flex-1 bg-transparent text-text-primary text-xs outline-none placeholder:text-text-secondary"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </div>
        <div className="relative w-[20px] lg:w-[110px]">
          <div
            onClick={() => setFiltroOpen(!filtroOpen)}
            className="w-full flex items-center justify-between bg-darker-gray rounded px-1 py-2 lg:px-4 lg:py-4 cursor-pointer"
          >
            <span className="text-text-primary text-sm hidden lg:block">
              {Filtros[filtroSelecionado]}
            </span>
            <ChevronDown size={14} className="text-text-secondary" />
          </div>
          {filtroOpen && (
            <div className="absolute right-0 mt-2 w-[110px] bg-card-bg border border-border rounded-lg shadow-lg z-50 flex flex-col p-1 flex flex-col p-1">
              {Object.entries(Filtros).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => {
                    setFiltroSelecionado(key as keyof typeof Filtros);
                    setFiltroOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs rounded-lg flex items-center justify-between
                  ${
                    filtroSelecionado === key
                      ? 'text-text-primary bg-search-border'
                      : 'text-text-primary hover:opacity-80'
                  }`}
                >
                  {value}
                  {filtroSelecionado === key && (
                    <Check size={14} className="text-text-primary" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
