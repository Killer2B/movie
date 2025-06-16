// Sample data - In a real application, this would come from an API
const sampleData = {
    latest: [
        {
            id: 1,
            title: "ون بيس",
            chapter: "الفصل 1067",
            cover: "https://picsum.photos/200/300",
            type: "manga"
        },
        {
            id: 2,
            title: "سولو ليفلينج",
            chapter: "الفصل 223",
            cover: "https://picsum.photos/200/301",
            type: "manhwa"
        },
        {
            id: 3,
            title: "حكاية المستذئب",
            chapter: "الفصل 1",
            cover: "https://picsum.photos/200/302",
            type: "novel"
        },
        // Add more items as needed
    ],
    popular: [
        {
            id: 4,
            title: "هجوم العمالقة",
            chapter: "الفصل 139",
            cover: "https://picsum.photos/200/303",
            type: "manga"
        },
        {
            id: 5,
            title: "صياد الأراضي الموعودة",
            chapter: "الفصل 45",
            cover: "https://picsum.photos/200/304",
            type: "manga"
        },
        {
            id: 6,
            title: "برج الله",
            chapter: "الفصل 550",
            cover: "https://picsum.photos/200/305",
            type: "manhwa"
        },
        // Add more items as needed
    ]
};

// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const latestGrid = document.querySelector('.latest-releases .content-grid');
const popularGrid = document.querySelector('.popular .content-grid');
const searchInput = document.querySelector('.search-container input');
const searchButton = document.querySelector('.search-container button');

// Theme Toggle
function toggleTheme() {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('darkMode', isDark);
}

// Check for saved theme preference
if (localStorage.getItem('darkMode') === 'true') {
    toggleTheme();
}

themeToggle.addEventListener('click', toggleTheme);

// Create Card Element
function createCard(item) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <img src="${item.cover}" alt="${item.title}">
        <div class="card-content">
            <h4>${item.title}</h4>
            <p>${item.chapter}</p>
            <span class="badge ${item.type}">${item.type}</span>
        </div>
    `;
    return card;
}

// Populate Grids
function populateGrid(grid, items) {
    grid.innerHTML = '';
    items.forEach(item => {
        grid.appendChild(createCard(item));
    });
}

// Search Functionality
function searchContent(query) {
    const searchResults = [...sampleData.latest, ...sampleData.popular].filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
    );
    
    // Update both grids with search results
    if (query) {
        populateGrid(latestGrid, searchResults);
        popularGrid.parentElement.style.display = 'none';
    } else {
        populateGrid(latestGrid, sampleData.latest);
        populateGrid(popularGrid, sampleData.popular);
        popularGrid.parentElement.style.display = 'block';
    }
}

// Event Listeners
searchButton.addEventListener('click', () => {
    searchContent(searchInput.value);
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchContent(searchInput.value);
    }
});

// Initial Population
populateGrid(latestGrid, sampleData.latest);
populateGrid(popularGrid, sampleData.popular);

// Lazy Loading Images
const lazyLoad = target => {
    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.disconnect();
            }
        });
    });

    io.observe(target);
};

// Apply lazy loading to images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(lazyLoad);
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href !== '#') {
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add loading animation
function showLoading() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    document.body.appendChild(loader);
}

function hideLoading() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.remove();
    }
}

// Mobile Navigation Toggle
const navLinks = document.querySelector('.nav-links');
let isNavVisible = false;

function toggleMobileNav() {
    isNavVisible = !isNavVisible;
    navLinks.style.display = isNavVisible ? 'flex' : 'none';
}

// Add mobile nav toggle button for smaller screens
if (window.innerWidth <= 768) {
    const mobileNavToggle = document.createElement('button');
    mobileNavToggle.className = 'mobile-nav-toggle';
    mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
    mobileNavToggle.addEventListener('click', toggleMobileNav);
    document.querySelector('.navbar').prepend(mobileNavToggle);
}
