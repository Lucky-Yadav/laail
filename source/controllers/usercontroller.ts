import userModel from "../Models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET_KEY = "Secret_key";

interface SignupRequest {
  body: {
    username: string;
    email: string;
    password: string;
  };
}

interface SigninRequest {
  body: {
    email: string;
    password: string;
  };
}

interface User {
  email: string;
  password: string;
  username: string;
  _id: string;
}

interface TokenPayload {
  email: string;
  id: string;
}

const signup = async (req: SignupRequest, res: any) => {
  const { username, email, password } = req.body;

  try {
    const existinguser = await userModel.findOne({ email: email });
    if (existinguser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashpassword = await bcrypt.hash(password, 10);

    const result = await userModel.create({
      email: email,
      password: hashpassword,
      username: username,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id } as TokenPayload,
      SECRET_KEY
    );
    res.status(201).json({ user: result, token: token });
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "something went wrong" });
  }
};

const signin = async (req: SigninRequest, res: any) => {
  const { email, password } = req.body;

  try {
    const existinguser = await userModel.findOne({ email: email });
    if (!existinguser) {
      return res.status(400).json({ message: "User not found" });
    }
    const matchpassword = await bcrypt.compare(
      password,
      existinguser.password
    );
    if (!matchpassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id } as TokenPayload,
      SECRET_KEY
    );
    res.status(201).json({ user: existinguser, token: token });
  } catch (err) {
    console.log(err);
  }
};

export { signin, signup };
