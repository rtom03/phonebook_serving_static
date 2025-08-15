import { useState } from "react";
import PhoneBook from "./components/PhoneBook";
import Filter from "./components/Filter";
import Form from "./components/Form";
import { create, getAll, recycle, update } from "./services/personsService.js";
import Toast from "./components/Toast.jsx";
import ExchangeRate from "./demo/ExchangeRate.jsx";
// import Toast from "./components/Toast.jsx";
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "456-980-201", id: "io9" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  getAll().then((response) => setPersons(response.data));

  const handleSubmit = (event) => {
    event.preventDefault();
    const newObject = {
      name: newName,
      number: newNumber,
    };
    const existedName = persons.some((name) => name.name === newObject.name);
    if (existedName) {
      const person = persons.find((person) => person.name === newObject.name);
      const updatedInfo = { ...person, number: newObject.number };
      // console.log("UPDATED", updatedInfo, "ID:", id);
      window.confirm(
        `${newObject.name} already has a number! would you like to replace the old number with a new one?`
      )
        ? update(person.id, updatedInfo)
            .then((response) =>
              setPersons(
                persons.map((ps) => (ps.id === person.id ? response.data : ps))
              )
            )
            .catch((error) => {
              setErrorMessage(
                `Information on ${newObject.name} has been removed from the server`
              );
              console.log(error);
              setTimeout(() => {
                setErrorMessage(null);
              }, 3000);
            })
        : "";
    } else {
      create(newObject).then((response) =>
        setPersons(persons.concat(response.data))
      );
      setPersons(persons.concat(newObject));
      setNewName("");
      setNewNumber("");
      setSuccessMessage(`${newObject.name} added`);
      setTimeout(() => {
        setSuccessMessage(null); // clears the message
      }, 3000);
    }
  };

  const handleChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumChange = (event) => {
    setNewNumber(event.target.value);
  };

  const getSearch = (event) => {
    event.preventDefault();
    const existData = persons.filter(
      (ps) => ps.name.toLocaleLowerCase() === search
    );
    console.log(existData);
    setSearchData(searchData.concat(existData));
  };
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleRecycle = (id) => {
    const person = persons.filter((person) => person.id === id);

    window.confirm(`Delete ${person.map((p) => p.name).join(", ")}?`)
      ? recycle(id).then((response) => response.data)
      : "";
  };

  return (
    <div>
      <Toast message={!successMessage ? errorMessage : successMessage} />
      <h2>Phonebook</h2>

      <form onSubmit={getSearch}>
        filter shown with
        <input type="text" value={search} onChange={handleSearchChange} />
      </form>
      <Form
        value={newName}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        numValue={newNumber}
        handleNumChange={handleNumChange}
      />
      <h2>Numbers</h2>
      {!searchData.length ? (
        <>
          <PhoneBook phonebook={persons} handleDelete={handleRecycle} />
        </>
      ) : (
        <>
          <Filter filterData={searchData} />
        </>
      )}
      {/* <ExchangeRate /> */}
    </div>
  );
};

export default App;
