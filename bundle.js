document.addEventListener('DOMContentLoaded', function() {
    // Initialize flexible layouts
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
        // Add responsive behavior
        container.style.opacity = '0';
        container.style.transition = 'opacity 0.3s ease-in';
        setTimeout(() => {
            container.style.opacity = '1';
        }, 100);
    });

    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Create universe background
    const createUniverseBackground = () => {
        const container = document.querySelector('.container');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.classList.add('universe-bg');
        document.body.insertBefore(canvas, container);
        
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        
        const stars = [];
        const starCount = 200;
        
        for(let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2,
                speed: Math.random() * 0.5
            });
        }

        function animateStars() {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#000033';
            ctx.fillRect(0, 0, width, height);
            
            stars.forEach(star => {
                ctx.beginPath();
                ctx.fillStyle = '#FFF';
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
                
                star.y += star.speed;
                if(star.y > height) star.y = 0;
            });
            
            requestAnimationFrame(animateStars);
        }
        
        animateStars();
    };

    // Create 3D Globe
    const createGlobe = () => {
        const globe = document.createElement('div');
        globe.className = 'globe';
        document.querySelector('.container').prepend(globe);

        for(let i = 0; i < 8; i++) {
            const circle = document.createElement('div');
            circle.className = 'circle';
            globe.appendChild(circle);
        }
    };

    createUniverseBackground();
    createGlobe();
});