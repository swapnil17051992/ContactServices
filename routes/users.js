 const express = require('express');

  const router = express.Router();
  const User=require('../modal/user')
  const bccrypt=require('bcryptjs')
  const jwt =require('jsonwebtoken')
  const  config=require('config')

  const { check, validationResult } = require('express-validator');

  //@route Post '/api/users'
  //@desc  register user
  //@access public

  router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('email','Email is required').isEmail(),
    check('password','Password is required').isLength({min:8})
  ], async (req, res) => {
  
    const err=validationResult(req)
    if(!err.isEmpty()){
      return res.status(422).json({errors:err.array()});
    }

    let {name,email,password}=req.body

    try {
      
        let user= await User.findOne({email});
        if(user){
          
          return res.status(400).json({msg:'Email is already exits'});
        }

        user=new User({
          name,
          email,
          password
        })

        const salt=await bccrypt.genSalt(10)

        user.password=await bccrypt.hash(password,salt)

          await  user.save();
      
       //res.json('User Saved');
       const payload={
         user:{
           id:user.id
         }
       }

       jwt.sign(payload,config.get("jwtSecret"),{
         expiresIn:360000
       },(err,token)=>{
          if(err) throw err;

           res.json({token});
       })


    } catch (error) {
      console.log(error.message)
      return res.status(500).json({msg:'Server error'});
    }

    //res.send('passed');

    //res.send(req.body);
  });

  module.exports = router;