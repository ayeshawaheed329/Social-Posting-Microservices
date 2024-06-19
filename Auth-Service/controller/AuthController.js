import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import prisma from "../config/db.config.js";

class AuthController {
  static async signup(req, res) {
    const payload = req?.body;
    const salt = bcrypt.genSaltSync(10);
    const hashed_password = bcrypt.hashSync(payload.password, salt);

    // save in db
    try {
      const user = await prisma.user.create({
        data: {
          name: payload.name,
          email: payload.email,
          password: hashed_password,
        },
      });
      return res.json({ message: "User signup successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error in saving to database" });
    }
  }

  static async login(req, res){
    const { email, password } = req?.body;

    try{
        const user = await prisma.user.findUnique({
            where:{
                email: email
            }
        });
        if(!!user){
    
            if(!bcrypt.compareSync(password, user?.password)){
                return res.status(401).json({message: "Invalid credentials"});
            }
            const payload = {
                id: user.id,
                name: user.name,
                email: user.email
            };
    
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY,{
                expiresIn: "365d"
            });
            return res.status(200).json({
                message: "User logged in successfully",
                access_token: `Bearer ${token}`
            });
    
        }
        return res.status(401).json({message: "User not found"});
    }catch(error){
        return res.status(500).json({message: "something went wrong"});
    }
  }

  static async user(req,res){
    return res.json({
        user: req?.user
    })
  }
}

export default AuthController;
