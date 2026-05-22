// ── KEEEP SYNC SERVER ────────────────────────────────────────────────────
// Runs locally, serves the app and syncs data between devices over WiFi.

const http    = require('http');
const fs      = require('fs');
const path    = require('path');
const os      = require('os');

const PORT     = 7433;
const APP_DIR  = path.join(__dirname, 'app');
const DATA_FILE = path.join(os.homedir(), '.keeep-data.json');

// ── MIME TYPES ────────────────────────────────────────────────────────────
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.json': 'application/json',
  '.png':  'image/png',
  '.ico':  'image/x-icon',
};

// ── DATA HELPERS ──────────────────────────────────────────────────────────
function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
  } catch (e) {
    console.error('Could not read data file:', e.message);
  }
  return {};
}

function saveData(data) {
  try {
    // Write to temp file first, then rename — prevents corruption on crash
    const tmp = DATA_FILE + '.tmp';
    fs.writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf8');
    fs.renameSync(tmp, DATA_FILE);
  } catch (e) {
    console.error('Could not save data file:', e.message);
  }
}

// ── LOCAL IP ──────────────────────────────────────────────────────────────
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

// ── REQUEST BODY ──────────────────────────────────────────────────────────
function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try { resolve(JSON.parse(body)); }
      catch { resolve({}); }
    });
    req.on('error', reject);
  });
}

// ── CORS HEADERS ──────────────────────────────────────────────────────────
function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// ── SERVER ────────────────────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  cors(res);

  // Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204); res.end(); return;
  }

  const url = req.url.split('?')[0];

  // ── API ROUTES ──
  if (url === '/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, version: '1.0' }));
    return;
  }

  if (url === '/load') {
    const data = loadData();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
    return;
  }

  if (url === '/save' && req.method === 'POST') {
    const data = await readBody(req);
    saveData(data);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  // ── STATIC FILES ──
  let filePath = url === '/' ? '/index.html' : url;
  filePath = path.join(APP_DIR, filePath);

  // Security: don't serve files outside APP_DIR
  if (!filePath.startsWith(APP_DIR)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404); res.end('Not found'); return;
    }
    const ext  = path.extname(filePath);
    const mime = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  const ip = getLocalIP();
  console.log('');
  console.log('  ██╗  ██╗███████╗███████╗███████╗██████╗ ');
  console.log('  ██║ ██╔╝██╔════╝██╔════╝██╔════╝██╔══██╗');
  console.log('  █████╔╝ █████╗  █████╗  █████╗  ██████╔╝');
  console.log('  ██╔═██╗ ██╔══╝  ██╔══╝  ██╔══╝  ██╔═══╝ ');
  console.log('  ██║  ██╗███████╗███████╗███████╗██║      ');
  console.log('  ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝╚═╝      ');
  console.log('');
  console.log(`  ✓ App beschikbaar op:`);
  console.log(`    • Deze Mac:  http://localhost:${PORT}`);
  console.log(`    • WiFi sync: http://${ip}:${PORT}`);
  console.log('');
  console.log(`  Open de WiFi URL op je Android/telefoon`);
  console.log(`  Data opgeslagen in: ${DATA_FILE}`);
  console.log('');
});

module.exports = { server, getLocalIP, PORT };
