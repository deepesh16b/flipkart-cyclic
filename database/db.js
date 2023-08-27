import mongoose from "mongoose";

export const Connection = async (URL) => {
  // const URL = `mongodb+srv://${user}:${password}@cluster0.ipejxz2.mongodb.net/?retryWrites=true&w=majority`;
  // const URL = `mongodb+srv://${user}:${password}@cluster0.20fbcss.mongodb.net/?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (error) {
    console.log("Error while connection with database", error.message);
  }
};

export default Connection;
