/*  ---------------------------------------------------
    Template Name: Zogin
    Description:  Phozogy Yoga HTML Template
    Author: Colorlib
    Author URI: https://colorlib.com
    Version: 1.0
    Created: Colorlib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Canvas Menu
    $(".canvas__open").on('click', function () {
        $(".offcanvas-menu").addClass("show-offcanvas-menu");
        $(".offcanvas-menu-overlay").addClass("active");
        $("body").addClass("over-hid");
    });

    $(".offcanvas-menu-overlay").on('click', function () {
        $(".offcanvas-menu").removeClass("show-offcanvas-menu");
        $(".offcanvas-menu-overlay").removeClass("active");
        $("body").removeClass("over-hid");
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
        Hero Static
    --------------------*/
    // Hero is now static with single image

    /*--------------------------
    Testimonial Slider
    ----------------------------*/
    var testimonialSlider = $(".testimonial__slider");
    testimonialSlider.owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: true,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: false
    });


    /*--------------------------
        Select
    ----------------------------*/
    $(".class-select").niceSelect();
    $("select").niceSelect();

    /*------------------
        Accordin Active
    --------------------*/
    $('.collapse').on('shown.bs.collapse', function () {
        $(this).prev().addClass('active');
    });

    $('.collapse').on('hidden.bs.collapse', function () {
        $(this).prev().removeClass('active');
    });

    /*------------------
		Pricing
    --------------------*/
    $(".pricing__item").mouseover(function () {
        $(".pricing__item").removeClass('active');
        $(this).addClass('active');
    });

    /*------------------
		Barfiller
	--------------------*/
    $('#bar1').barfiller({
        barColor: "#5768AD",
    });

    $('#bar2').barfiller({
        barColor: "#5768AD",
    });

    $('#bar3').barfiller({
        barColor: "#5768AD",
    });

    $('#bar4').barfiller({
        barColor: "#5768AD",
    });

    /*------------------
		Gallery Modal
	--------------------*/
    // Get the modal
    var modal = document.getElementById('galleryModal');
    var modalImg = document.getElementById('modalImg');

    // Get all gallery items
    var galleryItems = document.querySelectorAll('.gallery__item');

    // Add click event to each gallery item
    galleryItems.forEach(function(item) {
        item.addEventListener('click', function() {
            var imgSrc = this.getAttribute('data-src');
            modal.style.display = 'block';
            modalImg.src = imgSrc;
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Get the close button
    var closeBtn = document.querySelector('.gallery-modal__close');

    // Close modal when clicking the close button
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore background scrolling
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore background scrolling
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore background scrolling
        }
    });

    /*------------------
        Back to Top Button
    --------------------*/
    // Get the button
    var backToTopButton = document.getElementById("backToTop");

    // Show the button when the user scrolls down 300px from the top
    window.onscroll = function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    };

    // Scroll to the top when the button is clicked
    backToTopButton.onclick = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

})(jQuery);