const mainHeader = document.querySelector('header.header');
const mainNavigation = document.querySelector('nav.navigation'); 

const SCROLL_THRESHOLD = 20; 


window.addEventListener('scroll', () => {
    if (mainHeader && mainNavigation) { 
        if (window.scrollY > SCROLL_THRESHOLD) {
            mainHeader.classList.add('scrolled');
            mainNavigation.classList.add('scrolled'); 
        } else {
            mainHeader.classList.remove('scrolled');
            mainNavigation.classList.remove('scrolled');
        }
    }
});

const navLinks = document.querySelectorAll('.navigation .navlink');

function highlightActivePage() {
    const currentHash = window.location.hash; 
    const activePageIdentifier = currentHash === '' ? '#home' : currentHash;

    navLinks.forEach(link => {
        link.classList.remove('active'); 

        if (link.getAttribute('href') === activePageIdentifier) {
            link.classList.add('active');
        }
    });
}


document.addEventListener('DOMContentLoaded', highlightActivePage);

window.addEventListener('hashchange', highlightActivePage);