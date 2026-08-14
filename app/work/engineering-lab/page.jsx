import Image from "next/image";
import Link from "next/link";
import TransitionLink from "@/components/navigation/TransitionLink";
import LongPageNav from "@/components/navigation/LongPageNav";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import EngineeringLabExperience from "@/components/work/EngineeringLabExperience";
import EvidenceLightbox from "@/components/work/EvidenceLightbox";
import StructuredData from "@/components/seo/StructuredData";
import { engineeringLabSources } from "@/data/projects";
import { createPageMetadata, SITE_URL } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Engineering Lab Collection",
  description:
    "An evidence-led collection of Khaled Mousa’s electronics measurements, digital logic simulation, CAD studies, and engineering process.",
  path: "/work/engineering-lab",
});

const media = {
  oscilloscopeOne: {
    src: "/media/engineering-lab/oscilloscope-measurement-01.webp",
    width: 1350,
    height: 1800,
    alt: "Lab bench with a Tektronix oscilloscope, Keysight function generator, probes, leads, and a breadboard",
  },
  oscilloscopeTwo: {
    src: "/media/engineering-lab/oscilloscope-measurement-02.webp",
    width: 1350,
    height: 1800,
    alt: "Oscilloscope displaying two sinusoidal traces with visible phase measurements",
  },
  oscilloscopeThree: {
    src: "/media/engineering-lab/oscilloscope-measurement-03.webp",
    width: 1350,
    height: 1800,
    alt: "Oscilloscope displaying a mostly DC-level trace with visible repeating variation and measurement readouts",
  },
  bench: {
    src: "/media/engineering-lab/electronics-bench-04.webp",
    width: 1350,
    height: 1800,
    alt: "Electronics bench with a perforated prototyping board, diodes, resistor, capacitor, test leads, oscilloscope, multimeter, and resistance substitution box",
  },
  logic: {
    src: "/media/engineering-lab/digital-logic-simulation.webp",
    width: 723,
    height: 677,
    alt: "Digital logic simulation with four-bit A and B inputs, unsigned and two's-complement labeled blocks, multiplexers, and visible outputs",
  },
  cadOne: {
    src: "/media/engineering-lab/cad-study-01.webp",
    width: 1561,
    height: 939,
    alt: "CAD study showing a raised tray-like structure, projecting plate, support, and diagonal brace",
  },
  cadTwo: {
    src: "/media/engineering-lab/cad-study-02.webp",
    width: 744,
    height: 906,
    alt: "CAD study showing paired mounting plates arranged around a horizontal hollow cylinder",
  },
};

const labSections = [
  { id: "overview", label: "Overview" },
  { id: "electronics", label: "Measurement" },
  { id: "logic", label: "Logic" },
  { id: "cad", label: "CAD" },
  { id: "process", label: "Process" },
  { id: "gallery", label: "Evidence" },
];

function EvidenceImage({ item, className = "" }) {
  return (
    <EvidenceLightbox {...item} className={className}>
      <Image src={item.src} alt={item.alt} width={item.width} height={item.height} sizes="(max-width: 760px) 92vw, 48vw" />
    </EvidenceLightbox>
  );
}

