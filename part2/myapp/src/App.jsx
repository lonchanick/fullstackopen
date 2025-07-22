import { useState, useEffect } from 'react'
import axios from 'axios' 
import Note from './components/Note'  

export const Total = ({ course }) => {
  const ex = course.map((el) => el.exercises);
  return <strong>Total of {ex.reduce((acc, n) => acc + n)} exercises.</strong>;
};

 
const App = () => {
  //states; a piece of state x 3
  const [notes, setNotes] = useState([]);
  const [newNote, setNewnote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')

  const notesToShow = showAll ? notes : notes.filter(note => note.important);


  const addNote = (event) => {
    event.preventDefault();
    
    if(newNote === '') 
      return;

    const newNoteObj = {
      id: notes.length+1,
      content: newNote,
      important: Math.random() > 0.5
    }
    setNotes(notes.concat(newNoteObj));
    setNewnote('');
  };

  const handlerNoteChange = (event) => {
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
