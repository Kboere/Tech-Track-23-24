const fadeInObject = document.querySelector('.fade-in');
const fadeInRightObject = document.querySelector('.fade-in-right');

// Check if the Intersection Observer API is supported
if ('IntersectionObserver' in window) {
    const options = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // The element is now in the viewport
                fadeInObject.style.opacity = 1; // Make it visible
                fadeInRightObject.style.opacity = 1; // Make it visible
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, options);

    // Start observing the element
    // observer.observe(fadeInObject);
} else {
    // Fallback for browsers that don't support Intersection Observer
    // You can use a different method to handle the visibility in this case.
    fadeInObject.style.opacity = 1; // Make it always visible
    fadeInRightObject.style.opacity = 1;
}
