'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Arrow from '../assets/Arrow-right.svg';

export default function Form({ StrapiUrl, StrapiToken }) {
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [status, setStatus] = useState('');

  function nameIsValid() {
    const nameReg = new RegExp(/^[a-zA-ZÀ-ÿ -]+$/i);
    if (nameReg.test(newName)) {
      return true;
    } else {
      setStatus(`Nom et Prénom invalides`);
    }
  }

  function emailIsValid() {
    const emailReg = new RegExp(
      /^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$/i
    );
    if (emailReg.test(newEmail)) {
      return true;
    } else {
      setStatus(`Email invalide`);
    }
  }

  function validationForm() {
    if (nameIsValid() && emailIsValid()) {
      return true;
    }
  }

  function sendForm(e) {
    e.preventDefault();
    if (validationForm()) {
      let name = newName;
      let email = newEmail;
      let message = newMessage;
      let body = {
        data: {
          name,
          email,
          message,
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
            ? (setStatus('Message envoyé !'),
              setNewName(''),
              setNewEmail(''),
              setNewMessage(''))
            : console.log(
                `Status :${data.error.status}, Name: ${data.error.name}, Message:${data.error.message}`
              )
        );
    }
  }
  return (
    <div>
      <form className="form" onSubmit={sendForm}>
        <label htmlFor="name">Votre Nom et Prénom</label>
        <input
          id="name"
          type="text"
          placeholder="Ex: Martin Dupont"
          value={newName}
          onChange={(e) => setNewName(e.currentTarget.value)}
        />

        <label htmlFor="email">Votre email</label>
        <input
          id="email"
          type="text"
          placeholder="Ex: martin.dupont@gmail.com"
          value={newEmail}
          onChange={(e) => setNewEmail(e.currentTarget.value)}
        />

        <label htmlFor="message">Votre message</label>
        <textarea
          id="message"
          placeholder="Ecrivez votre message ici"
          cols="30"
          rows="10"
          value={newMessage}
          onChange={(e) => setNewMessage(e.currentTarget.value)}
        ></textarea>
        <div className="submit-area">
          <button type="submit" className="submit-button">
            Envoyer
            <Image className="submit-button-arrow" src={Arrow} alt=">" />
          </button>
        </div>

        <div className="status-form">
          <p>{status}</p>
        </div>
      </form>
    </div>
  );
}
