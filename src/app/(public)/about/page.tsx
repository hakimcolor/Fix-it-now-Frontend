import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Users, ShieldCheck, Star, Wrench } from 'lucide-react';

const values = [
  {
    icon: ShieldCheck,
    title: 'Verified Professionals',
    description:
      'Every technician is background-checked and reviewed before joining our platform.',
  },
  {
    icon: Star,
    title: 'Quality Guaranteed',
    description:
      'We only list top-rated technicians with proven track records and real customer reviews.',
  },
  {
    icon: Users,
    title: 'Customer First',
    description:
      'Transparent pricing, easy booking, and dedicated support at every step.',
  },
  {
    icon: Wrench,
    title: 'All Home Services',
    description:
      'Plumbing, electrical, AC repair, cleaning, painting, carpentry — we cover it all.',
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      {/* Hero */}
      <div className="mb-16 text-center">
        <Badge variant="secondary" className="mb-4">
          About Us
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          The story behind FixItNow
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          FixItNow was built to make home services simple, safe, and reliable.
          We connect homeowners with skilled, verified professionals — so you
          can get the help you need without the hassle.
        </p>
      </div>

      {/* Mission */}
      <Card className="mb-16">
        <CardContent className="p-10 text-center">
          <h2 className="text-2xl font-bold">Our Mission</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            To become the most trusted home service marketplace by connecting
            every household with qualified professionals — quickly, affordably,
            and transparently.
          </p>
        </CardContent>
      </Card>

      {/* Values */}
      <h2 className="mb-8 text-center text-2xl font-bold">What We Stand For</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {values.map(({ icon: Icon, title, description }) => (
          <Card key={title}>
            <CardContent className="flex gap-4 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
