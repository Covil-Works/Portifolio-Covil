import { useEffect, useRef, useState } from 'react'
import { FaLinkedin } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import {
  SiGithub,
  SiGooglescholar,
  SiKotlin,
  SiNextdotjs,
  SiOpenjdk,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSpringboot,
  SiWhatsapp,
} from 'react-icons/si'
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

const experiences = [
  {
    name: 'UFPA',
    context: 'Ciência da Computação · 2022 - Atual',
    summary: 'Base acadêmica em computação',
    description: [
      'Entrei na UFPA em 2022 para cursar Ciência da Computação e estou concluindo a graduação no fim de 2026.',
      'No curso, construí a base que sustenta meu trabalho como desenvolvedor: programação, estruturas de software, bancos de dados, sistemas operacionais, sistemas distribuídos e redes de computadores.',
    ],
  },
  {
    name: 'GERCOM',
    context: 'Laboratório de redes · 2022 - Atual',
    summary: 'Pesquisa, software e infraestrutura',
    description: [
      'Nesse laboratório da UFPA, especializado em redes, fiz pesquisa e desenvolvimento em computação quântica e publiquei artigos relevantes.',
      'Além de desenvolver softwares, trabalhei com Python, Docker, infraestrutura, redes, criação e manutenção de sites e PHP.',
      'Também apoiei a organização de eventos, apresentei trabalhos, ministrei aulas, acompanhei e orientei iniciantes e voluntários do grupo.',
      'O meu perfil do Google Scholar reúne as publicações mais recentes.',
    ],
    cta: { label: 'Ver publicações no contato', href: '#contato' },
  },
  {
    name: 'DIAVI',
    context: 'Estágio · Reitoria da UFPA · 2026 - Atual',
    summary: 'Portal institucional de dados',
    description: [
      'Atuo na Diretoria de Avaliação Institucional da Reitoria da UFPA, mantendo e evoluindo um portal de análise de dados institucionais.',
      'Transformei fluxos baseados em planilhas em um sistema com banco de dados, autenticação, segurança de login e perfis de acesso por tipo de usuário.',
      'Otimizei consultas de cerca de 1 minuto para aproximadamente 5 segundos ao modelar o PostgreSQL e pré-calcular dados, reduzindo o portal de centenas para dezenas de megabytes.',
      'O projeto usa Next.js, PostgreSQL, serverless e Firebase; também presto suporte de TI quando necessário.',
    ],
  },
  {
    name: 'Covil',
    context: 'Empresa cofundada · 2026 - Atual',
    summary: 'Produtos, clientes e comunidade',
    description: [
      'Cofundei a Covil em 2026 convidando amigos para criar soluções de software, prospectar clientes e desenvolver produtos próprios e para terceiros.',
      'Trabalhamos com aplicativos Android em Kotlin, sistemas web em React e Next.js, backends em Java com Spring Boot e bancos relacionais com PostgreSQL.',
      'Além dos projetos comerciais, criamos soluções open source e damos aulas sobre desenvolvimento, contribuindo com a comunidade dev enquanto a empresa segue ativa.',
    ],
    cta: { label: 'Conhecer a Covil', href: 'https://covildev.com', external: true },
  },
]

const technologies = [
  { name: 'React', icon: SiReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Kotlin', icon: SiKotlin },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'Spring Boot', icon: SiSpringboot },
  { name: 'Java', icon: SiOpenjdk },
  { name: 'Python', icon: SiPython },
]

const projects = [
  { name: 'Projeto A', stack: 'Kotlin · PostgreSQL', device: 'phone', image: null, imageAlt: 'Tela do Projeto A' },
  { name: 'Projeto B', stack: 'Next.js · PostgreSQL', device: 'desktop', image: null, imageAlt: 'Tela do Projeto B' },
  { name: 'Projeto C', stack: 'Java · Spring', device: 'desktop', image: null, imageAlt: 'Tela do Projeto C' },
  { name: 'Projeto D', stack: 'Produto · Comunidade', device: 'phone', image: null, imageAlt: 'Tela do Projeto D' },
]

const contactChannels = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/artuenric', icon: FaLinkedin },
  { label: 'GitHub', href: 'https://github.com/artuenric', icon: SiGithub },
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?hl=en&user=Wm2qsHQAAAAJ&view_op=list_works&sortby=pubdate', icon: SiGooglescholar },
  { label: 'E-mail', href: 'mailto:artuenrick.dev@gmail.com', icon: MdEmail },
  { label: 'WhatsApp', href: 'https://wa.me/5591986402937', icon: SiWhatsapp },
]

