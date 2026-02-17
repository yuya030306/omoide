# 🚀 クイックプッシュスクリプト
# 変更をGitHubにプッシュして自動デプロイするための簡単なスクリプト

param(
    [string]$Message = ""
)

Write-Host "🚀 卒業メモリアルサイト - クイックプッシュ" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

# Gitリポジトリか確認
if (-not (Test-Path ".git")) {
    Write-Host "❌ Gitリポジトリが初期化されていません" -ForegroundColor Red
    Write-Host "   先に './setup-github.ps1' を実行してください" -ForegroundColor Yellow
    exit 1
}

# 変更をチェック
Write-Host "📝 変更をチェック中..." -ForegroundColor Yellow
$status = git status --short

if (-not $status) {
    Write-Host "ℹ️  変更はありません" -ForegroundColor Blue
    exit 0
}

Write-Host ""
Write-Host "変更されたファイル:" -ForegroundColor Cyan
git status --short
Write-Host ""

# コミットメッセージ
if (-not $Message) {
    $Message = Read-Host "コミットメッセージを入力してください（例: メンバー情報を更新）"
    if (-not $Message) {
        $Message = "Update: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
    }
}

# ステージング
Write-Host "📦 ファイルをステージング中..." -ForegroundColor Yellow
git add .

# コミット
Write-Host "💾 コミット中..." -ForegroundColor Yellow
git commit -m "$Message"

# プッシュ
Write-Host "🚀 GitHubにプッシュ中..." -ForegroundColor Yellow
Write-Host ""

try {
    git push
    Write-Host ""
    Write-Host "✅ プッシュが完了しました！" -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 Netlify が自動的にデプロイを開始します（1-2分で完了）" -ForegroundColor Cyan
    Write-Host "   デプロイ状況: https://app.netlify.com/sites/chimerical-taiyaki-e672b0/deploys" -ForegroundColor White
    Write-Host "   サイトURL: https://chimerical-taiyaki-e672b0.netlify.app" -ForegroundColor White
    Write-Host ""
}
catch {
    Write-Host ""
    Write-Host "❌ プッシュに失敗しました" -ForegroundColor Red
    Write-Host "エラー: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "トラブルシューティング:" -ForegroundColor Yellow
    Write-Host "1. インターネット接続を確認" -ForegroundColor White
    Write-Host "2. GitHub認証情報を確認" -ForegroundColor White
    Write-Host "3. リモートリポジトリのURLを確認: git remote -v" -ForegroundColor White
    exit 1
}
