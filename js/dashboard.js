// list view
const panelPro = document.querySelector('#panelPro');
const viewArr = panelPro.querySelector('#viewArr').querySelectorAll('div');
const detailContent = document.querySelector('#detailContent');
const imgDisplay = document.querySelector('#imgDisplay');
const changeView = document.querySelector('#changeView');

(function () {
    iconView.querySelector('path').setAttribute("fill", "#666666");
})();

const choiceView = (eventSource) => {
    viewArr.forEach(div => div.classList.remove('white_bg'))
    viewArr.forEach(div => div.querySelector('path').setAttribute("fill", "#666666"))
    eventSource.classList.add('white_bg');
    eventSource.querySelector('path').setAttribute("fill", "#000");
    if (eventSource.id === "listView") {
        changeView.href = "./css/dashboardListView.css";
        return;
    }
    changeView.href = "./css/dashboardiconView.css";
}


// sort By
const projects = document.querySelector('.projects');
const sortZone = document.querySelector('#sortBtn');
const sortBox = document.querySelector('.controlSort');
const sortBtns = document.querySelector('.controlSort').querySelectorAll('button');

let flag = true;  //默认隐藏
sortZone.addEventListener('click', (e) => {
    sortBox.removeAttribute('style')
    if (flag) {
        sortBox.style.opacity = "1";
        flag = false;
        e.stopPropagation();
        return;
    }
    sortBox.style.opacity = "0";
    flag = true;
})
document.onclick = function (e) {
    sortBox.style.opacity = "0";
    removeOptionStyle();
}
const removeSortStyle = () => {
    sortBtns.forEach(btn => {
        btn.style.color = "unset";
        btn.querySelector('svg').style.visibility = "hidden";
    })
}
const sortByNewest_Oldest = (target) => {
    removeSortStyle();
    target.style.color = "#4472c4";
    target.querySelector('svg').style.visibility = "visible";
    let sections = document.querySelectorAll('section');
    console.log(sections[0].querySelector('.controlRenameDel'));
    projects.innerHTML = "";
    if (target.textContent.trim() == "Newest") {
        Array.from(sections).sort((a, b) => {
            let data1 = new Date(a.querySelector('#date').innerHTML);
            let data2 = new Date(b.querySelector('#date').innerHTML);
            return data1 - data2;
        }).forEach((item, index) => { projects.innerHTML += item.outerHTML; if (index < 12) projects.innerHTML += "<hr>" });
        sortBox.setAttribute('style', 'opacity:0');
        flag = true;
        sortZone.querySelector('button').innerHTML = "Newest";
        addOptionEvent();
        return;
    }
    Array.from(sections).sort((a, b) => {
        let data1 = new Date(a.querySelector('#date').innerHTML);
        let data2 = new Date(b.querySelector('#date').innerHTML);
        return data2 - data1;
    }).forEach((item, index) => { projects.innerHTML += item.outerHTML; if (index < 12) projects.innerHTML += "<hr>" });
    sortBox.setAttribute('style', 'opacity:0');
    flag = true;
    sortZone.querySelector('button').innerHTML = "Oldest";
    addOptionEvent();
}

const renameFn = (target) => {
    // 创建遮罩层
    // console.log();
    const maskPanel = document.createElement('div');
    maskPanel.className = "maskPanel";
    document.body.appendChild(maskPanel);
    maskPanel.innerHTML = `
    <div class="contentBox">
    <div class="line">
        <h3>Rename “${target.querySelector('p#title').innerHTML}”</h3>
        <span id="close">×</span>
    </div>
    <div class="desc">New project name</div>
    <input type="text" name="project_name" >

    <div class="desc">Description (optional)</div>
    <input type="text" name="description" value="${target.getAttribute('data-desc')}">
    <div class="maskPanelFooter">
        <button type="submit" id="cancelBtn">NO, CANCEL</button>
        <button type="button" id="renameBtn" disabled>YES, RENAME</button>
    </div>
    </div>`;
    document.querySelector('#close').onclick = document.querySelector('#cancelBtn').onclick = () => {
        maskPanel.outerHTML = "";
    }
    const renameBtn = maskPanel.querySelector('#renameBtn');
    const inputBoxs = maskPanel.querySelectorAll('input');
    inputBoxs.forEach(input => {
        input.addEventListener('keyup', () => {
            if (input.value) {
                renameBtn.removeAttribute("disabled");
                renameBtn.style.opacity = 1;
                return;
            }
            renameBtn.disabled = true;
            renameBtn.style.opacity = 0.7;
        })
    })
    renameBtn.onclick = () => {
        const name = inputBoxs[0].value;
        const description = inputBoxs[1].value;
        target.querySelector('#title').innerHTML = name;
        // document.querySelector('#detailContent').querySelector('h4').innerHTML = name;
        // document.querySelector('#detailContent').querySelector('p').innerHTML = description;
        // document.querySelector('#imgDisplay').querySelector('h4').innerHTML = name;
        maskPanel.outerHTML = "";
    }
}

