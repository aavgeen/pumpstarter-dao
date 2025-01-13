import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/hooks/use-projects";

export default function FeaturedProjects() {
  const { projects, loading, error } = useProjects();

  if (loading) {
    return (
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-8 bg-muted rounded" />
              </CardHeader>
              <CardContent>
                <div className="h-16 bg-muted rounded mb-4" />
                <div className="h-2 bg-muted rounded mb-2" />
                <div className="flex justify-between">
                  <div className="h-4 w-20 bg-muted rounded" />
                  <div className="h-4 w-20 bg-muted rounded" />
                </div>
              </CardContent>
              <CardFooter>
                <div className="h-10 w-full bg-muted rounded" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Featured Projects
        </h2>
        <div className="text-center text-red-500">Failed to load projects</div>
      </section>
    );
  }

  // Take the first 3 projects as featured
  const featuredProjects = projects.slice(0, 3);

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProjects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {project.shortDescription}
              </p>
              <Progress
                value={(project.funding.current / project.funding.goal) * 100}
                className="mb-2"
              />
              <div className="flex justify-between text-sm">
                <span>
                  {Math.round(
                    (project.funding.current / project.funding.goal) * 100
                  )}
                  % funded
                </span>
                <span>
                  {new Date(project.funding.endDate).toLocaleDateString()}{" "}
                  deadline
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/projects/${project.id}`} className="w-full">
                <Button className="w-full">View Project</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
