import { fetchNotes } from "../../services/noteService";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NoteList from "../NoteList/NoteList";
import css from "./App.module.css";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import NoResultMessage from "../NoResultMessage/NoResultMessage";
import { Toaster } from "react-hot-toast";
import Pagination from "../Pagination/Pagination";

export default function App() {
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
    setCurrentPage(1);
  }, 1000);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
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
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
