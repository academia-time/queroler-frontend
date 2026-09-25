'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Paginação"
      className="flex items-center justify-center gap-1 mt-10"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
        className="flex items-center justify-center w-7 h-7 text-text-primary hover:text-text-secondary disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
      >
        <ArrowLeft size={16} />
      </button>

      {pages.map((page) => {
        const isActive = page === currentPage;

        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={isActive ? 'page' : undefined}
            className={`flex items-center justify-center w-7 h-7 text-sm rounded-full transition-colors cursor-pointer ${
              isActive
                ? 'text-brand font-bold'
                : 'text-text-primary hover:text-text-secondary'
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Próxima página"
        className="flex items-center justify-center w-7 h-7 text-text-primary hover:text-text-secondary disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
      >
        <ArrowRight size={16} />
      </button>
    </nav>
  );
}
