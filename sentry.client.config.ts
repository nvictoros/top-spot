import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://6a6360732a2e55737f1fe5950575908e@o4508763485372416.ingest.de.sentry.io/4508763490025552',
  integrations: [Sentry.replayIntegration()],
  tracesSampleRate: 1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  debug: false,
  enabled: window.location.hostname !== 'localhost',
});
