import Image from 'next/image'

type Props = {
  eyebrow: string
  title: React.ReactNode
  intro: string
  image?: { src: string; alt: string }
  children?: React.ReactNode
}

export function PageHero({ eyebrow, title, intro, image, children }: Props) {
  return (
    <section className={`page-hero on-dark ${image ? 'has-image' : ''}`}>
      {image && <Image src={image.src} alt="" fill preload sizes="100vw" className="page-hero-image" />}
      <div className="container page-hero-content">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-hero-intro">{intro}</p>
        {children}
      </div>
    </section>
  )
}
