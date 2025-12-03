import { fetchNotes } from "../../services/noteService";
import { useState } from "react";
// import { fetchNotes, createNote, deleteNote } from "../../services/noteService";
import ReactPaginate from "react-paginate";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NoteList from "../NoteList/NoteList";
import css from "./App.module.css";
import Modal from "../Modal/Modal";

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

  const handle = async () => {
    try {
      // const { notes, totalPages } = await fetchNotes({ page: currentPage });
      // console.log("totalPages: ", totalPages);
      // console.log("notes: ", notes);
      // console.log("note-1: ", notes[0]);
      // const createdNote = await createNote({
      //   title: "my custom note",
      //   tag: "Personal",
      // });
      // console.log("createdNote: ", createdNote);
      // const deletedNote = await deleteNote("cmiox7cwf1dzlyy8u5nel2tcn");
      // console.log("deletedNote: ", deletedNote);
    } catch (error) {
      console.log(error);
    }
  };
  handle();

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
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isModalOpen && <Modal onClose={closeModal} />}
    </div>
  );
}
