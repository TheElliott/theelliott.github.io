document.addEventListener('DOMContentLoaded', () => {
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
});