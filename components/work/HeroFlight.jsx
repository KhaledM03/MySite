import VideoFacade from "@/components/work/VideoFacade";
import { builds } from "@/data/builds";

const drone = builds.find((build) => build.id === "fpv-drone");

// The homepage opens on real FPV footage: a short silent loop from the goggles
// (the readouts on screen are the drone's own OSD). Pressing it plays the full
// flight with sound from YouTube.
export default function HeroFlight() {
  return (
    <figure id="featured-flight" className="hero-flight" aria-labelledby="hero-flight-caption" tabIndex={-1}>
      <div className="hero-flight-screen">
        <VideoFacade
          {...drone.video}
          poster={drone.loop?.poster ?? drone.image}
          loop={drone.loop?.src}
          sizes="(max-width: 980px) 92vw, 46vw"
          priority
        />
      </div>
      <figcaption id="hero-flight-caption">
        <span className="hero-flight-eyebrow">Featured build · live from the goggles</span>
        <span>A custom FPV drone I built, bound to my own radio, and fly from its camera feed.</span>
        <a href="#fpv-drone">How it works <span aria-hidden="true">↓</span></a>
      </figcaption>
    </figure>
  );
}
