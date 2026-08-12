import ProjectCard from './components/ProjectCard.jsx'

const projects = [
  { name: 'Projeto A', stack: 'Kotlin · PostgreSQL', device: 'phone', image: null, imageAlt: 'Tela do Projeto A' },
  { name: 'Projeto B', stack: 'Next.js · PostgreSQL', device: 'desktop', image: null, imageAlt: 'Tela do Projeto B' },
  { name: 'Projeto C', stack: 'Java · Spring', device: 'desktop', image: null, imageAlt: 'Tela do Projeto C' },
  { name: 'Projeto D', stack: 'Produto · Comunidade', device: 'phone', image: null, imageAlt: 'Tela do Projeto D' },
]

function App() {
  return (
    <main>
      <section className="hero">
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
