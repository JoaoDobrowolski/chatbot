'use client';
import React, { useContext, useState } from 'react';
import ChatBotContext from '@/context/ChatBotContext';
import { fetchRegister } from '@/helpers/fetchData';

export default function Register() {
  const { formData, setFormData, setLogged, setShowRegister, setShowLogin } = useContext(ChatBotContext);

  const [error, setError] = useState('');

  const handleFormEdit = (event, name) => {
    setFormData({
      ...formData,
      [name]: event.target.value
    });
  };

  const handleForm = async (event) => {
    try {
      event.preventDefault();

      await fetchRegister(formData);

      setLogged(false);
      setShowRegister(false);
      setShowLogin(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleForm} className="p-3" >
        <input
          className="flex-grow px-4 py-2 bg-transparent focus:outline-none border rounded m-1"
          type="text"
          placeholder="username"
          value={formData.username}
          required
          onChange={(event) => { handleFormEdit(event, 'username'); }}
          autoFocus="true"
        />
        <input
          className="flex-grow px-4 py-2 bg-transparent focus:outline-none border rounded m-1"
          type="password"
          placeholder="password"
          value={formData.password}
          required
          onChange={(event) => { handleFormEdit(event, 'password'); }}
        />
        <div className="flex items-center justify-between">
          <button
            className="border m-1 mt-5 bg-purple-700 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-purple-800 transition-colors duration-300"
          >
            Sign Up</button>
          <button
            className="p-5 pt-7 pr-10 cursor-pointer"
            onClick={() => {
              setShowLogin(true);
              setShowRegister(false);
            }}
          >
            Been here before?</button>
        </div>
        {error && (
          <p>{error}</p>
        )}
      </form>
    </div>
  );
}
