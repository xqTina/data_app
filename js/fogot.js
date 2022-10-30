import data from '../data/users.json' assert{type: 'json'};
console.log(data);

// 获取按钮 reset password
const reset_btn = document.querySelector(".forgot_reset");
console.log(reset_btn);
// 获取input输出框
let email = document.querySelector('.input_email');
console.log(email);
email.onkeyup = function () {
    let email = this.value;
    console.log(email);
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    console.log(reg.test(email));
    if (reg.test(email)) {
        reset_btn.disabled = false;
        reset_btn.style.opacity = 1
        // reset_btn.style.backgroundColor = "red";
        return
    }
        reset_btn.style.opacity = 0.7
        reset_btn.disabled = true;
}

reset_btn.addEventListener('click', function () {
    location.href = './login.html';
})
    


