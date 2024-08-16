const User = require("../userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey='sadsadsadsadsad'

exports.createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        
        if (!email || !name || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        // Check if user already exists
        let existUser = await User.findOne({ email });
  
        if (existUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        const hashPassword=await bcrypt.hash(password,10)
     
        const newUser = await User.create({ name, email, password:hashPassword });
     

        return res.status(201).json({ message: "User created", user: newUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error creating user", error: error.message });
    }
}



exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },  // Payload
            secretKey,               // Secret key
            { expiresIn: '30s' }                  // Expiration time
        );

        // If login is successful
        return res.status(200).json({
            message: 'Login successful',
            token
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}