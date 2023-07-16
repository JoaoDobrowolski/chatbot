import React, { useState } from 'react';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
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
      // send prop -> chat container 'showLogin' to false
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleForm}>
        <input
          type="email"
          placeholder="email"
          value={formData.email}
          required
          onChange={(event) => { handleFormEdit(event, 'email'); }}
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