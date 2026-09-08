// app.js
// SPA Routing & GitHub Data Fetching Logic

// GitHub Repository Config
// To use real GitHub Issues as DB, replace with your 'username/repo'
const GITHUB_REPO = 'summerscape/testweb';
const USE_MOCK_DATA = true; // Set to false to try fetching from actual GitHub API

// DOM Elements
const appContainer = document.getElementById('app-container');
const navLinks = document.querySelectorAll('.nav-links a');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinksContainer = document.querySelector('.nav-links');

// Mock Data (Static DB)
const mockData = {
    board: [
        { id: 1, title: '환영합니다! 첫 번째 공지사항입니다.', author: 'Admin', date: '2023-10-01' },
        { id: 2, title: '업데이트 안내 (v1.0.1)', author: 'Admin', date: '2023-10-05' },
        { id: 3, title: 'GitHub Static DB 웹사이트 오픈', author: 'Admin', date: '2023-10-10' }
    ],
    guestbook: [
        { id: 1, content: '웹사이트 디자인이 너무 예쁘네요!', author: '방문자1', date: '2023-10-11' },
        { id: 2, content: '잘 보고 갑니다~', author: '익명', date: '2023-10-12' }
    ],
    gallery: [
        { id: 1, title: '풍경 1', url: 'https://images.unsplash.com/photo-1506744626753-eba7bc3613ce?auto=format&fit=crop&w=600&q=80' },
        { id: 2, title: '도시 야경', url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=600&q=80' },
        { id: 3, title: '자연', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80' },
        { id: 4, title: '우주', url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=600&q=80' }
    ]
};

// Views Definition
const views = {
    main: () => `
        <div class="page-content hero-section">
            <i class="fa-brands fa-github"></i>
            <h1 class="page-title">GitHub Static DB</h1>
            <p class="description">GitHub를 데이터베이스로 활용하여 구축된 빠르고 가벼운 정적 웹사이트입니다. 서버 없이도 완벽한 프리미엄 디자인을 경험해보세요.</p>
            
            <div class="feature-grid">
                <div class="feature-card">
                    <i class="fa-solid fa-server"></i>
                    <h3>No Backend Server</h3>
                    <p>백엔드 서버 없이 오직 GitHub만을 이용하여 구동됩니다.</p>
                </div>
                <div class="feature-card">
                    <i class="fa-solid fa-wand-magic-sparkles"></i>
                    <h3>Premium Design</h3>
                    <p>글래스모피즘과 다크 테마를 적용하여 세련된 UI를 제공합니다.</p>
                </div>
                <div class="feature-card">
                    <i class="fa-solid fa-bolt"></i>
                    <h3>Fast SPA</h3>
                    <p>페이지 새로고침 없는 부드러운 화면 전환 효과를 지원합니다.</p>
                </div>
            </div>
        </div>
    `,
    board: async () => {
        let content = `
            <div class="page-content">
                <h1 class="page-title">게시판</h1>
                <p class="description">GitHub 저장소의 데이터를 기반으로 불러온 공지사항 및 게시글 목록입니다.</p>
                <div id="board-content"><div class="loader"><div class="spinner"></div></div></div>
            </div>
        `;

        // Fetch logic
        setTimeout(async () => {
            const container = document.getElementById('board-content');
            if (!container) return;

            let data = mockData.board;
            if (!USE_MOCK_DATA) {
                try {
                    // Example of real GitHub fetch
                    // const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/issues?labels=board`);
                    // data = await res.json();
                } catch (e) { console.error(e); }
            }

            let html = '<div class="board-list">';
            data.forEach(item => {
                html += `
                    <div class="board-item">
                        <div class="board-item-title">${item.title}</div>
                        <div class="board-item-meta">
                            <span><i class="fa-solid fa-user"></i> ${item.author || item.user?.login}</span>
                            <span><i class="fa-regular fa-calendar"></i> ${item.date || new Date(item.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                `;
            });
            html += '</div>';
            container.innerHTML = html;
        }, 600); // simulate network delay

        return content;
    },
    guestbook: async () => {
        let content = `
            <div class="page-content">
                <h1 class="page-title">방명록</h1>
                <p class="description">환영합니다! GitHub 계정으로 로그인하여 영구적으로 보존되는 방명록을 남겨주세요.</p>
                <div id="guestbook-content" style="margin-top: 30px;">
                    <!-- Utterances will load here -->
                    <div class="loader"><div class="spinner"></div></div>
                </div>
            </div>
        `;

        setTimeout(() => {
            const container = document.getElementById('guestbook-content');
            if (!container) return;
            
            container.innerHTML = ''; // Clear loader
            
            const script = document.createElement('script');
            script.src = 'https://utteranc.es/client.js';
            script.setAttribute('repo', GITHUB_REPO);
            script.setAttribute('issue-term', 'pathname'); 
            script.setAttribute('label', 'guestbook');
            script.setAttribute('theme', 'github-dark');
            script.setAttribute('crossorigin', 'anonymous');
            script.async = true;
            
            container.appendChild(script);
        }, 300);

        return content;
    },
    gallery: async () => {
        let content = `
            <div class="page-content">
                <h1 class="page-title">갤러리</h1>
                <p class="description">GitHub에서 불러온 이미지 갤러리입니다.</p>
                <div id="gallery-content"><div class="loader"><div class="spinner"></div></div></div>
            </div>
        `;

        setTimeout(() => {
            const container = document.getElementById('gallery-content');
            if (!container) return;

            let html = '<div class="gallery-grid">';
            mockData.gallery.forEach(item => {
                html += `
                    <div class="gallery-item">
                        <img src="${item.url}" alt="${item.title}" loading="lazy">
                        <div class="gallery-overlay">
                            <h3>${item.title}</h3>
                        </div>
                    </div>
                `;
            });
            html += '</div>';
            container.innerHTML = html;
        }, 700);

        return content;
    }
};



// Router logic
async function navigateTo(route) {
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.route === route) {
            link.classList.add('active');
        }
    });

    // Close mobile menu if open
    navLinksContainer.classList.remove('show');

    // Load content
    if (views[route]) {
        // Show loading state implicitly by clearing or keeping a minimum structure
        appContainer.innerHTML = '<div class="loader"><div class="spinner"></div></div>';

        try {
            const content = typeof views[route] === 'function' ? await views[route]() : views[route];
            appContainer.innerHTML = content;
        } catch (err) {
            console.error('Error loading view:', err);
            appContainer.innerHTML = '<div class="page-content"><h2>오류가 발생했습니다.</h2><p>콘텐츠를 불러오는 데 실패했습니다.</p></div>';
        }
    }
}

// Event Listeners
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const route = e.currentTarget.dataset.route;
        navigateTo(route);
        // Optional: Update URL hash for history support
        window.location.hash = route;
    });
});

mobileMenuBtn.addEventListener('click', () => {
    navLinksContainer.classList.toggle('show');
});

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
    let route = window.location.hash.replace('#', '') || 'main';
    navigateTo(route);
});

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    // Check hash on initial load
    let initialRoute = window.location.hash.replace('#', '') || 'main';
    if (!views[initialRoute]) initialRoute = 'main';
    navigateTo(initialRoute);
});
