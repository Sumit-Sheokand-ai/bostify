/*===========================================
    Bostify - PREMIUM MAIN JAVASCRIPT FILE
    Interactive functionality with advanced animations
===========================================*/

document.addEventListener('DOMContentLoaded', function() {
    // Initialize core functionalities
    initPageTheme();
    initPremiumAnimations();
    initScrollEffects();
    initFloatingElements();
    initMobileMenu(); // Centralized mobile menu logic
    initCounterAnimations();
    initPerformanceOptimizations();
    initPremiumInteractions();
    initScrollProgress();
    initWordAnimation();
    initSmoothScrolling();
    initTouchFeedback(); // Centralized touch feedback for all elements

    // ================================================
    // FLOATING WORDS ANIMATION
    // ================================================
    function initWordAnimation() {
        const words = ['SEO', 'Marketing', 'Growth', 'Success', 'Excellence', 'Mastery', 'Premium', 'Elite', 'Fortune 500', 'Revolutionary'];
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#fec78a', '#d1a3ff', '#ff9ff3', '#54a0ff'];
        
        function createFloatingWord() {
            const word = words[Math.floor(Math.random() * words.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            const wordElement = document.createElement('div');
            wordElement.textContent = word;
            
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
                { transform: 'translateY(0px) translateX(0px) rotate(0deg)', opacity: isMobile ? 0.4 : 0.6 },
                { transform: `translateY(-${window.innerHeight + 100}px) translateX(${drift}px) rotate(${Math.random() * 180}deg)`, opacity: 0 }
            ], {
                duration: duration,
                easing: 'linear'
            }).onfinish = () => {
                if (wordElement.parentNode) {
                    wordElement.remove();
                }
            };
        }
        
        const interval = window.innerWidth <= 768 ? 4000 : 3000;
        setInterval(createFloatingWord, interval);
        
        setTimeout(() => createFloatingWord(), 1000);
        setTimeout(() => createFloatingWord(), 2000);
    }

    // ================================================
    // SCROLL PROGRESS INDICATOR
    // ================================================
    function initScrollProgress() {
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
        const sections = document.querySelectorAll('.section, .service-card, .testimonial-card');
        const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
        
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
        
        const buttons = document.querySelectorAll('.cta-button');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
                ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
                ripple.classList.add('ripple-effect');
                this.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });
        });
        console.log('🎯 Premium interactions initialized');
    }

    // ================================================
    // DARK THEME SYSTEM
    // ================================================
    function initPageTheme() {
        const path = window.location.pathname;
        const body = document.body;
        body.classList.remove('home-theme', 'services-theme', 'about-theme', 'pricing-theme', 'contact-theme', 'blog-theme');
        
        if (path.includes('services') || path.includes('basic-seo') || path.includes('comprehensive-seo') || path.includes('enterprise-seo')) {
            body.classList.add('services-theme');
        } else if (path.includes('about')) {
            body.classList.add('about-theme');
        } else if (path.includes('pricing')) {
            body.classList.add('pricing-theme');
        } else if (path.includes('contact')) {
            body.classList.add('contact-theme');
        } else if (path.includes('blog') || path.includes('case-studies')) {
            body.classList.add('blog-theme');
        } else {
            body.classList.add('home-theme');
        }
    }

    // ================================================
    // PREMIUM ANIMATION SYSTEM
    // ================================================
    function initPremiumAnimations() {
        addFloatingClasses();
        applyFloatingEffects();
        setupIntersectionObservers();
        setTimeout(() => {
            addFloatingClasses();
            applyFloatingEffects();
        }, 1000);
    }

    // ================================================
    // FLOATING CLASSES SYSTEM
    // ================================================
    function addFloatingClasses() {
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
            document.querySelectorAll(item.selector).forEach(element => element.classList.add(item.class));
        });
    }

    // ================================================
    // SCROLL-BASED ANIMATION SYSTEM
    // ================================================
    function initScrollEffects() {
        let lastScrollTop = 0;
        window.addEventListener('scroll', throttle(function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollPercent = scrollTop / (document.documentElement.scrollHeight - window.innerHeight);
            const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
            lastScrollTop = scrollTop;
            
            applyFloatingEffects(scrollDirection, scrollPercent);
            updateHeaderOnScroll(scrollTop);
        }, 16));
    }

    function applyFloatingEffects(direction, scrollPercent) {
        const intensity = Math.sin(scrollPercent * Math.PI * 6) * 12;
        const rotation = Math.sin(scrollPercent * Math.PI * 8) * 3;
        
        const applyTransform = (elements, xFactor, yFactor, rotFactor) => {
            elements.forEach((element, index) => {
                const delay = index * 0.1;
                const offsetIntensity = intensity + Math.sin((scrollPercent + delay) * Math.PI * 4) * 5;
                const x = (direction === 'down' ? offsetIntensity : -offsetIntensity) * xFactor;
                const y = (direction === 'down' ? -offsetIntensity : offsetIntensity) * yFactor;
                element.style.transform = `translate(${x}px, ${y}px) rotate(${rotation * rotFactor}deg)`;
            });
        };

        applyTransform(document.querySelectorAll('.scroll-float-left'), 1, 0, 1);
        applyTransform(document.querySelectorAll('.scroll-float-right'), -1, 0, -1);
        applyTransform(document.querySelectorAll('.scroll-float-up'), 0, 0.7, 0.5);
        applyTransform(document.querySelectorAll('.scroll-float-down'), 0, -0.4, -0.5);
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
        document.body.appendChild(particleContainer);
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-duration: ${Math.random() * 25 + 15}s;
            `;
            particleContainer.appendChild(particle);
        }
    }

    function createLiquidOrbs() {
        const orbContainer = document.createElement('div');
        orbContainer.className = 'liquid-orbs';
        document.body.appendChild(orbContainer);
        const orbConfigs = [
            { size: 250, position: { top: '-125px', right: '-125px' } },
            { size: 180, position: { bottom: '-90px', left: '-90px' } },
            { size: 200, position: { top: '60%', left: '80%' } }
        ];
        orbConfigs.forEach((config, i) => {
            const orb = document.createElement('div');
            orb.className = `liquid-orb orb-${i + 1}`;
            Object.assign(orb.style, config.position);
            orbContainer.appendChild(orb);
        });
    }

    // ================================================
    // MOBILE MENU SYSTEM (REFINED & ENHANCED)
    // ================================================
    function initMobileMenu() {
        console.log('🔧 Initializing mobile menu system...');
        
        const hamburger = document.querySelector('.hamburger, .nav-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const desktopMenu = document.querySelector('.desktop-menu');
        
        console.log('📱 Mobile menu elements found:', { 
            hamburger: !!hamburger, 
            mobileMenu: !!mobileMenu, 
            desktopMenu: !!desktopMenu 
        });
        
        if (!hamburger) {
            console.error('❌ Hamburger menu not found! Check HTML structure.');
            return;
        }
        
        if (!mobileMenu) {
            console.error('❌ Mobile menu not found! Check HTML structure.');
            return;
        }

        // Add click event to hamburger
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('🍔 Hamburger clicked!');
            toggleMobileMenu();
        });

        // Add click events to mobile menu links
        mobileMenu.querySelectorAll('.nav-link').forEach((link, index) => {
            link.addEventListener('click', () => {
                console.log(`📱 Mobile nav link ${index + 1} clicked`);
                if (mobileMenu.classList.contains('active')) {
                    closeMobileMenu();
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active') && 
                !hamburger.contains(e.target) && 
                !mobileMenu.contains(e.target)) {
                console.log('👆 Clicked outside mobile menu, closing...');
                closeMobileMenu();
            }
        });
        
        console.log('✅ Mobile menu system initialized successfully');
    }

    function toggleMobileMenu() {
        const hamburger = document.querySelector('.hamburger, .nav-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const isActive = hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = isActive ? 'hidden' : '';
        console.log(`📱 Menu is now: ${isActive ? 'OPEN' : 'CLOSED'}`);
    }

    function closeMobileMenu() {
        const hamburger = document.querySelector('.hamburger, .nav-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        console.log('✅ Mobile menu closed.');
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
            
            let hasAnimated = false;
            const counterObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    let current = 0;
                    const increment = target / 100;
                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            counter.textContent = Math.ceil(current) + (originalText.match(/[%\+K]/) || [''])[0];
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = originalText;
                        }
                    };
                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            }, { threshold: 0.8 });
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
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    const siblings = Array.from(entry.target.parentNode.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.glass-effect, .service-card, .testimonial-card, .stat, .cta-content').forEach(el => observer.observe(el));
    }

    function updateHeaderOnScroll(scrollTop) {
        const header = document.querySelector('.header');
        if (header) {
            header.classList.toggle('scrolled', scrollTop > 100);
        }
    }

    // ================================================
    // SMOOTH SCROLLING
    // ================================================
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href.length > 1) {
                    e.preventDefault();
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                        window.scrollTo({
                            top: targetElement.offsetTop - headerHeight,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // ================================================
    // PERFORMANCE OPTIMIZATION MODULE
    // ================================================
    function initPerformanceOptimizations() {
        // Lazy load images
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

        // Set current year in footer
        document.querySelectorAll('.current-year').forEach(el => el.textContent = new Date().getFullYear());
    }

    // ================================================
    // UNIFIED TOUCH FEEDBACK
    // ================================================
    function initTouchFeedback() {
        const isMobile = 'ontouchstart' in window;
        if (!isMobile) return;

        const interactiveElements = 'a, button, .cta-button, .nav-link, .nav-toggle';

        document.body.addEventListener('touchstart', (e) => {
            const target = e.target.closest(interactiveElements);
            if (target) {
                target.classList.add('touched');
            }
        }, { passive: true });

        document.body.addEventListener('touchend', (e) => {
            const target = e.target.closest(interactiveElements);
            if (target) {
                target.classList.remove('touched');
            }
        }, { passive: true });
        
        document.body.addEventListener('touchcancel', (e) => {
            const target = e.target.closest(interactiveElements);
            if (target) {
                target.classList.remove('touched');
            }
        }, { passive: true });

        console.log('📱 Unified touch feedback initialized.');
    }

    // ================================================
    // CSS KEYFRAMES INJECTION (Simplified)
    // ================================================
    const premiumAnimationCSS = `
        .scroll-float-left, .scroll-float-right, .scroll-float-up, .scroll-float-down {
            transition: transform 0.1s ease-out;
        }
        .animate-in {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .touched {
            transform: scale(0.96);
            filter: brightness(0.9);
            transition: transform 0.1s ease, filter 0.1s ease;
        }
        @media (prefers-reduced-motion: reduce) {
            * {
                animation: none !important;
                transform: none !important;
                transition: none !important;
            }
        }
    `;
    if (!document.getElementById('premium-animation-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'premium-animation-styles';
        styleSheet.textContent = premiumAnimationCSS;
        document.head.appendChild(styleSheet);
    }

}); // End of DOMContentLoaded
