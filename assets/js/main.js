/*
    main.v2.js
    Rewritten by GitHub Copilot
    Date: 2025-09-03
    Purpose: A clean, structured, and error-free JavaScript file for the Boostify website.
*/

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ================================================
    // APP INITIALIZATION
    // ================================================
    const app = {
        init() {
            this.initMobileMenu();
            this.initHeaderScroll();
            this.initSmoothScrolling();
            this.initScrollSpy();
            this.initScrollToTop();
            this.initLazyLoad();
            this.initScrollAnimations();
            this.initCounters();
            this.initPremiumInteractions();
            console.log('Boostify App Initialized with full features');
        },

        // ================================================
        // 1. MOBILE MENU
        // ================================================
        initMobileMenu() {
            const navToggle = document.querySelector('.nav-toggle');
            const navMenu = document.querySelector('.nav-menu');

            if (!navToggle || !navMenu) return;

            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });

            // Close menu when a link is clicked
            navMenu.addEventListener('click', (e) => {
                if (e.target.classList.contains('nav-link')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        },

        // ================================================
        // 2. HEADER SCROLL EFFECT
        // ================================================
        initHeaderScroll() {
            const header = document.querySelector('.header');
            if (!header) return;

            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        },

        // ================================================
        // 3. SMOOTH SCROLLING
        // ================================================
        initSmoothScrolling() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();

                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);

                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        },

        // ================================================
        // 4. SCROLLSPY FOR ACTIVE NAV LINK
        // ================================================
        initScrollSpy() {
            const sections = document.querySelectorAll('section[id]');
            if (sections.length === 0) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        document.querySelectorAll('.nav-link').forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${entry.target.id}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
            }, { threshold: 0.5 });

            sections.forEach(section => observer.observe(section));
        },

        // ================================================
        // 5. SCROLL TO TOP BUTTON
        // ================================================
        initScrollToTop() {
            const scrollToTopBtn = document.createElement('button');
            scrollToTopBtn.innerHTML = '&#8679;';
            scrollToTopBtn.className = 'scroll-to-top';
            document.body.appendChild(scrollToTopBtn);

            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    scrollToTopBtn.classList.add('visible');
                } else {
                    scrollToTopBtn.classList.remove('visible');
                }
            });

            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        },

        // ================================================
        // 6. LAZY LOADING FOR IMAGES
        // ================================================
        initLazyLoad() {
            const lazyImages = document.querySelectorAll('img[data-src]');
            if (lazyImages.length === 0) return;

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.onload = () => img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            }, { rootMargin: '0px 0px 200px 0px' });

            lazyImages.forEach(img => observer.observe(img));
        },

        // ================================================
        // 7. SCROLL ANIMATIONS (FADE-IN)
        // ================================================
        initScrollAnimations() {
            const animatedElements = document.querySelectorAll('.animate-on-scroll');
            if (animatedElements.length === 0) return;

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            animatedElements.forEach(el => observer.observe(el));
        },

        // ================================================
        // 8. COUNTER ANIMATION
        // ================================================
        initCounters() {
            const counters = document.querySelectorAll('.counter');
            if (counters.length === 0) return;

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = entry.target;
                        const target = +counter.getAttribute('data-target');
                        counter.innerText = '0';

                        const updateCounter = () => {
                            const c = +counter.innerText;
                            const increment = target / 200;

                            if (c < target) {
                                counter.innerText = `${Math.ceil(c + increment)}`;
                                setTimeout(updateCounter, 10);
                            } else {
                                counter.innerText = target;
                            }
                        };
                        updateCounter();
                        observer.unobserve(counter);
                    }
                });
            }, { threshold: 0.5 });

            counters.forEach(counter => observer.observe(counter));
        },

        // ================================================
        // 9. PREMIUM INTERACTIONS (RIPPLE EFFECT)
        // ================================================
        initPremiumInteractions() {
            document.body.addEventListener('click', (e) => {
                const target = e.target.closest('.ripple-effect-target');
                if (target) {
                    const rect = target.getBoundingClientRect();
                    const ripple = document.createElement('span');
                    const diameter = Math.max(target.clientWidth, target.clientHeight);
                    const radius = diameter / 2;

                    ripple.style.width = ripple.style.height = `${diameter}px`;
                    ripple.style.left = `${e.clientX - rect.left - radius}px`;
                    ripple.style.top = `${e.clientY - rect.top - radius}px`;
                    ripple.classList.add('ripple');

                    const existingRipple = target.querySelector('.ripple');
                    if (existingRipple) {
                        existingRipple.remove();
                    }

                    target.appendChild(ripple);
                }
            });
        }
    };

    app.init();
});
