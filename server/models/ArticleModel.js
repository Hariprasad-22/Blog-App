const mongoose=require("mongoose")

const AuthorDataSchema=mongoose.Schema({
    nameofAuthor:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    profileImageUrl:{
        type:String,
    }
},{"strict":"throw"})
const userCommentSchema=mongoose.Schema({
    nameofUser:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    }
},{"strict":"throw"})

const ArticleSchema=mongoose.Schema({
authorData:AuthorDataSchema,
articleId:{
    type:Number,
    required:true
},
title:{
    type:String,
    required:true
},
category:{
    type:String,
    required:true
},
content:{
    type:String,
    required:true
},
dateOfCreation:{
    type:String,
    required:true
},
dateOfModification:{
    type:String,
    required:true
},
comments:[userCommentSchema],
isArticleActive:{
    type:Boolean,
    required:true
},
},{"strict":"throw"})



const ArticleModel=mongoose.model('article',ArticleSchema)
module.exports=ArticleModel