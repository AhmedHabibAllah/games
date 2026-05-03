// مصفوفة تحتوي على معلومات الألعاب
// لإضافة لعبة جديدة، فقط أضف كائن جديد لهذه المصفوفة
const games = [
    {
        id: 12,
        title: "Pegs X Stickers",
        description: "A fun puzzle and logic game by Mister Morris",
        folder: "",
        image: "https://img.itch.zone/aW1nLzE4NjYxOTY3LnBuZw==/315x250%23c/RkPhXF.png", 
        file: "https://itch.io/embed/4439279",
        category: "Puzzle"
    },
    {
        id: 11,
        title: "Exciting Road Challenge",
        description: "A fun new challenge from GameDistribution",
        folder: "", 
        image: "https://img.gamedistribution.com/30741355ad454b8cae5d648cb5caa244-512x512.jpg",
        file: "https://html5.gamedistribution.com/30741355ad454b8cae5d648cb5caa244/?gd_sdk_referrer_url=https://www.example.com/games/road-challenge",
        category: "Racing"
    },
    {
        id: 10,
        title: "New Adventure Game",
        description: "Fun external game from GameDistribution",
        folder: "", // نتركه فارغاً للألعاب التي تستخدم روابط خارجية
        image: "https://img.gamedistribution.com/ad37a85f16e246fabdc818f375a5eb45-512x512.jpg",
        file: "https://html5.gamedistribution.com/ad37a85f16e246fabdc818f375a5eb45/?gd_sdk_referrer_url=https://www.example.com/games/new-game",
        category: "Adventure"
    },
    {
        id: 9, // رقم تسلسلي جديد
        title: "Ulrich Guess",
        description: "Guess the pattern",
        folder: "ulrich", // اسم المجلد الذي أنشأته
        image: "ulrich.jpg",
        file: "index.html", // اسم الملف الرئيسي للعبة داخل المجلد
        category: "Puzzle"
    },
    {
        id: 1,
        title: "Memory Game",
        description: "Test your memory in this fun game",
        folder: "memory-game",
        image: "memory.jpg",
        file: "index.html",
        category: "Puzzle"
    },
    {
        id: 2,
        title: "Car Racing",
        description: "Speed and excitement in a car race",
        folder: "car-race",
        image: "car-race.jpg",
        file: "game.html",
        category: "Racing"
    },
    {
        id: 3,
        title: "Numbers Game",
        description: "Numbers and math challenge",
        folder: "numbers-game",
        image: "numbers.jpg",
        file: "index.html",
        category: "Educational"
    },
    {
        id: 4,
        title: "Space Adventure",
        description: "Explore space in an exciting adventure",
        folder: "space-adventure",
        image: "space.jpg",
        file: "game.html",
        category: "Adventure"
    },
    {
        id: 5,
        title: "Birds Game",
        description: "Help birds reach their nests",
        folder: "birds-game",
        image: "birds.jpg",
        file: "index.html",
        category: "Adventure"
    },
    {
        id: 6,
        title: "Color Match",
        description: "Match similar colors quickly",
        folder: "colors-game",
        image: "colors.jpg",
        file: "game.html",
        category: "Speed"
    },
    {
        id: 7,
        title: "Puzzle Game",
        description: "Solve exciting and fun puzzles",
        folder: "puzzle-game",
        image: "puzzle.jpg",
        file: "index.html",
        category: "Puzzle"
    },
    {
        id: 8,
        title: "Basketball",
        description: "Basketball shooting challenge",
        folder: "basketball",
        image: "basketball.jpg",
        file: "game.html",
        category: "Sports"
    },
];

// عناصر DOM
const gamesGrid = document.getElementById("games-grid");
const headerElement = document.querySelector("header"); // مرجع للهيدر
const categoriesContainer = document.getElementById("categories-container");
const searchInput = document.getElementById("search-input");
const searchWrapper = document.getElementById("search-wrapper");
const searchToggleBtn = document.getElementById("search-toggle-btn");

// عناصر الإعدادات
const settingsBtn = document.getElementById("settings-btn");
const settingsModal = document.getElementById("settings-modal");
const closeSettingsModal = document.getElementById("close-settings-modal");
const themeToggleSettings = document.getElementById("theme-toggle-settings");
const languageSelect = document.getElementById("language-select");
const colorOptions = document.querySelectorAll(".color-option");
const headerThemeBtn = document.getElementById("header-theme-btn");

