// ── APP.JS — Init & events ────────────────────────────────────────────────

// ── UNDO STACK ────────────────────────────────────────────────────────────
const _undoStack = [];
const _redoStack = [];

function pushUndo() {
  _undoStack.push({
    transactions: JSON.parse(JSON.stringify(transactions)),
    groups:       JSON.parse(JSON.stringify(groups)),
    budgets:      JSON.parse(JSON.stringify(budgets)),
    goals:        JSON.parse(JSON.stringify(goals)),
    accounts:     JSON.parse(JSON.stringify(accounts)),
    categoryMeta: JSON.parse(JSON.stringify(categoryMeta)),
    budgetStartMonth,
  });
  _redoStack.length = 0; // nieuwe actie wist redo
  if (_undoStack.length > 30) _undoStack.shift();
  _updateUndoBtn();
}

function undoLastAction() {
  if (!_undoStack.length) return;
  _redoStack.push({
    transactions: JSON.parse(JSON.stringify(transactions)),
    groups:       JSON.parse(JSON.stringify(groups)),
    budgets:      JSON.parse(JSON.stringify(budgets)),
    goals:        JSON.parse(JSON.stringify(goals)),
    accounts:     JSON.parse(JSON.stringify(accounts)),
    categoryMeta: JSON.parse(JSON.stringify(categoryMeta)),
    budgetStartMonth,
  });
  const snap = _undoStack.pop();
  transactions = snap.transactions; S.set('transactions', transactions);
  groups       = snap.groups;       S.set('groups', groups);
  budgets      = snap.budgets;      S.set('budgets', budgets);
  goals        = snap.goals || {};   S.set('goals', goals);
  accounts     = snap.accounts;     S.set('accounts', accounts);
  categoryMeta = snap.categoryMeta || {}; S.set('categoryMeta', categoryMeta);
  setBudgetStartMonth(snap.budgetStartMonth || getBudgetStartMonth());
  render();
  rebuildAccFilters();
  rebuildCatFilters();
  _updateUndoBtn();
  toast('Ongedaan gemaakt.');
}

function redoLastAction() {
  if (!_redoStack.length) return;
  _undoStack.push({
    transactions: JSON.parse(JSON.stringify(transactions)),
    groups:       JSON.parse(JSON.stringify(groups)),
    budgets:      JSON.parse(JSON.stringify(budgets)),
    goals:        JSON.parse(JSON.stringify(goals)),
    accounts:     JSON.parse(JSON.stringify(accounts)),
    categoryMeta: JSON.parse(JSON.stringify(categoryMeta)),
    budgetStartMonth,
  });
  const snap = _redoStack.pop();
  transactions = snap.transactions; S.set('transactions', transactions);
  groups       = snap.groups;       S.set('groups', groups);
  budgets      = snap.budgets;      S.set('budgets', budgets);
  goals        = snap.goals || {};   S.set('goals', goals);
  accounts     = snap.accounts;     S.set('accounts', accounts);
  categoryMeta = snap.categoryMeta || {}; S.set('categoryMeta', categoryMeta);
  setBudgetStartMonth(snap.budgetStartMonth || getBudgetStartMonth());
  render();
  rebuildAccFilters();
  rebuildCatFilters();
  _updateUndoBtn();
  toast('Opnieuw uitgevoerd.');
}

function _updateUndoBtn() {
  document.querySelectorAll('[data-undo-btn]').forEach(btn => {
    btn.disabled = _undoStack.length === 0;
  });
  document.querySelectorAll('[data-redo-btn]').forEach(btn => {
    btn.disabled = _redoStack.length === 0;
  });
}

// ── THEME ─────────────────────────────────────────────────────────────────
function resolvedTheme(theme = appTheme) {
  if (theme === 'system') {
    return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  return theme === 'light' ? 'light' : 'dark';
}

function setTheme(theme) {
  appTheme = theme;
  S.set('theme', theme);
  const activeTheme = resolvedTheme(theme);
  document.documentElement.classList.toggle('light', activeTheme === 'light');
  document.getElementById('theme-system')?.classList.toggle('active', theme === 'system');
  document.getElementById('theme-dark')?.classList.toggle('active', theme === 'dark');
  document.getElementById('theme-light')?.classList.toggle('active', theme === 'light');
}

window.matchMedia?.('(prefers-color-scheme: light)').addEventListener?.('change', () => {
  if (appTheme === 'system') setTheme('system');
});

// ── FONT SIZE ─────────────────────────────────────────────────────────────
function setFontScale(value) {
  const next = Math.max(85, Math.min(125, Math.round(Number(value) || 100)));
  uiFontScale = next;
  S.set('uiFontScale', uiFontScale);
  const scale = uiFontScale / 100;
  document.documentElement.style.setProperty('--ui-font-scale', String(scale));
  document.body?.style.setProperty('zoom', String(scale));
  const label = document.getElementById('font-scale-label');
  if (label) label.textContent = `${uiFontScale}%`;
}

function changeFontScale(delta) {
  setFontScale((uiFontScale || 100) + delta);
}

function bindSettingsControls() {
  const fontControls = document.querySelector('.settings-font-control');
  if (fontControls && !fontControls.dataset.bound) {
    const [smallerBtn, largerBtn] = fontControls.querySelectorAll('button');
    smallerBtn?.addEventListener('click', event => {
      event.preventDefault();
      changeFontScale(-5);
    });
    largerBtn?.addEventListener('click', event => {
      event.preventDefault();
      changeFontScale(5);
    });
    fontControls.dataset.bound = '1';
  }
  renderAutoBackupFolder();
}

function renderAutoBackupFolder() {
  const label = document.getElementById('auto-backup-path');
  if (!label) return;
  label.textContent = autoBackupFolder || 'Nog geen map gekozen';
  label.title = autoBackupFolder || '';
}

async function chooseAutoBackupFolder() {
  if (!window.__TAURI__?.dialog) {
    toast('Automatische back-upmap is beschikbaar in de desktop-app.');
    return;
  }
  try {
    const { open } = window.__TAURI__.dialog;
    const folder = await open({
      directory: true,
      multiple: false,
      title: 'Kies automatische back-upmap',
    });
    if (!folder || Array.isArray(folder)) return;
    autoBackupFolder = folder;
    S.set('autoBackupFolder', autoBackupFolder);
    renderAutoBackupFolder();
    toast('Back-upmap opgeslagen.');
  } catch (err) {
    console.error('Back-upmap kiezen mislukt:', err);
    toast('Back-upmap kiezen mislukt.');
  }
}

// ── TOAST ─────────────────────────────────────────────────────────────────
function toast(msg, duration = 2500) {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('visible');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('visible'), duration);
}

// ── KEYBOARD SHORTCUTS ────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  // Escape sluit open modal
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(m => {
      m.classList.remove('active');
    });
  }
  // Ctrl+T = nieuwe transactie
  if (e.key === 't' && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    openTxnModal();
  }
});

// ── MAANDNAVIGATIE ────────────────────────────────────────────────────────
function getActivePageName() {
  return document.querySelector('.page.active')?.id?.replace(/^page-/, '') || 'budget';
}

function renderActiveMonthPage() {
  updateMonthNavUI();
  const active = getActivePageName();
  if (active === 'insights') {
    renderInsights();
    return;
  }
  renderBudget();
}

