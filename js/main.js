document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Preloader
    const loader = document.querySelector('.loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            // Start animations after loader is hidden
            startAnimations();
        }, 500);
    });

    // Navigation
    const header = document.querySelector('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    // Toggle menu on mobile
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        toggleMenuAnimation();
    });

    // Close menu when clicking a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            resetMenuAnimation();
        });
    });

    function toggleMenuAnimation() {
        const spans = menuToggle.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            resetMenuAnimation();
        }
    }

    function resetMenuAnimation() {
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }

    // Active nav link on scroll
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Header scroll effect
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Update active nav link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Show/hide back to top button
        const backToTop = document.querySelector('.back-to-top');
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Reveal elements on scroll
        revealOnScroll();
    });

    // Typing animation
    const typingTextElement = document.querySelector('.typed-text');
    const cursor = document.querySelector('.cursor');
    const words = ["Learning Management System", "Instructional Media Developer", "UI/UX Designer", "Learning Module Development", "Graphic Designer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;

    function typeEffect() {
        isEnd = false;
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isEnd = true;
            isDeleting = true;
            setTimeout(() => {
                typeEffect();
            }, 2000); // Wait at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(() => {
                typeEffect();
            }, 500); // Wait before typing next word
        } else {
            setTimeout(() => {
                typeEffect();
            }, isDeleting ? 50 : 100); // Delete faster than type
        }
    }

    // Portfolio filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Set active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category').includes(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.transform = 'scale(1)';
                        item.style.opacity = '1';
                    }, 200);
                } else {
                    item.style.transform = 'scale(0.8)';
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 500);
                }
            });
        });
    });

    // Portfolio modals
    const portfolioLinks = document.querySelectorAll('.portfolio-link');
    const modals = document.querySelectorAll('.modal');
    const modalCloses = document.querySelectorAll('.modal-close');

    portfolioLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = link.getAttribute('data-modal');
            document.getElementById(modalId).style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    modalCloses.forEach(close => {
        close.addEventListener('click', () => {
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
            document.body.style.overflow = '';
        });
    });

    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    });

    // Gallery lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const lightboxDescription = document.querySelector('.lightbox-description');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxNext = document.querySelector('.lightbox-next');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    let currentImageIndex = 0;

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            updateLightboxContent();
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    function updateLightboxContent() {
        const img = galleryItems[currentImageIndex].querySelector('img');
        const title = galleryItems[currentImageIndex].querySelector('h3').textContent;
        const description = galleryItems[currentImageIndex].querySelector('p').textContent;

        lightboxImg.src = img.src;
        lightboxTitle.textContent = title;
        lightboxDescription.textContent = description;
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }

    lightboxNext.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
        updateLightboxContent();
    });

    lightboxPrev.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
        updateLightboxContent();
    });

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
                updateLightboxContent();
            } else if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
                updateLightboxContent();
            }
        }
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.querySelector('.success-message');
    const errorMessage = document.querySelector('.error-message');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate form submission (would be replaced with actual form submission)
            const formData = new FormData(contactForm);
            
            // Simple validation
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            if (!name || !email || !message) {
                showErrorMessage();
                return;
            }
            
            // Simulating successful submission
            setTimeout(() => {
                contactForm.reset();
                showSuccessMessage();
            }, 1000);
        });
    }

    function showSuccessMessage() {
        successMessage.style.display = 'flex';
        errorMessage.style.display = 'none';
        
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }

    function showErrorMessage() {
        errorMessage.style.display = 'flex';
        successMessage.style.display = 'none';
        
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Scroll reveal
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate progress bars when in view
    function animateProgressBars() {
        const skills = document.querySelector('.skills-container');
        
        if (!skills) return;
        
        const progressBars = document.querySelectorAll('.progress');
        const skillOffset = skills.offsetTop;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > skillOffset - window.innerHeight + 200) {
                progressBars.forEach(progress => {
                    const value = progress.getAttribute('style').match(/width: (\d+)%/)[1];
                    progress.style.width = value + '%';
                });
            }
        });
    }

    // Initialize animations
    function startAnimations() {
        // Start the typing effect
        setTimeout(() => {
            typeEffect();
        }, 1000);
        
        // Trigger reveal animations for elements in view
        revealOnScroll();
        
        // Initialize progress bar animations
        animateProgressBars();
    }
});