const localStrategy = require('passport-local').Strategy;
const {User} = require('../models');
const bcrypt = require('bcrypt');

module.exports = (passport) => {
    passport.use(new localStrategy({
        //urlencoded가 해석한 req.body 값을 가져와서 사용함
        //usernameField, passwordField는 고정
        usernameField : 'loginId',
        passwordField : 'password'
    }, async (loginId, password, done) => {
        // done의 내용이 login routes의 passport.authenticate의 값으로 들어간다.
        try {
            const user = await User.findOne({where : {loginId}});
            if(user){
                const result = await bcrypt.compare( password , user.password )
                if (result){
                    //done(에러, 성공, 실패)
                    return done(null, user);
                }else{
                    return done(null, false, {message : '이메일-비밀번호가 일치하지 않습니다'});
                }
            }else{
                return done(null, false, {message : '가입되지 않은 사용자 입니다'})
            }
        } catch (error) {
            console.error(error);
            return done(error);
        }
    }));
};