function prevMonth() {
  currentMonth--;
  if (currentMonth < 1) { currentMonth = 12; currentYear--; }
  if (getActivePageName() === 'insights' && typeof _insightsViewOptions !== 'undefined') _insightsViewOptions.preset = 'month';
  renderActiveMonthPage();
}

function nextMonth() {
  currentMonth++;
  if (currentMonth > 12) { currentMonth = 1; currentYear++; }
  if (getActivePageName() === 'insights' && typeof _insightsViewOptions !== 'undefined') _insightsViewOptions.preset = 'month';
  renderActiveMonthPage();
}

function goToNextBudgetMonth() {
  currentMonth++;
  if (currentMonth > 12) { currentMonth = 1; currentYear++; }
  renderActiveMonthPage();
}

function goToBudgetMonth(year, month) {
  currentYear = Number(year);
  currentMonth = Number(month);
  renderActiveMonthPage();
}

function monthIndex(year, month) {
  return Number(year) * 12 + Number(month) - 1;
}

function monthFromIndex(idx) {
  return { year: Math.floor(idx / 12), month: (idx % 12) + 1 };
}

function monthSelectRange() {
  const now = new Date();
  const nowIdx = monthIndex(now.getFullYear(), now.getMonth() + 1);
  const selectedIdx = monthIndex(currentYear, currentMonth);
  let minIdx = Math.min(nowIdx - 11, selectedIdx);
  let maxIdx = Math.max(nowIdx + 12, selectedIdx);

  transactions.forEach(tx => {
    if (!tx.date || !/^\d{4}-\d{2}/.test(tx.date)) return;
    const y = Number(tx.date.slice(0, 4));
    const m = Number(tx.date.slice(5, 7));
    minIdx = Math.min(minIdx, monthIndex(y, m));
    maxIdx = Math.max(maxIdx, monthIndex(y, m));
  });

  Object.keys(budgets || {}).forEach(key => {
    if (!/^\d{4}-\d{2}$/.test(key)) return;
    const y = Number(key.slice(0, 4));
    const m = Number(key.slice(5, 7));
    minIdx = Math.min(minIdx, monthIndex(y, m));
    maxIdx = Math.max(maxIdx, monthIndex(y, m));
  });

  if (typeof budgetStartMonth === 'string' && /^\d{4}-\d{2}$/.test(budgetStartMonth)) {
    minIdx = Math.min(minIdx, monthIndex(Number(budgetStartMonth.slice(0, 4)), Number(budgetStartMonth.slice(5, 7))));
  }

  return { minIdx, maxIdx, selectedIdx, nowIdx };
}

function updateMonthNavUI() {
  const titleEl = document.getElementById('month-title');
  if (titleEl) titleEl.textContent = maandNaam(currentYear, currentMonth);

  const select = document.getElementById('month-select');
  const todayBtn = document.getElementById('month-today-btn');
  const { minIdx, maxIdx, selectedIdx, nowIdx } = monthSelectRange();
  if (select) {
    const rangeKey = `${minIdx}:${maxIdx}`;
    if (select.dataset.rangeKey !== rangeKey) {
      const opts = [];
      for (let idx = maxIdx; idx >= minIdx; idx--) {
        const { year, month } = monthFromIndex(idx);
        const value = monthKey(year, month);
        opts.push(`<option value="${value}">${maandNaam(year, month)}</option>`);
      }
      select.innerHTML = opts.join('');
      select.dataset.rangeKey = rangeKey;
    }
    select.value = monthKey(currentYear, currentMonth);
  }
  if (todayBtn) {
    todayBtn.disabled = selectedIdx === nowIdx;
    todayBtn.classList.toggle('is-current', selectedIdx === nowIdx);
  }
}

function setMonthFromSelect(value) {
  if (!/^\d{4}-\d{2}$/.test(value || '')) return;
  if (getActivePageName() === 'insights' && typeof _insightsViewOptions !== 'undefined') _insightsViewOptions.preset = 'month';
  goToBudgetMonth(Number(value.slice(0, 4)), Number(value.slice(5, 7)));
}

function goToThisMonth() {
  const now = new Date();
  if (getActivePageName() === 'insights' && typeof _insightsViewOptions !== 'undefined') _insightsViewOptions.preset = 'month';
  goToBudgetMonth(now.getFullYear(), now.getMonth() + 1);
}

