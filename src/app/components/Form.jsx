'use client';
import { useState, useEffect } from 'react';

export default function Form({ StrapiUrl, StrapiToken }) {
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');

  function sendForm(e) {
    e.preventDefault();
    let name = newName;
    let email = newEmail;
    let body = {
      data: {
        name,
        email,
      },
    };
    fetch(`${StrapiUrl}/api/forms`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${StrapiToken}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) =>
        data.data != null
          ? console.log('Succès !')
          : console.log(data.error.message)
      )
      .then(() => {
        setNewName('');
        setNewEmail('');
      });
  }
  return (
    <div>
      <form className="form" onSubmit={sendForm}>
        <input
          type="text"
          placeholder="Enter new name"
          value={newName}
          onChange={(e) => setNewName(e.currentTarget.value)}
        />
        <input
          type="text"
          placeholder="Enter new email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.currentTarget.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
