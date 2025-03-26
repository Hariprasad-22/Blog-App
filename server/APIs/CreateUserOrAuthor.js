const UserAuthor=require('../models/UserAuthorModel')

async function CreateUserOrAuthor(req,res){
const newUserAuthor=req.body
const UserInDb=await UserAuthor.findOne({email:newUserAuthor.email})
if(UserInDb!=null){
    if(newUserAuthor.role===UserInDb.role){
        res.status(200).send({message:newUserAuthor.role,payload:UserInDb})
    }else{
        res.status(200).send({message:"Invalid role"})
    }
} else{
    let newUser=new UserAuthor(newUserAuthor)
    let newUserorAuthorDoc=await newUser.save()
    res.status(201).send({message:newUserorAuthorDoc.role,payload:newUserorAuthorDoc})
}
} 

module.exports=CreateUserOrAuthor