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

  const toggleImportance = (id)=>
  {
    const note = notes.find(n => n.id === id); 
    const changedNote = {...note, important: !note.important};

    axios.put(`http://localhost:3001/notes/${id}`, changedNote)
    .then((response)=>{
      console.log(note);
      console.log(changedNote);
      setNotes(notes.map(n => n.id === id ? response.data : n))
    })
  }

  const deleteNote = (id)=> axios.delete(`http://localhost:3001/notes/${id}`);

  useEffect(() => { 
    axios
      .get('http://localhost:3001/notes')
      .then(response => { 
        setNotes(response.data)
      })
  }, []) 

  const notesToShow = showAll ? notes : notes.filter(note => note.important);


  const addNote = (event) => {
    event.preventDefault();
    
    if(newNote === '') 
      return;

    const newNoteObj = {
      //id: notes.length+1,
      content: newNote,
      important: Math.random() > 0.5
    }

    axios.post('http://localhost:3001/notes', newNoteObj)
    .then(resp => {
      console.log(resp)
      setNotes(notes.concat(newNoteObj));
      setNewnote('');
    });

    
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

      {notesToShow.map(note => <Note 
      key={note.id} 
      note={note} 
      toggleImportance={toggleImportance} 
      deleteNote={deleteNote}/>)}

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handlerNoteChange} />
        
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default App;
