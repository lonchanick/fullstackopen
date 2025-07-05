import {useState} from 'react'
import Button from './Button'
 
const App = () =>{
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const evHandSetGood = (val)=> setGood(val);
  const evHandSetNeutral = (val)=> setNeutral(val);
  const evHandSetBad = (val)=> setBad(val);

  return(
    <>
    <code>Exercise 1.6</code>
    <h1>Give feedback</h1>
    <Button fnReference={()=>evHandSetGood(good +1)} text = 'Good'/>
    <Button fnReference={()=>evHandSetNeutral(neutral +1)} text = 'Neutral'/>
    <Button fnReference={()=>evHandSetBad(bad +1)} text = 'Bad'/>
    <h2>Statistics</h2>
    <p><span>Good:</span><span>{good}</span></p>
    <p><span>Neutral:</span><span>{neutral}</span></p>
    <p><span>Bad:</span><span>{bad}</span></p> 
    </>
  )
}

export default App