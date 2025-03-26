const exp=require('express')
const AdminApp=exp.Router()

AdminApp.get('/',(req,res)=>{
    res.send({message:"from Admin api"})
})


module.exports=AdminApp