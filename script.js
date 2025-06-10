// Theme Toggle Functionality
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.themeToggle = document.getElementById('themeToggle');
        this.init();
    }

    init() {
        this.setTheme(this.theme);
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
}

// Intersection Observer for Animations
class AnimationObserver {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '-50px 0px'
        };
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(
                this.handleIntersection.bind(this),
                this.observerOptions
            );
            this.observeElements();
        }
    }

    observeElements() {
        const elements = document.querySelectorAll('.skill-card, .experience-card, .service-card, .feature-item');
        elements.forEach(el => this.observer.observe(el));
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                this.observer.unobserve(entry.target);
            }
        });
    }
}

// Smooth Scrolling for Navigation Links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', this.handleClick.bind(this));
        });
    }

    handleClick(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
}

// Mobile Menu Toggle
class MobileMenu {
    constructor() {
        this.toggle = document.getElementById('mobileMenuToggle');
        this.menu = document.querySelector('.nav-menu');
        this.isOpen = false;
        this.init();
    }

    init() {
        if (this.toggle) {
            this.toggle.addEventListener('click', () => this.toggleMenu());
        }
    }

    toggleMenu() {
        this.isOpen = !this.isOpen;
        this.toggle.classList.toggle('active', this.isOpen);

        if (this.isOpen) {
            this.showMenu();
        } else {
            this.hideMenu();
        }
    }

    showMenu() {
        this.menu.style.display = 'flex';
        this.menu.style.position = 'absolute';
        this.menu.style.top = '100%';
        this.menu.style.left = '0';
        this.menu.style.right = '0';
        this.menu.style.background = 'var(--bg-primary)';
        this.menu.style.flexDirection = 'column';
        this.menu.style.padding = '1rem';
        this.menu.style.boxShadow = 'var(--shadow-lg)';
        this.menu.style.borderRadius = '0 0 var(--radius) var(--radius)';
    }

    hideMenu() {
        this.menu.style.display = 'none';
    }
}

// Header Scroll Effect
class HeaderScroll {
    constructor() {
        this.header = document.querySelector('.header');
        this.lastScrollY = window.scrollY;
        this.init();
    }

    init() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            this.header.style.background = 'rgba(255, 255, 255, 0.98)';
            this.header.style.boxShadow = 'var(--shadow-md)';
        } else {
            this.header.style.background = 'rgba(255, 255, 255, 0.95)';
            this.header.style.boxShadow = 'none';
        }

        this.lastScrollY = currentScrollY;
    }
}

// Typing Animation for Hero Title
class TypingAnimation {
    constructor() {
        this.element = document.querySelector('.hero-title');
        this.text = this.element.textContent;
        this.speed = 100;
        this.init();
    }

    init() {
        this.element.textContent = '';
        this.typeText();
    }

    typeText() {
        let i = 0;
        const timer = setInterval(() => {
            if (i < this.text.length) {
                this.element.textContent += this.text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, this.speed);
    }
}

// Parallax Effect for Hero Section
class ParallaxEffect {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.init();
    }

    init() {
        if (window.innerWidth > 768) {
            window.addEventListener('scroll', this.handleScroll.bind(this));
        }
    }

    handleScroll() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        this.hero.style.transform = `translateY(${rate}px)`;
    }
}

// Form Validation (if contact form is added)
class FormValidator {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.init();
    }

    init() {
        this.forms.forEach(form => {
            form.addEventListener('submit', this.handleSubmit.bind(this));
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        // Basic validation
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                this.showError(field, 'This field is required');
                isValid = false;
            } else {
                this.clearError(field);
            }
        });

        if (isValid) {
            this.submitForm(formData);
        }
    }

    showError(field, message) {
        field.classList.add('error');
        let errorElement = field.parentNode.querySelector('.error-message');

        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }

        errorElement.textContent = message;
    }

    clearError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    submitForm(formData) {
        // Handle form submission
        console.log('Form submitted:', formData);
        // You can add actual form submission logic here
    }
}

// Performance Optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.preloadCriticalResources();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    preloadCriticalResources() {
        const criticalImages = [
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
}

// Accessibility Enhancements
class AccessibilityManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupAriaLabels();
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    setupFocusManagement() {
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );

        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.classList.add('focused');
            });

            element.addEventListener('blur', () => {
                element.classList.remove('focused');
            });
        });
    }

    setupAriaLabels() {
        // Add aria-labels to elements that need them
        const socialLinks = document.querySelectorAll('.social-link');
        const labels = ['GitHub', 'LinkedIn', 'Twitter', 'Medium Blog'];

        socialLinks.forEach((link, index) => {
            if (!link.getAttribute('aria-label') && labels[index]) {
                link.setAttribute('aria-label', labels[index]);
            }
        });
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    new ThemeManager();
    new AnimationObserver();
    new SmoothScroll();
    new MobileMenu();
    new HeaderScroll();

    // Enhanced features
    new AccessibilityManager();
    new PerformanceOptimizer();

    // Optional features (uncomment if needed)
    // new TypingAnimation();
    // new ParallaxEffect();
    // new FormValidator();

    // Add loading state management
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');

        // Trigger animations after page load
        setTimeout(() => {
            const animatedElements = document.querySelectorAll('.skill-card, .experience-card, .service-card');
            animatedElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 150);
            });
        }, 500);
    });
});

// Handle resize events
window.addEventListener('resize', () => {
    // Recalculate layouts if needed
    const mobileMenu = document.querySelector('.nav-menu');
    if (window.innerWidth > 768 && mobileMenu) {
        mobileMenu.style.display = '';
        mobileMenu.style.position = '';
        mobileMenu.style.top = '';
        mobileMenu.style.left = '';
        mobileMenu.style.right = '';
        mobileMenu.style.background = '';
        mobileMenu.style.flexDirection = '';
        mobileMenu.style.padding = '';
        mobileMenu.style.boxShadow = '';
        mobileMenu.style.borderRadius = '';
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Service Worker registration (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
