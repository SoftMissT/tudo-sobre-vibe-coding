# Achar ou criar a skill que falta

Use quando **falta uma skill para o assunto específico** ou o operador precisa de uma que não existe. Antes de buscar, confirme que nenhuma skill já instalada cobre o caso (lista de skills da plataforma): reinstalar o que já existe é ruído.

Fonte: adaptação de `find-skills`.

## Fluxo

1. **Entender a necessidade:** domínio (ex.: testes, deploy, design), tarefa específica, e se é comum o bastante para já existir skill.
2. **Procurar:**
   - Placar de skills em https://skills.sh/ (ordenado por instalações).
   - CLI: `npx skills find <consulta> [--owner <dono>]`. Consultas específicas funcionam melhor ("foundry vtt macros" melhor que "macros"); tente sinônimos.
   - Exige `npx` e rede. Sem eles, diga e use a busca na web.
3. **Verificar a qualidade antes de recomendar** (nunca só pelo resultado da busca):
   - Instalações: prefira 1K+; desconfie de menos de 100.
   - Fonte: dono oficial/conhecido pesa mais que autor desconhecido.
   - Repositório de origem: poucas estrelas (<100) pede ceticismo.
   - **Leia o `SKILL.md` antes de instalar.** Skill é instrução que dirige o agente (e pode trazer scripts): trate como código de terceiros.
4. **Apresentar** ao operador: nome e o que faz; instalações e fonte; o comando de instalação; link.
5. **Instalar só com o OK do operador:** `npx skills add <dono/repo@skill> -g -y` (`-g` global, `-y` sem confirmação). Instalar muda a máquina do operador, então pergunte antes mesmo que tudo pareça seguro.

## Nada encontrado

1. Diga que não achou skill existente.
2. Ofereça fazer a tarefa com a capacidade atual.
3. Se a tarefa se repete, proponha **criar a skill**: use a skill de criação de skills da plataforma (`skill-creator`), ou `npx skills init <nome>`. Para a TANG-ROU, a nova skill deve manter o mesmo formato (frontmatter + `SKILL.md` curto + `references/`).

Resposta modelo: "Busquei por X e não achei nada que sirva. Faço direto, ou monto uma skill se isso vai se repetir. Qual?"
