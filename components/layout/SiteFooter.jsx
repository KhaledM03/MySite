import Link from "next/link";
import { CopyEmail, LocalTime } from "@/components/ui/FooterExtras";
import { CANONICAL_RESUME, CAREER_LINKS, PUBLIC_CODE } from "@/data/career";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-lead">
        <h2>Build something that works beyond the demo.</h2>
        <p>Email is the fastest way to reach me.</p>
        <div className="site-footer-contact">
          <a className="site-footer-email" href={CAREER_LINKS.mailto}>{CAREER_LINKS.email}</a>
          <CopyEmail />
        </div>
        <LocalTime />
      </div>
      <nav className="site-footer-links" aria-label="Footer">
        <Link href="/work">Work</Link>
        <Link href="/experience">Experience</Link>
        <a href={CANONICAL_RESUME.href} target="_blank" rel="noreferrer">Résumé <span aria-hidden="true">↗</span></a>
        <a href={CAREER_LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
        <a href={CAREER_LINKS.github} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        <a href={PUBLIC_CODE.portfolio.href} target="_blank" rel="noreferrer">This site&apos;s code <span aria-hidden="true">↗</span></a>
      </nav>
      <div className="site-footer-base">
        <span>© {new Date().getFullYear()} Khaled Mousa</span>
        <Link href="/privacy">Privacy</Link>
        <a href="#top">Back to top <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  );
}
