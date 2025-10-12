import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";

import "./index.css";
import ErrNotification from "./components/ErrNotification";
import Footer from "./components/Footer";

export const Total = ({ course }) => {
  const ex = course.map((el) => el.exercises);
  return <strong>Total of {ex.reduce((acc, n) => acc + n)} exercises.</strong>;
};

const App = () => {
  //states; a piece of state x 3
  const [notes, setNotes] = useState([]);
  const [newNote, setNewnote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("some error here");

  useEffect(() => {
    noteService.getAll().then((response) => setNotes(response));
  }, []);

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const addNote = (event) => {
    event.preventDefault();

    if (newNote === "") {
      alert("empty note");
      return;
    }

    const newNoteObj = {
      content: newNote,
      important: Math.random() > 0.5,
    };

    noteService.create(newNoteObj).then((resp) => {
      setNotes([...notes, resp]);
      setNewnote("");
    });
  };

  const toggleImportance = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((data) => {
        setNotes(notes.map((n) => (n.id === id ? data : n)));
      })
      .catch(() => {
        setErrorMessage(`${note.content} was already removed from server`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const deleteNote = (id) => {
    noteService.remove(id).then(() => {
      setNotes(notes.filter((n) => n.id !== id));
    });
  };

  const handlerNoteChange = (event) => {
    setNewnote(event.target.value);
  };

  return (
    <>
      <span>
        <code>LAB</code>
        <ErrNotification message={errorMessage}></ErrNotification>
      </span>
      <span>
        <h1>Notes App</h1>
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? "Important" : "All"}
        </button>
      </span>
      {notesToShow.map((note) => (
        <Note
          key={note.id}
          note={note}
          toggleImportance={toggleImportance}
          deleteNote={deleteNote}
        />
      ))}

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handlerNoteChange} />

        <button type="submit">submit</button>
      </form>
      <Footer />
    </>
  );
};

export default App;
