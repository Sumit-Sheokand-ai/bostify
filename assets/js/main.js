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
    // ADVANCED MOBILE MENU SYSTEM WITH MODERN WEB APIS
    // ================================================
    function initMobileMenu() {
        console.log('🔧 Initializing advanced mobile menu system...');
        
        const hamburger = document.querySelector('.hamburger, .nav-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const desktopMenu = document.querySelector('.desktop-menu');
        const header = document.querySelector('.header');
        const body = document.body;
        
        console.log('📱 Mobile menu elements found:', { 
            hamburger: !!hamburger, 
            mobileMenu: !!mobileMenu, 
            desktopMenu: !!desktopMenu 
        });
        
        if (!hamburger || !mobileMenu) {
            console.error('❌ Required mobile menu elements not found!');
            return;
        }

        // Enhanced hamburger click with modern event handling
        hamburger.addEventListener('click', handleHamburgerClick, { passive: false });
        
        // Enhanced mobile menu link handling with delegation
        mobileMenu.addEventListener('click', handleMobileMenuClick, { passive: false });

        // Advanced outside click detection with path API
        document.addEventListener('click', handleOutsideClick, { passive: false });
        
        // Advanced escape key handling
        document.addEventListener('keydown', handleEscapeKey, { passive: false });
        
        // Modern resize handling with throttling
        window.addEventListener('resize', throttledResizeHandler, { passive: true });
        
        // Touch event optimization for mobile
        if ('ontouchstart' in window) {
            initTouchOptimizations();
        }
        
        // Modern IntersectionObserver for menu state management
        initMenuObserver();
        
        console.log('✅ Advanced mobile menu system initialized');

        function handleHamburgerClick(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('🍔 Advanced hamburger clicked!');
            
            const isCurrentlyActive = hamburger.classList.contains('active');
            
            if (isCurrentlyActive) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        }

        function handleMobileMenuClick(e) {
            const link = e.target.closest('.nav-link');
            if (link) {
                console.log('📱 Mobile nav link clicked:', link.textContent);
                
                // Add visual feedback
                link.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    link.style.transform = '';
                }, 150);
                
                // Close menu after navigation
                setTimeout(() => {
                    closeMobileMenu();
                }, 200);
            }
        }

        function handleOutsideClick(e) {
            if (!hamburger.classList.contains('active')) return;
            
            // Use modern event.composedPath() for better event tracking
            const eventPath = e.composedPath ? e.composedPath() : [e.target];
            const clickedInsideMenu = eventPath.some(el => 
                el === hamburger || el === mobileMenu || (el.closest && el.closest('.mobile-menu'))
            );
            
            if (!clickedInsideMenu) {
                console.log('👆 Advanced outside click detected, closing menu...');
                closeMobileMenu();
            }
        }

        function handleEscapeKey(e) {
            if (e.key === 'Escape' && hamburger.classList.contains('active')) {
                console.log('⌨️ Escape key pressed, closing menu...');
                closeMobileMenu();
            }
        }

        function openMobileMenu() {
            // Use requestAnimationFrame for smooth animations
            requestAnimationFrame(() => {
                hamburger.classList.add('active');
                mobileMenu.classList.add('active');
                body.style.overflow = 'hidden';
                
                // Modern focus management
                if (mobileMenu.querySelector('.nav-link')) {
                    mobileMenu.querySelector('.nav-link').focus();
                }
                
                // Add backdrop blur effect
                if (header) {
                    header.style.backdropFilter = 'blur(10px)';
                }
                
                console.log('📱 Menu opened with advanced animations');
            });
        }

        function closeMobileMenu() {
            requestAnimationFrame(() => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.style.overflow = '';
                
                // Reset backdrop effect
                if (header) {
                    header.style.backdropFilter = '';
                }
                
                // Return focus to hamburger
                hamburger.focus();
                
                console.log('✅ Menu closed with advanced cleanup');
            });
        }

        function initTouchOptimizations() {
            // Enhanced touch handling for mobile devices
            let touchStartY = 0;
            
            mobileMenu.addEventListener('touchstart', (e) => {
                touchStartY = e.touches[0].clientY;
            }, { passive: true });
            
            mobileMenu.addEventListener('touchmove', (e) => {
                const touchY = e.touches[0].clientY;
                const deltaY = touchY - touchStartY;
                
                // Prevent bounce scrolling when at top/bottom
                if ((mobileMenu.scrollTop === 0 && deltaY > 0) || 
                    (mobileMenu.scrollTop >= mobileMenu.scrollHeight - mobileMenu.clientHeight && deltaY < 0)) {
                    e.preventDefault();
                }
            }, { passive: false });
            
            console.log('🖐️ Touch optimizations initialized');
        }

        function initMenuObserver() {
            // Modern ResizeObserver for responsive behavior
            if ('ResizeObserver' in window) {
                const resizeObserver = new ResizeObserver(entries => {
                    for (let entry of entries) {
                        if (entry.target === document.body) {
                            handleViewportChange();
                        }
                    }
                });
                resizeObserver.observe(document.body);
            }
        }

        function handleViewportChange() {
            const isMobile = window.innerWidth <= 768;
            
            if (!isMobile && hamburger.classList.contains('active')) {
                closeMobileMenu();
            }
            
            // Update menu visibility based on viewport
            if (desktopMenu && mobileMenu) {
                if (isMobile) {
                    desktopMenu.style.display = 'none';
                    mobileMenu.style.display = 'flex';
                } else {
                    desktopMenu.style.display = 'flex';
                    mobileMenu.style.display = 'none';
                }
            }
        }

        const throttledResizeHandler = throttle(handleViewportChange, 100);
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
    // ADVANCED PERFORMANCE OPTIMIZATION WITH MODERN WEB APIS
    // ================================================
    function initPerformanceOptimizations() {
        console.log('🚀 Initializing advanced performance optimizations...');
        
        // Modern lazy loading with Intersection Observer v2
        initAdvancedLazyLoading();
        
        // Preload critical resources
        initResourcePreloading();
        
        // Optimize images with modern formats
        initImageOptimization();
        
        // Memory management and cleanup
        initMemoryOptimization();
        
        // Network-aware optimizations
        initNetworkOptimizations();
        
        // Set current year in footer
        document.querySelectorAll('.current-year').forEach(el => el.textContent = new Date().getFullYear());
        
        console.log('✅ Advanced performance optimizations initialized');

        function initAdvancedLazyLoading() {
            const images = document.querySelectorAll('img[loading="lazy"], img[data-src]');
            const videos = document.querySelectorAll('video[data-src]');
            
            if ('IntersectionObserver' in window) {
                const observerOptions = {
                    root: null,
                    rootMargin: '50px 0px',
                    threshold: 0.01
                };

                const imageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const element = entry.target;
                            
                            if (element.tagName === 'IMG') {
                                loadImage(element);
                            } else if (element.tagName === 'VIDEO') {
                                loadVideo(element);
                            }
                            
                            observer.unobserve(element);
                        }
                    });
                }, observerOptions);

                [...images, ...videos].forEach(element => {
                    imageObserver.observe(element);
                });
            } else {
                // Fallback for older browsers
                [...images, ...videos].forEach(element => {
                    if (element.tagName === 'IMG') {
                        loadImage(element);
                    } else if (element.tagName === 'VIDEO') {
                        loadVideo(element);
                    }
                });
            }

            function loadImage(img) {
                return new Promise((resolve, reject) => {
                    const imageLoader = new Image();
                    
                    imageLoader.onload = () => {
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        img.classList.add('loaded');
                        resolve(img);
                    };
                    
                    imageLoader.onerror = reject;
                    imageLoader.src = img.dataset.src || img.src;
                });
            }

            function loadVideo(video) {
                if (video.dataset.src) {
                    video.src = video.dataset.src;
                    video.removeAttribute('data-src');
                }
                video.classList.add('loaded');
            }
        }

        function initResourcePreloading() {
            // Preload critical CSS and fonts
            const criticalResources = [
                { href: '/assets/css/main.css', as: 'style' },
                { href: '/assets/js/main.js', as: 'script' }
            ];

            criticalResources.forEach(resource => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.href = resource.href;
                link.as = resource.as;
                if (resource.as === 'style') {
                    link.onload = () => {
                        link.rel = 'stylesheet';
                    };
                }
                document.head.appendChild(link);
            });

            // Preload next page on hover (for better UX)
            if ('requestIdleCallback' in window) {
                document.addEventListener('mouseover', (e) => {
                    const link = e.target.closest('a[href]');
                    if (link && link.hostname === location.hostname) {
                        requestIdleCallback(() => {
                            preloadPage(link.href);
                        });
                    }
                }, { passive: true });
            }
        }

        function preloadPage(url) {
            if (document.querySelector(`link[rel="prefetch"][href="${url}"]`)) {
                return; // Already preloaded
            }

            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = url;
            document.head.appendChild(link);
        }

        function initImageOptimization() {
            // Modern image format support detection
            const supportsWebP = checkWebPSupport();
            const supportsAVIF = checkAVIFSupport();

            if (supportsAVIF || supportsWebP) {
                const images = document.querySelectorAll('img[data-src]');
                images.forEach(img => {
                    const src = img.dataset.src;
                    if (src) {
                        let optimizedSrc = src;
                        if (supportsAVIF && !src.includes('.svg')) {
                            optimizedSrc = src.replace(/\.(jpg|jpeg|png|webp)$/i, '.avif');
                        } else if (supportsWebP && !src.includes('.svg')) {
                            optimizedSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
                        }
                        img.dataset.src = optimizedSrc;
                    }
                });
            }
        }

        function checkWebPSupport() {
            const canvas = document.createElement('canvas');
            return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        }

        function checkAVIFSupport() {
            const canvas = document.createElement('canvas');
            return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
        }

        function initMemoryOptimization() {
            // Clean up event listeners and observers on page unload
            window.addEventListener('beforeunload', () => {
                // Clear all timeouts and intervals
                for (let i = 1; i < 99999; i++) {
                    clearTimeout(i);
                    clearInterval(i);
                }
                
                // Remove event listeners
                document.removeEventListener('scroll', throttledScrollHandler);
                window.removeEventListener('resize', throttledResizeHandler);
            });

            // Monitor memory usage in development
            if ('memory' in performance && location.hostname === 'localhost') {
                setInterval(() => {
                    const memory = performance.memory;
                    if (memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.9) {
                        console.warn('⚠️ High memory usage detected:', {
                            used: Math.round(memory.usedJSHeapSize / 1048576) + 'MB',
                            limit: Math.round(memory.jsHeapSizeLimit / 1048576) + 'MB'
                        });
                    }
                }, 30000);
            }
        }

        function initNetworkOptimizations() {
            // Network-aware loading
            if ('connection' in navigator) {
                const connection = navigator.connection;
                const isSlow = connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g';
                const isLowData = connection.saveData;

                if (isSlow || isLowData) {
                    // Reduce animations and effects on slow connections
                    document.body.classList.add('reduced-animations');
                    
                    // Disable floating particles on slow connections
                    const particles = document.querySelector('.floating-particles');
                    if (particles) {
                        particles.style.display = 'none';
                    }
                    
                    console.log('📡 Slow connection detected, optimizations applied');
                }
            }

            // Service Worker registration for caching
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/sw.js')
                        .then(registration => {
                            console.log('✅ Service Worker registered:', registration.scope);
                        })
                        .catch(error => {
                            console.log('❌ Service Worker registration failed:', error);
                        });
                });
            }
        }
    }

    // ================================================
    // ADVANCED UNIFIED TOUCH FEEDBACK WITH MODERN APIS
    // ================================================
    function initTouchFeedback() {
        const isMobile = 'ontouchstart' in window;
        const supportsPointer = 'PointerEvent' in window;
        const supportsHaptic = 'vibrate' in navigator;
        
        console.log('📱 Touch capabilities:', { isMobile, supportsPointer, supportsHaptic });
        
        if (!isMobile && !supportsPointer) return;

        const interactiveElements = 'a, button, .cta-button, .nav-link, .nav-toggle, input, textarea, select';
        
        // Modern event delegation with pointer events
        if (supportsPointer) {
            initPointerEvents();
        } else {
            initTouchEvents();
        }
        
        // Add ripple effect to touch interactions
        initRippleEffects();
        
        // Enhanced focus management for mobile
        initMobileFocusManagement();
        
        console.log('✅ Advanced touch feedback initialized');

        function initPointerEvents() {
            document.body.addEventListener('pointerdown', (e) => {
                const target = e.target.closest(interactiveElements);
                if (target && e.pointerType === 'touch') {
                    handleTouchStart(target, e);
                }
            }, { passive: false });

            document.body.addEventListener('pointerup', (e) => {
                const target = e.target.closest(interactiveElements);
                if (target && e.pointerType === 'touch') {
                    handleTouchEnd(target, e);
                }
            }, { passive: true });

            document.body.addEventListener('pointercancel', (e) => {
                const target = e.target.closest(interactiveElements);
                if (target) {
                    handleTouchCancel(target);
                }
            }, { passive: true });
        }

        function initTouchEvents() {
            document.body.addEventListener('touchstart', (e) => {
                const target = e.target.closest(interactiveElements);
                if (target) {
                    handleTouchStart(target, e);
                }
            }, { passive: false });

            document.body.addEventListener('touchend', (e) => {
                const target = e.target.closest(interactiveElements);
                if (target) {
                    handleTouchEnd(target, e);
                }
            }, { passive: true });

            document.body.addEventListener('touchcancel', (e) => {
                const target = e.target.closest(interactiveElements);
                if (target) {
                    handleTouchCancel(target);
                }
            }, { passive: true });
        }

        function handleTouchStart(target, e) {
            // Add visual feedback immediately
            target.classList.add('touched');
            
            // Haptic feedback for supported devices
            if (supportsHaptic && target.matches('.nav-link, .cta-button')) {
                navigator.vibrate(10); // Subtle vibration
            }
            
            // Prevent zoom on double-tap for buttons
            if (target.matches('button, .cta-button')) {
                e.preventDefault();
            }
        }

        function handleTouchEnd(target, e) {
            // Remove visual feedback with a slight delay for better UX
            setTimeout(() => {
                target.classList.remove('touched');
            }, 150);
        }

        function handleTouchCancel(target) {
            target.classList.remove('touched');
        }

        function initRippleEffects() {
            document.body.addEventListener('click', (e) => {
                const target = e.target.closest('.nav-link, .cta-button, button');
                if (target && (isMobile || e.pointerType === 'touch')) {
                    createRippleEffect(target, e);
                }
            }, { passive: true });
        }

        function createRippleEffect(element, event) {
            const ripple = document.createElement('span');
            const rect = element.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                z-index: 1000;
            `;
            ripple.classList.add('ripple-effect');

            // Ensure element has relative positioning
            const originalPosition = element.style.position;
            if (!originalPosition || originalPosition === 'static') {
                element.style.position = 'relative';
            }

            element.appendChild(ripple);

            // Clean up ripple effect
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
                if (!originalPosition) {
                    element.style.position = '';
                }
            }, 600);
        }

        function initMobileFocusManagement() {
            // Prevent focus outline on touch devices while preserving keyboard navigation
            let isUsingKeyboard = false;

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    isUsingKeyboard = true;
                    document.body.classList.add('keyboard-navigation');
                }
            });

            document.addEventListener('mousedown', () => {
                isUsingKeyboard = false;
                document.body.classList.remove('keyboard-navigation');
            });

            document.addEventListener('touchstart', () => {
                isUsingKeyboard = false;
                document.body.classList.remove('keyboard-navigation');
            });
        }
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
