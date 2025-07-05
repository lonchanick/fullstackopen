import {useState} from 'react'
import Button from './Button'
 
const App = () =>{
  const [val, setVal] = useState(0);

  const clickHandler = (num)=> setVal(num)

  return(
    <>
    <p>{val}</p>
    <Button fnReference = {()=> clickHandler(1000)} text = 'Set to 1.000' /><br></br>
    {/* <button onClick = {()=>clickHandler(1000)} >Set to 1.000</button> */}
    <Button fnReference = {()=> clickHandler(0)} text = 'Set to 0' /><br></br>
    {/* <button onClick = {()=>clickHandler(0)} >Set to 0</button> */}
    <Button fnReference = {()=> clickHandler(val+1)} text = 'Increment' /><br></br>
    {/* <button onClick = {()=>clickHandler(val+1)} >Increment + 1</button> */}
    </>
  )
}

export default App