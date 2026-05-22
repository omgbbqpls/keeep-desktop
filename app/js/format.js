// ── FORMAT.JS — Opmaak hulpfuncties ──────────────────────────────────────

// ── BEDRAGEN ──────────────────────────────────────────────────────────────
function fmt(cents, forceSign = false) {
  const neg  = cents < 0;
  const abs  = Math.abs(cents);
  const euro = (abs / 100).toLocaleString('nl-NL', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  const sign = forceSign && cents > 0 ? '+' : neg ? '-' : '';
  return `${sign}€${euro}`;
}

function fmtInput(cents) {
  return (cents / 100).toFixed(2).replace('.', ',');
}

function parseBedrag(str) {
  // Accepteert: "1.234,56", "1234,56", "1234.56", "€ 1.234,56", "-12,50"
  if (str === null || str === undefined) return 0;
  let cleaned = String(str).trim().replace(/[€\s]/g, '');
  if (!cleaned) return 0;

  const hasComma = cleaned.includes(',');
  const hasDot   = cleaned.includes('.');

  // NL-formaat: punt = duizendtallen, komma = decimalen
  if (hasComma) {
    cleaned = cleaned.replace(/\./g, '').replace(',', '.');
  } else if (hasDot) {
    const parts = cleaned.split('.');
    // "1.234" zonder komma is waarschijnlijk duizendtallen, niet €1,23
    if (parts.length > 2 || (parts.length === 2 && parts[1].length === 3)) {
      cleaned = cleaned.replace(/\./g, '');
    }
  }

  const val = Number(cleaned);
  return Number.isFinite(val) ? Math.round(val * 100) : 0;
}

// ── DATUMS ────────────────────────────────────────────────────────────────
const MAANDEN = [
  'Januari','Februari','Maart','April','Mei','Juni',
  'Juli','Augustus','September','Oktober','November','December'
];

function maandNaam(year, month) {
  return `${MAANDEN[month - 1]} ${year}`;
}

function vandaag() {
  // Gebruik lokale datum — toISOString() geeft UTC en kan in NL tijdzone 1 dag afwijken
  const d = new Date();
  return d.getFullYear() + '-' +
    String(d.getMonth() + 1).padStart(2, '0') + '-' +
    String(d.getDate()).padStart(2, '0');
}

function fmtDatum(isoStr) {
  if (!isoStr) return '—';
  const [y, m, d] = isoStr.split('-');
  return `${d}-${m}-${y}`;
}

// ── ID GENERATOR ──────────────────────────────────────────────────────────
function genId() {
  return 'x' + Date.now() + Math.random().toString(36).slice(2, 6);
}