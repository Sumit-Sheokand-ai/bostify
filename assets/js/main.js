/*===========================================
    Bostify - PREMIUM MAIN JAVASCRIPT FILE
    Interactive functionality with advanced animations
===========================================*/

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dark theme based on page
    initPageTheme();
    
    // Initialize all premium features
    initPremiumAnimations();
    initScrollEffects();
    // Dynamic colors removed - keeping only gradient effects
    initFloatingElements();
    initMobileMenu();
    initCounterAnimations();
    initPerformanceOptimizations();
    initPremiumInteractions();
    initScrollProgress();
    initWordAnimation();

    // ================================================
    // FLOATING WORDS ANIMATION (Now works on mobile too!)
    // ================================================
    
    function initWordAnimation() {
        const words = ['SEO', 'Marketing', 'Growth', 'Success', 'Excellence', 'Mastery', 'Premium', 'Elite', 'Fortune 500', 'Revolutionary'];
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#fec78a', '#d1a3ff', '#ff9ff3', '#54a0ff'];
        
        function createFloatingWord() {
            const word = words[Math.floor(Math.random() * words.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            const wordElement = document.createElement('div');
            wordElement.textContent = word;
            
            // Adjust size for mobile
            const isMobile = window.innerWidth <= 768;
            const fontSize = isMobile ? Math.random() * 12 + 10 : Math.random() * 20 + 15;
            
            wordElement.style.cssText = `
                position: fixed;
                left: ${Math.random() * (window.innerWidth - 100)}px;
                top: ${window.innerHeight + 50}px;
                color: ${color};
                font-size: ${fontSize}px;
                font-weight: 600;
                pointer-events: none;
                z-index: 1;
                opacity: ${isMobile ? 0.4 : 0.6};
                text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                transition: all 0.1s ease;
            `;
            
            document.body.appendChild(wordElement);
            
            const duration = isMobile ? Math.random() * 8000 + 6000 : Math.random() * 10000 + 8000;
            const drift = Math.random() * 150 - 75;
            
            wordElement.animate([
                { 
                    transform: 'translateY(0px) translateX(0px) rotate(0deg)',
                    opacity: isMobile ? 0.4 : 0.6
                },
                { 
                    transform: `translateY(-${window.innerHeight + 100}px) translateX(${drift}px) rotate(${Math.random() * 180}deg)`,
                    opacity: 0
                }
            ], {
                duration: duration,
                easing: 'linear'
            }).onfinish = () => {
                if (wordElement.parentNode) {
                    wordElement.remove();
                }
            };
        }
        
        // Create words periodically - less frequent on mobile
        const interval = window.innerWidth <= 768 ? 4000 : 3000;
        setInterval(createFloatingWord, interval);
        
        // Create initial words
        setTimeout(() => createFloatingWord(), 1000);
        setTimeout(() => createFloatingWord(), 2000);
        if (window.innerWidth > 768) {
            setTimeout(() => createFloatingWord(), 3000);
        }
    }

    // ================================================
    // SCROLL PROGRESS INDICATOR
    // ================================================
    
    function initScrollProgress() {
        // Create scroll indicator if it doesn't exist
        if (!document.querySelector('.scroll-indicator')) {
            const scrollIndicator = document.createElement('div');
            scrollIndicator.className = 'scroll-indicator';
            scrollIndicator.innerHTML = '<div class="scroll-progress"></div>';
            document.body.prepend(scrollIndicator);
        }

        const scrollProgress = document.querySelector('.scroll-progress');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            if (scrollProgress) {
                scrollProgress.style.width = scrollPercent + '%';
            }
        });
    }

    // ================================================
    // PREMIUM INTERACTION SYSTEM
    // ================================================
    
    function initPremiumInteractions() {
        // Section reveal on scroll
        const sections = document.querySelectorAll('.section, .service-card, .testimonial-card');
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            section.classList.add('section');
            sectionObserver.observe(section);
        });
        
        // Enhanced button click effects
        const buttons = document.querySelectorAll('.cta-button');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
                ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
                ripple.classList.add('ripple-effect');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        console.log('🎯 Premium interactions initialized');
    }

    // ================================================
    // DARK THEME SYSTEM
    // ================================================
    
    function initPageTheme() {
        // Detect current page and apply appropriate theme
        const path = window.location.pathname;
        const body = document.body;
        
        // Remove any existing theme classes
        body.classList.remove('home-theme', 'services-theme', 'about-theme', 'pricing-theme', 'contact-theme', 'blog-theme');
        
        if (path.includes('services') || path.includes('basic-seo') || path.includes('comprehensive-seo') || path.includes('enterprise-seo')) {
            body.classList.add('services-theme');
            console.log('🎨 Applied services dark theme');
        } else if (path.includes('about')) {
            body.classList.add('about-theme');
            console.log('🎨 Applied about dark theme');
        } else if (path.includes('pricing')) {
            body.classList.add('pricing-theme');
            console.log('🎨 Applied pricing dark theme');
        } else if (path.includes('contact')) {
            body.classList.add('contact-theme');
            console.log('🎨 Applied contact dark theme');
        } else if (path.includes('blog') || path.includes('case-studies')) {
            body.classList.add('blog-theme');
            console.log('🎨 Applied blog dark theme');
        } else {
            body.classList.add('home-theme');
            console.log('🎨 Applied home dark theme');
        }
    }

    // ================================================
    // PREMIUM ANIMATION SYSTEM
    // ================================================

    function initPremiumAnimations() {
        console.log('🚀 Initializing Premium Animation System...');
        
        // Add floating classes to elements (gradient effects only)
        addFloatingClasses();
        
        // Apply floating effects immediately
        applyFloatingEffects();
        
        // Initialize intersection observers for animations
        setupIntersectionObservers();
        
        // Force re-application after DOM fully settles
        setTimeout(() => {
            console.log('🔄 Secondary animation pass...');
            addFloatingClasses();
            applyFloatingEffects();
            
            // Log current state for debugging
            const heroTitle = document.querySelector('.hero-title');
            if (heroTitle) {
                console.log('🎯 Hero title content:', heroTitle.innerHTML);
                console.log('🎨 Gradient elements active with enhanced animations');
            }
        }, 1000);
    }

    // ================================================
    // FLOATING CLASSES SYSTEM (Gradient Effects Only)
    // ================================================

    function addFloatingClasses() {
        // Add floating classes to different elements (no dynamic colors)
        const floatingElements = [
            { selector: '.service-icon', class: 'scroll-float-up' },
            { selector: '.stat-number', class: 'scroll-float-left' },
            { selector: '.testimonial-stars', class: 'scroll-float-right' },
            { selector: '.hero-image img', class: 'scroll-float-down' },
            { selector: '.cta-button', class: 'scroll-float-up' },
            { selector: '.section-title', class: 'scroll-float-up' },
            { selector: '.hero-subtitle', class: 'scroll-float-down' },
            { selector: '.key-phrase', class: 'scroll-float-up' }
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
        const intensity = Math.sin(scrollPercent * Math.PI * 6) * 12; // More gentle wave effect
        const rotation = Math.sin(scrollPercent * Math.PI * 8) * 3; // Subtle rotation
        
        // Left floating elements
        const leftElements = document.querySelectorAll('.scroll-float-left');
        leftElements.forEach((element, index) => {
            const baseTransform = direction === 'down' ? intensity : -intensity;
            const delay = index * 0.1; // Stagger the animations
            const offsetIntensity = intensity + Math.sin((scrollPercent + delay) * Math.PI * 4) * 5;
            element.style.transform = `translateX(${baseTransform + offsetIntensity}px) rotate(${rotation}deg)`;
        });

        // Right floating elements  
        const rightElements = document.querySelectorAll('.scroll-float-right');
        rightElements.forEach((element, index) => {
            const baseTransform = direction === 'down' ? -intensity : intensity;
            const delay = index * 0.1;
            const offsetIntensity = intensity + Math.sin((scrollPercent + delay) * Math.PI * 4) * 5;
            element.style.transform = `translateX(${baseTransform - offsetIntensity}px) rotate(${-rotation}deg)`;
        });

        // Up floating elements
        const upElements = document.querySelectorAll('.scroll-float-up');
        upElements.forEach((element, index) => {
            const baseTransform = direction === 'down' ? -intensity * 0.7 : intensity * 0.7;
            const delay = index * 0.1;
            const offsetIntensity = intensity + Math.sin((scrollPercent + delay) * Math.PI * 5) * 4;
            element.style.transform = `translateY(${baseTransform + offsetIntensity}px) rotate(${rotation * 0.5}deg)`;
        });

        // Down floating elements
        const downElements = document.querySelectorAll('.scroll-float-down');
        downElements.forEach((element, index) => {
            const baseTransform = direction === 'down' ? intensity * 0.4 : -intensity * 0.4;
            const delay = index * 0.1;
            const offsetIntensity = intensity + Math.sin((scrollPercent + delay) * Math.PI * 3) * 3;
            element.style.transform = `translateY(${baseTransform - offsetIntensity}px) rotate(${-rotation * 0.5}deg)`;
        });
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
            
            // Close menu when clicking on nav links with enhanced touch feedback
            const navLinks = navMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                // Add touch feedback for mobile
                link.addEventListener('touchstart', function(e) {
                    this.style.transform = 'translateY(-2px) scale(1.02)';
                    this.style.background = 'rgba(102, 126, 234, 0.3)';
                });
                
                link.addEventListener('touchend', function(e) {
                    setTimeout(() => {
                        this.style.transform = '';
                        this.style.background = '';
                    }, 150);
                });
                
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
    /* Enhanced Scroll and Floating Animation Variables */
    :root {
        --premium-gradient: linear-gradient(45deg, #ff0844, #ffb199, #ff6348, #ff9472, #ff6b9d, #c44569);
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

// ================================================
// BROKEN BUTTON EFFECT FOR RETURNING USERS
// ================================================

function initBrokenButtonEffect() {
    console.log('🔧 Initializing broken button effect system...');
    
    // Track page visits and button interactions
    const pageKey = `boostify_page_${window.location.pathname}`;
    const buttonClickKey = `boostify_button_clicks_${window.location.pathname}`;
    const visitCountKey = `boostify_visit_count_${window.location.pathname}`;
    
    // Get previous visit data
    const lastVisit = localStorage.getItem(pageKey);
    const buttonClicks = parseInt(localStorage.getItem(buttonClickKey) || '0');
    const visitCount = parseInt(localStorage.getItem(visitCountKey) || '0');
    const currentTime = Date.now();
    
    // Increment visit count
    const newVisitCount = visitCount + 1;
    localStorage.setItem(visitCountKey, newVisitCount.toString());
    localStorage.setItem(pageKey, currentTime.toString());
    
    console.log(`📊 Visit data - Count: ${newVisitCount}, Button clicks: ${buttonClicks}, Last visit: ${lastVisit}`);
    
    // Check if user is returning (2nd+ visit OR within 24 hours OR clicked buttons multiple times)
    const isReturningUser = newVisitCount > 1 || 
                           (lastVisit && (currentTime - parseInt(lastVisit)) < 86400000) || 
                           buttonClicks > 2;
    
    console.log(`🔍 Returning user check: ${isReturningUser}`);
    
    // Apply broken effect if conditions are met
    if (isReturningUser) {
        console.log('✅ Applying broken effect for returning user');
        applyBrokenEffect();
    } else {
        console.log('👋 First-time visitor - effects will trigger on return');
    }
    
    // Track button clicks
    trackButtonClicks();
}

function applyBrokenEffect() {
    console.log('🔨 Applying broken button effects for returning user');
    
    setTimeout(() => {
        const buttons = document.querySelectorAll('.cta-button');
        
        buttons.forEach((button, index) => {
            // Stagger the broken effect application
            setTimeout(() => {
                button.classList.add('broken');
                
                // Create crack line element
                const crackLine = document.createElement('div');
                crackLine.className = 'crack-line';
                button.appendChild(crackLine);
                
                // Create debris elements
                for (let i = 0; i < 3; i++) {
                    const debris = document.createElement('div');
                    debris.className = 'debris';
                    button.appendChild(debris);
                }
                
                // Store original button content
                const originalText = button.textContent;
                const originalHTML = button.innerHTML;
                
                // Create broken text overlay that appears on the pieces
                const leftPiece = document.createElement('div');
                leftPiece.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 50%;
                    bottom: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #cccccc;
                    font-weight: inherit;
                    font-size: inherit;
                    z-index: 4;
                    pointer-events: none;
                    overflow: hidden;
                `;
                
                const rightPiece = document.createElement('div');
                rightPiece.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 50%;
                    right: 0;
                    bottom: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #cccccc;
                    font-weight: inherit;
                    font-size: inherit;
                    z-index: 4;
                    pointer-events: none;
                    overflow: hidden;
                `;
                
                // Split text for broken effect
                const brokenTexts = [
                    '⚡ SYS ERR',
                    '💥 OVERLOAD', 
                    '🔧 MAINT',
                    '⚠️ DAMAGE',
                    '🔨 BROKEN',
                    '💔 CRACK'
                ];
                
                const brokenText = brokenTexts[Math.floor(Math.random() * brokenTexts.length)];
                const textParts = brokenText.split(' ');
                
                if (textParts.length >= 2) {
                    leftPiece.textContent = textParts[0];
                    rightPiece.textContent = textParts.slice(1).join(' ');
                } else {
                    const halfIndex = Math.ceil(brokenText.length / 2);
                    leftPiece.textContent = brokenText.substring(0, halfIndex);
                    rightPiece.textContent = brokenText.substring(halfIndex);
                }
                
                // Clear original content and add pieces
                button.innerHTML = '';
                button.appendChild(crackLine);
                button.appendChild(leftPiece);
                button.appendChild(rightPiece);
                
                // Add debris
                for (let i = 0; i < 3; i++) {
                    const debris = document.createElement('div');
                    debris.className = 'debris';
                    button.appendChild(debris);
                }
                
                // Store original content for restoration
                button.setAttribute('data-original-html', originalHTML);
                
                // Restore original content after 5 seconds
                setTimeout(() => {
                    if (Math.random() < 0.7) { // 70% chance to restore
                        button.innerHTML = originalHTML;
                        // Keep the broken class for visual effects
                        // but restore functionality
                    }
                }, 5000);
                
                // Enhanced broken button click effect
                button.addEventListener('click', function(e) {
                    // Add shatter effect on click
                    button.style.animation = 'bulletImpact 0.6s ease-out, brokenGlitch 0.8s ease-out';
                    
                    // Create shatter particles at click point
                    createShatterEffect(e.target, e.clientX, e.clientY);
                    
                    setTimeout(() => {
                        button.style.animation = '';
                    }, 1400);
                });
                
            }, index * 800); // Longer stagger for dramatic effect
        });
    }, 1500); // Longer delay for suspense
}

function trackButtonClicks() {
    const buttons = document.querySelectorAll('.cta-button');
    const buttonClickKey = `boostify_button_clicks_${window.location.pathname}`;
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const currentClicks = parseInt(localStorage.getItem(buttonClickKey) || '0');
            localStorage.setItem(buttonClickKey, (currentClicks + 1).toString());
            
            console.log(`🖱️ Button clicked! Total clicks: ${currentClicks + 1}`);
            
            // Apply broken effect after 3 clicks on same page
            if (currentClicks + 1 > 2) {
                console.log('🔥 Multiple clicks detected - triggering broken effect');
                setTimeout(() => {
                    applyBrokenEffect();
                }, 500);
            }
        });
    });
}

