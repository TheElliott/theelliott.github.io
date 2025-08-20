// Wait for the HTML document to be fully loaded and parsed
document.addEventListener('DOMContentLoaded', () => {

    // --- Part 1: Responsive Navigation Menu ---
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksList = document.getElementById('navLinksList');
    const navIcon = navToggle ? navToggle.querySelector('i') : null;

    if (navToggle && navLinksList && navIcon) {
        navToggle.addEventListener('click', () => {
            // Toggle the visibility of the navigation links
            navLinksList.classList.toggle('nav-open');

            // Update ARIA attribute for accessibility
            const isExpanded = navLinksList.classList.contains('nav-open');
            navToggle.setAttribute('aria-expanded', isExpanded);

            // Change hamburger icon to a close icon (X) and back
            if (isExpanded) {
                navIcon.classList.remove('fa-bars');
                navIcon.classList.add('fa-xmark'); // Font Awesome 'X' mark icon
            } else {
                navIcon.classList.remove('fa-xmark');
                navIcon.classList.add('fa-bars');
            }
        });
    }


    // --- Part 2: Lightbox Gallery ---
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    let currentIndex = 0;

    // Function to open the lightbox
    function openLightbox(index) {
        if (!lightbox || !lightboxImg) return;
        currentIndex = index;
        lightboxImg.src = galleryImages[currentIndex].src;
        lightbox.classList.add('active');
        // Add event listeners for keyboard navigation when lightbox is open
        document.addEventListener('keydown', handleKeydown);
    }

    // Function to close the lightbox
    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        // Remove event listeners when lightbox is closed to prevent conflicts
        document.removeEventListener('keydown', handleKeydown);
    }

    // Function to show the next image
    function showNextImage() {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        lightboxImg.src = galleryImages[currentIndex].src;
    }

    // Function to show the previous image
    function showPrevImage() {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImg.src = galleryImages[currentIndex].src;
    }
    
    // Function to handle keyboard inputs
    function handleKeydown(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        }
    }

    // Check if gallery elements exist on the page before adding listeners
    if (galleryImages.length > 0 && lightbox) {
        // Add click event to each gallery image
        galleryImages.forEach((img, index) => {
            img.addEventListener('click', () => {
                openLightbox(index);
            });
        });

        // Add click events for lightbox controls
        lightboxClose.addEventListener('click', closeLightbox);
        lightboxNext.addEventListener('click', showNextImage);
        lightboxPrev.addEventListener('click', showPrevImage);

        // Close lightbox if the dark overlay area is clicked
        lightbox.addEventListener('click', (e) => {
            // We check if the click was on the lightbox itself, and not its children (the image or arrows)
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
});
