const express = require('express');
const { User, Article } = require('../models/index');



const userRouter = express.Router();


userRouter.get('/', async(req, res, next)=>{
    try {
       const users = await User.find({});
       console.log(users);
       res.send(users);
    } catch (err) {
        return next(err);
    }
})

userRouter.post('/', async(req, res, next)=>{
    try {
       const users = await User.create(req.body);
       res.send(users);
    } catch (err) {
        return next(err);
    }
})

userRouter.get('/:user_id', async (req, res) => {
    res.header({
        'Content-Type': 'application/json'
    });
    try {
        const user = await User.findById(req.params.user_id);
        res.send(user);
     } catch (err) {
         return next(err);
     }
});

userRouter.get('/:user_id/articles', async (req, res) => {
    res.header({
        'Content-Type': 'application/json'
    });
    try {
        const userAtricles = await Article.find({"user": req.params.user_id});
        res.send(userAtricles);
     } catch (err) {
         return next(err);
     }
});


userRouter.post("/:user_id/suspend", async (req, res, next)=>{
    try {
        const isSuspended = User.updateOne({"_id":req.params.comment_id}, {"$set":{"isSuspended":true}});
        if(!isSuspended) throw new Error('notfound');
        res.send({suspended: "sccess"});
     } catch (err) {
         return next(err);
     }
})


userRouter.post("/:user_id/unsuspend", async (req, res, next)=>{
    try {
        const unsuspend = User.updateOne({"_id":req.params.comment_id}, {"$set":{"isSuspended":false}});
        if(!unsuspend) throw new Error('notfound');
        res.send({unsuspended: "sccess"});
     } catch (err) {
         return next(err);
     }
})


module.exports = userRouter;