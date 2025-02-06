import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://6a6360732a2e55737f1fe5950575908e@o4508763485372416.ingest.de.sentry.io/4508763490025552',
  tracesSampleRate: 1,
  debug: false,
});
