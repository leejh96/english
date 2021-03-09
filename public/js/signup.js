const name = document.querySelector('#createName');
const id = document.querySelector('#createId');
const password = document.querySelector('#createPassword');
const confirmPassword = document.querySelector('#confirmPassword');
const signupButton = document.querySelector('#signupButton');

signupButton.addEventListener('click', () => {
    if ( !name.value ){
        alert('이름을 입력하세요');
    }else if( !id.value ){
        alert('아이디를 입력하세요')
    }else if( !password.value ){
        alert('비밀번호를 입력하세요');
    }else if ( !confirmPassword.value ){
        alert('비밀번호를 확인해주세요');
    }else{
        if (password.value !== confirmPassword.value){
            alert('비밀번호가 다릅니다');
        }else{
            const user = {
                name : name.value,
                id : id.value,
                password : password.value,
            }
            fetch('/signup', {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(user)
            })
                .then((res) => {
                    return res.json()
                })
                .then((res)=>  {
                    if (res.success){
                        alert('회원가입이 되었습니다.');
                        location.href = '/login';
                    }else{
                        alert(res.message);
                    }
                })
        }
    }
})
