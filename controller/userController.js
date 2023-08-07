import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

const userController = {
  async registerUser(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name) return res.send({ message: "Name is Required" });
      if (!email) return res.send({ message: "Email is Requried!" });
      if (!password) return res.send({ message: "Password is Required!" });

      const user = await User.findOne({ email: email });
      if (user)
        res.status(400).send({ success: false, message: "User Already Exist" });

      const newUser = new User({
        name: name,
        email: email,
        password: await bcrypt.hash(password, 10),
      });

      await newUser.save();

      const token = jwt.sign(
        { _id: newUser._id, name: newUser.name, email: newUser.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.status(200).send({
        success: true,
        message: "User Register Sucessfully",
        token,
      });
    } catch (error) {
      console.log(error);
    }
  },

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      if (!email) return res.send({ message: "Email is Required!" });
      if (!password) return res.send({ message: "Password is Required!" });

      const user = await User.findOne({ email: email });
      if (!user) return res.status(400).send({ message: "User Not Found" });

      const matchpass = await bcrypt.compare(password, user.password);
      if (!matchpass)
        return res.send({
          success: false,
          message: "Invalid Email or Password",
        });

      const token = jwt.sign(
        { _id: user._id, name: user.name, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res
        .status(200)
        .send({ success: true, message: "User Login Successfully", token });
    } catch (error) {
      console.log(error);
    }
  },
};

export default userController;
