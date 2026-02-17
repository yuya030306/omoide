# 🎓 卒業メモリアルWebサイト

8人の仲間との学生時代の思い出を永久に保存する、美しくセキュアなメモリアルWebサイトです。

## ✨ 機能

- 🔐 **パスワード認証** - セキュアにアクセスを制限
- 👥 **8人のメンバーセクション** - 各メンバーの写真と思い出を表示
- 🎥 **動画ギャラリー** - YouTube動画やローカル動画を埋め込み可能
- 🎨 **モダンなデザイン** - グラデーション、グラスモーフィズム、スムーズなアニメーション
- 📱 **完全レスポンシブ** - PC、タブレット、スマートフォンで快適に閲覧
- 🌙 **ダークモード** - 目に優しいダークテーマ

## 🌐 サイトURL

**Live Site**: [https://chimerical-taiyaki-e672b0.netlify.app](https://chimerical-taiyaki-e672b0.netlify.app)

**パスワード**: `memories2026`

## 🚀 デプロイ情報

- **ホスティング**: Netlify
- **デプロイ日**: 2026年2月17日
- **アクセス方法**:
  1. 上記URLにアクセス
  2. パスワード「memories2026」を入力してログイン
  3. 卒業メモリーをお楽しみください！

---

## 🎨 サイト構成

### 1. ローカルで開く

```bash
# プロジェクトディレクトリに移動
cd C:\Users\yuya\.gemini\antigravity\scratch\graduation-memories

# index.htmlをブラウザで開く
# ダブルクリックで開くか、次のコマンドを実行
start index.html
```

### 2. デフォルトパスワード

初期パスワード: **memories2026**

⚠️ **重要**: 公開前に必ずパスワードを変更してください！

## 🔧 カスタマイズ方法

### パスワードの変更

1. `script.js` を開く
2. 2行目の `CORRECT_PASSWORD` を変更:

```javascript
const CORRECT_PASSWORD = 'あなたの新しいパスワード';
```

### メンバー情報の編集

1. `index.html` を開く
2. メンバーカードセクションを編集:

```html
<div class="member-card">
    <div class="member-image-wrapper">
        <img src="images/member1.jpg" alt="メンバー名">
    </div>
    <div class="member-info">
        <h3 class="member-name">メンバー名</h3>
        <p class="member-message">メッセージ</p>
    </div>
</div>
```

### 写真の追加

1. メンバーの写真を `images/` フォルダに配置
2. ファイル名: `member1.jpg`, `member2.jpg`, ... `member8.jpg`
3. 推奨サイズ: 800x800px（正方形）

### 動画の追加

#### YouTube動画の場合:

```html
<div class="video-wrapper">
    <iframe src="https://www.youtube.com/embed/VIDEO_ID" 
            frameborder="0" 
            allowfullscreen>
    </iframe>
</div>
```

#### ローカル動画の場合:

1. 動画を `videos/` フォルダに配置
2. HTMLを編集:

```html
<div class="video-wrapper">
    <video controls>
        <source src="videos/video1.mp4" type="video/mp4">
    </video>
</div>
```

### メッセージの編集

`index.html` のメッセージセクションを編集して、独自のメッセージを追加できます。

## 🌐 GitHub連携と自動デプロイ

### 🚀 簡単セットアップ（推奨）

**自動化スクリプトを使用**:

```bash
# GitHubリポジトリのセットアップを自動化
.\setup-github.ps1

# その後、変更を簡単にプッシュ
.\quick-push.ps1
```

これにより、コードを変更して `quick-push.ps1` を実行するだけで、自動的にNetlifyにデプロイされます！

詳細な手順は [GITHUB_SETUP.md](./GITHUB_SETUP.md) を参照してください。

---

## 🌐 永続的なホスティング（無料）

### GitHub + Netlify（推奨 - 自動デプロイ）

**メリット**:
- ✅ GitHubにプッシュすると自動デプロイ
- ✅ バージョン管理で変更履歴を追跡
- ✅ 複数人での共同編集が可能

**セットアップ**:
1. `setup-github.ps1` を実行してGitHubリポジトリを作成
2. [Netlify](https://app.netlify.com/)で既存サイトとGitHubを連携
3. 今後は `git push` だけで自動デプロイ！

### GitHub Pagesでの公開

1. GitHubアカウントを作成（無料）
2. 新しいリポジトリを作成
3. ファイルをアップロード
4. Settings → Pages → Source を "main" ブランチに設定
5. 公開されたURLにアクセス: `https://username.github.io/repository-name/`

### Netlify 手動デプロイ

1. [Netlify](https://www.netlify.com/)にアクセス（無料）
2. "Add new site" → "Deploy manually"
3. プロジェクトフォルダをドラッグ&ドロップ
4. 自動的にURLが生成されます

### Vercelでの公開

1. [Vercel](https://vercel.com/)にアクセス（無料）
2. "New Project" をクリック
3. プロジェクトフォルダをアップロード
4. 自動的にデプロイされます

## 🔒 セキュリティについて

**現在の実装**:
- クライアントサイドのパスワード保護
- セッションストレージを使用した認証状態の管理

**注意事項**:
- この方法は基本的な保護です
- HTMLソースコードを見ることでコンテンツにアクセスできる可能性があります
- より強固なセキュリティが必要な場合は、Firebase AuthやAuth0などのサーバーサイド認証を検討してください

**推奨事項**:
- パスワードは信頼できる仲間だけに共有
- 定期的にパスワードを変更
- 個人情報や機密情報は掲載しない

## 📁 ファイル構造

```
graduation-memories/
├── index.html          # メインHTMLファイル
├── styles.css          # スタイルシート
├── script.js           # JavaScriptファイル
├── README.md           # このファイル
├── images/             # 写真フォルダ
│   ├── member1.jpg
│   ├── member2.jpg
│   └── ...
└── videos/             # 動画フォルダ
    ├── video1.mp4
    └── ...
```

## 💡 ヒント

- **ログアウト**: ブラウザのコンソールで `logout()` を実行
- **デバッグ**: F12キーで開発者ツールを開く
- **画像形式**: JPG、PNG、WebPに対応
- **動画形式**: MP4、WebMに対応

## 🎨 デザインのカスタマイズ

`styles.css` の `:root` セクションで色やスペーシングを変更できます:

```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --spacing-lg: 4rem;
    /* その他の変数... */
}
```

## 📞 サポート

質問や問題がある場合は、以下を確認してください:
- ブラウザのコンソールでエラーメッセージを確認
- ファイルパスが正しいか確認
- 画像/動画ファイルが正しいフォルダにあるか確認

## 📝 ライセンス

このプロジェクトは個人使用のために作成されています。
自由にカスタマイズして使用してください。

---

**Made with ❤️ for our precious memories 🎓**