function ExperienceDetails({ experience, onClose }) {
  return (
    <div className="experience__detail-content">
      {onClose && (
        <button className="experience__detail-close" type="button" onClick={onClose} aria-label={`Recolher ${experience.name}`}>−</button>
      )}
      <small>{experience.context}</small>
      <h3>{experience.name}</h3>
      {experience.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {experience.cta && <a className="experience__detail-cta" href={experience.cta.href} target={experience.cta.external ? '_blank' : undefined} rel={experience.cta.external ? 'noreferrer' : undefined}>{experience.cta.label}</a>}
    </div>
  )
}

function App() {
  const [heroTheme, setHeroTheme] = useState('dark')
  const [activeExperience, setActiveExperience] = useState(0)
  const heroRef = useRef(null)
  const experienceRef = useRef(null)

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
      hero.style.setProperty('--fireflies-back-scroll-offset', `${scrollOffset * 1.55}px`)
      hero.style.setProperty('--fireflies-middle-scroll-offset', `${scrollOffset * 1.15}px`)
      hero.style.setProperty('--fireflies-front-scroll-offset', `${scrollOffset * 0.75}px`)
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

  useEffect(() => {
    const experienceSection = experienceRef.current
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!experienceSection) return undefined

    const items = Array.from(experienceSection.querySelectorAll('.experience__timeline > li'))
    let frameId = null

    const updateExperienceScroll = () => {
      frameId = null
      if (reducedMotionQuery.matches) {
        items.forEach((item) => item.style.removeProperty('--experience-scroll-shift'))
        return
      }

      const sectionRect = experienceSection.getBoundingClientRect()
      const progressStart = window.innerHeight * 0.88
      const progressEnd = window.innerHeight * -0.12

      const progress = Math.min(Math.max(
        (progressStart - sectionRect.top) / (progressStart - progressEnd),
        0,
      ), 1)

      items.forEach((item, index) => {
        const itemProgress = (progress * items.length) - index
        const itemPulse = itemProgress > 0 && itemProgress < 1
          ? 1 - Math.abs((itemProgress * 2) - 1)
          : 0
        item.style.setProperty('--experience-scroll-shift', `${(itemPulse * 0.55).toFixed(3)}rem`)
      })
    }

    const requestExperienceUpdate = () => {
      if (frameId === null) frameId = window.requestAnimationFrame(updateExperienceScroll)
    }

    updateExperienceScroll()
    window.addEventListener('scroll', requestExperienceUpdate, { passive: true })
    window.addEventListener('resize', requestExperienceUpdate)
    reducedMotionQuery.addEventListener('change', requestExperienceUpdate)

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', requestExperienceUpdate)
      window.removeEventListener('resize', requestExperienceUpdate)
      reducedMotionQuery.removeEventListener('change', requestExperienceUpdate)
      items.forEach((item) => item.style.removeProperty('--experience-scroll-shift'))
    }
  }, [])

  const toggleHeroTheme = () => {
    setHeroTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light')
  }

  const toggleExperience = (index) => {
    setActiveExperience((currentIndex) => currentIndex === index ? null : index)
  }

  const selectedExperience = activeExperience === null ? null : experiences[activeExperience]

  return (
    <main data-theme={heroTheme}>
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
              <a href="#experiencia">Experiência</a>
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
        <div className="about__intro">
          <h2>Sobre</h2>
          <p className="lead">Sou Arthur Pimentel. Desenvolvo experiências digitais e produtos que aproximam tecnologia, clareza e propósito.</p>
        </div>

        <aside className="resume">
          <h3>Currículo</h3>
          <p>Conheça minha experiência, formação e trajetória profissional.</p>
          <a className="download-button" href="/curriculo-arthur-pimentel.pdf" download>
            <span>Baixar currículo</span><span aria-hidden="true">↓</span>
          </a>
        </aside>

        <div className="about__stack" id="tecnologias">
          <span className="stack-heading">Stack</span>
          <ul>
            {technologies.map(({ name, icon: Icon }) => (
              <li key={name}><Icon aria-hidden="true" /><span>{name}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section ref={experienceRef} className="experience content" id="experiencia">
        <header className="experience__header">
          <h2>Experiência</h2>
        </header>

        <div className="experience__layout">
          <ol className="experience__timeline">
            {experiences.map((experience, index) => {
              const isActive = activeExperience === index
              const detailId = `experience-details-${index}`

              return (
                <li
                  className={isActive ? 'is-active' : ''}
                  key={experience.name}
                >
                  <button
                    type="button"
                    onClick={() => toggleExperience(index)}
                    aria-expanded={isActive}
                    aria-controls={detailId}
                  >
                    <span className="experience__main">
                      <span className="experience__label">
                        <strong>{experience.name}</strong>
                        <span>{experience.summary}</span>
                      </span>
                    </span>
                    <span className="experience__toggle" aria-hidden="true">{isActive ? '−' : '+'}</span>
                  </button>

                  <div className="experience__mobile-details" id={detailId} aria-hidden={!isActive}>
                    <div>
                      <ExperienceDetails experience={experience} onClose={() => toggleExperience(index)} />
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>

          <div className="experience__desktop-details" aria-live="polite">
            {selectedExperience ? (
              <ExperienceDetails key={selectedExperience.name} experience={selectedExperience} />
            ) : (
              <p className="experience__empty">Selecione uma experiência para ver os detalhes.</p>
            )}
          </div>
        </div>
      </section>

      <section className="projects content" id="projetos">
        <div className="section-title"><small>TRABALHOS SELECIONADOS</small><h2>Projetos</h2></div>
        <div className="project-grid">
          {projects.map((project, index) => <ProjectCard key={project.name} project={project} index={index} />)}
        </div>

      </section>

      <section className="contact content" id="contato">
        <div className="section-title">
          <h2>Contato</h2>
        </div>
        <p className="contact__intro">Conheça mais do meu trabalho ou entre em contato pelos canais abaixo.</p>
        <ul className="contact__channels">
          {contactChannels.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              {href ? (
                <a href={href} target="_blank" rel="noreferrer">
                  <span className="contact__channel-label"><Icon aria-hidden="true" /><span>{label}</span></span>
                  <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <span className="contact__channel-pending">
                  <span className="contact__channel-label"><Icon aria-hidden="true" /><span>{label}</span></span>
                  <span>Link a definir</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App
