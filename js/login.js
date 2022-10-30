import data from '../data/users.json' assert{type: 'json'};
console.log(data);

// 获取username输入框
const username = document.querySelector('.username');
const password = document.querySelector('.password');
// 获取log_in按钮
const log_in = document.querySelector('.log_in');
function clickChange(this_) {
    this_.addEventListener('blur', () => {
        // console.log(!(this_.value.trim()));
        if (!(this_.value.trim())) {
            // console.log(this_.value);
            this_.style.borderBottomColor = "#e21a37";
        }
        else {
            console.log(this_.value.trim());
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
        // console.log(2232);
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
    if (!(username.value.trim())
        || !(password.value.trim())) {
        log_in.disabled = true;
        log_in.style.opacity = 0.7
    }
    else {
        log_in.disabled = false;
        log_in.style.opacity = 1;
    }
}
clickChange(username)
clickChange(password);




// 获取p 
const p = document.querySelector('.worong_or_true');
// console.log(log_in);

log_in.onclick = () => {
    if (username.value === data[0].username &&  password.value === data[0].password) {
        location.href = `./dashboard.html`;
   return;
    }       
        p.style.display = 'block'
}
// 注册按钮
const register = document.querySelector('.regiter_a');
register.onclick = (() => {
    location.href = `./register.html`;
})
