import Link from "next/link";
import CaseStudyLayout from "@/components/work/CaseStudyLayout";
import { resetWaveFacts } from "@/data/projects";

export const metadata = {
  title: "ResetWave Case Study — Khaled Mousa",
  description:
    "How Khaled Mousa reduced a repetitive engineering task from approximately two hours to approximately ten seconds with a sanitized Python and Linux automation workflow.",
};

const technology = [
  ...resetWaveFacts.resumeTechnology,
  ...resetWaveFacts.repositoryTechnology,
];

export default function ResetWavePage() {
  return (
    <CaseStudyLayout>
      <section id="overview" className="case-section case-overview">
        <p className="case-section-number">01 / Overview</p>
        <h2>Operational automation with a measurable result.</h2>
        <p className="case-lead">
          ResetWave was developed during a Summer 2024 Boingo Wireless internship. The documented goal was to remotely control and manage infrastructure devices, replacing a repetitive engineering task that took approximately two hours with an automated run of approximately ten seconds.
        </p>
        <div className="case-callout case-callout-sage">
          <strong>Public-scope note</strong>
          <p>This account deliberately omits credentials, infrastructure identifiers, private source code, internal screenshots, and company-specific topology.</p>
        </div>
      </section>

      <section id="problem" className="case-section">
        <p className="case-section-number">02 / Problem, role & constraints</p>
        <h2>The documented problem</h2>
        <div className="case-split">
          <div>
            <h3>Context</h3>
            <p>A recurring infrastructure-management task required remote control of operational devices and consumed approximately two hours when performed through the prior process.</p>
          </div>
          <div>
            <h3>My role</h3>
            <p>As a Wireless Operations Intern, Khaled developed the Python automation system, debugged system-level issues, and tested and validated its functionality in an operational environment.</p>
          </div>
        </div>
        <h3>Verified constraints</h3>
        <ul className="case-bullets">
          <li>The system interacted with operational infrastructure rather than a purely local demo.</li>
          <li>Remote device management had to be automated from a Linux/Python environment.</li>
          <li>Reliability required debugging plus functional testing and validation.</li>
          <li>Company-specific architecture and implementation details cannot be published.</li>
        </ul>
      </section>

      <section id="workflow" className="case-section">
        <p className="case-section-number">03 / Sanitized workflow</p>
        <h2>Architecture at the level that can be shared.</h2>
        <figure className="workflow-diagram">
          <div className="workflow-node">
            <span>01</span><strong>Operator input</strong><small>Approved task targets</small>
          </div>
          <i aria-hidden="true">→</i>
          <div className="workflow-node workflow-node-accent">
            <span>02</span><strong>Python orchestration</strong><small>Validated concurrent workflow</small>
          </div>
          <i aria-hidden="true">→</i>
          <div className="workflow-node">
            <span>03</span><strong>Secure remote sessions</strong><small>Generalized infrastructure layer</small>
          </div>
          <i aria-hidden="true">→</i>
          <div className="workflow-node workflow-node-sage">
            <span>04</span><strong>Result verification</strong><small>Operational validation</small>
          </div>
          <figcaption>Sanitized conceptual workflow—not a map of Boingo Wireless infrastructure.</figcaption>
        </figure>
      </section>

      <section id="approach" className="case-section">
        <p className="case-section-number">04 / Technical approach</p>
        <h2>Automate the sequence, then validate the system.</h2>
        <div className="approach-grid">
          <article><span>01</span><h3>Orchestrate</h3><p>Python replaced the repetitive manual sequence with a repeatable workflow running in a Linux environment.</p></article>
          <article><span>02</span><h3>Connect</h3><p>Repository documentation identifies SSH and Paramiko for remote interaction without exposing endpoints or credentials.</p></article>
          <article><span>03</span><h3>Parallelize</h3><p>Repository documentation identifies ThreadPoolExecutor as the concurrency mechanism; worker counts and device volumes remain private.</p></article>
          <article><span>04</span><h3>Validate</h3><p>The résumé confirms system-level debugging plus testing and functional validation in an operational environment.</p></article>
        </div>

        <h3>Engineering decisions and public tradeoffs</h3>
        <div className="decision-table" role="table" aria-label="ResetWave engineering decisions">
          <div role="row"><strong role="columnheader">Decision</strong><strong role="columnheader">Benefit</strong><strong role="columnheader">Tradeoff kept private</strong></div>
          <div role="row"><span role="cell">Python automation</span><span role="cell">Repeatable orchestration and rapid iteration</span><span role="cell">Internal command and data handling</span></div>
          <div role="row"><span role="cell">SSH via Paramiko</span><span role="cell">Remote infrastructure interaction</span><span role="cell">Authentication and endpoint details</span></div>
          <div role="row"><span role="cell">Concurrent execution</span><span role="cell">Reduced wall-clock time</span><span role="cell">Topology, scale, and concurrency limits</span></div>
        </div>
      </section>

      <section id="validation" className="case-section">
        <p className="case-section-number">05 / Testing & validation</p>
        <h2>A fast run was not enough.</h2>
        <p className="case-lead">
          The verified record says the system was debugged for reliability and its functionality was tested and validated in an operational environment. Exact test cases, error rates, and deployment procedures are not present in the public source material and are therefore not claimed here.
        </p>
        <div className="validation-rail">
          <div><span>Debug</span><strong>System-level issues</strong></div>
          <div><span>Test</span><strong>Functional behavior</strong></div>
          <div><span>Validate</span><strong>Operational environment</strong></div>
          <div><span>Measure</span><strong>≈ 2h → ≈ 10s</strong></div>
        </div>
      </section>

      <section id="outcome" className="case-section case-outcome">
        <p className="case-section-number">06 / Outcome & technology</p>
        <h2>From hours to seconds.</h2>
        <div className="outcome-number"><span>≈</span><strong>720×</strong><small>calculated timing improvement</small></div>
        <p>
          The main claim remains the clearer one: an engineering task documented at approximately two hours was reduced to approximately ten seconds. The 720× figure is the direct calculation from those timings, not a separate benchmark claim.
        </p>
        <ul className="technology-list technology-list-large" aria-label="ResetWave technology">
          {technology.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section id="reflection" className="case-section">
        <p className="case-section-number">07 / Lessons & next iteration</p>
        <h2>What the evidence supports—and what still needs Khaled&apos;s voice.</h2>
        <div className="reflection-grid">
          <div>
            <h3>Evidence-led takeaway</h3>
            <p>The project record shows that operational automation is not complete at execution: system debugging, reliability work, and validation are part of the engineering result.</p>
          </div>
          <div className="needs-input">
            <h3>Reflection still needed</h3>
            <p>A personal lesson learned and a specific “what I would improve next” have not been supplied. This is intentionally marked instead of replacing Khaled&apos;s perspective with invented copy.</p>
          </div>
        </div>
        <div className="case-navigation">
          <Link className="button button-secondary" href="/work">← Back to all work</Link>
          <Link className="button button-primary" href="/work/engineering-lab">Next: Engineering Lab →</Link>
        </div>
      </section>
    </CaseStudyLayout>
  );
}
