# Arquitetura Feature-Sliced Design (FSD) v2.1

Fonte: repositório feature-sliced/skills (skill feature-sliced-design), commit fd71da42a89e916f2ced63e5349fd865c87070a6, licença MIT; destilado por Claude — não é cópia.

## 1. Filosofia

Princípio central: começar simples e extrair só quando necessário. Código nasce em `pages/`; duplicação entre páginas é aceitável. Extrai-se para camada inferior apenas se as três condições valerem:

1. Uso real em vários lugares agora, não hipotético.
2. Motivo próprio de mudança.
3. Fronteira focada.

Rigor é ajustável: produtos experimentais toleram atalhos; sistemas longevos ou regulados pedem limites estritos.

## 2. Camadas (da mais alta à mais baixa)

| Camada | Papel |
|---|---|
| `app/` | Inicialização, providers, roteamento, tema |
| `pages/` | Composição por rota; dona da própria lógica |
| `widgets/` | Blocos de UI reutilizáveis (desencorajada) |
| `features/` | Interações de usuário reutilizáveis |
| `entities/` | Modelos de domínio reutilizáveis |
| `shared/` | Infraestrutura sem lógica de negócio |

- `app/`, `pages/` e `shared/` já formam um projeto válido; não criar pastas vazias.
- Regra de importação: só de camadas estritamente abaixo; importar para cima é violação.
- `widgets/` é desencorajada porque seu escopo se sobrepõe ao de features (blocos de UI costumam conter fluxo, dados e estado). Widgets existentes continuam válidos. Sem widget: composição de tela em `pages`; ação reutilizada com sua UI em `features`; UI sem contexto em `shared`; layout global em `app`.
- `processes/` está obsoleta na v2.1.

## 3. Onde este código mora

1. Uso em uma só página: fica nela. Duplicar em 2+ páginas também vale se o custo for baixo.
2. Infraestrutura sem regra de negócio: `shared/`. Ser temático de negócio (logo, layout) ou ter lógica de UI (autocomplete) não é lógica de negócio; falar com o backend e CRUD também não. Regra de negócio: o produto impondo regra aos próprios dados (ex.: desconto em pedido).
3. Ação completa de usuário, compartilhada, com responsabilidade focada e razão própria de mudança: `features/`. Na dúvida, página.
4. Modelo de domínio compartilhado, com os mesmos critérios: `entities/`. Na dúvida, página.
5. Configuração global (providers, router, tema): `app/`.

Regra de ouro: na dúvida, `pages/`.

## 4. Colocação rápida

| Cenário | Uso único | Multiuso confirmado |
|---|---|---|
| Formulário de perfil | `pages/profile/ui/` | `features/profile-form/` |
| Card de produto | `pages/products/ui/` | `entities/product/ui/` se a entity for dona (com cautela) |
| Requisição de API/CRUD | `api/` da própria página | `shared/api/` (sem regra de domínio) |
| Token/sessão | `shared/auth/` | `shared/auth/` |
| Formulário de login | `pages/login/ui/` | `features/auth/` |
| Card genérico | | `shared/ui/Card/` |
| Formatação de data | | `shared/lib/` |

"Multiuso confirmado" exige a regra de extração, não só um segundo consumidor.

## 5. Regras obrigatórias

1. Importar só de camadas inferiores.
2. API pública por `index.ts`: consumidores externos importam só do índice do slice, nunca de arquivos internos. Em `shared` usa-se um índice por segmento, não um `shared/index.ts` único; se isso prejudica o bundling, cada pasta de componente pode ter o seu. Para fronteira de runtime admite-se entrada extra como `index.server.ts`.
3. Sem cross-import entre slices da mesma camada (exceção estreita na seção 7).
4. Nomes por domínio, não por papel técnico: `model/user.ts`, `api/fetch-profile.ts`; evitar `types.ts`, `utils.ts`, `helpers.ts`.
5. Sem lógica de negócio em `shared/`: regras vão para a entity ou camada acima (ou ficam na página que as possui).

