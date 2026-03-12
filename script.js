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
const memberData = {
    1: {
        name: '中山 柊弥',
        role: '謎多き努力家',
        color: '#008a5e',   /* 深緑（エメラルド） */
        images: [
            'images/syuya/syuya1.jpg',
            'images/syuya/syuya2.jpg',
            'images/syuya/syuya3.jpg',
            'images/syuya/syuya4.jpg',
            'images/syuya/syuya5.jpg',
        ],
        bio: `
            <p>マジで何考えてるか読めない瞬間がある男。でもノリの良さはピカイチで、場を回すのが上手い！</p>
            <br>
            <p>気配りの鬼でめちゃくちゃ優しいし、協調性ばっちり！<p>
            <p>なのに言うべきことははっきり主張してくるから、チームに絶対一人は欲しいタイプ！</p>
            <br>
            <p>表ではサラッとこなしてる感出してるけど、裏でガッツリ努力してるのバレてるからな。おまけに彼女もすごく大切にするんだよなこいつ。</p>
        `
    },
    2: {
        name: '立花 信幸',
        role: 'ハイスペック金欠モテ男',
        color: '#ff69b4',   /* ホットピンク */
        images: [
            'images/nobu/nobu1.jpg',
            'images/nobu/nobu2.jpg',
            'images/nobu/nobu3.jpg',
            'images/nobu/nobu4.jpg',
            'images/nobu/nobu5.jpg',
        ],
        bio: `
            <p>基本的にいつもふざけてるけど、運動神経抜群で男女問わずモテモテなズルい男。マジで頼むから浮気症もここで卒業してくれよな！</p>
            <br>
            <p>普段はおっちょこちょいで抜けてるところもあるくせに、やるべきことはきっちりこなすからタチが悪い。根はめちゃくちゃ優しくて、人の意見を頭ごなしに否定せず、1回ちゃんと飲み込んでくれる器のデカさを持ってる。</p>
            <br>
            <p>それだけハイスペックなのに、なぜか常に「金がない」のが信幸クオリティ。なんだかんだ周りから愛される、憎めない最高の男なんよ。</p>
        `
    },
    3: {
        name: '岡本 泉里',
        role: '愛に生きるスマートイケメン',
        color: '#800020',   /* 深赤（ワインレッド） */
        images: [
            'images/senri/senri1.jpg',
            'images/senri/senri2.jpg',
            'images/senri/senri3.jpg',
            'images/senri/senri4.jpg',
            'images/senri/senri5.png',
        ],
        bio: `
            <p>顔もかっこいいし優しいからそりゃモテる。しかも彼女のことはとんでもなく大切にする一途な男。仲良くなると実はめちゃくちゃ明るくて最高のやつ！</p>
            <br>
            <p>チームが行き詰まった時に「こうすればいいんじゃない？」ってスッと解決策を出してくれる救世主。何事もうまく立ち回って生きていくタイプだけど、根はバチバチの負けず嫌いっていうギャップもち！</p>
            <br>
            <p>表ではスマートに見せてるけど、裏でしっかりやってるのがダルい。完璧そうに見えてどこか放っておけない、人間味あふれる自慢のチームメイト！</p>
        `
    },
    4: {
        name: '佐藤 大生',
        role: 'ほっとけない愛されマスコット',
        color: '#f9a825',   /* 鮮黄（サンフラワー） */
        images: [
            'images/hiroki/hiroki1.jpg',
            'images/hiroki/hiroki2.jpg',
            'images/hiroki/hiroki3.jpg',
            'images/hiroki/hiroki4.jpg',
            'images/hiroki/hiroki5.jpg',
        ],
        bio: `
            <p>超あわてんぼうな上に遅刻が止まらない。でもマジでほっとけない可愛さがあって、とにかく友達が多くて誰からも愛されるマスコットみたいなヤツ！</p>
            <br>
            <p>実は周りからの視線を気にするタイプで、優しくて配慮も欠かさない。でもただ空気を読むだけじゃなくて、「これどう？」っていろんな提案をしてくれるし、自分の意見もしっかり伝えてくれる芯の強さも持ってる。</p>
            <br>
            <p>そして何より、絶妙なタイミングでクソおもろいことをぶっこんでくる笑いのセンスが最高。カッコいいのにどこか抜けてて憎めない、一緒にいると楽しいし笑顔になれる自慢の友達！</p>
        `
    },
    5: {
        name: '中橋 哉斗',
        role: 'ミステリアスな天才',
        color: '#9966cc',   /* アメジストパープル（紫） */
        images: [
            'images/kana/kana1.jpg',
            'images/kana/kana2.jpg',
            'images/kana/kana3.jpg',
            'images/kana/kana4.jpg',
            'images/kana/kana5.jpg',
        ],
        bio: `
            <p>プライベートは謎めいたことが多いミステリアスな男。でも根はめちゃくちゃ真面目で、ただの遊びの待ち合わせなのに、きっちり10分前には到着して待ってるような律儀なヤツ！</p>
            <br>
            <p>普段は物静かで、自認コツコツと物事を進める男。人の意見を決して頭ごなしに否定しない優しさがあるけど、決して周りに流されてるわけじゃなく、自分の中にブレない「軸」をしっかり持ってる。</p>
            <br>
            <p>そして何より、どれだけ周りから「かなTO」ってイジられてもニコニコ笑って過ごせる、天才的な心の余裕の持ち主。謎は多いけど、とにかくかなTO、最高の存在！</p>
        `
    },
    6: {
        name: '荻野 新',
        role: '圧倒的ストイック',
        color: '#f67e00',   /* 画像に合わせたオレンジ */
        images: [
            'images/ogi/ogi1.jpg',
            'images/ogi/ogi2.jpg',
            'images/ogi/ogi3.jpg',
            'images/ogi/ogi4.jpg',
            'images/ogi/ogi5.jpg',
        ],
        bio: `
            <p>とにかく明るくて、何事にもマジで真面目。タフでストイックだから、どんなにしんどい状況でも気合いで乗り切るバケモノ級のメンタル所持者。</p>
            <br>
            <p>人の気持ちをちゃんと汲み取れる優しさがある反面、教授にブチギレられるほどバチバチに意見をぶつけちゃう激熱な一面もあるんだよね～～</p>
            <br>
            <p>俺らのことが好きすぎるあまり、誘われたら他の用事をすぐ飛ばしてきちゃうフットワークの軽さ。なのに、なぜかいつも貧乏くじを引かされる「圧倒的不憫キャラ」なのがおぎなんよね。いつも俺らを支えてくれる最高の仲間！</p>
        `
    },
    7: {
        name: '塚越 涼介',
        role: '頼れるおじいちゃん',
        color: '#ff6868ff',   /* 明るめのグレー（ライトスチールブルー） */
        images: [
            'images/ryou/ryou1.jpg',
            'images/ryou/ryou2.jpg',
            'images/ryou/ryou3.jpg',
            'images/ryou/ryou4.jpg',
            'images/ryou/ryou5.jpg',
        ],
        bio: `
            <p>とにかく優しくて、これまでマジで何事も器用にうまく成し遂げてきたハイスペック男。協調性抜群でノリもめちゃくちゃ良いのに、根はしっかり真面目っていう非の打ち所がない性格、えぐい</p>
            <br>
            <p>でも、趣味が「散歩」や「麻雀」と、中身は完全に落ち着き払ったおじいちゃん。その老成した視点のおかげか、みんながスルーしてしまうような意外なポイントや細かな変化に一番に気づいてくれる鋭さを持ってるのよ</p>
            <br>
            <p>そして何より、とにかく友情に厚くてめちゃくちゃ仲間思い。何でもこなせる頼りがいと、安心感を兼ね備えた、チームに絶対欠かせない精神的支柱！</p>
        `
    },
    8: {
        name: '林 祐哉',
        role: '全方位愛されお兄ちゃん',
        color: '#084ef0ff',
        images: [
            'images/yuya/yuya1.jpg',
            'images/yuya/yuya2.jpg',
            'images/yuya/yuya3.jpg',
            'images/yuya/yuya4.jpg',
            'images/yuya/yuya5.jpg',
        ],
        bio: `
            <p>高身長でスタイル抜群、さらに鬼のような行動力まで持ってるモテるハイスペック男子。とにかく面倒見が良くて割と何でも器用にこなせちゃう。でも、女の子を見る目だけはミジンコレベルに壊滅的、そこだけはマジでこれから頑張って養っていってほしい！</p>
            <br>
            <p>実はたまに強がって、弱みを見せないように踏ん張ってることがある。本人は隠してるつもりかもしれないけど、そんなに一人で抱え込まなくてもいいのに、つい格好つけちゃうところも含めて応援したくなる存在。</p>
            <br>
            <p>これからはもっと情けない姿もさらけ出してほしいし、そんな時は全力で笑って受け止めてあげる準備はできてます。カッコいいのにどこか放っておけない、一緒にいるとこっちまで笑顔になれる最高に魅力的なやつ！</p>
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

