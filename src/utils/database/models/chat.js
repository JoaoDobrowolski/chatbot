import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  conversation: { type: Array, required: true },
  username: { type: String, required: true },
  date: { type: String, required: true }
});

const chatModel = mongoose.models.Chat || mongoose.model('Chat', UserSchema);

export default chatModel;