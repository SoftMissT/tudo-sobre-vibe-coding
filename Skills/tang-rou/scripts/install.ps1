# Instala a skill tang-rou. Uso: .\install.ps1 [-Targets claude,agents,opencode] [-Project] [-Hooks claude,codex,opencode]
#   -Hooks  liga os hooks (persona + memória) nos agentes listados; ver platforms\INSTALL.md.
param(
  [string[]]$Targets = @('claude','agents'),
  [string[]]$Hooks = @(),
  [switch]$Project
)
$ErrorActionPreference = 'Stop'
$src = Split-Path -Parent $PSScriptRoot
$base = if ($Project) { (Get-Location).Path } else { $HOME }

function Get-Dest([string]$t) {
  switch ($t) {
    'claude'   { Join-Path $base '.claude\skills' }
    'agents'   { Join-Path $base '.agents\skills' }
    'opencode' { if ($Project) { Join-Path $base '.opencode\skills' } else { Join-Path $base '.config\opencode\skills' } }
    default    { throw "alvo desconhecido: $t" }
  }
}

$first = $null
foreach ($t in $Targets) {
  $dest = Join-Path (Get-Dest $t) 'tang-rou'
  New-Item -ItemType Directory -Force -Path $dest | Out-Null
  Copy-Item -Path (Join-Path $src '*') -Destination $dest -Recurse -Force
  if (-not $first) { $first = $dest }
  Write-Host "instalado em $dest"
}
if ($Project) {
  $ag = Join-Path $base '.claude\agents'
  New-Item -ItemType Directory -Force -Path $ag | Out-Null
  Copy-Item -Path (Join-Path $src 'platforms\claude-code\.claude\agents\*') -Destination $ag -Force
  Write-Host "subagentes copiados para $ag"
}
# Os hooks apontam para a cópia instalada (o primeiro destino), não para a pasta de origem.
if ($Hooks.Count -gt 0) {
  $args2 = @{ Targets = $Hooks }
  if ($Project) { $args2['Project'] = $true }
  & (Join-Path $first 'scripts\install-hooks.ps1') @args2
}
