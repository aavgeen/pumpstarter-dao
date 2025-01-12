import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

const featuredProjects = [
  {
    id: 1,
    title: "Decentralized Social Network",
    description: "A blockchain-based social network that puts privacy first.",
    raised: 75000,
    goal: 100000,
    daysLeft: 15,
  },
  {
    id: 2,
    title: "Green Energy NFT Marketplace",
    description: "Trade carbon credits as NFTs and support renewable energy projects.",
    raised: 50000,
    goal: 80000,
    daysLeft: 20,
  },
  {
    id: 3,
    title: "DeFi Lending Protocol",
    description: "A decentralized lending platform with innovative yield strategies.",
    raised: 120000,
    goal: 150000,
    daysLeft: 10,
  },
]

export default function FeaturedProjects() {
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
              <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
              <Progress value={(project.raised / project.goal) * 100} className="mb-2" />
              <div className="flex justify-between text-sm">
                <span>{Math.round((project.raised / project.goal) * 100)}% funded</span>
                <span>{project.daysLeft} days left</span>
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
  )
}

