# TANG-ROU hook para Windows (PowerShell 5.1+). Espelha tang-hook.sh.
# Uso: tang-hook.ps1 <session-start|user-prompt|session-end> [-Format json|text]
# Nunca bloqueia o agente: qualquer falha termina em exit 0.
param(
  [Parameter(Position = 0)][string]$Event = '',
  [ValidateSet('json', 'text')][string]$Format = 'json'
)
$ErrorActionPreference = 'SilentlyContinue'

$skillDir  = Split-Path -Parent $PSScriptRoot
$homeDir   = if ($env:USERPROFILE) { $env:USERPROFILE } else { $HOME }
$globalDir = if ($env:TANG_ROU_HOME) { $env:TANG_ROU_HOME } else { Join-Path $homeDir '.tang-rou' }
$config    = Join-Path $globalDir 'config.env'

$payload = ''
if ([Console]::IsInputRedirected) { $payload = [Console]::In.ReadToEnd() }

$cwd = $null
if ($payload -match '"cwd"\s*:\s*"((?:[^"\\]|\\.)*)"') { $cwd = ($Matches[1] -replace '\\\\', '\') }
if (-not $cwd -or -not (Test-Path -LiteralPath $cwd)) { $cwd = (Get-Location).Path }

function Get-Cfg([string]$key) {
  if (-not (Test-Path -LiteralPath $config)) { return '' }
  foreach ($line in Get-Content -LiteralPath $config) {
    if ($line -match "^\s*$key\s*=\s*""?([^""]*)""?\s*$") { return $Matches[1] }
  }
  return ''
}

if ((Get-Cfg 'TANG_ROU_HOOKS') -eq 'off') { exit 0 }

function Find-ProjectDir {
  $d = $cwd
  while ($d) {
    $candidate = Join-Path $d '.tang-rou'
    if (Test-Path -LiteralPath $candidate -PathType Container) { return $candidate }
    if (Test-Path -LiteralPath (Join-Path $d '.git')) { return $null }
    $p = Split-Path -Parent $d
    if (-not $p -or $p -eq $d) { return $null }
    $d = $p
  }
  return $null
}
$projectDir = Find-ProjectDir
$vault = Get-Cfg 'OBSIDIAN_VAULT'

function Tail-Of([string]$path, [int]$n) {
  if (Test-Path -LiteralPath $path) { return ((Get-Content -LiteralPath $path -Tail $n) -join "`n") }
  return ''
}

function Emit([string]$name, [string]$text) {
  if ($Format -eq 'json') {
    $obj = @{ hookSpecificOutput = @{ hookEventName = $name; additionalContext = $text } }
    Write-Output ($obj | ConvertTo-Json -Compress -Depth 4)
  } else {
    Write-Output $text
  }
}

switch ($Event) {
  'session-start' {
    $soul = Join-Path $skillDir 'references\TANG-ROU.soul.md'
    $out = "[TANG-ROU] Responda SEMPRE como TANG-ROU (Soft Mist), em toda resposta. Se ainda não leu nesta sessão, leia por inteiro $soul e siga $(Join-Path $skillDir 'SKILL.md')."
    if (-not (Test-Path -LiteralPath $config)) {
      $out += "`n[TANG-ROU] Memória ainda não configurada. Resolva o pedido do operador primeiro (não bloqueie a tarefa); só ao fim da primeira resposta, em uma linha, faça uma única pergunta: 'Você usa Obsidian? Se sim, qual o caminho do vault?'. Grave a resposta em $config (OBSIDIAN_VAULT=<caminho>, ou OBSIDIAN_VAULT= vazio se não usa). Sem Obsidian a memória fica em $globalDir (global) e em .tang-rou\ (projeto)."
    }
    if ($projectDir) {
      $out += "`n[TANG-ROU] Memória do projeto: $projectDir"
      $s = Tail-Of (Join-Path $projectDir 'STATE.md') 40
      if ($s) { $out += "`n--- STATE do projeto (últimas linhas) ---`n$s" }
      $l = Tail-Of (Join-Path $projectDir 'lessons.md') 30
      if ($l) { $out += "`n--- Lições do projeto (releia antes de agir; não repita o erro) ---`n$l" }
    } else {
      $out += "`n[TANG-ROU] Este projeto ainda não tem .tang-rou\. Crie quando houver algo a lembrar (STATE.md, lessons.md)."
    }
    $g = Tail-Of (Join-Path $globalDir 'lessons.md') 20
    if ($g) { $out += "`n--- Lições globais ---`n$g" }
    if ($vault) {
      $out += "`n[TANG-ROU] Vault Obsidian configurado: $vault. STATE e SDD de features vivem em $vault\TANG-ROU\. Ao retomar uma feature, leia só STATE, Constitution e a fase ativa."
    }
    Emit 'SessionStart' $out
  }
  'user-prompt' {
    Emit 'UserPromptSubmit' '[TANG-ROU] Mantenha a voz da TANG-ROU. Houve erro ou correção do operador neste turno? Registre a lição (Erro, Causa, Correção, Regra preventiva) em lessons.md antes de seguir.'
  }
  'session-end' {
    $base = if ($projectDir) { $projectDir } else { $globalDir }
    New-Item -ItemType Directory -Force -Path $base | Out-Null
    Add-Content -LiteralPath (Join-Path $base 'sessions.log') -Value ("{0} session-end cwd={1}" -f (Get-Date).ToUniversalTime().ToString('yyyy-MM-ddTHH:mm:ssZ'), $cwd)
  }
}
exit 0