const deleteFn = () => {
    const maskPanel = document.createElement('div');
    maskPanel.className = "maskPanel";
    document.body.appendChild(maskPanel);
    maskPanel.innerHTML = ` <div class="contentBox">
    <div class="line">
        <h3>Delete Confirmation</h3>
        <span id="close">×</span>
    </div>
    <p>This will delete project <b>"new"</b> from your library. To confirm deletion, type the project name in
        the input field.</p>
    <div class="desc type">Type the project name here</div>
    <input type="text" name="del_name">
    <div class="maskPanelFooter">
        <button type="submit" id="cancelBtn">NO, CANCEL</button>
        <button type="reset" id="deleteBtn" disabled>YES, DELETE</button>
    </div>
</div>`;
    const line = document.querySelector('.maskPanel').querySelector('.line');
    line.setAttribute('style', "margin-bottom:15px");
    const maskPanelFooter = document.querySelector('.maskPanel').querySelector('.maskPanelFooter');
    maskPanelFooter.setAttribute('style', "margin-top:45px");
    const deleteBtn = maskPanel.querySelector('#deleteBtn');
    deleteBtn.style.background = "#e21a37";
    // document.querySelector('')
    document.querySelector('#close').onclick = document.querySelector('#cancelBtn').onclick = () => {
        maskPanel.outerHTML = "";
    }
    const input = maskPanel.querySelector('input');
    input.addEventListener('keyup', () => {
        if (input.value) {
            deleteBtn.removeAttribute("disabled");
            deleteBtn.style.opacity = 1;
            return;
        }
        deleteBtn.disabled = true;
        deleteBtn.style.opacity = 0.7;
    })
    const sections = document.querySelectorAll('section')
    deleteBtn.addEventListener('click', () => {
        const hrArr = document.querySelector('.projects').querySelectorAll('hr');
        const iptText = input.value.toLowerCase();
        sections.forEach((section, i) => {
            console.log(section.querySelector('#title').innerHTML.toLowerCase() === iptText);
            if (section.querySelector('#title').innerHTML.toLowerCase() === iptText) {
                section.outerHTML = "";
                hrArr[i].outerHTML = "";
            }
        })
        maskPanel.outerHTML = "";
    })
}

const removeOptionStyle = () => {
    const renameDelZone = document.querySelectorAll('.controlRenameDel');
    renameDelZone.forEach(item => {
        item.style.display = "none";
    })
}
const addOptionEvent = () => {
    const options = document.querySelectorAll('#option');
    options.forEach(option => {
        option.addEventListener('click', (e) => {
            removeOptionStyle();
            const zone = option.parentNode.querySelector('.controlRenameDel');
            zone.style.display = "block";
            e.stopPropagation();
        })
    });
}

