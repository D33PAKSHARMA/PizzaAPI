import mongoose, { Schema } from "mongoose";

const user = new mongoose.Schema({
  name: {
    type: String,
    requred: true,
  },
  email: {
    type: String,
    requred: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userSchema = mongoose.model("user", user);
export default userSchema;
