const express = require('express');
const router = express.Router();
const { Board, Comment } = require('../models');
const board = require('../models/board');
router.get('/', async(req,res,next)=>{
    const post = await Board.findAll();
    const session = req.user;
    const data = {post, session}
    res.render('board',{data});
});

router.get('/:id', async(req, res, next)=>{
    const post = await Board.findOne({where : {id : req.params.id}});
    const comment = await Comment.findAll();
    const session = req.user;
    console.log(comment);
    const data = {post, session, comment};
    res.render('post', {data});
});
router.get('/:id/edit', async (req, res, next)=>{
    const id = req.params.id;
    res.render('postedit', {id});
});

router.post("/", async(req, res, next)=>{
    try {
        await Board.create({
            title : req.body.title,
            author : req.user.dataValues.nick,
            text : req.body.text,
            userId : req.user.dataValues.id
        })
        return res.redirect('/board')
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.post('/:id', async(req, res, next)=>{
    try {
        nick = req.user.nick;
        text = req.body.commentText;
        loginId = req.user.loginId;
        boardId = req.params.id;
        console.log(nick, text, loginId, boardId);
        await Comment.create({
            loginId,
            nick,
            text,
            boardId,
        });
        return res.redirect(`/board/${boardId}`);

    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.put('/:id/edit', async (req, res, next)=>{
    console.log(req.body.title, req.body.text);
    Board.update({
        title : req.body.title,
        text : req.body.text
    }, { where : {id : req.params.id} })
    .then((post)=>{
        return res.redirect(`/board/${req.params.id}`);
    })
    .catch (error => {
        console.error(error);
        next(error);
    })
})

router.delete('/:id', (req, res, next)=>{
    try {
        Board.destroy({ where : {id : req.params.id} });
        return res.redirect('/board');
    } catch (error) {
        console.error(error);
        next(error);
    }
});
module.exports = router;