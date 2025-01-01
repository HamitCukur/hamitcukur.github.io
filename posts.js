async function loadPosts() {
    try {
        console.log('Attempting to load posts...');
        const response = await fetch('posts.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const postsContainer = document.querySelector('.posts');
        
        console.log('Posts loaded:', data.posts);
        
        if (!postsContainer) {
            console.error('Posts container not found!');
            return;
        }

        // Sort posts by date (newest first)
        data.posts.sort((a, b) => {
            const dateA = new Date(a.date.split('-').reverse().join('-'));
            const dateB = new Date(b.date.split('-').reverse().join('-'));
            return dateB - dateA;
        });

        // Generate HTML for each post
        const postsHTML = data.posts.map(post => `
            <li>
                <a href="posts/${post.id}.html">${post.title}</a>
                <span class="date">${post.date}</span>
            </li>
        `).join('');

        // Insert the posts into the container
        postsContainer.innerHTML = postsHTML;
        console.log('Posts rendered successfully');
    } catch (error) {
        console.error('Error loading posts:', error);
        const postsContainer = document.querySelector('.posts');
        if (postsContainer) {
            postsContainer.innerHTML = '<li class="no-posts">Error loading posts. Please try again later.</li>';
        }
    }
}

// Load posts when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing posts...');
    loadPosts();
}); 