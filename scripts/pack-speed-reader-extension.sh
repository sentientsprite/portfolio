#!/usr/bin/env bash
# Pack the browser extension into public/downloads for GitHub Pages.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/extensions/speed-reader"
OUT="$ROOT/public/downloads/rk-speed-reader.zip"
mkdir -p "$ROOT/public/downloads"
rm -f "$OUT"
(
  cd "$SRC"
  zip -r "$OUT" INSTALL.txt extension -x "*.DS_Store"
)
echo "Wrote public/downloads/rk-speed-reader.zip"
