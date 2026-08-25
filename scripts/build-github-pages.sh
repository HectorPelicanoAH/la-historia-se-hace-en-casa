#!/usr/bin/env bash
set -euo pipefail
repo="${GITHUB_REPOSITORY##*/}"
repo="${REPOSITORY_NAME:-${repo:-la-historia-se-hace-en-casa}}"
if [[ "$repo" == *.github.io ]]; then base=""; else base="/$repo"; fi
export STATIC_EXPORT=true NEXT_PUBLIC_BASE_PATH="$base"
if [[ -n "${GITHUB_REPOSITORY_OWNER:-}" ]]; then export NEXT_PUBLIC_SITE_URL="https://${GITHUB_REPOSITORY_OWNER}.github.io${base}"; fi
rm -rf out
npm run build
touch out/.nojekyll
echo "Exportación lista en out/ (basePath: ${base:-/})"
