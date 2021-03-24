const express = require('express');
const router = express.Router();
const { Board } = require('../models');
router.get('/', async(req,res,next)=>{
    const post = await Board.findAll();
    res.render('board',{post});
});

router.get('/:id', async(req, res, next)=>{
    const post = await Board.findOne({where : {id : req.params.id}});
    res.render('post', {post});
});
router.get('/:id/edit', async (req, res, next)=>{
    const id = req.params.id;
    res.render('postedit', {id});
});

router.post("/", async(req, res, next)=>{
    Board.create({
        title : req.body.title,
        author : req.user.dataValues.loginId,
        text : req.body.text,
        userId : req.user.dataValues.id
    })
    .then(user => {return res.redirect('/board')})
    .catch(err =>{
        console.error(err);
        next(err);
    })
})

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