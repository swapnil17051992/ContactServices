const mongoose=require('mongoose')

const ContactSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String
        
    },
    phone:{
        type:String,
        required:true
    },
    type:{
        type:String,
        default:'Personal'
    },
    date:{
        type:String,
        default:Date.now
    }


})

module.exports=mongoose.model('contacts',ContactSchema)