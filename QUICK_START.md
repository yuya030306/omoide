# 🎯 GitHub連携とデプロイ自動化 - 使い方ガイド

## 📖 概要

このプロジェクトは、GitHubと連携してNetlifyに自動デプロイできるように設定されています。

## 🚀 クイックスタート

### 1️⃣ 初回セットアップ（1回だけ）

PowerShellで以下を実行:

```powershell
cd C:\Users\yuya\.gemini\antigravity\scratch\graduation-memories
.\setup-github.ps1
```

スクリプトが以下を自動的に実行します:
- ✅ Gitリポジトリの初期化
- ✅ ユーザー情報の設定
- ✅ ファイルのコミット
- ✅ GitHubリポジトリとの連携

### 2️⃣ 日常的な使い方

ファイルを編集したら、PowerShellで:

```powershell
.\quick-push.ps1
```

コミットメッセージを入力すると:
1. 変更をステージング
2. コミット
3. GitHubにプッシュ
4. **Netlifyが自動デプロイ開始！（1-2分で完了）**

## 🔄 ワークフロー図

```
┌─────────────────┐
│  コードを編集    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ quick-push.ps1  │
│  を実行         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ コミットメッセージ│
│  を入力         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  GitHub に      │
│  自動プッシュ    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Netlify が     │
│  自動検知       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  自動ビルド＆   │
│  デプロイ       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 🎉 サイトが     │
│   更新完了！    │
└─────────────────┘
```

## 📝 例：メンバー情報を更新する場合

1. `member1.html` を編集
2. PowerShellで `.\quick-push.ps1` を実行
3. 「メンバー1の情報を更新」と入力
4. 1-2分待つ
5. https://kichikichi-22.netlify.app で確認！

## 🔗 関連リンク

- **サイトURL**: https://kichikichi-22.netlify.app
- **Netlifyダッシュボード**: https://app.netlify.com/sites/kichikichi-22/deploys
- **詳細ガイド**: [GITHUB_SETUP.md](./GITHUB_SETUP.md)

## ⚠️ 注意事項

1. **初回セットアップ時**:
   - GitHubアカウントが必要です
   - GitHubでプライベートリポジトリを作成してください（セキュリティのため）

2. **Netlifyとの連携**:
   - 初回セットアップ後、Netlifyで1回だけGitHubリポジトリと連携する必要があります
   - 詳細は [GITHUB_SETUP.md](./GITHUB_SETUP.md) を参照

3. **プッシュエラー時**:
   - インターネット接続を確認
   - GitHub認証情報を確認
   - `git remote -v` でリモートURLを確認

## 🎨 カスタマイズ

### コミットメッセージをスキップ

```powershell
.\quick-push.ps1 -Message "メンバー情報を更新"
```

### 手動でGitコマンドを使う

```powershell
git add .
git commit -m "変更内容"
git push
```

## 🆘 トラブルシューティング

### デプロイが反映されない
- Netlifyダッシュボードでデプロイ状況を確認
- キャッシュをクリア: Netlify → Clear cache and deploy

### プッシュができない
- `git status` で状態を確認
- `git remote -v` でリモートURLを確認
- GitHub Personal Access Token の設定を確認

### Gitのエラーが出る
- `setup-github.ps1` を再実行
- `GITHUB_SETUP.md` の詳細手順を参照

---

**💡 ヒント**: 初回セットアップ後は、`.\quick-push.ps1` だけで簡単にデプロイできます！
