export interface Note {
  readonly id?: number;
  title: string;
  content?: string;
  tag: NoteTag;
}

export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