// ── EXPORT / IMPORT ───────────────────────────────────────────────────────
async function exportBackup() {
  const data = typeof getBudgetSnapshot === 'function'
    ? getBudgetSnapshot()
    : { accounts, transactions, groups, budgets, goals, categoryMeta, budgetStartMonth };
  const json = JSON.stringify(data, null, 2);
  const filename = `keeep_backup_${vandaag()}.json`;

  // Tauri desktop app: gebruik native "Sla op als..." dialog
  if (window.__TAURI__?.dialog) {
    try {
      const { save } = window.__TAURI__.dialog;
      const { writeTextFile } = window.__TAURI__.fs;
      const path = await save({
        defaultPath: filename,
        filters: [{ name: 'Keeep back-up', extensions: ['json'] }]
      });
      if (path) {
        await writeTextFile(path, json);
        toast('Back-up opgeslagen.');
      }
    } catch (err) {
      console.error('Back-up fout:', err);
      toast('Back-up mislukt.');
    }
    return;
  }

  // Web fallback: download via browser
  const blob = new Blob([json], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  toast('Back-up gedownload.');
}

async function importBackup(file) {
  // Tauri desktop app: gebruik native "Open..." dialog als geen file meegegeven
  if (!file && window.__TAURI__?.dialog) {
    try {
      const { open } = window.__TAURI__.dialog;
      const { readTextFile } = window.__TAURI__.fs;
      const path = await open({
        filters: [{ name: 'Keeep back-up', extensions: ['json'] }],
        multiple: false
      });
      if (!path) return;
      const text = await readTextFile(path);
      _applyBackupText(text);
    } catch (err) {
      console.error('Importeer fout:', err);
      kAlert('Kon het bestand niet openen.', 'Fout bij importeren');
    }
    return;
  }

  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => _applyBackupText(e.target.result);
  reader.readAsText(file);
}

function _applyBackupText(text) {
  try {
    const data = JSON.parse(text);
    if (typeof applyBudgetSnapshot === 'function') {
      applyBudgetSnapshot(data);
      if (typeof debouncedSave === 'function') debouncedSave();
    } else {
      if (data.accounts)     { accounts     = data.accounts;     S.set('accounts', accounts); }
      if (data.transactions) { transactions = data.transactions; S.set('transactions', transactions); }
      if (data.groups)       { groups       = data.groups;       S.set('groups', groups); }
      if (data.budgets)      { budgets      = data.budgets;      S.set('budgets', budgets); }
      if (data.goals)        { goals        = data.goals;        S.set('goals', goals); }
      if (data.categoryMeta) { categoryMeta = data.categoryMeta; S.set('categoryMeta', categoryMeta); }
      if (data.budgetStartMonth) setBudgetStartMonth(data.budgetStartMonth);
    }
    render();
    rebuildAccFilters();
    rebuildCatFilters();
    toast('Back-up hersteld.');
  } catch {
    kAlert('Ongeldig back-up bestand.', 'Fout bij importeren');
  }
}

// ── CSV IMPORT ────────────────────────────────────────────────────────────
function openCsvModalForAcc(accId) {
  openCsvModal();
  const sel = document.getElementById('csv-acc');
  if (sel && accId) sel.value = accId;
}

function openCsvModal() {
  const fileInput = document.getElementById('csv-file');
  const preview   = document.getElementById('csv-preview');
  const accSel    = document.getElementById('csv-acc');

  if (fileInput) fileInput.value = '';

  if (preview) {
    preview.innerHTML = '';
    delete preview.dataset.raw;
  }

  if (accSel) {
    accSel.innerHTML = '<option value="">— Rekening —</option>';

    accounts.forEach(acc => {
      const opt = document.createElement('option');
      opt.value = acc.id;
      opt.textContent = acc.name;
      accSel.appendChild(opt);
    });

    if (accounts.length === 1) {
      accSel.value = accounts[0].id;
    }
  }

  if (!accounts.length) {
    toast('Maak eerst een rekening aan voordat je een bankafschrift importeert.');
  }

  openModal('modal-csv');
}

function handleCsvUpload(file) {
  if (!file) return;
  const reader = new FileReader();
  // Probeer UTF-8, fall back naar latin1 voor oudere bankbestanden
  reader.onload = e => parseCsvPreview(e.target.result);
  reader.onerror = () => {
    const r2 = new FileReader();
    r2.onload = e => parseCsvPreview(e.target.result);
    r2.readAsText(file, 'windows-1252');
  };
  reader.readAsText(file, 'UTF-8');
}

// ── RFC 4180 CSV PARSER ───────────────────────────────────────────────────
function detectSeparator(firstLine) {
  // Tel komma's en puntkomma's buiten quotes
  let commas = 0, semis = 0, inQ = false;
  for (const ch of firstLine) {
    if (ch === '"') inQ = !inQ;
    else if (!inQ) { if (ch === ',') commas++; else if (ch === ';') semis++; }
  }
  return semis > commas ? ';' : ',';
}

function parseCsvRows(text) {
  // Normaliseer regeleinden
  const normalized = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
  const sep = detectSeparator(normalized.split('\n')[0]);
  const rows = [];
  let row = [], field = '', inQuote = false;

  for (let i = 0; i < normalized.length; i++) {
    const ch = normalized[i];
    if (inQuote) {
      if (ch === '"' && normalized[i + 1] === '"') { field += '"'; i++; }
      else if (ch === '"') inQuote = false;
      else field += ch;
    } else {
      if (ch === '"') { inQuote = true; }
      else if (ch === sep) { row.push(field.trim()); field = ''; }
      else if (ch === '\n') { row.push(field.trim()); rows.push(row); row = []; field = ''; }
      else field += ch;
    }
  }
  if (field || row.length) { row.push(field.trim()); rows.push(row); }
  return rows;
}

function normalizeCsvDate(v) {
  if (!v) return vandaag();
  if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v;
  // DD-MM-YYYY of DD/MM/YYYY
  const m = v.match(/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/);
  if (m) return `${m[3]}-${String(m[2]).padStart(2,'0')}-${String(m[1]).padStart(2,'0')}`;
  // YYYYMMDD
  const m2 = v.match(/^(\d{4})(\d{2})(\d{2})$/);
  if (m2) return `${m2[1]}-${m2[2]}-${m2[3]}`;
  return vandaag();
}

// Universele kolomherkenning — werkt voor Rabobank, ING, ABN, Triodos, etc.
function findCol(header, ...keywords) {
  return header.findIndex(h => keywords.some(k => h.includes(k)));
}

function parseCsvPreview(text) {
  const preview = document.getElementById('csv-preview');
  if (!preview) return;

  const rows = parseCsvRows(text);
  if (!rows.length) { preview.innerHTML = '<p class="soft">Geen data gevonden.</p>'; return; }

  preview.innerHTML = '<p class="soft" style="margin-bottom:8px">Preview (eerste 5 rijen):</p>';
  const table = document.createElement('table');
  table.className = 'csv-preview-table';
  rows.slice(0, 6).forEach((cols, i) => {
    const tr = document.createElement('tr');
    cols.forEach(col => {
      const cell = document.createElement(i === 0 ? 'th' : 'td');
      cell.textContent = col;
      tr.appendChild(cell);
    });
    table.appendChild(tr);
  });
  preview.appendChild(table);
  preview.dataset.raw = text;
}

function doImportCsv() {
  const preview = document.getElementById('csv-preview');
  const raw = preview?.dataset.raw;
  if (!raw) { toast('Laad eerst een CSV-bestand.'); return; }

  const accId = document.getElementById('csv-acc')?.value;
  if (!accId) { toast('Kies een rekening.'); return; }

  const rows = parseCsvRows(raw);
  if (rows.length < 2) { toast('Geen transacties gevonden in dit bestand.'); return; }

  const header = rows[0].map(h => h.toLowerCase());

  // Universele kolomherkenning
  const iDate   = findCol(header, 'datum', 'date', 'boekdatum', 'transactiedatum', 'valuedate');
  const iPayee  = findCol(header, 'naam tegenpartij', 'naam', 'tegenpartij', 'omschrijving', 'name', 'payee', 'beneficiary', 'creditor name');
  const iAmount = findCol(header, 'bedrag', 'amount', 'amount (eur)', 'bedrag eur', 'transactiebedrag');
  const iMemo   = findCol(header, 'omschrijving-1', 'omschrijving', 'memo', 'mededelingen', 'description', 'remittance', 'betalingskenmerk');
  const iDebitCredit = findCol(header, 'af/bij', 'debet/credit', 'dc', 'credit/debit');

  if (iDate === -1 || iAmount === -1) {
    kAlert('Kan datum- of bedragkolom niet vinden. Controleer het CSV-formaat.','CSV Fout');
    return;
  }

  pushUndo();
  let imported = 0, skipped = 0;

  rows.slice(1).forEach(cols => {
    if (!cols.length || cols.every(c => !c)) return;

    const date  = normalizeCsvDate(cols[iDate] ?? '');
    const payee = (cols[iPayee] ?? '').trim();
    const memo  = (cols[iMemo]  ?? '').trim();
    let   rawAmt = (cols[iAmount] ?? '0').trim();

    // ING-stijl: aparte Af/Bij kolom bepaalt teken
    let cents = parseBedrag(rawAmt);
    if (iDebitCredit !== -1) {
      const dc = (cols[iDebitCredit] ?? '').trim().toLowerCase();
      if (dc === 'debet' || dc === 'af' || dc === 'd') cents = -Math.abs(cents);
      else cents = Math.abs(cents);
    }
    // Als er al een teken in het bedrag zit, bewaar dat
    // (Rabobank gebruikt bijv. "-2,22" en "+325,00")

    if (cents === 0) return; // sla lege regels over

    // Duplicaat check
    const isDupe = transactions.some(t =>
      t.date === date && t.payee === payee && t.amount === cents
    );
    if (isDupe) { skipped++; return; }

    // Positief bedrag → standaard inkomstencategorie
    const autoCatId = cents > 0 ? getDefaultIncomeCatId() : null;

    transactions.push({
      id: genId(), date, accId,
      catId: autoCatId, payee, memo,
      amount: cents, cleared: true,
      createdAt: new Date().toISOString()
    });
    imported++;
  });

  S.set('transactions', transactions);
  closeModal('modal-csv');
  render();
  rebuildAccFilters();
  toast(`${imported} transacties geïmporteerd, ${skipped} duplicaten overgeslagen.`);
}

// ── INKOMEN GROEP HELPERS ─────────────────────────────────────────────────
const INCOME_GROUP_NAME = 'Inkomen';
const INCOME_DEFAULT_CATS = [
  'Inkomen'
];
function ensureIncomeGroup() {
  let grp = groups.find(g => g.name === INCOME_GROUP_NAME);
  if (!grp) {
    grp = { id: genId(), name: INCOME_GROUP_NAME, cats: [] };
    groups.unshift(grp);
  }
  // Alleen toevoegen als de groep nieuw en leeg is
  if (grp.cats.length === 0) {
    INCOME_DEFAULT_CATS.forEach(catName => {
      grp.cats.push({ id: genId(), name: catName });
    });
  }
  // Zorg dat Inkomen altijd eerste groep is
  const idx = groups.indexOf(grp);
  if (idx > 0) { groups.splice(idx, 1); groups.unshift(grp); }
  S.set('groups', groups); // altijd opslaan
}

const CC_GROUP_NAME = '💳 Creditcardbetalingen';
const CC_GROUP_LEGACY_NAME = '💳 Creditcard betalingen';

function ensureCreditCardPaymentGroup() {
  const creditAccs = getBudgetCreditAccounts();
  let changed = false;

  if (!creditAccs.length) {
    for (let i = groups.length - 1; i >= 0; i--) {
      const group = groups[i];
      if (group.name === CC_GROUP_NAME || group.name === CC_GROUP_LEGACY_NAME) { groups.splice(i, 1); changed = true; }
    }
    if (changed) S.set('groups', groups);
    return;
  }

  // Zorg dat de CC-groep bestaat, direct na Inkomen
  const ccGroups = groups.filter(g => g.name === CC_GROUP_NAME || g.name === CC_GROUP_LEGACY_NAME);
  let ccGroup = ccGroups[0];
  if (!ccGroup) {
    ccGroup = { id: genId(), name: CC_GROUP_NAME, cats: [] };
    const incomeIdx = groups.findIndex(g => g.name === INCOME_GROUP_NAME);
    groups.splice(incomeIdx >= 0 ? incomeIdx + 1 : 0, 0, ccGroup);
    changed = true;
  } else if (ccGroup.name !== CC_GROUP_NAME) {
    ccGroup.name = CC_GROUP_NAME;
    changed = true;
  }
  if (ccGroups.length > 1) {
    ccGroups.slice(1).forEach(extraGroup => {
      extraGroup.cats.forEach(extraCat => {
        if (!ccGroup.cats.some(cat => cat.id === extraCat.id || (cat._accId && cat._accId === extraCat._accId))) {
          ccGroup.cats.push(extraCat);
        }
      });
      const idx = groups.indexOf(extraGroup);
      if (idx !== -1) groups.splice(idx, 1);
      changed = true;
    });
  }

  // Één categorie per creditcard-rekening
  creditAccs.forEach(acc => {
    const expectedName = `💳 ${acc.name}`;
    const existing = ccGroup.cats.find(c => c._accId === acc.id);
    if (!existing) {
      ccGroup.cats.push({ id: genId(), name: expectedName, _accId: acc.id });
      changed = true;
    } else if (existing.name !== expectedName) {
      existing.name = expectedName; changed = true;
    }
  });

  // Verwijder categorieën van verwijderde creditcards
  const accIds = creditAccs.map(a => a.id);
  const before = ccGroup.cats.length;
  ccGroup.cats = ccGroup.cats.filter(c => !c._accId || accIds.includes(c._accId));
  if (ccGroup.cats.length !== before) changed = true;

  if (changed) S.set('groups', groups);
}

function ensureForwardPlanInSavings() {
  let changed = false;
  const forwardGroups = groups.filter(g => g.name === 'Vooruit plannen');
  if (!forwardGroups.length) return;

  let savingsGrp = groups.find(g => ['voor later', 'spaardoelen', 'spaardoelen / vrije ruimte'].includes(String(g.name || '').toLowerCase()));
  if (!savingsGrp) {
    savingsGrp = { id: genId(), name: 'Voor later', cats: [] };
    groups.push(savingsGrp);
    changed = true;
  }
  if (String(savingsGrp.name || '').toLowerCase() !== 'voor later') {
    savingsGrp.name = 'Voor later';
    changed = true;
  }

  forwardGroups.forEach(group => {
    group.cats.forEach(cat => {
      if (!savingsGrp.cats.some(existing => existing.id === cat.id)) {
        savingsGrp.cats.push(cat);
        changed = true;
      }
    });
  });

  groups = groups.filter(g => g.name !== 'Vooruit plannen');
  if (forwardGroups.length) changed = true;

  // 'Volgende maand budget' blijft bewust een losse standaardcategorie.

  if (changed) S.set('groups', groups);
}

function ensureThreeBudgetGroups() {
  const wanted = [
    'Vaste lasten',
    'Dagelijks leven',
    'Vrije ruimte',
    'Voor later',
  ];
  const normalize = name => String(name || '').toLowerCase();
  const cleanCat  = name => String(name || '').replace(/^\S+\s*/, '').trim().toLowerCase();
  const legacyNames = [
    'needs',
    'wants',
    'spaardoelen',
    'spaardoelen / vrije ruimte',
    'noodzakelijk',
    'leuk & lekker',
  ];
  const hasLegacyGroups = groups.some(group => {
    const name = normalize(group.name);
    return legacyNames.includes(name)
      || name.includes('vooruit plannen')
      || group.cats.some(cat => cleanCat(cat.name) === 'te categoriseren');
  });
  if (!hasLegacyGroups) return;
  let changed = false;

  const pickTarget = groupName => {
    const name = normalize(groupName);
    if (name.includes('inkomen'))             return null;
    if (name.includes('creditcardbetaling') || name.includes('creditcard betaling')) return null;
    if (name.includes('schuld') || name.includes('herstel')) return 'Schulden';
    if (name.includes('vaste'))               return 'Vaste lasten';
    if (name.includes('nog te plaatsen') || name.includes('te categoriseren')) return 'Vrije ruimte';
    if (name.includes('voor later') || name.includes('spaar') || name.includes('doelen')) return 'Voor later';
    if (name.includes('vrije ruimte') || name.includes('wants') || name.includes('vrije tijd')) return 'Vrije ruimte';
    // Legacy groepen
    if (name === 'needs' || name.includes('noodzakelijk')) return 'Vaste lasten';
    if (name === 'wants' || name.includes('leuk & lekker')) return 'Vrije ruimte';
    if (name.includes('spaardoelen'))         return 'Voor later';
    if (name.includes('dagelijks'))           return 'Dagelijks leven';
    return null;
  };

  const targetGroups = {};
  wanted.forEach(name => {
    let grp = groups.find(g => normalize(g.name) === normalize(name));
    if (!grp) {
      grp = { id: genId(), name, cats: [] };
      groups.push(grp);
      changed = true;
    }
    if (grp.name !== name) { grp.name = name; changed = true; }
    targetGroups[name] = grp;
  });

  const incomeGrp = groups.find(g => g.name === INCOME_GROUP_NAME);
  const ccGrp     = groups.find(g => g.name === CC_GROUP_NAME);
  groups.slice().forEach(group => {
    if (group === incomeGrp || group === ccGrp || wanted.includes(group.name)) return;
    const targetName = pickTarget(group.name);
    if (!targetName) return;
    if (targetName === 'Schulden') {
      if (!targetGroups.Schulden) {
        let debtGrp = groups.find(g => normalize(g.name) === 'schulden');
        if (!debtGrp) { debtGrp = { id: genId(), name: 'Schulden', cats: [] }; groups.push(debtGrp); }
        else if (debtGrp.name !== 'Schulden') debtGrp.name = 'Schulden';
        targetGroups.Schulden = debtGrp;
        changed = true;
      }
    }
    group.cats.forEach(cat => {
      const target = cleanCat(cat.name) === 'te categoriseren'
        ? targetGroups['Vrije ruimte']
        : targetGroups[targetName];
      if (target && !target.cats.some(e => e.id === cat.id)) target.cats.push(cat);
    });
    groups = groups.filter(g => g.id !== group.id);
    changed = true;
  });

  const teCat = groups.flatMap(g => g.cats).find(cat => cleanCat(cat.name) === 'te categoriseren');
  if (teCat) {
    groups.forEach(group => {
      const idx = group.cats.findIndex(cat => cat.id === teCat.id);
      if (idx >= 0) { group.cats.splice(idx, 1); changed = true; }
    });
  }

  const standardGroups = [
    incomeGrp,
    ccGrp,
    targetGroups['Vaste lasten'],
    targetGroups['Dagelijks leven'],
    targetGroups['Vrije ruimte'],
    targetGroups['Voor later'],
    targetGroups.Schulden?.cats.length ? targetGroups.Schulden : null,
  ].filter(Boolean);
  const standardGroupIds = new Set(standardGroups.map(group => group.id));
  const preservedGroups = groups.filter(group => !standardGroupIds.has(group.id));

  groups = [
    ...(incomeGrp ? [incomeGrp] : []),
    ...(ccGrp     ? [ccGrp]     : []),
    targetGroups['Vaste lasten'],
    targetGroups['Dagelijks leven'],
    targetGroups['Vrije ruimte'],
    targetGroups['Voor later'],
    ...preservedGroups,
    ...(targetGroups.Schulden?.cats.length ? [targetGroups.Schulden] : []),
  ].filter(Boolean);

  if (changed) S.set('groups', groups);
}

function normalizeAccountBudgetStatus() {
  let changed = false;
  accounts.forEach(acc => {
    const normalizedType = typeof normalizeAccountType === 'function'
      ? normalizeAccountType(acc.type || 'checking')
      : (acc.type || 'checking');
    if (acc.type !== normalizedType) {
      acc.type = normalizedType;
      changed = true;
    }
    const expected = isBudgetActivityAccountType(acc.type || 'checking');
    if (acc.onBudget !== expected) {
      acc.onBudget = expected;
      changed = true;
    }
  });
  if (changed) S.set('accounts', accounts);
}

function getBudgetCreditAccounts() {
  return accounts.filter(acc => acc.onBudget !== false && isCreditAccountType(acc.type));
}

function removeCreditCardPaymentCategory() {
  let changed = false;
  const clean = name => String(name || '').replace(/^\S+\s*/, '').trim().toLowerCase();
  const removedIds = [];

  groups.forEach(group => {
    const before = group.cats.length;
    group.cats = group.cats.filter(cat => {
      const remove = clean(cat.name) === 'creditcard betaling';
      if (remove) removedIds.push(cat.id);
      return !remove;
    });
    if (group.cats.length !== before) changed = true;
  });

  if (removedIds.length) {
    Object.values(budgets).forEach(bm => {
      removedIds.forEach(catId => {
        if (catId in bm) {
          delete bm[catId];
          changed = true;
        }
      });
    });
    transactions.forEach(tx => {
      if (removedIds.includes(tx.catId)) {
        tx.catId = null;
        changed = true;
      }
    });
  }

  if (changed) {
    S.set('groups', groups);
    S.set('budgets', budgets);
    S.set('transactions', transactions);
  }
}

// Geeft de eerste categorie van de Inkomen-groep terug (voor CSV auto-assign)
// ── PRE-KEEEP SCHULD ─────────────────────────────────────────────────────
const PREKEEEP_GROUP_NAME = 'Pre-Keeep Schulden';
const PREKEEEP_CAT_NAME   = 'Pre-Keeep schuld';

function ensurePreKeeepGroup() {
  let grp = groups.find(g => g.name === PREKEEEP_GROUP_NAME);
  if (!grp) {
    grp = { id: genId(), name: PREKEEEP_GROUP_NAME, cats: [] };
    groups.push(grp);
  }
  if (!grp.cats.find(c => c.name === PREKEEEP_CAT_NAME)) {
    grp.cats.push({ id: genId(), name: PREKEEEP_CAT_NAME });
  }
}

function getPreKeeepCatId() {
  ensurePreKeeepGroup();
  const grp = groups.find(g => g.name === PREKEEEP_GROUP_NAME);
  return grp.cats.find(c => c.name === PREKEEEP_CAT_NAME)?.id || null;
}

function getDefaultIncomeCatId() {
  const grp = groups.find(g => g.name === INCOME_GROUP_NAME);
  return grp?.cats[0]?.id ?? null;
}

// ── SYSTEEMCATEGORIEËN ────────────────────────────────────────────────────
const SYSTEM_GROUP_NAME = 'Systeem';
const BALANCE_CORRECTION_CAT_NAME = 'Saldo correctie';
const BALANCE_CORRECTION_ROLE = 'balance_correction';

function isSystemBudgetGroup(group) {
  return group?.name === SYSTEM_GROUP_NAME || group?._system === true;
}

function isSystemBudgetCat(catId) {
  if (!catId) return false;
  return groups.some(group =>
    isSystemBudgetGroup(group) &&
    group.cats?.some(cat => cat.id === catId)
  );
}

function isProtectedBudgetCat(catId) {
  return isSystemBudgetCat(catId);
}

function isBalanceCorrectionCat(catId) {
  if (!catId) return false;
  return groups.some(group =>
    group.cats?.some(cat => cat.id === catId && (cat._systemRole === BALANCE_CORRECTION_ROLE || cat.name === BALANCE_CORRECTION_CAT_NAME))
  );
}

function isBalanceCorrectionTxn(tx) {
  if (!tx) return false;
  const payee = String(tx.payee || '').trim().replace(/\s+/g, ' ').toLowerCase();
  return tx.isBalanceCorrection === true ||
    isBalanceCorrectionCat(tx.catId) ||
    payee === 'saldocorrectie' ||
    payee === 'saldo correctie' ||
    payee === 'rekening controleren';
}

function ensureBalanceCorrectionCategory() {
  let changed = false;
  let group = groups.find(isSystemBudgetGroup);
  if (!group) {
    group = { id: genId(), name: SYSTEM_GROUP_NAME, cats: [], _system: true };
    groups.push(group);
    changed = true;
  } else {
    if (group.name !== SYSTEM_GROUP_NAME) { group.name = SYSTEM_GROUP_NAME; changed = true; }
    if (group._system !== true) { group._system = true; changed = true; }
    if (!Array.isArray(group.cats)) { group.cats = []; changed = true; }
  }

  let cat = group.cats.find(c => c._systemRole === BALANCE_CORRECTION_ROLE || c.name === BALANCE_CORRECTION_CAT_NAME);
  if (!cat) {
    cat = { id: genId(), name: BALANCE_CORRECTION_CAT_NAME, _systemRole: BALANCE_CORRECTION_ROLE };
    group.cats.push(cat);
    changed = true;
  } else {
    if (cat.name !== BALANCE_CORRECTION_CAT_NAME) { cat.name = BALANCE_CORRECTION_CAT_NAME; changed = true; }
    if (cat._systemRole !== BALANCE_CORRECTION_ROLE) { cat._systemRole = BALANCE_CORRECTION_ROLE; changed = true; }
  }

  transactions.forEach(tx => {
    if (isBalanceCorrectionTxn(tx) && (tx.catId !== cat.id || tx.isBalanceCorrection !== true || tx.payee !== 'Saldocorrectie')) {
      tx.catId = cat.id;
      tx.isBalanceCorrection = true;
      tx.payee = 'Saldocorrectie';
      changed = true;
    }
  });

  if (changed) {
    S.set('groups', groups);
    S.set('transactions', transactions);
  }
  return cat.id;
}

function getBalanceCorrectionCatId() {
  return ensureBalanceCorrectionCategory();
}


// ── BUDGET KOPIËREN VAN VORIGE MAAND ──────────────────────────────────────
async function copyBudgetFromPrevMonth() {
  let prevYear = currentYear, prevMonth = currentMonth - 1;
  if (prevMonth < 1) { prevMonth = 12; prevYear--; }

  const prevBm = getBudgetMonth(prevYear, prevMonth);
  const curBm  = getBudgetMonth(currentYear, currentMonth);

  const prevEntries = Object.entries(prevBm);
  if (!prevEntries.length) {
    toast('Vorige maand heeft geen budgetten om te kopiëren.');
    return;
  }

  const curFilled = Object.values(curBm).filter(v => v && v !== 0).length;
  const confirmMsg = curFilled > 0
    ? 'Deze maand heeft al ' + curFilled + ' ingevulde budgetten. Overschrijven met ' + maandNaam(prevYear, prevMonth) + '?'
    : 'Budgetten kopiëren van ' + maandNaam(prevYear, prevMonth) + '?';
  const ok = await kConfirm(confirmMsg, 'Budget kopiëren', false);
  if (!ok) return;

  pushUndo();
  prevEntries.forEach(([catId, val]) => {
    const goal = goals[catId];
    if (isGoalActiveForMonth(goal) && goal.type !== 'monthly') return;
    curBm[catId] = val;
  });
  budgets[monthKey(currentYear, currentMonth)] = curBm;
  S.set('budgets', budgets);
  refreshDataViews();
  toast('Budget gekopieerd van ' + maandNaam(prevYear, prevMonth) + ' ✓');
}

// ── MAANDBUDGETTEN WISSEN ─────────────────────────────────────────────────
async function clearMonthBudgets() {
  const ok = await kConfirm(
    'Alle toegewezen bedragen van ' + maandNaam(currentYear, currentMonth) + ' wissen?',
    'Maand wissen', true
  );
  if (!ok) return;
  pushUndo();
  budgets[monthKey(currentYear, currentMonth)] = {};
  S.set('budgets', budgets);
  refreshDataViews();
  toast('Budgetten van ' + maandNaam(currentYear, currentMonth) + ' gewist.');
}


// ── TOPBALK INKLAPBARE SECTIES ────────────────────────────────────────────
function toggleMTSection(bodyId, btn) {
  const body = document.getElementById(bodyId);
  if (!body) return;
  const isExpanded = btn.getAttribute('aria-expanded') !== 'false';
  if (isExpanded) {
    body.style.display = 'none';
    btn.setAttribute('aria-expanded', 'false');
    btn.classList.add('mt-collapsed');
  } else {
    body.style.display = '';
    btn.setAttribute('aria-expanded', 'true');
    btn.classList.remove('mt-collapsed');
  }
}

// ── MOBIELE NAVIGATIE ─────────────────────────────────────────────────────
function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('mob-open');
  document.getElementById('sidebar-overlay').classList.toggle('active');
}

