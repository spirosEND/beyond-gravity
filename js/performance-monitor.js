/* ===========================================
   Beyond Gravity - Safe Performance Monitor
   =========================================== */

(function() {
    'use strict';
    
    // Only add performance monitoring - NO navigation changes
    if ('performance' in window) {
        // Log page load time
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart);
                    console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart);
                }
            }, 0);
        });
    }
    
    // Image loading optimization - only for gallery images
    function optimizeImageLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    }
    
    // Initialize image optimization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', optimizeImageLoading);
    } else {
        optimizeImageLoading();
    }
    
})();
