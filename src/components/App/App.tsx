import { createNote, deleteNote, fetchNotes } from "../../services/noteService";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
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
import SearchBox from "../SearchBox/SearchBox";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import NoResultMessage from "../NoResultMessage/NoResultMessage";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  // toast("i'm toast", {
  //   style: {
  //     borderColor: "#d32f2f",
  //   },
  // });
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["notes", currentPage, searchQuery],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        search: searchQuery !== "" ? searchQuery : undefined,
      }),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
  }, 1000);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (note: Note) => createNote(note),
    onSuccess: (newNote) => {
      queryClient.invalidateQueries({ queryKey: ["notes", currentPage] });
      toast(`The '${newNote.title}' note has been added!`);
    },
    onError: () =>
      toast("Could not save changes, please try again...", {
        style: {
          borderColor: "#d32f2f",
        },
      }),
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
        <SearchBox query={searchQuery} onSearch={handleSearch} />
        <Toaster
          toastOptions={{
            className: `${css.toast}`,
          }}
        />
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
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isSuccess && data.notes.length === 0 && searchQuery !== "" && (
        <NoResultMessage invalidQuery={searchQuery} />
      )}
      {data && data.notes.length > 0 && (
        <NoteList notes={data.notes} onDelete={handleDeleteNote} />
      )}
      {isModalOpen && <Modal onClose={closeModal} onAdd={handleAddNote} />}
    </div>
  );
}
