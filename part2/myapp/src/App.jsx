import Course from "./components/Course";
import { useState } from "react";
import Note from './components/Note'

const Header = (props) => <h1>{props.course}</h1>;

const Content = (props) => (
  <div>
    <Part part={props.parts[0]} />
    <Part part={props.parts[1]} />
    <Part part={props.parts[2]} />
  </div>
);

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

export const Total = ({ course }) => {
  const ex = course.map((el) => el.exercises);
  return <strong>Total of {ex.reduce((acc, n) => acc + n)} exercises.</strong>;
};

const App = (props) => {
  //states; a piece of state x 3
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewnote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  const notesToShow = showAll 
  ? notes
  : notes.filter(note => note.important);

  console.log(notesToShow);

  const addNote = (event) => {
    event.preventDefault();
    
    if(newNote === '') 
      return;

    console.log("button clicked", event.target);
    const newNoteObj = {
      id: notes.length+1,
      content: newNote,
      important: Math.random() > 0.5
    }
    setNotes(notes.concat(newNoteObj));
    setNewnote('');
  };

  const handlerNoteChange = (event) => {
    console.log(event.target.value);
    setNewnote(event.target.value);
  };
 

  return (
    <>
      <span>
        <code>LAB</code>
      </span>
      <span>
      <h1>Notes App</h1>
      <button onClick={()=>setShowAll(!showAll)}>{showAll ? 'Important':'All'}</button>
      </span>

      {notesToShow.map(note => <Note key={note.id} note={note} />)}
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handlerNoteChange} />
        
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default App;
