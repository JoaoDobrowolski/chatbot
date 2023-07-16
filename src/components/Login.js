import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import ChatBotContext from '@/context/ChatBotContext';

export default function Login({ ...props }) {
  const { formData, setFormData, setLogged } = useContext(ChatBotContext);

  // const [formData, setFormData] = useState({
  //   username: '',
  //   password: '',
  // });
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
      props.callbackParent(false);
      setLogged(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleForm}>
        <input
          type="text"
          placeholder="username"
          value={formData.username}
          required
          onChange={(event) => { handleFormEdit(event, 'username'); }}
          autoFocus="true"
        />
        <input
          type="password"
          placeholder="password"
          value={formData.password}
          required
          onChange={(event) => { handleFormEdit(event, 'password'); }}
        />
        <button>Sign In</button>
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