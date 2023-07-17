import jwt from 'jsonwebtoken';

let users = [];

const SECRET = process.env.JWT_SECRET;

function createToken(user) {
  return jwt.sign({ username: user.username }, SECRET);
}

function readToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    throw new Error('Invalid token');
  }
}

export function verification(token) {
  return readToken(token);
}

export function register(body) {
  const user = users.find(({ username }) => username === body.username);
  if (user) throw new Error('User already registered');

  users.push(body);

  const token = createToken(body);
  return token;
}

export function login(body) {
  const user = users.find(({ username }) => username === body.username);
  if (!user) throw new Error('User not found');
  if (user.password !== body.password) throw new Error('Incorrect password');

  const token = createToken(user);
  return token;
}