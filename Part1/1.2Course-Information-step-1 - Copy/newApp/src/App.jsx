import {useState} from 'react'
import Button from './Button' 

const anecdotesList = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

const MostVoted = ({anecdotesVotes}) => {
  let maxVal = {index: 0, val: 0};
  for(const [key, val] of Object.entries(anecdotesVotes))
  {
    if(val > maxVal.val)
      maxVal.index = key;
      maxVal.val = val;
  }
  console.log(anecdotesVotes);
  return (
    <div>
      <h1>Most Voted</h1>
      <p>{anecdotesList[maxVal.index]}</p>
    </div>
  )
}

const App = () =>{
  const [buttonState, setButtonState] = useState(0);
  const [anecdotesVotes, setVote] = useState({});

  const handlerSetVote = (indexParam) =>
  {
    const copy = {...anecdotesVotes} 
    copy[indexParam] = (copy[indexParam] | 0) + 1;
    setVote(copy);
  }

  const showAnecdote = (index)=>
  { 
    return (`${index}) ${anecdotesList[index]} has ${(anecdotesVotes[index] === undefined) 
      ? 0 
      : anecdotesVotes[index]} Votes`)
     
  }

  const index = Math.floor(Math.random() * anecdotesList.length);
  return(
    <>
    <h1>Random Anecdotes</h1>
    {showAnecdote(index)}<br></br>
    <Button fnReference={() =>  setButtonState(buttonState+1)} text = 'Show anecdote!'  />
    <Button fnReference={()=>handlerSetVote(index)} text = 'vote this one!'  />
    <MostVoted anecdotesVotes = {anecdotesVotes} />
    </>
  )
}

export default App