
const mainHeader = document.querySelector('header.header');

const SCROLL_THRESHOLD = 20; 


window.addEventListener('scroll', () => {
    if (window.scrollY > SCROLL_THRESHOLD) {
        mainHeader.classList.add('scrolled');
    } else {
        mainHeader.classList.remove('scrolled');
    }
});

