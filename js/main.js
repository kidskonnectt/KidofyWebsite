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

        // Initialize header and footer JS after loading
        initHeaderInteractions();
        initFooterInteractions();

    } catch (error) {
        console.error('Error loading components:', error);
    }
}

function initHeaderInteractions() {
    const navbar = document.querySelector('.navbar');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    let lastScroll = 0;

    // Mobile Menu Toggle
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Advanced Scroll Header (Hide/Unhide)
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.classList.remove('nav-hidden');
            return;
        }

        if (currentScroll > lastScroll && !navbar.classList.contains('nav-hidden')) {
            // Scroll Down - Hide
            navbar.classList.add('nav-hidden');
        } else if (currentScroll < lastScroll && navbar.classList.contains('nav-hidden')) {
            // Scroll Up - Show
            navbar.classList.remove('nav-hidden');
        }
        lastScroll = currentScroll;
    });

    // Close menu on link click
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn?.classList.remove('active');
            navLinks?.classList.remove('active');
        });
    });
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
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply reveal classes globally to all cards and major sections
    const hiddenElements = document.querySelectorAll('.clay-card, .title-3d, .premium-feature-showcase');
    hiddenElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// 3D Parallax Effect for background dots
document.addEventListener('mousemove', (e) => {
    const layers = document.querySelectorAll('.dot-layer');

    layers.forEach((layer, index) => {
        const speed = (index + 1) * 30; // Subtler parallax for dots
        const xOffset = (window.innerWidth / 2 - e.clientX) / speed;
        const yOffset = (window.innerHeight / 2 - e.clientY) / speed;
        layer.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});
