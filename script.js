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

// メンバーデータ
const memberData = {
    1: {
        name: '山田 太郎',
        role: 'ムードメーカー',
        image: 'images/member1.jpg',
        bio: `
            <p>いつも笑顔で元気をくれた太郎。一緒に過ごした日々は宝物です！</p>
            <br>
            <p>学生時代は常にクラスのムードメーカーとして、みんなを笑顔にしてくれました。困っている人がいれば真っ先に手を差し伸べる優しさと、どんな時でも前向きに物事を考えるポジ ティブさは、私たちみんなの憧れでした。</p>
            <br>
            <p>文化祭では実行委員として大活躍し、体育祭ではリレーのアンカーとして見事な走りを見せてくれました。これからも暮らしく、明るく前向きに頑張ってください！</p>
        `
    },
    2: {
        name: '佐藤 花子',
        role: '頼れるリーダー',
        image: 'images/member2.jpg',
        bio: `
            <p>優しくて頼りになる花子。困った時はいつも助けてくれました。</p>
            <br>
            <p>クラス委員として、みんなをまとめる抜群のリーダーシップを発揮してくれました。冷静な判断力と優しい気配りで、クラスをいつも良い雰囲気に保ってくれていました。</p>
        `
    },
    3: {
        name: '鈴木 健一',
        role: 'エンターテイナー',
        image: 'images/member3.jpg',
        bio: `
            <p>ムードメーカーの健一。君のおかげで毎日が楽しかった！</p>
            <br>
            <p>いつも周りを楽しませることを考えていた健一。休み時間の即興コントや、修学旅行でのサプライズ企画など、君がいることで毎日が特別なものになっていました。</p>
        `
    },
    4: {
        name: '田中 美咲',
        role: 'しっかり者',
        image: 'images/member4.jpg',
        bio: `
            <p>しっかり者の美咲。いつも的確なアドバイスをありがとう。</p>
            <br>
            <p>勉強も部活も全力で取り組む姿勢は、みんなの手本でした。困った時にはいつも親身になって相談に乗ってくれて、的確なアドバイスをしてくれました。</p>
        `
    },
    5: {
        name: '伊藤 翔太',
        role: '努力家',
        image: 'images/member5.jpg',
        bio: `
            <p>努力家の翔太。君の頑張りにいつも刺激をもらっていました。</p>
            <br>
            <p>どんなことにも真剣に取り組む姿勢は本当に素晴らしかったです。部活での練習、テスト勉強、文化祭の準備、すべてに全力で取り組む姿に、いつも刺激を受けていました。</p>
        `
    },
    6: {
        name: '渡辺 あかり',
        role: '太陽のような存在',
        image: 'images/member6.jpg',
        bio: `
            <p>明るいあかり。その笑顔に何度も救われました。</p>
            <br>
            <p>その名の通り、まるで太陽のように明るく温かいあかり。落ち込んでいる時、その笑顔と前向きな言葉に何度も元気をもらいました。</p>
        `
    },
    7: {
        name: '中村 大輝',
        role: 'クールガイ',
        image: 'images/member7.jpg',
        bio: `
            <p>クールな大輝。でも本当は優しいって知ってるよ！</p>
            <br>
            <p>普段はクールで寡黙だけど、実はとても優しくて思いやりのある大輝。困っている人を見つけると、さりげなく手を差し伸べる姿が印象的でした。</p>
        `
    },
    8: {
        name: '小林 さくら',
        role: '天真爛漫',
        image: 'images/member8.jpg',
        bio: `
            <p>天真爛漫なさくら。君といると自然と笑顔になれました。</p>
            <br>
            <p>いつも元気いっぱいで、周りを明るくしてくれたさくら。その純粋で真っ直ぐな性格は、みんなの癒しでした。一緒にいるだけで自然と笑顔になれる、そんな素敵な存在でした。</p>
        `
    }
};

document.addEventListener('DOMContentLoaded', () => {
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

    // モーダルを閉じる
    modalClose.addEventListener('click', closeMemberModal);

    // 背景をクリックして閉じる
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeMemberModal();
        }
    });

    // ESCキーで閉じる
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeMemberModal();
        }
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
console.log('- メンバー情報を編集: script.jsの memberData を編集');
console.log('- 動画を追加: index.htmlの動画セクションにYouTubeリンクまたは動画ファイルを追加');
console.log('- ログアウト: コンソールで logout() を実行');

// ========================================
// メンバーモーダルの開閉
// ========================================

// メンバーモーダルを開く関数
function openMemberModal(memberId) {
    const member = memberData[memberId];
    if (!member) return;

    const modal = document.getElementById('member-modal');
    const modalImage = document.getElementById('modal-member-image');
    const modalName = document.getElementById('modal-member-name');
    const modalRole = document.getElementById('modal-member-role');
    const modalBio = document.getElementById('modal-member-bio');

    // データを設定
    modalImage.src = member.image;
    modalImage.alt = member.name;
    modalName.textContent = member.name;
    modalRole.textContent = member.role;
    modalBio.innerHTML = member.bio;

    // モーダルを表示
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // スクロールを無効化
}

// メンバーモーダルを閉じる関数
function closeMemberModal() {
    const modal = document.getElementById('member-modal');
    modal.classList.remove('active');
    document.body.style.overflow = ''; // スクロールを有効化
}

