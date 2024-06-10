const gridItems = document.querySelectorAll('.grid-item');
const modal = document.getElementById('modal');
const modalContent = document.querySelector('.modal-content');


gridItems.forEach(function (item) {
    item.addEventListener('click', function () {
        const itemContent = this.querySelector('p').textContent;
        const itemImg = this.querySelector('img');
        modalContent.innerHTML = `
            <img src='${itemImg.src}'>
            <p>${itemContent} Details</p>
        `
        modal.style.display = 'block';
    });
});

modal.addEventListener('click', function (event) {
    if (event.target === this) {
        modal.style.display = 'none';
    }
});

