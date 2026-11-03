#!/usr/bin/env bash
# Дизайн-аудит Cortex: поднимает статику с basePath /cortex и прогоняет детектор по всем маршрутам.
# Важно: проверять надо именно отрендеренные страницы — файловый скан не считает геометрию и даёт ложные срабатывания.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PORT="${PORT:-8912}"
OUT="$ROOT/out"

if [ ! -d "$OUT" ] || [ "${1:-}" = "--build" ]; then
  echo "Сборка…"
  (cd "$ROOT" && npm run build >/dev/null)
fi

SERVE="$(mktemp -d)"
trap 'kill "$PID" 2>/dev/null || true; rm -rf "$SERVE"' EXIT
ln -sfn "$OUT" "$SERVE/cortex"
python3 -m http.server "$PORT" --bind 127.0.0.1 --directory "$SERVE" >/dev/null 2>&1 &
PID=$!

for _ in $(seq 1 40); do
  curl -fsS "http://127.0.0.1:$PORT/cortex/" >/dev/null 2>&1 && break
  sleep 0.5
done

ROUTES="${ROUTES:-index about cases contact core experience industries ontology pilot platform products scenarios security solutions}"
total=0
for r in $ROUTES; do
  if [ "$r" = "index" ]; then path=""; else path="$r/"; fi
  url="http://127.0.0.1:$PORT/cortex/$path"
  n=$(npx --yes impeccable@latest detect "$url" --json 2>/dev/null | grep -c '"antipattern"' || true)
  printf "%-12s %s\n" "$r" "${n:-0}"
  total=$((total + ${n:-0}))
done

echo "---"
echo "всего находок: $total"
if [ "$total" -eq 0 ]; then
  exit 0
else
  exit 1
fi
