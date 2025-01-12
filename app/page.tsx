import { Button } from "@/components/ui/button";
import FeaturedProjects from "@/components/featured-projects";
import {
  FadeIn,
  FadeInStagger,
  SlideInFromLeft,
  SlideInFromRight,
} from "@/components/motion/primitives";
import Link from "next/link";
import Header from "@/components/header";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      <FadeIn>
        <section className="text-center py-12">
          <SlideInFromLeft>
            <h1 className="text-4xl font-bold mb-6">
              Welcome to PumpStarter.dao
            </h1>
          </SlideInFromLeft>
          <SlideInFromRight>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Discover and support innovative Web3 projects. Join our community
              of creators and backers today!
            </p>
          </SlideInFromRight>
          <FadeInStagger faster>
            <div className="flex justify-center gap-4">
              <Button size="lg">Explore Projects</Button>
              <Button size="lg" variant="outline">
                <Link href="/create-project">Start a Project</Link>
              </Button>
            </div>
          </FadeInStagger>
        </section>
      </FadeIn>

      <FadeInStagger>
        <FeaturedProjects />
      </FadeInStagger>
    </div>
  );
}