function closeSidebar() {
  document.querySelector('.sidebar').classList.remove('mob-open');
  document.getElementById('sidebar-overlay').classList.remove('active');
}

// ── PRIVATE BETA ACTIVATIE ────────────────────────────────────────────────
const BETA_ACTIVATION_KEY = 'keeep_beta_activated_2026_05_26_v2';
const BETA_ACTIVATION_HASHES = [
  '2810309d295fe4b8514686deefcbdc144af790f2a4dd8b4095869099fdf76a0d',
  '8a3159f41a626dc1e651467ad1543eb9dfabc36e40d4a6c3314efed7f4030ada',
  '90c5ae30e447da7bdec6ef7e82a3679a58bac12020a65ce3930daabf0a9e9937'
];

function normalizeBetaActivationCode(value) {
  return String(value || '').trim().toUpperCase().replace(/\s+/g, '-');
}

async function sha256Hex(value) {
  const bytes = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(hash), byte => byte.toString(16).padStart(2, '0')).join('');
}

function betaActivationRequired() {
  return isTauriApp() && localStorage.getItem(BETA_ACTIVATION_KEY) !== '1';
}

function showBetaActivationGate() {
  const overlay = document.getElementById('beta-activation-overlay');
  const input = document.getElementById('beta-activation-code');
  const error = document.getElementById('beta-activation-error');
  if (!overlay) return;
  overlay.classList.add('active');
  overlay.setAttribute('aria-hidden', 'false');
  if (error) error.textContent = '';
  setTimeout(() => input?.focus(), 60);
}

