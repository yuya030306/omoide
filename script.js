// ========================================
// 認証システム
// ========================================

// デフォルトのパスワード（必ず変更してください！）
const CORRECT_PASSWORD = 'kichikichi';

// DOM要素
const authModal = document.getElementById('auth-modal');
const authForm = document.getElementById('auth-form');
const passwordInput = document.getElementById('password-input');
const authError = document.getElementById('auth-error');
const mainContent = document.getElementById('main-content');

// ローカルストレージのキー
const AUTH_KEY = 'graduation_memories_auth';

// ページ読み込み時の認証チェック
window.addEventListener('DOMContentLoaded', () => {
    // すでに認証済みかチェック
    const isAuthenticated = sessionStorage.getItem(AUTH_KEY);

    if (isAuthenticated === 'true') {
        showMainContent();
    }
});

// フォーム送信イベント
// フォーム送信イベント
authForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const enteredPassword = passwordInput.value;

    try {
        const decryptedMainBytes = CryptoJS.AES.decrypt(ENCRYPTED_PAYLOAD.mainContent, enteredPassword);
        const decryptedModalBytes = CryptoJS.AES.decrypt(ENCRYPTED_PAYLOAD.memberModal, enteredPassword);
        const decryptedDataBytes = CryptoJS.AES.decrypt(ENCRYPTED_PAYLOAD.memberData, enteredPassword);

        const decryptedMain = decryptedMainBytes.toString(CryptoJS.enc.Utf8);
        const decryptedModal = decryptedModalBytes.toString(CryptoJS.enc.Utf8);
        const decryptedDataString = decryptedDataBytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedMain || !decryptedModal || !decryptedDataString) {
            throw new Error('Incorrect password');
        }

        memberData = JSON.parse(decryptedDataString);
        mainContent.innerHTML = decryptedMain;
        
        const modalElement = document.getElementById('member-modal');
        if (modalElement) {
            modalElement.innerHTML = decryptedModal;
        }

        sessionStorage.setItem(AUTH_KEY, 'true');
        sessionStorage.setItem('temp_key', enteredPassword);

        authError.textContent = '';
        authModal.style.animation = 'fadeOut 0.5s ease forwards';

        initializeDynamicElements();

        setTimeout(() => {
            showMainContent();
        }, 500);
    } catch (error) {
        showAuthError();
    }
});

// 入力エラー時の揺れアニメーション
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: scale(0.95);
        }
    }
`;
document.head.appendChild(style);

function showMainContent() {
    authModal.classList.add('hidden');
    mainContent.classList.remove('hidden');

    // コンテンツのアニメーション
    const sections = document.querySelectorAll('.section, .hero');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        setTimeout(() => {
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // スクロールアニメーションの初期化
    initScrollAnimations();
}

// ========================================
// スムーズスクロール
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// スクロールアニメーション
// ========================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // メンバーカードのアニメーション & メンバーカラー適用
    const memberCards = document.querySelectorAll('.member-card');
    memberCards.forEach((card, index) => {
        // メンバーカラーをCSS変数でセット
        const memberId = card.dataset.memberId;
        if (memberId && memberData[memberId] && memberData[memberId].color) {
            card.style.setProperty('--member-color', memberData[memberId].color);
        }

        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // 動画カードのアニメーション
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// ========================================
// パララックス効果
// ========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    // ヘッダーの背景透明度調整
    const header = document.querySelector('.header');
    if (header) {
        const opacity = Math.min(scrolled / 300, 1);
        header.style.background = `rgba(10, 10, 15, ${0.5 + opacity * 0.3})`;
    }

    // ヒーローセクションのパララックス
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = `${1 - scrolled / 800}`;
    }
});

// ========================================
// メンバーカードのインタラクション
// ========================================

// メンバーデータ
// メンバーデータ (復号時に代入される)
let memberData = {};

// 初回読み込みでセッションから復号を試みる
document.addEventListener('DOMContentLoaded', () => {
    const isAuthenticated = sessionStorage.getItem(AUTH_KEY);
    const tempKey = sessionStorage.getItem('temp_key');

    if (isAuthenticated === 'true' && tempKey) {
        try {
            const decryptedMainBytes = CryptoJS.AES.decrypt(ENCRYPTED_PAYLOAD.mainContent, tempKey);
            const decryptedModalBytes = CryptoJS.AES.decrypt(ENCRYPTED_PAYLOAD.memberModal, tempKey);
            const decryptedDataBytes = CryptoJS.AES.decrypt(ENCRYPTED_PAYLOAD.memberData, tempKey);

            const decryptedMain = decryptedMainBytes.toString(CryptoJS.enc.Utf8);
            const decryptedModal = decryptedModalBytes.toString(CryptoJS.enc.Utf8);
            const decryptedDataString = decryptedDataBytes.toString(CryptoJS.enc.Utf8);

            if (decryptedMain && decryptedModal && decryptedDataString) {
                memberData = JSON.parse(decryptedDataString);
                mainContent.innerHTML = decryptedMain;
                const modalElement = document.getElementById('member-modal');
                if (modalElement) {
                    modalElement.innerHTML = decryptedModal;
                }

                initializeDynamicElements();
                showMainContent();
            } else {
                logout();
            }
        } catch (e) {
            logout();
        }
    } else if (isAuthenticated === 'true' && !tempKey) {
        logout();
    }
});

function initializeDynamicElements() {
    // メンバーカードのイベントリスナー設定
    const memberCards = document.querySelectorAll('.member-card');
    const modal = document.getElementById('member-modal');
    const modalClose = document.getElementById('modal-close');

    memberCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.zIndex = '10';
        });

        card.addEventListener('mouseleave', function () {
            this.style.zIndex = '1';
        });

        // カードをクリックした時にモーダルを表示
        card.addEventListener('click', function () {
            const memberId = this.getAttribute('data-member-id');
            if (memberId && memberData[memberId]) {
                openMemberModal(memberId);
            }
        });
    });

    if (modalClose) modalClose.addEventListener('click', closeMemberModal);

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeMemberModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeMemberModal();
        }
    });

    document.querySelectorAll('video').forEach(video => {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // entry.target.play();
                } else {
                    entry.target.pause();
                }
            });
        }, { threshold: 0.5 });

        videoObserver.observe(video);
    });
}

// ========================================
// ユーティリティ関数
// ========================================

// パスワード変更用の関数（開発者コンソールから実行可能）
function changePassword(newPassword) {
    console.log('新しいパスワードを設定するには、script.jsファイルの CORRECT_PASSWORD を直接編集してください。');
    console.log('セキュリティ上、実行時のパスワード変更はサポートしていません。');
}

// ログアウト機能
function logout() {
    sessionStorage.removeItem(AUTH_KEY);
    location.reload();
}

// デバッグ用：認証をバイパス（本番環境では削除してください）
// window.debugLogin = () => {
//     sessionStorage.setItem(AUTH_KEY, 'true');
//     showMainContent();
// };

console.log('🎓 卒業メモリアルサイトへようこそ！');
console.log('📝 カスタマイズのヒント:');
console.log('- パスワードを変更: script.jsの CORRECT_PASSWORD を編集');
console.log('- メンバー情報を編集: script.jsの memberData を編集');
console.log('- 動画を追加: index.htmlの動画セクションにYouTubeリンクまたは動画ファイルを追加');
console.log('- ログアウト: コンソールで logout() を実行');

// ========================================
// メンバーモーダルの開閉 & カルーセル
// ========================================

let carouselIndex = 0;
let carouselImages = [];
let carouselTimer = null;

function buildCarousel(images) {
    const track = document.getElementById('carousel-track');
    const dotsContainer = document.getElementById('carousel-dots');
    const carousel = track.closest('.carousel');

    // リセット
    track.innerHTML = '';
    dotsContainer.innerHTML = '';
    carouselIndex = 0;
    carouselImages = images;

    // 画像を生成
    images.forEach((src, i) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `画像 ${i + 1}`;
        track.appendChild(img);
    });

    // ドットを生成
    images.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    // 1枚のみの場合はボタン/ドットを隠す
    carousel.classList.toggle('single', images.length <= 1);

    updateCarousel();
}

function updateCarousel() {
    const track = document.getElementById('carousel-track');
    const dots = document.querySelectorAll('.carousel-dot');
    track.style.transform = `translateX(-${carouselIndex * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === carouselIndex));
}

