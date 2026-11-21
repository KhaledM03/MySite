import Image from "next/image";
import VideoFacade from "@/components/work/VideoFacade";
import { builds } from "@/data/builds";

export default function RecentBuilds({ id = "builds", headingLevel = 2 }) {
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
              {build.video ? (
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
              <ul className="build-tags" aria-label={`${build.title} skills`}>
                {build.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