function hideBetaActivationGate() {
  const overlay = document.getElementById('beta-activation-overlay');
  if (!overlay) return;
  overlay.classList.remove('active');
  overlay.setAttribute('aria-hidden', 'true');
}

async function submitBetaActivation(event) {
  event?.preventDefault?.();
  const input = document.getElementById('beta-activation-code');
  const error = document.getElementById('beta-activation-error');
  const code = normalizeBetaActivationCode(input?.value);
  const hash = await sha256Hex(code);
  if (!BETA_ACTIVATION_HASHES.includes(hash)) {
    if (error) error.textContent = 'Deze activatiecode klopt niet.';
    input?.focus();
    input?.select();
    return;
  }
  localStorage.setItem(BETA_ACTIVATION_KEY, '1');
  hideBetaActivationGate();
  init();
}

// ── INIT ──────────────────────────────────────────────────────────────────
async function init() {
  // Thema direct toepassen
  setTheme(appTheme);
  setFontScale(uiFontScale);

  if (betaActivationRequired()) {
    showBetaActivationGate();
    return;
  }

  bindSettingsControls();

  // Native/app data laden, anders de lokale server gebruiken
  let loaded = false;
  if (typeof loadFromNative === 'function') loaded = await loadFromNative();
  await checkServer();
  if (!loaded && !isTauriApp()) loaded = await loadFromServer();

  // Eenmalig: sorteer alle bestaande categorieën alfabetisch
  const SORT_DONE_KEY = 'keeep_cats_sorted_v2';
  if (!localStorage.getItem(SORT_DONE_KEY)) {
    groups.forEach(g => {
      if (g.name === 'Inkomen') return; // Inkomen niet sorteren
      g.cats.sort((a, b) => a.name.replace(/^[^\p{L}]+/u,'').localeCompare(b.name.replace(/^[^\p{L}]+/u,''),'nl'));
    });
    S.set('groups', groups);
    localStorage.setItem(SORT_DONE_KEY, '1');
  }
  if (loaded) toast('Opgeslagen data geladen.');

  const shouldStartOnboarding =
    typeof needsOnboarding === 'function' &&
    needsOnboarding() &&
    !groups.length;

  if (groups.length && typeof needsOnboarding === 'function' && needsOnboarding() && typeof markOnboarded === 'function') {
    markOnboarded();
  }

  // Standaard groepen als er nog niets is en de onboarding niet wordt gestart
  if (!groups.length && !shouldStartOnboarding) {
    restoreDefaultBudget();
  }

  // ── INKOMEN GROEP — altijd aanwezig ──────────────────────────────────────
  ensureIncomeGroup();
  ensureCreditCardPaymentGroup();
  ensureBalanceCorrectionCategory();
  normalizeAccountBudgetStatus();
  ensureForwardPlanInSavings();
  ensureThreeBudgetGroups();
  normalizeSubscriptionCategoryMeta();
  removeCreditCardPaymentCategory();

  // Filters opbouwen
  rebuildAccFilters();
  rebuildCatFilters();

  // Eerste render
  render();
  showPage('budget');

  if (shouldStartOnboarding && typeof startOnboarding === 'function') {
    startOnboarding({ resetData: true, mode: 'first' });
  }

  // Server status elke 30s checken
  if (!isTauriApp()) setInterval(checkServer, 30000);
}

