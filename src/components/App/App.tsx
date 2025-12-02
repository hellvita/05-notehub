// import { fetchNotes, createNote, deleteNote  } from "../../services/noteService";
import css from "./App.module.css";

export default function App() {
  const handle = async () => {
    try {
      // const { notes, totalPages } = await fetchNotes({});
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
    </div>
  );
}
