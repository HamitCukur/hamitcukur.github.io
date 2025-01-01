// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
  const mobileNavButton = document.querySelector('.mobile-nav-button');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileNav = document.querySelector('.mobile-nav');
  let isMenuOpen = false;

  function toggleMobileNav() {
    isMenuOpen = !isMenuOpen;
    mobileNavButton.classList.toggle('active');
    mobileNavOverlay.classList.toggle('active');
    mobileNav.classList.toggle('active');
    
    // Prevent body scrolling when menu is open
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    
    // Reset transitions
    const menuItems = mobileNav.querySelectorAll('li');
    menuItems.forEach(item => {
      item.style.transitionDelay = '0s';
      item.style.opacity = '0';
      item.style.transform = 'translateY(10px)';
    });
    
    // Add delay to each list item animation if menu is opening
    if (isMenuOpen) {
      setTimeout(() => {
        menuItems.forEach((item, index) => {
          item.style.transitionDelay = `${index * 0.1}s`;
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        });
      }, 100);
    }
  }

  if (mobileNavButton) {
    mobileNavButton.addEventListener('click', toggleMobileNav);
  }

  // Close mobile nav when clicking a link
  const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (isMenuOpen) {
        toggleMobileNav();
      }
    });
  });

  // Close mobile nav when clicking outside
  mobileNavOverlay.addEventListener('click', (e) => {
    if (e.target === mobileNavOverlay && isMenuOpen) {
      toggleMobileNav();
    }
  });

  // Handle escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      toggleMobileNav();
    }
  });
});

// Smooth scrolling
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('a[href^="#"]');
  for (const link of links) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
        });
      }
    });
  }
});

// Cookie consent handling
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function handleCookieConsent() {
  const consent = getCookie('cookie-consent');
  const consentBanner = document.getElementById('cookie-consent');
  
  if (!consent && consentBanner) {
    consentBanner.style.display = 'block';
    
    document.getElementById('cookie-close').addEventListener('click', function() {
      setCookie('cookie-consent', 'accepted', 365);
      consentBanner.style.display = 'none';
      
      // Enable analytics after consent
      if (window.gtag) {
        gtag('consent', 'update', {
          'analytics_storage': 'granted'
        });
      }
      
      // Enable Hotjar after consent
      if (window.hj) {
        hj('stateChange', 'granted');
      }
    });
  } else {
    if (consentBanner) {
      consentBanner.style.display = 'none';
    }
  }
}

// Initialize analytics with required consent
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  'analytics_storage': 'denied'
});

// Page load time tracking
window.addEventListener('load', function() {
  if (window.performance) {
    const timing = window.performance.timing;
    const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
    if (window.gtag) {
      gtag('event', 'timing_complete', {
        'name': 'page_load',
        'value': pageLoadTime,
        'event_category': 'Performance'
      });
    }
  }
});

// Track scroll depth
let maxScroll = 0;
window.addEventListener('scroll', function() {
  const percent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
  if (percent > maxScroll) {
    maxScroll = Math.round(percent);
    if (maxScroll % 25 === 0 && window.gtag) { // Track at 25%, 50%, 75%, 100%
      gtag('event', 'scroll_depth', {
        'event_category': 'Engagement',
        'event_label': maxScroll + '%'
      });
    }
  }
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  handleCookieConsent();
});

