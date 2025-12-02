import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';

const app = new Hono();

// Middleware
app.use('*', cors());
app.use('*', logger());
app.use('*', prettyJSON());

// Health check
app.get('/', (c) => {
  return c.json({
    message: 'Web3 API Server',
    version: '1.0.0',
    status: 'healthy',
  });
});

// Error handler
app.onError((err, c) => {
  console.error('Error:', err);
  return c.json(
    {
      success: false,
      error: err.message,
    },
    500
  );
});

// Not found handler
app.notFound((c) => {
  return c.json(
    {
      success: false,
      error: 'Not found',
    },
    404
  );
});

export default app;

// ========================================
// Cloudflare Workers Export
// ========================================
// Uncomment untuk deploy ke Cloudflare Workers:
// export default {
//   fetch: app.fetch,
// };
