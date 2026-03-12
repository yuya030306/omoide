"""
グループ写真の背景を自動除去するスクリプト
使い方:
  pip install rembg pillow
  python remove_bg.py
"""
import os
from pathlib import Path

input_dir  = Path("images/group")
output_dir = Path("images/group_cut")
output_dir.mkdir(exist_ok=True)

try:
    from rembg import remove
    from PIL import Image
except ImportError:
    print("依存パッケージがありません。以下を実行してください:")
    print("  pip install rembg pillow")
    exit(1)

files = sorted([
    f for f in input_dir.iterdir()
    if f.suffix.lower() in (".jpg", ".jpeg", ".png", ".webp")
])

if not files:
    print("images/group/ に画像ファイルがありません")
    exit(1)

print(f"{len(files)} 枚の画像を処理します...\n")

for i, src in enumerate(files, 1):
    out_name = src.stem + "_cut.png"
    out_path = output_dir / out_name

    if out_path.exists():
        print(f"[{i}/{len(files)}] スキップ（既存）: {out_name}")
        continue

    print(f"[{i}/{len(files)}] 処理中: {src.name} → {out_name}")
    try:
        with open(src, "rb") as f:
            img_bytes = f.read()
        result = remove(img_bytes)
        with open(out_path, "wb") as f:
            f.write(result)
        print(f"           完了！")
    except Exception as e:
        print(f"           エラー: {e}")

print("\nすべて完了！images/group_cut/ を確認してください。")
