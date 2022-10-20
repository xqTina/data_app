const menuBar = document.querySelector('.menu_bar');
const menuBar_lis = document.querySelectorAll('li');
const currentColor = "#ffffff";
menuBar_lis.forEach(li=>{
    li.addEventListener('click',function(){
        removeLiStyle();
        li.querySelector('path').setAttribute('fill',currentColor);
    })
})

const removeLiStyle = function(){
    menuBar_lis.forEach(li=>{
        li.querySelector('path').setAttribute('fill','#000');
    })
    
}