import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Experiences } from "@/components/sections/Experiences";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

// Page shell stays a Server Component. Each interactive section is its own
// client entry point ("use client"), so only those subtrees ship to the browser.
export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--text-primary)] transition-colors duration-[var(--theme-transition-duration)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:border focus:border-[var(--border)] focus:bg-[var(--surface)] focus:px-4 focus:py-2 focus:text-sm focus:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
      >
        Skip to content
      </a>

      {/* Fixed Left Sidebar on Desktop */}
      <Sidebar />

      {/* Mobile Top Navigation */}
      <MobileNav />

      {/* Main Content Area */}
      <main
        id="main-content"
        className="md:ml-[var(--sidebar-width)] min-h-screen px-6 sm:px-12 lg:px-20 max-w-5xl mx-auto transition-colors duration-[var(--theme-transition-duration)]"
      >
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experiences />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}