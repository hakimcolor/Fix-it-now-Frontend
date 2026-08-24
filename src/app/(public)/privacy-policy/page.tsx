import { Badge } from '@/components/ui/badge';

const sections = [
  {
    title: '1. Information We Collect',
    body: 'We collect information you provide directly — such as your name, email, phone number, and profile photo — when you create an account or use our services.',
  },
  {
    title: '2. How We Use Your Information',
    body: 'We use your data to operate the platform, process bookings and payments, send service notifications, and improve our product. We do not sell your personal data to third parties.',
  },
  {
    title: '3. Cookies',
    body: 'We use HTTP-only cookies to manage authentication sessions securely. We do not use cookies for advertising tracking.',
  },
  {
    title: '4. Data Sharing',
    body: 'We share necessary data with service providers (payment processors, hosting) required to operate the platform. Technicians receive customer contact details only after a booking is accepted.',
  },
  {
    title: '5. Data Security',
    body: 'We implement industry-standard security practices including HTTPS, HTTP-only cookies, and server-side token validation to protect your data.',
  },
  {
    title: '6. Your Rights',
    body: 'You may request access to, correction of, or deletion of your personal data at any time by contacting us or using the account deletion feature in your dashboard settings.',
  },
  {
    title: '7. Changes to This Policy',
    body: 'We may update this policy periodically. We will notify you of significant changes via email or platform notification.',
  },
  {
    title: '8. Contact',
    body: 'For privacy inquiries, contact us at support@fixitnow.com.',
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <div className="mb-12 text-center">
        <Badge variant="secondary" className="mb-4">
          Legal
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated: January 2025
        </p>
      </div>

      <div className="space-y-8">
        {sections.map(({ title, body }) => (
          <div key={title}>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="mt-2 text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
