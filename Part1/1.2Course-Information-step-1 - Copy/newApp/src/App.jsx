
import {useState} from 'react'
import Display from './Display';
import Button from './Button';

const App = () =>{
  const [counter, setCounter] = useState(0);
  console.log('rendering with counter value', counter)
  
  const increase = () => {
    console.log('increasing, value before', counter)
    setCounter(counter+1)
  }

  const decrease = () => {
    console.log('decreasing, value before', counter)
    setCounter(counter-1)
  }

  const resetCounter = ()=> {
    console.log('resetting to zero, value before', counter)
    setCounter(0)
  } 

  return(
    <> 
    <Display counter = {counter} />
    <Button onClick = {increase} text = 'Increase' /> 
    <Button onClick = {resetCounter} text = 'Reset' /> 
    <Button onClick = {decrease} text = 'decrease' /> 
    </>
  );
}

export default App