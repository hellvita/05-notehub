import { fetchNotes } from "../../services/noteService";
// import { useState } from "react";
// import { fetchNotes, createNote, deleteNote } from "../../services/noteService";
import css from "./App.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NoteList from "../NoteList/NoteList";

export default function App() {
  // const [currentPage, setCurrentPage] = useState(1);

  const { data } = useQuery({
    queryKey: ["notes"],
    queryFn: () => fetchNotes({ page: 6 }),
    placeholderData: keepPreviousData,
  });

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
        {/* Пагінація */}
        {/* Кнопка створення нотатки */}
      </header>
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
