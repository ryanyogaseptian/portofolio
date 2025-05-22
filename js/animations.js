// This file contains additional animations and effects for the portfolio website

document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    // Parallax effect on hero section
    const heroSection = document.querySelector('.hero-section');
    const shapes = document.querySelectorAll('.shape');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition < window.innerHeight) {
            // Parallax effect for hero background
            shapes.forEach((shape, index) => {
                const speed = 0.1 * (index + 1);
                shape.style.transform = `translateY(${scrollPosition * speed}px)`;
            });
        }
    });

    // Mouse movement effect on hero section
    heroSection.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        shapes.forEach((shape, index) => {
            // Different sensitivity for each shape
            const sensitivity = 0.01 * (index + 1);
            
            // Calculate movement based on mouse position
            const moveX = (x - window.innerWidth / 2) * sensitivity;
            const moveY = (y - window.innerHeight / 2) * sensitivity;
            
            // Apply the transform with transition for smoother effect
            shape.style.transition = 'transform 0.5s ease';
            shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    // Hero section leave effect
    heroSection.addEventListener('mouseleave', () => {
        shapes.forEach(shape => {
            shape.style.transition = 'transform 0.5s ease';
            shape.style.transform = 'translate(0, 0)';
        });
    });

    // Tilt effect on portfolio and gallery items
    const tiltElements = document.querySelectorAll('.portfolio-item, .gallery-item');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', tiltEffect);
        element.addEventListener('mouseleave', resetTilt);
    });

    function tiltEffect(e) {
        const element = this;
        const elementRect = element.getBoundingClientRect();
        const elementWidth = elementRect.width;
        const elementHeight = elementRect.height;
        
        // Calculate mouse position relative to the element
        const x = e.clientX - elementRect.left;
        const y = e.clientY - elementRect.top;
        
        // Calculate rotation angles (max 5 degrees)
        const tiltX = ((y / elementHeight) - 0.5) * 10;
        const tiltY = ((x / elementWidth) - 0.5) * -10;
        
        // Apply the transform with perspective
        element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
    }

    function resetTilt() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    }

    // Hover effect for buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            const x = e.clientX - button.getBoundingClientRect().left;
            const y = e.clientY - button.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('btn-ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for the ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .btn-ripple {
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Counter animation for stats
    const stats = document.querySelectorAll('.stat-item h3');
    let statsAnimated = false;
    
    function animateStats() {
        if (statsAnimated) return;
        
        stats.forEach(stat => {
            const targetValue = parseInt(stat.textContent);
            let currentValue = 0;
            const duration = 2000; // 2 seconds
            const interval = 50; // Update every 50ms
            const increment = (targetValue / duration) * interval;
            
            const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= targetValue) {
                    stat.textContent = targetValue.toString();
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(currentValue).toString();
                }
            }, interval);
        });
        
        statsAnimated = true;
    }

    // Trigger stats animation when scrolled into view
    window.addEventListener('scroll', () => {
        const statsSection = document.querySelector('.about-stats');
        if (!statsSection) return;
        
        const statsSectionTop = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (statsSectionTop < windowHeight - 100) {
            animateStats();
        }
    });

    // Scroll indicator animation
    const scrollIndicator = document.createElement('div');
    scrollIndicator.classList.add('scroll-indicator');
    document.body.appendChild(scrollIndicator);

    // Add CSS for scroll indicator
    const scrollStyle = document.createElement('style');
    scrollStyle.textContent = `
        .scroll-indicator {
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background-color: var(--primary-color);
            z-index: 1001;
            width: 0%;
            transition: width 0.1s ease;
        }
    `;
    document.head.appendChild(scrollStyle);

    // Update scroll indicator width
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollIndicator.style.width = `${scrolled}%`;
    });

    // Animate skill tags on hover
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Random floating animation for shapes
    shapes.forEach((shape, index) => {
        const animationDuration = 10 + index * 5; // Different duration for each shape
        const animationStyle = document.createElement('style');
        
        animationStyle.textContent = `
            @keyframes float${index} {
                0% {
                    transform: translate(0, 0);
                }
                25% {
                    transform: translate(${5 + index * 2}px, ${10 + index * 2}px);
                }
                50% {
                    transform: translate(${10 + index * 2}px, ${-5 - index * 2}px);
                }
                75% {
                    transform: translate(${-5 - index * 2}px, ${-10 - index * 2}px);
                }
                100% {
                    transform: translate(0, 0);
                }
            }
        `;
        
        document.head.appendChild(animationStyle);
        
        shape.style.animation = `float${index} ${animationDuration}s infinite ease-in-out`;
    });

    // Page transition effects
    const pageTransition = document.createElement('div');
    pageTransition.classList.add('page-transition');
    document.body.appendChild(pageTransition);

    // Add CSS for page transition
    const transitionStyle = document.createElement('style');
    transitionStyle.textContent = `
        .page-transition {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--primary-color);
            z-index: 10000;
            transform: translateY(100%);
            transition: transform 0.5s ease;
        }
        
        .page-transition.active {
            transform: translateY(0);
        }
    `;
    document.head.appendChild(transitionStyle);
});