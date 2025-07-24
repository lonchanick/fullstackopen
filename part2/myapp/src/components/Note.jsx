const Note = ({ note,toggleImportance, deleteNote}) => {
  const buttonText = note.important ? "Make not important" : "Make important"
  return (
    <li className="note">
      {note.content.slice(0, 15)}
      <button onClick={()=> toggleImportance(note.id)}>{buttonText}</button>
      <button onClick={()=> deleteNote(note.id)}>Delete</button>
    </li>
  );
};

export default Note;
