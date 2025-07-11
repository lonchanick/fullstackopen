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
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewnote] = useState("a new note...");

  const addNote = (event) => {
    event.preventDefault();
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

  // const courses = [
  //   {
  //     name: "Half Stack application development",
  //     id: 1,
  //     parts: [
  //       {
  //         name: "Fundamentals of React",
  //         exercises: 10,
  //         id: 1,
  //       },
  //       {
  //         name: "Using props to pass data",
  //         exercises: 7,
  //         id: 2,
  //       },
  //       {
  //         name: "State of a component",
  //         exercises: 14,
  //         id: 3,
  //       },
  //       {
  //         name: "Redux",
  //         exercises: 11,
  //         id: 4,
  //       },
  //     ],
  //   },
  //   {
  //     name: "Node.js",
  //     id: 2,
  //     parts: [
  //       {
  //         name: "Routing",
  //         exercises: 3,
  //         id: 1,
  //       },
  //       {
  //         name: "Middlewares",
  //         exercises: 7,
  //         id: 2,
  //       },
  //     ],
  //   },
  // ];

  return (
    <>
      <span>
        <code>LAB</code>
      </span>
      <h1>Notes App</h1>

      {notes.map(note => <Note key={note.id} note={note} />)}
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handlerNoteChange} />
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default App;
