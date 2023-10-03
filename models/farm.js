const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const farmSchema=new Schema({
    name:{
        type:String,
        reuired:[true,'Farm must have a name!']
    },
    city:{
        type:String
    },
    email:{
        type:String,
        reuired:[true,"Email is require!"]
    },
    
})