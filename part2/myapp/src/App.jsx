import { useState } from "react";

const App = () => {
  const [person, setNewPerson] = useState([{ id: 0, name: "Agustin", number: "+593 2462050" }]);
  const [newPersonInput, setNewPersonInput] = useState("");
  const [newNumberInput, setNewNumberInput] = useState("");

  const onChangeNewPersonInput = (event) => {
    // console.log(event.target.value);
    setNewPersonInput(event.target.value)
  };
  const onChangeNewNumberInput = (event) => {
    // console.log(event.target.value);
    setNewNumberInput(event.target.value)
  };

  const onSubmitForm = (event)=>{
    event.preventDefault();
    const alreadyExist = person.find( p=> p.name === newPersonInput);
    
    if(alreadyExist)
    {
      alert(`${newPersonInput} already exist!`);
      return;
    }
    const newPerson = {
      id: person.length + 1,
      name: newPersonInput,
      number: newNumberInput
    }
    setNewPerson(person.concat(newPerson));
    setNewPersonInput('');
    setNewNumberInput('');
  }

  return (
    <>
      <h2>PhoneBook</h2>
      <form onSubmit={onSubmitForm}>
        Name: <input value={newPersonInput} onChange={onChangeNewPersonInput} /><br></br>
        Number: <input value={newNumberInput} onChange={onChangeNewNumberInput} /><br></br>
        <button type="submit">Submit</button>
      </form>
      
      <h2>Numbers</h2>
      {person.map((person) => (
        <p key={person.id}>{person.name} {person.number}</p>
      ))}
    </>
  );
};

export default App;
