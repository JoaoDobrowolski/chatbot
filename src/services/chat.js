import dbConnection from '@/utils/database/config/database';
import chatModel from '@/utils/database/models/chat';

export async function getChat() {
  await dbConnection();

  const data = await chatModel.find().lean(); // .lean() returns JS, instead of Mongoose files
  if (!data) throw new Error('data not found');

  return (data);
}

export async function postChat(body) {
  try {
    await dbConnection();

    await chatModel.find().lean();

    const newChat = new chatModel(body);
    await newChat.save();

    return body;
  } catch (err) {
    throw new Error(err.message);
  }
}