function goToSlide(index) {
    carouselIndex = (index + carouselImages.length) % carouselImages.length;
    updateCarousel();
    resetAutoPlay();
}

function startAutoPlay() {
    if (carouselImages.length <= 1) return;
    carouselTimer = setInterval(() => {
        goToSlide(carouselIndex + 1);
    }, 3500);
}

function stopAutoPlay() {
    if (carouselTimer) { clearInterval(carouselTimer); carouselTimer = null; }
}

function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
}

// メンバーモーダルを開く関数
function openMemberModal(memberId) {
    const member = memberData[memberId];
    if (!member) return;

    const modal = document.getElementById('member-modal');
    const modalName = document.getElementById('modal-member-name');
    const modalRole = document.getElementById('modal-member-role');
    const modalBio = document.getElementById('modal-member-bio');

    // テキストを設定
    modalName.textContent = member.name;
    modalRole.textContent = member.role;
    modalBio.innerHTML = member.bio;

    // メンバー固有色をCSS変数でセット
    const content = document.querySelector('.member-modal-content');
    content.style.setProperty('--member-color', member.color || '#FFD700');

    // images フィールドが配列なら使用、文字列なら1枚として扱う
    const imgs = Array.isArray(member.images)
        ? member.images
        : (member.image ? [member.image] : []);

    buildCarousel(imgs);
    startAutoPlay();

    // 前後ボタン
    document.getElementById('carousel-prev').onclick = () => goToSlide(carouselIndex - 1);
    document.getElementById('carousel-next').onclick = () => goToSlide(carouselIndex + 1);

    // スワイプ操作（タッチ & マウス）
    const track = document.getElementById('carousel-track');
    let startX = null;
    const onStart = (e) => { startX = (e.touches ? e.touches[0] : e).clientX; };
    const onEnd = (e) => {
        if (startX === null) return;
        const endX = (e.changedTouches ? e.changedTouches[0] : e).clientX;
        const diff = startX - endX;
        if (Math.abs(diff) > 40) goToSlide(carouselIndex + (diff > 0 ? 1 : -1));
        startX = null;
    };
    track.addEventListener('touchstart', onStart, { passive: true });
    track.addEventListener('touchend', onEnd);
    track.addEventListener('mousedown', onStart);
    track.addEventListener('mouseup', onEnd);

    // モーダルを表示
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// メンバーモーダルを閉じる関数
function closeMemberModal() {
    const modal = document.getElementById('member-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    stopAutoPlay();
}

