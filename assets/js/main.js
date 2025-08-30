/*===========================================
    Bostify - MAIN JAVASCRIPT FILE
    Interactive functionality for the website
===========================================*/

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate hamburger bars
            const bars = hamburger.querySelectorAll('.bar');
            if (hamburger.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on nav links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                const bars = hamburger.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }
    
    // Smooth Scrolling for anchor links
    const scrollToLinks = document.querySelectorAll('a[href^="#"], .scroll-to');
    scrollToLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Form Validation and Submission
    const auditForm = document.getElementById('audit-form');
    const successMessage = document.getElementById('success-message');
    
    if (auditForm) {
        auditForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                submitForm();
            }
        });
    }
    
    // Form Validation Function
    function validateForm() {
        const requiredFields = auditForm.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            const value = field.value.trim();
            const fieldGroup = field.closest('.form-group');
            
            // Remove previous error styles
            field.classList.remove('error');
            const existingError = fieldGroup.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            // Check if field is empty
            if (!value) {
                showFieldError(field, 'This field is required');
                isValid = false;
            } else {
                // Validate email format
                if (field.type === 'email' && !isValidEmail(value)) {
                    showFieldError(field, 'Please enter a valid email address');
                    isValid = false;
                }
                
                // Validate URL format
                if (field.type === 'url' && !isValidURL(value)) {
                    showFieldError(field, 'Please enter a valid website URL');
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }
    
    // Show Field Error
    function showFieldError(field, message) {
        field.classList.add('error');
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        field.closest('.form-group').appendChild(errorElement);
    }
    
    // Email Validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // URL Validation
    function isValidURL(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }
    
    // Form Submission Function
    function submitForm() {
        const submitButton = auditForm.querySelector('button[type="submit"]');
        const buttonText = submitButton.querySelector('.button-text');
        const buttonLoading = submitButton.querySelector('.button-loading');
        
        // Show loading state
        submitButton.disabled = true;
        buttonText.style.display = 'none';
        buttonLoading.style.display = 'inline';
        
        // Collect form data
        const formData = new FormData(auditForm);
        const formDataObj = {};
        
        for (let [key, value] of formData.entries()) {
            formDataObj[key] = value;
        }
        
        // Simulate API call (replace with actual form submission)
        setTimeout(() => {
            // In a real implementation, you would send this data to your server
            // For now, we'll just show the success message
            
            console.log('Form submitted with data:', formDataObj);
            
            // Send email using a service like EmailJS or your backend API
            sendFormData(formDataObj);
            
            // Hide form and show success message
            auditForm.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth' });
            
        }, 2000); // 2 second delay to simulate processing
    }
    
    // Enhanced Form Data Submission with Premium Features
    function sendFormData(data) {
        // Premium EmailJS configuration with error handling
        if (typeof emailjs !== 'undefined') {
            // Add user tracking for analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    event_category: 'engagement',
                    event_label: 'contact_form',
                    value: 1
                });
            }
            
            // Enhanced EmailJS send function
        emailjs.send(
                'service_lqo17bk',  
                'template_noice5r', 
                {
            to_email: 'sumitsheokand347@gmail.com',
                    from_name: data.name || 'Website Visitor',
                    from_email: data.email || 'No email provided',
                    website: data.website || 'Not specified',
                    phone: data.phone || 'Not provided',
                    business_type: data['business-type'] || 'Not specified',
                    business_goals: data['business-goals'] || 'Not specified',
                    current_traffic: data['current-traffic'] || 'Not specified',
                    budget: data.budget || 'Not specified',
                    newsletter: data.newsletter ? 'Yes' : 'No',
                    submission_date: new Date().toLocaleString(),
                    message: `New SEO audit request from ${data.name || 'Website Visitor'}`
                }
            ).then(
                function(response) {
                    console.log('✅ Email sent successfully!', response.status, response.text);
                },
                function(error) {
                    console.error('❌ Failed to send email:', error);
                    // Fallback: Show user a message to contact directly
                    showEmailFallback();
                }
            );
        } else {
            console.log('EmailJS not loaded. Form data logged:', data);
            // Fallback: Show user a message to contact directly
            showEmailFallback();
        }
    }
    
    // Fallback function when email service is not available
    function showEmailFallback() {
        const successMessage = document.getElementById('success-message');
        if (successMessage) {
            const fallbackHTML = `
                <div class="success-content">
                    <div class="success-icon">📧</div>
                    <h3>Almost There!</h3>
                    <p>Thanks for your interest in our SEO services! Please send your details directly to:</p>
                    <p><strong><a href="mailto:sumitsheokand347@gmail.com">sumitsheokand347@gmail.com</a></strong></p>
                    <p>Or call us to schedule your free consultation.</p>
                    <div class="success-actions">
                        <a href="mailto:sumitsheokand347@gmail.com?subject=SEO Audit Request&body=Hi Sumit,%0D%0A%0D%0AI'm interested in your SEO services. Here are my details:%0D%0A%0D%0AWebsite: %0D%0ABusiness Type: %0D%0ACurrent Goals: %0D%0A%0D%0ALooking forward to hearing from you!" class="cta-button primary">Send Email Now</a>
                    </div>
                </div>
            `;
            successMessage.innerHTML = fallbackHTML;
        }
    }
    
    // Schedule Call Handler
    const scheduleCallButton = document.getElementById('schedule-call');
    if (scheduleCallButton) {
        scheduleCallButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Replace this with actual Calendly or scheduling link
            alert('Please email sumitsheokand347@gmail.com to schedule your free consultation call. A scheduling link will be provided soon!');
            
            // In production, you might redirect to Calendly:
           window.open('https://calendly.com/sumitsheokand347/30min', '_blank');
        });
    }
    
    // Scroll animations for elements coming into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.glass-effect, .service-card, .testimonial-card, .pricing-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Counter Animation for Statistics
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number, .trust-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/\D/g, ''));
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    if (counter.textContent.includes('%')) {
                        counter.textContent = Math.ceil(current) + '%';
                    } else if (counter.textContent.includes('+')) {
                        counter.textContent = Math.ceil(current) + '+';
                    } else {
                        counter.textContent = Math.ceil(current);
                    }
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = counter.textContent; // Reset to original
                }
            };
            
            // Start animation when element is in view
            const counterObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        counterObserver.unobserve(entry.target);
                    }
                });
            });
            
            counterObserver.observe(counter);
        });
    }
    
    // Initialize counter animations
    animateCounters();
    
    // FAQ Toggle Functionality (if needed)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        if (question) {
            question.style.cursor = 'pointer';
            question.addEventListener('click', function() {
                const answer = item.querySelector('p');
                if (answer.style.display === 'none') {
                    answer.style.display = 'block';
                    question.textContent = question.textContent.replace('+', '-');
                } else {
                    answer.style.display = 'none';
                    question.textContent = question.textContent.replace('-', '+');
                }
            });
        }
    });
    
    // Dynamic year in footer
    const currentYearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    currentYearElements.forEach(el => {
        el.textContent = currentYear;
    });
    
    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add scroll event for header background
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Performance optimization: Preload critical images
    function preloadImages() {
        const criticalImages = [
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
            'https://images.unsplash.com/photo-1494790108755-2616b612b786'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    // Initialize preloading
    preloadImages();
    
    // Error handling for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Replace with a better placeholder if image fails to load
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIiBzdHJva2U9IiNkZGQiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZmlsbD0iIzk5OSI+SW1hZ2UgTG9hZGluZy4uLjwvdGV4dD48L3N2Zz4=';
            this.alt = 'Image loading placeholder';
            
            // Try loading a fallback image after a short delay
            setTimeout(() => {
                if (this.src.includes('data:image/svg+xml')) {
                    // Use a generic business/SEO related image as fallback
                    this.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                    this.alt = 'SEO Analytics and Digital Marketing';
                }
            }, 1000);
        });
    });
});

