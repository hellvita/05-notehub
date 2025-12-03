import { createNote, deleteNote, fetchNotes } from "../../services/noteService";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import {
  keepPreviousData,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import NoteList from "../NoteList/NoteList";
import css from "./App.module.css";
import Modal from "../Modal/Modal";
import type { Note } from "../../types/note";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", currentPage],
    queryFn: () => fetchNotes({ page: currentPage }),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (note: Note) => createNote(note),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notes", currentPage] }),
  });
  const handleAddNote = (note: Note) => {
    createMutation.mutate(note);
  };

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => deleteNote(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notes", currentPage] }),
  });
  const handleDeleteNote = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {isSuccess && totalPages > 1 && (
          <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => setCurrentPage(selected + 1)}
            forcePage={currentPage - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            nextLabel="→"
            previousLabel="←"
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {data && data.notes.length > 0 && (
        <NoteList notes={data.notes} onDelete={handleDeleteNote} />
      )}
      {isModalOpen && <Modal onClose={closeModal} onAdd={handleAddNote} />}
    </div>
  );
}
