#!/usr/bin/env bash
# Autoteste do verificador: a página ruim DEVE disparar cada checagem; a boa NÃO deve disparar nenhuma.
# Uso: bash scripts/selftest.sh <ruim.html> <boa.html>   (as duas páginas ficam em design-test/pages; ver fluxo)
set -u; d=$(dirname "$0"); out=$(mktemp -d); falhou=0
r=$(node "$d/render-check.mjs" "$1" "$out/r" 2>&1)
for esperado in "rolagem horizontal" "img sem alt" "botão/link sem nome" "campo sem rótulo" "div/span com onclick" "contraste baixo" "sem indicador de foco" "h1 encontrados" "sem atributo lang" "zoom bloqueado" "transition: all" "img sem width/height"; do
  echo "$r" | grep -q "$esperado" && echo "ok   dispara: $esperado" || { echo "FALHA não disparou: $esperado"; falhou=1; }
done
node "$d/render-check.mjs" "$2" "$out/b" >/dev/null 2>&1 && echo "ok   página boa passa" || { echo "FALHA página boa acusada"; falhou=1; }
# comparador visual: imagem idêntica deve dar 0.00% e imagem diferente deve estourar --max
if [ -f "$out/r/desktop.png" ]; then
  node "$d/visual-diff.mjs" "$out/r/desktop.png" "$out/r/desktop.png" | grep -q 'DIFERENTES (tolerância [0-9]*/255): 0.00%' && echo 'ok   visual-diff: idêntica = 0.00%' || { echo 'FALHA visual-diff idêntica'; falhou=1; }
  node "$d/visual-diff.mjs" "$out/r/desktop.png" "$out/b/desktop.png" --max 0.5 >/dev/null 2>&1; [ $? -eq 1 ] && echo 'ok   visual-diff: ruim x boa estoura o limite' || { echo 'FALHA visual-diff não detectou diferença'; falhou=1; }
  node "$d/visual-diff.mjs" "$out/r/desktop.png" /nao/existe.png >/dev/null 2>&1; [ $? -eq 5 ] && echo 'ok   visual-diff: arquivo ausente = código 5' || { echo 'FALHA código de erro'; falhou=1; }
  node "$d/captura.mjs" "$2" "$out/c.png" --largura 800 --altura 600 >/dev/null 2>&1 && [ -s "$out/c.png" ] && echo 'ok   captura.mjs gera PNG' || { echo 'FALHA captura.mjs'; falhou=1; }
  node "$d/amostrar-cor.mjs" "$out/c.png" --paleta 3 2>/dev/null | grep -q '^#' && echo 'ok   amostrar-cor.mjs devolve paleta' || { echo 'FALHA amostrar-cor.mjs'; falhou=1; }
  # extrator de design (página local) + validador com os contratos do Open Design
  if node "$d/extrair-design.mjs" "$2" "$out/ex" --slug teste >/dev/null 2>&1; then echo 'ok   extrair-design.mjs gera a pasta'; node --experimental-strip-types --no-warnings "$d/validar-open-design.mjs" "$out/ex/teste" --permitir-pendente >/dev/null 2>&1 && echo 'ok   pasta extraída passa nos contratos do Open Design' || { echo 'FALHA validação da pasta extraída (Node >= 22.6?)'; falhou=1; }
    node --experimental-strip-types --no-warnings "$d/validar-open-design.mjs" "$out/ex/teste" >/dev/null 2>&1; [ $? -eq 1 ] && echo 'ok   [AGENTE] pendente reprova a validação' || { echo 'FALHA: pendente deveria reprovar'; falhou=1; }
    node "$d/extrair-design.mjs" http://localhost:9/x "$out/y" >/dev/null 2>&1; [ $? -eq 4 ] && echo 'ok   rede privada recusada (código 4)' || { echo 'FALHA: localhost deveria ser recusado'; falhou=1; }
  else echo 'FALHA extrair-design.mjs'; falhou=1; fi
fi
exit $falhou