// عناصر عرض اللعبة الجديدة
const gameViewer = document.getElementById('game-viewer');
const gameViewerTitle = document.getElementById('game-viewer-title');
const gameFrameWrapper = document.getElementById('game-frame-wrapper');
const previousGamesList = document.getElementById('previous-games-list');
const nextGamesList = document.getElementById('next-games-list');
const gameViewerClose = document.getElementById('game-viewer-close');
const gameViewerFullscreen = document.getElementById('game-viewer-fullscreen');
const gameViewerReload = document.getElementById('game-viewer-reload');
const gameViewerShare = document.getElementById('game-viewer-share');
const sidebarToggle = document.getElementById('sidebar-toggle');
const gameLoader = document.getElementById('game-loader');
const similarGamesSection = document.getElementById('similar-games-section');
const similarGamesGrid = document.getElementById('similar-games-grid');

// عناصر نافذة المشاركة
const shareModal = document.getElementById('share-modal');
const closeShareModal = document.getElementById('close-share-modal');
const shareCopyBtn = document.getElementById('share-copy');
const backToTopBtn = document.getElementById('back-to-top');

// إعداد المؤثر الصوتي
const clickSound = new Audio('https://www.soundjay.com/buttons/sounds/button-30.mp3');

function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play().catch(e => console.log("Audio play failed", e));
}

// المتغيرات العامة
let currentGame = null;
let favorites = [];
let gameVisits = {}; // لتتبع عدد زيارات كل لعبة
let currentCategory = 'all';
let searchQuery = '';
let currentlyVisibleGames = []; // لتخزين الألعاب المعروضة حالياً
let currentLang = 'en';
let displayedCount = 0;
const ITEMS_PER_PAGE = 12;

