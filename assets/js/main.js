/*
    main.js
    Rewritten by GitHub Copilot
    Date: 2025-09-03
    Purpose: A complete, clean, and error-free script for the Boostify website.
*/

// Use a single object to organize all app functionality
const app = {
    // Initialize all features when the DOM is ready
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initMobileMenu();
            this.initHeaderScroll();
            this.initSmoothScrolling();
            this.initScrollSpy();
            this.initScrollToTop();
            this.initLazyLoad();
            this.initScrollAnimations();
            this.initCounters();
            this.initRippleEffects();
            this.initParticleBackground();
            this.initTypingAnimation();
            this.initParallaxEffects();
            this.initMagneticButtons();
            this.initFloatingElements();
            this.initPageLoader();
            this.initScrollProgress();
            this.initMouseTracker();
            console.log('🚀 Boostify Enhanced Experience Initialized');
        });
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

        // Update progress on scroll
        window.addEventListener('scroll', () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (window.scrollY / scrollHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    },

    // --- Mouse Tracker Effect ---
    initMouseTracker() {
        let mouseX = 0;
        let mouseY = 0;
        let isMoving = false;

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
        `;
        document.body.appendChild(cursorGlow);

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            isMoving = true;

            cursorGlow.style.left = (mouseX - 10) + 'px';
            cursorGlow.style.top = (mouseY - 10) + 'px';

            // Add interactive effects to elements under cursor
            const elementUnderCursor = document.elementFromPoint(mouseX, mouseY);
            if (elementUnderCursor && elementUnderCursor.matches('.btn, .nav-link, .service-card')) {
                cursorGlow.style.transform = 'scale(2)';
                cursorGlow.style.background = 'radial-gradient(circle, rgba(0, 200, 81, 0.4), transparent)';
            } else {
                cursorGlow.style.transform = 'scale(1)';
                cursorGlow.style.background = 'radial-gradient(circle, rgba(74, 144, 226, 0.3), transparent)';
            }

            clearTimeout(isMoving);
            isMoving = setTimeout(() => {
                cursorGlow.style.opacity = '0.5';
            }, 1000);
        });

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
        const navMenu = document.querySelector('.nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                // Toggle the 'active' class on both the button and the menu
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');

                // Prevent body scroll when menu is open
                if (navMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });

            // Close menu when a link is clicked
            navMenu.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    if (navMenu.classList.contains('active')) {
                        navToggle.classList.remove('active');
                        navMenu.classList.remove('active');
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
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
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
                const headerHeight = document.querySelector('.header').offsetHeight;

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
        // Create scroll to top button if it doesn't exist
        let scrollButton = document.querySelector('.scroll-to-top');
        
        if (!scrollButton) {
            scrollButton = document.createElement('button');
            scrollButton.className = 'scroll-to-top';
            scrollButton.innerHTML = '↑';
            scrollButton.setAttribute('aria-label', 'Scroll to top');
            document.body.appendChild(scrollButton);
        }

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

    // --- Scroll Animations ---
    initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        if (animatedElements.length > 0) {
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            animatedElements.forEach(el => animationObserver.observe(el));
        }

        // Add animation classes to cards
        document.querySelectorAll('.service-card, .testimonial-card, .hero-stats .stat').forEach(card => {
            card.classList.add('animate-on-scroll');
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

        // Create floating particles
        for (let i = 0; i < 20; i++) {
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
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset;
                
                parallaxElements.forEach(element => {
                    const speed = element.dataset.parallax || 0.5;
                    const yPos = -(scrollTop * speed);
                    element.style.transform = `translateY(${yPos}px)`;
                });
            });
        }
    },

    // --- Magnetic Button Effects ---
    initMagneticButtons() {
        const magneticButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
        
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
    }
};

// Start the application
app.init();
