'use client';

import { useEffect, useRef } from 'react';

interface TermsModalProps {
  isOpen: boolean;
  title: string;
  content: string;
  onClose: () => void;
}

export function TermsModal({
  isOpen,
  title,
  content,
  onClose,
}: TermsModalProps) {
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

  return (
    <dialog ref={dialogRef} onClose={onClose}>
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
        <div className="bg-card-bg border border-border rounded-2xl p-6 w-full max-w-[536px] h-[320px] flex flex-col gap-2 relative">
          <h2 className="text-text-primary text-2xl font-semibold mb-4">
            {title}
          </h2>

          <hr className="border-border mb-4" />

          <div className="flex-1 overflow-y-auto whitespace-pre-line text-text-primary text-sm leading-6 pr-2">
            {content}
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-background-secondary border border-border rounded-lg text-text-primary hover:opacity-80"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