// Test function to manually trigger broken effect
function testBrokenEffect() {
    console.log('🧪 Testing broken button effect manually...');
    applyBrokenEffect();
}

// Test function for dramatic crack effect
function testDramaticCrack() {
    console.log('🧪 Testing dramatic crack effect...');
    const button = document.querySelector('.cta-button');
    if (button) {
        const rect = button.getBoundingClientRect();
        createShatterEffect(button, rect.left + rect.width/2, rect.top + rect.height/2);
    }
}

// Enhanced button hover effects with color transitions
function initEnhancedButtonEffects() {
    const buttons = document.querySelectorAll('.cta-button');
    const isMobile = window.innerWidth <= 768;
    
    buttons.forEach(button => {
        // Mobile-optimized touch events
        if (isMobile) {
            // Use touchstart for immediate feedback on mobile
            button.addEventListener('touchstart', function(e) {
                if (!button.classList.contains('broken')) {
                    button.style.filter = 'hue-rotate(45deg) saturate(1.2) brightness(1.1)';
                    button.style.transform = 'translateY(-2px) scale(1.01)';
                }
            });
            
            button.addEventListener('touchend', function(e) {
                if (!button.classList.contains('broken')) {
                    button.style.filter = '';
                    button.style.transform = '';
                }
            });
            
            // Prevent double-tap zoom on buttons
            button.addEventListener('touchend', function(e) {
                e.preventDefault();
            });
        } else {
            // Desktop hover effects
            button.addEventListener('mouseenter', function() {
                if (!button.classList.contains('broken')) {
                    button.style.filter = 'hue-rotate(45deg) saturate(1.2) brightness(1.1)';
                    button.style.transform = 'translateY(-3px) scale(1.02)';
                }
            });
            
            button.addEventListener('mouseleave', function() {
                if (!button.classList.contains('broken')) {
                    button.style.filter = '';
                    button.style.transform = '';
                }
            });
        }
        
        // Enhanced click effect with color burst (works for both touch and click)
        button.addEventListener('click', function(e) {
            if (!button.classList.contains('broken')) {
                // Create color burst effect
                createColorBurst(e.target, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY);
            }
        });
    });
}

