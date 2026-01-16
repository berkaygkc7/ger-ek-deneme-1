#!/bin/bash
echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║          SERVISPARK TAŞIMACILIK WEB SİTESİ                   ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "Web sitesi tarayıcıda açılıyor..."
echo ""

# Get the directory where the script is located
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Try to open the browser
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open "$DIR/index.html"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    xdg-open "$DIR/index.html" 2>/dev/null || sensible-browser "$DIR/index.html" 2>/dev/null || firefox "$DIR/index.html" 2>/dev/null || google-chrome "$DIR/index.html" 2>/dev/null
fi

echo ""
echo "Site başarıyla açıldı!"
echo ""
