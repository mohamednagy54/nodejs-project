
const mongoose = require("mongoose")

const Schema = mongoose.Schema


const articleSchema = new Schema({
  title: String,
  body: String,
  numberOfLikes:Number
})

const Article = mongoose.model("article",articleSchema)


module.exports = Article