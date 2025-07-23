import { useState, useEffect } from 'react' 
import Note from './components/Note'
import noteService  from './services/notes'

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
      noteService.getAll().then(response => setNotes(response));
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

    noteService.create(newNoteObj)
    .then(resp => { 
      setNotes(notes.concat(resp));
      setNewnote('');
    });
  };

  const toggleImportance = (id)=>
  {
    const note = notes.find(n => n.id === id); 
    const changedNote = {...note, important: !note.important};

    noteService.update(id,changedNote)
    .then((data)=>{
      setNotes(notes.map(n => n.id === id ? data : n))
    })
  }

  const deleteNote = (id)=> {
    noteService.remove(id)
    .then(resp => {
      //nota: no se re-renderiza la pantalla
      console.log(resp);
      const newArray = notes.filter(n => n.id !== resp)
      setNotes(newArray);
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