// قاموس الترجمة
const translations = {
    ar: {
        siteTitle: "عالم الألعاب الممتع",
        settings: "الإعدادات",
        searchPlaceholder: "ابحث...",
        all: "الكل",
        favorites: "المفضلة",
        similarGames: "ألعاب مشابهة قد تعجبك",
        whyUs: "لماذا موقعنا؟",
        whyUsDesc: "موقعنا يوفر أفضل الألعاب المناسبة لجميع الأعمار بتصميم جذاب وألوان مبهرة!",
        forEveryone: "للجميع",
        forEveryoneDesc: "ألعاب مناسبة للأطفال والشباب، آمنة وممتعة!",
        addGames: "إضافة ألعاب",
        addGamesDesc: "سهولة إضافة الألعاب الجديدة بدون قواعد بيانات!",
        copyright: "© 2023 عالم الألعاب الممتع | تصميم وتطوير: فريق الإبداع",
        shareTitle: "مشاركة اللعبة",
        copyLink: "نسخ الرابط",
        copied: "تم النسخ!",
        language: "اللغة",
        appearance: "المظهر",
        themeColor: "لون الموقع",
        darkMode: "الوضع الليلي",
        lightMode: "الوضع النهاري",
        noGames: "لا توجد ألعاب تطابق بحثك",
        "ذكاء": "ذكاء", "سيارات": "سيارات", "تعليمية": "تعليمية", "مغامرات": "مغامرات", "سرعة": "سرعة", "رياضة": "رياضة"
    },
    en: {
        siteTitle: "Fun Game World",
        settings: "Settings",
        searchPlaceholder: "Search...",
        all: "All",
        favorites: "Favorites",
        similarGames: "Similar Games",
        whyUs: "Why Us?",
        whyUsDesc: "We provide the best games for all ages with attractive designs!",
        forEveryone: "For Everyone",
        forEveryoneDesc: "Safe and fun games for kids and youth!",
        addGames: "Add Games",
        addGamesDesc: "Easy to add new games!",
        copyright: "© 2023 Fun Game World | Design: Creative Team",
        shareTitle: "Share Game",
        copyLink: "Copy Link",
        copied: "Copied!",
        language: "Language",
        appearance: "Appearance",
        themeColor: "Theme Color",
        darkMode: "Dark Mode",
        lightMode: "Light Mode",
        noGames: "No games found",
        "ذكاء": "Puzzle", "سيارات": "Racing", "تعليمية": "Educational", "مغامرات": "Adventure", "سرعة": "Speed", "رياضة": "Sports"
    },
    de: {
        siteTitle: "Lustige Spielwelt", settings: "Einstellungen", searchPlaceholder: "Suchen...", all: "Alle", favorites: "Favoriten", similarGames: "Ähnliche Spiele", whyUs: "Warum wir?", whyUsDesc: "Wir bieten die besten Spiele für alle Altersgruppen!", forEveryone: "Für Alle", forEveryoneDesc: "Sichere und lustige Spiele für Kinder!", addGames: "Spiele hinzufügen", addGamesDesc: "Einfach neue Spiele hinzufügen!", copyright: "© 2023 Lustige Spielwelt", shareTitle: "Spiel teilen", copyLink: "Link kopieren", copied: "Kopiert!", language: "Sprache", appearance: "Aussehen", themeColor: "Themenfarbe", darkMode: "Dunkelmodus", lightMode: "Heller Modus", noGames: "Keine Spiele gefunden",
        "ذكاء": "Rätsel", "سيارات": "Rennen", "تعليمية": "Bildung", "مغامرات": "Abenteuer", "سرعة": "Geschwindigkeit", "رياضة": "Sport"
    },
    fr: {
        siteTitle: "Monde du Jeu", settings: "Paramètres", searchPlaceholder: "Rechercher...", all: "Tous", favorites: "Favoris", similarGames: "Jeux similaires", whyUs: "Pourquoi nous ?", whyUsDesc: "Nous offrons les meilleurs jeux pour tous les âges !", forEveryone: "Pour tous", forEveryoneDesc: "Jeux sûrs et amusants pour les enfants !", addGames: "Ajouter des jeux", addGamesDesc: "Facile d'ajouter de nouveaux jeux !", copyright: "© 2023 Monde du Jeu", shareTitle: "Partager", copyLink: "Copier le lien", copied: "Copié !", language: "Langue", appearance: "Apparence", themeColor: "Couleur du thème", darkMode: "Mode Sombre", lightMode: "Mode Clair", noGames: "Aucun jeu trouvé",
        "ذكاء": "Puzzle", "سيارات": "Course", "تعليمية": "Éducatif", "مغامرات": "Aventure", "سرعة": "Vitesse", "رياضة": "Sport"
    },
    hi: {
        siteTitle: "मजेदार खेल दुनिया", settings: "सेटिंग्स", searchPlaceholder: "खोजें...", all: "सभी", favorites: "पसंदीदा", similarGames: "समान खेल", whyUs: "हम क्यों?", whyUsDesc: "हम सभी उम्र के लिए सर्वश्रेष्ठ खेल प्रदान करते हैं!", forEveryone: "सबके लिए", forEveryoneDesc: "बच्चों और युवाओं के लिए सुरक्षित और मजेदार खेल!", addGames: "खेल जोड़ें", addGamesDesc: "नए खेल जोड़ना आसान है!", copyright: "© 2023 मजेदार खेल दुनिया", shareTitle: "खेल साझा करें", copyLink: "लिंक कॉपी करें", copied: "कॉपी किया गया!", language: "भाषा", appearance: "दिखावट", themeColor: "थीम का रंग", darkMode: "डार्क मोड", lightMode: "लाइट मोड", noGames: "कोई खेल नहीं मिला",
        "ذكاء": "पहेली", "سيارات": "रेसिंग", "تعليمية": "शैक्षिक", "مغامرات": "साहसिक", "سرعة": "गति", "رياضة": "खेल"
    },
    zh: {
        siteTitle: "有趣的游戏世界", settings: "设置", searchPlaceholder: "搜索...", all: "全部", favorites: "收藏", similarGames: "类似游戏", whyUs: "为什么选择我们？", whyUsDesc: "我们提供适合所有年龄段的最佳游戏！", forEveryone: "适合所有人", forEveryoneDesc: "适合儿童和青少年的安全有趣的游戏！", addGames: "添加游戏", addGamesDesc: "轻松添加新游戏！", copyright: "© 2023 有趣的游戏世界", shareTitle: "分享游戏", copyLink: "复制链接", copied: "已复制！", language: "语言", appearance: "外观", themeColor: "主题颜色", darkMode: "深色模式", lightMode: "浅色模式", noGames: "未找到游戏",
        "ذكاء": "益智", "سيارات": "赛车", "تعليمية": "教育", "مغامرات": "冒险", "سرعة": "速度", "رياضة": "体育"
    }
};

