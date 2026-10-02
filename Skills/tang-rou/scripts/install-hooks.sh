#!/usr/bin/env bash
# Liga os hooks da TANG-ROU em Claude Code, Codex e/ou OpenCode.
# Uso: install-hooks.sh [claude,codex,opencode] [--project]
#   --project  grava o hook do Claude Code em ./.claude/settings.json (padrão: global).
# Não sobrescreve configuração existente: faz backup (.bak-<data>) e mescla; remove só
# as entradas anteriores da própria TANG-ROU. Sem python3 nem node, imprime o trecho para colar.
# Nenhum caminho da máquina de quem escreveu a skill: tudo é calculado aqui, na sua máquina.
set -euo pipefail

SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
HOOK="$SKILL_DIR/hooks/tang-hook.sh"
TARGETS="claude,codex,opencode"; PROJECT=0
for a in "$@"; do
  case "$a" in
    --project) PROJECT=1 ;;
    *) TARGETS="$a" ;;
  esac
done
chmod +x "$HOOK" 2>/dev/null || true
STAMP="$(date +%Y%m%d%H%M%S)"
GLOBAL_DIR="${TANG_ROU_HOME:-$HOME/.tang-rou}"

# 1) Memória: pergunta sobre Obsidian uma vez (só em terminal interativo).
mkdir -p "$GLOBAL_DIR"
if [ ! -f "$GLOBAL_DIR/config.env" ] && [ -t 0 ]; then
  read -r -p "Você usa Obsidian? Caminho do vault (Enter = não uso): " VAULT || VAULT=""
  printf 'OBSIDIAN_VAULT=%s\n' "$VAULT" > "$GLOBAL_DIR/config.env"
  echo "config gravada em $GLOBAL_DIR/config.env"
fi

# 2) Mescla {hooks:{Evento:[{matcher,hooks:[{type,command}]}]}} sem tocar em hooks de terceiros.
merge_json() { # $1 arquivo  $2 formato do hook (json|text)
  local file="$1" fmt="$2" cmd_prefix="sh \"$HOOK\""
  local ss="$cmd_prefix session-start --format $fmt"
  local up="$cmd_prefix user-prompt --format $fmt"
  local se="$cmd_prefix session-end"
  mkdir -p "$(dirname "$file")"
  [ -f "$file" ] && cp "$file" "$file.bak-$STAMP"
  if command -v python3 >/dev/null 2>&1; then
    python3 - "$file" "$ss" "$up" "$se" <<'PY'
import json, os, sys
path, ss, up, se = sys.argv[1:5]
cfg = json.load(open(path)) if os.path.exists(path) and os.path.getsize(path) else {}
hooks = cfg.setdefault("hooks", {})
for event, cmd in (("SessionStart", ss), ("UserPromptSubmit", up), ("SessionEnd", se)):
    kept = [e for e in hooks.get(event, [])
            if not any("tang-hook" in h.get("command", "") for h in e.get("hooks", []))]
    kept.append({"matcher": "", "hooks": [{"type": "command", "command": cmd}]})
    hooks[event] = kept
json.dump(cfg, open(path, "w"), indent=2, ensure_ascii=False)
PY
  elif command -v node >/dev/null 2>&1; then
    node - "$file" "$ss" "$up" "$se" <<'JS'
const fs = require("fs");
const [path, ss, up, se] = process.argv.slice(2);
const cfg = fs.existsSync(path) && fs.statSync(path).size ? JSON.parse(fs.readFileSync(path, "utf8")) : {};
cfg.hooks = cfg.hooks || {};
for (const [event, cmd] of [["SessionStart", ss], ["UserPromptSubmit", up], ["SessionEnd", se]]) {
  const kept = (cfg.hooks[event] || []).filter(e => !(e.hooks || []).some(h => (h.command || "").includes("tang-hook")));
  kept.push({ matcher: "", hooks: [{ type: "command", command: cmd }] });
  cfg.hooks[event] = kept;
}
fs.writeFileSync(path, JSON.stringify(cfg, null, 2));
JS
  else
    echo "Sem python3 nem node: cole manualmente em $file (chave \"hooks\"):"
    printf '  SessionStart     -> %s\n  UserPromptSubmit -> %s\n  SessionEnd       -> %s\n' "$ss" "$up" "$se"
    return 0
  fi
  echo "hooks gravados em $file (backup: $file.bak-$STAMP)"
}

IFS=',' read -ra T <<< "$TARGETS"
for t in "${T[@]}"; do
  case "$t" in
    claude)
      if [ "$PROJECT" = 1 ]; then f="$PWD/.claude/settings.json"; else f="${CLAUDE_CONFIG_DIR:-$HOME/.claude}/settings.json"; fi
      merge_json "$f" json ;;
    codex)
      merge_json "${CODEX_HOME:-$HOME/.codex}/hooks.json" text
      echo "Codex: aceite os hooks novos no TUI ('Trust all and continue') na primeira execução." ;;
    opencode)
      d="${XDG_CONFIG_HOME:-$HOME/.config}/opencode/plugins"
      mkdir -p "$d"
      cp "$SKILL_DIR/hooks/opencode/tang-rou.ts" "$d/tang-rou.ts"
      echo "plugin copiado para $d/tang-rou.ts (reinicie o OpenCode)" ;;
    *) echo "alvo desconhecido: $t (use claude, codex, opencode)" >&2; exit 1 ;;
  esac
done

# 3) ai-memory é opcional: se existir, só avisa. Não altera nada por conta própria.
if command -v ai-memory >/dev/null 2>&1; then
  echo "ai-memory detectado. Memória cruzada entre agentes (opcional, coexiste com estes hooks):"
  echo "  ai-memory install-hooks --agent <claude-code|codex|opencode> --apply"
fi

if command -v claude >/dev/null 2>&1; then
  echo "Opcional (Claude Code 2.1.274+): plugin de compactação sem resumo, exige chave TypeSafe e envia a conversa à TypeSafe. Leia references/compactacao.md antes de instalar."
fi
