export interface Note {
  readonly id: number;
  title: string;
  content?: string;
  tag: string;
}

export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
