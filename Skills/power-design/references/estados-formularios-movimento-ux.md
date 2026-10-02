# Estados, formulários, movimento e leis de UX

Fonte: repositório nexu-io/open-design, commit 53231d4, licença Apache-2.0 (craft/state-coverage.md, form-validation.md, animation-discipline.md, laws-of-ux.md); destilado por Claude — não é cópia.

Afirmações vêm das fontes; o resto é marcado [não confirmado]. As fontes não trazem instruções a agentes pedindo ações externas; suas diretrizes de design são tratadas como dado.

## A. Cobertura de estados

Toda superfície que busca, transforma ou recebe dados renderiza cinco estados; entregar só o populado é a falha mais comum em UI gerada.

| Estado | Deve conter |
|---|---|
| Carregando | esqueleto, spinner ou casca, mais aviso de demora aos 15 s |
| Vazio | título, explicação simples, CTA primário |
| Erro | causa em linguagem simples, ação de recuperação, entrada preservada |
| Populado | o caso para o qual o design foi desenhado |
| Borda | volume extremo, textos longos, opcionais ausentes, RTL, rede parcial, sem quebrar o layout |

Vazio: primeiro uso (ilustração, título, valor, CTA); sem resultados (repetir a consulta, sugerir alternativas); limpo (tom celebrativo). Erro nunca vira vazio.

Erro responde, em ordem: o que houve, por quê, o que fazer. Formulário não limpa na falha. Severidade proporcional: campo, formulário (resumo no topo), seção, página, aplicativo.

Retry: primeira tentativa imediata; depois espera de 2 s, 4 s, 8 s no máximo; após 3 falhas, "Falar com suporte" com ID copiável; mostrar "última tentativa há Xs".

Carregamento: 0–300 ms sem indicador; 300 ms–2 s spinner ou esqueleto discreto; 2–10 s esqueleto fiel ou spinner rotulado; 10–30 s barra determinada com cancelar; 30–60 s barra com cancelar explícito; acima de 60 s parar a animação e oferecer erro, retry ou continuar. Todo pedido tem timeout.

ARIA e foco:
- Erro inline no envio: role="alert"; foco no primeiro campo com erro.
- Toast não urgente: role="status"; foco fica.
- Erro crítico ou confirmação destrutiva: role="alertdialog"; foco no diálogo.
- Início do carregamento: role="status"; foco não vai ao spinner.
- Fim, após ação do usuário: foco no conteúdo carregado.
- A região live já deve existir no DOM antes do conteúdo.

Evitar: carregamento de página inteira para busca parcial; toasts em posições variadas; erro só por cor; toast que não pausa em hover ou foco (WCAG 2.2.1).

## B. Formulários e validação

Estados extras: intocado (sem mensagens), preenchido válido (sem cor de sucesso), envio pendente (botão em carregamento, campos travados).

Máquina do campo: pristine, dirty, touched, invalid-after-touched, invalid-after-submit, recovering, submitting, server-error. O erro aparece ao entrar em invalid-after-touched, some ao deixar o estado inválido e nunca surge em pristine ou dirty. Estilizar com :user-invalid, não :invalid (evita bordas vermelhas ao carregar).

Quando validar:
1. Primeiro blur após edição; nunca no foco nem a cada tecla.
2. Campo inválido revalida no evento input, para o erro sumir ao corrigir.
3. No envio, rodar o schema e mover o foco ao resumo de erros (título, tabindex="-1", sem role="alert") ou ao primeiro campo inválido.
4. Checagem assíncrona de fundo: debounce de 250–500 ms, anúncio polite, sem travar a digitação; a resposta autoritativa do servidor no envio deve ser aguardada.

Plataforma: usar atributos nativos (required, type, pattern, min/max, minlength/maxlength, step); setCustomValidity nos eventos input e change, limpo com string vazia (null não limpa); requestSubmit(), nunca submit(). Para CEP, OTP e cartão, texto com inputmode numérico e pattern, não type="number".

Mensagens: específicas, não genéricas; 4–7 mensagens distintas para campos complexos (e-mail, telefone, cartão, CEP). Sugerir a correção quando determinável (WCAG 3.3.3).

Rótulos: label associado a todo campo (a fonte cita 51% das home pages do top 1M com rótulo ausente em algum input). Fiação básica (label, aria-describedby, aria-invalid, role="alert" em erro inline) está em accessibility-baseline.md, não lido.

Outras regras: preservar entrada (34% dos checkouts auditados apagam o cartão); servidor é a verdade, mesmo schema nos dois lados; em Server Action retornar { errors } em vez de lançar; novalidate no HTML do servidor elimina a validação nativa sem JS (usar noValidate após hidratação ou garantir validação no servidor); sem aria-busy no botão de envio; sem campo de repetir e-mail (WCAG 3.3.7).

WCAG 3.3: 3.3.4 exige reversão, checagem com correção ou tela de confirmação em envios legais, financeiros ou de dados; 3.3.8 proíbe teste cognitivo em autenticação sem alternativa (não bloquear colar em senha e código).

Mobile: cada plataforma tem primitivo próprio de anúncio e erro; não espelhar aria-* no nativo.

## C. Disciplina de movimento

Quando animar: a fonte (Tversky et al., 2002) diz que animação não supera o estático para ensinar; o uso endossado é reorientação espacial ou temporal (navegação, expansão de contêiner, progresso, gesto). Não animar para decorar ou sinalizar "premium".

Durações:
- 50–100 ms: feedback instantâneo (press, toggle, hover).
- 150 ms: padrão de confirmação de estado.
- 200–300 ms: entrada de modais, sheets, dropdowns.
- 300–500 ms: transições entre telas e morfes.
- Acima de 500 ms: só entre telas, em etapas ou nativo da plataforma.
- Microinterações abaixo de 500 ms; as frequentes até 200 ms; mobile 20–30% mais curto.

