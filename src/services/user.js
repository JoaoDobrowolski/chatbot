import dbConnection from '@/utils/database/config/database';
import userModel from '@/utils/database/models/user';
import jwt from 'jsonwebtoken';

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

export async function register(body) {
  try {
    await dbConnection();
    console.log('Registering user:', body);
    const registered = await userModel.find({ username: body.username });
    if (registered.length > 0) throw new Error('User already registered');
    const newUser = new userModel(body);
    console.log('New user:', newUser);
    const savedUser = await newUser.save();
    console.log('Saved user:', savedUser);
    const token = createToken(body);
    return token;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function login(body) {
  await dbConnection();
  const userLoginArray = await userModel.find({ username: body.username });
  const userLogin = userLoginArray[0];
  console.log('User Login', userLogin);
  console.log('body', body);
  if (!userLogin) throw new Error('User not found');
  if (userLogin.password !== body.password) throw new Error('Incorrect password');

  const token = createToken(userLogin);
  return token;
}

export async function chat() {
  await dbConnection();

  const data = await userModel.find().lean();
  if (!data) throw new Error('data not found');

  return (data);
}