import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Search,
  CalendarCheck,
  CreditCard,
  Star,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

const customerSteps = [
  {
    step: '01',
    icon: Search,
    title: 'Browse & Find',
    description:
      'Search services by category, location, or rating. Read technician profiles and reviews before choosing.',
  },
  {
    step: '02',
    icon: CalendarCheck,
    title: 'Book a Slot',
    description:
      'Pick an available time slot, add a note about your problem, and submit your booking request.',
  },
  {
    step: '03',
    icon: CreditCard,
    title: 'Pay Securely',
    description:
      'Once the technician accepts, pay securely via card. Funds are only released after the job is done.',
  },
  {
    step: '04',
    icon: Star,
    title: 'Leave a Review',
    description:
      'After the service is completed, share your experience to help other customers make informed choices.',
  },
];

const technicianSteps = [
  {
    step: '01',
    title: 'Create Your Profile',
    description:
      'Sign up as a technician, complete your profile with skills, experience, and hourly rate.',
  },
  {
    step: '02',
    title: 'Get Approved',
    description:
      'Our admin team reviews your credentials. Approved technicians get a verified badge.',
  },
  {
    step: '03',
    title: 'List Services & Set Availability',
    description:
      'Add the services you offer, set pricing, and create availability slots for customers to book.',
  },
  {
    step: '04',
    title: 'Accept Bookings & Earn',
    description:
      'Review incoming bookings, accept the ones that fit, complete the job, and get paid.',
  },
];

export default function HowItWorksPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      {/* Header */}
      <div className="mb-16 text-center">
        <Badge variant="secondary" className="mb-4">
          How It Works
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Simple. Fast. Reliable.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          FixItNow makes home services effortless — whether you need help around
          the house or want to grow your technical career.
        </p>
      </div>

      {/* For Customers */}
      <section className="mb-20">
        <h2 className="mb-8 text-2xl font-bold">For Customers</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {customerSteps.map(({ step, icon: Icon, title, description }) => (
            <Card key={step} className="relative overflow-hidden">
              <CardContent className="p-6">
                <span className="absolute right-4 top-4 text-5xl font-black text-muted/30">
                  {step}
                </span>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild size="lg">
            <Link href="/services">
              Browse Services <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* For Technicians */}
      <section>
        <h2 className="mb-8 text-2xl font-bold">For Technicians</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {technicianSteps.map(({ step, title, description }) => (
            <Card key={step} className="relative overflow-hidden">
              <CardContent className="p-6">
                <span className="absolute right-4 top-4 text-5xl font-black text-muted/30">
                  {step}
                </span>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/register">
              Join as Technician <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
