const mongoose=require('mongoose')
const UserAuthorSchema=mongoose.Schema({
role:{
    type:String,
    required:true
},
firstName:{
    type:String,
    required:true
},
lastName:{
    type:String,
},
email:{
    type:String,
    required:true,
    unique:true
},
profileImageUrl:{
    type:String
},
isActive:{
    type:Boolean
}

},{"strict":"throw"})


const UserAuthor=mongoose.model('userauthor',UserAuthorSchema)

module.exports=UserAuthor