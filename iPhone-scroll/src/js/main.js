// Efecto Parallax en la imagen principal durante el scroll
const stickyImage = document.getElementById("sticky-image");

document.addEventListener('DOMContentLoaded', () => {

    // 1. Lógica para el efecto "Reveal" (Aparición)
    // Utiliza IntersectionObserver para añadir la clase 'active' cuando el elemento entra en pantalla.
    const revealElements = document.querySelectorAll('.reveal-up');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Opcional: descomentar para que la animación se repita al subir
                // } else {
                // entry.target.classList.remove('active');
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Se dispara un poco antes para que la animación tenga tiempo de lucirse
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));


    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const scaleValue = 1 + (scrollY * 0.00015);

        if (stickyImage) {
            stickyImage.style.transform = `scale(${scaleValue})`;
        }
    });
});

