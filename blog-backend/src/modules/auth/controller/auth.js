import UserModel from "../../../../DB/model/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()
const {JWT_SECRET_KEY} = process.env;
export const getAuthModule = (req, res, next) => {
  return res.json({ message: "Auth module" });
};

export const register = async (req, res, next) => {
  try {
    const { username, password, email,confirm_pass } = req.body;
    if(password === confirm_pass){
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const passwordHash = await bcrypt.hash(password, salt);
       await UserModel.create({
        username,
        email,
        password: passwordHash,
      });
      return res
        .status(200)
        .json({ message: "Successfully Register Please Logged In "});

    }else{

      return res
      .status(404)
      .json({ message: "password not Match please try Again " });
    }

  } catch (err) {
    if (err.code == 11000) {
      return res.status(404).json({ message: "Email Exist please choose another email" });
    }

    return res.status(404).json({ message: "Catch Error", err });
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "Invalid Email or password" });
    }

    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!checkPassword) {
      return res.status(404).json({ message: "Invalid Email or password" });
    }

    const token = jwt.sign({
                              id: user._id,
                              name: user.username,
                              email: user.email,
                              role: user.role
                              // profilePicture: user.profilePicture,
                            },

                            JWT_SECRET_KEY,
             { expiresIn: "1hr" }
    );

            // res.cookie(String(user._id), 
            // token , 
            // {path: "/",
            //  expires: new Date(Date.now() + 1000 * 30),
            //  httpOnly: true,
            //  sameSite:'lax'
            // });
    return res.status(200).json({message:"Successfully Logged In",token});
  } catch (err) {
    return res.status(404).json({ message: "Catch Error", err });
  }
};
