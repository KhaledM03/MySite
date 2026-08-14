import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <p className="section-label">Open channel</p>
        <h2>Build something that works beyond the demo.</h2>
      </div>
      <div className="site-footer-links">
        <Link href="/experience">Experience ↗</Link>
        <a href="mailto:khaledmousa216@gmail.com">Email ↗</a>
        <a href="https://github.com/KhaledM03" target="_blank" rel="noreferrer">GitHub ↗</a>
        <a href="https://www.linkedin.com/in/thekhaledmousa/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        <a href="/resume/khaled-mousa-resume.pdf" target="_blank" rel="noreferrer">Résumé ↗</a>
      </div>
      <div className="site-footer-base">
        <span>Khaled Mousa · Engineering + software</span>
        <Link href="/#arrival">Return home ↑</Link>
      </div>
    </footer>
  );
}
