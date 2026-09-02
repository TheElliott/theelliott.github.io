document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksList = document.getElementById('navLinksList');
    const navIcon = navToggle ? navToggle.querySelector('i') : null;

    if (navToggle && navLinksList && navIcon) {
        navToggle.addEventListener('click', () => {
            navLinksList.classList.toggle('nav-open');
            const isExpanded = navLinksList.classList.contains('nav-open');
            navToggle.setAttribute('aria-expanded', isExpanded);

            if (isExpanded) {
                navIcon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                navIcon.classList.replace('fa-xmark', 'fa-bars');
            }
        });
    }

    const galleryImages = document.querySelectorAll('.gallery-grid img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    let currentIndex = 0;

    function openLightbox(index) {
        if (!lightbox || !lightboxImg) return;
        currentIndex = index;
        lightboxImg.src = galleryImages[currentIndex].src;
        lightbox.classList.add('active');
        document.addEventListener('keydown', handleKeydown);
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        document.removeEventListener('keydown', handleKeydown);
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        lightboxImg.src = galleryImages[currentIndex].src;
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImg.src = galleryImages[currentIndex].src;
    }
    
    function handleKeydown(e) {
        if (e.key === 'Escape') closeLightbox();
        else if (e.key === 'ArrowRight') showNextImage();
        else if (e.key === 'ArrowLeft') showPrevImage();
    }

    if (galleryImages.length > 0 && lightbox) {
        galleryImages.forEach((img, index) => {
            img.addEventListener('click', () => openLightbox(index));
        });

        lightboxClose.addEventListener('click', closeLightbox);
        lightboxNext.addEventListener('click', showNextImage);
        lightboxPrev.addEventListener('click', showPrevImage);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }
});