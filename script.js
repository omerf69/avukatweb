document.addEventListener('DOMContentLoaded', () => {

    // ── Navbar Scroll Effect ──────────────────────────────────────────────────
    const header = document.getElementById('mainHeader');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ── Close mobile menu when a nav link is clicked ─────────────────────────
    // Bootstrap handles the toggle, but we still want clicks on links to close it.
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Use Bootstrap's Collapse API to hide the menu
                const bsCollapse = bootstrap.Collapse.getInstance(navMenu);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            });
        });
    }

    // ── Modern Scroll Reveal Animation (Intersection Observer) ─────────
    const revealSelectors = [
        '.section-title', 
        '.service-card', 
        '.about-content', 
        '.about-image', 
        '.contact-container', 
        '.contact-info', 
        '.contact-form-wrapper', 
        '.footer-about', 
        '.footer-links', 
        '.footer-social', 
        '.card', 
        '.text-center.mt-5 > .btn',
        '.tbb-disclaimer'
    ];
    
    const elementsToReveal = document.querySelectorAll(revealSelectors.join(', '));
    
    elementsToReveal.forEach(el => {
        el.classList.add('reveal-item');
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    });

    elementsToReveal.forEach(el => {
        revealObserver.observe(el);
    });
});
