import React from "react";
import MessengerSearchBar from "./MessengerSearchBar";
import ContactList from "./ContactList";


export default function Messenger() {
  
  

  return (
    <div className="messenger-container">
      <MessengerSearchBar />
      <ContactList />
    </div>
  );
}
