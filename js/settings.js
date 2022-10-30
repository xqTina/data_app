const form = document.forms[0];
const checkboxs = form.querySelectorAll('input');
const btns = form.querySelectorAll('button');
const saveChange = form.querySelector('button#saveChange');
const discardBtn = form.querySelector('#discardBtn');
console.log(checkboxs);
const user = {
    "id": 1,
    "userName": "johnsmith",
    "password": "123456",
    "firstName": "John",
    "lastName": "Smith",
    "emailAddress": "johnsmith@geospatial.com"
}
// #e21a37
let empty = false;

const isEmpty = (target) => {
    // console.log(!(target.value.trim()));
    if (!(target.value.trim())) {
        target.setAttribute("style", "border-bottom: 1px solid #e21a37;");
        return true;
    }
    target.setAttribute("style", "border-bottom: 1px solid #cccccc;");
}
// 先初始化  通过对象渲染 value值  修改对象的值 再重新渲染
const readUser = () => {
    checkboxs.forEach(ipt => {
        ipt.setAttribute("value", `${user[ipt.getAttribute("name")]}`)
    })
}
const changeOrNot = () => {
    for (let ipt of checkboxs) {
        if (ipt.value.toLowerCase() != user[ipt.getAttribute("name")].toLowerCase()) {
            return true;
        }
    }
    return false;
}


const saveChangeFn = () => {
    for (let ipt of checkboxs) {
        user[ipt.getAttribute("name")] = ipt.value;
    }
}
readUser();
checkboxs.forEach((ipt => {
    ipt.addEventListener('keyup', () => {
        isEmpty(ipt);

        if (changeOrNot()) {
            btns.forEach(btn => { btn.setAttribute('style', "opacity:1"), btn.disabled = false });
        } else {
            btns.forEach(btn => { btn.setAttribute('style', "opacity:0.7"), btn.disabled = true });
        }
        empty = Array.from(checkboxs).some(ipt => {
            if (isEmpty(ipt)) return true;
        });
        if (empty) {
            btns.forEach(btn => { btn.setAttribute('style', "opacity:0.7"), btn.disabled = true });
        }
    })
}))
saveChange.onclick = () => {
    saveChangeFn();
    readUser();
    btns.forEach(btn => { btn.setAttribute('style', "opacity:0.7"), btn.disabled = true });
};

// 修改密码
const changebox = document.querySelector('.change_box');
const beforePsd = changebox.querySelector('#beforePsd');
const afterPsd = changebox.querySelector('#afterPsd');
const changePsd = changebox.querySelector('#changePsd');
const desc = changebox.querySelector('p');

const setDisabled = () => {
    changePsd.setAttribute('style', "opacity:0.7");
    changePsd.disabled = true;
}

beforePsd.onkeyup = afterPsd.onkeyup = () => {
    isEmpty(beforePsd);
    isEmpty(afterPsd);
    if (!(beforePsd.value.trim()) || !(afterPsd.value.trim())) {
        desc.innerHTML = "";
    }
    if (beforePsd.value && afterPsd.value) {
        changePsd.setAttribute('style', "opacity:1"); changePsd.removeAttribute("disabled")
        return;
    }
    changePsd.setAttribute('style', "opacity:0.7"); changePsd.disabled = true;
}


changePsd.onclick = () => {
    // 创建遮罩层
    if (beforePsd.value === afterPsd.value) {
        user[beforePsd.getAttribute("name")] = beforePsd.value; //存入对象中
        console.log(user);
        desc.innerHTML = "Modification succeeded";
        desc.style.color = "green";
        changePsd.setAttribute('style', "opacity:0.7"); changePsd.disabled = true;
        return;
    }
    desc.innerHTML = "The modified passwords are inconsistent";
    desc.style.color = "#fc5531";
    
};



