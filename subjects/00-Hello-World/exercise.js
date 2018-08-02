////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - change the contents of the render function and save the file
// - see the updates automatically in your browser without refreshing!
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";

const contacts = [
  { id: 1, name: "Michael Jackson" },
  { id: 2, name: "Elvis Presley" },
  { id: 3, name: "Taylor Swift" }
];

function ContactList() {
  return (
    <div>
      <h1>Contacts</h1>
      {contacts.map(contact => (
        <div key={contact.id} onClick={() => console.log(contact.name)}>
          {contact.name.toUpperCase()}
        </div>
      ))}
    </div>
  );
}

const element = <ContactList />;

ReactDOM.render(element, document.getElementById("app"));
