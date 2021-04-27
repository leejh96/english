const express = require('express');
const router = express.Router();
const { Board, Comment } = require('../models');
router.get('/page/:pageNumber', async(req,res,next)=>{
    if(!req.user){
        return res.redirect('/login');
    }
    const session = req.user;
    const pageNumber = parseInt(req.params.pageNumber);
    const post = await Board.findAll();
    const totalPost = post.length;
    let postCount = pageNumber*10;
    if (postCount > post.length){
        postCount = post.length;
    }
    const posts = {
        number : [],
        title : [],
        author : [],
        createText : [],
        id : [],
    };
    for(let i = (pageNumber-1)*10; i<postCount; i++){
        posts.number.push(i+1);
        posts.title.push(post[i].title);
        posts.author.push(post[i].author);
        posts.createText.push(post[i].createText);
        posts.id.push(post[i].id);
    }
    const data = {posts, session, totalPost}
    res.render('board',{data});
});

router.get('/:id', async(req, res, next)=>{
    if(!req.user){
        return res.redirect('/login')
    }
    const post = await Board.findOne({where : {id : req.params.id}});
    const comment = await Comment.findAll({
        where : {boardId : req.params.id}
    });
    const session = req.user;
    const data = {post, session, comment};
    res.render('post', {data});
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
router.post('/search', async (req, res, next)=>{
    const { element, text } = req.body;
    try {
        if(element === 'au'){
            const post = await Board.findAll({       
                where : {
                    author : text,
                }, 
            });
            if(post.length !== 0){
                res.json({
                    success : true,
                    post
                })
            }else{
                res.json({
                    success : false,
                    message : '해당하는 게시물이 없습니다.'
                })
            }
        }else{
            const post = await Board.findAll({       
                where : {
                    title : text,
                }, 
            });
            if(post.length !== 0){
                res.json({
                    success : true,
                    post
                })
            }else{
                res.json({
                    success : false,
                    message : '해당하는 게시물이 없습니다.'
                })
            }
        }
    } catch (error) {
        console.error(error);
        next(error);
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
router.put('/:id/edit', async(req, res, next)=>{
    try {
        const post = Board.update(
            {
                title : req.body.title, 
                text : req.body.text
            },{
                where : {id : req.params.id}
        });
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

router.delete('/:id', async (req, res, next)=>{
    try {
        Board.destroy({ where : {id : req.params.id} });
        return res.redirect('/board/page/1');
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