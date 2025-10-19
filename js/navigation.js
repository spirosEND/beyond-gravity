/*  ---------------------------------------------------
    Beyond Gravity - Navigation & Smooth Scrolling
    Description: Clean navigation functionality for Beyond Gravity fitness studio
    Features: Smooth scrolling, mobile menu handling, canvas menu toggle
    Author: binarySOUL
    Version: 1.0
    Created: 2025
---------------------------------------------------------  */

'use strict';

document.addEventListener('DOMContentLoaded', function() {
    try {
        // ===========================================
        // ALL NAVIGATION LINKS (including appointment button)
        // ===========================================
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                try {
                    event.preventDefault();
                    
                    const hash = this.getAttribute('href');
                    const target = document.querySelector(hash);
                    
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        // Update URL hash
                        history.pushState(null, null, hash);
                    } else {
                        console.warn('Target not found for:', hash);
                    }
                } catch (error) {
                    console.error('Error handling navigation click:', error);
                }
            });
        });
    } catch (error) {
        console.error('Error initializing navigation links:', error);
    }
    
    // ===========================================
    // MOBILE MENU FUNCTIONALITY
    // ===========================================
    try {
        const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
        const offcanvasMenu = document.querySelector('.offcanvas-menu');
        const offcanvasOverlay = document.querySelector('.offcanvas-menu-overlay');
        const body = document.body;
        
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                try {
                    if (offcanvasMenu) {
                        offcanvasMenu.classList.remove('show-offcanvas-menu');
                    }
                    if (offcanvasOverlay) {
                        offcanvasOverlay.classList.remove('active');
                    }
                    if (body) {
                        body.classList.remove('over-hid');
                    }
                } catch (error) {
                    console.error('Error closing mobile menu:', error);
                }
            });
        });
    } catch (error) {
        console.error('Error initializing mobile menu:', error);
    }
    
    // ===========================================
    // CANVAS MENU TOGGLE
    // ===========================================
    try {
        const canvasOpen = document.querySelector('.canvas__open');
        const offcanvasMenu = document.querySelector('.offcanvas-menu');
        const offcanvasOverlay = document.querySelector('.offcanvas-menu-overlay');
        const body = document.body;
        
        if (canvasOpen) {
            canvasOpen.addEventListener('click', function() {
                try {
                    if (offcanvasMenu) {
                        offcanvasMenu.classList.add('show-offcanvas-menu');
                    }
                    if (offcanvasOverlay) {
                        offcanvasOverlay.classList.add('active');
                    }
                    if (body) {
                        body.classList.add('over-hid');
                    }
                } catch (error) {
                    console.error('Error opening canvas menu:', error);
                }
            });
        }
        
        // Close canvas menu when clicking overlay
        if (offcanvasOverlay) {
            offcanvasOverlay.addEventListener('click', function() {
                try {
                    if (offcanvasMenu) {
                        offcanvasMenu.classList.remove('show-offcanvas-menu');
                    }
                    if (offcanvasOverlay) {
                        offcanvasOverlay.classList.remove('active');
                    }
                    if (body) {
                        body.classList.remove('over-hid');
                    }
                } catch (error) {
                    console.error('Error closing canvas menu via overlay:', error);
                }
            });
        }
    } catch (error) {
        console.error('Error initializing canvas menu:', error);
    }
});
