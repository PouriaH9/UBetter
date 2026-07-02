#!/usr/bin/env bash
# Purge large blobs from git history (run once, coordinate with team before force-push).
#
# Prerequisites:
#   brew install git-filter-repo   # or: pip install git-filter-repo
#
# Usage:
#   ./scripts/purge-git-large-blobs.sh
#   git push --force-with-lease origin <branch>   # after team agrees
#   # On VPS: re-clone instead of git pull

set -euo pipefail

cd "$(dirname "$0")/.."

if ! command -v git-filter-repo >/dev/null 2>&1; then
  echo "git-filter-repo is required. Install: brew install git-filter-repo"
  exit 1
fi

echo "This rewrites git history locally. Ensure all teammates are synced before force-push."
read -r -p "Continue? [y/N] " ans
[[ "${ans:-}" == "y" ]] || exit 0

git filter-repo --force \
  --path-glob 'public/original-content/*' --invert-paths \
  --path 'src/assets/Install_ChatGPT_Atlas.dmg' --invert-paths \
  --path 'src/assets/UBETTER DOC.pdf' --invert-paths \
  --strip-blobs-bigger-than 5M

echo "Done. Re-add remote if needed: git remote add origin <url>"
echo "Then: git push --force-with-lease origin <branch>"
