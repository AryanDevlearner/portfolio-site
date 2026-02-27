document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Active State
    const currentPath = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath || (currentPath === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });

    // 2. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if you don't want it to fade out again
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Observe all elements with .fade-in class
    document.querySelectorAll('.fade-in, .glass, .glass-card').forEach(el => {
        el.classList.add('fade-in'); // Ensure base class is present
        observer.observe(el);
    });

    // 3. Typing Effect (for Hero Section)
    const typeWriterElement = document.getElementById('typing-text');
    if (typeWriterElement) {
        const text = typeWriterElement.getAttribute('data-text');
        let index = 0;

        function type() {
            if (index < text.length) {
                typeWriterElement.textContent += text.charAt(index);
                index++;
                setTimeout(type, 100); // Typing speed
            } else {
                // Optional: Remove cursor after typing
                typeWriterElement.classList.remove('typing-cursor');
            }
        }
        
        // Start typing after a short delay
        setTimeout(type, 500);
    }
});
