'use client';

import { Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface ReportBookReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ReportBookReviewModal({
  isOpen,
  onClose,
  onConfirm,
}: ReportBookReviewModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const [spoiler, setSpoiler] = useState<boolean>(false);
  const [inadequado, setInadequado] = useState<boolean>(false);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="bg-transparent p-0 m-auto backdrop:bg-black/60"
    >
      <div className="bg-secondary-bg border border-border rounded-2xl p-6 w-full max-w-lg max-h-md flex flex-col gap-4 relative overflow-hidden">
        <div>
          <h2 className="text-text-primary font-semibold text-base pb-2">
            Denunciar Resenha
          </h2>
          <div className="mx-full h-px bg-text-secondary" />

          <p className="text-text-primary text-sm py-4">
            Selecione o motivo da denúncia:
          </p>

          <div className="w-full max-w-md py-4 rounded-xl space-y-3">
            <label className="flex items-center space-x-3 p-4 rounded-xl bg-background border border-border text-text-secondary cursor-pointer select-none">
              <input
                type="checkbox"
                checked={spoiler}
                onChange={(e) => setSpoiler(e.target.checked)}
                className="sr-only"
              />
              <div className="flex items-center justify-center w-6 h-6 rounded-md border border-border/50">
                {spoiler && <Check className="w-4 h-4 stroke-3" />}
              </div>
              <span className="text-sm">Spoiler não sinalizado</span>
            </label>

            <label className="flex items-center space-x-3 p-4 rounded-xl bg-background border border-border text-text-secondary cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inadequado}
                onChange={(e) => setInadequado(e.target.checked)}
                className="sr-only"
              />
              <div className="flex items-center justify-center w-6 h-6 rounded-md border border-border/50">
                {inadequado && <Check className="w-4 h-4 stroke-3" />}
              </div>
              <span className="text-sm">Conteúdo inadequado.</span>
            </label>

            {(spoiler || inadequado) && (
              <>
                <p className="text-text-primary text-sm">Descreva o problema</p>
                <textarea
                  data-testid="input-report"
                  placeholder="Descreva o problema (você pode colar parte do texto)"
                  rows={7}
                  className="bg-card-bg border border-border rounded px-2 py-1 lg:px-4 lg:py-3 text-text-primary text-xs outline-none placeholder:text-text-primary/50 w-full resize-none"
                />
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 w-full pt-2">
          <button
            onClick={onClose}
            className="w-full sm:w-auto py-2 px-6 text-text-primary bg-dark-purple border border-border rounded-lg hover:opacity-80 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="w-full sm:w-auto py-2 px-6 text-white bg-brand rounded-lg hover:brightness-110 cursor-pointer font-medium"
          >
            Enviar denúncia
          </button>
        </div>
      </div>
    </dialog>
  );
}
