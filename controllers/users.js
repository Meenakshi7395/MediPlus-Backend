import User from "../models/User.js";
import jwt from 'jsonwebtoken';

// Create a new user
export const createUser = async (req, res) => {
    try {
      console.log(req.body)
      const newUser = new User(req.body);
      await newUser.save();
      //res.status(201).json({"success":true,"message":"Users Created",user:newUser});
      console.log(newUser)
      res.json({"success":true,"message":"Users Created",user:newUser});
    } catch (error) {
      res.json({"success":false, "message": error.message });
    }
  };
  
  // Get all users
  export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json({"success":true,"message":"Users Data Found",users:users});
    } catch (error) {
      res.status(500).json({"success":false, "message": error.message });
    }
  };

// Get a single user by ID
  export const getUserById = async (req, res) => {
    console.log("hello")
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ "success":false,"message" : 'User not found' });
      }
      res.json({"success":true,"message":"Users Data Found",users:user});
    } catch (error) {
      res.status(500).json({"success":false, "message": error.message,errors:[] });
    }
  };
  
  // Update a user by ID
  export const updateUser = async (req, res) => {
    console.log("hello edit")
    console.log(req.body);
    try {

      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      console.log(user);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({"success":true,"message":"Users Data Found",users:user});
    } catch (error) {
      res.json({"success":false, "message": error.message, errors:[]});
    }
  };
  
  // Delete a user by ID
  export const deleteUser = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const accessTokenSecrete = "thisismyveryOwnSecrete";

  export const loginUser = async (req, res) => {
    try {
      const {email,password} = req.body;
      const user = await User.find({email:email,password:password});
      if (!user) {
       return res.json({ message: 'User Not found' });
      }
      
      const accessToken = jwt.sign({id:user._id,role:user.role}, accessTokenSecrete);
    res.json({accessToken});

    } catch (error) {
      res.sendStatus(500);
      //.json({ "message": error.message })
    }
  };

export const authicateJWT = async (req,res,next) =>{
    const authheader = req.headers.authorization;
    console.log(authheader)
    if(authheader){
        const token = authheader.split(' ')[1];
        jwt.verify(token,accessTokenSecrete, (err, user) =>{
            if(err){
                return res.sendStatus(403) /// unauth
            }
            req.user = user;            /// in any request id and role of the user will be accessible 
            next();
        })
    }else{
        res.sendStatus(401)
    } 
} 
