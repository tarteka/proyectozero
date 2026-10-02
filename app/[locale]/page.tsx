import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Portfolio } from "@/components/sections/Portfolio";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Portfolio />
      <Skills />
      <Contact />
    </main>
  );
}