Easing: curva para opacidade e cor; mola para posição, escala, rotação e gestos. Padrão Material 3: cubic-bezier(0.2, 0, 0, 1); a simétrica (0.4, 0, 0.2, 1) é a legada do M2. Mola padrão SwiftUI: response 0.5, dampingFraction 0.825. Padrões de bibliotecas de mola divergem; escolher conscientemente.

Movimento reduzido: toda animação com translate, scale, rotate ou parallax respeita prefers-reduced-motion: reduce. Regra de trabalho: remover movimento em eixo, manter crossfade de opacidade ou cor se a mudança precisa ser comunicada. View Transitions não aplica a preferência sozinha. WCAG 2.2.2 é nível A; o vestibular está em 2.3.3, AAA.

Flash: no máximo três por segundo (2.3.1, A; 2.3.2, AAA).

Repetido: carrossel para após 3–5 ciclos; movimento acima de 5 s exige pausa; recompensas disparam uma vez; spinner para aos 60 s.

Evitar: movimento como único sinal de mudança; animar em vez de confirmar (UI otimista primeiro); movimento decorativo em ferramentas de produtividade. Doherty não contém "400 ms" (menor limiar medido: 300 ms).

## D. Leis de UX

- Proximidade: perto agrupa; 8–12 px dentro do grupo, 32–48 px entre grupos.
- Similaridade: equivalentes com tratamento idêntico; desvio só no item a destacar.
- Região comum: contêiner delimitado agrupa; padding mínimo de 16 px; não delimitar tudo.
- Prägnanz: alinhar a uma grade clara.
- Conectividade uniforme: linhas e barras ligando itens são o agrupamento mais forte; usar em wizards.
- Atenção seletiva: maior contraste só na ação relevante única.
- Von Restorff: destacar o item único, com sinal além da cor.
- Estético-usabilidade: polimento aumenta a usabilidade percebida; não substitui estados.
- Hick: 3–5 opções primárias visíveis, resto em divulgação progressiva, recomendada destacada.
- Excesso de escolha: 3–4 planos com um recomendado; 6–9 cards acima da dobra; no máximo 5 grupos de configuração.
- Ancoragem: o primeiro número pesa; plano recomendado como âncora, economia em valor absoluto, padrão seguro pré-selecionado.
- Pareto: destacar 2–3 ações da jornada principal; resto em overflow.
- Tesler: complexidade não some; orientar onde chega ao usuário.
- Occam: inventário mínimo; sem enfeite sem tarefa.
- Miller: cerca de 4 itens confiáveis, até 7 a curto prazo; agrupar com títulos e seções.
- Memória de trabalho: reconhecer vence lembrar; persistir filtros, contexto e migalhas.
- Posição serial: itens importantes nas pontas do menu, utilitários no meio.
- Pico-fim: investir no sucesso final; passos intermediários calmos.
- Zeigarnik: progresso visível em fluxos benéficos; em streaks e cotas é padrão sombrio.
- Fitts: alvos maiores e próximos; piso de 24 × 24 px CSS (WCAG 2.5.8; HIG 44 pt, Material 48 dp).
- Doherty: feedback abaixo de cerca de 1 s mantém o fluxo; usar os limiares da seção A.
- Fluxo: equilibrar desafio e habilidade; feedback contínuo, sem atrito.
- Gradiente de meta: progresso real; sem prerrequisito, mostrar "1 de N".
- Postel: aceitar formatos variados, normalizar por dentro, emitir um formato.
- Jakob: seguir convenções da categoria; novidade deve compensar.
- Modelo mental: ancorar no produto de referência do briefing.
- Paradoxo do usuário ativo: dicas inline e vazio instrutivo no ponto de ação.
- Parkinson: cortar atrito e pré-preencher para o fluxo acabar antes do esperado.
- Carga cognitiva: o design controla a carga extrínseca (layout, jargão, ruído).

## Checklist de verificação

- [ ] Cada lista, tabela, card, formulário e painel tem os cinco estados.
- [ ] Vazio tem título, explicação e CTA; erro nunca aparece como vazio.
- [ ] Erro diz o que houve, por quê e o que fazer, e preserva a entrada.
- [ ] Todo pedido tem timeout; indicadores seguem os limiares; aviso aos 15 s.
- [ ] Retry em 2 s, 4 s, 8 s; após 3 falhas, suporte com ID.
- [ ] Região live existe antes do conteúdo; foco segue a tabela ARIA.
- [ ] Erro nunca só por cor; toasts na mesma posição e pausáveis.
- [ ] Validação no primeiro blur; revalida em input; :user-invalid em vez de :invalid.
- [ ] Mensagens específicas; resumo só no envio, sem role="alert" nele.
- [ ] Atributos nativos presentes; sem submit(); string vazia limpa setCustomValidity.
- [ ] Durações nas faixas (150 ms padrão; abaixo de 500 ms fora de navegação).
- [ ] prefers-reduced-motion cobre translate, scale, rotate, parallax; há sinal estático.
- [ ] No máximo três flashes por segundo; loops limitados; recompensas únicas.
- [ ] Alvos de pelo menos 24 × 24 px; 3–4 planos com um recomendado.

## Limites

- Fonte única, commit fixo; citações acadêmicas, estatísticas Baymard e WebAIM e suporte de navegadores não verificados de forma independente [não confirmado].
- As leis de UX são orientação, sem verificação automática, segundo a fonte.
- accessibility-baseline.md, typography.md, color.md e anti-ai-slop.md são citados, mas não foram lidos.
