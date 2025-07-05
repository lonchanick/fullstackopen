import {useState} from 'react'
import Button from './Button'
import Anecdotes from './Anecdotes'



const App = () =>{
  const [buttonState, setButtonState] = useState(0);
  const showAnecdote = () => {
    setButtonState(buttonState+1)
  }
  return(
    <>
    <h1>Random Anecdotes</h1>
    <Anecdotes state = {buttonState}/>
    <Button fnReference={showAnecdote} text = 'Show anecdote!'  />
    </>
  )
}

export default App