import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MessageCircle, Phone } from 'lucide-react';

const faqs = [
  {
    q: 'How do I book a service?',
    a: 'Browse services on the Services page, choose a technician, pick an available time slot, and confirm your booking. Once the technician accepts, you can complete payment.',
  },
  {
    q: 'Can I cancel a booking?',
    a: 'Yes. You can cancel a booking from My Bookings as long as the job has not started (status is not IN_PROGRESS or COMPLETED).',
  },
  {
    q: 'How do I pay for a booking?',
    a: 'After a technician accepts your request, a "Pay Now" button appears in My Bookings. You can pay via Stripe or SSLCommerz.',
  },
  {
    q: 'How do I leave a review?',
    a: 'Once a booking is marked COMPLETED, a "Leave Review" button appears in My Bookings. Click it to rate and comment on the service.',
  },
  {
    q: "What if a technician doesn't show up?",
    a: "Contact us via email or phone below and we'll resolve the issue as quickly as possible, including a refund if applicable.",
  },
  {
    q: 'How do I update my profile?',
    a: 'Go to Dashboard → Profile and click "Edit Profile" to update your name, phone number, or profile photo.',
  },
];

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: 'support@fixitnow.com',
    href: 'mailto:support@fixitnow.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+880 1800-FIXIT',
    href: 'tel:+8801800349485',
  },
  {
    icon: MessageCircle,
    label: 'Live Chat',
    value: 'Available 9am – 6pm',
    href: '#',
  },
];

export default function HelpSupportPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground">
          Find answers to common questions or reach out to our team.
        </p>
      </div>

      {/* Contact */}
      <div className="grid gap-4 sm:grid-cols-3">
        {contactMethods.map(({ icon: Icon, label, value, href }) => (
          <Card key={label}>
            <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
              <div className="rounded-full bg-primary/10 p-3">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{label}</p>
                <a
                  href={href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {value}
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