// تهيئة الموقع
function init() {
    // عرض الألعاب المضافة حديثاً في البداية (ترتيب تنازلي حسب الرقم التعريفي)
    games.sort((a, b) => b.id - a.id);

    // تفعيل تأثير Parallax للخلفية
    document.addEventListener("mousemove", (e) => {
        const bg = document.getElementById('parallax-bg');
        if(bg) {
            const x = (window.innerWidth - e.clientX * 5) / 100; // حركة عكسية بطيئة
            const y = (window.innerHeight - e.clientY * 5) / 100;
            bg.style.transform = `translate(${x}px, ${y}px)`;
        }
    });

    // التأكد من إخفاء مؤشر التحميل عند البدء
    if(gameLoader) gameLoader.style.display = 'none';

    loadFavorites();
    loadVisits(); // تحميل عدد الزيارات
    
    // تحميل اللغة المحفوظة
    let savedLang = localStorage.getItem('language');
    // Force reset if it was Arabic before
    if (!savedLang || savedLang === 'ar') {
        savedLang = 'en';
        localStorage.setItem('language', 'en');
    }
    setLanguage(savedLang);
    languageSelect.value = savedLang;

    // تحميل اللون المحفوظ
    const savedColor = localStorage.getItem('mainColor');
    if (savedColor) {
        document.documentElement.style.setProperty('--main-color', savedColor);
    }

    // تحميل المظهر المحفوظ
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
        updateThemeIcon(true);
    } else {
        updateThemeIcon(false);
    }

    renderCategories();
    renderGames();

    // التحقق من الرابط لفتح اللعبة مباشرة
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('game');
    if (gameId) {
        const game = games.find(g => g.id == gameId);
        if (game) {
            showGameViewer(game);
        }
    }
    

    // إضافة مستمعي الأحداث
    gameViewerClose.addEventListener("click", hideGameViewer);
    gameViewerFullscreen.addEventListener("click", toggleGameFullscreen);
    gameViewerReload.addEventListener("click", reloadGame);
    gameViewerShare.addEventListener("click", shareGame);
    sidebarToggle.addEventListener("click", toggleSidebars);
    
    // أحداث الإعدادات
    settingsBtn.addEventListener("click", () => settingsModal.style.display = 'flex');
    closeSettingsModal.addEventListener("click", () => settingsModal.style.display = 'none');
    themeToggleSettings.addEventListener("click", toggleTheme);
    headerThemeBtn.addEventListener("click", toggleTheme);
    settingsModal.addEventListener("click", (e) => {
        if (e.target === settingsModal) settingsModal.style.display = 'none';
    });

    // تغيير اللغة
    languageSelect.addEventListener("change", (e) => {
        setLanguage(e.target.value);
    });

    // تغيير اللون
    colorOptions.forEach(btn => {
        btn.addEventListener("click", () => setThemeColor(btn.dataset.color));
    });
    
    // أحداث نافذة المشاركة
    closeShareModal.addEventListener("click", () => shareModal.style.display = 'none');
    shareCopyBtn.addEventListener("click", copyLink);
    shareModal.addEventListener("click", (e) => {
        if (e.target === shareModal) shareModal.style.display = 'none';
    });
    
    // زر العودة للأعلى
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // تفعيل شريط البحث
    searchToggleBtn.addEventListener("click", () => {
        searchWrapper.classList.toggle("active");
        if (searchWrapper.classList.contains("active")) searchInput.focus();
    });

    // إغلاق شريط البحث عند الضغط خارجه
    document.addEventListener("click", (e) => {
        if (!searchWrapper.contains(e.target)) {
            searchWrapper.classList.remove("active");
        }
    });

    // البحث
    searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value.toLowerCase();
        renderGames();
    });

    // إغلاق عارض اللعبة بالضغط على ESC
    document.addEventListener("keydown", (e) => {
        // The computed style is more reliable for checking visibility
        if (e.key === "Escape" && window.getComputedStyle(gameViewer).display === "flex") {
            hideGameViewer();
        }
    });

    // خاصية Infinite Scroll
    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
            loadMoreGames();
        }
    });
}

// دالة تغيير اللغة
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    // تحديث اتجاه الصفحة
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    
    // تحديث النصوص
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // تحديث الـ placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    // تحديث التصنيفات والألعاب
    renderCategories();
    renderGames();
    updateThemeIcon(document.body.classList.contains('light-mode'));
}

// تبديل المظهر (ليلي/نهاري)
function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    updateThemeIcon(isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    playClickSound();
}

