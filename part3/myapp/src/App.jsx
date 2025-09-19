import { useState, useEffect } from "react"; 
import phoneService from './services/phone'
import Notifications from "./components/Notifications";
import './index.css'

let typeOfNotification = "";

const App = () => {
  const [person, setNewPerson] = useState([]);
  const [newPersonInput, setNewPersonInput] = useState("");
  const [newNumberInput, setNewNumberInput] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(""); 

  const persons = () => {
    phoneService.getAll()
    .then(response => { 
      setNewPerson(response)
    })
  }

  useEffect(persons, []);

  const filteredPersons = person.filter((person) =>{
    return person.name.toLowerCase()
    .startsWith(filter.toLowerCase())
  });

  const onChangeNewPersonInput = (event) => { 
    setNewPersonInput(event.target.value);
  };
  const onChangeNewNumberInput = (event) => { 
    setNewNumberInput(event.target.value);
  };
  const onChangeFilter = (event) => { 
    setFilter(event.target.value);
  };

  //on creating a new record
  const onSubmitForm = (event) => {
    event.preventDefault();
    const alreadyExist = person.find((p) => p.name === newPersonInput);
    
    if (alreadyExist) {
      const confirmResult = confirm(`${newPersonInput} already exist, replace the old number with the new one?`);
      if(confirmResult)
      {
        const newPerson = {...alreadyExist, number: newNumberInput}; 
        phoneService.update(alreadyExist.id, newPerson)
        .then(() => {  
          setNewPerson(person.map(per => per.id !== alreadyExist.id ? per : newPerson));
          setNewPersonInput("");
          setNewNumberInput("");
          //notification
          typeOfNotification="succeed";
          setNotificationMessage("Succefully edited!");
          setTimeout(()=>{
          setNotificationMessage("")
          }, 3000)
        })
        .catch(() => {
          typeOfNotification="error";
          setNotificationMessage(`${newPersonInput} has been already removed from server.`);
          setTimeout(()=>{
          setNotificationMessage("")
          }, 3000)
        })
        return;
      } 
    }

    const newPerson = {
      //id: person.length + 1,
      name: newPersonInput,
      number: newNumberInput,
    };

    phoneService.push(newPerson)
    .then(response => { 
      newPerson.id = response.id;
      setNewPerson(person.concat(newPerson));
      setNewPersonInput("");
      setNewNumberInput("");
      //notification
      typeOfNotification="succeed";
      setNotificationMessage("Succefully Added!");
      setTimeout(()=>{
      setNotificationMessage("")
      }, 3000)
    });
  };

  const remove = (id)=>{
    phoneService.remove(id)
    .then(() => {
      //notification
      typeOfNotification="succeed";
      setNotificationMessage('Successfully removed!')
      setTimeout(()=>{
        setNotificationMessage("")
      }, 3000)

      setNewPerson(person.filter(per => per.id !== id));
    })
  }

  return (
    <>
      {notificationMessage && 
      <Notifications 
      message={notificationMessage}
      typeOfNotification={typeOfNotification}
      />}

      <h2>PhoneBook</h2>
      <SearchComponent filter={filter} onChangeFilter={onChangeFilter} />

      <h2>Add New</h2>
      <NewPersonForm
        onSubmitForm={onSubmitForm}
        newPersonInput={newPersonInput}
        onChangeNewPersonInput={onChangeNewPersonInput}
        newNumberInput={newNumberInput}
        onChangeNewNumberInput={onChangeNewNumberInput}
      ></NewPersonForm>

      <h2>Numbers</h2>
      <RenderContacts filteredPersons = {filteredPersons} remove={remove}/>
    </>
  );
};

const SearchComponent = ({ filter, onChangeFilter }) => {
  return (
    <form>
      Filter: <input type="text" value={filter} onChange={onChangeFilter} />
    </form>
  );
};

const NewPersonForm = (props) => { 
  return (
    <form onSubmit={props.onSubmitForm}>
      Name:{" "}
      <input
        value={props.newPersonInput}
        onChange={props.onChangeNewPersonInput}
      />
      <br></br>
      Number:{" "}
      <input
        value={props.newNumberInput}
        onChange={props.onChangeNewNumberInput}
      />
      <br></br>
      <button type="submit">Submit</button>
    </form>
  );
};

const RenderContacts = (props) => {
  return props.filteredPersons.map((person) => (
    <p key={person.id}>
      {person.name} {person.number}  
      <button onClick={()=>props.remove(person.id)}>Delete</button>
    </p>
  ));
};

export default App;
