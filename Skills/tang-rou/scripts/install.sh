#!/usr/bin/env bash
# Instala a skill tang-rou. Uso: install.sh [claude,agents,opencode] [--project] [--hooks claude,codex,opencode]
#   --hooks  liga os hooks (persona + memória) nos agentes listados; ver platforms/INSTALL.md.
set -euo pipefail
SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGETS="claude,agents"; PROJECT=0; HOOKS=""
while [ $# -gt 0 ]; do
  case "$1" in
    --project) PROJECT=1 ;;
    --hooks) HOOKS="${2:-}"; shift ;;
    *) TARGETS="$1" ;;
  esac
  shift
done
if [ "$PROJECT" = 1 ]; then BASE="$PWD"; else BASE="$HOME"; fi
dest_for() {
  case "$1" in
    claude)   echo "$BASE/.claude/skills" ;;
    agents)   echo "$BASE/.agents/skills" ;;
    opencode) [ "$PROJECT" = 1 ] && echo "$BASE/.opencode/skills" || echo "$BASE/.config/opencode/skills" ;;
    *) echo "alvo desconhecido: $1" >&2; exit 1 ;;
  esac
}
FIRST=""
IFS=',' read -ra T <<< "$TARGETS"
for t in "${T[@]}"; do
  d="$(dest_for "$t")/tang-rou"
  mkdir -p "$d"
  cp -R "$SRC/." "$d/"
  rm -rf "$d/.git" 2>/dev/null || true
  [ -n "$FIRST" ] || FIRST="$d"
  echo "instalado em $d"
done
if [ "$PROJECT" = 1 ]; then
  mkdir -p "$BASE/.claude/agents"
  cp -R "$SRC/platforms/claude-code/.claude/agents/." "$BASE/.claude/agents/"
  echo "subagentes copiados para $BASE/.claude/agents"
fi
# Os hooks apontam para a cópia instalada (o primeiro destino), não para a pasta de origem.
if [ -n "$HOOKS" ]; then
  bash "$FIRST/scripts/install-hooks.sh" "$HOOKS" $([ "$PROJECT" = 1 ] && echo --project)
fi
