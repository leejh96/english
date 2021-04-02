const express = require('express');
const router = express.Router();
const { Board, Comment } = require('../models');
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
    const data = {post, session, comment};
    res.render('post', {data});
});
router.get('/:id/edit', async (req, res, next)=>{
    const id = req.params.id;
    res.render('postedit', {id});
});

router.post("/", async(req, res, next)=>{
    try {
        const post = await Board.create({
            title : req.body.title,
            author : req.user.dataValues.nick,
            text : req.body.text,
            userId : req.user.dataValues.id
        });
        if(post){
            return res.json({
                success : true
            });
        }else{
            return res.json({
                success : false
            });
        }
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
        const comment = await Comment.create({
            loginId,
            nick,
            text,
            boardId,
        });
        if(comment){
            return res.json({
                success : true
            });
        }else{
            return res.json({
                success : false
            });
        }
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.put('/:id', async (req, res, next)=>{
    commentId = req.body.commentId;
    try {
        const comment = await Comment.update({
            text : req.body.text
        }, { where : {id : commentId} });

        if(comment){
            return res.json({
                success : true
            });
        }else{
            return res.json({
                success : false
            });
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.put('/:id/edit', async (req, res, next)=>{
    try {
        const post = await Board.update({
            title : req.body.title,
            text : req.body.text
        }, { where : {id : req.params.id} })
        if(post){
            res.json({
                success : true
            });
        }else{
            res.json({
                success : false
            });
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.delete('/:id', async (req, res, next)=>{
    try {
        Board.destroy({ where : {id : req.params.id} });
        return res.redirect('/board');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.delete('/:id/deleteComment', async(req, res, next)=>{
    try {
        await Comment.destroy({ where : {id : req.body.commentId} });
        return res.redirect(`/board/${req.body.postId}`);
    } catch (error) {
        console.error(error);
        next(error);
    }
})
module.exports = router;