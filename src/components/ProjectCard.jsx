function ProjectCard({ project, index }) {
  const renderScreen = (image = project.image, imageAlt = project.imageAlt, isDecorative = false) => (
    <div className="device-mockup__screen">
      {image ? (
        <img src={image} alt={isDecorative ? '' : imageAlt} aria-hidden={isDecorative || undefined} />
      ) : (
        <span>{isDecorative ? '' : 'Imagem do projeto'}</span>
      )}
    </div>
  )

  return (
    <article className="project-card">
      <div className="project-card__meta"><span>0{index + 1}</span><span>Ver projeto ↗</span></div>
      <h3>{project.name}</h3>
      <div className={'project-card__visual visual--' + project.device}>
        {project.device === 'phone' ? (
          <div className="phone-preview">
            <div className="device-mockup device-mockup--rear device-mockup--left" aria-hidden="true">
              {renderScreen(project.phoneImages?.left, '', true)}
            </div>
            <div className="device-mockup device-mockup--rear device-mockup--right" aria-hidden="true">
              {renderScreen(project.phoneImages?.right, '', true)}
            </div>
            <div className="device-mockup device-mockup--main">
              {renderScreen()}
            </div>
          </div>
        ) : (
          <div className="device-mockup">
            {renderScreen()}
          </div>
        )}
      </div>
      <p>{project.stack}</p>
    </article>
  )
}

export default ProjectCard
