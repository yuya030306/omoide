# 🚀 GitHub連携セットアップスクリプト
# このスクリプトは、GitHubリポジトリを簡単にセットアップします

Write-Host "🎓 卒業メモリアルサイト - GitHub連携セットアップ" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

# Gitがインストールされているか確認
try {
    $gitVersion = git --version
    Write-Host "✅ Git がインストールされています: $gitVersion" -ForegroundColor Green
}
catch {
    Write-Host "❌ Git がインストールされていません" -ForegroundColor Red
    Write-Host "   https://git-scm.com/downloads からダウンロードしてください" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "📝 セットアップを開始します..." -ForegroundColor Yellow
Write-Host ""

# Step 1: Gitリポジトリの初期化
Write-Host "Step 1: Gitリポジトリの初期化" -ForegroundColor Cyan
if (Test-Path ".git") {
    Write-Host "⚠️  既にGitリポジトリが初期化されています" -ForegroundColor Yellow
}
else {
    git init
    Write-Host "✅ Gitリポジトリを初期化しました" -ForegroundColor Green
}

# Step 2: ユーザー情報の設定
Write-Host ""
Write-Host "Step 2: Git ユーザー情報の設定" -ForegroundColor Cyan

# 既存のユーザー情報を確認
$existingName = git config user.name 2>$null
$existingEmail = git config user.email 2>$null

if ($existingName -and $existingEmail) {
    Write-Host "既存のユーザー情報:" -ForegroundColor Yellow
    Write-Host "  名前: $existingName" -ForegroundColor White
    Write-Host "  Email: $existingEmail" -ForegroundColor White
    $useExisting = Read-Host "この情報を使用しますか？ (Y/n)"
    if ($useExisting -ne "n" -and $useExisting -ne "N") {
        git config user.name "$existingName"
        git config user.email "$existingEmail"
    }
    else {
        $userName = Read-Host "あなたの名前を入力してください"
        $userEmail = Read-Host "あなたのEmailを入力してください"
        git config user.name "$userName"
        git config user.email "$userEmail"
    }
}
else {
    $userName = Read-Host "あなたの名前を入力してください（例: Taro Yamada）"
    $userEmail = Read-Host "あなたのEmailを入力してください（例: taro@example.com）"
    git config user.name "$userName"
    git config user.email "$userEmail"
}

Write-Host "✅ ユーザー情報を設定しました" -ForegroundColor Green

# Step 3: ファイルをステージング
Write-Host ""
Write-Host "Step 3: ファイルをステージング" -ForegroundColor Cyan
git add .
Write-Host "✅ すべてのファイルをステージングしました" -ForegroundColor Green

# Step 4: 最初のコミット
Write-Host ""
Write-Host "Step 4: 最初のコミット" -ForegroundColor Cyan

# 既にコミットがあるか確認
$hasCommits = git log --oneline 2>$null
if ($hasCommits) {
    Write-Host "⚠️  既にコミットが存在します" -ForegroundColor Yellow
    $commitMessage = Read-Host "コミットメッセージを入力してください（空欄でスキップ）"
    if ($commitMessage) {
        git commit -m "$commitMessage"
        Write-Host "✅ コミットを作成しました" -ForegroundColor Green
    }
}
else {
    git commit -m "🎓 Initial commit: 卒業メモリアルサイト"
    Write-Host "✅ 最初のコミットを作成しました" -ForegroundColor Green
}

# Step 5: GitHubリポジトリのURL設定
Write-Host ""
Write-Host "Step 5: GitHubリポジトリの設定" -ForegroundColor Cyan
Write-Host ""
Write-Host "🔗 GitHubで新しいリポジトリを作成してください:" -ForegroundColor Yellow
Write-Host "   1. https://github.com/new にアクセス" -ForegroundColor White
Write-Host "   2. リポジトリ名: graduation-memories（任意）" -ForegroundColor White
Write-Host "   3. プライベートリポジトリを選択（推奨）" -ForegroundColor White
Write-Host "   4. 'Create repository' をクリック" -ForegroundColor White
Write-Host ""

$repoUrl = Read-Host "GitHubリポジトリのURL を入力してください（例: https://github.com/username/graduation-memories.git）"

# リモートが既に存在するか確認
$existingRemote = git remote get-url origin 2>$null
if ($existingRemote) {
    Write-Host "⚠️  既存のリモート: $existingRemote" -ForegroundColor Yellow
    $updateRemote = Read-Host "新しいURLに更新しますか？ (y/N)"
    if ($updateRemote -eq "y" -or $updateRemote -eq "Y") {
        git remote set-url origin $repoUrl
        Write-Host "✅ リモートURLを更新しました" -ForegroundColor Green
    }
}
else {
    git remote add origin $repoUrl
    Write-Host "✅ リモートリポジトリを追加しました" -ForegroundColor Green
}

# Step 6: ブランチ名を main に設定
Write-Host ""
Write-Host "Step 6: デフォルトブランチを main に設定" -ForegroundColor Cyan
$currentBranch = git branch --show-current
if ($currentBranch -ne "main") {
    git branch -M main
    Write-Host "✅ ブランチ名を main に変更しました" -ForegroundColor Green
}
else {
    Write-Host "✅ 既に main ブランチです" -ForegroundColor Green
}

# Step 7: GitHubにプッシュ
Write-Host ""
Write-Host "Step 7: GitHubにプッシュ" -ForegroundColor Cyan
Write-Host "⚠️  GitHubの認証情報を求められる場合があります" -ForegroundColor Yellow
Write-Host ""

$confirmPush = Read-Host "GitHubにプッシュしますか？ (Y/n)"
if ($confirmPush -ne "n" -and $confirmPush -ne "N") {
    try {
        git push -u origin main
        Write-Host ""
        Write-Host "✅ GitHubへのプッシュが完了しました！" -ForegroundColor Green
    }
    catch {
        Write-Host ""
        Write-Host "⚠️  プッシュに失敗しました" -ForegroundColor Yellow
        Write-Host "   手動でプッシュするには:" -ForegroundColor White
        Write-Host "   git push -u origin main" -ForegroundColor Cyan
    }
}

# 完了メッセージ
Write-Host ""
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "🎉 セットアップが完了しました！" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "次のステップ:" -ForegroundColor Yellow
Write-Host "1. Netlify にログイン: https://app.netlify.com" -ForegroundColor White
Write-Host "2. 既存のサイト 'chimerical-taiyaki-e672b0' を選択" -ForegroundColor White
Write-Host "3. Site settings → Build & deploy → Link to GitHub" -ForegroundColor White
Write-Host "4. リポジトリを選択して連携" -ForegroundColor White
Write-Host ""
Write-Host "詳細は GITHUB_SETUP.md を参照してください" -ForegroundColor Cyan
Write-Host ""
Write-Host "🚀 今後は 'git push' だけで自動デプロイされます！" -ForegroundColor Green
Write-Host ""
