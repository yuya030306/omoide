# 卒業メモリーサイト - 簡単デプロイスクリプト
# 使い方: PowerShellでこのスクリプトを実行するだけ

Write-Host "🎓 卒業メモリーサイト - デプロイ開始" -ForegroundColor Yellow
Write-Host ""

# 1. ZIPファイルを作成
Write-Host "📦 ZIPファイルを作成中..." -ForegroundColor Cyan
$sourceDir = "C:\Users\yuya\.gemini\antigravity\scratch\graduation-memories"
$zipPath = "C:\Users\yuya\.gemini\antigravity\scratch\graduation-memories.zip"

# 古いZIPファイルがあれば削除
if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

# 新しいZIPファイルを作成
Compress-Archive -Path "$sourceDir\*" -DestinationPath $zipPath -Force

Write-Host "✅ ZIPファイル作成完了" -ForegroundColor Green
Write-Host ""

# 2. Netlifyを開く
Write-Host "🌐 Netlifyを開いています..." -ForegroundColor Cyan
Start-Process "https://app.netlify.com/sites/chimerical-taiyaki-e672b0/deploys"

# 3. ZIPファイルの場所を開く
Write-Host "📂 ZIPファイルの場所を開いています..." -ForegroundColor Cyan
explorer /select,"$zipPath"

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Yellow
Write-Host "✨ 準備完了！" -ForegroundColor Green
Write-Host ""
Write-Host "次の手順:" -ForegroundColor White
Write-Host "  1. 開いたNetlifyページで 'graduation-memories.zip' をドラッグ&ドロップ" -ForegroundColor White
Write-Host "  2. デプロイ完了を待つ（数秒～数十秒）" -ForegroundColor White
Write-Host ""
Write-Host "サイトURL: https://chimerical-taiyaki-e672b0.netlify.app" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Yellow
