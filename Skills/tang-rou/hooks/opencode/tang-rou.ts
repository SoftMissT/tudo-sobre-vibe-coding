// Plugin TANG-ROU para OpenCode. Instalado por scripts/install-hooks em
// ~/.config/opencode/plugins/tang-rou.ts (OpenCode carrega plugins dessa pasta ao iniciar).
// Equivale ao tang-hook.sh: injeta persona + memória no system prompt e registra fim de sessão.
// Sem caminhos fixos: a skill é procurada nos diretórios padrão; TANG_ROU_SKILL_DIR sobrescreve.
import type { Plugin } from "@opencode-ai/plugin";
import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";

const home = homedir();
const globalDir = process.env.TANG_ROU_HOME || join(home, ".tang-rou");
const configPath = join(globalDir, "config.env");

function skillDir(projectDir: string): string | undefined {
  const candidates = [
    process.env.TANG_ROU_SKILL_DIR,
    join(projectDir, ".claude", "skills", "tang-rou"),
    join(projectDir, ".agents", "skills", "tang-rou"),
    join(projectDir, ".opencode", "skills", "tang-rou"),
    join(home, ".claude", "skills", "tang-rou"),
    join(home, ".agents", "skills", "tang-rou"),
    join(home, ".config", "opencode", "skills", "tang-rou"),
  ];
  return candidates.find((c) => c && existsSync(join(c, "SKILL.md")));
}

function cfg(key: string): string {
  if (!existsSync(configPath)) return "";
  for (const line of readFileSync(configPath, "utf8").split(/\r?\n/)) {
    const m = new RegExp(`^\\s*${key}\\s*=\\s*"?([^"]*)"?\\s*$`).exec(line);
    if (m) return m[1];
  }
  return "";
}

function tail(path: string, n: number): string {
  if (!existsSync(path)) return "";
  return readFileSync(path, "utf8").split(/\r?\n/).filter(Boolean).slice(-n).join("\n");
}

// Sobe da pasta do projeto até a raiz do checkout procurando .tang-rou/.
function findProjectMemory(start: string): string | undefined {
  let dir = start;
  while (dir && dir !== dirname(dir)) {
    if (existsSync(join(dir, ".tang-rou"))) return join(dir, ".tang-rou");
    if (existsSync(join(dir, ".git"))) return undefined;
    dir = dirname(dir);
  }
  return undefined;
}

function buildContext(directory: string): string {
  const skill = skillDir(directory);
  const out: string[] = [];
  out.push(
    skill
      ? `[TANG-ROU] Responda SEMPRE como TANG-ROU (Soft Mist), em toda resposta. Se ainda não leu nesta sessão, leia por inteiro ${join(skill, "references", "TANG-ROU.soul.md")} e siga ${join(skill, "SKILL.md")}.`
      : "[TANG-ROU] Responda SEMPRE como TANG-ROU (Soft Mist), em toda resposta. A skill tang-rou não foi encontrada no disco: use o resumo da Soul (direta, competitiva, técnica; velocidade com direção; erro é informação).",
  );
  if (!existsSync(configPath)) {
    out.push(
      `[TANG-ROU] Memória ainda não configurada. Resolva o pedido do operador primeiro (não bloqueie a tarefa); só ao fim da primeira resposta, em uma linha, faça uma única pergunta: 'Você usa Obsidian? Se sim, qual o caminho do vault?'. Grave a resposta em ${configPath} (OBSIDIAN_VAULT=<caminho>, ou OBSIDIAN_VAULT= vazio se não usa). Sem Obsidian a memória fica em ${globalDir} (global) e em .tang-rou/ (projeto).`,
    );
  }
  const project = findProjectMemory(directory);
  if (project) {
    out.push(`[TANG-ROU] Memória do projeto: ${project}`);
    const state = tail(join(project, "STATE.md"), 40);
    if (state) out.push(`--- STATE do projeto (últimas linhas) ---\n${state}`);
    const lessons = tail(join(project, "lessons.md"), 30);
    if (lessons) out.push(`--- Lições do projeto (releia antes de agir; não repita o erro) ---\n${lessons}`);
  } else {
    out.push("[TANG-ROU] Este projeto ainda não tem .tang-rou/. Crie quando houver algo a lembrar (STATE.md, lessons.md).");
  }
  const globalLessons = tail(join(globalDir, "lessons.md"), 20);
  if (globalLessons) out.push(`--- Lições globais ---\n${globalLessons}`);
  const vault = cfg("OBSIDIAN_VAULT");
  if (vault) {
    out.push(
      `[TANG-ROU] Vault Obsidian configurado: ${vault}. STATE e SDD de features vivem em ${join(vault, "TANG-ROU")}. Ao retomar uma feature, leia só STATE, Constitution e a fase ativa.`,
    );
  }
  return out.join("\n");
}

const REMINDER =
  "[TANG-ROU] Mantenha a voz da TANG-ROU. Houve erro ou correção do operador neste turno? Registre a lição (Erro, Causa, Correção, Regra preventiva) em lessons.md antes de seguir.";

export const TangRouHooks: Plugin = async ({ directory }) => {
  if (cfg("TANG_ROU_HOOKS") === "off") return {};
  const started = new Set<string>();
  return {
    // Contexto completo na primeira chamada de cada sessão; depois só o lembrete curto.
    "experimental.chat.system.transform": async (input: any, output: any) => {
      const id = input?.sessionID ?? input?.sessionId ?? "default";
      if (!started.has(id)) {
        started.add(id);
        output.system.push(buildContext(directory));
      } else {
        output.system.push(REMINDER);
      }
    },
    event: async ({ event }: any) => {
      if (event?.type !== "session.idle") return;
      try {
        const base = findProjectMemory(directory) ?? globalDir;
        mkdirSync(base, { recursive: true });
        appendFileSync(join(base, "sessions.log"), `${new Date().toISOString()} session-idle cwd=${directory}\n`);
      } catch {
        // Hook nunca bloqueia o agente.
      }
    },
  };
};

export default TangRouHooks;
