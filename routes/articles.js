const express = require('express');
const {  Article, Comment } = require('../models/index');


const articlesRouter = express.Router();


articlesRouter.get('/', async(req, res, next)=>{
    try {
       const articles = await Article.find();
       console.log(articles);
       if(articles) res.send(articles);
    } catch (err) {
        return next(err);
    }
})


articlesRouter.get('/:articale_id', async (req, res) => {
    res.header({
        'Content-Type': 'application/json'
    });
    try {
        const article = await Article.findById(req.params.articale_id);
        res.send(article);
     } catch (err) {
         return next(err);
     }
});

articlesRouter.get('/:articale_id/comments', async (req, res) => {
    res.header({
        'Content-Type': 'application/json'
    });
    try {
        const comments = await Article.findById(req.params.articale_id).populate('comments').select('comments');
        res.send(comments);
     } catch (err) {
         return next(err);
     }
});


articlesRouter.get('/:articale_id/authors', async (req, res) => {
    res.header({
        'Content-Type': 'application/json'
    });
    try {
        const authors = await Article.findById(req.params.articale_id).populate('authors').select('authors');
        res.send(authors);
     } catch (err) {
         return next(err);
     }
});

articlesRouter.post('/', async(req, res, next)=>{
    try {
        console.log(req.body);
       const articles = await Article.create(req.body);
       if(!articles) throw new Error('Failed');
       res.send({create: "success"});
    } catch (err) {
        return next(err);
    }
});

articlesRouter.patch('/:article_id', async(req, res, next)=>{
    try {
       const articles = await Article.updateOne({"_id":req.params.article_id}, {"$set":req.body});
       if(!articles) throw new Error('notfound');
       res.send({update: "sccess"});
    } catch (err) {
        return next(err);
    }
})

articlesRouter.delete('/:article_id', async(req, res, next)=>{
    try {
       const articles = await Article.findByIdAndRemove(req.params.article_id);
       if(!articles) throw new Error('notfound');
       res.send({delete: "sccess"});
    } catch (err) {
        return next(err);
    }
})

module.exports = articlesRouter;


