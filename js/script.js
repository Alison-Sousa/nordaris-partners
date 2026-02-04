document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                
                const navLink = document.querySelector(`.nav-links a[href="${targetId}"]`);
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    });

    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileFullscreenMenu = document.querySelector('.mobile-fullscreen-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileCategories = document.querySelectorAll('.mobile-category');
    const mobileMenuItemsContainers = document.querySelectorAll('.mobile-menu-items');
    const mobileMenuContent = document.querySelector('.mobile-menu-content');
    
    if (mobileMenuBtn && mobileFullscreenMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileFullscreenMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (mobileMenuClose && mobileFullscreenMenu) {
        mobileMenuClose.addEventListener('click', function() {
            mobileFullscreenMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    mobileCategories.forEach(category => {
        category.addEventListener('click', function() {
            const categoryName = this.dataset.category;
            
            mobileCategories.forEach(cat => cat.classList.remove('active'));
            this.classList.add('active');
            
            mobileMenuItemsContainers.forEach(container => {
                container.classList.remove('active');
                if (container.dataset.category === categoryName) {
                    container.classList.add('active');
                }
            });
        });
    });
    
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    
    if (mobileMenuContent) {
        mobileMenuContent.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });
        
        mobileMenuContent.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        }, { passive: true });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
            const categoriesArray = Array.from(mobileCategories);
            const activeIndex = categoriesArray.findIndex(cat => cat.classList.contains('active'));
            
            if (diffX > 0) {
                const nextIndex = Math.min(activeIndex + 1, categoriesArray.length - 1);
                if (nextIndex !== activeIndex) {
                    categoriesArray[nextIndex].click();
                }
            } else {
                const prevIndex = Math.max(activeIndex - 1, 0);
                if (prevIndex !== activeIndex) {
                    categoriesArray[prevIndex].click();
                }
            }
        }
    }
    
    document.querySelectorAll('.mobile-menu-item, .mobile-btn-contact, .mobile-btn-login').forEach(link => {
        link.addEventListener('click', function() {
            if (mobileFullscreenMenu && mobileFullscreenMenu.classList.contains('active')) {
                mobileFullscreenMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    const mobileMenuLogo = document.querySelector('.mobile-menu-logo');
    if (mobileMenuLogo && mobileFullscreenMenu) {
        mobileMenuLogo.addEventListener('click', function() {
            mobileFullscreenMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    document.addEventListener('contextmenu', function(e) {
        if (e.target && e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });

    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('dragstart', function(e) {
            e.preventDefault();
        });
    });
});