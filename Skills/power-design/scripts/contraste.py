#!/usr/bin/env python3
"""Razão de contraste WCAG entre duas cores. Uso: contraste.py "#777777" "#ffffff"  (hex de 3 ou 6 dígitos). Só biblioteca padrão."""
import sys, re

def rgb(h):
    h = h.strip().lstrip('#')
    if not re.fullmatch(r'[0-9a-fA-F]{3}|[0-9a-fA-F]{6}', h): raise SystemExit(f'cor inválida: {h!r} (use #rgb ou #rrggbb)')
    if len(h) == 3: h = ''.join(c * 2 for c in h)
    return [int(h[i:i + 2], 16) for i in (0, 2, 4)]

def lum(c):
    f = lambda v: (v / 255 / 12.92) if v / 255 <= .03928 else (((v / 255) + .055) / 1.055) ** 2.4
    r, g, b = map(f, c); return .2126 * r + .7152 * g + .0722 * b

if len(sys.argv) != 3: raise SystemExit(__doc__)
a, b = lum(rgb(sys.argv[1])), lum(rgb(sys.argv[2]))
ratio = (max(a, b) + .05) / (min(a, b) + .05)
print(f'{ratio:.2f}:1 | texto normal AA (4.5): {"ok" if ratio >= 4.5 else "FALHA"} | texto grande/UI AA (3): {"ok" if ratio >= 3 else "FALHA"} | AAA texto normal (7): {"ok" if ratio >= 7 else "não"}')
