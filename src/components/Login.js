import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import ChatBotContext from '@/context/ChatBotContext';

export default function Login({ ...props }) {
  const { formData, setFormData, setLogged } = useContext(ChatBotContext);

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
      props.callbackParent();
      setLogged(true);
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
        <button
          className="border m-1 mt-5 bg-purple-700 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-purple-800 transition-colors duration-300"
        >
          Sign In</button>
        {error && (
          <p>{error}</p>
        )}
      </form>
    </div>
  );
}

Login.propTypes = {
  callbackParent: PropTypes.func.isRequired,
};