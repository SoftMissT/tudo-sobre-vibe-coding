#!/usr/bin/env python3
"""Benchmark de requisitos: descobre quais modelos de IA rodam no SEU computador.

- NÃO baixa nenhum modelo (só lê hardware).
- Requisitos: Python 3.8+, stdlib apenas. nvidia-smi opcional (para VRAM NVIDIA).
Uso: python check_local_llm.py [--self-test]
"""
import argparse
import os
import platform
import shutil
import subprocess
import sys

RAM_RESERVE_MIN, RAM_RESERVE_MAX = 1.0, 4.0
VRAM_RESERVE = 0.5

# (tamanho_gb do modelo em q4, tag Ollama, descrição)
MODELS = [
    (0.5, "qwen2.5:0.5b", "0.5B: experimentar o runtime"),
    (1.0, "llama3.2:1b", "1B: rápido, tarefas simples"),
    (2.0, "llama3.2:3b", "3B: uso geral leve"),
    (4.7, "llama3.1:8b", "8B: coding geral (padrão)"),
    (4.7, "qwen2.5-coder:7b", "7B coder: foco em código"),
    (4.7, "deepseek-r1:7b", "7B: raciocínio"),
    (9.0, "qwen2.5:14b", "14B: coding intermediário"),
    (20.0, "qwen2.5:32b", "32B: coding avançado"),
    (42.0, "llama3.1:70b", "70B: próximo do frontier"),
]


def ram_reserve(total_gb):
    return min(max(total_gb * 0.25, RAM_RESERVE_MIN), RAM_RESERVE_MAX)


def usable_mem(total_gb, reserve):
    return max(total_gb - reserve, 0.0)


def fits(size_gb, usable_gb):
    return size_gb <= usable_gb


def recommend(usable_gb):
    return [m for m in MODELS if fits(m[0], usable_gb)]


def detect_ram():
    """→ (total_gb, livre_gb). livre pode ser None quando não detectável."""
    sysname = platform.system()
    if sysname == "Windows":
        import ctypes

        class MEMORYSTATUSEX(ctypes.Structure):
            _fields_ = [
                ("dwLength", ctypes.c_uint32), ("dwMemoryLoad", ctypes.c_uint32),
                ("ullTotalPhys", ctypes.c_uint64), ("ullAvailPhys", ctypes.c_uint64),
                ("ullTotalPageFile", ctypes.c_uint64),
                ("ullAvailPageFile", ctypes.c_uint64),
                ("ullTotalVirtual", ctypes.c_uint64),
                ("ullAvailVirtual", ctypes.c_uint64),
                ("ullAvailExtendedVirtual", ctypes.c_uint64)]

        st = MEMORYSTATUSEX()
        st.dwLength = ctypes.sizeof(st)
        if ctypes.windll.kernel32.GlobalMemoryStatusEx(ctypes.byref(st)):
            return st.ullTotalPhys / 2**30, st.ullAvailPhys / 2**30
    elif sysname == "Linux":
        info = {}
        try:
            with open("/proc/meminfo") as fh:
                for line in fh:
                    key, _, val = line.partition(":")
                    info[key] = int(val.split()[0]) / 2**20  # kB → GB
            return info["MemTotal"], info.get("MemAvailable")
        except (OSError, KeyError, ValueError):
            pass
    elif sysname == "Darwin":
        try:
            total = int(subprocess.check_output(
                ["sysctl", "-n", "hw.memsize"], text=True).strip()) / 2**30
            return total, None
        except (OSError, subprocess.SubprocessError, ValueError):
            pass
    return None, None


def detect_gpus():
    """→ lista de (nome, vram_gb|None). VRAM só quando confiável."""
    gpus = []
    exe = shutil.which("nvidia-smi")
    if exe:
        try:
            out = subprocess.check_output(
                [exe, "--query-gpu=name,memory.total",
                 "--format=csv,noheader"], text=True, timeout=10)
            for line in out.strip().splitlines():
                name, _, mb = line.rpartition(",")
                gpus.append((name.strip(), int(mb.strip().split()[0]) / 1024))
        except (OSError, subprocess.SubprocessError, ValueError):
            pass
    if platform.system() == "Darwin":
        gpus.append(("Apple Silicon (unified memory)", None))  # usa a RAM
    if platform.system() == "Windows" and not gpus:
        try:
            out = subprocess.check_output(
                ["powershell", "-NoProfile", "-Command",
                 "(Get-CimInstance Win32_VideoController).Name"],
                text=True, timeout=15)
            for line in out.strip().splitlines():
                if line.strip():
                    gpus.append((line.strip(), None))
        except (OSError, subprocess.SubprocessError):
            pass
    return gpus


def detect_ollama():
    exe = shutil.which("ollama")
    if not exe:
        return None, []
    try:
        out = subprocess.check_output([exe, "list"], text=True, timeout=15)
        tags = [line.split()[0] for line in out.strip().splitlines()[1:] if line.strip()]
        return exe, tags
    except (OSError, subprocess.SubprocessError):
        return exe, []


