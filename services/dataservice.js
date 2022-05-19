const jwt=require('jsonwebtoken');
const { isObjectIdOrHexString } = require('mongoose');
const db=require('./db')


const register=(accname,accno,pswd)=>{

return db.User.findOne({accno})
.then(user=>{
    console.log(user);
  if(user)
  {
      return{
          statusCode:401,
          status:false,
          message:"account already exists"
      }
  }  
  else{

    const newUser=new db.User({
        accname,
        accno,
        pswd
        
    })
    newUser.save()
    return{
        statusCode:200,
          status:true,
          message:"Succesfully Registered!!"
    }
}

})
}

const login = (accno,pswd)=>{
    return db.User.findOne({accno,pswd})
    .then(user=>{
      if(user)
      {
     currentUser=user.accname
     currentAccno=accno   
     const token=jwt.sign({
      currentAccno:accno
    },'supersecretkey123456789')

    return {
        statusCode:200,
        status:true,
        message:"Login Successfull",
        token,
        currentAccno,
        currentUser
        
        
      }  
      }
        else
        {
            return {
                statusCode:401,
                ststus:false,
                message:"Invalid Credentials!"
              }   
        }
    })
}


const addEvent=(accno,date,name,description)=>
{

    return db.User.findOne({accno})
    .then(user=>{
        if(user)
{
    const newUser=new db.Event({
        accno:user.accno,
        date,
        name,
        description
    })
newUser.save()
return{
    statusCode:200,
      status:true,
      message:"Succesfully Registered!!",
      id:newUser._id
}
 } 
 else
{
 return{
    statusCode:401,
    status:false,
    message:"account doesnt exists"
}
}
})
}



const viewAllEvent=(accno)=>
{
return db.Event.find({accno})
.then(user=>{
if(user)
{

return{
    statusCode:200,
    status:true,
    event:user

}


}
else
{
    return{
    statusCode:422,
    status:false,
    message:"does not exist"
    }
}

})

}


const todayEvent=(accno,date)=>
{
 
return  db.Event.find({$and: [{accno}, {date}]})
.then(user=>{
   
    if(user)
    {
        return{
            statusCode:200,
              status:true,
              event:user
        }  

    
    }
    else {

        return{
            statusCode:402,
              status:false,
             message:"no account exists for this user"
        }  
    }
})
}


const tommorowEvent=(accno,date)=>
{
    
return  db.Event.find({$and: [{accno}, {date}]})
.then(user=>{
   
    if(user)
    {
        return{
            statusCode:200,
              status:true,
              event:user
        }  

    
    }
    else {

        return{
            statusCode:402,
              status:false,
             message:"no account exists for this user"
        }  
    }
})
}

const deleteEvent=(_id)=>{

console.log(_id);
    return db.Event.deleteOne({_id})  
.then(user=>{
    if(user)

    {
        
        
        return{
            statusCode:200,
              status:true,
              message:"successfully deleted"
        }  
       
    }
  
    else
    {

        return{
            statusCode:401,
              status:false,
              message:"OPeration denied"
        }  
    }
})
}

const editEvent=(_id,date,name,description)=>
{
return db.Event.findOne({_id})
.then(user=>{
    if(user)
    {
       const newUser= db.user.push(
        _id,
        date,
        name,
        description
        )
        newUser.save()
    return{
        statusCode:200,
          status:true,
          message:"successfully registered"
    } 
} 
    else
    {
        return{
            statusCode:401,
              status:false,
              message:"OPeration denied"
        }  
    }
})
}

const onDelete=(accno)=>
{

    return db.User.deleteOne({accno})
    .then(user=>{
      if(!user){
        return{
         statusCode:401,
         status:false,
         message:"Operation failed"
        }
      }
      else{
       return {
         statusCode:200,
         status:true,
         message:"Acount number "+accno +"deleted successfully"
   
       }
      }
    })
}



module.exports=
{
    register,
    login,
    addEvent,
    viewAllEvent,
    todayEvent,
    deleteEvent,
    editEvent,
    tommorowEvent,
    onDelete
    
}

