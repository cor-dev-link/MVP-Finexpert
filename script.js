document.addEventListener('DOMContentLoaded', function() {
    // Menú hamburguesa
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    menuToggle?.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.classList.toggle('active');
        const isExpanded = nav.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Cerrar el menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Carrito de compras
    let cartCount = 0;
    const cartCountElement = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');

    // Función para actualizar el contador del carrito
    function updateCartCount() {
        cartCountElement.textContent = cartCount;
        cartCountElement.classList.add('bump');
        setTimeout(() => cartCountElement.classList.remove('bump'), 300);
    }

    // Manejador para agregar al carrito
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            cartCount++;
            updateCartCount();
            
            // Feedback visual
            const originalText = button.textContent;
            button.textContent = '✓ Agregado';
            button.style.backgroundColor = 'var(--color-success)';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '';
            }, 2000);
        });
    });

    // Manejador para lista de deseos
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            button.classList.toggle('active');
            if (button.classList.contains('active')) {
                button.style.backgroundColor = 'var(--color-primary)';
                button.style.color = 'var(--color-background)';
            } else {
                button.style.backgroundColor = '';
                button.style.color = '';
            }
        });
    });

    // Animación para el widget del carrito
    const cartWidget = document.querySelector('.cart-widget');
    cartWidget?.addEventListener('click', function() {
        this.classList.add('shake');
        setTimeout(() => this.classList.remove('shake'), 500);
    });

    // Animaciones para las tarjetas de producto
    const productCards = document.querySelectorAll('.product-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const productObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                productObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    productCards.forEach(card => {
        productObserver.observe(card);
    });

    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Formulario de contacto
    const contactForm = document.getElementById('contact-form');
    contactForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulación de envío
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';

        setTimeout(() => {
            submitButton.textContent = '¡Mensaje Enviado!';
            submitButton.style.backgroundColor = 'var(--color-success)';
            
            setTimeout(() => {
                this.reset();
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                submitButton.style.backgroundColor = '';
            }, 2000);
        }, 1500);
    });
});

