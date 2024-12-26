// Smooth scrolling
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('a[href^="#"]');
  for (const link of links) {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute('href'));
      target.scrollIntoView({
        behavior: 'smooth',
      });
    });
  }
});

// Social links hover effect
const socialLinks = document.querySelectorAll(".social-links img");

socialLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    link.style.transform = "scale(1.1)";
  });

  link.addEventListener("mouseleave", () => {
    link.style.transform = "scale(1)";
  });
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

// Analytics consent
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

