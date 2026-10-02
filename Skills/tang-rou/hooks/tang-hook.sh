#!/bin/sh
# TANG-ROU hook (POSIX sh, sem dependências além de sed/awk/tr/date).
# Uso: tang-hook.sh <session-start|user-prompt|session-end> [--format json|text]
#
# Roda em Claude Code e Codex (mesmo formato de hook). O stdout de session-start
# e user-prompt entra no contexto do modelo; session-end só registra.
# Nenhum caminho é fixo: a skill é achada a partir deste arquivo, a memória
# global vem de $TANG_ROU_HOME (padrão ~/.tang-rou) e a de projeto de .tang-rou/.
# O hook nunca bloqueia o agente: qualquer falha termina em exit 0.

EVENT="${1:-}"
FORMAT="json"
[ "${2:-}" = "--format" ] && FORMAT="${3:-json}"

SKILL_DIR="$(cd "$(dirname "$0")/.." 2>/dev/null && pwd)"
GLOBAL_DIR="${TANG_ROU_HOME:-${HOME:-.}/.tang-rou}"
CONFIG="$GLOBAL_DIR/config.env"

PAYLOAD=""
[ -t 0 ] || PAYLOAD="$(cat 2>/dev/null)"

# cwd vem no payload JSON dos agentes; sem ele, usa o diretório atual.
CWD="$(printf '%s' "$PAYLOAD" | sed -n -E 's/.*"cwd"[[:space:]]*:[[:space:]]*"([^"]*)".*/\1/p' | head -n 1)"
[ -n "$CWD" ] && [ -d "$CWD" ] || CWD="$PWD"

cfg() { # lê KEY=valor de config.env sem executar o arquivo
  [ -f "$CONFIG" ] || return 0
  sed -n -E "s/^[[:space:]]*$1[[:space:]]*=[[:space:]]*\"?([^\"]*)\"?[[:space:]]*$/\1/p" "$CONFIG" | head -n 1
}

[ "$(cfg TANG_ROU_HOOKS)" = "off" ] && exit 0

# Sobe da pasta atual até a raiz do checkout procurando .tang-rou/.
find_project_dir() {
  d="$CWD"
  while [ -n "$d" ] && [ "$d" != "/" ]; do
    [ -d "$d/.tang-rou" ] && { printf '%s\n' "$d/.tang-rou"; return 0; }
    [ -e "$d/.git" ] && return 0
    p="$(dirname "$d")"; [ "$p" = "$d" ] && return 0; d="$p"
  done
}
PROJECT_DIR="$(find_project_dir)"
VAULT="$(cfg OBSIDIAN_VAULT)"

json_escape() {
  sed -e 's/\\/\\\\/g' -e 's/"/\\"/g' -e 's/	/\\t/g' | tr -d '\r' | awk 'BEGIN{ORS=""} NR>1{print "\\n"} {print}'
}

emit() { # $1 = nome do evento do agente, $2 = texto
  if [ "$FORMAT" = "json" ]; then
    printf '{"hookSpecificOutput":{"hookEventName":"%s","additionalContext":"%s"}}\n' "$1" "$(printf '%s' "$2" | json_escape)"
  else
    printf '%s\n' "$2"
  fi
}

tail_of() { [ -f "$1" ] && tail -n "$2" "$1" 2>/dev/null; }

case "$EVENT" in
  session-start)
    OUT="[TANG-ROU] Responda SEMPRE como TANG-ROU (Soft Mist), em toda resposta. Se ainda não leu nesta sessão, leia por inteiro ${SKILL_DIR}/references/TANG-ROU.soul.md e siga ${SKILL_DIR}/SKILL.md."
    if [ ! -f "$CONFIG" ]; then
      OUT="$OUT
[TANG-ROU] Memória ainda não configurada. Resolva o pedido do operador primeiro (não bloqueie a tarefa); só ao fim da primeira resposta, em uma linha, faça uma única pergunta: 'Você usa Obsidian? Se sim, qual o caminho do vault?'. Grave a resposta em ${CONFIG} (OBSIDIAN_VAULT=<caminho>, ou OBSIDIAN_VAULT= vazio se não usa). Sem Obsidian a memória fica em ${GLOBAL_DIR} (global) e em .tang-rou/ (projeto)."
    fi
    if [ -n "$PROJECT_DIR" ]; then
      OUT="$OUT
[TANG-ROU] Memória do projeto: ${PROJECT_DIR}"
      S="$(tail_of "$PROJECT_DIR/STATE.md" 40)"
      [ -n "$S" ] && OUT="$OUT
--- STATE do projeto (últimas linhas) ---
$S"
      L="$(tail_of "$PROJECT_DIR/lessons.md" 30)"
      [ -n "$L" ] && OUT="$OUT
--- Lições do projeto (releia antes de agir; não repita o erro) ---
$L"
    else
      OUT="$OUT
[TANG-ROU] Este projeto ainda não tem .tang-rou/. Crie quando houver algo a lembrar (STATE.md, lessons.md)."
    fi
    G="$(tail_of "$GLOBAL_DIR/lessons.md" 20)"
    [ -n "$G" ] && OUT="$OUT
--- Lições globais ---
$G"
    if [ -n "$VAULT" ]; then
      OUT="$OUT
[TANG-ROU] Vault Obsidian configurado: ${VAULT}. STATE e SDD de features vivem em ${VAULT}/TANG-ROU/. Ao retomar uma feature, leia só STATE, Constitution e a fase ativa."
    fi
    emit SessionStart "$OUT"
    ;;
  user-prompt)
    emit UserPromptSubmit "[TANG-ROU] Mantenha a voz da TANG-ROU. Houve erro ou correção do operador neste turno? Registre a lição (Erro, Causa, Correção, Regra preventiva) em lessons.md antes de seguir."
    ;;
  session-end)
    LOG="${PROJECT_DIR:-$GLOBAL_DIR}/sessions.log"
    mkdir -p "$(dirname "$LOG")" 2>/dev/null
    printf '%s session-end cwd=%s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$CWD" >> "$LOG" 2>/dev/null
    ;;
esac
exit 0
