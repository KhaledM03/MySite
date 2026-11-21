import Image from "next/image";
import DroneDiagram from "@/components/work/DroneDiagram";
import PrintReveal from "@/components/work/PrintReveal";
import VideoFacade from "@/components/work/VideoFacade";
import { builds } from "@/data/builds";

// On the homepage the drone video already plays in the hero, so its card
// shows the photo and points back up instead of embedding it twice.
export default function RecentBuilds({ id = "builds", headingLevel = 2, videoInHero = false }) {
  const Heading = `h${headingLevel}`;
  const ItemHeading = `h${headingLevel + 1}`;

  return (
    <section id={id} className="home-section recent-builds" aria-labelledby={`${id}-title`}>
      <header className="home-section-header">
        <Heading id={`${id}-title`}>Recent builds</Heading>
        <p>Things I&apos;ve put together by hand lately.</p>
      </header>

      <div className="builds-grid">
        {builds.map((build) => (
          <article key={build.id} className="build-card" id={build.id}>
            <div className="build-media">
              {build.printed ? (
                <PrintReveal model={build.image} photo={build.printed} />
              ) : build.video && !(videoInHero && build.featured) ? (
                <VideoFacade {...build.video} poster={build.image} />
              ) : (
                <Image
                  src={build.image.src}
                  alt={build.image.alt}
                  width={build.image.width}
                  height={build.image.height}
                  sizes="(max-width: 760px) 92vw, 44vw"
                />
              )}
            </div>
            <div className="build-copy">
              <ItemHeading>{build.title}</ItemHeading>
              <p>{build.summary}</p>
              {videoInHero && build.featured ? (
                <a className="build-watch" href="#featured-flight">
                  <span aria-hidden="true">▶</span> Watch it fly, up top
                </a>
              ) : null}
              <ul className="build-tags" aria-label={`${build.title} skills`}>
                {build.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <DroneDiagram />
    </section>
  );
}
