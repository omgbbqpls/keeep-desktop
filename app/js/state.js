// ── STATE.JS — Keeep data-laag ───────────────────────────────────────────

// Auto-detect server: als de app via WiFi geopend wordt (Android),
// gebruik dan hetzelfde host als de pagina. Op de Mac zelf is dat localhost.
const SERVER_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:7433'
  : `http://${window.location.hostname}:7433`;
let serverAvailable = false;

function isTauriApp() {
  return !!window.__TAURI__?.core?.invoke;
}

function getBudgetSnapshot() {
  return {
    accounts,
    transactions,
    groups,
    budgets,
    goals,
    categoryMeta,
    budgetStartMonth,
    monthNotes: typeof monthNotes !== 'undefined' ? monthNotes : {},
    catNotes: typeof catNotes !== 'undefined' ? catNotes : {},
  };
}

function persistBudgetKey(key, val) {
  localStorage.setItem('budget_' + key, JSON.stringify(val));
}

function applyBudgetSnapshot(data, { persist = true } = {}) {
  if (!data || typeof data !== 'object') return false;
  if (Array.isArray(data.accounts)) accounts = data.accounts;
  if (Array.isArray(data.transactions)) transactions = data.transactions;
  if (Array.isArray(data.groups)) groups = data.groups;
  if (data.budgets && typeof data.budgets === 'object') budgets = data.budgets;
  if (data.goals && typeof data.goals === 'object') goals = data.goals;
  if (data.categoryMeta && typeof data.categoryMeta === 'object') categoryMeta = data.categoryMeta;
  if (data.budgetStartMonth) budgetStartMonth = data.budgetStartMonth;
  if (typeof monthNotes !== 'undefined' && data.monthNotes && typeof data.monthNotes === 'object') monthNotes = data.monthNotes;
  if (typeof catNotes !== 'undefined' && data.catNotes && typeof data.catNotes === 'object') catNotes = data.catNotes;

  if (persist) {
    Object.entries(getBudgetSnapshot()).forEach(([key, val]) => persistBudgetKey(key, val));
  }
  return true;
}

// ── STORAGE OBJECT ────────────────────────────────────────────────────────
const S = {
  get(key, fallback = null) {
    try {
      const v = localStorage.getItem('budget_' + key);
      return v !== null ? JSON.parse(v) : fallback;
    } catch { return fallback; }
  },
  set(key, val) {
    localStorage.setItem('budget_' + key, JSON.stringify(val));
    debouncedSave();
  }
};

// ── APP STATE ─────────────────────────────────────────────────────────────
let appTheme    = S.get('theme', 'dark');
let appLang     = S.get('lang', 'nl');
let appCurrency = S.get('currency', { symbol: '€', code: 'EUR' });

// ── BUDGET DATA ───────────────────────────────────────────────────────────
let accounts     = S.get('accounts', []);
let transactions = S.get('transactions', []);
let groups       = S.get('groups', []);
let budgets      = S.get('budgets', {});
let goals   = S.get('goals', {});
let categoryMeta = S.get('categoryMeta', {});
let uiFontScale = S.get('uiFontScale', 100);
let budgetStartMonth = S.get(
  'budgetStartMonth',
  monthKey(new Date().getFullYear(), new Date().getMonth() + 1)
);

// ── ACCOUNT TYPES — YNAB-achtige budgetlogica ─────────────────────────────
const ACCOUNT_TYPES = {
  checking:     { role: 'cash',           label: 'Betaalrekening' },
  cash:         { role: 'cash',           label: 'Contant' },
  credit:       { role: 'credit',         label: 'Creditcard' },
  savings:      { role: 'cash',           label: 'Spaarrekening' },
  car:          { role: 'tracking_asset', label: 'Auto' },
  investment:   { role: 'tracking_asset', label: 'Beleggingen' },
  other_asset:  { role: 'tracking_asset', label: 'Overig bezit' },
  property:     { role: 'tracking_asset', label: 'Woning' },
  auto_loan:    { role: 'loan',           label: 'Autolening' },
  mortgage:     { role: 'loan',           label: 'Hypotheek' },
  student_loan: { role: 'loan',           label: 'Studieschuld' },
  other_debt:   { role: 'loan',           label: 'Andere schuld' }
};

const ACCOUNT_TYPE_ALIASES = {
  line_credit: 'credit',
  asset: 'property',
  liability: 'other_debt',
  loan: 'other_debt',
  personal_loan: 'other_debt',
  medical_debt: 'other_debt',
  student_loan_duo: 'student_loan'
};

function normalizeAccountType(type) {
  return ACCOUNT_TYPES[type] ? type : (ACCOUNT_TYPE_ALIASES[type] || 'checking');
}

function accountTypeRole(type) {
  return ACCOUNT_TYPES[normalizeAccountType(type)]?.role || 'cash';
}

