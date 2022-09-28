import User from "../models/user";
import dbConnect from "./connectMongo";

export const usersRepo = {
  getAllUsers,
  getUserById,
};

async function getAllUsers() {
  try {
    await dbConnect();
    const users = await User.find({});

    if (users) return users;
  } catch (error) {
    console.log("error db", error);
  }
}
async function getUserById(id) {
  try {
    await dbConnect();
    const user = await User.findOne({ _id: id });

    if (user) return user;
  } catch (error) {
    console.log("error db", error);
  }
}
