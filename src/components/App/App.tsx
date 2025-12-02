// import { fetchNotes } from "../../services/noteService";
// import { createNote } from "../../services/noteService";

import { deleteNote } from "../../services/noteService";

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

      const deletedNote = await deleteNote("cmiox7cwf1dzlyy8u5nel2tcn");
      console.log("deletedNote: ", deletedNote);
    } catch (error) {
      console.log(error);
    }
  };
  handle();
  return <></>;
}
