const jwt =require('jsonwebtoken')

const config=require('config')


module.exports=function(req,res,next){

    //get token  from header
    const token=req.header('x-auth-token')

    if(!token){
        return res.status(402).json({msg:'No token access denied!!'});
    }

    try {
        
        const decoded=jwt.verify(token,config.get('jwtSecret'))

        req.user=decoded.user;
       
        next();
        //console.log(res.user.id)
    } catch (error) {
        return res.status(402).json({msg:'Token is not valid!!'});
    }
}