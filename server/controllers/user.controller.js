const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require("jsonwebtoken")
const Cookies = require("js-cookie")

const createUser = async (req, res) => {
    let { username, email, password } = req.body;
    let newUser = await User.findOne({ email: email });

    if (newUser) {
        return res.status(400).json({ message: "Email already exists" });
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    
    newUser = User.create({
        username:username,
        email:email,
        password: hashedPassword
    });

    let token = await jwt.sign({
        username:newUser.username,
        email:newUser.email,
        id: newUser._id
    }, "private-key");

    Cookies.set('token', token);
    res.json({ message: "User created successfully", token, newUser });
};

const loginUser = async (req, res) => {
    let { email, password } = req.body;
    let user = await User.findOne({ email: email });

    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    let token = await jwt.sign({
        username: user.username,
        email: user.email,
        id: user._id
    }, "private-key");
    Cookies.set('token', token)
    res.json({ message: "Logged in successfully", token, user });
}

module.exports = { createUser, loginUser }