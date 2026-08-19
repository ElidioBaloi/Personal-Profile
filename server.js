const http = require('http');
const fs = require('fs');
const path = require('path');

const port = Number(process.env.PORT || 3000);
const adminApiKey = process.env.ADMIN_API_KEY;
const dataFile = path.join(__dirname, 'bookings.json');

if (!adminApiKey) {
  console.error('Set ADMIN_API_KEY before starting the booking API.');
  process.exit(1);
}

const readBookings = () => {
  if (!fs.existsSync(dataFile)) return [];
  return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
};

const writeBookings = (bookings) => {
  fs.writeFileSync(dataFile, JSON.stringify(bookings, null, 2));
};

const send = (response, status, body) => {
  response.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || 'http://localhost:3000',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  });
  response.end(JSON.stringify(body));
};

const isAuthorized = (request) => request.headers['x-admin-key'] === adminApiKey;

const server = http.createServer((request, response) => {
  if (request.method === 'OPTIONS') return send(response, 204, {});
  if (!request.url.startsWith('/api/bookings')) return send(response, 404, { error: 'Not found' });
  if (!isAuthorized(request)) return send(response, 401, { error: 'Unauthorized' });

  if (request.method === 'GET') return send(response, 200, readBookings());

  let body = '';
  request.on('data', (chunk) => { body += chunk; });
  request.on('end', () => {
    try {
      const bookings = readBookings();
      const payload = body ? JSON.parse(body) : {};
      const reference = payload.bookingReference || request.url.split('/').pop();
      const index = bookings.findIndex((booking) => booking.bookingReference === reference);

      if (request.method === 'POST') {
        bookings.unshift(payload);
        writeBookings(bookings);
        return send(response, 201, payload);
      }
      if (request.method === 'PATCH' && index >= 0) {
        bookings[index] = { ...bookings[index], ...payload };
        writeBookings(bookings);
        return send(response, 200, bookings[index]);
      }
      if (request.method === 'DELETE' && index >= 0) {
        bookings.splice(index, 1);
        writeBookings(bookings);
        return send(response, 204, {});
      }
      return send(response, 404, { error: 'Booking not found' });
    } catch (error) {
      return send(response, 400, { error: 'Invalid JSON payload' });
    }
  });
});

server.listen(port, () => console.log(`Booking API listening on http://localhost:${port}`));
