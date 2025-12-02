import jwt from "jsonwebtoken";

const authUser = async(req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.json({message:"Unauthorized : please login "});
    }
    try{
        const decode = jwt.verify(token , process.env.JWT_SECRET);
        req.body.userId = decode.id;
        next();

    }catch(error){
        console.error("AUTH ERROR:", error);
        res.json(  { success:false, message:error.message});
    }
}


export default authUser;