// ── STANDAARD DATASET ────────────────────────────────────────────────────
const DEFAULT_GROUPS = [
  {
    name: 'Inkomen',
    cats: ['💼 Inkomen']
  },
  {
    name: 'Vaste lasten',
    cats: [
      '🚗 ANWB [abonnement]',
      '☁️ Apple / iCloud [abonnement]',
      '🚗 Autoverzekering',
      '🏦 Bankkosten',
      '🤖 ChatGPT [abonnement]',
      '☁️ Cloudopslag [abonnement]',
      '🤝 Contributies [abonnement]',
      '🏰 Disney+ [abonnement]',
      '⚡ Energie',
      '🏛️ Gemeentelijke heffingen',
      '☁️ Google One [abonnement]',
      '🏠 Huur / Hypotheek',
      '📺 Internet & TV [abonnement]',
      '🧒 Kinderopvang',
      '📰 Kranten & nieuws [abonnement]',
      '🚙 Lease',
      '💻 Microsoft 365 [abonnement]',
      '📱 Mobiele telefoon [abonnement]',
      '🎬 Netflix [abonnement]',
      '🛡️ Overlijdensrisicoverzekering',
      '🎟️ Pathé / bioscoop [abonnement]',
      '🎧 Podcasts / luisterboeken [abonnement]',
      '🏢 Servicekosten / VvE',
      '🎵 Spotify [abonnement]',
      '💪 Sportschool [abonnement]',
      '🎓 Studiekosten',
      '📰 Tijdschriften [abonnement]',
      '🛡️ Verzekeringen',
      '📺 Videoland [abonnement]',
      '💧 Water',
      '🛣️ Wegenbelasting',
      '▶️ YouTube Premium [abonnement]',
      '⚽ Ziggo Sport / ESPN / Viaplay [abonnement]',
      '🏥 Zorgverzekering',
    ]
  },
  {
    name: 'Dagelijks leven',
    cats: [
      '🛒 Boodschappen',
      '⛽ Brandstof / Laden',
      '🎁 Cadeaus',
      '💊 Drogist',
      '🚲 Fiets / OV / Taxi',
      '🐾 Huisdieren',
      '🧽 Huishouden',
      '💇 Kapper',
      '🧒 Kinderen',
      '👕 Kleding',
      '🩺 Medisch',
      '🅿️ Parkeren',
    ]
  },
  {
    name: 'Vrije ruimte',
    cats: [
      '🎁 Cadeaus',
      '🎡 Dagjes weg',
      '🎮 Games & apps',
      '🎨 Hobby’s',
      '👗 Kleding extra',
      '☕ Koffie & lunch buiten de deur',
      '🍽️ Uit eten & afhalen',
      '✈️ Vakantie',
      '💸 Vrij te besteden',
    ]
  },
  {
    name: 'Voor later',
    cats: [
      '🔧 Auto onderhoud',
      '🛡️ Buffer',
      '🛍️ Grote aankopen',
      '🏥 Eigen risico zorg',
      '📅 Jaarlijkse kosten',
      '🛠️ Onderhoud woning',
      '✈️ Vakantie',
    ]
  },
];

