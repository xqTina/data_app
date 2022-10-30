import data from '../data/users.json' assert{type: 'json'};
console.log(data);

// 获取username输入框
const username = document.querySelector('.username');
const password = document.querySelector('.password');
const firstName = document.querySelector('.firstName');
const lastName = document.querySelector('.lastName');
const email = document.querySelector('.email_');
const check = document.querySelector('.check');
// 获取log_in按钮
const reg_in = document.querySelector('.reg_in');

checkInput();
// console.log(this);
function clickChange(this_) {
    this_.addEventListener('blur', () => {
        console.log(!(this_.value.trim()));
        if (!(this_.value.trim())) {
            this_.style.borderBottomColor = "#e21a37";
        }
        else {
            this_.style.borderBottomColor = "#ccc";
        }
        checkInput();
    })
        
        this_.addEventListener('click', () => {
            // console.log(2232);
            if (!(this_.value).trim()) {
                this_.style.borderBottomColor = "#e21a37";
            }
            else {
                this_.style.borderBottomColor = "#ccc";
            }
            checkInput();
        });
    this_.addEventListener('keyup', () => {
        if (!(this_.value).trim()) {
            this_.style.borderBottomColor = "#e21a37";
        }
        else {
            this_.style.borderBottomColor = "#ccc";
        }
        checkInput();
    });
   

}
function checkInput() {
    console.log((username.value.trim())
        && (password.value.trim())
        && (firstName.value.trim())
        && (lastName.value.trim())
        && (email.value.trim())
        && check.checked);
    if ((username.value.trim())
        && (password.value.trim())
        && (firstName.value.trim())
        && (lastName.value.trim())
        && (email.value.trim())
        && check.checked) {
        reg_in.disabled = false;
        reg_in.style.opacity = 1
    }
    else {
        reg_in.disabled = true;
        reg_in.style.opacity = 0.7;
    }
}
clickChange(username);
clickChange(password);
clickChange(firstName);
clickChange(lastName);
clickChange(email);
clickChange(check);
checkInput();
reg_in.onclick = () => {

    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if ((username.value !== '' && username.value !== undefined && username.value !== null)
        && (password.value !== '' && password.value !== undefined && password.value !== null && password.value.length >= 6)
        && (firstName.value !== '' && firstName.value !== undefined && firstName.value !== null)
        && (lastName.value !== '' && lastName.value !== undefined && lastName.value !== null)
        && (email.value !== '' && email.value !== undefined && email.value !== null && reg.test(email.value))
        && check.checked) {
        console.log(check.checked);
        location.href = `./login.html`;
        return;
    }
    // location.href = `./fogot.html`;
    alert("密码长度太短(大于等于6)或邮箱格式错误");
    
}
