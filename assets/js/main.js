/*===========================================
    Bostify - PREMIUM MAIN JAVASCRIPT FILE
    Interactive functionality with advanced animations
===========================================*/

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all premium features
    initPremiumAnimations();
    initScrollEffects();
    initDynamicColors();
    initFloatingElements();
    initMobileMenu();
    initCounterAnimations();
    initPerformanceOptimizations();

    // ================================================
    // PREMIUM ANIMATION SYSTEM
    // ================================================

    function initPremiumAnimations() {
        // Add dynamic color classes to key elements
        addDynamicColorClasses();
        
        // Add floating classes to elements
        addFloatingClasses();
        
        // Initialize intersection observers for animations
        setupIntersectionObservers();
    }

    function addDynamicColorClasses() {
        // Target specific words and elements for color animation
        const colorTargets = [
            { selector: '.hero-title', words: ['Elite', 'Fortune', 'AI-Powered', 'Revolutionary', 'World\'s', 'SEO', 'Mastery'] },
            { selector: '.section-title', words: ['Elite', 'Fortune', 'Premium', 'Excellence', 'Revolutionary', 'Success'] },
            { selector: '.service-card h3', words: ['Elite', 'Revolutionary', 'AI-Powered', 'Fortune', 'Premium', 'Supreme'] },
            { selector: '.testimonial-text', words: ['Elite', 'Fortune', 'Revolutionary', 'legendary', 'cutting-edge', 'supreme'] },
            { selector: 'h2, h3', words: ['Elite', 'Fortune', 'Revolutionary', 'Premium', 'Excellence', 'Supreme'] }
        ];

        colorTargets.forEach(target => {
            const elements = document.querySelectorAll(target.selector);
            elements.forEach(element => {
                let html = element.innerHTML;
                target.words.forEach((word, index) => {
                    const colorClass = `dynamic-color-${(index % 3) + 1}`;
                    const regex = new RegExp(`\\b${word}\\b`, 'gi');
                    html = html.replace(regex, `<span class="${colorClass}">${word}</span>`);
                });
                element.innerHTML = html;
            });
        });
    }

    function addFloatingClasses() {
        // Add floating classes to different elements
        const floatingElements = [
            { selector: '.service-icon', class: 'scroll-float-up' },
            { selector: '.stat-number', class: 'scroll-float-left' },
            { selector: '.testimonial-stars', class: 'scroll-float-right' },
            { selector: '.hero-image img', class: 'scroll-float-down' },
            { selector: '.cta-button', class: 'scroll-float-up' }
        ];

        floatingElements.forEach(item => {
            const elements = document.querySelectorAll(item.selector);
            elements.forEach(element => {
                element.classList.add(item.class);
            });
        });
    }

    // ================================================
    // SCROLL-BASED ANIMATION SYSTEM
    // ================================================

    function initScrollEffects() {
        let lastScrollTop = 0;
        let scrollDirection = 'down';
        
        window.addEventListener('scroll', throttle(function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollPercent = scrollTop / (document.documentElement.scrollHeight - window.innerHeight);
            
            // Determine scroll direction
            scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
            lastScrollTop = scrollTop;
            
            // Apply floating effects
            applyFloatingEffects(scrollDirection, scrollPercent);
            
            // Update header based on scroll
            updateHeaderOnScroll(scrollTop);
            
        }, 16)); // ~60fps
    }

    function applyFloatingEffects(direction, scrollPercent) {
        const intensity = Math.sin(scrollPercent * Math.PI * 4) * 15; // Wave effect
        
        // Left floating elements
        const leftElements = document.querySelectorAll('.scroll-float-left');
        leftElements.forEach(element => {
            const baseTransform = direction === 'down' ? intensity : -intensity;
            element.style.transform = `translateX(${baseTransform}px) rotate(${intensity * 0.1}deg)`;
        });

        // Right floating elements  
        const rightElements = document.querySelectorAll('.scroll-float-right');
        rightElements.forEach(element => {
            const baseTransform = direction === 'down' ? -intensity : intensity;
            element.style.transform = `translateX(${baseTransform}px) rotate(${-intensity * 0.1}deg)`;
        });

        // Up floating elements
        const upElements = document.querySelectorAll('.scroll-float-up');
        upElements.forEach(element => {
            const baseTransform = direction === 'down' ? -intensity * 0.5 : intensity * 0.5;
            element.style.transform = `translateY(${baseTransform}px) rotate(${intensity * 0.05}deg)`;
        });

        // Down floating elements
        const downElements = document.querySelectorAll('.scroll-float-down');
        downElements.forEach(element => {
            const baseTransform = direction === 'down' ? intensity * 0.3 : -intensity * 0.3;
            element.style.transform = `translateY(${baseTransform}px) rotate(${-intensity * 0.05}deg)`;
        });
    }

    // ================================================
    // DYNAMIC COLOR SYSTEM
    // ================================================

    function initDynamicColors() {
        // Enhanced color animation with scroll-based variations
        let colorIndex = 0;
        
        setInterval(() => {
            updateDynamicColors(colorIndex);
            colorIndex = (colorIndex + 1) % 4;
        }, 4000); // Change colors every 4 seconds
    }

    function updateDynamicColors(index) {
        const colorSets = [
            ['#667eea', '#764ba2', '#f093fb', '#f5576c'],
            ['#a8edea', '#fed6e3', '#667eea', '#764ba2'],
            ['#f093fb', '#a8edea', '#667eea', '#f5576c'],
            ['#764ba2', '#f5576c', '#a8edea', '#fed6e3']
        ];
        
        const currentColors = colorSets[index];
        
        // Update CSS custom properties for smooth transitions
        document.documentElement.style.setProperty('--dynamic-color-1', currentColors[0]);
        document.documentElement.style.setProperty('--dynamic-color-2', currentColors[1]);
        document.documentElement.style.setProperty('--dynamic-color-3', currentColors[2]);
        document.documentElement.style.setProperty('--dynamic-color-4', currentColors[3]);
    }

    // ================================================
    // FLOATING PARTICLE SYSTEM
    // ================================================

    function initFloatingElements() {
        createFloatingParticles();
        createLiquidOrbs();
    }

    function createFloatingParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'floating-particles';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;
        
        // Create 15 floating particles
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 3}px;
                height: ${Math.random() * 6 + 3}px;
                background: linear-gradient(45deg, #667eea, #764ba2);
                border-radius: 50%;
                opacity: ${Math.random() * 0.4 + 0.1};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatParticle ${Math.random() * 25 + 15}s linear infinite;
            `;
            particleContainer.appendChild(particle);
        }
        
        document.body.appendChild(particleContainer);
    }

    function createLiquidOrbs() {
        const orbContainer = document.createElement('div');
        orbContainer.className = 'liquid-orbs';
        orbContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;
        
        // Create 3 liquid orbs
        const orbConfigs = [
            { size: 250, colors: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.15))', position: { top: '-125px', right: '-125px' } },
            { size: 180, colors: 'linear-gradient(135deg, rgba(240, 147, 251, 0.2), rgba(245, 87, 108, 0.15))', position: { bottom: '-90px', left: '-90px' } },
            { size: 200, colors: 'linear-gradient(135deg, rgba(168, 237, 234, 0.2), rgba(254, 214, 227, 0.15))', position: { top: '60%', left: '80%' } }
        ];
        
        orbConfigs.forEach((config, i) => {
            const orb = document.createElement('div');
            orb.className = `liquid-orb orb-${i + 1}`;
            orb.style.cssText = `
                position: absolute;
                width: ${config.size}px;
                height: ${config.size}px;
                background: ${config.colors};
                border-radius: 50%;
                filter: blur(40px);
                animation: floatOrb ${8 + i * 2}s ease-in-out infinite;
                animation-delay: ${i * 2}s;
            `;
            
            // Apply position
            Object.keys(config.position).forEach(key => {
                orb.style[key] = config.position[key];
            });
            
            orbContainer.appendChild(orb);
        });
        
        document.body.appendChild(orbContainer);
    }

    // ================================================
    // MOBILE MENU SYSTEM
    // ================================================

    function initMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function() {
                toggleMobileMenu();
            });
            
            // Close menu when clicking on nav links
            const navLinks = navMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    closeMobileMenu();
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
                    closeMobileMenu();
                }
            });
        }

        function toggleMobileMenu() {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            animateHamburger(hamburger.classList.contains('active'));
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = hamburger.classList.contains('active') ? 'hidden' : '';
        }

        function closeMobileMenu() {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            animateHamburger(false);
            document.body.style.overflow = '';
        }

        function animateHamburger(isActive) {
            const bars = document.querySelectorAll('.hamburger .bar');
            if (isActive) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        }
    }

    // ================================================
    // COUNTER ANIMATIONS
    // ================================================

    function initCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number, .trust-number');
        
        counters.forEach(counter => {
            const originalText = counter.textContent;
            const target = parseInt(originalText.replace(/\D/g, ''));
            if (isNaN(target)) return;
            
            const duration = 2500; // 2.5 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            let hasAnimated = false;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    const value = Math.ceil(current);
                    
                    if (originalText.includes('%')) {
                        counter.textContent = value + '%';
                    } else if (originalText.includes('+')) {
                        counter.textContent = value + '+';
                    } else if (originalText.includes('K')) {
                        counter.textContent = value + 'K';
                    } else {
                        counter.textContent = value;
                    }
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = originalText;
                }
            };
            
            const counterObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !hasAnimated) {
                        hasAnimated = true;
                        updateCounter();
                        counterObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            counterObserver.observe(counter);
        });
    }

    // ================================================
    // UTILITY FUNCTIONS
    // ================================================

    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    function setupIntersectionObservers() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Add staggered animation delay for grids
                    if (entry.target.closest('.services-grid, .testimonials-grid')) {
                        const siblings = Array.from(entry.target.parentNode.children);
                        const index = siblings.indexOf(entry.target);
                        entry.target.style.animationDelay = `${index * 0.15}s`;
                    }
                }
            });
        }, observerOptions);

        const animateElements = document.querySelectorAll('.glass-effect, .service-card, .testimonial-card, .stat, .cta-content');
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }

    function updateHeaderOnScroll(scrollTop) {
        const header = document.querySelector('.header');
        if (!header) return;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // ================================================
    // SMOOTH SCROLLING
    // ================================================

    function initSmoothScrolling() {
        const scrollToLinks = document.querySelectorAll('a[href^="#"], .scroll-to');
        scrollToLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href.startsWith('#') && href.length > 1) {
                    e.preventDefault();
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                        const targetPosition = targetElement.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // Initialize smooth scrolling
    initSmoothScrolling();

    // ================================================
    // PERFORMANCE OPTIMIZATION MODULE
    // ================================================

    function initPerformanceOptimizations() {
        initLazyLoading();
        preloadCriticalResources();
        setCurrentYear();
    }

    function initLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"], img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    }

    function preloadCriticalResources() {
        const criticalResources = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap'
        ];
        
        criticalResources.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = href;
            link.as = 'style';
            link.onload = function() {
                this.onload = null;
                this.rel = 'stylesheet';
            };
            document.head.appendChild(link);
        });
    }

    function setCurrentYear() {
        const currentYearElements = document.querySelectorAll('.current-year');
        const currentYear = new Date().getFullYear();
        currentYearElements.forEach(el => {
            el.textContent = currentYear;
        });
    }
});

// ================================================
// CSS KEYFRAMES INJECTION
// ================================================

const premiumAnimationCSS = `
    /* Enhanced Color Animation Variables */
    :root {
        --dynamic-color-1: #667eea;
        --dynamic-color-2: #764ba2;
        --dynamic-color-3: #f093fb;
        --dynamic-color-4: #f5576c;
    }

    /* Dynamic Color Classes */
    .dynamic-color-1 { 
        color: var(--dynamic-color-1) !important; 
        transition: color 1.5s ease-in-out;
    }
    .dynamic-color-2 { 
        color: var(--dynamic-color-2) !important; 
        transition: color 1.5s ease-in-out;
    }
    .dynamic-color-3 { 
        color: var(--dynamic-color-3) !important; 
        transition: color 1.5s ease-in-out;
    }

    /* Scroll Float Elements */
    .scroll-float-left,
    .scroll-float-right,
    .scroll-float-up,
    .scroll-float-down {
        transition: transform 0.1s ease-out;
    }

    /* Floating Particles Animation */
    @keyframes floatParticle {
        0% { 
            transform: translateY(100vh) translateX(0) rotate(0deg); 
            opacity: 0;
        }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { 
            transform: translateY(-100px) translateX(50px) rotate(360deg); 
            opacity: 0;
        }
    }

    /* Liquid Orb Animation */
    @keyframes floatOrb {
        0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
        }
        25% { 
            transform: translateY(-30px) translateX(20px) rotate(90deg); 
        }
        50% { 
            transform: translateY(-15px) translateX(-15px) rotate(180deg); 
        }
        75% { 
            transform: translateY(-25px) translateX(10px) rotate(270deg); 
        }
    }

    /* Enhanced Intersection Animations */
    .animate-in {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    /* Enhanced Header Scroll Effect */
    .header.scrolled {
        background: rgba(255, 255, 255, 0.95) !important;
        backdrop-filter: blur(25px) !important;
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1) !important;
    }
    
    .header {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }

    /* Enhanced Mobile Menu */
    .hamburger.active .bar:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    .bar {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Enhanced Glass Effects */
    .glass-effect:hover {
        transform: translateY(-8px) scale(1.02) !important;
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15) !important;
    }

    /* Staggered Grid Animations */
    .services-grid .service-card,
    .testimonials-grid .testimonial-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }

    .services-grid .service-card.animate-in,
    .testimonials-grid .testimonial-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    /* Enhanced Hover Effects */
    .service-card:hover .service-icon {
        transform: scale(1.1) rotate(5deg);
        transition: transform 0.3s ease;
    }

    .testimonial-card:hover .testimonial-stars {
        transform: scale(1.1);
        text-shadow: 0 4px 15px rgba(255, 215, 0, 0.5);
        transition: all 0.3s ease;
    }

    .stat:hover {
        transform: translateY(-10px) scale(1.05);
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
    }

    .cta-button:hover {
        transform: translateY(-3px) scale(1.05);
        box-shadow: 0 20px 40px rgba(102, 126, 234, 0.4);
    }

    /* Responsive Adjustments */
    @media (max-width: 768px) {
        .scroll-float-left,
        .scroll-float-right,
        .scroll-float-up,
        .scroll-float-down {
            transform: none !important;
        }

        .floating-particles .particle {
            width: 3px !important;
            height: 3px !important;
        }

        .liquid-orb {
            width: 120px !important;
            height: 120px !important;
        }
    }

    /* Reduced Motion Support */
    @media (prefers-reduced-motion: reduce) {
        .dynamic-color-1,
        .dynamic-color-2,
        .dynamic-color-3,
        .scroll-float-left,
        .scroll-float-right,
        .scroll-float-up,
        .scroll-float-down {
            animation: none !important;
            transform: none !important;
            transition: none !important;
        }

        .floating-particles,
        .liquid-orbs {
            display: none !important;
        }

        .animate-in {
            animation: none !important;
        }
    }
`;

// Inject premium animation styles
if (!document.getElementById('premium-animation-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'premium-animation-styles';
    styleSheet.textContent = premiumAnimationCSS;
    document.head.appendChild(styleSheet);
}
