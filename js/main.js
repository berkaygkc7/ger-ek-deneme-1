/**
 * Servispark Taşımacılık - Main JavaScript File
 * Professional Website Interactions & Animations
 */

(function() {
    'use strict';

    // ==========================================================================
    // DOM Elements
    // ==========================================================================
    const elements = {
        loadingOverlay: document.getElementById('loadingOverlay'),
        navbar: document.querySelector('.navbar'),
        mobileToggle: document.getElementById('mobileToggle'),
        mobileMenu: document.getElementById('mobileMenu'),
        backToTop: document.getElementById('backToTop'),
        contactForm: document.getElementById('contactForm'),
        lightbox: document.getElementById('lightbox'),
        lightboxImage: document.getElementById('lightboxImage'),
        lightboxClose: document.getElementById('lightboxClose'),
        faqQuestions: document.querySelectorAll('.faq-question'),
        galleryItems: document.querySelectorAll('.gallery-item'),
        statisticsSection: document.querySelector('.statistics'),
        statNumbers: document.querySelectorAll('.stat-number'),
        navLinks: document.querySelectorAll('a[href^="#"]'),
        mobileMenuLinks: document.querySelectorAll('.mobile-menu a')
    };

    // ==========================================================================
    // Loading Overlay
    // ==========================================================================
    function initLoadingOverlay() {
        window.addEventListener('load', function() {
            setTimeout(function() {
                if (elements.loadingOverlay) {
                    elements.loadingOverlay.classList.add('hidden');
                }
            }, 800);
        });
    }

    // ==========================================================================
    // Navbar Scroll Effect
    // ==========================================================================
    function initNavbarScroll() {
        let lastScrollTop = 0;

        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (elements.navbar) {
                if (scrollTop > 50) {
                    elements.navbar.classList.add('scrolled');
                } else {
                    elements.navbar.classList.remove('scrolled');
                }
            }

            lastScrollTop = scrollTop;
        });
    }

    // ==========================================================================
    // Mobile Menu
    // ==========================================================================
    function initMobileMenu() {
        if (elements.mobileToggle && elements.mobileMenu) {
            elements.mobileToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                elements.mobileMenu.classList.toggle('active');
                document.body.style.overflow = elements.mobileMenu.classList.contains('active') ? 'hidden' : '';
            });

            // Close mobile menu when clicking on a link
            elements.mobileMenuLinks.forEach(function(link) {
                link.addEventListener('click', function() {
                    elements.mobileToggle.classList.remove('active');
                    elements.mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!elements.mobileToggle.contains(e.target) && !elements.mobileMenu.contains(e.target)) {
                    elements.mobileToggle.classList.remove('active');
                    elements.mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    }

    // ==========================================================================
    // Smooth Scroll
    // ==========================================================================
    function initSmoothScroll() {
        elements.navLinks.forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Only handle internal links (starting with #)
                if (href.startsWith('#') && href.length > 1) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    
                    if (target) {
                        const headerOffset = 85;
                        const elementPosition = target.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // ==========================================================================
    // Back to Top Button
    // ==========================================================================
    function initBackToTop() {
        if (elements.backToTop) {
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 400) {
                    elements.backToTop.classList.add('visible');
                } else {
                    elements.backToTop.classList.remove('visible');
                }
            });

            elements.backToTop.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // ==========================================================================
    // FAQ Accordion
    // ==========================================================================
    function initFaqAccordion() {
        elements.faqQuestions.forEach(function(question) {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                const wasActive = faqItem.classList.contains('active');

                // Close all FAQ items
                document.querySelectorAll('.faq-item').forEach(function(item) {
                    item.classList.remove('active');
                });

                // Open clicked item if it wasn't active
                if (!wasActive) {
                    faqItem.classList.add('active');
                }
            });
        });
    }

    // ==========================================================================
    // Statistics Counter Animation
    // ==========================================================================
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2500;
        const startTime = performance.now();
        const startValue = 0;

        function easeOutQuart(t) {
            return 1 - Math.pow(1 - t, 4);
        }

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const currentValue = Math.floor(startValue + (target - startValue) * easedProgress);

            element.textContent = formatNumber(currentValue);

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = formatNumber(target) + '+';
            }
        }

        requestAnimationFrame(updateCounter);
    }

    function formatNumber(num) {
        return num.toLocaleString('tr-TR');
    }

    function initStatisticsAnimation() {
        if (elements.statisticsSection) {
            const observerOptions = {
                threshold: 0.3,
                rootMargin: '0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        elements.statNumbers.forEach(function(counter) {
                            if (!counter.classList.contains('animated')) {
                                counter.classList.add('animated');
                                animateCounter(counter);
                            }
                        });
                    }
                });
            }, observerOptions);

            observer.observe(elements.statisticsSection);
        }
    }

    // ==========================================================================
    // Gallery Lightbox
    // ==========================================================================
    function initGalleryLightbox() {
        elements.galleryItems.forEach(function(item) {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                if (img && img.src && elements.lightbox && elements.lightboxImage) {
                    elements.lightboxImage.src = img.src;
                    elements.lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        if (elements.lightboxClose) {
            elements.lightboxClose.addEventListener('click', closeLightbox);
        }

        if (elements.lightbox) {
            elements.lightbox.addEventListener('click', function(e) {
                if (e.target === elements.lightbox) {
                    closeLightbox();
                }
            });
        }

        // Close lightbox with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && elements.lightbox && elements.lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    function closeLightbox() {
        if (elements.lightbox) {
            elements.lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // ==========================================================================
    // Contact Form Handler
    // ==========================================================================
    function initContactForm() {
        if (elements.contactForm) {
            elements.contactForm.addEventListener('submit', function(e) {
                e.preventDefault();

                // Get form data
                const formData = new FormData(this);
                const data = Object.fromEntries(formData.entries());

                // Simple validation
                if (!data.name || !data.phone || !data.email || !data.service) {
                    showNotification('Lütfen tüm zorunlu alanları doldurun.', 'error');
                    return;
                }

                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(data.email)) {
                    showNotification('Lütfen geçerli bir e-posta adresi girin.', 'error');
                    return;
                }

                // Phone validation (Turkish format)
                const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
                if (!phoneRegex.test(data.phone)) {
                    showNotification('Lütfen geçerli bir telefon numarası girin.', 'error');
                    return;
                }

                // Show success message (in production, send to server)
                showNotification('Teklif talebiniz başarıyla gönderildi! En kısa sürede sizinle iletişime geçeceğiz.', 'success');
                this.reset();
            });
        }
    }

    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification notification-' + type;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            padding: 18px 25px;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            z-index: 10002;
            animation: slideIn 0.5s ease;
            max-width: 400px;
        `;

        // Add animation keyframes if not exists
        if (!document.getElementById('notificationStyles')) {
            const style = document.createElement('style');
            style.id = 'notificationStyles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .notification-content i {
                    font-size: 1.3rem;
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Remove notification after 5 seconds
        setTimeout(function() {
            notification.style.animation = 'slideOut 0.5s ease forwards';
            setTimeout(function() {
                notification.remove();
            }, 500);
        }, 5000);
    }

    // ==========================================================================
    // Scroll Animations (AOS-like)
    // ==========================================================================
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('[data-aos]');

        if (animatedElements.length === 0) return;

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-aos-delay') || 0;
                    setTimeout(function() {
                        entry.target.classList.add('aos-animate');
                    }, delay);
                }
            });
        }, observerOptions);

        animatedElements.forEach(function(element) {
            const duration = element.getAttribute('data-aos-duration') || 600;
            element.style.transitionDuration = duration + 'ms';
            observer.observe(element);
        });
    }

    // ==========================================================================
    // Image Placeholder Handler
    // ==========================================================================
    function initImagePlaceholders() {
        const images = document.querySelectorAll('img[data-placeholder]');

        images.forEach(function(img) {
            img.addEventListener('error', function() {
                const placeholder = this.getAttribute('data-placeholder');
                if (placeholder) {
                    // Hide the broken image
                    this.style.display = 'none';
                    // Show the placeholder element
                    const placeholderEl = this.nextElementSibling;
                    if (placeholderEl && placeholderEl.classList.contains('placeholder-icon')) {
                        placeholderEl.style.display = 'flex';
                    }
                }
            });
        });
    }

    // ==========================================================================
    // Parallax Effect
    // ==========================================================================
    function initParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');

        if (parallaxElements.length === 0) return;

        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;

            parallaxElements.forEach(function(element) {
                const speed = element.getAttribute('data-parallax') || 0.5;
                const yPos = -(scrollTop * speed);
                element.style.transform = 'translate3d(0, ' + yPos + 'px, 0)';
            });
        });
    }

    // ==========================================================================
    // Typing Effect for Hero
    // ==========================================================================
    function initTypingEffect() {
        const typingElement = document.querySelector('[data-typing]');
        
        if (!typingElement) return;

        const words = typingElement.getAttribute('data-typing').split(',');
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pause before typing next word
            }

            setTimeout(type, typeSpeed);
        }

        type();
    }

    // ==========================================================================
    // Lazy Loading Images
    // ==========================================================================
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.getAttribute('data-src');
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(function(img) {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for older browsers
            lazyImages.forEach(function(img) {
                img.src = img.getAttribute('data-src');
            });
        }
    }

    // ==========================================================================
    // Active Navigation Link
    // ==========================================================================
    function initActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', function() {
            let current = '';
            const scrollPosition = window.pageYOffset + 100;

            sections.forEach(function(section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(function(link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    }

    // ==========================================================================
    // Initialize All Functions
    // ==========================================================================
    function init() {
        initLoadingOverlay();
        initNavbarScroll();
        initMobileMenu();
        initSmoothScroll();
        initBackToTop();
        initFaqAccordion();
        initStatisticsAnimation();
        initGalleryLightbox();
        initContactForm();
        initScrollAnimations();
        initImagePlaceholders();
        initParallax();
        initLazyLoading();
        initActiveNavigation();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