function createColorBurst(button, x, y) {
    const burst = document.createElement('div');
    const rect = button.getBoundingClientRect();
    const isMobile = window.innerWidth <= 768;
    
    const burstSize = isMobile ? 3 : 4;
    const particleCount = isMobile ? 4 : 6;
    const animationDuration = isMobile ? 0.6 : 0.8;
    
    burst.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: ${burstSize}px;
        height: ${burstSize}px;
        background: radial-gradient(circle, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: colorBurstExpand ${animationDuration}s ease-out forwards;
    `;
    
    document.body.appendChild(burst);
    
    // Create multiple burst particles - mobile optimized
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            const particle = burst.cloneNode();
            const spreadRange = isMobile ? 30 : 50;
            particle.style.left = (x + (Math.random() - 0.5) * spreadRange) + 'px';
            particle.style.top = (y + (Math.random() - 0.5) * spreadRange) + 'px';
            particle.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), isMobile ? 600 : 800);
        }, i * (isMobile ? 30 : 50));
    }
    
    setTimeout(() => burst.remove(), isMobile ? 600 : 800);
}

// Enhanced shatter effect for broken buttons
function createShatterEffect(button, x, y) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const isMobile = window.innerWidth <= 768;
    
    // Mobile optimization: fewer particles, smaller size
    const particleCount = isMobile ? 6 : 12;
    
    // Create shatter particles from click point
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        
        // Random particle shapes (triangular debris)
        const shapes = ['🔹', '🔸', '▪️', '▫️', '◾', '◽'];
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        
        const particleSize = isMobile ? Math.random() * 6 + 3 : Math.random() * 8 + 4;
        const animationDuration = isMobile ? Math.random() * 1.5 + 0.8 : Math.random() * 2 + 1;
        
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            font-size: ${particleSize}px;
            color: #666;
            pointer-events: none;
            z-index: 9999;
            animation: shatterParticle ${animationDuration}s ease-out forwards;
        `;
        
        particle.textContent = randomShape;
        
        // Random direction from click point
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = isMobile ? Math.random() * 60 + 30 : Math.random() * 100 + 50;
        const endX = x + Math.cos(angle) * velocity;
        const endY = y + Math.sin(angle) * velocity + Math.random() * (isMobile ? 30 : 50);
        
        particle.style.setProperty('--endX', endX + 'px');
        particle.style.setProperty('--endY', endY + 'px');
        particle.style.setProperty('--rotation', Math.random() * 720 + 'deg');
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), isMobile ? 1200 : 2000);
    }
    
    // Create crack effect from center to click point (desktop only for performance)
    if (!isMobile) {
        createCrackEffect(centerX, centerY, x, y);
    }
}

