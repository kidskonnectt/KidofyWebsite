document.addEventListener('DOMContentLoaded', () => {
    loadComponents();
    initAnimations();
});

// Load header and footer components
async function loadComponents() {
    try {
        const headerRes = await fetch('components/navbar.html');
        const headerHtml = await headerRes.text();
        document.getElementById('header-placeholder').innerHTML = headerHtml;

        const footerRes = await fetch('components/footer.html');
        const footerHtml = await footerRes.text();
        document.getElementById('footer-placeholder').innerHTML = footerHtml;
        
        // Initialize footer JS after loading
        initFooterInteractions();

    } catch (error) {
        console.error('Error loading components:', error);
    }
}

function initFooterInteractions() {
    const subscribeBtn = document.querySelector('.newsletter button');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', () => {
            const input = document.querySelector('.newsletter input');
            if (input.value) {
                alert('Thank you for subscribing! ');
                input.value = '';
            } else {
                alert('Please enter an email address!');
            }
        });
    }
}

// Scroll Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
}

// 3D Parallax Effect for shapes
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 2;
        const xOffset = (window.innerWidth / 2 - e.clientX) / speed;
        const yOffset = (window.innerHeight / 2 - e.clientY) / speed;
        shape.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(${x * 20}deg)`;
    });
});
