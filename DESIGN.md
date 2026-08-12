---
name: Portfólio Arthur Pimentel
description: Portfólio pessoal direto, técnico e responsivo.
colors:
  ink: "oklch(0.2 0.018 72)"
  muted: "oklch(0.46 0.025 72)"
  paper: "oklch(0.985 0.004 80)"
  honey: "oklch(0.817 0.161 75.1)"
  line: "oklch(0.78 0.025 72)"
typography:
  display:
    fontFamily: "Poppins, Arial, sans-serif"
    fontSize: "clamp(3rem, 7vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Poppins, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Poppins, Arial, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 700
    letterSpacing: "0.12em"
rounded:
  card: "14px"
  device: "0.85rem"
  pill: "999px"
spacing:
  content-gutter: "1.25rem"
  section-min: "5rem"
  section-max: "9rem"
components:
  download-button:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.9rem 1rem"
  technology-chip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.8rem 1.2rem"
  project-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
---

# Design System: Portfólio Arthur Pimentel

## Overview

**Creative North Star: "Clareza Técnica"**

O portfólio combina estrutura precisa, tipografia de forte presença e espaços generosos. Cada elemento comunica função ou hierarquia. O conteúdo regular fica limitado a 1200px e centralizado. Elementos de borda a borda só existem quando explicitamente solicitados.

**Key Characteristics:**

- Hierarquia tipográfica forte e direta.
- Composição responsiva com conteúdo centralizado.
- Componentes planos e sem sombras decorativas.
- Imagens de projetos em mockups de dispositivos.

## Colors

A paleta usa base quase branca, texto escuro e mel como único destaque.

### Primary

- **Mel solar:** marca, foco e elementos pontuais de alta atenção.

### Neutral

- **Tinta profunda:** texto, bordas e molduras.
- **Papel claro:** fundo e superfícies.
- **Texto secundário:** metadados e descrições.
- **Linha suave:** divisores discretos.

**The One Accent Rule.** O mel é o único destaque cromático recorrente.

## Typography

**Display Font:** Poppins, com Arial e sans-serif como fallback.  
**Body Font:** Poppins, com Arial e sans-serif como fallback.

**Character:** Geométrica, clara e contemporânea. Poppins é o padrão para títulos, corpo, navegação, botões e etiquetas.

### Hierarchy

- **Display:** peso 700, escala fluida de 3rem a 6rem e entrelinha 0.9.
- **Headline:** peso 700, escala fluida de 3.5rem a 7.5rem e entrelinha 0.88.
- **Title:** peso 700 e escala fluida de 1.5rem a 2.5rem.
- **Body:** peso 400, tamanho 1rem e entrelinha 1.5.
- **Label:** peso 700, tamanho 0.8rem, espaçamento 0.12em e caixa alta.

**The Poppins Rule.** Poppins é obrigatória em toda a interface. Outra família exige atualização deste documento.

## Elevation

O sistema é plano e não utiliza sombras. Profundidade vem de contraste tonal, bordas e encaixe dos mockups.

**The Flat-by-Default Rule.** Sombras decorativas são proibidas.

## Components

### Buttons

- **Shape:** formato pílula, raio 999px.
- **Primary:** papel claro, texto e borda escuros, padding de 0.9rem por 1rem.
- **Hover / Focus:** fundo escuro no hover e contorno mel de 3px no foco.

### Chips

- **Style:** fundo claro, borda escura de 2px e formato pílula.
- **State:** estáticos enquanto representarem tecnologias.

### Cards / Containers

- **Corner Style:** cantos de 14px apenas na área visual.
- **Background:** superfície clara com área para imagem.
- **Shadow Strategy:** nenhuma sombra.
- **Border:** linha superior fina nos metadados.
- **Internal Padding:** texto fora da área visual.

### Navigation

Links grandes e empilhados no hero, com travessão e deslocamento curto no hover. Em telas pequenas, formam uma coluna.

### Project Device Mockup

Cada projeto declara device, image e imageAlt. A imagem ocupa a tela e se ancora no topo. A moldura encosta na base do card, sem teclado ou borda inferior ornamental.

## Do's and Don'ts

### Do:

- **Do** usar Poppins em toda a interface.
- **Do** limitar conteúdo regular a 1200px.
- **Do** manter mockups encostados à base da área visual.
- **Do** fornecer texto alternativo específico para cada imagem.

### Don't:

- **Don't** criar conteúdo de borda a borda sem pedido explícito.
- **Don't** adicionar sombras decorativas, glassmorphism ou texto em gradiente.
- **Don't** adicionar teclado ao mockup de computador.
- **Don't** adicionar borda inferior ao mockup de celular.
- **Don't** introduzir outra tipografia sem revisar este sistema.