function createCrackEffect(startX, startY, endX, endY) {
    const crack = document.createElement('div');
    
    const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
    
    crack.style.cssText = `
        position: fixed;
        left: ${startX}px;
        top: ${startY}px;
        width: ${length}px;
        height: 2px;
        background: linear-gradient(to right, 
            transparent 0%, 
            rgba(255,255,255,0.8) 20%, 
            rgba(0,0,0,0.9) 50%, 
            rgba(255,255,255,0.6) 80%, 
            transparent 100%
        );
        transform-origin: 0 50%;
        transform: rotate(${angle}deg);
        pointer-events: none;
        z-index: 9998;
        animation: crackAppear 0.3s ease-out forwards, crackFade 1s ease-out 0.3s forwards;
    `;
    
    document.body.appendChild(crack);
    
    setTimeout(() => crack.remove(), 1500);
}

// Add color burst animation CSS
const colorBurstCSS = `
    @keyframes colorBurstExpand {
        0% { 
            transform: scale(1) translate(-50%, -50%);
            opacity: 1;
        }
        100% { 
            transform: scale(15) translate(-50%, -50%);
            opacity: 0;
        }
    }
    
    @keyframes shatterParticle {
        0% { 
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
        }
        100% { 
            transform: translate(var(--endX, 100px), var(--endY, 100px)) rotate(var(--rotation, 360deg));
            opacity: 0;
        }
    }
    
    @keyframes crackAppear {
        0% { 
            width: 0;
            opacity: 0;
        }
        100% { 
            opacity: 1;
        }
    }
    
    @keyframes crackFade {
        0% { 
            opacity: 1;
        }
        100% { 
            opacity: 0;
        }
    }
`;

