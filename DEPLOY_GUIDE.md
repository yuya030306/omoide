# Netlify手動デプロイガイド

Netlify CLIでエラーが発生したため、ブラウザUIを使った簡単なデプロイ方法をご案内します。

## 📦 デプロイ手順（2分で完了！）

### ステップ1: Netlifyにログイン

1. [Netlify](https://app.netlify.com/) を開く
2. すでにログイン済みのはずです（先ほど認証しました）

### ステップ2: プロジェクトフォルダをZIP化

プロジェクトフォルダの全ファイルを選択してZIPファイルを作成します。

**重要**: フォルダ自体ではなく、フォルダ内のファイルをZIPに含めてください。

#### Windows標準機能を使用:

1. `C:\Users\yuya\.gemini\antigravity\scratch\graduation-memories` フォルダを開く
2. **全てのファイルとフォルダを選択**（Ctrl+A）
   - index.html
   - styles.css
   - script.js
   - README.md
   - images フォルダ
   - videos フォルダ
3. 右クリック → "送る" → "圧縮 (zip 形式) フォルダー"
4. 名前を `graduation-memories.zip` に設定

または、以下のPowerShellコマンドで自動作成できます：

```powershell
Compress-Archive -Path C:\Users\yuya\.gemini\antigravity\scratch\graduation-memories\* -DestinationPath C:\Users\yuya\.gemini\antigravity\scratch\graduation-memories.zip -Force
```

### ステップ3: Netlifyにデプロイ

1. Netlifyのダッシュボードで **"Add new site"** → **"Deploy manually"** をクリック
2. 作成したZIPファイル（`graduation-memories.zip`）をドラッグ&ドロップ
3. アップロードが開始されます（数秒～数十秒）
4. デプロイ完了！

### ステップ4: 公開URLを取得

デプロイが完了すると、以下のような形式のURLが自動生成されます：

```
https://ランダムな文字列.netlify.app
```

例: `https://cheerful-unicorn-a1b2c3.netlify.app`

このURLを8人の仲間に共有すれば、パスワード（`memories2026`）を入力してサイトにアクセスできます！

### ステップ5（オプション）: サイト名を変更

1. Netlifyダッシュボードで **"Site settings"** をクリック
2. **"Change site name"** をクリック
3. 好きな名前を入力（例: `graduation-memories-2026`）
4. URLが変更されます → `https://graduation-memories-2026.netlify.app`

---

## 🎉 完了後

デプロイが完了したら：

1. **URLをブラウザで開いて確認**
2. **パスワード `memories2026` でログイン**
3. **8人の仲間にURLとパスワードを共有**

---

## 🔄 更新方法

写真や動画を追加・変更した後は：

1. 再度、全ファイルをZIP化
2. Netlifyダッシュボードで **"Deploys"** タブを開く
3. 新しいZIPファイルをドラッグ&ドロップ
4. 自動的に更新されます（URLは変わりません）

---

## 💡 ヒント

- **独自ドメイン**: Netlifyで独自ドメイン（例: `memories.example.com`）を設定可能（無料）
- **HTTPS**: 自動的にHTTPS対応されるので安全です
- **永続的**: 無料プランでも永久にホスティングされます
- **高速**: 世界中のCDNで配信されるので超高速です

---

**ZIP作成後、Netlifyにアップロードしてください！完了したら教えてください。**