// Additional CSS animations (add these to main.css if needed)
const animationCSS = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .header.scrolled {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
    }
    
    .header {
        transition: transform 0.3s ease, background 0.3s ease;
    }
    
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
        transition: all 0.3s ease;
    }
`;

// Add animation styles to document
if (!document.getElementById('animation-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'animation-styles';
    styleSheet.textContent = animationCSS;
    document.head.appendChild(styleSheet);
}

// Google Analytics (gtag) - dynamic loader with your Measurement ID
(function initGoogleAnalytics(){
    try {
    var cfg = (window.Bostify_PAYMENT_CONFIG && window.Bostify_PAYMENT_CONFIG.analytics && window.Bostify_PAYMENT_CONFIG.analytics.googleAnalytics) || {};
    var MEASUREMENT_ID = cfg.trackingId || 'G-Z4E591FCE0';
    var GA_ENABLED = cfg.enabled !== false; // default true if not explicitly false
    if (!GA_ENABLED || !MEASUREMENT_ID) return;

        // If gtag already present, just configure and exit
        if (typeof window.gtag === 'function') {
            window.gtag('config', MEASUREMENT_ID, {
                page_title: document.title || undefined,
                page_location: window.location.href
            });
            return;
        }

        // Prepare dataLayer and gtag stub before loading script
        window.dataLayer = window.dataLayer || [];
        function gtag(){ dataLayer.push(arguments); }
        window.gtag = gtag;
        gtag('js', new Date());

        // Avoid duplicate script injection
    if (!document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
            var gaScript = document.createElement('script');
            gaScript.async = true;
            gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(MEASUREMENT_ID);
            gaScript.onload = function(){
                // Configure after load (also safe to call before due to stub)
                gtag('config', MEASUREMENT_ID, {
                    page_title: document.title || undefined,
                    page_location: window.location.href
                });
            };
            gaScript.onerror = function(err){
                console.error('Google Analytics failed to load:', err);
            };
            document.head.appendChild(gaScript);
        } else {
            // Script tag exists; still ensure config is called
            gtag('config', MEASUREMENT_ID, {
                page_title: document.title || undefined,
                page_location: window.location.href
            });
        }
    } catch (e) {
        console.error('GA init error:', e);
    }
})();

// Cookie consent (simple implementation)
function showCookieConsent() {
    if (!localStorage.getItem('cookieConsent')) {
        const banner = document.createElement('div');
        banner.innerHTML = `
            <div style="position: fixed; bottom: 0; left: 0; right: 0; background: #333; color: white; padding: 1rem; text-align: center; z-index: 10000;">
                <p style="margin: 0 0 1rem 0;">This website uses cookies to ensure you get the best experience. 
                <a href="#" style="color: #00c851;">Learn more</a></p>
                <button id="accept-cookies" style="background: #00c851; color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer;">Accept</button>
            </div>
        `;
        document.body.appendChild(banner);
        
        document.getElementById('accept-cookies').addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'true');
            banner.remove();
        });
    }
}

// Show cookie consent after 2 seconds
setTimeout(showCookieConsent, 2000);

// ================================================
// PERFORMANCE OPTIMIZATION MODULE
// ================================================

// Lazy Loading Implementation
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
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
        });
    }
}

// Core Web Vitals Monitoring
function monitorPerformance() {
    if ('PerformanceObserver' in window) {
        try {
            // Largest Contentful Paint (LCP)
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.startTime);
                
                // Send to analytics if available
                if (typeof gtag === 'function') {
                    gtag('event', 'page_performance', {
                        metric: 'LCP',
                        value: Math.round(lastEntry.startTime)
                    });
                }
            });
            lcpObserver.observe({entryTypes: ['largest-contentful-paint']});
            
            // First Input Delay (FID)
            const fidObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    const fid = entry.processingStart - entry.startTime;
                    console.log('FID:', fid);
                    
                    if (typeof gtag === 'function') {
                        gtag('event', 'page_performance', {
                            metric: 'FID',
                            value: Math.round(fid)
                        });
                    }
                });
            });
            fidObserver.observe({entryTypes: ['first-input']});
            
        } catch (error) {
            console.log('Performance monitoring not supported');
        }
    }
}

// Resource Preloading
function preloadCriticalResources() {
    const criticalResources = [
        { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap', as: 'style' },
        { href: '/assets/css/main.css', as: 'style' }
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        if (resource.as === 'style') {
            link.onload = function() {
                this.onload = null;
                this.rel = 'stylesheet';
            };
        }
        document.head.appendChild(link);
    });
}

// Service Worker Registration
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registered:', registration);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
    }
}

// Initialize performance optimizations
function initPerformanceOptimizations() {
    initLazyLoading();
    monitorPerformance();
    preloadCriticalResources();
    // Removed service worker registration to prevent popup
    // registerServiceWorker();
}

// Initialize performance optimizations when DOM is ready
document.addEventListener('DOMContentLoaded', initPerformanceOptimizations);

