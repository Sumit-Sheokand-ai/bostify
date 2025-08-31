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
        const hamburger = document.querySelector('.hamburger, .nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        console.log('🔍 Looking for hamburger menu...', { hamburger, navMenu });
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function(e) {
                e.preventDefault();
                toggleMobileMenu();
                console.log('🍔 Hamburger clicked!');
            });
            
            // Add touch events for mobile feedback
            hamburger.addEventListener('touchstart', function(e) {
                this.style.transform = 'scale(0.95)';
                this.style.background = 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)';
                console.log('👆 Hamburger touched');
            }, { passive: true });
            
            hamburger.addEventListener('touchend', function(e) {
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.background = '';
                }, 150);
            }, { passive: true });
            
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
            
            console.log('✅ Mobile hamburger menu initialized successfully');
        } else {
            console.log('❌ Hamburger or nav menu not found', { hamburger, navMenu });
        }
    }

        function toggleMobileMenu() {
            const hamburger = document.querySelector('.hamburger, .nav-toggle');
            const navMenu = document.querySelector('.nav-menu');
            
            console.log('🔄 Toggling mobile menu...', { hamburger, navMenu });
            
            if (hamburger && navMenu) {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                const isActive = hamburger.classList.contains('active');
                console.log('📱 Menu is now:', isActive ? 'OPEN' : 'CLOSED');
                
                animateHamburger(isActive);
                
                // Prevent body scroll when menu is open
                document.body.style.overflow = isActive ? 'hidden' : '';
            }
        }

        function closeMobileMenu() {
            const hamburger = document.querySelector('.hamburger, .nav-toggle');
            const navMenu = document.querySelector('.nav-menu');
            
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                animateHamburger(false);
                document.body.style.overflow = '';
                console.log('✅ Mobile menu closed');
            }
        }

        function animateHamburger(isActive) {
            const bars = document.querySelectorAll('.hamburger .bar, .nav-toggle .bar');
            if (bars.length > 0) {
                if (isActive) {
                    bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                    bars[0].style.backgroundColor = '#ff6b6b';
                    bars[1].style.opacity = '0';
                    bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
                    bars[2].style.backgroundColor = '#ff6b6b';
                } else {
                    bars[0].style.transform = 'none';
                    bars[0].style.backgroundColor = '#ffffff';
                    bars[1].style.opacity = '1';
                    bars[2].style.transform = 'none';
                    bars[2].style.backgroundColor = '#ffffff';
                }
                console.log('🎨 Hamburger animation:', isActive ? 'X' : 'Bars');
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









// Enhanced button hover effects with color transitions
function initEnhancedButtonEffects() {
    const buttons = document.querySelectorAll('.cta-button');
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
    
    buttons.forEach(button => {
        // Universal click handler that works on both mobile and desktop
        button.addEventListener('click', function(e) {
            // Create color burst effect
            createColorBurst(e.target, e.clientX || e.touches?.[0]?.clientX || 0, e.clientY || e.touches?.[0]?.clientY || 0);
        });
        
        if (isMobile) {
            // Mobile-specific touch events for immediate feedback
            button.addEventListener('touchstart', function(e) {
                e.preventDefault(); // Prevent unwanted behaviors
                button.style.filter = 'hue-rotate(45deg) saturate(1.2) brightness(1.1)';
                button.style.transform = 'translateY(-2px) scale(1.01)';
                button.style.transition = 'all 0.1s ease';
            }, { passive: false });
            
            button.addEventListener('touchend', function(e) {
                setTimeout(() => {
                    button.style.filter = '';
                    button.style.transform = '';
                    button.style.transition = '';
                }, 150);
            });
            
            // Handle touch cancel (when finger moves off button)
            button.addEventListener('touchcancel', function(e) {
                button.style.filter = '';
                button.style.transform = '';
                button.style.transition = '';
            });
            
        } else {
            // Desktop hover effects
            button.addEventListener('mouseenter', function() {
                button.style.filter = 'hue-rotate(45deg) saturate(1.2) brightness(1.1)';
                button.style.transform = 'translateY(-3px) scale(1.02)';
                button.style.transition = 'all 0.2s ease';
            });
            
            button.addEventListener('mouseleave', function() {
                button.style.filter = '';
                button.style.transform = '';
                button.style.transition = '';
            });
        }
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

// Enhanced shatter effect for buttons
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

// Initialize enhanced button effects
initEnhancedButtonEffects();

// Initialize mobile navigation enhancements
function initMobileNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
    
    if (isMobile) {
        navLinks.forEach(link => {
            // Enhanced touch feedback for navigation links
            link.addEventListener('touchstart', function(e) {
                this.classList.add('touched');
                this.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.6) 0%, rgba(118, 75, 162, 0.6) 100%) !important';
                this.style.transform = 'translateY(-2px) scale(1.02)';
                this.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.5)';
                this.style.transition = 'all 0.1s ease';
            }, { passive: true });
            
            link.addEventListener('touchend', function(e) {
                this.classList.remove('touched');
                setTimeout(() => {
                    this.style.background = '';
                    this.style.transform = '';
                    this.style.boxShadow = '';
                    this.style.transition = '';
                }, 200);
                
                // Close mobile menu after clicking a link
                if (navMenu && navMenu.classList.contains('active')) {
                    setTimeout(() => {
                        navMenu.classList.remove('active');
                        document.body.style.overflow = '';
                    }, 300);
                }
            });
            
            link.addEventListener('touchcancel', function(e) {
                this.classList.remove('touched');
                this.style.background = '';
                this.style.transform = '';
                this.style.boxShadow = '';
                this.style.transition = '';
            });
            
            // Enhanced click feedback
            link.addEventListener('click', function(e) {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
            });
        });
        
        // Enhanced hamburger menu
        if (navToggle) {
            navToggle.addEventListener('touchstart', function(e) {
                this.style.transform = 'scale(0.95)';
                this.style.background = 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)';
                this.style.boxShadow = 'inset 0 2px 10px rgba(0, 0, 0, 0.3)';
            }, { passive: true });
            
            navToggle.addEventListener('touchend', function(e) {
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.background = '';
                    this.style.boxShadow = '';
                }, 150);
            }, { passive: true });
        }
        
        console.log('📱 Enhanced mobile navigation with visual feedback initialized');
    }
}

