// UST Data
// ==========================================
// どうぞ、新しいUSTを追加する際はこのテンプレートをコピーして使ってください。
// Copy and paste this template to add new USTs:
/*
    {
        id: 999,
        date: "2025.01.01",
        title: "Song Title Here",
        original_artist: "Original Artist Name",
        tags: ["VCV", "Tag2", "Tag3"],
        url: "https://bowlroll.net/file/..."
    },
*/
// ==========================================

const ustData = [
    {
        id: 1,
        date: "2024.01.15",
        title: "ライアーダンサー",
        original_artist: "マサラダ",
        tags: ["CV", "1", "2"],
        url: "https://bowlroll.net/file/312395"
    },
    {
        id: 2,
        date: "2024.01.15",
        title: "性格悪くてすみません",
        original_artist: "青谷",
        tags: ["CV"],
        url: "https://bowlroll.net/file/312396"
    },
    {
        id: 3,
        date: "2024.01.15",
        title: "取り柄のないクズだって生きてていいだろが",
        original_artist: "ヘルニアofficial",
        tags: ["CV"],
        url: "https://bowlroll.net/file/312397"
    },
    {
        id: 4,
        date: "2024.01.15",
        title: "新世",
        original_artist: "巡巡",
        tags: ["CV"],
        url: "https://bowlroll.net/file/312398"
    },
    {
        id: 5,
        date: "2024.03.16",
        title: "字が汚い全ての人に捧げる歌",
        original_artist: "MidLuster",
        tags: ["CV"],
        url: "https://bowlroll.net/file/315404"
    },
    {
        id: 6,
        date: "2025.06.08",
        title: "すげぇアプリ開発中",
        original_artist: "WONDERFUL★OPPORTUNITY!",
        tags: ["CV"],
        url: "https://bowlroll.net/file/337274"
    },
    {
        id: 7,
        date: "2025.09.11",
        title: "アマチュア音楽やめられねぇんだわ",
        original_artist: "Ro2noki",
        tags: ["CV"],
        url: "https://bowlroll.net/file/342022"
    },
    {
        id: 8,
        date: "2025.11.26",
        title: "ナラキスト",
        original_artist: "メドミア",
        tags: ["CV"],
        url: "https://bowlroll.net/file/345328"
    },
    {
        id: 9,
        date: "2024.08.05",
        title: "God-ish",
        original_artist: "PinocchioP",
        tags: ["CV"],
        url: "#"
    },

];

// State
let state = {
    searchQuery: "",
    activeFilter: "all",
    visibleCount: 6,
    increment: 6
};

// DOM Elements
const grid = document.getElementById('ust-grid');
const searchInput = document.getElementById('search-input');
const filterBtns = document.querySelectorAll('.filter-btn');
const loadMoreBtn = document.getElementById('load-more-btn');
const resultsCount = document.getElementById('results-count');

// Init
function init() {
    render();
    setupEventListeners();
}

function setupEventListeners() {
    // Search
    searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value.toLowerCase();
        state.visibleCount = 6; // Reset visible count on search
        render();
    });

    // Filters
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update UI
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update State
            state.activeFilter = btn.dataset.filter;
            state.visibleCount = 6; // Reset visible count on filter
            render();
        });
    });

    // Load More
    loadMoreBtn.addEventListener('click', () => {
        state.visibleCount += state.increment;
        render();
    });
}

function render() {
    // Filter Data
    let filtered = ustData.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(state.searchQuery) ||
            item.original_artist.toLowerCase().includes(state.searchQuery);
        const matchesFilter = state.activeFilter === 'all' || item.tags.includes(state.activeFilter);

        return matchesSearch && matchesFilter;
    });

    // Update Count
    resultsCount.textContent = `Showing ${Math.min(state.visibleCount, filtered.length)} of ${filtered.length} items`;

    // Slice Data
    const toShow = filtered.slice(0, state.visibleCount);

    // Clear Grid
    grid.innerHTML = '';

    // Generate HTML
    if (toShow.length === 0) {
        grid.innerHTML = '<div class="no-results">No USTs found.</div>';
        loadMoreBtn.style.display = 'none';
        return;
    }

    toShow.forEach(item => {
        const card = document.createElement('article');
        card.className = 'ust-card fade-in';

        // Tags HTML
        const tagsHtml = item.tags.map(tag => `<span>${tag}</span>`).join('');

        card.innerHTML = `
            <div class="card-meta">${item.date}</div>
            <h3 class="song-title">${item.title}</h3>
            <p class="original-artist">Original by ${item.original_artist}</p>
            <div class="tags">${tagsHtml}</div>
            <a href="${item.url}" class="btn btn-outline" download>Download</a>
        `;

        grid.appendChild(card);
    });

    // Handle Load More Button
    if (filtered.length > state.visibleCount) {
        loadMoreBtn.style.display = 'inline-block';
    } else {
        loadMoreBtn.style.display = 'none';
    }
}

// Start
init();
