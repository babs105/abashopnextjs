import mongoose from "mongoose";

export const connectMongo = async () => mongoose.connect(process.env.MONGO_URI);

// export default connectMongo;

global.mongoose = {
  conn: null,
  promise: null,
};

export default async function dbConnect() {
  if (global.mongoose && global.mongoose.conn) {
    console.log("Using Existing mongoose connection");
    return global.mongoose.conn;
  } else {
    console.log("Creatnig new mongoose connection");
    // const user = process.env.MONGODB_USER;
    // const password = process.env.MONGODB_PASSWORD;
    // const database = process.env.MONGODB_DATABASE;

    // const conString = `mongodb+srv://${user}:${password}@cluster0.8pl1w.mongodb.net/${database}?retryWrites=true&w=majority`;

    const promise = mongoose
      .connect(
        process.env.MONGO_URI,
        // conString
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          autoIndex: true,
        }
      )
      .then((mongoose) => mongoose);

    global.mongoose = {
      conn: await promise,
      promise,
    };

    return await promise;
  }
}
