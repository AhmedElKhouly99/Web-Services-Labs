const express = require('express');
require('./helpers/dbConnection');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const articlesRouter = require('./routes/articles');
const commentsRouter = require('./routes/comments');
const { errorHandler } = require('./middlewares');
const { getArticlesHateos } = require('./helpers/constants');

const server = express();
server.use(bodyParser.json());



server.get('/', async(req, res, next)=>{
    const articlesHateos = getArticlesHateos('https://', 'localhost')
    res.status(200).send(articlesHateos);
})

server.use('/users', userRouter);
server.use('/articles', articlesRouter);
server.use('/comments', commentsRouter);


server.use(errorHandler);

server.listen(3000, 'localhost', () => {
    console.log(`server is listening on: 3000`);
});