function updateThemeIcon(isLight) {
    const t = translations[currentLang];
    if (themeToggleSettings) {
        themeToggleSettings.innerHTML = isLight ? `<i class="fas fa-moon"></i> ${t.darkMode}` : `<i class="fas fa-sun"></i> ${t.lightMode}`;
        headerThemeBtn.innerHTML = isLight ? `<i class="fas fa-moon"></i>` : `<i class="fas fa-sun"></i>`;
    }
}

// تغيير لون الموقع
function setThemeColor(color) {
    document.documentElement.style.setProperty('--main-color', color);
    localStorage.setItem('mainColor', color);
    playClickSound();
}

// تحميل المفضلة من LocalStorage
function loadFavorites() {
    const stored = localStorage.getItem('myGameFavorites');
    if (stored) {
        favorites = JSON.parse(stored);
    }
}

// تحميل عدد الزيارات من LocalStorage
function loadVisits() {
    const stored = localStorage.getItem('myGameVisits');
    if (stored) {
        gameVisits = JSON.parse(stored);
    }
}

// زيادة عدد زيارات اللعبة
function incrementVisit(gameId) {
    gameVisits[gameId] = (gameVisits[gameId] || 0) + 1;
    localStorage.setItem('myGameVisits', JSON.stringify(gameVisits));
}

// حفظ المفضلة
function toggleFavorite(e, gameId) {
    e.stopPropagation(); // منع فتح اللعبة عند الضغط على القلب
    
    const index = favorites.indexOf(gameId);
    if (index === -1) {
        favorites.push(gameId);
    } else {
        favorites.splice(index, 1);
    }
    
    localStorage.setItem('myGameFavorites', JSON.stringify(favorites));
    renderGames(); // إعادة رسم الشبكة لتحديث حالة القلوب والترتيب
}

// عرض التصنيفات
function renderCategories() {
    // Clear dynamically added categories to avoid duplicates
    const dynamicBtns = categoriesContainer.querySelectorAll('.category-btn:not([data-category="all"]):not([data-category="favorites"])');
    dynamicBtns.forEach(btn => btn.remove());

    const uniqueCategories = [...new Set(games.map(game => game.category))];
    
    uniqueCategories.forEach(cat => {
        if(!cat) return;
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        // ترجمة اسم التصنيف إذا وجد
        btn.textContent = translations[currentLang][cat] || cat;
        btn.dataset.category = cat;
        categoriesContainer.appendChild(btn);
    });

    // استخدام تفويض الأحداث لتحسين الأداء
    categoriesContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('category-btn')) {
            const category = e.target.dataset.category;
            
            // تحديث الزر النشط
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            currentCategory = category;
            renderGames();
        }
    });
}

// عرض الألعاب في الشبكة
function renderGames() {
    // تفريغ الشبكة مع الاحتفاظ بالهيدر
    Array.from(gamesGrid.children).forEach(child => {
        if (child !== headerElement) child.remove();
    });
    if (headerElement && !gamesGrid.contains(headerElement)) gamesGrid.appendChild(headerElement);

    // 1. تصفية الألعاب
    let filteredGames = games.filter(game => {
        // تصفية حسب البحث
        const matchesSearch = game.title.toLowerCase().includes(searchQuery) || 
                              (game.description && game.description.toLowerCase().includes(searchQuery));
        
        // تصفية حسب التصنيف
        let matchesCategory = true;
        if (currentCategory === 'favorites') {
            matchesCategory = favorites.includes(game.id);
        } else if (currentCategory !== 'all') {
            matchesCategory = game.category === currentCategory;
        }
        
        return matchesSearch && matchesCategory;
    });

    // 2. ترتيب الألعاب
    filteredGames.sort((a, b) => {
        const isAFav = favorites.includes(a.id);
        const isBFav = favorites.includes(b.id);
        const visitsA = gameVisits[a.id] || 0;
        const visitsB = gameVisits[b.id] || 0;

        // المفضلة أولاً
        if (isAFav && !isBFav) return -1;
        if (!isAFav && isBFav) return 1;

        // ثم الأكثر زيارة
        if (visitsA !== visitsB) {
            return visitsB - visitsA;
        }

        // ثم حسب الترتيب الحالي (الذي تم خلطه عشوائياً)
        return 0;
    });

    currentlyVisibleGames = filteredGames;
    displayedCount = 0;

    if (filteredGames.length === 0) {
        const noGamesMsg = document.createElement('div');
        noGamesMsg.className = 'no-games-message';
        noGamesMsg.textContent = translations[currentLang].noGames;
        gamesGrid.appendChild(noGamesMsg);
        return;
    }

    loadMoreGames();
}

