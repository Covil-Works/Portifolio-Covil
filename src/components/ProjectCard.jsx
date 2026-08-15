import { useEffect, useRef, useState } from 'react'

const PHONE_ROTATION_ORDER = ['main', 'left', 'right']

function ProjectCard({ project, index }) {
  const [phoneRotationStep, setPhoneRotationStep] = useState(0)
  const [isPhoneCycling, setIsPhoneCycling] = useState(false)
  const [desktopCarouselStep, setDesktopCarouselStep] = useState(0)
  const phoneRotationTimer = useRef(null)
  const desktopCarouselTimer = useRef(null)
  const canRotatePhonePreview = project.device === 'phone' && project.rotatePhonePreview
  const canRotateDesktopPreview = project.device === 'desktop' && project.carouselImages?.length > 1
  const canAutoPreview = canRotatePhonePreview || canRotateDesktopPreview

  const stopPhoneRotation = () => {
    if (phoneRotationTimer.current) {
      clearInterval(phoneRotationTimer.current)
      phoneRotationTimer.current = null
    }

    setIsPhoneCycling(false)
    setPhoneRotationStep(0)
  }

  const stopDesktopCarousel = () => {
    if (desktopCarouselTimer.current) {
      clearInterval(desktopCarouselTimer.current)
      desktopCarouselTimer.current = null
    }

    setDesktopCarouselStep(0)
  }

  useEffect(() => () => {
    stopPhoneRotation()
    stopDesktopCarousel()
  }, [])

  const startPhoneRotation = () => {
    if (!canRotatePhonePreview || phoneRotationTimer.current) return

    setIsPhoneCycling(true)
    setPhoneRotationStep(1)
    phoneRotationTimer.current = setInterval(() => {
      setPhoneRotationStep((currentStep) => (currentStep + 1) % PHONE_ROTATION_ORDER.length)
    }, 1500)
  }

  const startDesktopCarousel = () => {
    if (!canRotateDesktopPreview || desktopCarouselTimer.current) return

    setDesktopCarouselStep(1)
    desktopCarouselTimer.current = setInterval(() => {
      setDesktopCarouselStep((currentStep) => (currentStep + 1) % project.carouselImages.length)
    }, 1500)
  }

  const startAutoPreview = canRotatePhonePreview ? startPhoneRotation : startDesktopCarousel
  const stopAutoPreview = () => {
    stopPhoneRotation()
    stopDesktopCarousel()
  }

  const getRotatingPhonePosition = (initialPosition) => {
    const initialIndex = PHONE_ROTATION_ORDER.indexOf(initialPosition)
    return PHONE_ROTATION_ORDER[(initialIndex + phoneRotationStep) % PHONE_ROTATION_ORDER.length]
  }

  const getPhoneClasses = (initialPosition) => {
    const currentPosition = canRotatePhonePreview ? getRotatingPhonePosition(initialPosition) : initialPosition
    const classes = ['device-mockup', `device-mockup--${currentPosition}`]

    if (currentPosition !== 'main') classes.push('device-mockup--rear')
    if (canRotatePhonePreview) classes.push(`device-mockup--slot-${initialPosition}`)

    return classes.join(' ')
  }

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
      <div
        className={'project-card__visual visual--' + project.device + (project.name === 'SplitUp' ? ' project-card__visual--splitup' : '') + (project.name === 'MyWL' ? ' project-card__visual--mywl' : '')}
        onMouseEnter={canAutoPreview ? startAutoPreview : undefined}
        onMouseLeave={canAutoPreview ? stopAutoPreview : undefined}
      >
        {project.device === 'phone' ? (
          <div className={[
            'phone-preview',
            canRotatePhonePreview && 'phone-preview--rotating',
            isPhoneCycling && 'phone-preview--cycling',
          ].filter(Boolean).join(' ')}>
            <div className={getPhoneClasses('left')} aria-hidden="true">
              {renderScreen(project.phoneImages?.left, '', true)}
            </div>
            <div className={getPhoneClasses('right')} aria-hidden="true">
              {renderScreen(project.phoneImages?.right, '', true)}
            </div>
            <div className={getPhoneClasses('main')}>
              {renderScreen()}
            </div>
          </div>
        ) : (
          <div className="device-mockup">
            {project.carouselImages ? (
              <div className="desktop-preview__screen" aria-label={`${project.name} - telas do projeto`}>
                <div className="desktop-preview__track" style={{ transform: `translateX(-${desktopCarouselStep * 33.333333}%)` }}>
                  {project.carouselImages.map((image, imageIndex) => (
                    <img
                      key={image}
                      src={image}
                      alt={`${project.name} tela ${imageIndex + 1}`}
                      className="desktop-preview__image"
                    />
                  ))}
                </div>
              </div>
            ) : renderScreen()}
          </div>
        )}
      </div>
      <p>{project.stack}</p>
    </article>
  )
}

export default ProjectCard
