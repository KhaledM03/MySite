import Sidebar from "@/components/layout/Sidebar";
import Hero from "@/components/sections/Hero";
import EngineeringVisual from "@/components/sections/EngineeringVisual";
import GoogleReviews from "@/components/sections/GoogleReviews";
import ResumeTimeline from "@/components/sections/ResumeTimeline";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import ShowcaseMode from "@/components/sections/ShowcaseMode";

/**
 * Home page — Phase 1 dashboard shell.
 *
 * Layout: Sidebar (left, sticky) + main grid (right). The main area is a
 * 12-column grid on large screens that collapses to a single column on
 * small screens. Each section is a self-contained card.
 */
export default function HomePage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1">
        <div className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="grid grid-cols-12 gap-5">
            {/* Row 1: Hero (6) · Engineering Visual (3) · Google Reviews (3) */}
            <div className="col-span-12 lg:col-span-6">
              <Hero />
            </div>
            <div className="col-span-12 md:col-span-7 lg:col-span-3">
              <EngineeringVisual />
            </div>
            <div className="col-span-12 md:col-span-5 lg:col-span-3">
              <GoogleReviews />
            </div>

            {/* Row 2: Resume (3) · Featured Projects (6) · Showcase (3) */}
            <div className="col-span-12 md:col-span-5 lg:col-span-3">
              <ResumeTimeline />
            </div>
            <div className="col-span-12 md:col-span-7 lg:col-span-6">
              <FeaturedProjects />
            </div>
            <div className="col-span-12 lg:col-span-3">
              <ShowcaseMode />
            </div>
          </div>

          <footer className="mt-10 flex items-center justify-between text-xs text-ink-mute">
            <span className="font-mono tracking-wider">KM · PORTFOLIO · v0.1</span>
            <span>© {new Date().getFullYear()} Khaled Mousa</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
