const express = require("express");
const mongoose = require("mongoose");
const User = require('./models/User');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();


router.post("/register", async (req, res) => {
  try {
    const { name, username, email, password, profession } = req.body;

    if (!name || !username || !email || !password || !profession) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username Already Exists!" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email Already Exists!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      email,
      password: hashPassword,
      profession,
    });

    await newUser.save();
    res.status(201).json({ message: "User Registered Successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
});

router.post('/login', async(req,res)=>{
  try{
    const {username,password} = req.body;
    const user = await User.findOne({username});
    if(!user){
      return res.status(400).json({ message: " Invalid  Username !" });
    }
    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
      return res.status(400).json({ message: " Invalid Password !" });
    }

    const token = jwt.sign({userId:user._id,username:user.username, profession:user.profession},"sakshimashalkar",{expiresIn:'1h'});

    res.status(200).json({message:"Token generated successfully",token:token});

  }
  catch(error){
    res.status(500).json({ message: "Something went wrong while generating token..", error: error.message });
    
  }
})

router.get('/:username',async (req,res)=>{
  try{
    const user = await User.findOne({username:req.params.username});

    if(!user){
      return res.status(400).json({ message: " Username does not exists!" });
    }

    res.status(200).json(user);

  }catch(error){
    res.status(500).json({ message: "Something went wrong while searching user data..", error: error.message });
  }
});

router.put('/edit-profile', async (req, res) => {
  try {
      const userId = req.user.userId;

      const updatedUser = await User.findByIdAndUpdate(
          userId,
          req.body,
          { new: true, runValidators: true }
      ).select('-password');

      if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({message:"Profile updated successfully"});
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

router.get('/', async (request, response) => {
  try {
      const students = await User.find({ profession: "Student" });
      response.status(200).json(students);
  } catch (error) {
      response.status(500).json({ message: error.message });
  }
});


module.exports = router;