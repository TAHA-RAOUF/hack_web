// Countdown Timer Section
const setupCountdown = () => {
    const countdownDate = new Date('2025-02-16T00:00:00').getTime();
    const countdownInterval = setInterval(updateCountdown, 1000);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance <= 0) {
            clearInterval(countdownInterval);
            document.getElementById('days').innerText = "00";
            document.getElementById('hours').innerText = "00";
            document.getElementById('minutes').innerText = "00";
            document.getElementById('seconds').innerText = "00"; 
            
            document.querySelector('.cta-text').innerHTML = "Time is Over ⌛";

            document.querySelector('.cta-button').removeAttribute('href');
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0'); 
    }

    updateCountdown(); 
};


// Animation for Rules 
const setupIntersectionObserver = () => {
    const rulesSection = document.getElementById('rules-section');

    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                rulesSection.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    };

    const observer = new IntersectionObserver(handleIntersection, {
        root: null,  
        threshold: 0.5 
    });

    observer.observe(rulesSection);
};

// Initialize everything 
document.addEventListener('DOMContentLoaded', () => {
    setupCountdown(); 
    setupIntersectionObserver(); 
});
