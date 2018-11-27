function _Set_login_user(user, password) {
    let loginForm = _$Id('login_form');
    let nameInput = _GetElemByName('username', loginForm);
    let pwdInput = _GetElemByName('password', loginForm);
    nameInput.value = user;
    pwdInput.value = password;
}

function _$Id(id) {
    return document.getElementById(id);
}

function _GetElemByName(name, context) {
    if(context){
        return  context.querySelector(`[name=${name}]`);
    }
    return document.querySelector(`[name=${name}]`);
}

const _Value1 = 10;
const _Value2 = 15;
console.log(`innser js ready!`);
console.log(_Value1);
console.log(_Value2);
console.log(_Set_login_user);