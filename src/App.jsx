import { useState } from 'react'
import ProjectCard from './components/ProjectCard.jsx'
import bgLight from '../img/bg-light.svg'
import bgDark from '../img/bg-dark.svg'
import stack1Light from '../img/stack1-light.svg'
import stack1Dark from '../img/stack1-dark.svg'
import stack2Light from '../img/stack2-light.svg'
import stack2Dark from '../img/stack2-dark.svg'
import stack3Light from '../img/stack3-light.svg'
import stack3Dark from '../img/stack3-dark.svg'

const MOBILE_STACK_START = 20
const MOBILE_STACK_GAP = 10
const DESKTOP_STACK_START = 300
const DESKTOP_STACK_GAP = 30
const DESKTOP_STACK_3_TOP = DESKTOP_STACK_START + DESKTOP_STACK_GAP * 2

const heroStacks = [
  { light: stack1Light, dark: stack1Dark },
  { light: stack2Light, dark: stack2Dark },
  { light: stack3Light, dark: stack3Dark },
].map((stack, index) => ({
  ...stack,
  desktopTop: DESKTOP_STACK_START + DESKTOP_STACK_GAP * index,
  mobileTop: MOBILE_STACK_START + MOBILE_STACK_GAP * index,
}))

const projects = [
  { name: 'Projeto A', stack: 'Kotlin · PostgreSQL', device: 'phone', image: null, imageAlt: 'Tela do Projeto A' },
  { name: 'Projeto B', stack: 'Next.js · PostgreSQL', device: 'desktop', image: null, imageAlt: 'Tela do Projeto B' },
  { name: 'Projeto C', stack: 'Java · Spring', device: 'desktop', image: null, imageAlt: 'Tela do Projeto C' },
  { name: 'Projeto D', stack: 'Produto · Comunidade', device: 'phone', image: null, imageAlt: 'Tela do Projeto D' },
]

function App() {
  const [heroTheme, setHeroTheme] = useState('light')

  const toggleHeroTheme = () => {
    setHeroTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <main>
      <section
        className="hero"
        data-theme={heroTheme}
        style={{ '--stack-3-top-desktop': `${DESKTOP_STACK_3_TOP}px` }}
      >
        <div className="hero__background" aria-hidden="true">
          <img className="hero__background-image hero__background-image--light" src={bgLight} alt="" />
          <img className="hero__background-image hero__background-image--dark" src={bgDark} alt="" />

          {heroStacks.map((stack, index) => (
            <div
              className={`hero__stack hero__stack--${index + 1}`}
              key={stack.light}
              style={{
                '--stack-top-desktop': `${stack.desktopTop}px`,
                '--stack-top-mobile': `${stack.mobileTop}px`,
              }}
            >
              <img className="hero__stack-image hero__stack-image--light" src={stack.light} alt="" />
              <img className="hero__stack-image hero__stack-image--dark" src={stack.dark} alt="" />
            </div>
          ))}
        </div>

        <button
          className="theme-toggle"
          type="button"
          onClick={toggleHeroTheme}
          aria-label={`Ativar modo ${heroTheme === 'light' ? 'escuro' : 'claro'}`}
          aria-pressed={heroTheme === 'dark'}
        >
          {heroTheme === 'light' ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.5 14.1A8.5 8.5 0 0 1 9.9 3.5a8.5 8.5 0 1 0 10.6 10.6Z" />
            </svg>
          )}
        </button>

        <div className="content hero__content">
          <header className="identity">
            <span className="logo" aria-hidden="true">AP</span>
            <div><small>PORTFÓLIO</small><h1>Arthur Pimentel</h1></div>
          </header>

          <nav aria-label="Navegação principal">
            <a href="#sobre">Sobre</a>
            <a href="#tecnologias">Tecnologias</a>
            <a href="#projetos">Projetos</a>
            <a href="#contato">Contato</a>
          </nav>
        </div>
      </section>

      <section className="about content" id="sobre">
        <div>
          <h2>Sobre</h2>
          <p className="lead">Sou Arthur Pimentel. Desenvolvo experiências digitais e produtos que aproximam tecnologia, clareza e propósito.</p>
          <a className="contact-link" href="#contato">Vamos conversar ↗</a>
        </div>

        <aside>
          <h3>Download do Currículo</h3>
          <p>Conheça minha experiência, formação e trajetória profissional.</p>
          <a className="download-button" href="/curriculo-arthur-pimentel.pdf" download>
            <span>Baixar currículo</span><span aria-hidden="true">↓</span>
          </a>

          <h3 id="contato">Contato</h3>
          <p>Disponível para novos projetos e boas conversas.</p>
        </aside>
      </section>

      <section className="technologies content" id="tecnologias">
        <div className="section-title"><small>FERRAMENTAS E PLATAFORMAS</small><h2>Tecnologias</h2></div>
        <ul><li>React</li><li>Next.js</li><li>Kotlin</li><li>PostgreSQL</li></ul>
      </section>

      <section className="projects content" id="projetos">
        <div className="section-title"><small>TRABALHOS SELECIONADOS</small><h2>Projetos</h2></div>
        <div className="project-grid">
          {projects.map((project, index) => <ProjectCard key={project.name} project={project} index={index} />)}
        </div>
      </section>
    </main>
  )
}

export default App