async function fetchDataJSON() {
    const response = await fetch("../data/my-projects.json");
    const data = await response.json();
    return data;
}
//返回Promise 用then方法进一步处理
fetchDataJSON().then(data => {
    const Init = () => {
        projects.innerHTML = '';
        for (let i = 0; i < data.length; i++) {
            // console.log(${data[i]['description']}``);
            // i代码读取json的第几个
            projects.innerHTML += `
            <section onclick='readDataforPannel(this,${i})' data-desc="${data[i]['description']}">
            <img class="thumbnail" width="72px" height="72px" src=${data[i]['locationImage']}
                alt="">
            <div class="desc">
                <p id='title'>${data[i]["name"]}</p>
                <p class="createdData">Date created:<span id="date">${data[i]["createdAt"]}</span></p>
            </div>
            <div class="controlRenameDel">
            <button id="renameBtn" onclick='renameFn(this.parentNode.parentNode)'>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10.8667 4.94992L8.03333 2.14992L8.96667 1.21659C9.22222 0.96103 9.53622 0.833252 9.90867 0.833252C10.2807 0.833252 10.5944 0.96103 10.85 1.21659L11.7833 2.14992C12.0389 2.40547 12.1722 2.71392 12.1833 3.07525C12.1944 3.43614 12.0722 3.74436 11.8167 3.99992L10.8667 4.94992ZM9.9 5.93325L2.83333 12.9999H0V10.1666L7.06667 3.09992L9.9 5.93325Z"
                        fill="currentColor" />
                </svg>
                Rename project</button>
            <button id="deleteBtn" onclick="deleteFn()">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M2.6665 12C2.29984 12 1.98606 11.8696 1.72517 11.6087C1.46384 11.3473 1.33317 11.0333 1.33317 10.6667V2H0.666504V0.666667H3.99984V0H7.99984V0.666667H11.3332V2H10.6665V10.6667C10.6665 11.0333 10.5361 11.3473 10.2752 11.6087C10.0138 11.8696 9.69984 12 9.33317 12H2.6665ZM3.99984 9.33333H5.33317V3.33333H3.99984V9.33333ZM6.6665 9.33333H7.99984V3.33333H6.6665V9.33333Z"
                        fill="red" />
                </svg>
                Delete project</button>
            </div>
            <div id="option">
                <img src="./icons/options_icon.svg" alt="" >
            </div>
            </section>
            `;
            if (i < data.length - 1) { projects.innerHTML += "<hr>" }

        }
        projects.querySelector("section").style.background = "#d4deea";
        addOptionEvent();
    }
    Init();
    let sections = projects.querySelectorAll('section');
    // filter
    const searchIpt = document.querySelector('#search');
    const searchBtn = document.querySelector('#searchBtn');

    const searchFilter = () => {
        if (searchIpt.value == "") { Init(); return; }
        const txtArr = searchIpt.value.toLowerCase().split(" ");
        console.log(txtArr);
        const filterArr = new Set();
        txtArr.forEach(txt => {
            data.filter((dataItem, i) => {
                if (dataItem['name'].toLowerCase().search(txt) != -1) {
                    filterArr.add(dataItem['name']);
                    return true;
                }
                return false;
            })
        })
        if (filterArr.size == 0) { Init(); return; }
        settingShow([...filterArr]);
    }
    searchBtn.addEventListener('click', searchFilter, false);
    searchIpt.addEventListener('keydown', (e) => {
        if (e.keyCode == 13) {
            searchFilter();
        }
    }, false);
    const settingShow = function (filterArr) {
        console.log(filterArr);
        projects.innerHTML = "";
        console.log(sections);
        sections.forEach((section, i) => {
            if (filterArr.includes(section.querySelector('#title').innerHTML)) {
                projects.innerHTML += section.outerHTML;
                projects.innerHTML += "<hr>";
            }
        });
        addOptionEvent();
    }
    readDataforPannel = (target, index) => {
        sections = projects.querySelectorAll('section');
        detailContent.innerHTML = `
        <div class="details">
        <div class="title">
            <span id="proDetailsLink"><a href='../detail.html'>Project details</a></span>
            <img src="./icons/external_link_icon.svg" alt="">
        </div>
        <h4>${data[index]['name']}</h4>
        <div class="device_event">
            <div class="devices">
                <img src="./icons/sm_devices_outline_icon.svg" alt="">
                <span><strong>${data[index]['totalDevicesNumber']}</strong> Devices</span>
            </div>
            <div class="event">
                <img src="./icons/signal_cellular_alt_icon.svg" alt="">
                <span><strong>${data[index]['notWorkingDevicesNumber']}</strong> Events</span>
            </div>
        </div>
        <div class="line">
            <span>Last Updated on:</span>
            <span>${data[index]['createdAt']}</span>
        </div>
        <div class="line">
            <span>Date created:</span>
            <span>${data[index]['lastUpdatedAt']}</span>
        </div>
        <div class="line">
            <span>Description:</span>
            <p>${data[index]['description']}.</p>
        </div>
    </div>
        `
        imgDisplay.innerHTML = `
        <h4>${data[index]['name']}</h4>
        <img src=${data[index]['locationImage']} alt="">
        `
        sections.forEach((section) => { section.style.background = "#ffffff" })
        target.style.background = "#d4deea";
    }
}).catch(error => {
    console.error('read json failure');
})
