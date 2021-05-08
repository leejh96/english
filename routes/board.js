"use strict";
const express = require('express');
const router = express.Router();
const { Board, Comment, Op } = require('../models');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const isLogin = require('../middleware/middleware');

router.use(isLogin);
const upload = multer({
    //storage는 업로드 파일을 어디에 저장할지 선택하는 것으로
    //diskStorage는 서버의 디스크에 저장하고
    //외부스토리지에 저장하는 법도 있다.
    storage: multer.diskStorage({
        destination(req, file, cb){
            cb(null, './public/uploads');
        },

        filename(req, file, cb){
            const ext = path.extname(file.originalname);
            cb(null, file.originalname.split('.')[0] + Date.now() + ext);    
        }
    }),
    limits: {fileSize: 5 * 1024 *1024}
});
router.get('/page/:pageNumber', async(req,res,next)=>{
    const session = req.user;
    const pageNumber = parseInt(req.params.pageNumber);
    const post = await Board.findAll({
        order : [['createText', 'DESC']]
    });
    const totalPost = post.length;
    let postCount = pageNumber*10;
    if (postCount > post.length){
        postCount = post.length;
    }
    const data = {post, pageNumber, postCount,session, totalPost}
    res.render('board',{data});
});

router.get('/:id', async(req, res, next)=>{
    const post = await Board.findOne({where : {id : req.params.id}});
    const comment = await Comment.findAll({
        where : {boardId : req.params.id}
    });
    const session = req.user;
    const data = {post, session, comment};
    res.render('post', {data});
});
router.post("/", upload.single('file'), async(req, res, next)=>{
    try {
        let uploads = null;
        if(req.file){
            uploads = req.file.filename;
        }
        const post = await Board.create({
            title : req.body.title,
            author : req.user.dataValues.nick,
            text : req.body.text,
            userId : req.user.dataValues.id,
            uploads
        });
        if(post){
            return res.json({
                success : true
            }); 
        }
        return res.json({
            success : false,
            message : '글 작성에 실패했습니다'
        })
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
                    author : {
                        [Op.like]: `%${text}%`
                    }
                }
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
                    title : {
                        [Op.like]: `%${text}%`
                    }
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
        const nick = req.user.nick;
        const text = req.body.commentText;
        const loginId = req.user.loginId;
        const boardId = req.params.id;
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
router.put('/:id/edit', upload.single('file'), async(req, res, next)=>{
    try {
        const img = await Board.findOne({where : { id : req.params.id }, attributes : ['uploads']})
        if(img.uploads){
            await fs.unlink(`./public/uploads/${img.uploads}`, (error) => {
                if(error){
                    console.error(error);
                    return res.redirect('/board/page/1');
                }
            })
        }
        let uploads = null;
        if(req.file){
            uploads = req.file.filename;
        }
        const post = await Board.update(
            {
                title : req.body.title, 
                text : req.body.text,
                uploads
            },{
                where : {id : req.params.id}
            }
        );
        console.log(post[0]);
        if(post[0] === 0){
            return res.json({
                success : false
            })
        }
        return res.json({
            success : true
        })
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.put('/:id', async (req, res, next)=>{
    const commentId = req.body.commentId;
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
        const post = await Board.findOne({where : { id : req.params.id }, attributes : ['uploads']})
        if(post.uploads){
            fs.unlink(`./public/uploads/${post.uploads}`, (error) => {
                if(error){
                    console.error(error);
                    return res.redirect('/board/page/1');
                }
            })
        }
        await Board.destroy({ where : {id : req.params.id} });
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