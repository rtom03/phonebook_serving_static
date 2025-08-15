import React from "react";

const PhoneBook = ({ phonebook, handleDelete }) => {
  return (
    <div>
      {phonebook.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </li>
      ))}
    </div>
  );
};

export default PhoneBook;
