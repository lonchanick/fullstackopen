const Note = ({ note,toggleImportance, deleteNote}) => { 
  const buttonText = note.important ? "Make not important" : "Make important";
  return (
    <li className="note" >
      {`content: ${note.content.slice(0, 15)}`}<br></br>
      {`id: ${note.id}`}
      <button onClick={()=> toggleImportance(note._id)}>{buttonText}</button>
      <button onClick={()=> deleteNote(note.id)}>Delete</button>
    </li>
  );
};

export default Note;
