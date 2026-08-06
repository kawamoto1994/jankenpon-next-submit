"use client";

import type { ReactNode } from "react";
import { useEffect, useId, useRef } from "react";

import Heading2 from "@/components/atoms/Heading2";
import PrimaryButton from "@/components/atoms/button/PrimaryButton";

interface ModalProps {
  open: boolean;
  title: ReactNode;
  closeLabel: string;
  onClose: () => void;
  children?: ReactNode;
}

const Modal = (props: ModalProps) => {
  const { open, title, closeLabel, onClose, children } = props;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (open && !dialog.open) {
      dialog.showModal();
      return;
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl backdrop:bg-black/50"
      onClose={onClose}
    >
      <Heading2 id={titleId}>{title}</Heading2>
      {children && (
        <div className="mt-4 text-base leading-relaxed text-gray-600">
          {children}
        </div>
      )}
      <PrimaryButton type="button" className="mt-6" onClick={onClose}>
        {closeLabel}
      </PrimaryButton>
    </dialog>
  );
};

export default Modal;
