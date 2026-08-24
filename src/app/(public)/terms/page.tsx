import { Badge } from '@/components/ui/badge';

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: 'By accessing or using FixItNow, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.',
  },
  {
    title: '2. User Accounts',
    body: 'You must provide accurate information when creating an account. You are responsible for maintaining the security of your account credentials. FixItNow is not liable for any loss resulting from unauthorized account access.',
  },
  {
    title: '3. Services & Bookings',
    body: 'Customers may book services offered by verified technicians. All bookings are subject to technician acceptance. FixItNow acts as a marketplace and is not directly responsible for the quality of individual service delivery.',
  },
  {
    title: '4. Payments',
    body: 'Payments are processed via third-party providers (Stripe, SSLCommerz). FixItNow does not store card details. Refunds are subject to our refund policy.',
  },
  {
    title: '5. Prohibited Conduct',
    body: 'You may not use the platform for fraudulent activity, harassment, or any violation of applicable law. FixItNow reserves the right to suspend or terminate accounts that violate these terms.',
  },
  {
    title: '6. Limitation of Liability',
    body: 'To the maximum extent permitted by law, FixItNow shall not be liable for any indirect, incidental, or consequential damages arising from use of the platform.',
  },
  {
    title: '7. Changes to Terms',
    body: 'We may update these terms at any time. Continued use of the platform after changes constitutes acceptance of the updated terms.',
  },
  {
    title: '8. Contact',
    body: 'For questions about these terms, contact us at support@fixitnow.com.',
  },
];

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <div className="mb-12 text-center">
        <Badge variant="secondary" className="mb-4">
          Legal
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
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
