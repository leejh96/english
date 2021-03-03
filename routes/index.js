const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
    res.send(`<!DOCTYPE html>
    <html lang="kr">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>오늘의 단어</title>
    
        <link rel="stylesheet" href="../public/style.css">
        <link href="https://fonts.googleapis.com/css2?family=Gamja+Flower&display=swap" rel="stylesheet">
        <script src="https://kit.fontawesome.com/b359215d2f.js" crossorigin="anonymous"></script>
        <script src="../public/main.js" defer></script>
    </head>
    <body>
        <nav class="navbar">
            <div class="navbar_logo">
                <i class="fas fa-edit"></i>
                <a href="/">오늘의 단어</a>
            </div>
            <ul class="navbar_menu">
                <li>나의 단어장</li>
                <li>복습하기</li>
                <li>오늘의 단어</li>
            </ul>
            <ul class="navbar_link">
                <li><a href="/login">로그인</a></li>
                <li><i class="fab fa-google"></i></li>
                <li><i class="fab fa-facebook"></i></li>
            </ul>
            <a href="#" class="navbar_toggleBtn">
                <i class="fas fa-bars"></i>
            </a>
        </nav>
        <section class="main_page">
            <div class="translate">네이버 번역기</div>
            <div class="todayandboard">
                <ul class= "board">
                    <li><a href="#">질문있어요!</a></li>
                    <li><a href="#">질문있어요!</a></li>
                    <li><a href="#">질문있어요!</a></li>
                    <li><a href="#">질문있어요!</a></li>
                    <li><a href="#">질문있어요!</a></li>
                </ul>
                <div class="todayEng">
                    apple<br>
                    사과
                    <div class="eng_syntax">
                        i'm eating an apple
                    </div>
                </div>
    
            </div>
        </section>
        <footer>
            제작자 : 이주혁
        </footer>
    </body>
    </html>`);
})


module.exports = router;
