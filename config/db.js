const express = require('express');

const mongoose=require('mongoose')

//import config file 
const config=require('config')
const db=config.get('mongoURI')


//@ Creating normal function
// const MongoDB=()=>{
//     mongoose.connect(db,{
//         useCreateIndex:true,
//         useNewUrlParser:true,
//         useFindAndModify:false
//     }).then(()=>console.log('Mongo db connected'))
//     .catch(err=>{
//         console.log(err.message)
// process.exit(1)
//     })
// }


// @ creating async and await function
const MongoDB= async ()=>{
    try {

        await mongoose.connect(db,{
            useFindAndModify:false,
            useNewUrlParser:true,
            useCreateIndex:true
        })
        
        console.log('Mogo DB Connected... !!')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

module.exports=MongoDB;

