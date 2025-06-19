import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const ListOfFriends = ({list}) =>(list.map(p => <p>{p.name} - {p.age}</p> ))
const App = ()=> {
  const data = [{id: 1, name:'Diego',age:22}, {id: 2, name:"Agustin",age:3}];
  return(
  <>
    <h1>Greetings</h1>
    <ListOfFriends list = {data} />
  </>);
};
 

export default App
