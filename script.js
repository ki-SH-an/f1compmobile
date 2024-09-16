document.addEventListener('DOMContentLoaded', function() {
    const showTransferBtn = document.getElementById('showTransferBtn');
    const animationBall = document.getElementById('animationBall');
    const bg = animationBall.parentElement;
    const texts = document.querySelectorAll('.text h1');

    showTransferBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Reset animations
        animationBall.style.animation = 'none';
        bg.style.animation = 'none';
        texts.forEach(text => {
            text.style.animation = 'none';
        });
        
        // Trigger reflow
        void animationBall.offsetWidth;
        void bg.offsetWidth;
        texts.forEach(text => {
            void text.offsetWidth;
        });
        
        // Start animations
        animationBall.style.animation = 'ballx 7s linear, bally 1s ease-out 0s 6 alternate';
        bg.style.animation = 'bgcolor 7s linear';
        
        // Animate text colors
        texts.forEach((text, index) => {
            text.style.animation = `txtcolor${index + 1} 1.75s linear ${index * 1.75}s`;
        });
    });

    // Custom smooth scroll function
    function smoothScroll(target, duration) {
        const targetPosition = target.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Add smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            smoothScroll(target, 1000); // 1000ms duration for the scroll animation
        });
    });
});