function accountTypeLabel(type) {
  return ACCOUNT_TYPES[normalizeAccountType(type)]?.label || type || 'Rekening';
}

function accountRoleLabel(role) {
  switch (role) {
    case 'cash':
    case 'credit':             return 'On budget';
    case 'loan':               return 'Schuld';
    case 'tracking_asset':     return 'Off budget';
    case 'tracking_liability': return 'Schuld';
    default:                   return 'Rekening';
  }
}

function isCashAccountType(type) {
  return accountTypeRole(type) === 'cash';
}

function isCreditAccountType(type) {
  return accountTypeRole(type) === 'credit';
}

function isLoanAccountType(type) {
  return accountTypeRole(type) === 'loan';
}

function isTrackingAccountType(type) {
  return accountTypeRole(type).startsWith('tracking_');
}

function isBudgetActivityAccountType(type) {
  const role = accountTypeRole(type);
  return role === 'cash' || role === 'credit';
}

// ── CURRENT MONTH ─────────────────────────────────────────────────────────
const now = new Date();
let currentYear  = now.getFullYear();
let currentMonth = now.getMonth() + 1;

// ── SERVER SYNC ───────────────────────────────────────────────────────────
async function checkServer() {
  if (isTauriApp()) {
    serverAvailable = true;
    const dot   = document.getElementById('server-dot');
    const label = document.getElementById('server-label');
    if (dot)   dot.style.background = 'var(--lime)';
    if (label) label.textContent    = 'OPGESLAGEN';
    return;
  }
  try {
    const r = await fetch(SERVER_URL + '/status', { signal: AbortSignal.timeout(1000) });
    serverAvailable = r.ok;
  } catch {
    serverAvailable = false;
  }
  const dot   = document.getElementById('server-dot');
  const label = document.getElementById('server-label');
  if (dot)   dot.style.background = serverAvailable ? 'var(--lime)' : 'var(--red)';
  if (label) label.textContent    = serverAvailable ? 'ACTIEF' : 'offline';
}

async function loadFromServer() {
  try {
    const r = await fetch(SERVER_URL + '/load', { signal: AbortSignal.timeout(2000) });
    if (!r.ok) return false;
    const data = await r.json();
    if (data.accounts)     { accounts     = data.accounts;     S.set('accounts', accounts); }
    if (data.transactions) { transactions = data.transactions; S.set('transactions', transactions); }
    if (data.groups)       { groups       = data.groups;       S.set('groups', groups); }
    if (data.budgets)      { budgets      = data.budgets;      S.set('budgets', budgets); }
    if (data.goals)        { goals        = data.goals;        S.set('goals', goals); }
    if (data.categoryMeta) { categoryMeta = data.categoryMeta; S.set('categoryMeta', categoryMeta); }
    if (data.budgetStartMonth) {
      budgetStartMonth = data.budgetStartMonth;
      S.set('budgetStartMonth', budgetStartMonth);
    }
    serverAvailable = true;
    return true;
  } catch {
    serverAvailable = false;
    return false;
  }
}

async function saveToServer() {
  if (!serverAvailable) return;
  try {
    await fetch(SERVER_URL + '/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accounts, transactions, groups, budgets, goals, categoryMeta, budgetStartMonth })
    });
  } catch { /* silent */ }
}

async function loadFromNative() {
  if (!isTauriApp()) return false;
  try {
    const data = await window.__TAURI__.core.invoke('load_budget_data');
    if (!data || !Object.keys(data).length) return false;
    applyBudgetSnapshot(data);
    return true;
  } catch {
    return false;
  }
}

async function saveToNative() {
  if (!isTauriApp()) return false;
  try {
    await window.__TAURI__.core.invoke('save_budget_data', { data: getBudgetSnapshot() });
    return true;
  } catch {
    return false;
  }
}

// Debounce: sla pas op na 1.5s stilte
let _saveTimer = null;
function debouncedSave() {
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(() => {
    if (isTauriApp()) saveToNative();
    else saveToServer();
  }, 600);
}

// ── HELPERS: MAANDSLEUTEL ─────────────────────────────────────────────────
function monthKey(year, month) {
  return `${year}-${String(month).padStart(2, '0')}`;
}

function setBudgetStartMonth(key) {
  budgetStartMonth = key;
  S.set('budgetStartMonth', budgetStartMonth);
}

function getBudgetStartMonth() {
  return budgetStartMonth || monthKey(new Date().getFullYear(), new Date().getMonth() + 1);
}

function isGoalActiveForMonth(goal, year = currentYear, month = currentMonth) {
  if (!goal) return false;
  const start = goal.startMonth || getBudgetStartMonth();
  return monthKey(year, month) >= start;
}

function getBudgetMonth(year, month) {
  const key = monthKey(year, month);
  if (!budgets[key]) budgets[key] = {};
  return budgets[key];
}
