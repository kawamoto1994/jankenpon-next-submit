"use client";

import type { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  title: ReactNode;
  closeLabel: string;
  onClose: () => void;
  children?: ReactNode;
}

const Modal = (props: ModalProps) => {
  const { open, title, closeLabel, onClose, children } = props;

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
      role="presentation"
    >
      <section
        aria-labelledby="modal-title"
        aria-modal="true"
        role="dialog"
        className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl"
      >
        <h2 id="modal-title" className="text-xl font-bold text-gray-900">
          {title}
        </h2>
        {children && (
          <div className="mt-4 text-base leading-relaxed text-gray-600">
            {children}
          </div>
        )}
        <button
          type="button"
          className="mt-6 flex w-full items-center justify-center rounded-full bg-black px-6 py-3 text-base font-bold text-white transition hover:bg-gray-800"
          onClick={onClose}
        >
          {closeLabel}
        </button>
      </section>
    </div>
  );
};

export default Modal;
