import { useState } from "react";

const App = () => {
  const [person, setNewPerson] = useState([{ id: 0, name: "Agustin" }]);
  const [newPersonInput, setNewPersonInput] = useState("");

  const onChangeNewPersonInput = (event) => {
    console.log(event.target.value);
    setNewPersonInput(event.target.value)
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
      name: newPersonInput
    }
    setNewPerson(person.concat(newPerson));
    setNewPersonInput('');
  }

  return (
    <>
      <h2>PhoneBook</h2>
      <form onSubmit={onSubmitForm}>
        Name: <input value={newPersonInput} onChange={onChangeNewPersonInput} />
        <button type="submit">Submit</button>
      </form>
      
      <h2>Numbers</h2>
      {person.map((person) => (
        <p key={person.id}>{person.name}</p>
      ))}
    </>
  );
};

export default App;
