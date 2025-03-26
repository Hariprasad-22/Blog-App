const exp=require("express")
const app=exp()
require('dotenv').config()
const UserApp=require('./APIs/UserApi')
const AdminApp=require('./APIs/AdminApi')
const AuthorApp=require('./APIs/AuthorApi')
const cors=require('cors')
app.use(cors())
const mongoose=require('mongoose')
const PORT=process.env.PORT || 4000


//DB connection
mongoose.connect(process.env.DBURL)
.then(()=>{
app.listen(PORT,()=>console.log(`server running on port ${PORT}...`))
console.log("DB connection success")
})
.catch(err=>console.log("Error in connecting to DB",err))


app.use(exp.json())

//connect API routes

app.use('/user-api',UserApp)
app.use('/admin-api',AdminApp)
app.use('/author-api',AuthorApp)


//error handler

app.use((err,req,res,next)=>{
    console.log("err object in express error handler:",err)
    res.send({message:err.message})
})
