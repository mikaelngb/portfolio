/**
 * Navigation System
 * Handles smooth scrolling, mobile menu, and navigation interactions
 */

class Navigation {
  constructor() {
    this.nav = document.getElementById('nav');
    this.navToggle = document.getElementById('nav-toggle');
    this.navMenu = document.getElementById('nav-menu');
    this.mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    this.mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.isMenuOpen = false;
    this.lastScrollPosition = 0;
    this.ticking = false;

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupIntersectionObserver();
    this.setupScrollBehavior();
  }

  setupEventListeners() {
    // Enhanced keyboard navigation support
    this.setupKeyboardNavigation();

    // Mobile menu toggle
    if (this.navToggle) {
      this.navToggle.addEventListener('click', () => this.toggleMobileMenu());

      // Touch support for mobile menu
      this.navToggle.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.toggleMobileMenu();
      }, { passive: false });
    }

    // Mobile nav links with touch support
    this.mobileNavLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        this.scrollToSection(targetId);
        this.closeMobileMenu();
      });

      // Touch feedback
      link.addEventListener('touchstart', (e) => {
        link.style.transform = 'translateX(8px) scale(0.98)';
      }, { passive: true });

      link.addEventListener('touchend', (e) => {
        setTimeout(() => {
          link.style.transform = '';
        }, 150);
      }, { passive: true });
    });

    // Desktop nav links
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        this.scrollToSection(targetId);
      });
    });

    // Close mobile menu on overlay click
    if (this.mobileNavOverlay) {
      this.mobileNavOverlay.addEventListener('click', (e) => {
        if (e.target === this.mobileNavOverlay) {
          this.closeMobileMenu();
        }
      });

      // Touch gesture support for swipe to close
      let touchStartX = 0;
      let touchEndX = 0;

      this.mobileNavOverlay.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      this.mobileNavOverlay.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        this.handleSwipeGesture(touchStartX, touchEndX);
      }, { passive: true });
    }

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMobileMenu();
      }
    });

    // Resize handler - close mobile menu on desktop view
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && this.isMenuOpen) {
        this.closeMobileMenu();
      }
    });
  }

  handleSwipeGesture(touchStartX, touchEndX) {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    // Swipe left to close menu
    if (diff > swipeThreshold) {
      this.closeMobileMenu();
    }
  }

  setupKeyboardNavigation() {
    // Add keyboard navigation for all interactive elements
    this.setupTabNavigation();
    this.setupArrowKeyNavigation();
    this.setupEscapeKeyHandling();
    this.setupFocusManagement();
  }

  setupTabNavigation() {
    // Ensure all interactive elements are focusable
    const focusableElements = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    // Add focus-visible class support
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });

    // Handle focus trapping in mobile menu
    if (this.mobileNavOverlay) {
      const mobileFocusableElements = this.mobileNavOverlay.querySelectorAll(focusableElements);

      if (mobileFocusableElements.length > 0) {
        this.firstFocusableElement = mobileFocusableElements[0];
        this.lastFocusableElement = mobileFocusableElements[mobileFocusableElements.length - 1];
      }
    }
  }

  setupArrowKeyNavigation() {
    // Arrow key navigation for menu items
    const menuItems = document.querySelectorAll('.nav-link, .mobile-nav-link');

    menuItems.forEach((item, index) => {
      item.addEventListener('keydown', (e) => {
        let targetIndex = -1;

        switch (e.key) {
          case 'ArrowDown':
          case 'ArrowRight':
            e.preventDefault();
            targetIndex = (index + 1) % menuItems.length;
            break;
          case 'ArrowUp':
          case 'ArrowLeft':
            e.preventDefault();
            targetIndex = (index - 1 + menuItems.length) % menuItems.length;
            break;
          case 'Home':
            e.preventDefault();
            targetIndex = 0;
            break;
          case 'End':
            e.preventDefault();
            targetIndex = menuItems.length - 1;
            break;
        }

        if (targetIndex >= 0) {
          menuItems[targetIndex].focus();
        }
      });
    });
  }

  setupEscapeKeyHandling() {
    // Enhanced escape key handling
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.isMenuOpen) {
          this.closeMobileMenu();
          // Return focus to menu toggle
          if (this.navToggle) {
            this.navToggle.focus();
          }
        }
      }
    });
  }

  setupFocusManagement() {
    // Focus management for accessibility
    const focusableElements = document.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach(element => {
      element.addEventListener('focus', (e) => {
        // Announce focus change for screen readers
        const announcement = e.target.getAttribute('aria-label') || e.target.textContent || e.target.placeholder || '';
        if (announcement) {
          this.announceToScreenReader(`Focused on ${announcement}`);
        }
      });
    });
  }

  announceToScreenReader(message) {
    // Create screen reader announcement
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  setupIntersectionObserver() {
    // Observer for highlighting active section
    const sections = document.querySelectorAll('section[id]');
    const options = {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.updateActiveNavLink(entry.target.id);
        }
      });
    }, options);

    sections.forEach(section => {
      observer.observe(section);
    });
  }

  setupScrollBehavior() {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollState = () => {
      const currentScrollY = window.scrollY;

      // Hide/show header on scroll
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        this.nav.classList.add('nav-hidden');
      } else {
        // Scrolling up
        this.nav.classList.remove('nav-hidden');
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    });
  }

  toggleMobileMenu() {
    if (this.isMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    this.isMenuOpen = true;
    this.mobileNavOverlay.classList.add('active');
    this.navToggle.classList.add('active');
    this.navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  closeMobileMenu() {
    this.isMenuOpen = false;
    this.mobileNavOverlay.classList.remove('active');
    this.navToggle.classList.remove('active');
    this.navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  scrollToSection(targetId) {
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      const navHeight = this.nav.offsetHeight;
      const targetPosition = targetSection.offsetTop - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Update URL hash without jumping
      history.pushState(null, null, `#${targetId}`);
    }
  }

  updateActiveNavLink(sectionId) {
    // Remove active class from all links
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${sectionId}`) {
        link.classList.add('active');
      }
    });

    // Update mobile nav links
    this.mobileNavLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${sectionId}`) {
        link.classList.add('active');
      }
    });
  }

  // Public method to get current active section
  getActiveSection() {
    const activeLink = document.querySelector('.nav-link.active');
    return activeLink ? activeLink.getAttribute('href').substring(1) : null;
  }
}

// Initialize navigation when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.navigation = new Navigation();
  });
} else {
  window.navigation = new Navigation();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Navigation;
}