import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import { useEffect } from "react";
import NoteForm from "../NoteForm/NoteForm";
import type { NewNote } from "../../types/note";

interface ModalProps {
  onClose: () => void;
  onAdd: (note: NewNote) => void;
}

export default function Modal({ onClose, onAdd }: ModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <NoteForm onClose={onClose} onAdd={onAdd} />
      </div>
    </div>,
    document.body
  );
}
