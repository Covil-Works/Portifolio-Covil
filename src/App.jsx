import { useEffect, useRef, useState } from 'react'
import ProjectCard from './components/ProjectCard.jsx'
import bgLight from '../img/bg-light.svg'
import bgDark from '../img/bg-dark.svg'
import stack1Light from '../img/stack1-light.svg'
import stack1Dark from '../img/stack1-dark.svg'
import stack2Light from '../img/stack2-light.svg'
import stack2Dark from '../img/stack2-dark.svg'
import stack3Light from '../img/stack3-light.svg'
import stack3Dark from '../img/stack3-dark.svg'
import arthurPhoto from '../img/arthur.png'
import bird1 from '../img/b1.png'
import bird2 from '../img/b2.png'
import bird3 from '../img/b3.png'

const MOBILE_STACK_START = 20
const MOBILE_STACK_GAP = 10
const DESKTOP_STACK_START = 300
const DESKTOP_STACK_GAP = 30
const DESKTOP_STACK_3_TOP = DESKTOP_STACK_START + DESKTOP_STACK_GAP * 2
const HERO_CONTENT_OFFSET_Y = -100
const MOBILE_HERO_PHOTO_OFFSET_Y = -90
const MOBILE_HERO_MENU_OFFSET_Y = -120
const HERO_CONTENT_FADE = {
  start: 0.55,
  end: 0.8,
}
const STACK_SCROLL_SPEED = {
  desktop: [1, 0.7, 0.4],
  mobile: [0.8, 0.55, 0.3],
}
const DESKTOP_PARALLAX_DISTANCE = 60

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
  const heroRef = useRef(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return undefined

    const stacks = Array.from(hero.querySelectorAll('.hero__stack'))
    const about = document.querySelector('.about')
    const mobileQuery = window.matchMedia('(max-width: 760px)')
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frameId = null

    const updateParallax = () => {
      frameId = null
      const heroRect = hero.getBoundingClientRect()
      const scrollOffset = reducedMotionQuery.matches
        ? 0
        : Math.min(Math.max(-heroRect.top, 0), heroRect.height)
      const speeds = mobileQuery.matches
        ? STACK_SCROLL_SPEED.mobile
        : STACK_SCROLL_SPEED.desktop
      const scrollProgress = heroRect.height > 0 ? scrollOffset / heroRect.height : 0
      const fadeProgress = Math.min(Math.max(
        (scrollProgress - HERO_CONTENT_FADE.start)
          / (HERO_CONTENT_FADE.end - HERO_CONTENT_FADE.start),
        0,
      ), 1)
      const contentOpacity = 1 - fadeProgress
      const introScroll = Math.min(scrollOffset, DESKTOP_PARALLAX_DISTANCE)
      const stackOffsets = mobileQuery.matches
        ? speeds.map((speed) => scrollOffset * speed)
        : speeds.map((speed) => introScroll * speed)

      hero.style.setProperty('--hero-scroll-offset', `${scrollOffset}px`)
      hero.style.setProperty('--birds-scroll-offset', `${scrollOffset * 1.8}px`)
      hero.style.setProperty('--hero-content-opacity', contentOpacity)
      hero.toggleAttribute('data-content-hidden', contentOpacity === 0)
      if (about) about.style.marginTop = `${-stackOffsets[2]}px`
      stacks.forEach((stack, index) => {
        stack.style.setProperty('--stack-parallax-y', `${-stackOffsets[index]}px`)
      })
    }

    const requestParallaxUpdate = () => {
      if (frameId === null) frameId = window.requestAnimationFrame(updateParallax)
    }

    updateParallax()
    window.addEventListener('scroll', requestParallaxUpdate, { passive: true })
    window.addEventListener('resize', requestParallaxUpdate)
    mobileQuery.addEventListener('change', requestParallaxUpdate)
    reducedMotionQuery.addEventListener('change', requestParallaxUpdate)

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', requestParallaxUpdate)
      window.removeEventListener('resize', requestParallaxUpdate)
      mobileQuery.removeEventListener('change', requestParallaxUpdate)
      reducedMotionQuery.removeEventListener('change', requestParallaxUpdate)
      if (about) about.style.removeProperty('margin-top')
    }
  }, [])

  const toggleHeroTheme = () => {
    setHeroTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <main>
      <section
        ref={heroRef}
        className="hero"
        data-theme={heroTheme}
        style={{
          '--stack-3-top-desktop': `${DESKTOP_STACK_3_TOP}px`,
          '--hero-content-offset-y': `${HERO_CONTENT_OFFSET_Y}px`,
          '--mobile-hero-photo-offset-y': `${MOBILE_HERO_PHOTO_OFFSET_Y}px`,
          '--mobile-hero-menu-offset-y': `${MOBILE_HERO_MENU_OFFSET_Y}px`,
        }}
      >
        <div className="hero__background" aria-hidden="true">
          <img className="hero__background-image hero__background-image--light" src={bgLight} alt="" />
          <img className="hero__background-image hero__background-image--dark" src={bgDark} alt="" />
        </div>

        <div className="hero__birds" aria-hidden="true">
          <img className="hero__bird hero__bird--1" src={bird1} alt="" />
          <img className="hero__bird hero__bird--2" src={bird2} alt="" />
          <img className="hero__bird hero__bird--3" src={bird3} alt="" />
        </div>

        {heroStacks.map((stack, index) => (
          <div
            className={`hero__stack hero__stack--${index + 1}`}
            key={stack.light}
            style={{
              '--stack-top-desktop': `${stack.desktopTop}px`,
              '--stack-top-mobile': `${stack.mobileTop}px`,
            }}
            aria-hidden="true"
          >
            <img className="hero__stack-image hero__stack-image--light" src={stack.light} alt="" />
            <img className="hero__stack-image hero__stack-image--dark" src={stack.dark} alt="" />
          </div>
        ))}

        <div className="hero__fireflies hero__fireflies--between-back" aria-hidden="true">
          <span className="hero__firefly hero__firefly--1" />
          <span className="hero__firefly hero__firefly--2" />
        </div>
        <div className="hero__fireflies hero__fireflies--between-front" aria-hidden="true">
          <span className="hero__firefly hero__firefly--3" />
        </div>
        <div className="hero__fireflies hero__fireflies--foreground" aria-hidden="true">
          <span className="hero__firefly hero__firefly--4" />
          <span className="hero__firefly hero__firefly--5" />
          <span className="hero__firefly hero__firefly--6" />
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
          <div className="hero__layer hero__menu-layer">
            <nav aria-label="Navegação principal">
              <a href="#sobre">Sobre</a>
              <a href="#tecnologias">Tecnologias</a>
              <a href="#projetos">Projetos</a>
              <a href="#contato">Contato</a>
            </nav>
          </div>

          <div className="hero__layer hero__identity-layer">
            <img className="hero__photo" src={arthurPhoto} alt="" aria-hidden="true" />
            <header className="hero__name">
              <small>PORTFÓLIO</small>
              <h1>Arthur Pimentel</h1>
            </header>
          </div>
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
