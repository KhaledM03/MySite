"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Link from "next/link";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import { projects } from "@/data/projects";

const clamp = (value, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

const range = (value, start, end) => clamp((value - start) / (end - start));

const sceneWindow = (value, enterStart, enterEnd, exitStart, exitEnd) =>
  range(value, enterStart, enterEnd) * (1 - range(value, exitStart, exitEnd));

const PARTICLES = [
  [8, 22, 7],
  [14, 72, 4],
  [26, 12, 6],
  [35, 88, 8],
  [49, 19, 5],
  [61, 82, 6],
  [75, 13, 7],
  [84, 74, 5],
  [94, 31, 5],
];

const CAPABILITIES = [
  { number: "01", title: "Automation", detail: "Python · Linux · network operations" },
  { number: "02", title: "Hardware", detail: "Circuits · testing · troubleshooting" },
  { number: "03", title: "Digital systems", detail: "Logic design · architecture · validation" },
  { number: "04", title: "Web products", detail: "JavaScript · responsive UI · Node.js" },
];

export default function HeroProfileJourney() {
  const journeyRef = useRef(null);
  const stageRef = useRef(null);
  const heroRef = useRef(null);
  const profileRef = useRef(null);
  const engineeringRef = useRef(null);
  const heroCharacterRef = useRef(null);
  const radioCharacterRef = useRef(null);
  const engineeringCharacterRef = useRef(null);
  const droneRef = useRef(null);
  const droneEchoRef = useRef(null);
  const trailRef = useRef(null);
  const chapterRef = useRef(null);

  useEffect(() => {
    const elements = {
      journey: journeyRef.current,
      stage: stageRef.current,
      hero: heroRef.current,
      profile: profileRef.current,
      engineering: engineeringRef.current,
      heroCharacter: heroCharacterRef.current,
      radioCharacter: radioCharacterRef.current,
      engineeringCharacter: engineeringCharacterRef.current,
      drone: droneRef.current,
      droneEcho: droneEchoRef.current,
      trail: trailRef.current,
      chapter: chapterRef.current,
    };

    if (Object.values(elements).some((element) => !element)) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const render = () => {
      frame = 0;
      const rect = elements.journey.getBoundingClientRect();
      const distance = Math.max(1, elements.journey.offsetHeight - window.innerHeight);
      const progress = clamp(-rect.top / distance);
      const isCompact = window.innerWidth < 780;

      const heroOpacity = 1 - range(progress, 0.13, 0.19);
      const profileOpacity = sceneWindow(progress, 0.20, 0.26, 0.52, 0.58);
      const engineeringOpacity = range(progress, 0.59, 0.66);

      elements.hero.style.opacity = String(heroOpacity);
      elements.hero.style.transform = isCompact
        ? `translate3d(${-range(progress, 0.13, 0.21) * 8}vw, 0, 0)`
        : `translate3d(${-range(progress, 0.13, 0.21) * 7}vw, -44%, 0)`;
      elements.hero.style.pointerEvents = heroOpacity < 0.75 ? "none" : "auto";

      elements.profile.style.opacity = String(profileOpacity);
      elements.profile.style.transform = isCompact
        ? `translate3d(0, ${(1 - range(progress, 0.20, 0.26)) * 5}vh, 0)`
        : `translate3d(0, calc(-43% + ${(1 - range(progress, 0.20, 0.26)) * 5}vh), 0)`;
      elements.profile.style.pointerEvents = profileOpacity < 0.75 ? "none" : "auto";

      elements.engineering.style.opacity = String(engineeringOpacity);
      elements.engineering.style.transform = isCompact
        ? `translate3d(0, ${(1 - engineeringOpacity) * 5}vh, 0)`
        : `translate3d(0, calc(-43% + ${(1 - engineeringOpacity) * 5}vh), 0)`;
      elements.engineering.style.pointerEvents = engineeringOpacity < 0.75 ? "none" : "auto";

      const heroExit = range(progress, 0.13, 0.23);
      elements.heroCharacter.style.opacity = String(1 - range(progress, 0.16, 0.23));
      elements.heroCharacter.style.transform = isCompact
        ? `translate3d(${heroExit * 38}vw, ${heroExit * -13}vh, 0) rotate(${-3 + heroExit * 16}deg) scale(${1 - heroExit * 0.25})`
        : `translate3d(${heroExit * 52}vw, ${heroExit * -20}vh, 0) rotate(${-4 + heroExit * 17}deg) scale(${1 - heroExit * 0.18})`;

      const radioOpacity = sceneWindow(progress, 0.22, 0.29, 0.52, 0.60);
      const radioIn = range(progress, 0.22, 0.29);
      const radioOut = range(progress, 0.52, 0.60);
      elements.radioCharacter.style.opacity = String(radioOpacity);
      elements.radioCharacter.style.transform = isCompact
        ? `translate3d(${-16 + radioIn * 16 - radioOut * 28}vw, ${10 - radioIn * 10 + radioOut * 6}vh, 0) rotate(${-4 - radioOut * 8}deg) scale(${0.92 - radioOut * 0.16})`
        : `translate3d(${-18 + radioIn * 18 - radioOut * 25}vw, ${7 - radioIn * 7 + radioOut * 8}vh, 0) rotate(${-3 - radioOut * 7}deg) scale(${0.96 - radioOut * 0.12})`;

      const engineeringIn = range(progress, 0.55, 0.66);
      elements.engineeringCharacter.style.opacity = String(engineeringIn);
      elements.engineeringCharacter.style.transform = isCompact
        ? `translate3d(${30 - engineeringIn * 30}vw, ${(1 - engineeringIn) * 10}vh, 0) rotate(${4 - engineeringIn * 4}deg)`
        : `translate3d(${24 - engineeringIn * 24}vw, ${(1 - engineeringIn) * 8}vh, 0) rotate(${5 - engineeringIn * 5}deg)`;

      const droneOpacity = sceneWindow(progress, 0.24, 0.30, 0.53, 0.61);
      const droneFlight = range(progress, 0.22, 0.61);
      const droneX = isCompact ? 54 - droneFlight * 86 : 61 - droneFlight * 88;
      const droneY = isCompact
        ? 68 + Math.sin(droneFlight * Math.PI) * 5
        : 9 + Math.sin(droneFlight * Math.PI) * 12;
      elements.drone.style.opacity = String(droneOpacity);
      elements.drone.style.transform = `translate3d(calc(${droneX}vw + ${pointerX * 8}px), calc(${droneY}vh + ${pointerY * 7}px), 0) rotate(${-12 + droneFlight * 22}deg) scale(${0.72 + Math.sin(droneFlight * Math.PI) * 0.18})`;

      elements.droneEcho.style.opacity = String(droneOpacity * 0.24);
      elements.droneEcho.style.transform = `translate3d(${droneX + (isCompact ? 22 : 17)}vw, ${droneY + (isCompact ? 14 : 10)}vh, 0) rotate(${-8 + droneFlight * 18}deg) scale(0.43)`;

      elements.trail.style.opacity = String(droneOpacity * 0.82);
      elements.trail.style.transform = `translate3d(${droneX - 27}vw, ${droneY + 4}vh, 0) rotate(${-8 + droneFlight * 16}deg) scaleX(${0.72 + droneFlight * 0.35})`;

      elements.stage.style.setProperty("--journey-progress", progress.toFixed(3));
      const activeChapter = progress < 0.22 ? "01 / ARRIVAL" : progress < 0.60 ? "02 / FIELD MODE" : "03 / BUILD MODE";
      elements.chapter.textContent = activeChapter;
    };

    const requestRender = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const onPointerMove = (event) => {
      if (reduceMotion.matches) return;
      pointerX = event.clientX / window.innerWidth - 0.5;
      pointerY = event.clientY / window.innerHeight - 0.5;
      requestRender();
    };

    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    reduceMotion.addEventListener("change", requestRender);
    render();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", requestRender);
      window.removeEventListener("pointermove", onPointerMove);
      reduceMotion.removeEventListener("change", requestRender);
    };
  }, []);

  return (
    <main className="site-shell">
      <a className="skip-link" href="#engineering">Skip to engineering profile</a>
      <SiteHeader />

      <section className="journey" ref={journeyRef} aria-label="Interactive engineering story">
        <span id="profile" className="journey-anchor profile-anchor" aria-hidden="true" />
        <span id="engineering" className="journey-anchor engineering-anchor" aria-hidden="true" />

        <div className="journey-stage" ref={stageRef}>
          <div className="chapter-progress" aria-hidden="true">
            <span className="chapter-progress-line" />
            <span ref={chapterRef}>01 / ARRIVAL</span>
          </div>

          <div className="ambient-orb ambient-orb-coral" aria-hidden="true" />
          <div className="ambient-orb ambient-orb-sage" aria-hidden="true" />
          <div className="halftone halftone-one" aria-hidden="true" />
          <div className="halftone halftone-two" aria-hidden="true" />
          <div className="schematic-lines" aria-hidden="true">
            <svg viewBox="0 0 1200 700" fill="none">
              <path d="M38 541C183 387 329 433 428 306C532 172 670 182 748 267C859 388 987 334 1167 112" />
              <path d="M81 604C246 475 352 522 484 382C583 278 736 278 827 362C934 461 1049 371 1179 254" />
              <circle cx="428" cy="306" r="8" />
              <circle cx="748" cy="267" r="8" />
              <circle cx="827" cy="362" r="8" />
            </svg>
          </div>

          <div className="particle-field" aria-hidden="true">
            {PARTICLES.map(([left, top, size], index) => (
              <i key={`${left}-${top}`} style={{ left: `${left}%`, top: `${top}%`, width: `${size}px`, height: `${size}px`, animationDelay: `${index * -0.47}s` }} />
            ))}
          </div>

          <article id="arrival" className="hero-copy chapter-copy" ref={heroRef}>
            <p className="chapter-kicker"><span>Engineering</span><span>Code</span><span>Systems</span></p>
            <h1>I build the bridge between <em>hardware</em> and software.</h1>
            <p className="hero-intro">
              I&apos;m Khaled Mousa—a computer and electrical engineering student building automation, digital systems, and full-stack products that work beyond the demo.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#profile">Start the field log <span aria-hidden="true">↓</span></a>
              <a className="button button-secondary" href="/resume/khaled-mousa-resume.pdf" target="_blank" rel="noreferrer">Read résumé <span aria-hidden="true">↗</span></a>
            </div>
            <div className="hero-signal-strip" aria-label="Engineering focus areas">
              <span><b>Signal 01</b> Physical systems</span>
              <span><b>Signal 02</b> Reliable software</span>
              <span><b>Signal 03</b> Real-world impact</span>
            </div>
            <div className="scroll-cue" aria-hidden="true"><span className="scroll-cue-wheel" />Scroll to launch</div>
          </article>

          <div className="hero-character character-layer" ref={heroCharacterRef} aria-hidden="true">
            <div className="character-burst" />
            <Image className="character-image" src="/characters/khaled-hero.webp" alt="" fill priority sizes="(max-width: 780px) 82vw, 47vw" />
          </div>

          <article className="profile-copy chapter-copy" ref={profileRef} aria-label="Profile">
            <p className="section-label">Field log · The builder</p>
            <h2>Curious by nature.<br /><em>Precise</em> by practice.</h2>
            <p className="profile-lead">
              My work moves between physical and digital systems—from circuit analysis and validation to Python automation and responsive web products. I understand the whole system, then make it clearer, faster, and more reliable.
            </p>
            <dl className="profile-facts">
              <div><dt>02</dt><dd>Engineering degrees in progress</dd></div>
              <div><dt>3.69</dt><dd>Current GPA</dd></div>
              <div><dt>2h → 10s</dt><dd>Automation impact</dd></div>
            </dl>
            <div className="field-note">
              <span className="field-note-status" aria-hidden="true" />
              <div><b>Field-tested thinking</b><span>Wireless operations · Linux infrastructure · system validation</span></div>
            </div>
            <div className="profile-links">
              <a href="https://github.com/KhaledM03" target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href="https://www.linkedin.com/in/thekhaledmousa/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            </div>
          </article>

          <div className="radio-character character-layer" ref={radioCharacterRef} aria-hidden="true">
            <Image className="character-image" src="/characters/khaled-radio.webp" alt="" fill sizes="(max-width: 780px) 65vw, 42vw" />
          </div>

          <div className="drone-trail" ref={trailRef} aria-hidden="true">
            <svg viewBox="0 0 760 230" fill="none"><path d="M24 192C178 64 407 21 738 62" /><path d="M65 221C261 101 469 83 742 113" /></svg>
          </div>
          <div className="drone drone-primary" ref={droneRef} aria-hidden="true">
            <Image src="/characters/drone.webp" alt="" fill sizes="(max-width: 780px) 52vw, 27vw" />
          </div>
          <div className="drone drone-echo" ref={droneEchoRef} aria-hidden="true">
            <Image src="/characters/drone.webp" alt="" fill sizes="14vw" />
          </div>

          <article className="engineering-copy chapter-copy" ref={engineeringRef} aria-label="Engineering capabilities">
            <p className="section-label">Build mode · Capabilities</p>
            <h2>Built where code meets <em>current.</em></h2>
            <p className="engineering-lead">
              The work is multidisciplinary by design: diagnose the system, model the behavior, build the tool, then validate it under real constraints.
            </p>
            <div className="capability-grid">
              {CAPABILITIES.map((capability) => (
                <div className="capability-card" key={capability.number}>
                  <span>{capability.number}</span><h3>{capability.title}</h3><p>{capability.detail}</p>
                </div>
              ))}
            </div>
            <div className="proof-rail">
              <div><span>Field</span><strong>Boingo Wireless</strong><small>Testing · validation · Linux</small></div>
              <div><span>Build</span><strong>ResetWave</strong><small>Python automation · 720× faster</small></div>
              <div><span>Ship</span><strong>The Cove Dev</strong><small>Responsive products · client delivery</small></div>
            </div>
          </article>

          <div className="engineering-character character-layer" ref={engineeringCharacterRef} aria-hidden="true">
            <div className="engineering-ring" />
            <Image className="character-image" src="/characters/khaled-engineering.webp" alt="" fill sizes="(max-width: 780px) 75vw, 46vw" />
          </div>

          <div className="journey-count" aria-hidden="true"><span>01</span><span className="journey-count-line" /><span>03</span></div>
        </div>
      </section>

      <section id="next-chapter" className="home-work" aria-labelledby="next-title">
        <header className="home-work-header">
          <div>
            <p className="section-label">Next chapter · Selected work</p>
            <h2 id="next-title">The evidence behind the field log.</h2>
          </div>
          <div>
            <p>Three verified project signals—each with a role, technology, and proof point. ResetWave opens into the first complete engineering case study.</p>
            <Link className="button next-button" href="/work">View all work ↗</Link>
          </div>
        </header>

        <div className="home-project-grid">
          {projects.map((project) => (
            <article className={`home-project-card home-project-${project.tone}`} key={project.slug}>
              <div className="home-project-topline"><span>{project.number}</span><span>{project.status}</span></div>
              <p>{project.eyebrow}</p>
              <h3>{project.name}</h3>
              <strong>{project.proof}</strong>
              <span>{project.role}</span>
              <Link href={project.href} target={project.externalAsset ? "_blank" : undefined} rel={project.externalAsset ? "noreferrer" : undefined}>
                {project.action} <span aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
