const userModel = require("../models/users.model");
const jwt = require("jsonwebtoken");


const loginController = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Invalid values provided" });
    }

    try {

        const checkUser = await userModel.findOne({ email })
        if (checkUser) {
            if (checkUser.password === password) 
            {
                const token = jwt.sign(
                  { id: checkUser._id, email: checkUser.email },
                  process.env.MY_SECRET,
                  {
                    expiresIn: "32d",
                  }
                );
                res.cookie("token", token, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === "production",
                  sameSite: "strict",
                  maxAge: 32 * 24 * 60 * 60 * 1000,
                });
                return res.status(200).json({ message: "Login successful!" });

            } else {
                res.status(400).json({message: "Incorrect Password"})
            }
        } else {
                res
                  .status(400)
                  .json({ message: "No matching user found" });

        }

    } catch (err) {
        // console.log("Server error occured", err)
        return res.status(500).json({message: "server err"})
    }

}

module.exports = loginController;