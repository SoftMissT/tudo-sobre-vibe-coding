# EARS — Easy Approach to Requirements Syntax

Método estruturado para escrever requisitos em linguagem natural usando um conjunto pequeno de palavras-chave e padrões de frase. Criado por Alistair Mavin e colegas na Rolls-Royce, publicado na IEEE RE'09. Restringe a linguagem livre impondo ordem de cláusulas consistente e vocabulário limitado, reduzindo ambiguidade, vagueza e omissão.

> [!tip] A força do EARS é a mentalidade, não só a sintaxe
> As perguntas que cada padrão força ("isso é sempre verdade? tem um gatilho? só vale num estado?") estimulam a discussão sobre a **intenção central** do requisito. Escrever em EARS é uma ferramenta de pensamento, não só de formatação.

## Regra de cláusulas

Todo requisito EARS tem, nesta ordem temporal fixa:

- **Zero ou muitas** pré-condições (`While …`)
- **Zero ou um** gatilho (`When …` / `If …`)
- **Exatamente um** nome de sistema
- **Uma ou muitas** respostas do sistema (`shall …`)

Estrutura geral:

```
WHILE <pré-condição(ões)>, WHEN <gatilho>, the <sistema> SHALL <resposta>
```

## Os 5 padrões

### 1. Ubiquitous (ubíquo — sempre ativo)
Sem palavra-chave. Define uma propriedade fundamental, sempre verdadeira.

```
The <sistema> shall <resposta>.
```
- The system shall hash all passwords using bcrypt.
- The system shall support UTF-8 encoding.

### 2. Event-Driven (dirigido por evento)
Inicia **quando e somente quando** um gatilho ocorre.

```
When <gatilho>, the <sistema> shall <resposta>.
```
- When a user submits valid credentials, the system shall authenticate and redirect to the dashboard within 1 second.
- When a file upload exceeds 10MB, the system shall reject the upload and display an error message.

### 3. State-Driven (dirigido por estado)
Válido **durante** um estado contínuo.

```
While <estado>, the <sistema> shall <resposta>.
```
- While a user session is active, the system shall validate the session token on each request.

### 4. Unwanted Behavior (comportamento indesejado)
Trata erros, falhas e condições indesejadas. **O padrão mais negligenciado** — força a pensar no que dá errado.

```
If <condição indesejada>, then the <sistema> shall <resposta>.
```
- If a reset link is older than 1 hour, then the system shall reject the link and require a new reset request.

### 5. Optional Feature (feature opcional)
Só se aplica quando o sistema **inclui** uma feature específica.

```
Where <feature presente>, the <sistema> shall <resposta>.
```
- Where multi-factor authentication is enabled, the system shall require MFA verification before password reset.

## Requisitos complexos (combinados)

Combine palavras-chave para comportamento mais rico — mantendo a ordem `While → When → the … shall`:

```
While the aircraft is on ground, when reverse thrust is commanded,
the engine control system shall enable reverse thrust.
```

## Exemplo de bloco de requisitos (formato SDD)

```markdown
## Requisitos Funcionais (EARS)

### Ubiquitous
- **RF-001**: The system shall store all passwords hashed with bcrypt.

### Event-Driven
- **RF-002**: When a user requests a password reset, the system shall send a reset link to the registered email within 30 seconds.

### State-Driven
- **RF-003**: While a reset link is valid, the system shall allow the user to set a new password.

### Unwanted Behavior
- **RF-004**: If a reset link is older than 1 hour, then the system shall reject it and require a new request.

### Optional Feature
- **RF-005**: Where MFA is enabled, the system shall require MFA verification before completing the reset.
```

## Checklist antes de aprovar requisitos

- [ ] Cada requisito usa exatamente um dos 5 padrões (ou um complexo bem-formado).
- [ ] Há um nome de sistema claro (não "isso", "ele").
- [ ] A resposta é verificável — dá para escrever um teste a partir dela.
- [ ] Os comportamentos indesejados (`If/then`) foram considerados, não só o caminho feliz.
- [ ] Cada RF tem ID único e rastreável até um caso de teste.

## Fontes
- EARS, Mavin et al., IEEE RE'09: https://en.wikipedia.org/wiki/Easy_Approach_to_Requirements_Syntax
- Adopting EARS (Jama Software): https://www.jamasoftware.com/requirements-management-guide/writing-requirements/adopting-the-ears-notation-to-improve-requirements-engineering/
