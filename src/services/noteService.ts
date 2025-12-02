import axios from "axios";
import type { Note, NoteTag } from "../types/note";

const API_KEY = import.meta.env.VITE_NOTEHUB_TOKEN;

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${API_KEY}`;

interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

interface NotesParams {
  search?: string;
  tag?: NoteTag;
  page?: number;
  perPage?: number;
  sortBy?: "created" | "updated";
}

export const fetchNotes = async ({
  search,
  page,
  perPage,
  tag,
  sortBy,
}: NotesParams): Promise<NotesHttpResponse> => {
  const params: NotesParams = {
    search,
    page,
    perPage,
    tag,
    sortBy,
  };
  const { data } = await axios.get<NotesHttpResponse>("/notes", { params });
  return data;
};

export const createNote = async (note: Note): Promise<Note> => {
  const { data } = await axios.post<Note>("/notes", note);
  return data;
};
