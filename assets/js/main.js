/*
    main.js
    Rewritten by GitHub Copilot
    Date: 2025-09-03
    Purpose: A complete, clean, and error-free script for the Boostify website.
*/

// Google AdSense Integration
(function loadGoogleAds() {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9366786724121329';
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
    
    // Initialize ads after script loads
    script.onload = function() {
        if (window.adsbygoogle && document.querySelector('.adsbygoogle')) {
            try {
                (adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                console.log('AdSense initialization delayed');
            }
        }
    };
})();

// Use a single object to organize all app functionality
const app = {
    // Initialize all features when the DOM is ready
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            // Accessibility and performance flags
            this.flags = {
                isMobile: window.matchMedia('(max-width: 768px)').matches,
                prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            };

            // Core, lightweight features
            this.initMobileMenu();
            this.initHeaderScroll();
            this.initSmoothScrolling();
            this.initScrollSpy();
            this.initScrollToTop();
            this.initLazyLoad();
            this.initScrollAnimations();
            this.initCounters();
            this.initRippleEffects();
            this.initTypingAnimation();
            this.initScrollProgress();
            this.initPageLoader();
            this.initLinkPrefetch();

            // Heavy/visual effects (desktop only, no reduced motion)
            if (!this.flags.prefersReducedMotion) {
                this.initMouseTracker();
                this.initAdvancedEffects();
                this.initMagneticButtons();
                this.initFloatingElements();
                this.initParticleBackground();
            }
            console.log('🚀 Boostify Enhanced Experience Initialized');
        });
    },

    // --- Scroll Bus (single scroll listener with RAF batching) ---
    setupScrollBus() {
        if (this._scrollBusSetup) return;
        this._scrollSubs = [];
        let ticking = false;
        const handler = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(() => {
                    ticking = false;
                    const y = window.pageYOffset || document.documentElement.scrollTop || 0;
                    this._scrollSubs.forEach(fn => {
                        try { fn(y); } catch (e) { /* no-op */ }
                    });
                });
            }
        };
        window.addEventListener('scroll', handler, { passive: true });
        this._scrollBusSetup = true;
    },
    onScroll(fn) {
        this.setupScrollBus();
        this._scrollSubs.push(fn);
    },

    // --- Beautiful Page Loader ---
    initPageLoader() {
        // Create loader if it doesn't exist
        if (!document.querySelector('.page-loader')) {
            const loader = document.createElement('div');
            loader.className = 'page-loader';
            loader.innerHTML = `
                <div class="loader-content">
                    <div class="loader-spinner"></div>
                    <div class="loader-text">Loading Amazing Experience...</div>
                </div>
            `;
            document.body.appendChild(loader);
        }

        // Hide loader when page is fully loaded
        window.addEventListener('load', () => {
            const loader = document.querySelector('.page-loader');
            if (loader) {
                setTimeout(() => {
                    loader.classList.add('hidden');
                    setTimeout(() => {
                        loader.remove();
                    }, 500);
                }, 500);
            }
        });
    },

    // --- Scroll Progress Indicator ---
    initScrollProgress() {
        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 4px;
            background: var(--gradient-primary);
            z-index: 9998;
            transition: width 0.1s ease;
            box-shadow: 0 2px 10px rgba(74, 144, 226, 0.3);
        `;
        document.body.appendChild(progressBar);

        // Update progress on scroll (batched)
        this.onScroll(() => {
            const scrollHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
            const scrollPercent = Math.min(100, Math.max(0, (window.scrollY / scrollHeight) * 100));
            progressBar.style.width = scrollPercent + '%';
        });
    },

    // --- Mouse Tracker Effect ---
    initMouseTracker() {
        // Only for precise pointer devices
        if (!window.matchMedia('(pointer: fine)').matches) return;
        let mouseX = 0;
        let mouseY = 0;
        let rafId = null;

        // Create cursor glow effect
        const cursorGlow = document.createElement('div');
        cursorGlow.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(74, 144, 226, 0.3), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9997;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
            will-change: transform, opacity;
        `;
        document.body.appendChild(cursorGlow);
        const onMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (rafId) return;
            rafId = requestAnimationFrame(() => {
                rafId = null;
                cursorGlow.style.left = (mouseX - 10) + 'px';
                cursorGlow.style.top = (mouseY - 10) + 'px';
                const el = document.elementFromPoint(mouseX, mouseY);
                if (el && el.matches('.btn, .nav-link, .service-card')) {
                    cursorGlow.style.transform = 'scale(2)';
                    cursorGlow.style.background = 'radial-gradient(circle, rgba(0, 200, 81, 0.4), transparent)';
                } else {
                    cursorGlow.style.transform = 'scale(1)';
                    cursorGlow.style.background = 'radial-gradient(circle, rgba(74, 144, 226, 0.3), transparent)';
                }
            });
        };
        document.addEventListener('mousemove', onMove, { passive: true });

        document.addEventListener('mouseenter', () => {
            cursorGlow.style.opacity = '1';
        });

        document.addEventListener('mouseleave', () => {
            cursorGlow.style.opacity = '0';
        });
    },

    // --- Mobile Menu Functionality ---
    initMobileMenu() {
        const navToggle = document.querySelector('.nav-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');

        if (navToggle && mobileMenu) {
            navToggle.addEventListener('click', () => {
                // Toggle the 'active' class on both the button and the menu
                navToggle.classList.toggle('active');
                mobileMenu.classList.toggle('active');

                // Prevent body scroll when menu is open
                if (mobileMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });

            // Close menu when a link is clicked
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    if (mobileMenu.classList.contains('active')) {
                        navToggle.classList.remove('active');
                        mobileMenu.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    if (navMenu.classList.contains('active')) {
                        navToggle.classList.remove('active');
                        navMenu.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                }
            });
            // Close on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    },

    // --- Header Scroll Effect ---
    initHeaderScroll() {
        const header = document.querySelector('.header');
        
        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }
    },

    // --- Smooth Scrolling ---
    initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    e.preventDefault();
                    const headerEl = document.querySelector('.header');
                    const headerHeight = headerEl ? headerEl.offsetHeight : 0;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },

    // --- Scroll Spy ---
    initScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

        if (sections.length > 0 && navLinks.length > 0) {
            window.addEventListener('scroll', () => {
                let current = '';
                const headerEl = document.querySelector('.header');
                const headerHeight = headerEl ? headerEl.offsetHeight : 0;

                sections.forEach(section => {
                    const sectionTop = section.offsetTop - headerHeight - 100;
                    const sectionHeight = section.clientHeight;
                    
                    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
            });
        }
    },

    // --- Scroll to Top Button ---
    initScrollToTop() {
    // Only bind if the page provides the button; don't auto-inject UI
    const scrollButton = document.querySelector('.scroll-to-top, #scrollToTop');
    if (!scrollButton) return;

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollButton.classList.add('visible');
            } else {
                scrollButton.classList.remove('visible');
            }
        });

        // Scroll to top when clicked
        scrollButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    },

    // --- Lazy Loading for Images ---
    initLazyLoad() {
        const images = document.querySelectorAll('img[data-src]');
        
        if (images.length > 0) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    },

    // --- Enhanced Scroll Animations ---
    initScrollAnimations() {
        // Create multiple observers for different animation types
        const observers = {
            fadeIn: this.createAnimationObserver('animate-fade-in'),
            slideLeft: this.createAnimationObserver('animate-slide-left'),
            slideRight: this.createAnimationObserver('animate-slide-right'),
            scaleUp: this.createAnimationObserver('animate-scale-up'),
            rotateIn: this.createAnimationObserver('animate-rotate-in'),
            bounceIn: this.createAnimationObserver('animate-bounce-in'),
            default: this.createAnimationObserver('animate-on-scroll')
        };

        // Add animation classes to different elements with variety
        this.assignAnimationClasses();

        // Staggered animations for grids
        this.initStaggeredAnimations();

        // Parallax scroll effects (desktop only, honors reduced motion)
        if (!this.flags || (!this.flags.isMobile && !this.flags.prefersReducedMotion)) {
            this.initParallaxEffects();
        }

    // Section reveal variants (data-driven)
    this.injectRevealStyles();
    this.initRevealVariants();

        // Enhanced hover effects
        this.initEnhancedHoverEffects();
    },

    createAnimationObserver(className) {
        const elements = document.querySelectorAll(`.${className}`);
        
        if (elements.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Add stagger delay if element has data-stagger attribute
                        const staggerDelay = entry.target.dataset.stagger || 0;
                        
                        setTimeout(() => {
                            entry.target.classList.add('is-visible');
                            
                            // Add floating animation to certain elements
                            if (entry.target.classList.contains('service-card') || 
                                entry.target.classList.contains('testimonial-card')) {
                                setTimeout(() => {
                                    entry.target.classList.add('animate-float');
                                }, 500);
                            }
                        }, staggerDelay * 100);
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.15,
                rootMargin: '0px 0px -80px 0px'
            });

            elements.forEach(el => observer.observe(el));
        }
        
        return observer;
    },

    // --- Reveal Variants Styles Injection ---
    injectRevealStyles() {
        if (document.getElementById('reveal-variants-styles')) return;
        const style = document.createElement('style');
        style.id = 'reveal-variants-styles';
        style.textContent = `
            .reveal-base { 
                opacity: 0; 
                transform: translateY(var(--reveal-translate-y, 20px)) translateX(var(--reveal-translate-x, 0)) scale(var(--reveal-scale, 1)) rotate(var(--reveal-rotate, 0));
                filter: blur(var(--reveal-blur, 0));
                clip-path: var(--reveal-clip, inset(0 0 0 0));
                transition: opacity var(--reveal-duration, .7s) var(--reveal-ease, cubic-bezier(.2,.8,.2,1)), 
                           transform var(--reveal-duration, .7s) var(--reveal-ease, cubic-bezier(.2,.8,.2,1)),
                           filter var(--reveal-duration, .7s) var(--reveal-ease, cubic-bezier(.2,.8,.2,1)),
                           clip-path var(--reveal-duration, .7s) var(--reveal-ease, cubic-bezier(.2,.8,.2,1));
                will-change: opacity, transform, filter, clip-path;
            }
            .reveal-visible { 
                opacity: 1; 
                transform: translateX(0) translateY(0) scale(1) rotate(0);
                filter: blur(0);
                clip-path: inset(0 0 0 0);
            }
            /* Variants */
            .reveal-fade { /* just opacity */ }
            .reveal-up { --reveal-translate-y: 24px; }
            .reveal-down { --reveal-translate-y: -24px; }
            .reveal-left { --reveal-translate-x: 24px; }
            .reveal-right { --reveal-translate-x: -24px; }
            .reveal-zoom { --reveal-scale: .9; }
            .reveal-rotate { --reveal-rotate: -6deg; }
            .reveal-blur { --reveal-blur: 6px; }
            .reveal-clip { --reveal-clip: inset(0 0 100% 0); }
            @media (prefers-reduced-motion: reduce) {
                .reveal-base { transition: none !important; }
            }
        `;
        document.head.appendChild(style);
    },

    // --- Section Reveal Variants (data attributes) ---
    initRevealVariants() {
        const nodes = document.querySelectorAll('[data-reveal], .reveal');
        if (nodes.length === 0) return;

        // If reduced motion, reveal immediately
        if (this.flags && this.flags.prefersReducedMotion) {
            nodes.forEach(el => el.classList.add('reveal-visible'));
            return;
        }

        const mapVariant = (v) => {
            const val = (v || 'up').toLowerCase();
            const allowed = ['fade','up','down','left','right','zoom','rotate','blur','clip'];
            return allowed.includes(val) ? val : 'up';
        };

        const prepare = (el) => {
            const variant = mapVariant(el.dataset.reveal || (el.classList.contains('reveal') ? 'up' : 'up'));
            el.classList.add('reveal-base', `reveal-${variant}`);
            if (el.dataset.revealDuration) el.style.setProperty('--reveal-duration', el.dataset.revealDuration);
            if (el.dataset.revealEase) el.style.setProperty('--reveal-ease', el.dataset.revealEase);
            // Support ms delay or CSS value
            if (el.dataset.revealDelay) {
                const d = el.dataset.revealDelay;
                el.style.transitionDelay = /ms$|s$/.test(d) ? d : `${parseInt(d,10)||0}ms`;
            }
        };

        nodes.forEach(prepare);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const el = entry.target;
                const once = el.dataset.revealOnce !== 'false';
                if (entry.isIntersecting) {
                    el.classList.add('reveal-visible');
                    if (once) observer.unobserve(el);
                } else if (!once) {
                    el.classList.remove('reveal-visible');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -10% 0px'
        });

        nodes.forEach(el => observer.observe(el));
    },

    assignAnimationClasses() {
        // Hero section elements
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroButtons = document.querySelector('.hero-buttons');
        const heroStats = document.querySelectorAll('.stat-item');

        if (heroTitle) heroTitle.classList.add('animate-fade-in');
        if (heroSubtitle) heroSubtitle.classList.add('animate-slide-left');
        if (heroButtons) heroButtons.classList.add('animate-bounce-in');
        
        heroStats.forEach((stat, index) => {
            stat.classList.add('animate-scale-up');
            stat.dataset.stagger = index;
        });

        // Service cards with alternating animations
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            const animations = ['animate-slide-left', 'animate-scale-up', 'animate-slide-right'];
            card.classList.add(animations[index % animations.length]);
            card.classList.add('animate-glow');
            card.dataset.stagger = index;
        });

        // Testimonial cards
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        testimonialCards.forEach((card, index) => {
            card.classList.add('animate-rotate-in');
            card.dataset.stagger = index;
        });

        // Section headers
        const sectionHeaders = document.querySelectorAll('.section-header, .section-title');
        sectionHeaders.forEach(header => {
            header.classList.add('animate-fade-in');
        });

        // CTA sections
        const ctaSections = document.querySelectorAll('.cta-section, .hero-cta');
        ctaSections.forEach(cta => {
            cta.classList.add('animate-bounce-in');
        });
    },

    initStaggeredAnimations() {
        // Add stagger delays using CSS custom properties
        const staggerElements = document.querySelectorAll('[data-stagger]');
        staggerElements.forEach(element => {
            const delay = element.dataset.stagger;
            element.style.setProperty('--stagger-delay', `${delay * 0.1}s`);
        });
    },

    initEnhancedHoverEffects() {
        // Enhanced button hover effects
        const buttons = document.querySelectorAll('.btn, .cta-button');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                e.target.style.transform = 'translateY(-2px) scale(1.05)';
                e.target.style.boxShadow = '0 10px 25px rgba(46, 213, 115, 0.3)';
            });
            
            button.addEventListener('mouseleave', (e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '';
            });
        });

        // Card tilt effect
        const cards = document.querySelectorAll('.service-card, .testimonial-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                e.target.style.transform = 'perspective(1000px) rotateX(2deg) rotateY(2deg) translateZ(10px)';
            });
            
            card.addEventListener('mouseleave', (e) => {
                e.target.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });
        });
    },

    // --- Counter Animation ---
    initCounters() {
        const counters = document.querySelectorAll('.stat-number, .counter');
        
        if (counters.length > 0) {
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = entry.target;
                        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
                        const suffix = counter.textContent.replace(/[\d]/g, '');
                        
                        let current = 0;
                        const increment = target / 50;
                        
                        const updateCounter = () => {
                            if (current < target) {
                                current += increment;
                                counter.textContent = Math.ceil(current) + suffix;
                                requestAnimationFrame(updateCounter);
                            } else {
                                counter.textContent = target + suffix;
                            }
                        };
                        
                        updateCounter();
                        counterObserver.unobserve(counter);
                    }
                });
            });

            counters.forEach(counter => counterObserver.observe(counter));
        }
    },

    // --- Enhanced Ripple Effects ---
    initRippleEffects() {
        document.querySelectorAll('.btn, .cta-button, .service-link, .footer-cta').forEach(button => {
            button.classList.add('ripple-effect-target');
            
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 800);
            });
        });
    },

    // --- Floating Particle Background ---
    initParticleBackground() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

    // Create floating particles (reduced on small screens)
    const isSmall = window.matchMedia('(max-width: 768px)').matches;
    const count = isSmall ? 10 : 20;
    for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: rgba(74, 144, 226, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: float ${Math.random() * 10 + 10}s linear infinite;
                z-index: 1;
        will-change: transform;
            `;
            hero.appendChild(particle);
        }
    },

    // --- Typing Animation for Hero Title ---
    initTypingAnimation() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;

        const text = heroTitle.textContent;
        heroTitle.innerHTML = '';
        let index = 0;

        const typeWriter = () => {
            if (index < text.length) {
                heroTitle.innerHTML += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            } else {
                // Add blinking cursor
                const cursor = document.createElement('span');
                cursor.className = 'typing-cursor';
                cursor.style.cssText = `
                    display: inline-block;
                    width: 3px;
                    height: 1em;
                    background: var(--primary-blue);
                    margin-left: 5px;
                    animation: blink 1s infinite;
                `;
                heroTitle.appendChild(cursor);
            }
        };

        // Start typing animation after a delay
        setTimeout(typeWriter, 1000);
    },

    // --- Parallax Effects ---
    initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length > 0) {
            this.onScroll((scrollTop) => {
                parallaxElements.forEach(element => {
                    const speed = parseFloat(element.dataset.parallax || '0.5');
                    const yPos = -(scrollTop * speed);
                    element.style.transform = `translateY(${yPos}px)`;
                });
            });
        }
    },

    // --- Magnetic Button Effects ---
    initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    if (!window.matchMedia('(pointer: fine)').matches) return;
        
        magneticButtons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0) scale(1)';
            });
        });
    },

    // --- Floating Elements Animation ---
    initFloatingElements() {
        // Add floating elements to sections
        const sections = document.querySelectorAll('.hero, .services, .features');
        
        sections.forEach(section => {
            const floatingElements = [];
            
            for (let i = 0; i < 3; i++) {
                const element = document.createElement('div');
                element.className = 'floating-element';
                element.style.cssText = `
                    position: absolute;
                    width: ${Math.random() * 100 + 50}px;
                    height: ${Math.random() * 100 + 50}px;
                    background: linear-gradient(45deg, 
                        rgba(74, 144, 226, 0.1), 
                        rgba(0, 200, 81, 0.1));
                    border-radius: 50%;
                    left: ${Math.random() * 90}%;
                    top: ${Math.random() * 90}%;
                    pointer-events: none;
                    animation: floatAround ${Math.random() * 20 + 15}s ease-in-out infinite;
                    z-index: 1;
                `;
                
                section.appendChild(element);
                floatingElements.push(element);
            }
        });
    },

    // --- Advanced Interactive Effects ---
    initAdvancedEffects() {
        this.initTextGlowEffect();
        this.initMouseTrailEffect();
        this.initPulseAnimations();
        this.initBackgroundParticles();
    },

    // --- Text Glow Effect ---
    initTextGlowEffect() {
        const glowTexts = document.querySelectorAll('.hero-title, .section-title');
        
        glowTexts.forEach(text => {
            text.addEventListener('mouseenter', () => {
                text.style.textShadow = `
                    0 0 10px rgba(46, 213, 115, 0.6),
                    0 0 20px rgba(46, 213, 115, 0.4),
                    0 0 30px rgba(46, 213, 115, 0.2)
                `;
            });
            
            text.addEventListener('mouseleave', () => {
                text.style.textShadow = '';
            });
        });
    },

    // --- Mouse Trail Effect ---
    initMouseTrailEffect() {
        const trail = [];
        const trailLength = 10;
        
        document.addEventListener('mousemove', (e) => {
            const dot = document.createElement('div');
            dot.className = 'mouse-trail-dot';
            dot.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: rgba(46, 213, 115, 0.7);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${e.clientX - 2}px;
                top: ${e.clientY - 2}px;
                transition: opacity 0.5s ease;
            `;
            
            document.body.appendChild(dot);
            trail.push(dot);
            
            if (trail.length > trailLength) {
                const oldDot = trail.shift();
                oldDot.style.opacity = '0';
                setTimeout(() => {
                    if (oldDot.parentNode) {
                        oldDot.parentNode.removeChild(oldDot);
                    }
                }, 500);
            }
        });
    },

    // --- Pulse Animations ---
    initPulseAnimations() {
        const pulseElements = document.querySelectorAll('.btn-primary, .service-icon');
        
        pulseElements.forEach(element => {
            element.style.position = 'relative';
            element.style.overflow = 'hidden';
            
            element.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const size = Math.max(element.offsetWidth, element.offsetHeight);
                const rect = element.getBoundingClientRect();
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    background: rgba(255, 255, 255, 0.6);
                    border-radius: 50%;
                    left: ${e.clientX - rect.left - size / 2}px;
                    top: ${e.clientY - rect.top - size / 2}px;
                    animation: rippleEffect 0.6s ease-out;
                    pointer-events: none;
                `;
                
                element.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 600);
            });
        });
    },

    // --- Background Particles ---
    initBackgroundParticles() {
        const canvas = document.createElement('canvas');
        canvas.id = 'particle-canvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            opacity: 0.6;
        `;
        
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const particles = [];
        const particleCount = 50;
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Bounce off edges
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(46, 213, 115, ${particle.opacity})`;
                ctx.fill();
            });
            
            requestAnimationFrame(animateParticles);
        }
        
        animateParticles();
        
        // Resize canvas
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
};

// Add ripple animation keyframes to CSS
const rippleCSS = document.createElement('style');
rippleCSS.textContent = `
    @keyframes rippleEffect {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(2); opacity: 0; }
    }
    
    /* Premium Page Loader Styles */
    .page-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, var(--primary-blue), var(--primary-green));
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    }
    
    .page-loader.hidden {
        opacity: 0;
        pointer-events: none;
    }
    
    .loader-content {
        text-align: center;
        color: white;
    }
    
    .loader-spinner {
        width: 60px;
        height: 60px;
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-top: 4px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
    }
    
    .loader-text {
        font-size: 18px;
        font-weight: 600;
        opacity: 0.9;
        animation: pulse 1.5s ease-in-out infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 0.7; }
        50% { opacity: 1; }
    }
    
    /* Premium Floating Animation */
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    @keyframes floatAround {
        0%, 100% { transform: translate(0, 0) scale(1); }
        25% { transform: translate(10px, -15px) scale(1.1); }
        50% { transform: translate(-5px, -25px) scale(0.9); }
        75% { transform: translate(-15px, -5px) scale(1.05); }
    }
    
    /* Premium Typing Cursor */
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    /* Premium Animation Classes */
    .animate-float {
        animation: float 3s ease-in-out infinite;
    }
    
    .animate-glow {
        transition: box-shadow 0.3s ease;
    }
    
    .animate-glow:hover {
        box-shadow: 0 0 30px rgba(74, 144, 226, 0.4);
    }
    
    /* Premium Ripple Effect */
    .ripple-effect-target {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleEffect 0.8s ease-out;
        pointer-events: none;
    }
    
    /* Responsive optimizations */
    @media (max-width: 768px) {
        .floating-particle,
        .floating-element,
        .mouse-trail-dot {
            display: none;
        }
        
        .page-loader .loader-spinner {
            width: 40px;
            height: 40px;
        }
        
        .page-loader .loader-text {
            font-size: 16px;
        }
    }
    
    /* Accessibility optimizations */
    @media (prefers-reduced-motion: reduce) {
        .animate-float,
        .loader-spinner,
        .floating-particle,
        .floating-element {
            animation: none !important;
        }
        
        .page-loader {
            transition: none;
        }
    }
