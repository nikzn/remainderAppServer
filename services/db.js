const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/remainderApp',{
    useNewUrlParser:true
})



const User=mongoose.model('User',{
    accname:String,
    accno:Number,
    pswd:String,
    event:[{ 
        id:Number,  
        date:Date,
        name:String,
        description:String
    }]
   

    
})

const Event=mongoose.model('Event',{
date:Date,
name:String,
description:String,
accno:Number

})

module.exports=
{
    User,
    Event
}