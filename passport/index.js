const { User } = require('../models');
const local = require('./localStrategy');


//로그인 성공 시 사용됨
module.exports = (passport) =>{
    //유저의 정보를 session에 등록(일부를 등록하기도 하고 전부를 등록하기도 함)
    //login시 DB에서 발견한 user를 어떻게 session에 저장할지 정하는 부분
    //정확히는 req.session.passport.user에 저장한다.
    //일반적으로는 id만 저장한다.
    //login 성공 시 localStrategy에서 넘어온 user값이 첫번째 파라미터로 등록됨
    passport.serializeUser((user, done)=>{
        done(null, user.loginId);
    });

    //서버에 요청이 올때마다 세션정보(serializeUser에서 저장됨)와
    //실제 DB데이터를 비교함
    //첫번째 매개변수는 serializeUser에서 저장된 user.loginId값을 갖는다.
    passport.deserializeUser((loginId, done)=>{
        User.findOne({where : {loginId}})
        //done의 두번째 인자는 req.user 객체로 전달되도록
        .then(user => done(null, user)) 
        .catch(err => done(err))
    });
    local(passport);

};