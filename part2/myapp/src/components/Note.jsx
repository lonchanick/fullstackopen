const Note = ({note}) => <li>{note.content} {note.important?' TRUE':' FALSE'}</li>

export default Note