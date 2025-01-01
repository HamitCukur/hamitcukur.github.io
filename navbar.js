document.addEventListener('DOMContentLoaded', function() {
    // Get the base URL for images
    const currentPath = window.location.pathname;
    const isInPostsDir = currentPath.includes('/posts/');
    const imgPath = isInPostsDir ? '../' : '';
    const linkPath = isInPostsDir ? '../' : '';

    const navbarHtml = `
    <nav>
        <div class="nav-container">
            <a href="${linkPath}index.html" class="mobile-logo">mhc</a>
            <div class="mobile-nav-button">
                <span></span>
                <span></span>
            </div>
            <ul class="navbar">
                <li class="nav-brand"><a href="${linkPath}index.html" class="nav-logo">mehmet hamit çukur</a></li>
                <li class="nav-center">
                    <ul>
                        <li><a href="${linkPath}about.html">about</a></li>
                        <li><a href="${linkPath}archive.html">archive</a></li>
                        <li><a href="${linkPath}music.html">music</a></li>
                        <li><a href="${linkPath}life.html">life</a></li>
                        <li><a href="${linkPath}tech.html">tech</a></li>
                    </ul>
                </li>
                <li class="social-nav">
                    <a href="https://www.instagram.com/hamitcukur/" target="_blank"><img src="${imgPath}instagram.png" alt="Instagram"></a>
                    <a href="https://www.youtube.com/@hamitcukur" target="_blank"><img src="${imgPath}youtube.png" alt="YouTube"></a>
                    <a href="https://x.com/HamitCukur" target="_blank"><img src="${imgPath}x_logo.png" alt="X (Twitter)"></a>
                    <a href="https://www.linkedin.com/in/mehmet-hamit-cukur/" target="_blank"><img src="${imgPath}linkedin.png" alt="LinkedIn"></a>
                </li>
            </ul>
        </div>
    </nav>
    <div class="mobile-nav-overlay">
        <nav class="mobile-nav">
            <ul>
                <li><a href="${linkPath}index.html">home</a></li>
                <li><a href="${linkPath}about.html">about</a></li>
                <li><a href="${linkPath}archive.html">archive</a></li>
                <li><a href="${linkPath}music.html">music</a></li>
                <li><a href="${linkPath}life.html">life</a></li>
                <li><a href="${linkPath}tech.html">tech</a></li>
            </ul>
            <div class="mobile-social-links">
                <a href="https://www.instagram.com/hamitcukur/" target="_blank"><img src="${imgPath}instagram.png" alt="Instagram"></a>
                <a href="https://www.youtube.com/@hamitcukur" target="_blank"><img src="${imgPath}youtube.png" alt="YouTube"></a>
                <a href="https://x.com/HamitCukur" target="_blank"><img src="${imgPath}x_logo.png" alt="X (Twitter)"></a>
                <a href="https://www.linkedin.com/in/mehmet-hamit-cukur/" target="_blank"><img src="${imgPath}linkedin.png" alt="LinkedIn"></a>
            </div>
        </nav>
    </div>`;

    // Insert the navbar into the header
    const header = document.querySelector('header');
    if (header) {
        header.innerHTML = navbarHtml;
    }
}); 