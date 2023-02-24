const userModel = require("../Models/user")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_KEY = "Secret_key"

const signup = async (req, res) => {
    
    const { username, email, password } = req.body;

    try {
        const existinguser = await userModel.findOne({ email: email })
        if (existinguser) {
            return res.status(400).json({ message: "User already exists"})
        }
        const hashpassword = await bcrypt.hash(password, 10);

        const result = await userModel.create({
            email: email,
            password: hashpassword,
            username:username
        })

        const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
        res.status(201).json({user : result,token : token})
    } catch (error) {
        console.log(error);
        res.status(501).json({message : "something went wrong"})
    }
    // res.send("signup")
    
};
const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existinguser = await userModel.findOne({ email: email });
        if (!existinguser) {
            return res.status(400).json({ message : "User not found"})
        }
        const matchpassword = await bcrypt.compare(password, existinguser.password)
        if (!matchpassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(
          { email: existinguser.email, id: existinguser._id },
          SECRET_KEY
        );
        res.status(201).json({ user: existinguser, token: token });
        
    } catch (err) {
        console.log(err)
    }
};



module.exports = {signin,signup};