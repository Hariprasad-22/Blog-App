const exp=require('express')
const AuthorApp=exp.Router()
const CreateUserOrAuthor=require('./CreateUserOrAuthor')
const expressAsyncHandler=require('express-async-handler')
const AuthorModel=require('../models/ArticleModel')
const ArticleModel = require('../models/ArticleModel')
AuthorApp.get('/',(req,res)=>{
    res.send({message:"from Author api"})
})

AuthorApp.post('/author',expressAsyncHandler(CreateUserOrAuthor))

AuthorApp.post('/article',expressAsyncHandler(async(req,res)=>{
    const newArticleobj=req.body
    const newArticle=new AuthorModel(newArticleobj)
    const ArticleObj=await newArticle.save()
    res.status(201).send({message:"article published",payload:ArticleObj})

}))
AuthorApp.get('/articles',expressAsyncHandler(async(req,res)=>{
    const listOfArticles=await ArticleModel.find({isArticleActive:true})
    res.status(200).send({message:"articles",payload:listOfArticles})


}))
//modify article
AuthorApp.put('/articles/:articleId',expressAsyncHandler(async(req,res)=>{
    const modifiedArticle=req.body
    const latestArticle=await ArticleModel.findByIdAndUpdate(modifiedArticle._id,{...modifiedArticle},{returnOriginal:false})
    res.status(200).send({message:"article modified",payload:latestArticle})


}))

//delete(soft delete) article
AuthorApp.put('/article/:articleId',expressAsyncHandler(async(req,res)=>{
    const modifiedArticle=req.body
    const latestArticle=await ArticleModel.findByIdAndUpdate(modifiedArticle._id,{...modifiedArticle},{returnOriginal:false})
    res.status(200).send({message:"article modified",payload:latestArticle})


}))


module.exports=AuthorApp