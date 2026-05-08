import { readFileSync } from 'fs';
import { resolve } from 'path';

export default async (req, context) => {
  try {
    // Try to serve the static file first
    const path = new URL(req.url).pathname;
    
    // If it's an asset, let Netlify serve it
    if (path.startsWith('/assets/')) {
      return new Response('Not Found', { status: 404 });
    }
    
    // For all other routes, return index.html (SPA fallback)
    const html = readFileSync(resolve(__dirname, '../client/index.html'), 'utf-8');
    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
