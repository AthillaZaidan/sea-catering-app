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

const categoryButtons = document.querySelectorAll('.plan-category');
const mealPlanCards = document.querySelectorAll('.meal-plan-card');
const mealPlanContainer = document.querySelector('.meal-plan-container');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const selectedCategory = button.dataset.category;

        if (selectedCategory === 'all') {
            mealPlanContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
            mealPlanContainer.style.justifyContent = 'center';
        } else {
            mealPlanContainer.style.gridTemplateColumns = 'minmax(300px, 1fr)';
            mealPlanContainer.style.justifyContent = 'center';
        }

        mealPlanCards.forEach(card => {
            const cardCategory = card.dataset.category;

            if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                card.style.display = 'flex';
                setTimeout(() => { 
                    card.classList.remove('hidden');
                }, 10);
            } else {
                card.classList.add('hidden'); 
                setTimeout(() => {
                    card.style.display = 'none';
                }, 10); 
            }
        });
    });
});


const mealDetailsModal = document.getElementById('mealDetailsModal');
const closeButton = document.querySelector('.modal .close-button');
const seeMoreButtons = document.querySelectorAll('.see-more-meal');

const modalPlanName = document.getElementById('modalPlanName');
const modalPlanPrice = document.getElementById('modalPlanPrice');
const modalPlanDescription = document.getElementById('modalPlanDescription');
const modalPlanBenefits = document.getElementById('modalPlanBenefits');

const mealPlanData = {
    diet: {
        name: "Diet Plan",
        price: "Rp30.000,00 per meal",
        description: "A strict diet program with controlled portions and balanced nutrition for healthy and sustainable weight loss. Low-calorie and high-fiber meals to keep you feeling full longer.",
        benefits: [
            "Controlled weight loss",
            "Boosts metabolism",
            "Measured and balanced portions",
            "Rich in fiber and nutrients"
        ]
    },
    protein: {
        name: "Protein Plan",
        price: "Rp40.000,00 per meal",
        description: "A high-protein meal plan designed to support muscle growth, post-workout recovery, and maintain muscle mass. Suitable for athletes and those with active lifestyles.",
        benefits: [
            "Supports muscle growth",
            "Fast muscle recovery",
            "High-quality protein sources",
            "Increases strength and endurance"
        ]
    },
    royal: {
        name: "Royal Plan",
        price: "Rp60.000,00 per meal",
        description: "An exclusive plan offering gourmet healthy meals with premium ingredients and exquisite flavors. Experience luxury in every bite, prepared by professional chefs.",
        benefits: [
            "Premium organic ingredients",
            "Exclusive and gourmet menus",
            "Prepared by professional chefs",
            "Luxurious dining experience"
        ]
    }
};

function openModal(planKey) {
    const plan = mealPlanData[planKey];
    if (plan) {
        modalPlanName.textContent = plan.name;
        modalPlanPrice.textContent = plan.price;
        modalPlanDescription.textContent = plan.description;

        modalPlanBenefits.innerHTML = '';
        plan.benefits.forEach(benefit => {
            const li = document.createElement('li');
            li.textContent = benefit;
            modalPlanBenefits.appendChild(li);
        });

        mealDetailsModal.style.display = 'flex';
    }
}

function closeModal() {
    mealDetailsModal.style.display = 'none';
}

seeMoreButtons.forEach(button => {
    button.addEventListener('click', () => {
        const planKey = button.dataset.plan;
        openModal(planKey);
    });
});

if (closeButton) {
    closeButton.addEventListener('click', closeModal);
}

window.addEventListener('click', (event) => {
    if (event.target === mealDetailsModal) {
        closeModal();
    }
});