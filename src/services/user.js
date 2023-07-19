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
    const registered = await userModel.find({ username: body.username });
    if (registered.length > 0) throw new Error('User already registered');
    if (body.password.length < 6) throw new Error('Password must contain at least 6 digits');
    const newUser = new userModel(body);
    await newUser.save();
    const token = createToken(body);
    return token;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function login(body) {
  try {
    await dbConnection();
    const userLoginArray = await userModel.find({ username: body.username });
    const userLogin = userLoginArray[0];
    if (!userLogin) throw new Error('User not found');
    if (userLogin.password !== body.password) throw new Error('Incorrect password');

    const token = createToken(userLogin);
    return token;
  } catch (err) {
    throw new Error(err.message);
  }
}
