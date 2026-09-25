import { X, BookX } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function Modal({ isOpen, onClose, onConfirm }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="bg-card-bg border border-border rounded-2xl p-6 w-full max-w-sm flex flex-col items-center gap-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-secondary hover:opacity-80 cursor-pointer"
        >
          <X size={16} />
        </button>

        {/* ícone */}
        <div className="w-14 h-14 bg-brand/15 rounded-2xl flex items-center justify-center">
          <BookX size={28} className="text-brand" />
        </div>

        <div className="text-center">
          <h2 className="text-text-primary font-semibold text-base mb-1">
            Livro não encontrado
          </h2>
          <p className="text-text-secondary text-sm">
            Livro não encontrado. Deseja cadastrar?
          </p>
        </div>

        <div className="flex gap-3 w-full mt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 text-sm text-text-primary border border-border rounded-lg hover:opacity-80 cursor-pointer"
          >
            Não
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 text-sm text-white bg-brand rounded-lg hover:brightness-110 cursor-pointer font-medium"
          >
            Sim, cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}
