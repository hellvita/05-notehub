export interface Note {
  readonly id?: string;
  title: string;
  content?: string;
  tag: NoteTag;
}

export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface ModalProps {
  onClose: () => void;
  onAdd: (note: Note) => void;
}
