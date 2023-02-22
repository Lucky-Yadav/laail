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
// const todos = [];
// const todopost = (req, res) => {
//     // const { taskname, status,tag } = req.body;

//     try {
//       const { todo } = req.body;
//         const { task } = todo;
        
//       console.log(task);

//       let count = 0;
//       todos.forEach((todo) => {
//         count = Math.max(count, todo.id);
//       });

//       let data = {
//         id: count + 1,
//         task,
//         createdAt: new Date(),
//       };
//       todos.push(data);
//       return res.send("todo added");
        
//     } catch (err) {
//         console.log(err)
//     }
// };
// const todoget = (req, res) => {
//      try {
//        return res.send({
//          todos,
//        });
//      } catch (error) {
//        console.error(error.message);
//        res.send("internal error ");
//      }
// }
// const tododelete = (req, res) => {
//     const { id } = req.params;

//     let index = null;
//     todos.forEach((todo, i) => {
//       if (todo.id == id) {
//           index = i;
//           todos.splice(index, 1);
//         return res.send(`deleted ${index + 1} element`);
//       } 
//     });
//     if (index == null) {
//       return res.status(404).send("data doesn't exist");
//     }
// }


module.exports = {signin,signup};