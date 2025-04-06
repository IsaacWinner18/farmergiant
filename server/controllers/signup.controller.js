const jwt = require("jsonwebtoken")
const userModel = require("../models/users.model")

const signUpController = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
// console.log(req.body)
  
    try {
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "password doesn't match" })
        }
      
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "User exist already",
            });
        }
      
      
        const newUser = await userModel.create({ name, email, password });

       
    
        res
            .status(201)
            .json({ message: "User created successfully", user: newUser });
    


    } catch (err) {
        console.log("This error in the signup page :", err);
        res.status(500).json({ message: "Internal server error", err })
    }

 
}

module.exports = signUpController;
