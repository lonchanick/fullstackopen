const Note = ({ note }) => {
  return (
    <li style={note.important ? { color: "#fae1dd" } : { color: "#d90429" }}>
      {note.content.slice(0, 15)}
    </li>
  );
};

export default Note;