const DEFAULT_CATEGORY_ICON_BY_EMOJI = {
  '💼': 'wallet',
  '🚗': 'car',
  '☁️': 'cloud',
  '🏦': 'bank',
  '🤖': 'laptop',
  '🤝': 'handshake',
  '🏰': 'castle',
  '⚡': 'bolt',
  '🏛️': 'bank',
  '🏠': 'home',
  '📺': 'tv',
  '🧒': 'person',
  '📰': 'newspaper',
  '🚙': 'car',
  '💻': 'laptop',
  '📱': 'phone',
  '🎬': 'film',
  '🛡️': 'shield',
  '🎟️': 'ticket',
  '🎧': 'headphones',
  '🏢': 'home',
  '🎵': 'music',
  '💪': 'dumbbell',
  '🎓': 'graduation',
  '💧': 'droplet',
  '🛣️': 'road',
  '▶️': 'film',
  '⚽': 'football',
  '🏥': 'medical',
  '🛒': 'cart',
  '⛽': 'fuel',
  '🎁': 'gift',
  '💊': 'medical',
  '🚲': 'bike',
  '🐾': 'paw',
  '🧽': 'wrench',
  '💇': 'scissors',
  '👕': 'shirt',
  '🩺': 'medical',
  '🅿️': 'road',
  '🎡': 'ticket',
  '🎮': 'gamepad',
  '🎨': 'target',
  '👗': 'shirt',
  '☕': 'coffee',
  '🍽️': 'utensils',
  '✈️': 'plane',
  '💸': 'piggy',
  '🔧': 'wrench',
  '🛍️': 'shopping_bag',
  '📅': 'calendar',
  '🛠️': 'wrench'
};

function defaultCategoryIconForRawName(rawName, groupName = '') {
  const token = String(rawName || '').trim().split(/\s+/)[0] || '';
  const groupDefault = typeof GROUP_DEFAULT_ICON_KEY !== 'undefined' ? GROUP_DEFAULT_ICON_KEY[groupName] : '';
  const fallback = typeof DEFAULT_CATEGORY_ICON_KEY !== 'undefined' ? DEFAULT_CATEGORY_ICON_KEY : 'wallet';
  return DEFAULT_CATEGORY_ICON_BY_EMOJI[token]
    || DEFAULT_CATEGORY_ICON_BY_EMOJI[token.replace(/\uFE0F/g, '')]
    || groupDefault
    || fallback;
}