initMobileNavigation();

// Function to ensure all buttons are clickable and accessible
function ensureButtonFunctionality() {
    const allButtons = document.querySelectorAll('button, .cta-button, .nav-link, a[href]');
    
    allButtons.forEach((button, index) => {
        // Ensure all buttons have proper attributes
        if (!button.hasAttribute('tabindex')) {
            button.setAttribute('tabindex', '0');
        }
        
        // Add keyboard accessibility
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Ensure buttons have visible focus states
        button.addEventListener('focus', function() {
            this.style.outline = '2px solid #667eea';
            this.style.outlineOffset = '2px';
        });
        
        button.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
        
        // Add aria-label if missing
        if (!button.hasAttribute('aria-label') && !button.textContent.trim()) {
            button.setAttribute('aria-label', `Interactive button ${index + 1}`);
        }
    });
    
    console.log(`✅ Enhanced ${allButtons.length} interactive elements for mobile accessibility`);
}

// Initialize button functionality
ensureButtonFunctionality();

// Mobile-specific enhancements
function initMobileEnhancements() {
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
    
    if (isMobile) {
        // Prevent zoom on form inputs
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                document.querySelector('meta[name="viewport"]')?.setAttribute('content', 
                    'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
            });
            
            input.addEventListener('blur', function() {
                document.querySelector('meta[name="viewport"]')?.setAttribute('content', 
                    'width=device-width, initial-scale=1.0');
            });
        });
        
        // Add visual feedback for touch interactions
        document.addEventListener('touchstart', function(e) {
            const target = e.target.closest('button, .cta-button, .nav-link, a');
            if (target) {
                target.style.opacity = '0.8';
            }
        }, { passive: true });
        
        document.addEventListener('touchend', function(e) {
            const target = e.target.closest('button, .cta-button, .nav-link, a');
            if (target) {
                setTimeout(() => {
                    target.style.opacity = '';
                }, 150);
            }
        }, { passive: true });
        
        console.log('📱 Mobile enhancements activated');
    }
}

initMobileEnhancements();

// Debug function for mobile button issues
function debugMobileButtons() {
    const buttons = document.querySelectorAll('button, .cta-button, a[href]');
    const issues = [];
    
    buttons.forEach((button, index) => {
        const rect = button.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(button);
        
        // Check if button is too small for touch
        if (rect.width < 44 || rect.height < 44) {
            issues.push(`Button ${index + 1}: Too small (${rect.width}x${rect.height}px)`);
        }
        
        // Check if button has proper pointer events
        if (computedStyle.pointerEvents === 'none') {
            issues.push(`Button ${index + 1}: Pointer events disabled`);
        }
        
        // Check if button is hidden
        if (computedStyle.display === 'none' || computedStyle.visibility === 'hidden') {
            issues.push(`Button ${index + 1}: Hidden`);
        }
        
        // Check if button has click handler
        const hasClickHandler = button.onclick || 
                              button.getAttribute('onclick') || 
                              button.href ||
                              button.closest('form');
        
        if (!hasClickHandler) {
            issues.push(`Button ${index + 1}: No click handler`);
        }
    });
    
    if (issues.length > 0) {
        console.log('🐛 Mobile Button Issues Found:', issues);
    } else {
        console.log('✅ All buttons appear to be mobile-ready');
    }
    
    console.log(`📊 Total buttons found: ${buttons.length}`);
    return issues;
}

