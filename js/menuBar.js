const menuBar = document.querySelector('.menu_bar');
const menuBar_lis = document.querySelectorAll('li');
const currentColor = "#ffffff";
menuBar_lis.forEach(li => {
    li.addEventListener('click', function () {
        location.href = `../${li.getAttribute('data-value')}.html`;
    })
})
