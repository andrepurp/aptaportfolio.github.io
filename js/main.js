// main.js - Interactivity for SOC Analyst Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Typing effect for elements with class 'typing-effect'
    const typingElements = document.querySelectorAll('.typing-effect');
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Add active class to navigation items based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
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
    
    // Terminal effect for code blocks
    const codeBlocks = document.querySelectorAll('.code-block');
    codeBlocks.forEach(block => {
        const text = block.textContent;
        block.innerHTML = '';
        let i = 0;
        
        // Only animate code blocks when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeCode();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(block);
        
        function typeCode() {
            if (i < text.length) {
                if (text.charAt(i) === '\n') {
                    block.innerHTML += '<br>';
                } else {
                    block.innerHTML += text.charAt(i);
                }
                i++;
                setTimeout(typeCode, 10);
            } else {
                block.innerHTML += '<span class="cursor"></span>';
            }
        }
    });
    
    // Add cyber-themed particles background
    const createParticles = () => {
        const body = document.querySelector('body');
        const particlesContainer = document.createElement('div');
        particlesContainer.classList.add('particles-container');
        
        particlesContainer.style.position = 'fixed';
        particlesContainer.style.top = '0';
        particlesContainer.style.left = '0';
        particlesContainer.style.width = '100%';
        particlesContainer.style.height = '100%';
        particlesContainer.style.pointerEvents = 'none';
        particlesContainer.style.zIndex = '-1';
        
        body.prepend(particlesContainer);
        
        for (let i = 0; i < 50; i++) {
            createParticle(particlesContainer);
        }
    };
    
    const createParticle = (container) => {
        const particle = document.createElement('div');
        
        // Random properties
        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        // Apply styles
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.background = 'rgba(51, 255, 51, 0.3)';
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = '0 0 10px rgba(51, 255, 51, 0.5)';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        // Animation
        particle.style.animation = `floatParticle ${duration}s linear infinite`;
        particle.style.animationDelay = `${delay}s`;
        
        container.appendChild(particle);
    };
    
    // Create keyframe animation
    const createParticleAnimation = () => {
        const styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.innerHTML = `
            @keyframes floatParticle {
                0% {
                    transform: translateY(0) translateX(0);
                    opacity: 0.1;
                }
                25% {
                    opacity: 0.3;
                }
                50% {
                    transform: translateY(-20px) translateX(10px);
                    opacity: 0.5;
                }
                75% {
                    opacity: 0.3;
                }
                100% {
                    transform: translateY(0) translateX(0);
                    opacity: 0.1;
                }
            }
        `;
        document.head.appendChild(styleSheet);
    };
    
    // Initialize particle effect
    createParticleAnimation();
    createParticles();
    
    // Add skill progress animation
    const animateSkills = () => {
        const skillItems = document.querySelectorAll('.skill-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('skill-animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {threshold: 0.5});
        
        skillItems.forEach(item => {
            observer.observe(item);
        });
    };
    
    animateSkills();
    
    // Add project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        });
    });
    
    // Add dark mode toggle
    const createDarkModeToggle = () => {
        const header = document.querySelector('header .container');
        const darkModeToggle = document.createElement('button');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        darkModeToggle.classList.add('dark-mode-toggle');
        darkModeToggle.style.background = 'transparent';
        darkModeToggle.style.border = 'none';
        darkModeToggle.style.color = 'var(--light-gray)';
        darkModeToggle.style.fontSize = '1.2rem';
        darkModeToggle.style.cursor = 'pointer';
        darkModeToggle.style.marginLeft = '20px';
        
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-mode');
            
            if (document.body.classList.contains('light-mode')) {
                this.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                this.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
        
        // Append to nav
        const nav = document.querySelector('nav ul');
        const li = document.createElement('li');
        li.appendChild(darkModeToggle);
        nav.appendChild(li);
    };
    
    createDarkModeToggle();
});