// Run debug after page load
setTimeout(debugMobileButtons, 2000);

// Test all button functionality on mobile
function testMobileButtonFunctionality() {
    const buttons = document.querySelectorAll('button, .cta-button, .nav-link, a[href]');
    let workingButtons = 0;
    let issues = [];
    
    buttons.forEach((button, index) => {
        const buttonText = button.textContent?.trim() || button.innerText?.trim() || `Button ${index + 1}`;
        
        // Test if button responds to touch
        try {
            // Simulate touch event
            const touchEvent = new TouchEvent('touchstart', { bubbles: true });
            button.dispatchEvent(touchEvent);
            
            // Check if button has proper event listeners
            const hasEvents = button.onclick || 
                            button.href || 
                            button.closest('form') ||
                            button.getAttribute('onclick') ||
                            getEventListeners?.(button)?.click?.length > 0;
            
            if (hasEvents) {
                workingButtons++;
                console.log(`✅ ${buttonText}: Working`);
            } else {
                issues.push(`❌ ${buttonText}: No click handler`);
            }
        } catch (error) {
            issues.push(`⚠️ ${buttonText}: Touch event error - ${error.message}`);
        }
    });
    
    console.log(`📊 Mobile Button Test Results:`);
    console.log(`   Working buttons: ${workingButtons}/${buttons.length}`);
    
    if (issues.length > 0) {
        console.log(`   Issues found:`, issues);
    } else {
        console.log(`   🎉 All buttons appear to be working correctly!`);
    }
    
    return { working: workingButtons, total: buttons.length, issues };
}

// Auto-test button functionality after mobile enhancements
setTimeout(() => {
    if (window.innerWidth <= 768 || 'ontouchstart' in window) {
        testMobileButtonFunctionality();
        forceMobileButtonFunctionality();
    }
}, 3000);

// Force all buttons to work on mobile
function forceMobileButtonFunctionality() {
    const allInteractiveElements = document.querySelectorAll('button, .cta-button, .btn, .nav-link, a[href], input[type="submit"], input[type="button"]');
    
    allInteractiveElements.forEach((element, index) => {
        // Ensure proper styling
        element.style.pointerEvents = 'auto';
        element.style.cursor = 'pointer';
        element.style.userSelect = 'none';
        element.style.webkitTapHighlightColor = 'transparent';
        
        // Add touch event listeners if missing
        if (!element.dataset.mobileEnhanced) {
            element.addEventListener('touchstart', function(e) {
                this.style.transform = 'scale(0.97)';
                this.style.transition = 'transform 0.1s ease';
                console.log('📱 Touch detected on:', this.textContent?.trim() || `Element ${index}`);
            }, { passive: true });
            
            element.addEventListener('touchend', function(e) {
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.transition = '';
                }, 150);
            }, { passive: true });
            
            // Ensure click events work
            if (!element.onclick && !element.href && !element.closest('form')) {
                element.addEventListener('click', function(e) {
                    console.log('🖱️ Click on:', this.textContent?.trim() || `Element ${index}`);
                    // Add default action if needed
                });
            }
            
            element.dataset.mobileEnhanced = 'true';
        }
    });
    
    console.log(`🔧 Enhanced ${allInteractiveElements.length} interactive elements for mobile`);
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
        
        // Create instant dramatic effect
        setTimeout(() => {
            createShatterEffect(button, centerX, centerY);
        }, 500);
    });
}

console.log('🎨 Enhanced button effects with color gradients initialized');





console.log('� Press Ctrl+Shift+C to test dramatic crack effect');
console.log('�🔄 Visit the same page again to see broken effect naturally');

}); // End of DOMContentLoaded

// Mobile debugging
if (window.innerWidth <= 768 || 'ontouchstart' in window) {
    console.log('📱 MOBILE DEVICE DETECTED');
    console.log('🔍 Debug info:');
    console.log('  - Window width:', window.innerWidth);
    console.log('  - Touch support:', 'ontouchstart' in window);
    console.log('  - User agent:', navigator.userAgent.substring(0, 100) + '...');
    
    // Test button visibility after page load
    setTimeout(() => {
        const buttons = document.querySelectorAll('button, .cta-button, .nav-link, a[href]');
        console.log(`📊 Found ${buttons.length} interactive elements`);
        
        const hamburger = document.querySelector('.hamburger, .nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        console.log('🍔 Hamburger button:', hamburger ? 'FOUND' : 'NOT FOUND');
        console.log('📋 Navigation menu:', navMenu ? 'FOUND' : 'NOT FOUND');
        
        if (hamburger) {
            console.log('🎨 Hamburger display:', window.getComputedStyle(hamburger).display);
            console.log('🎨 Hamburger visibility:', window.getComputedStyle(hamburger).visibility);
        }
    }, 1000);
}
