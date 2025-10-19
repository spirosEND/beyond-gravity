/*  ---------------------------------------------------
    Beyond Gravity - Main JavaScript Functionality
    Description: Core functionality for Beyond Gravity fitness studio website
    Features: Preloader, background images, mobile menu, gallery modal, back-to-top
    Author: binarySOUL
    Version: 1.0
    Created: 2025
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloader").delay(200).fadeOut("slow");
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        try {
            const bg = $(this).data('set-bg');
            if (bg && bg.trim() !== '') {
                $(this).css('background-image', 'url(' + bg + ')');
            } else {
                console.warn('Background image data not found for element:', this);
            }
        } catch (error) {
            console.error('Error setting background image:', error);
        }
    });

    //Canvas Menu - Now handled by navigation.js

    /*------------------
		Navigation
	--------------------*/
    try {
        if ($(".mobile-menu").length > 0) {
            $(".mobile-menu").slicknav({
                prependTo: '#mobile-menu-wrap',
                allowParentLinks: true
            });
        }
    } catch (error) {
        console.error('Error initializing mobile menu:', error);
    }

    /*------------------
        Hero Static
    --------------------*/
    // Hero is now static with single image

    /*--------------------------
    Testimonial Slider
    ----------------------------*/
    try {
        const testimonialSlider = $(".testimonial__slider");
        if (testimonialSlider.length > 0) {
            testimonialSlider.owlCarousel({
                loop: true,
                margin: 0,
                items: 1,
                dots: true,
                smartSpeed: 1200,
                autoHeight: false,
                autoplay: false
            });
        }
    } catch (error) {
        console.error('Error initializing testimonial slider:', error);
    }


    /*--------------------------
        Select
    ----------------------------*/
    try {
        // Initialize all select elements (including .class-select)
        $("select").niceSelect();
    } catch (error) {
        console.error('Error initializing select dropdowns:', error);
    }

    /*------------------
        Accordion Active
    --------------------*/
    $('.collapse').on('shown.bs.collapse hidden.bs.collapse', function (e) {
        if (e.type === 'shown.bs.collapse') {
            $(this).prev().addClass('active');
        } else {
            $(this).prev().removeClass('active');
        }
    });

    /*------------------
		Pricing
    --------------------*/
    $(".pricing__item").mouseover(function () {
        $(".pricing__item").removeClass('active');
        $(this).addClass('active');
    });

    /*------------------
		Bar Filler
	--------------------*/
    // Initialize all bar elements with the same configuration
    $('#bar1, #bar2, #bar3, #bar4').barfiller({
        barColor: "#5768AD",
    });

    /*------------------
		Gallery Modal
	--------------------*/
    try {
        // Get the modal
        const modal = document.getElementById('galleryModal');
        const modalImg = document.getElementById('modalImg');

        if (!modal || !modalImg) {
            console.warn('Gallery modal elements not found');
            return;
        }

        // Get all gallery items
        const galleryItems = document.querySelectorAll('.gallery__item');

        // Add click event to each gallery item
        galleryItems.forEach(function(item) {
            item.addEventListener('click', function() {
                try {
                    const imgSrc = this.getAttribute('data-src');
                    if (imgSrc && imgSrc.trim() !== '') {
                        modal.style.display = 'block';
                        modalImg.src = imgSrc;
                        document.body.style.overflow = 'hidden'; // Prevent background scrolling
                    } else {
                        console.warn('No image source found for gallery item');
                    }
                } catch (error) {
                    console.error('Error opening gallery modal:', error);
                }
            });
        });

        // Get the close button
        const closeBtn = document.querySelector('.gallery-modal__close');

        if (closeBtn) {
            // Close modal when clicking the close button
            closeBtn.addEventListener('click', function() {
                try {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto'; // Restore background scrolling
                } catch (error) {
                    console.error('Error closing gallery modal:', error);
                }
            });
        }

        // Close modal when clicking outside the image
        modal.addEventListener('click', function(e) {
            try {
                if (e.target === modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto'; // Restore background scrolling
                }
            } catch (error) {
                console.error('Error closing gallery modal via overlay:', error);
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            try {
                if (e.key === 'Escape' && modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto'; // Restore background scrolling
                }
            } catch (error) {
                console.error('Error closing gallery modal via keyboard:', error);
            }
        });
    } catch (error) {
        console.error('Error initializing gallery modal:', error);
    }

    /*------------------
        Back to Top Button
    --------------------*/
    try {
        // Get the button
        const backToTopButton = document.getElementById("backToTop");

        if (!backToTopButton) {
            console.warn('Back to top button not found');
            return;
        }

        // Throttle function for better performance
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

        // Show the button when the user scrolls down 300px from the top
        window.onscroll = throttle(function() {
            try {
                if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                    backToTopButton.style.display = "block";
                } else {
                    backToTopButton.style.display = "none";
                }
            } catch (error) {
                console.error('Error handling scroll event:', error);
            }
        }, 100); // Throttle to 100ms

        // Scroll to the top when the button is clicked
        backToTopButton.onclick = function() {
            try {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } catch (error) {
                console.error('Error scrolling to top:', error);
            }
        };
    } catch (error) {
        console.error('Error initializing back to top button:', error);
    }

})(jQuery);