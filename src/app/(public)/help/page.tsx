import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone } from 'lucide-react';
import Link from 'next/link';

const faqs = [
  {
    q: 'How do I book a service?',
    a: 'Browse services or find a technician, choose an available slot, add a note, and confirm your booking. You will receive a confirmation once the technician accepts.',
  },
  {
    q: 'How do I pay for a booking?',
    a: 'After the technician accepts your booking, you will see a "Pay Now" button in your dashboard. We support card payments via Stripe and SSLCommerz.',
  },
  {
    q: 'Can I cancel a booking?',
    a: 'Yes. You can cancel any booking that has not yet moved to IN_PROGRESS from the My Bookings page.',
  },
  {
    q: 'How are technicians verified?',
    a: 'Every technician goes through an approval process before their profile goes live. Admin reviews credentials and service history before approval.',
  },
  {
    q: 'What happens if a technician declines my booking?',
    a: 'You will see the status change to DECLINED. You are free to book another technician for the same service.',
  },
  {
    q: 'How do I leave a review?',
    a: 'Once a booking is marked COMPLETED, a "Leave Review" button appears in your My Bookings page.',
  },
];

export default function HelpPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <div className="mb-12 text-center">
        <Badge variant="secondary" className="mb-4">
          Help Center
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">How can we help?</h1>
        <p className="mt-4 text-muted-foreground">
          Find answers to common questions below, or reach out to our support
          team directly.
        </p>
      </div>

      <Accordion type="single" collapsible className="mb-12">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium">Email Support</p>
              <Link
                href="mailto:support@fixitnow.com"
                className="text-sm text-primary hover:underline"
              >
                support@fixitnow.com
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium">Phone Support</p>
              <p className="text-sm text-muted-foreground">+1 (234) 567-890</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
