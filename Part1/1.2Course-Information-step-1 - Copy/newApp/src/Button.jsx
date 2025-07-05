
// const Button = (props) => <button onClick={props.fnReference}>{props.text}</button>
const Button = ({fnReference, text}) => <button onClick={fnReference}>{text}</button>

export default Button