// Inject color burst styles
if (!document.getElementById('color-burst-styles')) {
    const burstStyleSheet = document.createElement('style');
    burstStyleSheet.id = 'color-burst-styles';
    burstStyleSheet.textContent = colorBurstCSS;
    document.head.appendChild(burstStyleSheet);
}

// Initialize broken button effects
initBrokenButtonEffect();
initEnhancedButtonEffects();

// Test function for broken button effect (remove in production)
function testBrokenEffect() {
    console.log('🔧 Testing enhanced broken button effect with zigzag cracking...');
    applyBrokenEffect();
}

// Immediate test for dramatic crack effect
function testDramaticCrack() {
    console.log('💥 Testing dramatic button crack effect...');
    const buttons = document.querySelectorAll('.cta-button');
    buttons.forEach(button => {
        // Simulate click at center of button for dramatic effect
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        button.classList.add('broken');
        
        // Create instant dramatic effect
        setTimeout(() => {
            createShatterEffect(button, centerX, centerY);
        }, 500);
    });
}

// Add test triggers - press Ctrl+Shift+B to test broken effect, Ctrl+Shift+C for dramatic crack
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'B') {
        testBrokenEffect();
    }
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        testDramaticCrack();
    }
});

console.log('🎨 Enhanced button effects with color gradients and broken state initialized');
console.log('💡 Press Ctrl+Shift+B to test broken button effect');
console.log('🔥 Press Ctrl+Shift+C to test dramatic crack effect');
console.log('🔄 Visit the same page again to see broken effect naturally');

// AUTO-TEST FOR DEBUGGING - SIMULATE RETURN VISIT AFTER 5 SECONDS
setTimeout(() => {
    console.log('🧪 Auto-testing broken effect after 5 seconds for verification...');
    console.log('🔧 Force-triggering broken effect for testing purposes');
    applyBrokenEffect();
}, 5000);

console.log('🎨 Enhanced button effects with color gradients and broken state initialized');
console.log('💡 Press Ctrl+Shift+B to test broken button effect');
console.log('� Press Ctrl+Shift+C to test dramatic crack effect');
console.log('�🔄 Visit the same page again to see broken effect naturally');
