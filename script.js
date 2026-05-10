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
        const navLinks = navMenu.querySelectorAll('.nav-link, .dropdown-item');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // If it's a dropdown toggle, don't close the menu
                if (link.classList.contains('dropdown-toggle')) {
                    return;
                }
                
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

    // ── Google Analytics Load Logic ──────────────────────────────────────────
    function loadGoogleAnalytics() {
        if(document.getElementById('gtag-script')) return;
        const script = document.createElement('script');
        script.id = 'gtag-script';
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-3E25T5PT6M';
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-3E25T5PT6M');
    }

    // ── Cookie Banner Logic ──────────────────────────────────────────────────
    if (localStorage.getItem('cookieConsent') === 'true') {
        loadGoogleAnalytics();
    } else {
        const cookieHTML = `
            <div id="cookieBanner" class="cookie-banner">
                <div class="container cookie-content">
                    <p class="cookie-text">
                        <i class="fa-solid fa-cookie-bite"></i> 
                        Web sitemizdeki deneyiminizi geliştirmek için zorunlu ve işlevsel çerezler kullanılmaktadır. 
                        Detaylı bilgi için <a href="cerez-politikasi.html">Çerez Politikası</a> metnimizi inceleyebilirsiniz.
                    </p>
                    <div class="cookie-buttons">
                        <button id="acceptCookies" class="btn-cookie">Kabul Et</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', cookieHTML);
        
        // Show after a short delay for animation effect
        setTimeout(() => {
            const banner = document.getElementById('cookieBanner');
            if (banner) banner.classList.add('show');
        }, 1000);

        document.getElementById('acceptCookies')?.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'true');
            loadGoogleAnalytics();
            const banner = document.getElementById('cookieBanner');
            if (banner) {
                banner.classList.remove('show');
                setTimeout(() => banner.remove(), 600); // Wait for transition
            }
        });
    }

    // ── Formspree AJAX Submission ─────────────────────────────────────────────
    const iletisimFormu = document.getElementById('iletisimFormu');
    if (iletisimFormu) {
        iletisimFormu.addEventListener('submit', async function(e) {
            e.preventDefault(); // Prevent Formspree redirect
            const submitBtn = iletisimFormu.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = "Gönderiliyor...";
            submitBtn.disabled = true;

            try {
                const response = await fetch(iletisimFormu.action, {
                    method: 'POST',
                    body: new FormData(iletisimFormu),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.');
                    iletisimFormu.reset();
                } else {
                    alert('Mesajınız gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
                }
            } catch (error) {
                alert('Bağlantı hatası oluştu. Lütfen internetinizi kontrol edip tekrar deneyin.');
            } finally {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});
