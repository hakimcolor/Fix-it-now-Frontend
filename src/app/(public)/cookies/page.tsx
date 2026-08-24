import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const cookieTypes = [
  {
    name: 'accessToken',
    type: 'Essential',
    purpose: 'Authenticates your session. Required for protected routes.',
    duration: '24 hours',
  },
  {
    name: 'refreshToken',
    type: 'Essential',
    purpose: 'Used to issue a new access token when the current one expires.',
    duration: '7 days',
  },
];

export default function CookiesPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <div className="mb-12 text-center">
        <Badge variant="secondary" className="mb-4">
          Legal
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">Cookie Policy</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated: January 2025
        </p>
      </div>

      <div className="space-y-8 text-muted-foreground">
        <div>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            What are cookies?
          </h2>
          <p>
            Cookies are small text files stored on your device by your browser.
            FixItNow uses HTTP-only cookies for secure authentication only — we
            do not use advertising or tracking cookies.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Cookies we use
          </h2>
          <div className="space-y-4">
            {cookieTypes.map((c) => (
              <Card key={c.name}>
                <CardContent className="p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <code className="rounded bg-muted px-2 py-0.5 text-sm font-mono">
                      {c.name}
                    </code>
                    <Badge variant="outline">{c.type}</Badge>
                  </div>
                  <p className="mt-2 text-sm">{c.purpose}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Duration: {c.duration}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            Managing cookies
          </h2>
          <p>
            You can clear cookies at any time through your browser settings.
            Clearing the authentication cookies will log you out of FixItNow. We
            do not support cookie opt-out for essential session cookies as they
            are required to use the platform.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            Questions?
          </h2>
          <p>
            Contact us at{' '}
            <a
              href="mailto:support@fixitnow.com"
              className="text-primary hover:underline"
            >
              support@fixitnow.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
