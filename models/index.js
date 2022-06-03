const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
   firstName: {
      type: String,
      required: true
   },
   lastName: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   dob: {
      type: Date,
      required: true
   },
   isSuspended: {
      type: Boolean,
      required: true
   }
});

const ArticleSchema = new Schema({
   title: {
      type: String,
      required: true
   },
   // body: String,
   user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
   },
   body: {
      type: String,
      required: true
   },
   comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
   }],
   authors: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   }]
})

const CommentSchema = new Schema({

   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   },
   content: {
      type: String,
      required: true
   },
   date: {
      type: Date,
      required: true
   }
})


const User = mongoose.model("User", UserSchema);
const Article = mongoose.model("Article", ArticleSchema);
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = {User, Article, Comment}