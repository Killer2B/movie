// Global Variables
let currentContent = null;
let currentType = 'movie';
let currentSeason = 1;
let currentEpisode = 1;

// Video Sources Configuration
const videoSources = {
    vidsrc: {
        name: 'VidSrc',
        movie: (id) => `https://vidsrc.net/embed/movie/${id}`,
        tv: (id, season, episode) => `https://vidsrc.net/embed/tv/${id}/${season}/${episode}`
    },
    embed: {
        name: 'Embed.su',
        movie: (id) => `https://embed.su/embed/movie/${id}`,
        tv: (id, season, episode) => `https://embed.su/embed/tv/${id}/${season}/${episode}`
    },
    '2embed': {
        name: '2Embed',
        movie: (id) => `https://www.2embed.cc/embed/${id}`,
        tv: (id, season, episode) => `https://www.2embed.cc/embedtv/${id}&s=${season}&e=${episode}`
    },
    godrive: {
        name: 'GoDrivePlayer',
        movie: (id) => `https://godriveplayer.com/player.php?imdb=${id}`,
        tv: (id, season, episode) => `https://databasegdriveplayer.co/player.php?type=series&tmdb=${id}&season=${season}&episode=${episode}`
    },
    superembed: {
        name: 'SuperEmbed',
        movie: (id) => `https://multiembed.mov/?video_id=${id}`,
        tv: (id, season, episode) => `https://multiembed.mov/?video_id=${id}&s=${season}&e=${episode}`
    },
    vidsrcto: {
        name: 'VidSrc.to',
        movie: (id) => `https://vidsrc.to/embed/movie/${id}`,
        tv: (id, season, episode) => `https://vidsrc.to/embed/tv/${id}/${season}/${episode}`
    },
    fsapi: {
        name: 'FSApi',
        movie: (id) => `https://fsapi.xyz/movie/${id}`,
        tv: (id, season, episode) => `https://fsapi.xyz/tv-imdb/${id}-${season}-${episode}`
    },
    curtstream: {
        name: 'CurtStream',
        movie: (id) => `https://curtstream.com/movies/imdb/${id}`,
        tv: (id, season, episode) => `https://curtstream.com/series/tmdb/${id}/${season}/${episode}/`
    },
    moviewp: {
        name: 'MovieWP',
        movie: (id) => `https://moviewp.com/se.php?video_id=${id}`,
        tv: (id, season, episode) => `https://moviewp.com/se.php?video_id=${id}&tmdb=1&s=${season}&e=${episode}`
    },
    apimdb: {
        name: 'ApiMDB',
        movie: (id) => `https://v2.apimdb.net/e/movie/${id}`,
        tv: (id, season, episode) => `https://v2.apimdb.net/e/tmdb/tv/${id}/${season}/${episode}/`
    },
    gomo: {
        name: 'Gomo',
        movie: (id) => `https://gomo.to/movie/${id}`,
        tv: (id, season, episode) => `https://gomo.to/tv/${id}/${season}/${episode}`
    },
    vidcloud: {
        name: 'VidCloud',
        movie: (id) => `https://vidcloud.stream/${id}.html`,
        tv: (id, season, episode) => `https://vidcloud.stream/${id}-${season}-${episode}.html`
    }
};

