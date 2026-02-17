// ========================================
// 認証システム
// ========================================

// デフォルトのパスワード（必ず変更してください！）
const CORRECT_PASSWORD = 'memories2026';

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
authForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const enteredPassword = passwordInput.value;

    if (enteredPassword === CORRECT_PASSWORD) {
        // 認証成功
        sessionStorage.setItem(AUTH_KEY, 'true');
        authError.textContent = '';

        // スムーズな遷移
        authModal.style.animation = 'fadeOut 0.5s ease forwards';
        setTimeout(() => {
            showMainContent();
        }, 500);
    } else {
        // 認証失敗
        authError.textContent = 'パスワードが正しくありません';
        passwordInput.value = '';
        passwordInput.focus();

        // 入力フィールドを揺らすアニメーション
        passwordInput.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            passwordInput.style.animation = '';
        }, 500);
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

    // メンバーカードのアニメーション
    const memberCards = document.querySelectorAll('.member-card');
    memberCards.forEach((card, index) => {
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

document.addEventListener('DOMContentLoaded', () => {
    const memberCards = document.querySelectorAll('.member-card');

    memberCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            // ホバー時のサウンドエフェクトなど追加可能
            this.style.zIndex = '10';
        });

        card.addEventListener('mouseleave', function () {
            this.style.zIndex = '1';
        });

        // カードをクリックした時の動作
        card.addEventListener('click', function () {
            const memberId = this.getAttribute('data-member-id');
            if (memberId) {
                window.location.href = `member${memberId}.html`;
            }
        });
    });
});

// ========================================
// 動画プレイヤーのコントロール
// ========================================

// 動画がある場合の自動制御
document.querySelectorAll('video').forEach(video => {
    // ビデオが画面内に入ったら自動再生（オプション）
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 必要に応じて自動再生を有効化
                // entry.target.play();
            } else {
                entry.target.pause();
            }
        });
    }, { threshold: 0.5 });

    videoObserver.observe(video);
});

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
console.log('- メンバー情報を編集: index.htmlの各メンバーカードを編集');
console.log('- 動画を追加: index.htmlの動画セクションにYouTubeリンクまたは動画ファイルを追加');
console.log('- ログアウト: コンソールで logout() を実行');
