// proxy.js (Node 18+)
import http from 'node:http';

http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'X-Auth-Token');
  if (req.method === 'OPTIONS') return res.writeHead(204).end();

  const target = new URL(req.url, 'http://localhost').searchParams.get('url');
  const upstream = await fetch(target, {
    headers: { 'X-Auth-Token': req.headers['x-auth-token'] || '' }
  });

  res.writeHead(upstream.status, { 'Content-Type': 'application/json' });
  res.end(await upstream.text());
}).listen(3001, () => console.log('Proxy running on http://localhost:3001'));
