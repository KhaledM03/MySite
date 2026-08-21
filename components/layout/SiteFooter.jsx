import Link from "next/link";
import { CANONICAL_RESUME, CAREER_LINKS, PUBLIC_CODE } from "@/data/career";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <p className="section-label">Open channel</p>
        <h2>Build something that works beyond the demo.</h2>
      </div>
      <div className="site-footer-links">
        <Link href="/experience">Experience ↗</Link>
        <button type="button" data-contact-trigger>Contact ↗</button>
        <a href={CAREER_LINKS.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        <a href={CAREER_LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        <a href={CANONICAL_RESUME.href} target="_blank" rel="noreferrer">Résumé ↗</a>
        <a href={PUBLIC_CODE.portfolio.href} target="_blank" rel="noreferrer">Portfolio code ↗</a>
      </div>
      <div className="site-footer-base">
        <span>Khaled Mousa · Engineering + software</span>
        <Link href="/#arrival">Replay the field log ↑</Link>
      </div>
    </footer>
  );
}