Quebrar regra exige decisão consciente, registrada (comentário ou ADR).

## 6. Recomendações

- Páginas primeiro: formulário, validação, fetch e estado específicos ficam locais.
- Conservador com entities: a camada é muito acessível, então mudanças se propagam. Começar sem ela; lógica de negócio não exige entity; CRUD é infraestrutura; dados de auth ficam em `shared`.
- Começar com poucas camadas (`app`, `pages`, `shared`) e acrescentar `features`/`entities` só com caso de uso real.
- Linter Steiger (oficial; instalação via npm, execução `npx steiger src`). Regras citadas: `insignificant-slice` (slice com 0 ou 1 referência; páginas e slices usados só por `app` são tolerados) e `excessive-slicing` (fatias demais numa camada).
- A fonte traz comandos de instalação do Steiger e seções "para agentes de IA"; são instruções ao leitor, não executadas aqui. Instalar o linter é decisão do projeto.

## 7. Anti-padrões

- Entity prematura ou para dado de uso único; CRUD em entities; entity `user` só para auth.
- Abusar de `@x` (ver abaixo).
- Extrair código de uso único; nomes por papel técnico.
- UI em entities sem cautela: só importar de camadas superiores, nunca de outra entity.
- Slices "deus": dividir em slices focados.
- Pasta `assets/` de topo.

## 8. Resolução de cross-import

Cross-import é cheiro de código, não proibição absoluta.

- Entities: preferir fundir as fronteiras (costumam estar granulares demais). `@x` é último recurso, só para entities, com justificativa documentada; usá-lo demais trava as fronteiras.
- Features e widgets, quatro estratégias:
  - A: fundir os slices que sempre mudam juntos.
  - B: mover a responsabilidade de domínio compartilhada para a entity dona, mantendo a UI na feature.
  - C: composição por camada superior (inversão de controle): página ou app importa ambos e os conecta por render props, slots ou injeção.
  - D: acesso via API pública, só quando o reuso for inevitável; nunca em `model/`, `store/` ou internos.

## 9. Segmentos

`ui/` (componentes, estilos), `model/` (estado, regras, validação), `api/` (backend), `lib/` (utilitários internos), `config/` (configuração, flags). `app` e `shared` não têm slices; seus segmentos podem importar entre si. Nas demais camadas: slice primeiro, segmentos dentro. Grupos de slices (opcional) servem só para navegação, sem API pública.

## 10. Camada shared

Permitido: `ui/` (kit), `lib/` (utilitários), `api/` (cliente, rotas, CRUD, DTOs), `auth/` (tokens, sessão), `config/`. Pode conhecer a aplicação (rotas, branding), mas nunca conter regras de entity/feature nem importar dessas camadas.

## 11. Ativos estáticos

Ativo mora com o módulo de mesmo ciclo de vida. Dono único: no slice, junto do consumidor (`ui/`; template de PDF acoplado à lógica, em `model/`). Cópia compartilhada: `shared/ui/`. CSS global e fontes: `app/styles/`, `app/fonts/`. Servidos como estão (favicon, robots.txt): `public/` do framework, fora do FSD. Evitar `assets/` de topo.

## 12. Migração (resumo)

- v2.0 para v2.1 (não quebra): auditar com Steiger, devolver slices de consumidor único ao consumidor, manter o realmente reutilizado, dissolver `processes/`. Widgets: migração opcional, por responsabilidade.
- Sem FSD: alias para `src/`, dividir por páginas primeiro, separar o resto em `shared/` (não importa páginas) e `app/` (importa), resolver imports entre páginas, desempacotar shared, organizar por segmentos, formar entities/features a partir de slices Redux multipágina.

## 13. Quando NÃO usar FSD (confirmado na fonte)

O guia de migração diz que alguns projetos vão bem sem FSD e manda perguntar à equipe se é necessário. Motivos para considerar: onboarding difícil, mudanças que quebram partes não relacionadas, muito contexto para adicionar funcionalidade. Adotar contra a vontade da equipe é desaconselhado. Critérios formais adicionais de exclusão: [não confirmado].
