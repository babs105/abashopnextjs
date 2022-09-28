import mongoose, { Schema, model, models } from "mongoose";
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
  roles: {
    type: Array,
    default: "ROLE_USER",
  },
  address: String,
  telephone: String,
  firstName: String,
  lastName: String,
});

const User = models.User || model("User", userSchema);
export default User;
