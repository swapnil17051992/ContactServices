const express = require('express');

const router = express.Router();

const jwt=require('jsonwebtoken')
const config=require('config')
const User=require('../modal/user')
  const bccrypt=require('bcryptjs')
  const { check, validationResult } = require('express-validator');

  const Auth=require('../middleware/auth')

  //@route    GET '/api/auth'
  //@desc     get logged in user
  //@access   private

  router.get('/', Auth, async (req, res) => {
    try {
      console.log(req.user.id)
      //find user by ID given by token
     // console.log(req)
      const user=await User.findById(req.user.id).select('-password')
      res.json(user);
    } catch (error) {
      console.log(error.message)
      return  res.json(500).json({msg:'server error'});
    }
    //res.send('Get logged in user');
  });


  
  //@route    POST '/api/auth'
  //@desc     get logged in user
  //@access   private

  router.post('/',[
check('email','Please Enter Email').isEmail(),
check('password','Please enter password').not().isEmpty()
  ] ,async (req, res) => {

    const err=validationResult(req)

    if(!err.isEmpty()){
      return res.status(400).json({err:err.array()});
    }

    const {email,password}=req.body;

    try {
      let user=await User.findOne({email});
      if(!user){
        return res.status(400).json({msg:'Invalid Credentials'});
      }

      let match=await bccrypt.compare(password,user.password)
      if(!match)
      {
        return res.status(400).json({msg:'Invalid password'});
      }

      let payload={
        user:{
          id:user.id
        }
      }

      jwt.sign(payload,config.get('jwtSecret'),{
        expiresIn:360000
      },(err,token)=>{
        if(err) throw err;

         res.json({token});
      }) 

    } catch (error) {
      console.log(error)
        return res.status(500).json({msg:'Server Error'});
    }

   // res.send('Log in user');
  });


  module.exports=router;