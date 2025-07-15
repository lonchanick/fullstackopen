import { useState } from "react";

const App = () => {
  const [person, setNewPerson] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  const [newPersonInput, setNewPersonInput] = useState("");
  const [newNumberInput, setNewNumberInput] = useState("");
  const [filter, setFilter] = useState("");

  const filterPersons = person.filter(person => 
    person.name.toLowerCase()
    .startsWith(filter.toLowerCase())); 

  const onChangeNewPersonInput = (event) => {
    // console.log(event.target.value);
    setNewPersonInput(event.target.value)
  };
  const onChangeNewNumberInput = (event) => {
    // console.log(event.target.value);
    setNewNumberInput(event.target.value)
  };
  const onChangeFilter = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value)
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
      <form >
        Filter: <input type="text" value={filter} onChange={onChangeFilter}/>
      </form>
      <h2>Add New</h2>
      <form onSubmit={onSubmitForm}>
        Name: <input value={newPersonInput} onChange={onChangeNewPersonInput} /><br></br>
        Number: <input value={newNumberInput} onChange={onChangeNewNumberInput} /><br></br>
        <button type="submit">Submit</button>
      </form>
      
      <h2>Numbers</h2>
      {filterPersons.map((person) => (
        <p key={person.id}>{person.name} {person.number}</p>
      ))}
    </>
  );
};

export default App;