// Popular content data (sample)
const popularContent = [
    {
        id: 'tt0111161',
        title: 'The Shawshank Redemption',
        titleAr: 'الخلاص من شاوشانك',
        type: 'movie',
        year: '1994',
        poster: 'https://via.placeholder.com/200x300/ff6b6b/ffffff?text=فيلم'
    },
    {
        id: 'tt0468569',
        title: 'The Dark Knight',
        titleAr: 'فارس الظلام',
        type: 'movie',
        year: '2008',
        poster: 'https://via.placeholder.com/200x300/4ecdc4/ffffff?text=فيلم'
    },
    {
        id: 'tt0944947',
        title: 'Game of Thrones',
        titleAr: 'صراع العروش',
        type: 'tv',
        year: '2011-2019',
        poster: 'https://via.placeholder.com/200x300/45b7d1/ffffff?text=مسلسل'
    },
    {
        id: 'tt0903747',
        title: 'Breaking Bad',
        titleAr: 'بريكنغ باد',
        type: 'tv',
        year: '2008-2013',
        poster: 'https://via.placeholder.com/200x300/ff8e8e/ffffff?text=مسلسل'
    },
    {
        id: 'tt1375666',
        title: 'Inception',
        titleAr: 'البداية',
        type: 'movie',
        year: '2010',
        poster: 'https://via.placeholder.com/200x300/6ee7e0/ffffff?text=فيلم'
    },
    {
        id: 'tt0816692',
        title: 'Interstellar',
        titleAr: 'بين النجوم',
        type: 'movie',
        year: '2014',
        poster: 'https://via.placeholder.com/200x300/ffa726/ffffff?text=فيلم'
    }
];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const playerSection = document.getElementById('playerSection');
const videoPlayer = document.getElementById('videoPlayer');
const loading = document.getElementById('loading');
const currentTitle = document.getElementById('currentTitle');
const sourceSelect = document.getElementById('sourceSelect');
const changeSourceBtn = document.getElementById('changeSource');
const episodeSelector = document.getElementById('episodeSelector');
const seasonSelect = document.getElementById('seasonSelect');
const episodeSelect = document.getElementById('episodeSelect');
const loadEpisodeBtn = document.getElementById('loadEpisode');
const closeBtn = document.getElementById('closeBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const popularContentGrid = document.getElementById('popularContent');

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

changeSourceBtn.addEventListener('click', changeVideoSource);
loadEpisodeBtn.addEventListener('click', loadSelectedEpisode);
closeBtn.addEventListener('click', closePlayer);
fullscreenBtn.addEventListener('click', toggleFullscreen);

// Season and Episode selectors
seasonSelect.addEventListener('change', function() {
    currentSeason = parseInt(this.value);
    updateEpisodeOptions();
});

episodeSelect.addEventListener('change', function() {
    currentEpisode = parseInt(this.value);
});

// Initialize App
function initializeApp() {
    loadPopularContent();
    setupSourceSelector();
}

// Setup Source Selector
function setupSourceSelector() {
    sourceSelect.innerHTML = '';
    Object.keys(videoSources).forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = videoSources[key].name;
        sourceSelect.appendChild(option);
    });
}

// Handle Search
function handleSearch() {
    const query = searchInput.value.trim();
    if (!query) {
        showNotification('يرجى إدخال اسم الفيلم أو المسلسل', 'warning');
        return;
    }

    const searchType = document.querySelector('input[name="searchType"]:checked').value;
    
    // Simulate search (in real app, you'd call TMDB API)
    showNotification('جاري البحث...', 'info');
    
    // For demo, we'll use a sample ID
    setTimeout(() => {
        const sampleContent = {
            id: searchType === 'movie' ? 'tt0111161' : 'tt0944947',
            title: query,
            type: searchType
        };
        
        loadContent(sampleContent);
        showNotification('تم العثور على المحتوى!', 'success');
    }, 1500);
}

// Load Content
function loadContent(content) {
    currentContent = content;
    currentType = content.type;
    currentTitle.textContent = content.title;
    
    // Show player section
    playerSection.style.display = 'block';
    playerSection.scrollIntoView({ behavior: 'smooth' });
    
    // Setup episode selector for TV shows
    if (content.type === 'tv') {
        episodeSelector.style.display = 'block';
        setupSeasonEpisodeSelectors();
    } else {
        episodeSelector.style.display = 'none';
    }
    
    // Load video
    loadVideo();
}

// Setup Season/Episode Selectors
function setupSeasonEpisodeSelectors() {
    // Clear existing options
    seasonSelect.innerHTML = '';
    episodeSelect.innerHTML = '';
    
    // Add seasons (sample data - in real app, get from API)
    for (let i = 1; i <= 8; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `الموسم ${i}`;
        seasonSelect.appendChild(option);
    }
    
    // Set default values
    currentSeason = 1;
    currentEpisode = 1;
    seasonSelect.value = 1;
    
    updateEpisodeOptions();
}

// Update Episode Options
function updateEpisodeOptions() {
    episodeSelect.innerHTML = '';
    
    // Add episodes (sample data - in real app, get from API)
    const episodeCount = currentSeason === 1 ? 10 : 8; // Sample episode counts
    for (let i = 1; i <= episodeCount; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `الحلقة ${i}`;
        episodeSelect.appendChild(option);
    }
    
    episodeSelect.value = 1;
    currentEpisode = 1;
}