function loadMoreGames() {
    if (displayedCount >= currentlyVisibleGames.length) return;

    const batch = currentlyVisibleGames.slice(displayedCount, displayedCount + ITEMS_PER_PAGE);

    batch.forEach((game) => {
        const gameCard = document.createElement("div");
        gameCard.className = "game-card";
        
        const isFav = favorites.includes(game.id);
        // التحقق من وجود رابط صورة لتجنب المسارات الخاطئة
        const imagePath = game.image ? (game.image.startsWith('http') ? game.image : `games/${game.folder}/${game.image}`) : '';
        
        gameCard.innerHTML = `
            <div class="game-fallback-icon"><i class="fas fa-gamepad"></i></div>
            <img src="${imagePath}" alt="${game.title}" class="game-image" onerror="this.style.display='none'">
            <button class="card-favorite-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite(event, ${game.id})">
                <i class="${isFav ? 'fas' : 'far'} fa-heart"></i>
            </button>
            <div class="game-info">
                <h4>${game.title}</h4>
            </div>
        `;

        applyTiltEffect(gameCard);

        // عند الضغط على البطاقة، نفتح عارض اللعبة
        gameCard.addEventListener("click", (e) => {
            // التأكد من أن الضغط لم يكن على زر المفضلة
            if (!e.target.closest('.card-favorite-btn')) {
                playClickSound();
                showGameViewer(game);
            }
        });
        gamesGrid.appendChild(gameCard);
    });

    displayedCount += batch.length;
}

// عرض اللعبة في الواجهة المخصصة
function showGameViewer(game) {
    currentGame = game;
    
    // إظهار عارض اللعبة كجزء من الصفحة
    gameViewer.style.display = 'flex';

    // تحديث العنوان
    gameViewerTitle.textContent = game.title;

    // إظهار شريط التحميل
    gameLoader.style.display = 'block';

    // مسح المحتوى القديم وإنشاء iframe
    gameFrameWrapper.innerHTML = '';
    gameFrameWrapper.appendChild(gameLoader); // إعادة إضافة اللودر لأنه حُذف في السطر السابق

    const iframe = document.createElement("iframe");
    // التحقق مما إذا كان الرابط خارجياً (يبدأ بـ http) أو داخلياً
    iframe.src = game.file.startsWith('http') ? game.file : `games/${game.folder}/${game.file}`;
    iframe.allowFullscreen = true;
    
    // إخفاء شريط التحميل عند انتهاء تحميل اللعبة
    iframe.onload = () => {
        gameLoader.style.display = 'none';
    };
    
    gameFrameWrapper.appendChild(iframe);

    // زيادة عدد الزيارات وتحديث الواجهة
    incrementVisit(game.id);
    populateSideLists(game.id);
    renderSimilarGames(game); // عرض الألعاب المشابهة

    // التمرير تلقائياً إلى منطقة اللعبة لضمان رؤيتها
    gameViewer.scrollIntoView({ behavior: 'smooth' });

    // تحديث الرابط في المتصفح
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('game', game.id);
    window.history.pushState({}, '', newUrl);

    // إعادة ترتيب الألعاب في الشبكة في الخلفية لتعكس الزيارة الجديدة
    renderGames(); 
}

// إخفاء عارض اللعبة والعودة للشبكة
function hideGameViewer() {
    gameViewer.style.display = 'none';
    similarGamesSection.style.display = 'none'; // إخفاء قسم الألعاب المشابهة
    gameFrameWrapper.innerHTML = ''; // إيقاف اللعبة بإزالة الـ iframe

    // إزالة معلمات اللعبة من الرابط
    const newUrl = new URL(window.location);
    newUrl.searchParams.delete('game');
    window.history.pushState({}, '', newUrl);
    
    currentGame = null;
}

