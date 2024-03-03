import { useEffect, useState } from "react";

export function ContactList() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3005/contacts')
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => console.error('Error fetching contacts:', error));
  }, []);
  return (
    <div className="container my-4">
      <h2>Contact List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
            <th>phone</th>
            <th>Subject</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.id}</td>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.subject}</td>
              <td>{contact.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>)
}