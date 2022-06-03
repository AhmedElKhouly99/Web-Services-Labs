const express = require('express');
const {  Article, Comment } = require('../models/index');


const commentsRouter = express.Router();

commentsRouter.get('/', async(req, res, next)=>{
    try {
       const comment = await Comment.find();
       res.send(comment);
    } catch (err) {
        return next(err);
    }
});

commentsRouter.post('/', async(req, res, next)=>{
    try {
       const comment = await Comment.create(req.body);
       if(!comment) throw new Error('Failed');
       res.send({create: "success"});
    } catch (err) {
        return next(err);
    }
});

commentsRouter.patch('/:comment_id', async(req, res, next)=>{
    try {
       const comment = await Article.updateOne({"_id":req.params.comment_id}, {"$set":req.body});
       if(!comment) throw new Error('notfound');
       res.send({update: "sccess"});
    } catch (err) {
        return next(err);
    }
})

commentsRouter.delete('/:comment_id', async(req, res, next)=>{
    try {
       const comment = await Article.findByIdAndRemove(req.params.comment_id);
       if(!comment) throw new Error('notfound');
       res.send({delete: "sccess"});
    } catch (err) {
        return next(err);
    }
})


module.exports = commentsRouter;