// ملء القوائم الجانبية بالألعاب الأخرى
function populateSideLists(currentGameId) {
    previousGamesList.innerHTML = '';
    nextGamesList.innerHTML = '';

    // فلترة اللعبة الحالية من القائمة
    const otherGames = currentlyVisibleGames.filter(g => g.id !== currentGameId);

    otherGames.forEach((game, index) => {
        const sideCard = document.createElement('div');
        sideCard.className = 'side-game-card';
        const imagePath = game.image ? (game.image.startsWith('http') ? game.image : `games/${game.folder}/${game.image}`) : '';

        sideCard.innerHTML = `
            <div class="game-fallback-icon"><i class="fas fa-gamepad"></i></div>
            <img src="${imagePath}" alt="${game.title}" onerror="this.style.display='none'">
            <h5>${game.title}</h5>
        `;
        
        // إضافة تأخير للحركة (Animation Delay)
        sideCard.style.animationDelay = `${index * 0.1}s`;
        
        sideCard.addEventListener('click', () => {
            playClickSound();
            showGameViewer(game);
        });

        // توزيع الألعاب على القائمتين اليمنى واليسرى
        if (index % 2 === 0) {
            previousGamesList.appendChild(sideCard);
        } else {
            nextGamesList.appendChild(sideCard);
        }
    });
}

// عرض الألعاب المشابهة
function renderSimilarGames(currentGame) {
    similarGamesGrid.innerHTML = '';
    
    // تصفية الألعاب: نفس التصنيف وليست اللعبة الحالية
    const similarGames = games.filter(g => g.category === currentGame.category && g.id !== currentGame.id);

    if (similarGames.length > 0) {
        similarGamesSection.style.display = 'block';
        
        similarGames.forEach(game => {
            const gameCard = document.createElement("div");
            gameCard.className = "game-card";
            const imagePath = game.image ? (game.image.startsWith('http') ? game.image : `games/${game.folder}/${game.image}`) : '';
            
            gameCard.innerHTML = `
                <div class="game-fallback-icon"><i class="fas fa-gamepad"></i></div>
                <img src="${imagePath}" alt="${game.title}" class="game-image" onerror="this.style.display='none'">
                <div class="game-info">
                    <h4>${game.title}</h4>
                </div>
            `;
            
            applyTiltEffect(gameCard);

            gameCard.addEventListener("click", () => {
                playClickSound();
                showGameViewer(game);
                window.scrollTo({ top: 0, behavior: 'smooth' }); // الصعود للأعلى عند اختيار لعبة
            });
            similarGamesGrid.appendChild(gameCard);
        });
    } else {
        similarGamesSection.style.display = 'none';
    }
}

// تبديل وضع ملء الشاشة للعبة (Iframe)
function toggleGameFullscreen() {
    // إنشاء iframe
    const iframe = gameFrameWrapper.querySelector('iframe');
    if (iframe) {
        if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
        } else if (iframe.webkitRequestFullscreen) { /* Safari */
            iframe.webkitRequestFullscreen();
        } else if (iframe.msRequestFullscreen) { /* IE11 */
            iframe.msRequestFullscreen();
        }
    }
}

// تبديل ظهور القوائم الجانبية
function toggleSidebars() {
    gameViewer.classList.toggle('sidebars-hidden');
}

// إعادة تشغيل اللعبة الحالية
function reloadGame() {
    const iframe = gameFrameWrapper.querySelector('iframe');
    if (iframe) {
        gameLoader.style.display = 'block'; // إظهار شريط التحميل
        iframe.src = iframe.src; // إعادة تحميل المصدر
    }
}

// مشاركة رابط اللعبة
function shareGame() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`استمتع بلعب ${currentGame ? currentGame.title : 'هذه اللعبة'} في عالم الألعاب الممتع!`);

    // تحديث روابط المشاركة
    document.getElementById('share-whatsapp').href = `https://wa.me/?text=${text}%20${url}`;
    document.getElementById('share-facebook').href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    document.getElementById('share-twitter').href = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;

    // إظهار النافذة
    shareModal.style.display = 'flex';
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        shareCopyBtn.innerHTML = `<i class="fas fa-check"></i> ${translations[currentLang].copied}`;
        setTimeout(() => shareCopyBtn.innerHTML = `<i class="fas fa-copy"></i> ${translations[currentLang].copyLink}`, 2000);
    });
}

// تهيئة الموقع عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", init);

// دالة تطبيق تأثير الإمالة ثلاثي الأبعاد
function applyTiltEffect(card) {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xRotation = -1 * ((y - rect.height/2) / (rect.height/2)) * 10;
        const yRotation = ((x - rect.width/2) / (rect.width/2)) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1.05)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
}
