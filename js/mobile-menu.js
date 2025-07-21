// Mobile Menu Functionality for Xeremonia
document.addEventListener('DOMContentLoaded', function() {
    // Header hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Footer hamburger menu
    const footerHamburger = document.querySelector('.footer-hamburger');
    const footerMenu = document.querySelector('.footer-menu');
    
    // Header menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
    
    // Footer menu toggle
    if (footerHamburger && footerMenu) {
        footerHamburger.addEventListener('click', function() {
            footerHamburger.classList.toggle('active');
            footerMenu.classList.toggle('active');
        });
        
        // Close footer menu when clicking on a link
        const footerLinks = document.querySelectorAll('.footer-menu a');
        footerLinks.forEach(link => {
            link.addEventListener('click', function() {
                footerHamburger.classList.remove('active');
                footerMenu.classList.remove('active');
            });
        });
        
        // Close footer menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!footerHamburger.contains(event.target) && !footerMenu.contains(event.target)) {
                footerHamburger.classList.remove('active');
                footerMenu.classList.remove('active');
            }
        });
    }
    
    // Close menus on window resize (if screen becomes larger)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
            if (footerHamburger) footerHamburger.classList.remove('active');
            if (footerMenu) footerMenu.classList.remove('active');
        }
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just a hash
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menus
                if (hamburger) hamburger.classList.remove('active');
                if (navMenu) navMenu.classList.remove('active');
                if (footerHamburger) footerHamburger.classList.remove('active');
                if (footerMenu) footerMenu.classList.remove('active');
                
                // Smooth scroll to target
                // const headerHeight = document.querySelector('header').offsetHeight;
                // const targetPosition = targetElement.offsetTop - headerHeight;
                const targetPosition = targetElement.offsetTop;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}); 