const exp=require('express')
const UserApp=exp.Router()
const expressAsyncHandler=require('express-async-handler')
const CreateUserOrAuthor=require('./CreateUserOrAuthor')
const ArticleModel=require('../models/ArticleModel')


UserApp.post('/user',expressAsyncHandler(CreateUserOrAuthor))


UserApp.put('/comment/:articleId',expressAsyncHandler(async(req,res)=>{
    const commentObj=req.body
    const articlewithcomment=await ArticleModel.findOneAndUpdate(
        {articleId:req.params.articleId},
        {$push:{comments:commentObj}},
        {returnOriginal:false}
    )
    res.send({message:"comment added",payload:articlewithcomment})
}))


module.exports=UserApp