function ProjectCard({ project, index }) {
  return (
    <article className="project-card">
      <div className="project-card__meta"><span>0{index + 1}</span><span>Ver projeto ↗</span></div>
      <h3>{project.name}</h3>
      <div className={'project-card__visual visual--' + project.device}>
        <div className="device-mockup">
          <div className="device-mockup__screen">
            {project.image ? <img src={project.image} alt={project.imageAlt} /> : <span>Imagem do projeto</span>}
          </div>
        </div>
      </div>
      <p>{project.stack}</p>
    </article>
  )
}

export default ProjectCard
