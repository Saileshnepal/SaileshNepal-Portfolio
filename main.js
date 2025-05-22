// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Loading screen
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Hide loading screen after all content is loaded
    window.addEventListener('load', function() {
        setTimeout(function() {
            loadingScreen.style.opacity = '0';
            setTimeout(function() {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1500); // Show loading screen for at least 1.5 seconds
    });
    
    // Navigation
    const nav = document.querySelector('nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Toggle menu icon
        if (menuToggle.classList.contains('active')) {
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Close mobile menu when clicking on a link
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Change navigation background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    
    function setActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    
    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    if (card.getAttribute('data-category').includes(filterValue)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
    
    // Theme Switcher
    const themeSwitch = document.getElementById('theme-switch');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or use device preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set initial theme
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else if (prefersDarkScheme.matches) {
        htmlElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    } else {
        htmlElement.setAttribute('data-theme', 'light');
        updateThemeIcon('light');
    }
    
    // Toggle theme when switch is clicked
    themeSwitch.addEventListener('click', function() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Update 3D background colors based on theme
        if (window.updateThreeJsTheme) {
            window.updateThreeJsTheme(newTheme);
        }
    });
    
    // Update the icon in the theme switch
    function updateThemeIcon(theme) {
        const themeIcon = document.querySelector('.theme-switch-icon');
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-moon theme-switch-icon';
        } else {
            themeIcon.className = 'fas fa-sun theme-switch-icon';
        }
    }
    
    // Initialize EmailJS
    const emailjs = window.emailjs; // Declare the emailjs variable
    (function() {
        // Replace with your actual EmailJS public key
        emailjs.init("YKYvmWu3tYtjEEaAs");
    })();
    
    // Contact form submission with EmailJS
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading message
        formStatus.className = 'form-status loading';
        formStatus.textContent = 'Sending message...';
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Send email using EmailJS
        emailjs.send('service_720dmzk', 'template_7rcdvdj', {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_email: 'nepalsailesh00@gmail.com'
        })
        .then(function(response) {
            // Success message
            formStatus.className = 'form-status success';
            formStatus.textContent = 'Your message has been sent successfully! I will get back to you soon.';
            
            // Reset form
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(function() {
                formStatus.style.display = 'none';
            }, 5000);
        })
        .catch(function(error) {
            // Error message
            formStatus.className = 'form-status error';
            formStatus.textContent = 'Oops! Something went wrong. Please try again later or email me directly.';
            
            console.error('EmailJS error:', error);
        });
    });
    
    // Scroll reveal animation
    function revealOnScroll() {
        const elements = document.querySelectorAll('.about-content, .skills-categories, .project-card, .contact-content');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    
    // Initialize animations
    revealOnScroll();
    setActiveLink();
});

// Add CSS for scroll reveal animations
const style = document.createElement('style');
style.textContent = `
    .about-content, .skills-categories, .project-card, .contact-content {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .about-content.active, .skills-categories.active, .project-card.active, .contact-content.active {
        opacity: 1;
        transform: translateY(0);
    }
    
    .project-card {
        transition-delay: calc(0.1s * var(--i));
    }
`;
document.head.appendChild(style);

// Set transition delay for project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.setProperty('--i', index % 3);
});