const express= require('express')
const { status }=require('express/lib/response')
const dataservice=require('./services/dataservice')
const jwt=require('jsonwebtoken')
const cors=require('cors')
const app =express()

app.use(cors({
    origin:'http://localhost:4200'

}))

app.use(express.json())

const jwtMiddleware=(req,res,next)=>{
    try{
        const token=req.headers['x-access-token']
        const data=verify(token,'supersecretkey123456789')
        req.currentAccno=data.currentAccno
        next()
    }
    catch{
        res.status(401).json({
            statusCode:401,
            status:false,
            message:"Please Login"
        })
    }
}


app.post('/register',(req,res)=>{
    dataservice.register(req.body.accname,req.body.accno,req.body.pswd)
    .then(result=>{
      res.status(result.statusCode).json(result)  
    })
})


app.post('/login',(req,res)=>{
    dataservice.login(req.body.accno,req.body.pswd)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post('/addEvent',(req,res)=>
dataservice.addEvent(req.body.accno,req.body.date,req.body.name,req.body.description)
.then(result=>{
    res.status(result.statusCode).json(result)
})
)

app.post('/viewAllEvent',(req,res)=>
dataservice.viewAllEvent(req.body.accno)
.then(result=>{
    res.status(result.statusCode).json(result)
})
)

app.post('/todayEvent',(req,res)=>
{
    dataservice.todayEvent(req.body.accno,req.body.date)
    .then(result=>{
 res.status(result.statusCode).json(result)

    })
})

app.post('/tommorowEvent',(req,res)=>
{
    dataservice.tommorowEvent(req.body.accno,req.body.date)
    .then(result=>{
 res.status(result.statusCode).json(result)

    })
})

app.delete('/deleteEvent/:_id',(req,res)=>
{
    dataservice.deleteEvent(req.params._id)
    .then(result=>{
res.status(result.statusCode).json(result)

    })
})

app.post("/editEvent/",(req,res)=>
{
    dataservice.editEvent(req.body._id,req.body.date,req.body.name,req.body.description)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.delete('/onDelete/:accno',jwtMiddleware,(req,res)=>{
    dataservice.onDelete(req.params.accno)
    .then(result=>
        {
        res.status(result.statusCode).json(result)
        })
    }
)





app.listen(3000,()=>{
    console.log("server started at 3000");
})