# Liga os hooks da TANG-ROU em Claude Code, Codex e/ou OpenCode (Windows, PowerShell 5.1+).
# Uso: .\install-hooks.ps1 [-Targets claude,codex,opencode] [-Project]
# Não sobrescreve configuração existente: faz backup (.bak-<data>) e mescla; remove só as
# entradas anteriores da própria TANG-ROU. Nenhum caminho fixo: tudo é calculado aqui.
param(
  [string[]]$Targets = @('claude', 'codex', 'opencode'),
  [switch]$Project
)
$ErrorActionPreference = 'Stop'

$skillDir  = Split-Path -Parent $PSScriptRoot
$hook      = Join-Path $skillDir 'hooks\tang-hook.ps1'
$stamp     = Get-Date -Format 'yyyyMMddHHmmss'
$homeDir   = if ($env:USERPROFILE) { $env:USERPROFILE } else { $HOME }
$globalDir = if ($env:TANG_ROU_HOME) { $env:TANG_ROU_HOME } else { Join-Path $homeDir '.tang-rou' }

# 1) Memória: pergunta sobre Obsidian uma vez (só em sessão interativa).
New-Item -ItemType Directory -Force -Path $globalDir | Out-Null
$cfgFile = Join-Path $globalDir 'config.env'
if (-not (Test-Path -LiteralPath $cfgFile) -and [Environment]::UserInteractive -and -not [Console]::IsInputRedirected) {
  $vault = Read-Host 'Você usa Obsidian? Caminho do vault (Enter = não uso)'
  Set-Content -LiteralPath $cfgFile -Value "OBSIDIAN_VAULT=$vault"
  Write-Host "config gravada em $cfgFile"
}

# 2) Mescla { hooks: { Evento: [ { matcher, hooks: [ { type, command } ] } ] } } sem tocar em hooks de terceiros.
function Merge-Hooks([string]$file, [string]$fmt) {
  $base = "powershell -NoProfile -ExecutionPolicy Bypass -File `"$hook`""
  $events = [ordered]@{
    SessionStart     = "$base session-start -Format $fmt"
    UserPromptSubmit = "$base user-prompt -Format $fmt"
    SessionEnd       = "$base session-end"
  }
  New-Item -ItemType Directory -Force -Path (Split-Path -Parent $file) | Out-Null
  $cfg = [pscustomobject]@{}
  if ((Test-Path -LiteralPath $file) -and (Get-Item -LiteralPath $file).Length -gt 0) {
    Copy-Item -LiteralPath $file -Destination "$file.bak-$stamp"
    $cfg = Get-Content -LiteralPath $file -Raw | ConvertFrom-Json
  }
  if (-not $cfg.PSObject.Properties['hooks']) { $cfg | Add-Member -NotePropertyName hooks -NotePropertyValue ([pscustomobject]@{}) }
  foreach ($ev in $events.Keys) {
    $kept = @()
    if ($cfg.hooks.PSObject.Properties[$ev]) {
      foreach ($entry in $cfg.hooks.$ev) {
        $isOurs = $false
        foreach ($h in $entry.hooks) { if ($h.command -like '*tang-hook*') { $isOurs = $true } }
        if (-not $isOurs) { $kept += $entry }
      }
    }
    $kept += [pscustomobject]@{ matcher = ''; hooks = @([pscustomobject]@{ type = 'command'; command = $events[$ev] }) }
    if ($cfg.hooks.PSObject.Properties[$ev]) { $cfg.hooks.$ev = $kept }
    else { $cfg.hooks | Add-Member -NotePropertyName $ev -NotePropertyValue $kept }
  }
  $cfg | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $file -Encoding UTF8
  Write-Host "hooks gravados em $file (backup: $file.bak-$stamp)"
}

foreach ($t in $Targets) {
  switch ($t) {
    'claude' {
      $f = if ($Project) { Join-Path (Get-Location).Path '.claude\settings.json' }
           else { Join-Path $(if ($env:CLAUDE_CONFIG_DIR) { $env:CLAUDE_CONFIG_DIR } else { Join-Path $homeDir '.claude' }) 'settings.json' }
      Merge-Hooks $f 'json'
    }
    'codex' {
      $dir = if ($env:CODEX_HOME) { $env:CODEX_HOME } else { Join-Path $homeDir '.codex' }
      Merge-Hooks (Join-Path $dir 'hooks.json') 'text'
      Write-Host "Codex: aceite os hooks novos no TUI ('Trust all and continue') na primeira execução."
    }
    'opencode' {
      $cfgHome = if ($env:XDG_CONFIG_HOME) { $env:XDG_CONFIG_HOME } else { Join-Path $homeDir '.config' }
      $d = Join-Path $cfgHome 'opencode\plugins'
      New-Item -ItemType Directory -Force -Path $d | Out-Null
      Copy-Item -LiteralPath (Join-Path $skillDir 'hooks\opencode\tang-rou.ts') -Destination (Join-Path $d 'tang-rou.ts') -Force
      Write-Host "plugin copiado para $d\tang-rou.ts (reinicie o OpenCode)"
    }
    default { throw "alvo desconhecido: $t (use claude, codex, opencode)" }
  }
}

# 3) ai-memory é opcional: se existir, só avisa. Não altera nada por conta própria.
if (Get-Command ai-memory -ErrorAction SilentlyContinue) {
  Write-Host 'ai-memory detectado. Memória cruzada entre agentes (opcional, coexiste com estes hooks):'
  Write-Host '  ai-memory install-hooks --agent <claude-code|codex|opencode> --apply'
}

if (Get-Command claude -ErrorAction SilentlyContinue) {
  Write-Host 'Opcional (Claude Code 2.1.274+): plugin de compactação sem resumo, exige chave TypeSafe e envia a conversa à TypeSafe. Leia references/compactacao.md antes de instalar.'
}