// Load Video
function loadVideo() {
    if (!currentContent) return;
    
    showLoading(true);
    
    const selectedSource = sourceSelect.value;
    const source = videoSources[selectedSource];
    
    let videoUrl;
    
    if (currentType === 'movie') {
        videoUrl = source.movie(currentContent.id);
    } else {
        videoUrl = source.tv(currentContent.id, currentSeason, currentEpisode);
    }
    
    // Load video with delay to show loading
    setTimeout(() => {
        videoPlayer.src = videoUrl;
        showLoading(false);
        showNotification(`تم تحميل المحتوى من ${source.name}`, 'success');
    }, 1000);
}

// Change Video Source
function changeVideoSource() {
    if (!currentContent) {
        showNotification('يرجى اختيار محتوى أولاً', 'warning');
        return;
    }
    
    loadVideo();
}

// Load Selected Episode
function loadSelectedEpisode() {
    currentSeason = parseInt(seasonSelect.value);
    currentEpisode = parseInt(episodeSelect.value);
    loadVideo();
}

// Close Player
function closePlayer() {
    playerSection.style.display = 'none';
    videoPlayer.src = '';
    currentContent = null;
}

// Toggle Fullscreen
function toggleFullscreen() {
    const videoContainer = document.querySelector('.video-container');
    
    if (!document.fullscreenElement) {
        videoContainer.requestFullscreen().catch(err => {
            showNotification('لا يمكن تفعيل وضع ملء الشاشة', 'error');
        });
    } else {
        document.exitFullscreen();
    }
}

// Show/Hide Loading
function showLoading(show) {
    loading.style.display = show ? 'block' : 'none';
}

// Load Popular Content
function loadPopularContent() {
    popularContentGrid.innerHTML = '';
    
    popularContent.forEach(content => {
        const contentItem = createContentItem(content);
        popularContentGrid.appendChild(contentItem);
    });
}

// Create Content Item
function createContentItem(content) {
    const item = document.createElement('div');
    item.className = 'content-item fade-in';
    item.innerHTML = `
        <img src="${content.poster}" alt="${content.titleAr}" onerror="this.src='https://via.placeholder.com/200x300/666/fff?text=صورة+غير+متاحة'">
        <h3>${content.titleAr}</h3>
        <p>${content.year} • ${content.type === 'movie' ? 'فيلم' : 'مسلسل'}</p>
    `;
    
    item.addEventListener('click', () => {
        loadContent({
            id: content.id,
            title: content.titleAr,
            type: content.type
        });
    });
    
    return item;
}

// Show Notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 5px;
        margin-left: auto;
    `;
}

// Get Notification Icon
function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Get Notification Color
function getNotificationColor(type) {
    const colors = {
        success: 'linear-gradient(45deg, #4ecdc4, #44a08d)',
        error: 'linear-gradient(45deg, #ff6b6b, #ee5a52)',
        warning: 'linear-gradient(45deg, #ffa726, #ff9800)',
        info: 'linear-gradient(45deg, #45b7d1, #3498db)'
    };
    return colors[type] || colors.info;
}

// Add CSS animations for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Handle video player errors
videoPlayer.addEventListener('error', function() {
    showNotification('حدث خطأ في تحميل الفيديو. جرب مصدر آخر.', 'error');
    showLoading(false);
});

// Handle video player load
videoPlayer.addEventListener('load', function() {
    showLoading(false);
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (playerSection.style.display === 'block') {
        switch(e.key) {
            case 'Escape':
                closePlayer();
                break;
            case 'f':
            case 'F':
                if (e.ctrlKey) {
                    e.preventDefault();
                    toggleFullscreen();
                }
                break;
        }
    }
});

// Add smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Add some visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Add loading animation to search button
searchBtn.addEventListener('click', function() {
    const icon = this.querySelector('i');
    icon.className = 'fas fa-spinner fa-spin';
    
    setTimeout(() => {
        icon.className = 'fas fa-search';
    }, 2000);
});

// Add hover effects to content items
document.addEventListener('mouseover', function(e) {
    if (e.target.closest('.content-item')) {
        e.target.closest('.content-item').classList.add('pulse');
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.closest('.content-item')) {
        e.target.closest('.content-item').classList.remove('pulse');
    }
});

// Console welcome message
console.log('%c🎬 مرحباً بك في منصة XAd للبث! 🎬', 'color: #ff6b6b; font-size: 20px; font-weight: bold;');
console.log('%cتم تطوير هذه المنصة باستخدام أحدث تقنيات الويب', 'color: #4ecdc4; font-size: 14px;');
console.log('%cالمصادر المدعومة: VidSrc, Embed.su, 2Embed, GoDrivePlayer, SuperEmbed وأكثر!', 'color: #45b7d1; font-size: 12px;');