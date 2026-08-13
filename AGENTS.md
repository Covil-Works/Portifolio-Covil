# Instruções do repositório

- Faça commits com Git semântico (Conventional Commits) e nunca adicione coautor.
- Não execute build nem rode a aplicação, salvo quando o usuário pedir explicitamente.
- Use UTF-8 em todos os arquivos e preserve acentos em português.

## Contrato visual do hero em camadas

O hero é uma composição calibrada de SVGs sobrepostos. As medidas, velocidades, margens, preenchimentos e ordens de empilhamento atuais funcionam em conjunto para preservar o desenho. Trate este conjunto como uma invariante visual, não como valores independentes que podem ser simplificados.

### Regras obrigatórias

1. O conteúdo do hero — nome, foto e menu — deve acompanhar a rolagem, passar entre as camadas SVG e aparentar afundar na composição.
2. O nome `Arthur Pimentel` e a foto pertencem ao mesmo container e à mesma camada. Não os separe em layers ou z-index diferentes.
3. Nome e foto devem passar entre a stack 1 e a stack 2.
4. O menu deve passar entre a stack 2 e a stack 3.
5. As camadas produzem parallax: as camadas visualmente mais distantes sobem mais rápido que as camadas da frente.
6. Os temas claro e escuro usam os pares de arquivos `*-light.svg` e `*-dark.svg`. O botão de tema alterna `data-theme` e a opacidade dos arquivos correspondentes; preserve essa associação por nome.
7. Nunca pode surgir espaço vazio entre as camadas durante a rolagem. Preserve os preenchimentos de `hero__stack::after`, suas cores por tema e a compensação aplicada à margem superior da seção `.about`.
8. O conteúdo do hero não pode aparecer por trás de `Sobre`, `Tecnologias`, `Projetos` ou qualquer seção posterior. Preserve o recorte do hero, o desaparecimento do conteúdo e superfícies opacas/ordens de empilhamento que separam as seções.
9. A ordem de profundidade é intencional: fundo em `z-index: 0`; stack 1 em `2`; container conjunto de nome e foto em `3`; stack 2 em `4`; menu em `5`; stack 3 em `6`; botão de tema em `7`; seção `.about` em `8`. Essa alternância é o que permite ao conteúdo passar entre os SVGs.

### Calibração protegida

Preserve, salvo pedido explícito para recalibrar as camadas:

- `MOBILE_STACK_START = 20` e `MOBILE_STACK_GAP = 10`.
- `DESKTOP_STACK_START = 300` e `DESKTOP_STACK_GAP = 30`.
- `DESKTOP_STACK_3_TOP` derivado do início e do espaçamento desktop.
- `STACK_SCROLL_SPEED.desktop = [1, 0.7, 0.4]`.
- `STACK_SCROLL_SPEED.mobile = [0.8, 0.55, 0.3]`.
- `DESKTOP_PARALLAX_DISTANCE = 60` apenas como limite do movimento das stacks no desktop; não use esse limite no deslocamento do conteúdo.
- Altura desktop do hero: `calc(var(--stack-3-top-desktop) + 33.928571vw)`.
- No mobile, `--composition-width: calc(294.7368421svh - 117.8947368px)` e altura de `100svh`.
- Extensão inferior de cada stack com início em `calc(100% - 1px)` e altura de `calc(100svh + 2px)`.
- O cálculo `about.style.marginTop = -stackOffsets[2]`, que fecha a composição após o deslocamento da última stack.
- `overflow: hidden` e `isolation: isolate` no hero, além do fundo opaco de `.about::before`.

Não altere isoladamente dimensões dos SVGs, offsets, gaps, velocidades, altura do hero, extensões `::after`, margem compensatória ou z-index. Uma mudança em qualquer um desses pontos exige revisar o sistema completo em desktop e mobile e garantir todas as regras obrigatórias acima.

### Parte flexível

Nome, foto, menu, tipografia, espaçamentos e offsets internos do conteúdo podem ser alterados. Essas mudanças são permitidas desde que nome e foto permaneçam juntos no mesmo container entre as stacks 1 e 2, o menu permaneça entre as stacks 2 e 3, e todo o conteúdo desapareça completamente antes de alcançar as seções posteriores.

### Referência histórica

Para entender a construção antes de alterar a composição, consulte os commits:

- `5245269` — alinhamento dos limites das stacks no desktop.
- `df45cf2` — composição em camadas, parallax, preenchimentos e isolamento das seções.
- `ece7c3c` — rolagem completa do conteúdo no desktop, independente do limite de movimento das stacks.