`;
document.head.appendChild(rippleCSS);

/* ================================================
   PREMIUM ENHANCEMENTS - ADDITIONAL FEATURES
   ================================================ */

// Premium Link Prefetching for Performance
app.initLinkPrefetch = function() {
    const links = document.querySelectorAll('a[href^="/"], a[href^="./"]');
    const prefetchObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const link = entry.target;
                const prefetchLink = document.createElement('link');
                prefetchLink.rel = 'prefetch';
                prefetchLink.href = link.href;
                document.head.appendChild(prefetchLink);
                prefetchObserver.unobserve(link);
            }
        });
    });
    
    links.forEach(link => {
        if (!link.dataset.noPrefetch) {
            prefetchObserver.observe(link);
        }
    });
};

// Premium Form Enhancements
app.initPremiumForms = function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Add floating label effect
            if (!input.placeholder) {
                const label = form.querySelector(`label[for="${input.id}"]`);
                if (label) {
                    input.placeholder = label.textContent;
                    label.style.display = 'none';
                }
            }
            
            // Add focus animations
            input.addEventListener('focus', () => {
                input.style.transform = 'translateY(-2px)';
                input.style.boxShadow = '0 8px 25px rgba(74, 144, 226, 0.15)';
            });
            
            input.addEventListener('blur', () => {
                input.style.transform = 'translateY(0)';
                input.style.boxShadow = '';
            });
            
            // Real-time validation styling
            input.addEventListener('input', () => {
                if (input.validity.valid) {
                    input.style.borderColor = 'var(--primary-green)';
                } else if (input.value.length > 0) {
                    input.style.borderColor = '#e74c3c';
                } else {
                    input.style.borderColor = '';
                }
            });
        });
        
        // Enhanced form submission
        form.addEventListener('submit', (e) => {
            const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
            if (submitBtn) {
                submitBtn.style.transform = 'scale(0.95)';
                submitBtn.innerHTML = '<span>Sending...</span>';
                
                setTimeout(() => {
                    submitBtn.style.transform = 'scale(1)';
                }, 200);
            }
        });
    });
};

// Premium Performance Monitoring
app.initPerformanceMonitoring = function() {
    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
        // Largest Contentful Paint
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        // First Input Delay
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                console.log('FID:', entry.processingStart - entry.startTime);
            });
        }).observe({ entryTypes: ['first-input'] });
        
        // Cumulative Layout Shift
        new PerformanceObserver((entryList) => {
            let clsValue = 0;
            entryList.getEntries().forEach(entry => {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            });
            console.log('CLS:', clsValue);
        }).observe({ entryTypes: ['layout-shift'] });
    }
};

// Premium Error Handling
app.initErrorHandling = function() {
    window.addEventListener('error', (e) => {
        console.warn('Script error caught:', e.error);
        // In production, you might want to send this to an error tracking service
    });
    
    window.addEventListener('unhandledrejection', (e) => {
        console.warn('Unhandled promise rejection:', e.reason);
        e.preventDefault();
    });
};

// Premium Feature Detection and Progressive Enhancement
app.initFeatureDetection = function() {
    const features = {
        intersectionObserver: 'IntersectionObserver' in window,
        webp: false,
        serviceWorker: 'serviceWorker' in navigator,
        localStorage: 'localStorage' in window,
        touch: 'ontouchstart' in window
    };
    
    // Test WebP support
    const webp = new Image();
    webp.onload = webp.onerror = () => {
        features.webp = (webp.height === 2);
        document.documentElement.className += features.webp ? ' webp' : ' no-webp';
    };
    webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    
    // Add feature classes to HTML
    Object.keys(features).forEach(feature => {
        if (features[feature]) {
            document.documentElement.classList.add(feature);
        } else {
            document.documentElement.classList.add('no-' + feature);
        }
    });
    
    return features;
};

// Ad Placement and Management
app.initAdPlacements = function() {
    // Create ad containers for different page sections
    const adPlacements = [
        { selector: '.hero-section', position: 'after', type: 'banner' },
        { selector: '.services-section', position: 'after', type: 'square' },
        { selector: '.pricing-section', position: 'before', type: 'banner' },
        { selector: '.article-content', position: 'after', type: 'square' },
        { selector: '.footer', position: 'before', type: 'banner' }
    ];
    
    adPlacements.forEach((placement, index) => {
        const targetElement = document.querySelector(placement.selector);
        if (targetElement) {
            const adContainer = this.createAdContainer(placement.type, index);
            if (placement.position === 'after') {
                targetElement.after(adContainer);
            } else {
                targetElement.before(adContainer);
            }
        }
    });
    
    // Initialize AdSense after placements
    setTimeout(() => {
        if (window.adsbygoogle) {
            try {
                (adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                console.log('AdSense auto-initialization');
            }
        }
    }, 1000);
};

app.createAdContainer = function(type, index) {
    const adContainer = document.createElement('div');
    adContainer.className = `ad-container ad-${type}`;
    adContainer.style.cssText = `
        margin: 20px auto;
        text-align: center;
        max-width: 100%;
        padding: 10px;
        background: rgba(255,255,255,0.05);
        border-radius: 8px;
        backdrop-filter: blur(10px);
    `;
    
    const adElement = document.createElement('ins');
    adElement.className = 'adsbygoogle';
    adElement.style.display = 'block';
    adElement.setAttribute('data-ad-client', 'ca-pub-9366786724121329');
    adElement.setAttribute('data-ad-slot', `slot-${index}`);
    
    if (type === 'banner') {
        adElement.setAttribute('data-ad-format', 'auto');
        adElement.setAttribute('data-full-width-responsive', 'true');
        adElement.style.cssText = 'width: 100%; height: 90px;';
    } else {
        adElement.style.cssText = 'width: 300px; height: 250px;';
    }
    
    adContainer.appendChild(adElement);
    return adContainer;
};

// Initialize premium features
if (typeof app !== 'undefined') {
    const originalInit = app.init;
    app.init = function() {
        originalInit.call(this);
        
        // Add premium features
        this.initPremiumForms();
        this.initPerformanceMonitoring();
        this.initErrorHandling();
        this.initAdPlacements(); // Add ad placements
        this.features = this.initFeatureDetection();
        
        console.log('🌟 Premium features initialized');
    };
}

// Start the application
app.init();
