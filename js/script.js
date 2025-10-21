// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efectos de circuitos interactivos
    const circuitBackground = document.querySelector('.circuit-background');
    
    // Crear chispas aleatorias
    function createRandomSpark() {
        const spark = document.createElement('div');
        spark.className = 'spark';
        spark.style.left = Math.random() * 100 + '%';
        spark.style.top = Math.random() * 100 + '%';
        spark.style.animationDelay = Math.random() * 2 + 's';
        spark.style.animationDuration = (Math.random() * 1 + 0.5) + 's';
        
        circuitBackground.appendChild(spark);
        
        // Remover después de la animación
        setTimeout(() => {
            spark.remove();
        }, 2000);
    }
    
    // Crear chispas periódicamente
    setInterval(createRandomSpark, 500);
    
    // Efecto de interacción con el mouse
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const nodes = document.querySelectorAll('.circuit-node');
        nodes.forEach((node, index) => {
            const rect = node.getBoundingClientRect();
            const nodeX = rect.left + rect.width / 2;
            const nodeY = rect.top + rect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(e.clientX - nodeX, 2) + 
                Math.pow(e.clientY - nodeY, 2)
            );
            
            if (distance < 150) {
                node.style.transform = `scale(${2 - distance / 150})`;
                node.style.filter = `brightness(${1.5 - distance / 300})`;
            }
        });
    });
    
    // Circuit animation enhancement
    const circuitLines = document.querySelectorAll('.circuit-path, .electric-line, .circuit-connection');
    const circuitNodes = document.querySelectorAll('.circuit-node');
    
    // Add random animation delays for more natural effect
    circuitLines.forEach((line, index) => {
        line.style.animationDelay = `${index * 0.5}s`;
    });
    
    circuitNodes.forEach((node, index) => {
        node.style.animationDelay = `${index * 0.7}s`;
    });
    
    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.service-card, .project-card, .contact-item');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
    
    // Add animation classes
    document.querySelector('.hero-content').classList.add('animate-in');
});
