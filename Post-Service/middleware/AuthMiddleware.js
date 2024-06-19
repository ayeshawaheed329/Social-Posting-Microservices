

import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) =>{

    const token = req?.get('Authorization')?.split(" ")?.[1];

    let decodedToken;
    try{
        decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) =>{
            if(err){
                return res.status(401).json({ message: "UnAuthorized"})
            }
            req.user = payload;
            next();
        });
    }
    catch( error ){
        return res.status(500).json({ message: "Something went wrong"})
    }
};


export default authMiddleware;

