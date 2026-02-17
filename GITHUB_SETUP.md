# 🔗 GitHubと連携してデプロイを自動化する

このガイドでは、GitHubリポジトリを作成し、Netlifyと連携して自動デプロイを設定する方法を説明します。

## 📝 前提条件

- [x] GitHubアカウント（無料で作成できます: https://github.com/join）
- [x] Gitがインストールされていること

Gitがインストールされているか確認:
```bash
git --version
```

インストールされていない場合: https://git-scm.com/downloads

---

## 🚀 セットアップ手順

### ステップ 1: Gitリポジトリの初期化

プロジェクトディレクトリで以下のコマンドを実行:

```bash
cd C:\Users\yuya\.gemini\antigravity\scratch\graduation-memories

# Gitリポジトリを初期化
git init

# すべてのファイルをステージング
git add .

# 最初のコミット
git commit -m "🎓 Initial commit: 卒業メモリアルサイト"
```

### ステップ 2: GitHubリポジトリの作成

1. **GitHub にログイン**: https://github.com
2. **新しいリポジトリを作成**:
   - 右上の「+」→「New repository」をクリック
   - リポジトリ名: `graduation-memories`（任意の名前でOK）
   - 説明: `卒業記念Webサイト`
   - **プライベートリポジトリ**を選択（🔒 セキュリティのため推奨）
   - 「Create repository」をクリック

### ステップ 3: GitHubにプッシュ

GitHubで作成されたリポジトリのURLを使用:

```bash
# リモートリポジトリを追加（あなたのリポジトリURLに置き換えてください）
git remote add origin https://github.com/YOUR_USERNAME/graduation-memories.git

# デフォルトブランチをmainに設定
git branch -M main

# GitHubにプッシュ
git push -u origin main
```

> **注意**: 初回プッシュ時にGitHubのユーザー名とパスワード（またはPersonal Access Token）が求められます。

### ステップ 4: Netlifyとの連携

#### オプション A: 既存のNetlifyサイトをGitHubと連携（推奨）

1. **Netlify にログイン**: https://app.netlify.com
2. **既存のサイトを選択**: `chimerical-taiyaki-e672b0`
3. **Site settings** → **Build & deploy** → **Link to GitHub**
4. リポジトリを選択: `graduation-memories`
5. ブランチ: `main`
6. ビルドコマンド: （空欄でOK - 静的サイト）
7. 公開ディレクトリ: `/`（ルートディレクトリ）
8. **Save** をクリック

#### オプション B: 新しいNetlifyサイトを作成

1. **Netlify にログイン**: https://app.netlify.com
2. **Add new site** → **Import an existing project**
3. **Deploy with GitHub** を選択
4. リポジトリ `graduation-memories` を選択
5. デプロイ設定:
   - Branch: `main`
   - Build command: （空欄）
   - Publish directory: `/`
6. **Deploy site** をクリック

---

## ✅ 完了！自動デプロイが有効になりました

これ以降、以下の流れで自動的にサイトが更新されます：

```mermaid
graph LR
    A[コード変更] --> B[git add .]
    B --> C[git commit -m "変更内容"]
    C --> D[git push]
    D --> E[GitHub]
    E --> F[Netlify が自動検知]
    F --> G[自動ビルド & デプロイ]
    G --> H[🎉 サイトが更新！]
```

---

## 📝 日常的な使い方

### コードを変更したら

```bash
# 変更をステージング
git add .

# コミット（変更内容を記録）
git commit -m "メンバー情報を更新"

# GitHubにプッシュ
git push

# → Netlifyが自動的にデプロイ！（1-2分で完了）
```

### デプロイ状況の確認

Netlify ダッシュボード: https://app.netlify.com/sites/chimerical-taiyaki-e672b0/deploys

- ✅ 緑色の「Published」= デプロイ成功
- 🔄 黄色の「Building」= ビルド中
- ❌ 赤色の「Failed」= エラー発生（ログを確認）

---

## 🛠️ 便利なGitコマンド

```bash
# 現在の状態を確認
git status

# 変更履歴を表示
git log --oneline

# 特定のコミットに戻す（慎重に！）
git reset --hard COMMIT_ID

# ブランチを作成して切り替え（新機能を試す時）
git checkout -b new-feature

# ブランチをマージ
git checkout main
git merge new-feature
```

---

## 🔒 セキュリティのヒント

### プライベートリポジトリを推奨

パスワードやメンバーの個人情報が含まれているため、**プライベートリポジトリ**を使用してください。

### .gitignoreの活用

機密情報をGitHubにアップロードしないように、`.gitignore`ファイルで除外できます（既に設定済み）:

```
# 機密情報
.env
secrets/
*.key
```

---

## 🎨 カスタムドメインの設定（オプション）

Netlifyでカスタムドメインを設定できます:

1. Netlify Site settings → Domain management
2. Add custom domain
3. ドメインを入力（例: `my-memories.com`）
4. DNSレコードを設定（Netlifyの指示に従う）

無料のサブドメインも利用可能:
- 例: `my-graduation-memories.netlify.app`

---

## 🆘 トラブルシューティング

### デプロイが失敗する

1. Netlify のデプロイログを確認
2. ファイルパスが正しいか確認（大文字小文字の区別）
3. すべてのファイルがプッシュされているか確認

### Gitの認証エラー

GitHub Personal Access Token を使用:
1. GitHub Settings → Developer settings → Personal access tokens
2. 新しいトークンを生成
3. パスワードの代わりにトークンを使用

### 変更が反映されない

```bash
# キャッシュをクリア
# Netlify: Deploys → Trigger deploy → Clear cache and deploy site
```

---

## 📚 参考リンク

- [GitHub Desktop](https://desktop.github.com/) - GUIでGitを使う（初心者向け）
- [Netlify Documentation](https://docs.netlify.com/)
- [Git Documentation](https://git-scm.com/doc)

---

**🎉 これで、コードを変更してプッシュするだけで、自動的にサイトが更新されます！**
