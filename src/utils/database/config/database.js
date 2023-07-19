import mongoose from 'mongoose';

const PASSWORD = process.env.MONGOOSE_PASSWORD;
const DATABASE = 'mongoapp';

const URL = `mongodb+srv://joaodobrowolski:${PASSWORD}@chattt.sb2abpc.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;

const dbConnection = async () => {
  if (!global.mongoose) {
    mongoose.set('strictQuery', true); // to not show the annoying alert
    global.mongoose = await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
};

export default dbConnection;