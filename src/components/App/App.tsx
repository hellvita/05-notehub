// import { fetchNotes } from "../../services/noteService";

import { createNote } from "../../services/noteService";

export default function App() {
  const handle = async () => {
    try {
      // const { notes, totalPages } = await fetchNotes({});
      // console.log("totalPages: ", totalPages);
      // console.log("notes: ", notes);
      // console.log("note-1: ", notes[0]);

      const createdNote = await createNote({
        title: "my custom note",
        tag: "Personal",
      });
      console.log("createdNote: ", createdNote);
    } catch (error) {
      console.log(error);
    }
  };
  handle();
  return <></>;
}
