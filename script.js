document.addEventListener('DOMContentLoaded', function() {
    // ===================== MOBILE MENU TOGGLE =====================
    const nav = document.querySelector('nav');
    const menu = document.querySelector('.menu');
    if (nav && menu) {
        const menuToggle = nav.querySelector('.menu-toggle') || document.createElement('button');
        menuToggle.type = 'button';
        menuToggle.className = 'menu-toggle';
        menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        if (!menuToggle.parentElement) nav.appendChild(menuToggle);

        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const currentHash = window.location.hash || '#home';
        document.querySelectorAll('.menu a').forEach(link => {
            const href = link.getAttribute('href') || '';
            const linkPage = href.split('#')[0] || 'index.html';
            const linkHash = href.includes('#') ? `#${href.split('#')[1]}` : '';
            if (
                (linkPage === currentPage && (!linkHash || linkHash === currentHash)) ||
                (currentPage === 'index.html' && href.startsWith('#') && href === currentHash)
            ) {
                link.classList.add('active');
            }
        });

        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
            this.setAttribute('aria-label', menu.classList.contains('active') ? 'Fermer le menu' : 'Ouvrir le menu');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.menu a').forEach(link => {
            link.addEventListener('click', function() {
                menu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
                menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
            });
        });
    }
    
    // ===================== SEARCH FORM VALIDATION =====================
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        // Set minimum dates for search form
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('pickupDate').min = today;
        document.getElementById('returnDate').min = today;
        
        // Update return date min when pickup date changes
        document.getElementById('pickupDate').addEventListener('change', function() {
            document.getElementById('returnDate').min = this.value;
        });
        
        // Search form submission
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const pickupLocation = this.querySelector('input[type="text"]').value;
            const pickupDate = document.getElementById('pickupDate').value;
            const returnDate = document.getElementById('returnDate').value;
            
            if (!pickupLocation || !pickupDate || !returnDate) {
                alert('Please fill in all fields');
                return;
            }
            
            if (new Date(returnDate) <= new Date(pickupDate)) {
                alert('Return date must be after pickup date');
                return;
            }
            
            alert(`Searching for vehicles in ${pickupLocation} from ${pickupDate} to ${returnDate}`);
        });
    }
    
    //  SMOOTH SCROLLING
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Skip if it's the services link (handled separately)
            if (this.getAttribute('href') === '#services') return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    window.location.hash = targetId;
                }
            }
        });
    });
    
    // Handle anchor links from other pages
    if (window.location.hash) {
        const targetId = window.location.hash;
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            setTimeout(() => {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
    
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            alert(`Thank you for subscribing with ${email}!`);
            this.reset();
        });
    });
});