def self_test():
    assert round(ram_reserve(8), 1) == 2.0
    assert round(ram_reserve(16), 1) == 4.0
    assert round(ram_reserve(4), 1) == 1.0
    assert usable_mem(16, 4) == 12.0
    assert not fits(9.0, 6.5)
    assert fits(4.7, 6.5)
    tags = [m[1] for m in recommend(6.5)]
    assert "llama3.1:8b" in tags and "qwen2.5:14b" not in tags
    assert len(recommend(100)) == len(MODELS)
    assert recommend(2.5) != []
    print("self-test OK (10 asserções)")


def main():
    if hasattr(sys.stdout, "reconfigure"):
        try:
            sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        except (OSError, ValueError):
            pass
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--self-test", action="store_true",
                    help="roda os testes internos e sai")
    args = ap.parse_args()
    if args.self_test:
        self_test()
        return 0

    total_ram, free_ram = detect_ram()
    gpus = detect_gpus()
    ollama_exe, local_models = detect_ollama()
    disk = shutil.disk_usage(os.path.expanduser("~"))

    print("=" * 62)
    print("BENCHMARK DE REQUISITOS: modelos locais (sem download)")
    print("=" * 62)
    print(f"Sistema : {platform.system()} {platform.release()} | "
          f"{platform.machine()} | {os.cpu_count() or '?'} núcleos")
    if total_ram:
        livre = f"{free_ram:.1f} GB livres" if free_ram is not None else "livre ?"
        print(f"RAM     : {total_ram:.1f} GB ({livre})")
    else:
        print("RAM     : não detectada")
    if gpus:
        for name, vram in gpus:
            print(f"GPU     : {name}" + (f" | {vram:.1f} GB VRAM" if vram else ""))
    else:
        print("GPU     : não detectada (nvidia-smi ausente: VRAM ignorada)")
    print(f"Disco   : {disk.free / 2**30:.0f} GB livres em {os.path.expanduser('~')}")
    if ollama_exe:
        print(f"Ollama  : instalado: {len(local_models)} modelo(s) local(is): "
              + (", ".join(local_models) or "nenhum (nada baixado ainda)"))
    else:
        print("Ollama  : NÃO instalado (ollama.com/download)")

    if not total_ram:
        print("\nNão consegui ler a RAM deste sistema: veja a tabela de requisitos"
              "\nno README desta pasta.")
        return 1

    reserve = ram_reserve(total_ram)
    cpu_usable = usable_mem(total_ram, reserve)

    best_gpu, gpu_usable = None, 0.0
    unified = platform.system() == "Darwin"
    for name, vram in gpus:
        effective = vram if vram else (total_ram if unified else 0.0)
        if effective > gpu_usable:
            best_gpu, gpu_usable = name, effective
    gpu_usable = usable_mem(gpu_usable, VRAM_RESERVE if best_gpu and not unified else 0.0)

    gpu_fit = [m for m in MODELS if fits(m[0], gpu_usable)]
    cpu_fit = [m for m in MODELS if fits(m[0], cpu_usable)]

    print("\n--- NO SEU PC VOCÊ CONSEGUE RODAR ---")
    if gpu_fit:
        via = "GPU unificada" if unified else f"GPU: {best_gpu}"
        print(f"\n[100% GPU: rápido] ({via})")
        for size, tag, desc in gpu_fit:
            print(f"  OK  ollama run {tag:<20} {size:>4.1f} GB  # {desc}")
    else:
        print("\n[100% GPU: rápido]  (nenhum modelo cabe na VRAM detectada)")
    rest_cpu = [m for m in cpu_fit if m not in gpu_fit]
    if rest_cpu:
        print("\n[Só CPU: lento, minutos por resposta em modelos grandes]")
        for size, tag, desc in rest_cpu:
            print(f"  OK  ollama run {tag:<20} {size:>4.1f} GB  # {desc}")
    biggest = max((m for m in cpu_fit), key=lambda m: m[0], default=None)
    if biggest:
        print(f"\nVeredicto: até {biggest[1]} ({biggest[0]:.1f} GB) na RAM de "
              f"{total_ram:.0f} GB (reserva {reserve:.1f} GB p/ sistema).")
    else:
        print(f"\nVeredicto: RAM {total_ram:.0f} GB não roda modelos úteis locais —"
              "\nuse APIs nuvem (context7, Codex, Claude Code).")
    if disk.free / 2**30 < 10:
        print("Atenção: menos de 10 GB livres: modelos ocupam de 0,5 a 40+ GB.")
    if not ollama_exe:
        print("Próximo passo: instale o Ollama (ollama.com/download) e rode"
              "\n  ollama run <tag>  (só baixa o que você escolher)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
