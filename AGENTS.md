# Instruções do repositório

- Faça commits com Git semântico (Conventional Commits) e nunca adicione coautor.
- Não execute build nem rode a aplicação, salvo quando o usuário pedir explicitamente.
- Use UTF-8 em todos os arquivos e preserve acentos em português.
- Preserve correções de interface e decisões visuais já consolidadas. Antes de alterar estilos, leia este arquivo e trate as proteções registradas como requisitos de não regressão; não remova, simplifique nem sobrescreva essas soluções sem pedido explícito do usuário.
- Sempre que uma correção resolver um bug visual recorrente ou estabelecer uma decisão de interface que deva sobreviver a futuras alterações, registre-a neste `AGENTS.md`, incluindo o problema evitado e a restrição que deve ser preservada.

## Correções visuais protegidas

- No desktop (`min-width: 761px`), todas as `.hero__stack` devem ultrapassar 5px cada lateral da viewport, com `left: -5px` e `right: -5px`. Essa sangria elimina a borda residual que pode aparecer no lado esquerdo, especialmente no recorte inferior da stack 3. A regra deve permanecer comum aos SVGs `light` e `dark`; não crie comportamentos laterais diferentes por tema.
- No tema claro, o rótulo `PORTFÓLIO` do hero deve usar exatamente a cor do fundo escuro, centralizada na variável `--hero-bg-dark`. No tema escuro, preserve a cor clara já definida para os textos pequenos do hero.
- O espaço vertical entre as seções `Sobre`, `Tecnologias` e `Projetos` deve ser de 80px. A composição atual divide esse intervalo em 40px no final de uma seção e 40px no início da seguinte; preserve essa medida ao alterar paddings ou margens dessas seções.
- O seletor de tema deve permanecer no elemento `<main>` para alcançar o restante do site, além do `data-theme` próprio do hero. No modo escuro, as seções posteriores usam fundo preto por meio de `--paper`, textos principais brancos por meio de `--ink`, textos secundários claros por meio de `--muted` e superfícies/divisórias escuras apropriadas. Preserve a transição conjunta das cores ao alternar o tema.
- Os seis vagalumes do hero aparecem somente no tema escuro. Três devem permanecer nas laterais da região inferior, visualmente à frente da stack 3 sem ultrapassar o botão de tema; os outros três permanecem distribuídos entre as camadas. Preserve os núcleos brancos de 5px nos três vagalumes à frente da stack 3 e a variação de 1px, 2px e 4px nos três vagalumes entre as camadas, além do brilho verde difuso, dos percursos limitados por elemento, das piscadas suaves, da subida ao ativar o tema escuro, da descida ao voltar ao tema claro e da alternativa estática de `prefers-reduced-motion`. Durante a rolagem, os grupos também descem conforme a profundidade: os mais distantes a `1.55`, o intermediário a `1.15` e os da frente a `0.75` do deslocamento. Os grupos entre camadas devem desaparecer sob as stacks seguintes; o grupo frontal deve desaparecer sob a seção `.about`, mantendo `.about` acima da stack 3. No mobile, somente três vagalumes devem aparecer, um por plano de profundidade: `--2` com núcleo de 2px, `--3` com 1px e `--4` com 3px; `--1`, `--5` e `--6` permanecem ocultos.

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
