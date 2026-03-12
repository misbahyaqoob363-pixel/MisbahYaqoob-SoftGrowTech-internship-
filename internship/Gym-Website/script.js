
const nav = document.querySelector('nav ul');
const logo = document.querySelector('.logo');

logo.addEventListener('click', () => {
    nav.classList.toggle('active');
});