function defaultCatLabel(rawName) {
  const cleaned = String(rawName || '')
    .replace(/\s*\[abonnement\]\s*/i, '')
    .trim();
  return /^\p{Emoji}/u.test(cleaned)
    ? cleaned.replace(/^\S+\s*/, '').trim()
    : cleaned;
}

function defaultCatKey(groupName, rawName) {
  return `${groupName}::${defaultCatLabel(rawName).replace(/^\S+\s*/, '').trim().toLowerCase()}`;
}

function buildDefaultGroups(selectedKeys = null) {
  return DEFAULT_GROUPS.map(group => ({
    id: genId(),
    name: group.name,
    cats: group.cats
      .filter(rawName => group.name === 'Inkomen' || !selectedKeys || selectedKeys.has(defaultCatKey(group.name, rawName)))
      .map(rawName => {
        const id = genId();
        const name = defaultCatLabel(rawName);
        categoryMeta[id] = {
          ...(categoryMeta[id] || {}),
          icon: defaultCategoryIconForRawName(rawName, group.name)
        };
        return { id, name };
      })
  }));
}

function normalizeSubscriptionCategoryMeta() {
  let changed = false;
  let metaChanged = false;
  groups.forEach(grp => {
    grp.cats.forEach(cat => {
      const originalName = cat.name;
      const nextName = defaultCatLabel(originalName);
      let catMetaChanged = false;
      if (nextName && nextName !== cat.name) {
        cat.name = nextName;
        changed = true;
      }
      const nextMeta = { ...(categoryMeta[cat.id] || {}) };
      if (nextMeta.isSubscription) {
        delete nextMeta.isSubscription;
        catMetaChanged = true;
      }
      if (!nextMeta.icon) {
        nextMeta.icon = defaultCategoryIconForRawName(originalName, grp.name);
        catMetaChanged = true;
      }
      if (!catMetaChanged) return;
      categoryMeta[cat.id] = { ...nextMeta };
      metaChanged = true;
    });
  });
  if (changed) S.set('groups', groups);
  if (metaChanged) S.set('categoryMeta', categoryMeta);
}

function restoreDefaultBudget(selectedKeys = null) {
  accounts = [];
  transactions = [];
  budgets = {};
  goals = {};
  categoryMeta = {};
  groups = buildDefaultGroups(selectedKeys);
  monthNotes = {};
  catNotes = {};
  budgetStartMonth = monthKey(new Date().getFullYear(), new Date().getMonth() + 1);

  [
    'keeep_onboarded',
    'keeep_catDefaultAcc',
    'keeep_grpState',
    'keeep_cats_sorted_v2',
    'cdp.collapsed.goal',
  ].forEach(key => localStorage.removeItem(key));

  S.set('accounts', accounts);
  S.set('transactions', transactions);
  S.set('groups', groups);
  S.set('budgets', budgets);
  S.set('goals', goals);
  S.set('categoryMeta', categoryMeta);
  S.set('monthNotes', monthNotes);
  S.set('catNotes', catNotes);
  S.set('budgetStartMonth', budgetStartMonth);
  localStorage.removeItem('budget_userName');
  if (typeof saveToServer === 'function') saveToServer();
}

let _standardRestoreMode = 'restore';

function appEscapeHtml(str) {
  return String(str).replace(/[&<>"']/g, ch => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[ch]));
}

function openStandardRestoreModal(mode = 'restore') {
  _standardRestoreMode = mode;
  const title = document.getElementById('standard-restore-title');
  const intro = document.getElementById('standard-restore-intro');
  const confirmBtn = document.getElementById('standard-restore-confirm');
  if (title) title.textContent = mode === 'new' ? 'Nieuw budget samenstellen' : 'Standaard herstellen';
  if (confirmBtn) confirmBtn.textContent = mode === 'new' ? 'Budget aanmaken' : 'Herstellen';
  if (intro) {
    intro.textContent = mode === 'new'
      ? 'Kies welke standaardpotjes je in je nieuwe budget wilt zetten.'
      : 'Kies welke standaardpotjes je wilt terugzetten. Rekeningen, transacties en huidige budgetten worden daarna gewist.';
  }
  renderStandardRestoreOptions();
  openModal('modal-standard-restore');
}

function renderStandardRestoreOptions() {
  const wrap = document.getElementById('standard-restore-options');
  if (!wrap) return;
  wrap.innerHTML = DEFAULT_GROUPS
    .filter(group => group.name !== 'Inkomen')
    .map(group => `
      <section class="standard-choice-group">
        <div class="standard-choice-head">
          <strong>${appEscapeHtml(group.name)}</strong>
          <span>${group.cats.length} potjes</span>
        </div>
        <div class="standard-choice-list">
          ${group.cats.map(rawName => {
            const key = defaultCatKey(group.name, rawName);
            const label = defaultCatLabel(rawName);
            return `
              <label class="standard-choice-row">
                <input type="checkbox" data-standard-cat="${appEscapeHtml(key)}" checked>
                <span>${appEscapeHtml(label)}</span>
              </label>`;
          }).join('')}
        </div>
      </section>
    `).join('');
}

function setStandardRestoreSelection(checked) {
  document.querySelectorAll('#standard-restore-options input[type="checkbox"]').forEach(input => {
    input.checked = checked;
  });
}

async function confirmStandardRestore() {
  const selectedKeys = new Set(
    [...document.querySelectorAll('#standard-restore-options input[type="checkbox"]:checked')]
      .map(input => input.dataset.standardCat)
  );
  const count = selectedKeys.size;
  if (!count) {
    toast('Kies minstens één standaardpotje.');
    return;
  }

  const title = _standardRestoreMode === 'new' ? 'Nieuw budget' : 'Standaard herstellen';
  const message = _standardRestoreMode === 'new'
    ? `Nieuw budget aanmaken met ${count} standaardpotjes? Je huidige budget wordt vervangen.`
    : `Alles wissen en standaard herstellen met ${count} gekozen potjes? Dit kan niet ongedaan worden gemaakt.`;
  if (!await kConfirm(message, title, true)) return;

  closeModal('modal-standard-restore');
  closeModal('modal-settings');
  restoreDefaultBudget(selectedKeys);
  rebuildAccFilters();
  rebuildCatFilters();
  render();
  showPage('budget');
  toast(_standardRestoreMode === 'new' ? 'Nieuw budget aangemaakt.' : 'Standaardbudget hersteld.');
}

async function resetBudgets() {
  if (!await kConfirm('Alle budgettoewijzingen en doelen wissen? Rekeningen en transacties blijven bewaard.','Bevestigen',true)) return;
  budgets = {};
  goals   = {};
  S.set('budgets', budgets);
  S.set('goals', goals);
  refreshDataViews();
  closeModal('modal-settings');
  toast('Budgetten en doelen gewist.');
}

async function resetAll() {
  openStandardRestoreModal('restore');
}

async function createNewBudget() {
  closeModal('modal-settings');
  if (typeof startOnboarding === 'function') {
    startOnboarding({ resetData: true, mode: 'new' });
  } else {
    openStandardRestoreModal('new');
  }
}

Object.assign(window, {
  setTheme,
  setFontScale,
  changeFontScale,
  chooseAutoBackupFolder,
  exportBackup,
  importBackup,
  resetBudgets,
  resetAll,
  createNewBudget,
  openStandardRestoreModal,
  setStandardRestoreSelection,
  confirmStandardRestore
});

init();
