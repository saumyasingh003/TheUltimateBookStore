import jwt from "jsonwebtoken"
export const requireSignin = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(req.headers.authorization){
        const user = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = user;
    }else{
        return res.status(400).json({ message: 'Authorization required'});
    }
    next();

}