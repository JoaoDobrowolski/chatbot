export async function fetchRegister(data) {
  try {
    const response = await fetch('/api/user/register', {
      method: 'POST',
      body: JSON.stringify(data)
    });

    const json = await response.json();

    if (response.status !== 201) {
      throw new Error(json);
    }

    return json;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function fetchLogin(data) {
  try {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify(data)
    });

    const json = await response.json();

    if (response.status !== 201) {
      throw new Error(json);
    }

    return json;
  } catch (err) {
    throw new Error(err.message);
  }
}