export default function EngineeringLabPage() {
  return (
    <div className="site-shell evidence-shell lab-shell">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: "Engineering Lab Collection",
          url: `${SITE_URL}/work/engineering-lab`,
          description:
            "An evidence-led collection of electronics measurements, digital logic simulation, CAD studies, and engineering process.",
          author: { "@id": `${SITE_URL}/#person` },
          keywords: "EET 118, circuit analysis, digital logic, Logisim, CAD, testing, debugging, validation",
        }}
      />
      <a className="skip-link" href="#lab-content">Skip to Engineering Lab</a>
      <SiteHeader />

      <main id="lab-content" className="lab-page">
        <section id="lab-top" className="lab-cover" aria-labelledby="lab-title" tabIndex={-1}>
          <div className="lab-cover-copy">
            <Link className="back-link" href="/work">← All work</Link>
            <p className="section-label">Collection 02 · Physical + digital systems</p>
            <h1 id="lab-title" style={{ viewTransitionName: "project-engineering-lab-title" }}>Engineering<br /><em>Lab.</em></h1>
            <p>
              A visual record of measurement, simulation, CAD exploration, testing, and validation—presented at exactly the level the current evidence supports.
            </p>
            <div className="lab-cover-tags" aria-label="Engineering Lab areas">
              <span>Electronics</span><span>Digital logic</span><span>CAD</span><span>Testing</span>
            </div>
          </div>

          <div className="lab-cover-media" style={{ viewTransitionName: "project-engineering-lab-media" }}>
            <Image
              src="/media/engineering-lab/oscilloscope-cover.webp"
              alt="Oscilloscope and function generator on an electronics lab bench"
              fill
              priority
              sizes="(max-width: 760px) 100vw, 56vw"
            />
            <div className="lab-cover-readout" aria-hidden="true">
              <span>Source 01 / bench evidence</span>
              <i /><i /><i />
              <strong>Observe what is present.</strong>
            </div>
            <div className="lab-cover-sweep" aria-hidden="true" />
          </div>
        </section>

        <LongPageNav items={labSections} ariaLabel="Engineering Lab contents" className="lab-section-nav" topId="lab-top" />

        <div className="lab-story">
          <section id="overview" className="lab-section lab-overview" aria-labelledby="overview-title" tabIndex={-1}>
            <div>
              <p className="case-section-number">01 / Engineering Lab overview</p>
              <h2 id="overview-title">A collection built from real artifacts.</h2>
            </div>
            <div className="lab-overview-copy">
              <p className="lab-lead">
                The current record spans electronics work associated with EET 118, oscilloscope measurement, Logisim simulation, and Fusion 360 studies. Together, the artifacts show a practice of observing, testing, simulating, and documenting physical and digital systems.
              </p>
              <dl className="lab-fact-grid">
                <div><dt>Association</dt><dd>{engineeringLabSources.verified.courseAssociation}</dd></div>
                <div><dt>Media</dt><dd>7 real engineering artifacts</dd></div>
                <div><dt>Method</dt><dd>Inspect · test · document</dd></div>
              </dl>
              <aside className="lab-documentation-boundary">
                <strong>Documentation boundary</strong>
                <p>Direct visual evidence and verified report or résumé facts are presented without assigning unsupported meaning. Exact photograph-to-experiment mapping, oscilloscope channel definitions, Logisim circuit purpose, Fusion 360 model purpose, and individual or team status remain unconfirmed.</p>
              </aside>
            </div>
          </section>

          <EngineeringLabExperience />

          <section id="electronics" className="lab-section lab-electronics" aria-labelledby="electronics-title" tabIndex={-1}>
            <header className="lab-section-header">
              <p className="case-section-number">02 / Electronics and measurement</p>
              <h2 id="electronics-title">The instrument display is the evidence.</h2>
              <p>
                These photographs document an electronics bench, oscilloscope traces, probes, a function generator, a multimeter, and physical circuit work. Captions describe only what can be seen.
              </p>
            </header>

            <div className="measurement-feature">
              <figure>
                <EvidenceImage item={media.oscilloscopeOne} />
                <figcaption><span>Oscilloscope Measurement 01</span> A repeating trace is visible above a function generator and connected bench setup.</figcaption>
              </figure>
              <aside className="visible-callouts" aria-label="Visible evidence callouts">
                <span>Visible in frame</span>
                <ol>
                  <li><b>01</b> Oscilloscope display</li>
                  <li><b>02</b> Function generator</li>
                  <li><b>03</b> Breadboard and test leads</li>
                </ol>
                <p>The trace shown is the photographed instrument display.</p>
              </aside>
            </div>

            <div className="measurement-pair">
              <figure>
                <EvidenceImage item={media.oscilloscopeTwo} />
                <figcaption><span>Oscilloscope Measurement 02</span> Two sinusoidal traces and phase measurements are visible.</figcaption>
              </figure>
              <figure>
                <EvidenceImage item={media.oscilloscopeThree} />
                <figcaption><span>Oscilloscope Measurement 03</span> A mostly DC-level trace with repeating variation and measurement readouts is visible.</figcaption>
              </figure>
            </div>

            <div className="report-context">
              <div>
                <p className="section-label">Verified report context</p>
                <h3>{engineeringLabSources.verified.relatedReport}</h3>
                <p>Dated {engineeringLabSources.verified.reportDate}. The report covers rectifier/filter calculations involving DC voltage, ripple voltage, RMS voltage, percentage error, and total RMS voltage.</p>
              </div>
              <dl>
                <div><dt>Recorded capacitance</dt><dd>{engineeringLabSources.verified.measuredCapacitance}</dd></div>
                <div><dt>Recorded board</dt><dd>{engineeringLabSources.verified.board}</dd></div>
              </dl>
            </div>
          </section>

          <section id="logic" className="lab-section lab-logic" aria-labelledby="logic-title" tabIndex={-1}>
            <div className="logic-copy">
              <p className="case-section-number">03 / Digital logic and simulation</p>
              <h2 id="logic-title">Follow the visible signal paths.</h2>
              <p className="lab-lead">
                The repository contains one Logisim screenshot. Four-bit A and B inputs, blocks labeled “Unsigned” and “2sComp.,” selection components, inversion gates, and three outputs are visible. The screenshot preserves the signal-path structure for inspection.
              </p>
              <ul className="logic-labels" aria-label="Verified digital logic skills">
                <li>Digital Logic Design</li>
                <li>Logisim simulation</li>
                <li>Testing and debugging</li>
                <li>Functional validation</li>
              </ul>
            </div>
            <figure className="logic-evidence">
              <EvidenceImage item={media.logic} />
              <div className="logic-callout logic-callout-a" aria-hidden="true"><span>A</span></div>
              <div className="logic-callout logic-callout-b" aria-hidden="true"><span>B</span></div>
              <figcaption>Digital Logic Simulation — visible inputs, selection components, inversion gates, and outputs.</figcaption>
            </figure>
          </section>

          <section id="cad" className="lab-section lab-cad" aria-labelledby="cad-title" tabIndex={-1}>
            <header className="lab-section-header">
              <p className="case-section-number">04 / CAD and physical design</p>
              <h2 id="cad-title">Read form, fit, and visible structure.</h2>
              <p>
                Two Fusion 360 screenshots preserve the actual geometry and make their edges, mounting points, supports, bracing, plates, and cylindrical forms available for close inspection.
              </p>
            </header>
            <div className="cad-stack">
              <figure className="cad-card cad-card-one">
                <EvidenceImage item={media.cadOne} />
                <figcaption><span>CAD Study 01</span> Raised edges, a projecting plate, mounting holes, a vertical support, and diagonal bracing are visible.</figcaption>
              </figure>
              <figure className="cad-card cad-card-two">
                <EvidenceImage item={media.cadTwo} />
                <figcaption><span>CAD Study 02</span> Paired plates and mounting holes are arranged around a horizontal hollow cylinder.</figcaption>
              </figure>
            </div>
          </section>

          <section id="process" className="lab-section lab-process" aria-labelledby="process-title" tabIndex={-1}>
            <div>
              <p className="case-section-number">05 / Engineering and testing process</p>
              <h2 id="process-title">A process the evidence can support.</h2>
            </div>
            <ol className="process-steps">
              <li><span>01</span><div><h3>Set up</h3><p>Connect the physical or simulated system and make the observable points available.</p></div></li>
              <li><span>02</span><div><h3>Observe</h3><p>Use instrument displays or simulation state to inspect behavior.</p></div></li>
              <li><span>03</span><div><h3>Test</h3><p>Exercise the work, compare observations, and identify behavior that needs investigation.</p></div></li>
              <li><span>04</span><div><h3>Debug</h3><p>Trace connections, signal paths, and setup choices before repeating a test.</p></div></li>
              <li><span>05</span><div><h3>Document</h3><p>Keep screenshots, photographs, calculations, and source notes tied to the work they describe.</p></div></li>
            </ol>
          </section>

          <section id="skills" className="lab-section lab-skills" aria-labelledby="skills-title">
            <header>
              <p className="case-section-number">06 / Skills demonstrated</p>
              <h2 id="skills-title">Work across physical and digital systems.</h2>
            </header>
            <div className="skill-constellation">
              {engineeringLabSources.verified.resumeSkills.map((skill, index) => (
                <div key={skill}><span>{String(index + 1).padStart(2, "0")}</span><strong>{skill}</strong></div>
              ))}
              <div><span>07</span><strong>Oscilloscope inspection</strong></div>
              <div><span>08</span><strong>CAD exploration</strong></div>
            </div>
          </section>

          <section id="gallery" className="lab-section lab-gallery" aria-labelledby="gallery-title" tabIndex={-1}>
            <header className="lab-section-header">
              <p className="case-section-number">07 / Real evidence gallery</p>
              <h2 id="gallery-title">Inspect the source material.</h2>
              <p>Every item opens into a larger view. Deployment copies are optimized and metadata-free; the original repository files remain preserved.</p>
            </header>
            <div className="evidence-grid">
              <figure className="evidence-tall"><EvidenceImage item={media.bench} /><figcaption>Electronics bench and physical circuit work</figcaption></figure>
              <figure><EvidenceImage item={media.logic} /><figcaption>Digital logic simulation</figcaption></figure>
              <figure><EvidenceImage item={media.cadOne} /><figcaption>CAD Study 01</figcaption></figure>
              <figure><EvidenceImage item={media.oscilloscopeTwo} /><figcaption>Oscilloscope Measurement 02</figcaption></figure>
              <figure><EvidenceImage item={media.cadTwo} /><figcaption>CAD Study 02</figcaption></figure>
            </div>
          </section>

          <section id="reflection" className="lab-section lab-reflection" aria-labelledby="reflection-title">
            <div>
              <p className="case-section-number">08 / Reflection and next steps</p>
              <h2 id="reflection-title">Better documentation makes better engineering visible.</h2>
            </div>
            <div>
              <p className="lab-lead">
                The strongest thread in this collection is the movement from an object or circuit to an observable state: connect it, inspect it, and preserve the result. The next documentation pass should make those relationships explicit at capture time.
              </p>
              <ul className="next-steps-list">
                <li>Pair each photograph with its exact experiment and report page.</li>
                <li>Preserve native Logisim and Fusion 360 files alongside screenshots.</li>
                <li>Record channel definitions, test conditions, and individual contribution.</li>
              </ul>
            </div>
          </section>

          <nav className="project-navigation" aria-label="Previous and next projects">
            <TransitionLink href="/work/resetwave" transitionLabel="Opening ResetWave"><span>Previous project</span><strong>← ResetWave</strong></TransitionLink>
            <Link href="/work"><span>Project index</span><strong>All work ↑</strong></Link>
            <TransitionLink href="/work/the-cove-dev" transitionLabel="Opening The Cove Dev"><span>Next project</span><strong>The Cove Dev →</strong></TransitionLink>
          </nav>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
