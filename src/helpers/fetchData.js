export async function fetchRegister(data) {
  try {
    const response = await fetch('/api/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
      headers: { 'Content-Type': 'application/json' },
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

export async function fetchChat() {
  try {
    const response = await fetch('/api/user/chat', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error fetching chat data');
    }

    const jsonData = await response.json();

    return jsonData;
  } catch (err) {
    throw new Error(err.message || 'Unknown error occurred');
  }
}