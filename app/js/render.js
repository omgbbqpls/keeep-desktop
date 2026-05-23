// ── RENDER.JS — Weergave functies ─────────────────────────────────────────

// ── POTJE ICONEN ──────────────────────────────────────────────────────────
const CATEGORY_SVG_ICONS = {
  wallet: { label: 'Algemeen', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M19 7V6a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-1"/><path d="M16 12h6v5h-6a2.5 2.5 0 0 1 0-5Z"/><path d="M18 14.5h.01"/></svg>' },
  cart: { label: 'Boodschappen', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.5 3h2l2.2 12.2a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.5L22 8H6"/></svg>' },
  home: { label: 'Wonen', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></svg>' },
  car: { label: 'Auto', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M6 17h12"/><path d="M5 17V9l2-4h10l2 4v8"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M7 9h10"/></svg>' },
  bolt: { label: 'Energie', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/></svg>' },
  phone: { label: 'Telefoon', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg>' },
  tv: { label: 'Media', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>' },
  music: { label: 'Muziek', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/></svg>' },
  gift: { label: 'Cadeaus', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13"/><path d="M3 12h18"/><path d="M12 8C10 3 5 4 6 7c.5 1.5 3 1 6 1Z"/><path d="M12 8c2-5 7-4 6-1-.5 1.5-3 1-6 1Z"/></svg>' },
  shield: { label: 'Verzekering', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-5"/></svg>' },
  bank: { label: 'Bank', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="m3 10 9-6 9 6"/><path d="M5 10h14"/><path d="M6 10v8"/><path d="M10 10v8"/><path d="M14 10v8"/><path d="M18 10v8"/><path d="M4 18h16"/><path d="M3 22h18"/></svg>' },
  medical: { label: 'Zorg', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3h8v5h5v8h-5v5H8v-5H3V8h5V3Z"/></svg>' },
  utensils: { label: 'Eten', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M4 3v8"/><path d="M8 3v8"/><path d="M6 3v18"/><path d="M14 3v18"/><path d="M14 3c4 2 5 6 5 10h-5"/></svg>' },
  gamepad: { label: 'Games', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M7 9h10a5 5 0 0 1 4 8l-1 2a2 2 0 0 1-3 0l-2-2H9l-2 2a2 2 0 0 1-3 0l-1-2a5 5 0 0 1 4-8Z"/><path d="M8 13h4"/><path d="M10 11v4"/><path d="M17 12h.01"/><path d="M19 14h.01"/></svg>' },
  wrench: { label: 'Onderhoud', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5 5L3 18v3h3l6.7-6.7a4 4 0 0 0 5-5l-2.6 2.6-2.8-2.8 2.4-2.8Z"/></svg>' },
  plane: { label: 'Reizen', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16 2 9l20-7-7 20-4-9-9-4"/></svg>' },
  droplet: { label: 'Water', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-5-7-13-7-13S5 10 5 15a7 7 0 0 0 7 7Z"/></svg>' },
  document: { label: 'Document', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h5"/></svg>' },
  target: { label: 'Doel', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3"/><path d="M12 19v3"/><path d="M2 12h3"/><path d="M19 12h3"/></svg>' },
  cloud: { label: 'Cloud', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 18H8a5 5 0 1 1 1.1-9.9A6 6 0 0 1 20 11.5 3.5 3.5 0 0 1 17.5 18Z"/></svg>' },
  handshake: { label: 'Contributie', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="m8 12 3 3a2 2 0 0 0 3 0l4-4"/><path d="m2 12 4-4 4 4"/><path d="m22 12-4-4-4 4"/><path d="M6 8l5-5h2l5 5"/><path d="M8 16l2 2"/><path d="M12 18l1 1"/></svg>' },
  castle: { label: 'Streaming', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21V8l3 2 3-2 3 2 3-2 4 2v11"/><path d="M7 21v-5a5 5 0 0 1 10 0v5"/><path d="M4 8V3h4v5"/><path d="M16 8V3h4v7"/></svg>' },
  newspaper: { label: 'Nieuws', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20V5H6.5A2.5 2.5 0 0 0 4 7.5v12Z"/><path d="M8 8h8"/><path d="M8 12h8"/><path d="M8 16h5"/></svg>' },
  laptop: { label: 'Software', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5" width="16" height="11" rx="2"/><path d="M2 19h20"/><path d="M9 16v3h6v-3"/></svg>' },
  film: { label: 'Film', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 5v14"/><path d="M17 5v14"/><path d="M3 9h4"/><path d="M17 9h4"/><path d="M3 15h4"/><path d="M17 15h4"/></svg>' },
  ticket: { label: 'Tickets', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9a3 3 0 1 0 0 6v3h18v-3a3 3 0 1 0 0-6V6H3v3Z"/><path d="M9 8v8"/><path d="M15 8v8"/></svg>' },
  headphones: { label: 'Audio', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a8 8 0 0 1 16 0"/><path d="M4 14v5a2 2 0 0 0 2 2h2v-7H6a2 2 0 0 0-2 2"/><path d="M20 14v5a2 2 0 0 1-2 2h-2v-7h2a2 2 0 0 1 2 2"/></svg>' },
  dumbbell: { label: 'Sport', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M6 7v10"/><path d="M18 7v10"/><path d="M3 9v6"/><path d="M21 9v6"/><path d="M6 12h12"/></svg>' },
  graduation: { label: 'Studie', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="m22 10-10-5-10 5 10 5 10-5Z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/><path d="M22 10v6"/></svg>' },
  road: { label: 'Belasting', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M7 21 10 3"/><path d="M17 21 14 3"/><path d="M12 6v3"/><path d="M12 13v3"/><path d="M12 20v1"/></svg>' },
  football: { label: 'Sport kijken', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m12 7 4 3-1.5 5h-5L8 10l4-3Z"/><path d="M12 7V3"/><path d="m16 10 4-1"/><path d="m14.5 15 2.5 4"/><path d="m9.5 15-2.5 4"/><path d="M8 10 4 9"/></svg>' },
  fuel: { label: 'Brandstof', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/><path d="M4 12h12"/><path d="M16 7h2l2 3v8a2 2 0 0 0 4 0v-6l-2-2"/><path d="M6 21h10"/></svg>' },
  bike: { label: 'Vervoer', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M8 17h4l3-6h-4l-3 6Z"/><path d="M11 11 9 7"/><path d="M14 7h3"/></svg>' },
  paw: { label: 'Huisdieren', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="10" r="2"/><circle cx="9" cy="6" r="2"/><circle cx="15" cy="6" r="2"/><circle cx="19" cy="10" r="2"/><path d="M7.5 18a4.5 4.5 0 0 1 9 0c0 2-2 3-4.5 3S7.5 20 7.5 18Z"/></svg>' },
  shirt: { label: 'Kleding', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4 5 6 2 8l3 5 3-2v9h8v-9l3 2 3-5-3-2-3-2"/><path d="M9 4a3 3 0 0 0 6 0"/></svg>' },
  coffee: { label: 'Koffie', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Z"/><path d="M16 10h2a3 3 0 0 1 0 6h-2"/><path d="M6 21h12"/></svg>' },
  person: { label: 'Persoon', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></svg>' },
  calendar: { label: 'Kalender', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4"/><path d="M8 3v4"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/></svg>' },
  receipt: { label: 'Rekening', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z"/><path d="M9 8h6"/><path d="M9 12h6"/><path d="M9 16h4"/></svg>' },
  piggy: { label: 'Sparen', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12a6 6 0 0 1 6-6h4a5 5 0 0 1 5 5v2a5 5 0 0 1-5 5H9l-2 3H5l1-4a6 6 0 0 1-1-5Z"/><path d="M4 12H2v3h3"/><path d="M15 6l2-3h2l-1 4"/><path d="M9 18v3"/><path d="M16 18v3"/><path d="M16 11h.01"/></svg>' },
  scissors: { label: 'Kapper', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="7" r="3"/><circle cx="6" cy="17" r="3"/><path d="M8.7 8.7 20 20"/><path d="M8.7 15.3 20 4"/></svg>' },
  shopping_bag: { label: 'Aankopen', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l-1 13H7L6 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>' }
};

const CATEGORY_ICON_KEYS = Object.keys(CATEGORY_SVG_ICONS);
const DEFAULT_CATEGORY_ICON_KEY = 'wallet';
const GROUP_DEFAULT_ICON_KEY = {
  'Creditcard betalingen': 'wallet',
  'Vaste lasten': 'receipt',
  'Dagelijks leven': 'cart',
  'Vrije ruimte': 'ticket',
  'Voor later': 'piggy',
  'Vervoer': 'bike',
  'Inkomen': 'wallet'
};

const sidebarAccountSectionState = JSON.parse(localStorage.getItem('keeep_sidebarAccountSectionState') || '{}');

function toggleSidebarAccountSection(key) {
  sidebarAccountSectionState[key] = sidebarAccountSectionState[key] === false ? true : false;
  localStorage.setItem('keeep_sidebarAccountSectionState', JSON.stringify(sidebarAccountSectionState));
  renderSidebar();
}

function categoryIconSvg(key) {
  return CATEGORY_SVG_ICONS[key]?.svg || CATEGORY_SVG_ICONS[DEFAULT_CATEGORY_ICON_KEY].svg;
}

function getCategoryIconKey(cat) {
  return (typeof categoryMeta !== 'undefined' && categoryMeta?.[cat?.id]?.icon && CATEGORY_SVG_ICONS[categoryMeta[cat.id].icon])
    ? categoryMeta[cat.id].icon
    : '';
}

function getCategoryVisual(cat, variant = 'budget') {
  const iconKey = getCategoryIconKey(cat);
  const label = cleanBudgetLabel(cat?.name || '');
  if (iconKey) {
    const cls = variant === 'txn' ? 'txn-cat-icon txn-cat-svg-icon' : 'cat-emoji cat-svg-icon';
    return { iconKey, label, iconHtml: `<span class="${cls}">${categoryIconSvg(iconKey)}</span>` };
  }
  if (/^\p{Emoji}/u.test(cat?.name || '')) {
    const cls = variant === 'txn' ? 'txn-cat-icon' : 'cat-emoji';
    return { iconKey: '', label, iconHtml: `<span class="${cls}">${[...cat.name][0]}</span>` };
  }
  return { iconKey: '', label, iconHtml: '' };
}

// ── SIDEBAR ───────────────────────────────────────────────────────────────
function renderSidebar() {
  const nw = calcNetWorth();
  const ownerEl = document.getElementById('sb-budget-owner');
  if (ownerEl) {
    const name = S.get('userName', '').trim();
    ownerEl.textContent = `Geef je geld een plan`;
  }
  const nwEl = document.getElementById('networth-val');
  if (nwEl) {
    nwEl.textContent = fmt(nw);
    nwEl.className = 'sb-nw-val ' + (nw > 0 ? 'pos' : nw < 0 ? 'neg' : 'zero');
  }

  const navAcc = document.getElementById('nav-accounts-list');
  if (!navAcc) return;
  navAcc.innerHTML = '';

  const onBudgetAccs = accounts.filter(a => isBudgetActivityAccount(a.id));
  const assetAccs = accounts.filter(a => accountTypeRole(a.type) === 'tracking_asset');
  const debtAccs = accounts.filter(a => {
    const role = accountTypeRole(a.type);
    return role === 'loan' || role === 'tracking_liability';
  });

  let _dragAccId = null;
  let _dragAccOrigin = null;
  let _dragAccPointerId = null;
  let _dragAccActive = false;
  let _dragAccClone = null;
  let _dragAccCloneStart = null;
  let _dragAccSuppressClick = false;

  function resetAccountDrag() {
    _dragAccId = null;
    _dragAccOrigin = null;
    _dragAccPointerId = null;
    _dragAccActive = false;
    _dragAccCloneStart = null;
    if (_dragAccClone) { _dragAccClone.remove(); _dragAccClone = null; }
    document.querySelectorAll('.nb.dragging,.nb.drag-over').forEach(el => el.classList.remove('dragging', 'drag-over'));
    document.body.classList.remove('drag-select-lock');
  }

  function moveAccountToDropTarget(sourceId, targetId) {
    if (!sourceId || !targetId || sourceId === targetId) return;
    const fromIdx = accounts.findIndex(a => a.id === sourceId);
    const toIdx = accounts.findIndex(a => a.id === targetId);
    if (fromIdx < 0 || toIdx < 0) return;
    const [moved] = accounts.splice(fromIdx, 1);
    accounts.splice(toIdx, 0, moved);
    S.set('accounts', accounts);
    renderSidebar();
  }

  function accountDropTargetAt(x, y) {
    return document.elementFromPoint(x, y)?.closest('.nb-draggable[data-acc-id]');
  }

  function makeAccBtn(acc) {
    const bal = calcAccountBalance(acc.id);
    const cls = bal > 0 ? 'pos' : bal < 0 ? 'neg' : 'zero';
    const isActive = document.getElementById('page-transactions')?.classList.contains('active')
      && document.getElementById('txn-facc')?.value === acc.id;
    const btn = document.createElement('div');
    btn.className = 'nb nb-static nb-draggable' + (isActive ? ' active' : '');
    btn.draggable = false;
    btn.setAttribute('draggable', 'false');
    btn.dataset.accId = acc.id;
    btn.innerHTML = `
      <span class="nb-left">
        ${accTypeIcon(acc.type)}
        ${acc.name}
      </span>
      <span class="nb-bal ${cls}">${fmt(bal)}</span>`;
    btn.addEventListener('click', () => {
      if (_dragAccSuppressClick) return;
      navToAccount(acc.id);
    });
    btn.addEventListener('contextmenu', e => showAccCtxMenu(e, acc.id));

    btn.addEventListener('pointerdown', e => {
      if (e.button !== 0 || e.target.closest('button, input, select, textarea')) return;
      _dragAccId = acc.id;
      _dragAccOrigin = { x: e.clientX, y: e.clientY };
      _dragAccPointerId = e.pointerId;
      document.body.classList.add('drag-select-lock');
      btn.setPointerCapture?.(e.pointerId);
    });

    btn.addEventListener('pointermove', e => {
      if (!_dragAccOrigin || _dragAccPointerId !== e.pointerId) return;
      if (e.pointerType === 'mouse' && (e.buttons & 1) !== 1) {
        resetAccountDrag();
        return;
      }
      const dx = e.clientX - _dragAccOrigin.x;
      const dy = e.clientY - _dragAccOrigin.y;

      if (!_dragAccActive) {
        if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
        _dragAccActive = true;
        btn.classList.add('dragging');
        const r = btn.getBoundingClientRect();
        _dragAccClone = btn.cloneNode(true);
        _dragAccCloneStart = { top: r.top, left: r.left };
        Object.assign(_dragAccClone.style, {
          position: 'fixed',
          top: `${r.top}px`,
          left: `${r.left}px`,
          width: `${r.width}px`,
          zIndex: 9999,
          pointerEvents: 'none',
          opacity: '0.92',
          boxShadow: '0 12px 30px rgba(0,0,0,.28)'
        });
        document.body.appendChild(_dragAccClone);
      }

      e.preventDefault();
      if (_dragAccClone && _dragAccCloneStart) {
        _dragAccClone.style.top = `${_dragAccCloneStart.top + dy}px`;
        _dragAccClone.style.left = `${_dragAccCloneStart.left + dx}px`;
      }
      document.querySelectorAll('.nb.drag-over').forEach(el => el.classList.remove('drag-over'));
      const target = accountDropTargetAt(e.clientX, e.clientY);
      if (target && target.dataset.accId !== _dragAccId) target.classList.add('drag-over');
    });

    btn.addEventListener('pointerup', e => {
      if (!_dragAccOrigin || _dragAccPointerId !== e.pointerId) return;
      btn.releasePointerCapture?.(e.pointerId);
      if (_dragAccActive) {
        e.preventDefault();
        const target = accountDropTargetAt(e.clientX, e.clientY);
        const targetId = target?.dataset.accId;
        const sourceId = _dragAccId;
        resetAccountDrag();
        _dragAccSuppressClick = true;
        setTimeout(() => { _dragAccSuppressClick = false; }, 0);
        if (targetId && sourceId !== targetId) moveAccountToDropTarget(sourceId, targetId);
        return;
      }
      resetAccountDrag();
    });

    btn.addEventListener('pointercancel', e => {
      if (_dragAccPointerId !== e.pointerId) return;
      resetAccountDrag();
    });

    return btn;
  }

  function appendSidebarAccountSection(key, title, list, withDivider = true) {
    if (!list.length && key !== 'accounts') return;
    if (withDivider) {
      const divider = document.createElement('div');
      divider.className = 'sb-divider';
      navAcc.appendChild(divider);
    }
    const isOpen = sidebarAccountSectionState[key] !== false;

    const sec = document.createElement('button');
    sec.className = 'sb-sec sb-sec-toggle';
    sec.type = 'button';
    sec.setAttribute('aria-expanded', String(isOpen));
    sec.onclick = () => toggleSidebarAccountSection(key);
    sec.innerHTML = `<span class="sb-sec-label">${title}</span><span class="sb-sec-chevron">${isOpen ? '▼' : '▶'}</span>`;
    navAcc.appendChild(sec);

    if (!isOpen) return;
    list.forEach(acc => navAcc.appendChild(makeAccBtn(acc)));
  }

  appendSidebarAccountSection('accounts', 'Rekeningen', onBudgetAccs, false);
  appendSidebarAccountSection('assets', 'Bezittingen', assetAccs);
  appendSidebarAccountSection('debts', 'Schulden', debtAccs);
}

// ── GROEP TOGGLE STATE — persistent ──────────────────────────────────────
const grpState = JSON.parse(localStorage.getItem('keeep_grpState') || '{}');

function toggleGroup(grpId) {
  grpState[grpId] = grpState[grpId] === false ? true : false;
  localStorage.setItem('keeep_grpState', JSON.stringify(grpState));
  renderBudget();
}

function toggleAllGroups() {
  const budgetGroups = groups.filter(grp => grp.name !== 'Inkomen');
  const anyOpen = budgetGroups.some(grp => grpState[grp.id] !== false);
  budgetGroups.forEach(grp => {
    grpState[grp.id] = !anyOpen;
  });
  localStorage.setItem('keeep_grpState', JSON.stringify(grpState));
  renderBudget();
}

function updateBudgetMasterToggle() {
  const chev = document.getElementById('budget-master-chevron');
  if (!chev) return;
  const budgetGroups = groups.filter(grp => grp.name !== 'Inkomen');
  const anyOpen = budgetGroups.some(grp => grpState[grp.id] !== false);
  chev.textContent = anyOpen ? '▼' : '▶';
}

// ── BUDGET PAGINA ─────────────────────────────────────────────────────────
function renderBudget() {
  if (typeof ensureCreditCardPaymentGroup === 'function') ensureCreditCardPaymentGroup();
  if (typeof ensureForwardPlanInSavings === 'function') ensureForwardPlanInSavings();
  if (typeof ensureThreeBudgetGroups === 'function') ensureThreeBudgetGroups();
  if (typeof normalizeSubscriptionCategoryMeta === 'function') normalizeSubscriptionCategoryMeta();
  if (typeof removeCreditCardPaymentCategory === 'function') removeCreditCardPaymentCategory();
  const bm   = getBudgetMonth(currentYear, currentMonth);
  const body = document.getElementById('budget-body');
  if (!body) return;
  updateBudgetMasterToggle();

  const currentKey     = monthKey(currentYear, currentMonth);
  const nextYear       = currentMonth === 12 ? currentYear + 1 : currentYear;
  const nextMonth      = currentMonth === 12 ? 1 : currentMonth + 1;
  const totalBudgeted  = calcBudgetedTotalForMonth(currentYear, currentMonth);
  const nextBudgeted   = calcBudgetedTotalForMonth(nextYear, nextMonth);
  const forwardTotals  = calcForwardPlanTotals();
  const totalSpent     = transactions
    .filter(tx =>
      tx.date?.startsWith(currentKey) &&
      tx.amount < 0 &&
      !tx.transferId &&
      isBudgetActivityAccount(tx.accId)
    )
    .reduce((sum, tx) => sum + tx.amount, 0);
  const totalAvailable = groups.flatMap(g => g.cats).reduce((s, cat) => s + calcCatAvailable(cat.id), 0);
  const rta            = calcReadyToAssign();

  const totalIncome = transactions
    .filter(tx =>
      tx.date?.startsWith(currentKey) &&
      tx.amount > 0 &&
      !tx.transferId &&
      isCashAccount(tx.accId)
    )
    .reduce((s, tx) => s + tx.amount, 0);
  const netto = totalIncome + totalSpent; // totalSpent is negatief

  // "Klaar om toe te wijzen" in de stats-balk bijwerken
  const sbNtvEl = document.getElementById('sidebar-ntv-val');
  if (sbNtvEl) {
    sbNtvEl.textContent = fmt(rta);
    sbNtvEl.className = 'month-stat-val ' + (rta > 0 ? 'pos' : rta < 0 ? 'neg' : 'zero');
  }
  window._currentReadyToAssign = rta;
  renderAvailabilityMode(rta);

  // Compacte topbalk: Inkomen | Uitgegeven | Netto
  const setVal = (id, val, colorClass) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = fmt(val);
    el.className = 'month-stat-val' + (colorClass ? ' ' + colorClass : '');
  };
  setVal('mt-income', totalIncome, totalIncome > 0 ? 'pos' : '');
  setVal('mt-spent',  Math.abs(totalSpent), '');
  setVal('mt-netto',  netto, netto > 0 ? 'pos' : netto < 0 ? 'neg' : '');


  const titleEl = document.getElementById('month-title');
  const maand = maandNaam(currentYear, currentMonth);
  if (titleEl) titleEl.textContent = maand;
  const lblSuffix = `in ${maand}`;
  const lblIncome = document.getElementById('lbl-income');
  const lblSpent  = document.getElementById('lbl-spent');
  const lblNetto  = document.getElementById('lbl-netto');
  if (lblIncome) lblIncome.textContent = `Binnengekomen ${lblSuffix}`;
  if (lblSpent)  lblSpent.textContent  = `Uitgegeven ${lblSuffix}`;
  if (lblNetto)  lblNetto.textContent  = `Resultaat van ${maand}`;
  renderAheadPanel();
  renderMobileCompanion({ rta, totalIncome, totalSpent, netto });

  body.innerHTML = '';

  // ── ONGECATEGORISEERDE UITGAVEN WAARSCHUWING ─────────────────────────────
  const mKey = monthKey(currentYear, currentMonth);
  const uncatSpent = transactions.filter(tx =>
    !tx.catId &&
    !tx.transferId &&
    !tx.isOpeningBalance &&
    normalizePayeeName(tx.payee) !== 'beginsaldo' &&
    !tx.isBalanceCorrection &&
    tx.amount < 0 &&
    tx.date?.startsWith(mKey) &&
    isBudgetActivityAccount(tx.accId)
  ).reduce((s, tx) => s + tx.amount, 0);

  if (uncatSpent < 0) {
    const warn = document.createElement('div');
    warn.className = 'uncat-warning';
    warn.innerHTML = `
      <span class="uncat-warning-icon">⚠</span>
      <span><strong>${fmt(Math.abs(uncatSpent))}</strong> aan ongecategoriseerde uitgaven deze maand</span>
      <button class="uncat-warning-btn" onclick="showPage('transactions');document.getElementById('txn-fcat').value='__uncat__';renderTransactions()">Bekijk</button>`;
    body.appendChild(warn);
  }

  groups.forEach(grp => {
    if (grp.name === 'Inkomen') return;

    let grpBudgeted = 0, grpSpent = 0, grpAvail = 0;
    grp.cats.forEach(cat => {
      grpBudgeted += calcCatBudgeted(cat.id);
      grpSpent    += calcCatSpent(cat.id);
      grpAvail    += calcCatAvailable(cat.id);
    });

    const isOpen = grpState[grp.id] !== false;
    const isCCGrp = grp.name === _ccGrpName();
    const canEditGroup = grp.name !== 'Inkomen' && grp.name !== 'Vooruit plannen' && !isCCGrp;

    const hdr = document.createElement('div');
    const grpOverspent = grpAvail < 0 && grp.name !== 'Inkomen';
    const grpFillNeed = getGroupGoalFillNeed(grp.id);
    const canFillGroup = grp.name !== 'Inkomen' && grpFillNeed > 0;
    hdr.className = 'group-header' + (isOpen ? ' is-open' : '') + (grpOverspent ? ' grp-overspent' : '') + (isCCGrp ? ' cc-group-header' : '');
    hdr.dataset.grpId = grp.id;
    hdr.draggable = false;
    hdr.setAttribute('draggable', 'false');
    hdr.addEventListener('click', e => {
      if (e.target.closest('button, input')) return;
      toggleGroup(grp.id);
    });

    // Beschikbaar-kolom: normaal voor alle groepen
    const availHtml = buildGroupAvailablePill(grpAvail, grpOverspent);

    hdr.innerHTML = `
      <div class="group-header-left">
        <button class="group-toggle group-toggle-prominent" onclick="toggleGroup('${grp.id}')">
          ${isOpen ? '▼' : '▶'}
        </button>
        <span class="group-name" title="${canEditGroup ? 'Dubbelklik om te hernoemen' : ''}" ${canEditGroup ? `ondblclick="renameGroup('${grp.id}')"` : ''}>${isCCGrp ? grp.name.replace(/^\S+\s*/, '') : grp.name}</span>
        ${canEditGroup ? `<button class="group-add-cat-btn" title="Potje toevoegen" onclick="addCategory('${grp.id}')"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>` : ''}
        ${canEditGroup ? `<span class="cat-inline-actions" style="margin-left:4px;">
          <button class="cat-inline-btn" title="Hernoemen" onclick="renameGroup('${grp.id}')">✎</button>
          <button class="cat-inline-btn cat-inline-del" title="Verwijderen" onclick="grpCtxDelete2('${grp.id}')">×</button>
        </span>` : ''}
      </div>
      <div class="group-totals">
        <span class="grp-total grp-total-budgeted">${fmt(grpBudgeted)}</span>
        <span class="grp-total grp-total-spent ${grpSpent > 0 ? 'pos' : ''}">${grp.name === 'Inkomen' ? fmt(grpSpent) : fmt(Math.abs(grpSpent))}</span>
        <span class="grp-total grp-total-avail">${availHtml}</span>
      </div>`;
    body.appendChild(hdr);

    if (!isOpen) return;

    grp.cats.forEach(cat => {
      const income    = isIncomeCat(cat.id);
      const budgeted  = calcCatBudgeted(cat.id);
      const spent     = calcCatSpent(cat.id);
      const available = calcCatAvailable(cat.id);
      const fundingStatus = calcFundingRuleStatus(cat.id);

      // Budget filter + zoek
      const _search = getBudgetSearch();
      if (_budgetFilter === 'underfunded' && (income || fundingStatus.fillNeed <= 0)) return;
      if (_budgetFilter === 'overspent'   && (income || available >= 0)) return;
      if (_budgetFilter === 'funded'      && (income || available < 0 || !fundingStatus.isFunded)) return;
      if (_search && !cat.name.toLowerCase().includes(_search)) return;

      const rawGoal    = goals[cat.id];
      const goal       = isGoalActiveForMonth(rawGoal) ? rawGoal : null;
      const goalTarget = goal ? calcGoalTarget(cat.id) : 0;
      const spentAbs    = Math.abs(spent);
      const rawProgress = goalTarget > 0 ? Math.round(spentAbs / goalTarget * 100) : 0;
      const progress    = Math.min(100, rawProgress);
      const isFullySpent = !income && available === 0 && budgeted > 0;
      // Budget bereikt = genoeg budget ingepland (geld staat klaar)
      const goalReached  = goalTarget > 0 && budgeted >= goalTarget;
      const progColor  = goalReached ? 'var(--green)' : progress >= 50 ? 'var(--amber)' : 'var(--red)';
      const isOverspent = !income && available < 0;
      const budgetSpentPct = budgeted > 0 ? Math.min(100, Math.round(spentAbs / budgeted * 100)) : 0;
      const budgetAvailPct = budgeted > 0 ? Math.max(0, 100 - budgetSpentPct) : 0;
      const budgetTone     = budgetRemainingTone(isOverspent, budgetAvailPct);

      // Statusbol: bij automatisch aanvullen volgt de kleur de voortgang
      let status;
      if (income) {
        status = 'green';
      } else if (goal && goalTarget > 0) {
        status = isOverspent ? 'red' : goalReached ? 'green' : progress > 0 ? 'orange' : 'grey';
      } else {
        status = catStatus(available, budgeted);
      }
      // YNAB-stijl statustekst + pill + voortgangsbalk
      const meta = buildCatMeta({ cat, income, goal, goalTarget, budgeted, spent, available, isOverspent, fundingStatus });

      const row = document.createElement('div');
      row.className     = 'cat-row' + (isOverspent ? ' overspent' : '') + (_cdpCatId === cat.id ? ' cdp-selected' : '');
      row.dataset.catId = cat.id;
      row.dataset.grpId = grp.id;
      row.draggable     = false;
      row.setAttribute('draggable', 'false');
      row.addEventListener('click', e => {
        if (e.target.closest('button, input')) return;
        openCatDetail(cat.id, grp.id);
      });

      const isCCCat = isCCPaymentCat(cat.id);
      // Inkomen: laat de extra kolommen leeg
      const spentHtml = income
        ? `<div class="cat-spent pos">${spent > 0 ? fmt(spent) : '—'}</div>`
        : `<div class="cat-spent">${fmt(Math.abs(spent))}</div>`;
      const budgetHtml = income
        ? `<div class="cat-budgeted"></div>`
        : `<div class="cat-budgeted"><input class="budget-input ${budgeted === 0 ? 'budget-input-zero' : ''}" value="${fmtInput(budgeted)}" onchange="setBudget('${cat.id}', this.value)" onfocus="this.select()"></div>`;

      const visual = getCategoryVisual(cat);
      const catIcon = visual.iconHtml;
      const catLabel = visual.label;
      row.innerHTML = `
        <div class="cat-row-top">
          <div class="cat-name-cell">
            <div class="cat-name">
              ${catIcon}
              <span class="cat-name-text">${catLabel}</span>
              ${meta.statusHtml}
            </div>
            ${meta.barHtml}
          </div>
          ${budgetHtml}
          ${spentHtml}
          ${meta.pillHtml}
        </div>`;
      body.appendChild(row);
    });
  });



  initDragDrop();
  renderSidebar();
  refreshMonthNote();
}

// ── TRANSACTIES PAGINA ────────────────────────────────────────────────────
// Geselecteerde transactie-IDs
const _txnSelected = new Set();
let _txnSort = { key: 'date', dir: 'desc' };
let _txnInlineEditId = null;
let _txnInlineAdding = false;
let _txnViewOptions = { preset: 'all', from: '', to: '' };

function startInlineTxnAdd() {
  if (document.body.classList.contains('mobile-entry') || window.innerWidth <= 768) {
    openTxnModal();
    return;
  }
  _txnInlineEditId = null;
  _txnInlineAdding = true;
  _txnSelected.clear();
  renderTransactions();
  setTimeout(() => document.getElementById('inline-txn-payee')?.focus(), 0);
}

function startInlineTxnEdit(id) {
  if (document.body.classList.contains('mobile-entry') || window.innerWidth <= 768) {
    openTxnModal(null, null, id);
    return;
  }
  _txnInlineEditId = id;
  _txnInlineAdding = false;
  _txnSelected.clear();
  renderTransactions();
  setTimeout(() => document.getElementById('inline-txn-payee')?.focus(), 0);
}

function cancelInlineTxn() {
  _txnInlineEditId = null;
  _txnInlineAdding = false;
  renderTransactions();
}

// ── WEERGAVE OPTIES ────────────────────────────────────────────────────────
function toggleTxnViewPanel() {
  const panel = document.getElementById('txn-view-panel');
  if (!panel) return;
  const isOpen = panel.style.display !== 'none';
  if (isOpen) { panel.style.display = 'none'; return; }
  panel.style.display = 'block';
  _updateTxnViewPanel();
  setTimeout(() => {
    function outsideClick(e) {
      const wrapper = document.getElementById('txn-view-wrapper');
      if (!wrapper || wrapper.contains(e.target)) return;
      const p = document.getElementById('txn-view-panel');
      if (p) p.style.display = 'none';
      document.removeEventListener('click', outsideClick);
    }
    document.addEventListener('click', outsideClick);
  }, 0);
}

function setTxnViewPreset(preset) {
  _txnViewOptions.preset = preset;
  _updateTxnViewPanel();
  renderTransactions();
}

function setTxnViewCustom() {
  const from = document.getElementById('txn-view-from')?.value || '';
  const to   = document.getElementById('txn-view-to')?.value   || '';
  _txnViewOptions.from = from;
  _txnViewOptions.to   = to;
  if (from || to) { _txnViewOptions.preset = 'custom'; }
  _updateTxnViewPanel();
  renderTransactions();
}

function _txnDateRange() {
  const today = vandaag();
  const [y, m] = today.split('-').map(Number);
  switch (_txnViewOptions.preset) {
    case 'today': return { from: today, to: today };
    case 'month': {
      const lastDay = new Date(y, m, 0).getDate();
      return { from: `${y}-${String(m).padStart(2,'0')}-01`, to: `${y}-${String(m).padStart(2,'0')}-${String(lastDay).padStart(2,'0')}` };
    }
    case '3months': {
      const d = new Date(y, m - 1, 1); d.setMonth(d.getMonth() - 2);
      return { from: `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-01`, to: today };
    }
    case 'year':     return { from: `${y}-01-01`, to: `${y}-12-31` };
    case 'lastyear': return { from: `${y-1}-01-01`, to: `${y-1}-12-31` };
    case 'custom':   return { from: _txnViewOptions.from, to: _txnViewOptions.to };
    default:         return { from: '', to: '' };
  }
}

function _updateTxnViewPanel() {
  const labels = { all: 'Weergave', today: 'Vandaag', month: 'Deze maand', '3months': 'Laatste 3 maanden', year: 'Dit jaar', lastyear: 'Vorig jaar', custom: 'Aangepast' };
  document.querySelectorAll('.txn-view-preset').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.preset === _txnViewOptions.preset);
  });
  const btnLabel = document.getElementById('txn-view-btn-label');
  if (btnLabel) btnLabel.textContent = labels[_txnViewOptions.preset] || 'Weergave';
  if (_txnViewOptions.preset === 'custom') {
    const fromEl = document.getElementById('txn-view-from');
    const toEl   = document.getElementById('txn-view-to');
    if (fromEl) fromEl.value = _txnViewOptions.from;
    if (toEl)   toEl.value   = _txnViewOptions.to;
  }
}

// ── CATEGORIE DISPLAY IN TRANSACTIELIJST ──────────────────────────────────
function txnCatDisplay(tx) {
  const isOpeningTx = tx.isOpeningBalance || normalizePayeeName(tx.payee) === 'beginsaldo';
  if (tx.transferId) {
    const arrowIcon = `<span class="txn-cat-icon txn-cat-icon--transfer"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="17 1 21 5 17 9"/><path d="M3 5h18"/><polyline points="7 15 3 19 7 23"/><path d="M21 19H3"/></svg></span>`;
    return `<span class="txn-cat-label">${arrowIcon}<span class="soft">${escapeHtml(tx.memo ?? 'Overboeking')}</span></span>`;
  }
  if (isOpeningTx) {
    return `<span class="txn-cat-label txn-cat-chip txn-cat-chip-opening"><span class="txn-cat-icon">${accTypeIcon(getAccount(tx.accId)?.type)}</span><span>Beginsaldo</span></span>`;
  }
  if (!isBudgetActivityAccount(tx.accId)) {
    const label = tx.isOpeningBalance
      ? 'Beginsaldo'
      : tx.isBalanceCorrection
        ? 'Correctie'
        : 'Off-budget';
    const tone = tx.isOpeningBalance ? 'opening' : tx.isBalanceCorrection ? 'correction' : 'offbudget';
    return `<span class="txn-cat-label txn-cat-chip txn-cat-chip-${tone}"><span class="txn-cat-icon">${accTypeIcon(getAccount(tx.accId)?.type)}</span><span>${label}</span></span>`;
  }
  if (tx.isBalanceCorrection) {
    return `<span class="txn-cat-label txn-cat-chip txn-cat-chip-correction"><span class="txn-cat-icon">✓</span><span>Correctie</span></span>`;
  }
  const cat = findCat(tx.catId);
  if (!cat) return `<span class="txn-cat-label txn-cat-chip txn-cat-chip-uncat"><span>Ongecategoriseerd</span></span>`;
  const grp = groups.find(g => g.cats.some(c => c.id === cat.id));
  let icon = '';
  let label = cleanBudgetLabel(cat.name);
  const incomeTxnCat = isIncomeCat(tx.catId);
  if (incomeTxnCat) {
    icon  = `<span class="txn-cat-icon">💰</span>`;
    label = cleanBudgetLabel(cat.name);
  } else {
    const visual = getCategoryVisual(cat, 'txn');
    icon = visual.iconHtml;
    label = visual.label;
  }
  const tone = incomeTxnCat ? 'income' : txnCategoryTone(grp?.name || '');
  return `<span class="txn-cat-label txn-cat-chip txn-cat-chip-${tone}">${icon}<span>${escapeHtml(label)}</span></span>`;
}

function txnCategoryTone(groupName) {
  const clean = String(groupName || '').replace(/^\S+\s*/, '').trim().toLowerCase();
  if (clean === 'inkomen') return 'income';
  if (clean.includes('creditcard')) return 'credit';
  if (clean.includes('vaste')) return 'bills';
  if (clean.includes('dagelijks')) return 'daily';
  if (clean.includes('spaar')) return 'savings';
  if (clean.includes('schuld')) return 'debt';
  if (clean.includes('vooruit')) return 'forward';
  return 'default';
}

function txnTypeKind(tx) {
  if (!tx) return 'expense';
  const isOpeningTx = tx.isOpeningBalance || normalizePayeeName(tx.payee) === 'beginsaldo';
  if (tx.transferId) return 'transfer';
  if (isOpeningTx) return 'opening';
  if (tx.isBalanceCorrection) return 'correction';
  if (tx.amount > 0) return 'income';
  return 'expense';
}

function txnAmountClass(tx) {
  const kind = txnTypeKind(tx);
  if (kind === 'income') return 'txn-money-income';
  if (kind === 'expense') return 'txn-money-expense';
  return 'txn-money-neutral';
}

function updateTxnSummary(filtered) {
  const el = document.getElementById('txn-summary-strip');
  if (!el) return;
  const totals = filtered.reduce((acc, tx) => {
    const kind = txnTypeKind(tx);
    const amount = Number(tx.amount) || 0;
    if (kind === 'expense' && tx.amount < 0) acc.out += Math.abs(tx.amount);
    if (kind === 'income' && tx.amount > 0) acc.in += tx.amount;
    if (kind === 'opening') {
      if (amount >= 0) acc.in += amount;
      else acc.out += Math.abs(amount);
    }
    return acc;
  }, { out: 0, in: 0 });
  const net = totals.in - totals.out;
  el.innerHTML = `
    <div class="txn-summary-actions">
      <button class="txn-add-btn" onclick="startInlineTxnAdd()" type="button" title="Transactie toevoegen">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        <span>Transactie</span>
      </button>
      <button class="txn-bar-icon-btn" data-undo-btn onclick="undoLastAction()" type="button" title="Ongedaan maken" aria-label="Ongedaan maken" disabled>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 7v6h6"/><path d="M3 13C5 8 9.5 5 15 5a9 9 0 0 1 0 18c-4 0-7.5-2-9-5"/></svg>
      </button>
      <button class="txn-bar-icon-btn" data-redo-btn onclick="redoLastAction()" type="button" title="Opnieuw" aria-label="Opnieuw" disabled>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 7v6h-6"/><path d="M21 13c-2 5-6.5 8-12 8a9 9 0 0 1 0-18c4 0 7.5 2 9 5"/></svg>
      </button>
      <button class="txn-add-btn txn-check-btn" onclick="openAccountCheck()" type="button" title="Rekening controleren">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M20 6 9 17l-5-5"/><path d="M21 12a9 9 0 1 1-2.6-6.4"/></svg>
        <span>Rekening controleren</span>
      </button>
      <span class="txn-selection-count" id="txn-delete-count"></span>
      <button class="btn-danger" id="txn-delete-selected" onclick="deleteSelectedTxns()">Verwijderen</button>
      <button class="btn-ghost" id="txn-clear-selected" onclick="_clearTxnSelection()">Deselecteren</button>
    </div>
    <div class="txn-summary-totals">
      <span><em>Uitgaand</em><strong class="txn-summary-out">${fmt(totals.out)}</strong></span>
      <span><em>Inkomend</em><strong class="txn-summary-in">${fmt(totals.in)}</strong></span>
      <span><em>Netto</em><strong class="${net < 0 ? 'txn-summary-out' : net > 0 ? 'txn-summary-in' : ''}">${net < 0 ? '-' : ''}${fmt(Math.abs(net))}</strong></span>
    </div>`;
  if (typeof updateUndoRedoState === 'function') updateUndoRedoState();
}

function inlineTxnTargetAccountValue(accId) {
  return '__acc__:' + accId;
}

function inlineTxnTargetAccountId(value) {
  return String(value || '').startsWith('__acc__:')
    ? String(value).slice('__acc__:'.length)
    : null;
}

function txnCategoryOptionLabel(cat) {
  if (!cat) return '';
  const available = calcCatAvailable(cat.id);
  return isIncomeCat(cat.id)
    ? cat.name
    : available === 0 ? cat.name : `${cat.name} · ${fmt(available)}`;
}

function txnAccountTargetOptionLabel(acc) {
  return `⇄ ${acc.name} · ${fmt(calcAccountBalance(acc.id))}`;
}

function inlineTxnOptions(selectedValue = '') {
  let html = '<option value="">— Kies —</option>';
  groups.forEach(grp => {
    html += `<optgroup label="${escapeHtml(grp.name)}">`;
    grp.cats.forEach(cat => {
      html += `<option value="${escapeHtml(cat.id)}" ${cat.id === selectedValue ? 'selected' : ''}>${escapeHtml(txnCategoryOptionLabel(cat))}</option>`;
    });
    html += '</optgroup>';
  });
  html += '<optgroup label="Eigen rekeningen">';
  accounts.forEach(acc => {
    const value = inlineTxnTargetAccountValue(acc.id);
    html += `<option value="${escapeHtml(value)}" ${value === selectedValue ? 'selected' : ''}>${escapeHtml(txnAccountTargetOptionLabel(acc))}</option>`;
  });
  html += '</optgroup>';
  return html;
}

function inlineAccountOptions(selectedAccId = '') {
  return accounts
    .map(acc => `<option value="${escapeHtml(acc.id)}" ${acc.id === selectedAccId ? 'selected' : ''}>${escapeHtml(acc.name)}</option>`)
    .join('');
}

function inlineDateValue(date) {
  return date || vandaag();
}

function inlineAmountValue(cents) {
  return cents ? (Math.abs(cents) / 100).toFixed(2).replace('.', ',') : '';
}

function getInlineTransferPair(tx) {
  return tx?.transferId
    ? transactions.find(t => t.transferId === tx.transferId && t.id !== tx.id)
    : null;
}

function getInlineFormTxn(tx) {
  const pair = getInlineTransferPair(tx);
  return tx?.transferId && tx.amount > 0 && pair ? pair : tx;
}

function renderInlineTxnRow(tx = null) {
  const formTx = getInlineFormTxn(tx);
  const pair = getInlineTransferPair(formTx);
  const isTransfer = !!pair;
  const selectedTarget = isTransfer ? inlineTxnTargetAccountValue(pair.accId) : (formTx?.catId || '');
  const outflow = formTx?.amount < 0 ? inlineAmountValue(formTx.amount) : '';
  const inflow = formTx?.amount > 0 ? inlineAmountValue(formTx.amount) : '';
  const _activeAccFilter = document.getElementById('txn-facc')?.value || '';
  const defaultAcc = formTx?.accId || (_activeAccFilter && accounts.find(a => a.id === _activeAccFilter) ? _activeAccFilter : null) || getDefaultSpendAccount()?.id || accounts[0]?.id || '';
  const memo = isTransfer ? '' : (formTx?.memo || '');

  const tr = document.createElement('tr');
  tr.className = 'txn-inline-row';
  tr.dataset.editId = formTx?.id || '';
  tr.innerHTML = `
    <td class="txn-cb-cell"></td>
    <td class="txn-inline-date-cell"><input id="inline-txn-date" class="txn-inline-input" type="date" value="${escapeHtml(inlineDateValue(formTx?.date))}"></td>
    <td class="txn-inline-payee-cell"><input id="inline-txn-payee" class="txn-inline-input" type="text" value="${escapeHtml(formTx?.payee || '')}" placeholder="Omschrijving" oninput="onInlineTxnPayeeInput()"></td>
    <td class="txn-inline-target-cell"><select id="inline-txn-target" class="txn-inline-input" onchange="markInlineTxnTargetManual()">${inlineTxnOptions(selectedTarget)}</select></td>
    <td class="txn-inline-account-cell"><select id="inline-txn-acc" class="txn-inline-input">${inlineAccountOptions(defaultAcc)}</select></td>
    <td class="txn-inline-money-cell"><input id="inline-txn-outflow" class="txn-inline-input txn-inline-money" type="text" inputmode="decimal" value="${escapeHtml(outflow)}" placeholder="0,00" oninput="clearInlineTxnOtherAmount('outflow')"></td>
    <td class="txn-inline-money-cell"><input id="inline-txn-inflow" class="txn-inline-input txn-inline-money" type="text" inputmode="decimal" value="${escapeHtml(inflow)}" placeholder="0,00" oninput="clearInlineTxnOtherAmount('inflow')"></td>
    <td class="txn-del-cell">
      <span class="txn-row-actions">
        <button class="txn-row-btn txn-inline-save" onclick="saveInlineTxn()" title="Opslaan" aria-label="Opslaan"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></button>
        <button class="txn-row-btn txn-inline-cancel" onclick="cancelInlineTxn()" title="Annuleren" aria-label="Annuleren"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
      </span>
    </td>`;
  return tr;
}

function setTxnSort(key) {
  if (_txnSort.key === key) {
    _txnSort.dir = _txnSort.dir === 'asc' ? 'desc' : 'asc';
  } else {
    _txnSort = { key, dir: key === 'date' ? 'desc' : 'asc' };
  }
  renderTransactions();
}

function _txnSortValue(tx, key) {
  if (key === 'date') return tx.date || '';
  if (key === 'account') return accounts.find(a => a.id === tx.accId)?.name?.toLowerCase() || '';
  if (key === 'payee') return (tx.payee || '').toLowerCase();
  if (key === 'category') return (findCat(tx.catId)?.name || (tx.transferId ? tx.memo : '') || '').toLowerCase();
  if (key === 'memo') return (tx.transferId ? '' : (tx.memo || '')).toLowerCase();
  if (key === 'outflow') return tx.amount < 0 ? Math.abs(tx.amount) : 0;
  if (key === 'inflow') return tx.amount > 0 ? tx.amount : 0;
  return '';
}

function _compareTxn(a, b) {
  const av = _txnSortValue(a, _txnSort.key);
  const bv = _txnSortValue(b, _txnSort.key);
  let result = 0;
  if (typeof av === 'number' && typeof bv === 'number') {
    result = av - bv;
  } else {
    result = String(av).localeCompare(String(bv), 'nl', { numeric: true, sensitivity: 'base' });
  }
  if (result === 0) result = String(a.createdAt || '').localeCompare(String(b.createdAt || ''));
  if (result === 0) result = String(a.id || '').localeCompare(String(b.id || ''));
  return _txnSort.dir === 'asc' ? result : -result;
}

function _updateTxnSortIndicators() {
  document.querySelectorAll('[data-sort-indicator]').forEach(el => {
    const key = el.dataset.sortIndicator;
    el.textContent = key === _txnSort.key ? (_txnSort.dir === 'asc' ? '↑' : '↓') : '';
  });
}

function markInlineTxnTargetManual() {
  const target = document.getElementById('inline-txn-target');
  if (target) target.dataset.manual = 'true';
}

function onInlineTxnPayeeInput() {
  const payeeEl = document.getElementById('inline-txn-payee');
  const target = document.getElementById('inline-txn-target');
  if (!payeeEl || !target || target.dataset.manual === 'true') return;
  const catId = typeof findLastCategoryForPayee === 'function'
    ? findLastCategoryForPayee(payeeEl.value)
    : null;
  if (catId) {
    target.value = catId;
    target.dataset.auto = 'true';
  } else if (target.dataset.auto === 'true') {
    target.value = '';
    target.dataset.auto = 'false';
  }
}

function clearInlineTxnOtherAmount(kind) {
  const other = document.getElementById(kind === 'outflow' ? 'inline-txn-inflow' : 'inline-txn-outflow');
  if (other) other.value = '';
}

function saveInlineTxn() {
  const editId = _txnInlineEditId;
  const old = editId ? transactions.find(t => t.id === editId) : null;
  const formOld = old ? getInlineFormTxn(old) : null;
  const accId = document.getElementById('inline-txn-acc')?.value || '';
  const target = document.getElementById('inline-txn-target')?.value || '';
  const toAccId = inlineTxnTargetAccountId(target);
  const catId = toAccId ? null : target;
  const payee = document.getElementById('inline-txn-payee')?.value.trim() || '';
  const memo = formOld?.transferId ? '' : (formOld?.memo || '');
  const date = document.getElementById('inline-txn-date')?.value || vandaag();
  const outflow = parseBedrag(document.getElementById('inline-txn-outflow')?.value || '');
  const inflow = parseBedrag(document.getElementById('inline-txn-inflow')?.value || '');

  if (!accId) { toast('Kies een rekening.'); return; }
  if (!target) { toast('Kies een potje of rekening.'); return; }
  if (outflow > 0 && inflow > 0) { toast('Gebruik uitgaand of inkomend, niet allebei.'); return; }
  if (outflow <= 0 && inflow <= 0) { toast('Vul een bedrag in.'); return; }
  if (toAccId && accId === toAccId) { toast('Van en naar zijn dezelfde rekening.'); return; }
  if (toAccId && inflow > 0) { toast('Gebruik Uitgaand voor een overboeking naar een eigen rekening.'); return; }
  if (!toAccId && !isBudgetActivityAccount(accId)) { toast('Gebruik een on-budget rekening voor budgettransacties.'); return; }

  const cents = outflow > 0 ? outflow : inflow;
  pushUndo();

  if (formOld?.transferId) {
    transactions = transactions.filter(t => t.transferId !== formOld.transferId);
  } else if (editId) {
    transactions = transactions.filter(t => t.id !== editId);
  }

  if (toAccId) {
    const transferId = formOld?.transferId || genId();
    const fromAcc = accounts.find(a => a.id === accId);
    const toAcc = accounts.find(a => a.id === toAccId);
    const transferPayee = payee || `Overboeking naar ${toAcc?.name || 'rekening'}`;
    transactions.push({
      id: genId(), date, accId,
      catId: null, payee: transferPayee,
      memo: memo || `→ ${toAcc?.name ?? ''}`,
      amount: -cents, cleared: true,
      transferId, createdAt: formOld?.createdAt || new Date().toISOString()
    });
    transactions.push({
      id: genId(), date, accId: toAccId,
      catId: null, payee: transferPayee,
      memo: memo || `← ${fromAcc?.name ?? ''}`,
      amount: cents, cleared: true,
      transferId, createdAt: new Date().toISOString()
    });
  } else {
    transactions.push({
      id: editId || genId(), date, accId, catId, payee, memo,
      amount: outflow > 0 ? -outflow : inflow,
      cleared: true,
      createdAt: formOld?.createdAt || new Date().toISOString()
    });
  }

  _txnInlineEditId = null;
  _txnInlineAdding = false;
  S.set('transactions', transactions);
  refreshDataViews();
}

function renderTransactions() {
  const tbody = document.getElementById('txn-tbody');
  if (!tbody) return;
  _updateTxnSortIndicators();

  const filterAcc = document.getElementById('txn-facc')?.value || '';
  const filterCat = document.getElementById('txn-fcat')?.value || '';
  const filterQ   = document.getElementById('txn-search')?.value.toLowerCase() || '';
  const { from: _dateFrom, to: _dateTo } = _txnDateRange();

  // Pas paginatitel aan op actief rekeningfilter
  const hdr = document.getElementById('hdr-all-txn');
  if (hdr) {
    if (filterAcc) {
      const acc = accounts.find(a => a.id === filterAcc);
      hdr.textContent = acc ? acc.name : 'Transacties';
    } else {
      hdr.textContent = 'Transacties';
    }
  }

  const filtered = transactions.filter(tx => {
    if (filterAcc && tx.accId !== filterAcc) return false;
    const isOpeningTx = tx.isOpeningBalance || normalizePayeeName(tx.payee) === 'beginsaldo';
    if (filterCat === '__uncat__' && (tx.catId || tx.transferId || isOpeningTx || tx.isBalanceCorrection || !isBudgetActivityAccount(tx.accId))) return false;
    if (filterCat && filterCat !== '__uncat__' && tx.catId !== filterCat) return false;
    if (_dateFrom && tx.date < _dateFrom) return false;
    if (_dateTo   && tx.date > _dateTo)   return false;
    const dateText = `${tx.date || ''} ${fmtDatum(tx.date || '')}`;
    if (filterQ && !tx.payee?.toLowerCase().includes(filterQ) &&
                   !tx.memo?.toLowerCase().includes(filterQ) &&
                   !dateText.toLowerCase().includes(filterQ)) return false;
    return true;
  }).sort(_compareTxn);
  updateTxnSummary(filtered);

  tbody.innerHTML = '';
  if (_txnInlineAdding) {
    tbody.appendChild(renderInlineTxnRow());
  }
  filtered.forEach(tx => {
    if (_txnInlineEditId === tx.id || (tx.transferId && transactions.find(t => t.id === _txnInlineEditId)?.transferId === tx.transferId && tx.amount < 0)) {
      tbody.appendChild(renderInlineTxnRow(tx));
      return;
    }
    if (tx.transferId && transactions.find(t => t.id === _txnInlineEditId)?.transferId === tx.transferId) return;
    const acc = accounts.find(a => a.id === tx.accId);
    const cat = findCat(tx.catId);
    const tr  = document.createElement('tr');
    const checked = _txnSelected.has(tx.id);
    const hasMemo = !tx.transferId && !!String(tx.memo || '').trim();
    const memoIcon = hasMemo
      ? `<span class="txn-note-icon" title="${escapeHtml(tx.memo)}" aria-label="Heeft notitie">
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h5"/></svg>
         </span>`
      : '';
    tr.innerHTML = `
      <td class="txn-cb-cell"><input type="checkbox" class="txn-cb" data-id="${tx.id}" ${checked ? 'checked' : ''}></td>
      <td>${fmtDatum(tx.date)}</td>
      <td><span class="txn-payee-cell"><span>${escapeHtml(tx.payee ?? '—')}</span>${memoIcon}</span></td>
      <td>${txnCatDisplay(tx)}</td>
      <td>${escapeHtml(acc?.name ?? '—')}</td>
      <td class="txn-money-cell ${tx.amount < 0 ? txnAmountClass(tx) : ''}">${tx.amount < 0 ? fmt(Math.abs(tx.amount)) : ''}</td>
      <td class="txn-money-cell ${tx.amount > 0 ? txnAmountClass(tx) : ''}">${tx.amount > 0 ? fmt(tx.amount) : ''}</td>
      <td class="txn-del-cell">
        <span class="txn-row-actions">
          <button class="txn-row-btn txn-edit-btn" title="Bewerken" data-id="${tx.id}" aria-label="Bewerken">✎</button>
          <button class="txn-row-btn txn-del-btn" title="Verwijderen" data-id="${tx.id}" aria-label="Verwijderen">×</button>
        </span>
      </td>`;

    // Selectie-checkbox toggle
    tr.querySelector('.txn-cb').addEventListener('change', e => {
      if (e.target.checked) _txnSelected.add(tx.id);
      else _txnSelected.delete(tx.id);
      _updateDeleteBar();
    });

    // Potloodknop: inline bewerken
    tr.querySelector('.txn-edit-btn').addEventListener('click', e => {
      e.stopPropagation();
      startInlineTxnEdit(tx.id);
    });

    // × knop: verwijderen na bevestiging
    tr.querySelector('.txn-del-btn').addEventListener('click', e => {
      e.stopPropagation();
      _deleteSingleTxn(tx.id);
    });

    tr.addEventListener('click', e => {
      if (e.target.closest('button, input, select, textarea, label, a')) return;
      startInlineTxnEdit(tx.id);
    });

    tbody.appendChild(tr);
  });

  // Balk bijwerken na render (zodat DOM-referentie zeker bestaat)
  _updateDeleteBar();
  renderSidebar();
}

function _updateDeleteBar() {
  const count = _txnSelected.size;
  const countEl = document.getElementById('txn-delete-count');
  if (!countEl) return;
  countEl.textContent = count === 1 ? '1 transactie geselecteerd' : `${count} transacties geselecteerd`;
  const deleteBtn = document.getElementById('txn-delete-selected');
  const clearBtn = document.getElementById('txn-clear-selected');
  const checkBtn = document.querySelector('.txn-check-btn');
  [deleteBtn, clearBtn, countEl].forEach(el => {
    if (el) el.style.display = count > 0 ? '' : 'none';
  });
  if (checkBtn) {
    const hasAccountFilter = !!document.getElementById('txn-facc')?.value;
    checkBtn.disabled = !hasAccountFilter;
    checkBtn.style.display = hasAccountFilter ? 'inline-flex' : 'none';
  }
  if (typeof _updateUndoBtn === 'function') _updateUndoBtn();
}

async function openAccountCheck() {
  const accId = document.getElementById('txn-facc')?.value || '';
  const acc = accounts.find(a => a.id === accId);
  if (!acc) {
    toast('Selecteer eerst een rekening.');
    return;
  }
  const currentBal = calcAccountBalance(acc.id);
  const rawInput = await kPrompt(`Werkelijk saldo voor "${acc.name}" (nu in Keeep: ${fmt(currentBal)})`, fmtInput(currentBal), 'Rekening controleren');
  if (rawInput === null) return;

  const newBal = parseBedrag(rawInput);
  const diff = newBal - currentBal;
  if (diff === 0) {
    toast('Saldo klopt al.');
    return;
  }

  pushUndo();
  transactions.push({
    id: genId(),
    date: vandaag(),
    accId: acc.id,
    catId: null,
    payee: 'Rekening controleren',
    memo: `Correctie van ${fmt(currentBal)} naar ${fmt(newBal)}`,
    amount: diff,
    cleared: true,
    isBalanceCorrection: true,
    createdAt: new Date().toISOString()
  });
  S.set('transactions', transactions);
  refreshDataViews();
  toast(`Correctie geboekt: ${fmt(diff)}.`);
}

function _clearTxnSelection() {
  _txnSelected.clear();
  renderTransactions();
}

async function _deleteSingleTxn(id) {
  const tx = transactions.find(t => t.id === id);
  const isTransfer = !!tx?.transferId;
  if (!await kConfirm(isTransfer ? 'Overboeking verwijderen?' : 'Transactie verwijderen?', 'Verwijderen', true)) return;
  pushUndo();
  _txnSelected.delete(id);
  transactions = isTransfer
    ? transactions.filter(t => t.transferId !== tx.transferId)
    : transactions.filter(t => t.id !== id);
  S.set('transactions', transactions);
  refreshDataViews();
}

async function deleteSelectedTxns() {
  if (!_txnSelected.size) return;
  const n = _txnSelected.size;
  if (!await kConfirm(`${n} transactie${n !== 1 ? 's' : ''} verwijderen?`, 'Verwijderen', true)) return;
  const transferIds = new Set(
    transactions
      .filter(t => _txnSelected.has(t.id) && t.transferId)
      .map(t => t.transferId)
  );
  pushUndo();
  transactions = transactions.filter(t => !_txnSelected.has(t.id) && !transferIds.has(t.transferId));
  _txnSelected.clear();
  S.set('transactions', transactions);
  refreshDataViews();
  toast(`${n} transactie${n !== 1 ? 's' : ''} verwijderd.`);
}

// ── REKENINGEN PAGINA ─────────────────────────────────────────────────────
function renderAccounts() {
  const list = document.getElementById('accounts-list');
  if (!list) return;
  list.innerHTML = '';

  accounts.forEach(acc => {
    const bal      = calcAccountBalance(acc.id);
    const role     = accountTypeRole(acc.type);
    const badgeCls = role === 'cash' ? 'on' : role === 'credit' ? 'credit' : 'off';
    const card     = document.createElement('div');
    card.className = 'acc-card';
    card.innerHTML = `
      <div class="acc-card-top">
        <div class="acc-card-icon">${accTypeIcon(acc.type)}</div>
        <div style="flex:1;min-width:0;">
          <div class="acc-name">${acc.name}</div>
          <div class="acc-type soft">${accTypeLabel(acc.type)}</div>
        </div>
        <span class="budget-badge ${badgeCls}">
          ${accountRoleLabel(role)}
        </span>
      </div>
      <div class="acc-bal ${bal < 0 ? 'neg' : 'pos'}">${fmt(bal)}</div>
      <div class="acc-card-actions">
        <button class="acc-csv-btn" disabled title="Tijdelijk uitgeschakeld" style="opacity:.4;cursor:not-allowed;">↑ CSV Import</button>
        <button class="acc-del-btn" onclick="_accDelete('${acc.id}')">🗑</button>
      </div>`;
    card.addEventListener('contextmenu', e => showAccCtxMenu(e, acc.id));
    list.appendChild(card);
  });
}

// ── REKENING VERWIJDEREN ─────────────────────────────────────────────────
function _accDelete(accId) {
  const acc = accounts.find(a => a.id === accId);
  if (!acc) return;
  if (!confirm(`Rekening "${acc.name}" verwijderen?\n\nAlle bijbehorende transacties blijven bewaard maar zijn niet meer gekoppeld aan een rekening.`)) return;
  pushUndo();
  accounts = accounts.filter(a => a.id !== accId);
  S.set('accounts', accounts);
  refreshDataViews();
  rebuildAccFilters();
  toast(`Rekening "${acc.name}" verwijderd.`);
}

// ── HOOFD RENDER ──────────────────────────────────────────────────────────
function render() {
  renderBudget();
  renderTransactions();
  renderAccounts();
  // Detail-paneel altijd meteen bijwerken na elke datawijziging
  if (_cdpCatId && typeof refreshCatDetail === 'function') refreshCatDetail();
}

function refreshDataViews() {
  render();
  if (document.getElementById('assign-popover') && typeof renderAssignMenu === 'function') renderAssignMenu();
}

// ── BEREKENINGEN ──────────────────────────────────────────────────────────
function getAccount(accId) {
  return accounts.find(a => a.id === accId) || null;
}

function isCashAccount(accId) {
  const acc = getAccount(accId);
  return !!acc && acc.onBudget !== false && isCashAccountType(acc.type);
}

function isCreditAccount(accId) {
  const acc = getAccount(accId);
  return !!acc && acc.onBudget !== false && isCreditAccountType(acc.type);
}

function isBudgetActivityAccount(accId) {
  const acc = accounts.find(a => a.id === accId);
  if (!acc) return false;
  if (acc.onBudget === false) return false;
  return isBudgetActivityAccountType(acc.type);
}

function isOnBudgetAccount(accId) {
  return isCashAccount(accId);
}

function calcAccountBalance(accId) {
  const acc = accounts.find(a => a.id === accId);
  const opening = acc ? Math.round((acc.openingBalance ?? 0) * 100) : 0;
  return transactions
    .filter(tx => tx.accId === accId)
    .reduce((sum, tx) => sum + tx.amount, opening);
}

function calcNetWorth() {
  return accounts.reduce((sum, acc) => sum + calcAccountBalance(acc.id), 0);
}

function calcNetWorthThrough(dateIso) {
  return accounts.reduce((sum, acc) => {
    const opening = Math.round((acc.openingBalance ?? 0) * 100);
    const txTotal = transactions
      .filter(tx => tx.accId === acc.id && tx.date && tx.date <= dateIso)
      .reduce((s, tx) => s + tx.amount, 0);
    return sum + opening + txTotal;
  }, 0);
}

function calcCatBudgeted(catId) {
  const bm = getBudgetMonth(currentYear, currentMonth);
  return Math.round((bm[catId] ?? 0) * 100);
}

function isIncomeCat(catId) {
  const grp = groups.find(g => g.name === 'Inkomen');
  return !!grp?.cats.find(c => c.id === catId);
}

// ── CC BETALING HELPERS ───────────────────────────────────────────────────
function _ccGrpName() {
  return typeof CC_GROUP_NAME !== 'undefined' ? CC_GROUP_NAME : '💳 Creditcard betalingen';
}
function isCCPaymentCat(catId) {
  const g = groups.find(g => g.name === _ccGrpName());
  return !!g?.cats.find(c => c.id === catId);
}
function getCCPaymentAccId(catId) {
  const g = groups.find(g => g.name === _ccGrpName());
  return g?.cats.find(c => c.id === catId)?._accId || null;
}
function calcCCAccountActivity(accId, year = currentYear, month = currentMonth) {
  const key = monthKey(year, month);
  return transactions
    .filter(tx => tx.accId === accId && tx.date?.startsWith(key) && tx.amount < 0 && !tx.transferId && !tx.isOpeningBalance)
    .reduce((sum, tx) => sum + tx.amount, 0);
}

function calcCCPayments(accId, year = currentYear, month = currentMonth) {
  const key = monthKey(year, month);
  return transactions
    .filter(tx => tx.accId === accId && tx.date?.startsWith(key) && tx.transferId && tx.amount > 0)
    .reduce((sum, tx) => sum + tx.amount, 0);
}

function calcCatCashAvailableForMonth(catId, year, month) {
  if (isIncomeCat(catId)) return 0;
  const prev = shiftMonth(year, month, -1);
  const key = monthKey(year, month);
  const startKey = calcCatAvailabilityStartMonth(catId);
  const previous = key <= startKey
    ? 0
    : calcCatAvailableForMonth(catId, prev.year, prev.month);
  const cashSpent = transactions
    .filter(tx =>
      tx.catId === catId &&
      tx.date?.startsWith(key) &&
      tx.amount < 0 &&
      isCashAccount(tx.accId)
    )
    .reduce((sum, tx) => sum + tx.amount, 0);
  return previous + calcCatBudgetedForMonth(catId, year, month) + cashSpent;
}

function calcCCFundedSpending(accId, year = currentYear, month = currentMonth) {
  if (calcAccountBalance(accId) >= 0) return 0;
  const key = monthKey(year, month);
  const spentByCat = new Map();
  transactions
    .filter(tx =>
      tx.accId === accId &&
      tx.catId &&
      tx.date?.startsWith(key) &&
      tx.amount < 0 &&
      !tx.transferId &&
      !tx.isOpeningBalance
    )
    .forEach(tx => {
      spentByCat.set(tx.catId, (spentByCat.get(tx.catId) || 0) + tx.amount);
    });

  let funded = 0;
  spentByCat.forEach((creditSpent, catId) => {
    if (isIncomeCat(catId) || isCCPaymentCat(catId)) return;
    const cashAvailableBeforeCredit = calcCatCashAvailableForMonth(catId, year, month);
    funded += Math.min(Math.abs(creditSpent), Math.max(0, cashAvailableBeforeCredit));
  });
  return funded;
}

function calcCCPaymentAvailableForMonth(catId, year = currentYear, month = currentMonth, depth = 0) {
  // Beschikbaar = rekeningsaldo + gefinancierde uitgaven + handmatig gebudgetteerd
  // minus daadwerkelijke creditcardbetalingen in deze maand.
  // Gefinancierde aankopen (bijv. ChatGPT €25 met €25 budget) heffen zichzelf op
  // in het rekeningsaldo. Handmatig budget dekt bestaande schuld af; betalingen
  // gebruiken dat budget weer, zodat de balans niet positief oploopt na aflossing.
  const accId = getCCPaymentAccId(catId);
  if (!accId) return 0;
  return calcAccountBalance(accId)
    + calcCCFundedSpending(accId, year, month)
    + calcCatBudgetedForMonth(catId, year, month)
    - calcCCPayments(accId, year, month);
}

function calcCCOpeningDebt(accId) {
  // Beginsaldo-transacties op de CC: vertegenwoordigen bestaande schuld (negatief bedrag).
  // Geen maandfilter: het beginsaldo staat vast ongeacht welke maand we berekenen.
  return transactions
    .filter(tx => tx.accId === accId && tx.isOpeningBalance)
    .reduce((sum, tx) => sum + tx.amount, 0);
}

function calcCatSpent(catId) {
  // CC betaling: activiteit = CC-aankopen deze maand (automatisch doorgeschoven
  // vanuit aankoopcategorieën zoals ChatGPT). Werkelijke betalingen verlagen
  // het rekeningsaldo en zijn al verwerkt in calcCCPaymentAvailableForMonth.
  if (isCCPaymentCat(catId)) {
    const accId = getCCPaymentAccId(catId);
    return accId ? calcCCAccountActivity(accId) : 0;
  }
  const key = monthKey(currentYear, currentMonth);
  const income = isIncomeCat(catId);
  return transactions
    .filter(tx =>
      tx.catId === catId &&
      tx.date?.startsWith(key) &&
      (income ? tx.amount > 0 : tx.amount < 0) &&
      (income ? isCashAccount(tx.accId) : isBudgetActivityAccount(tx.accId))
    )
    .reduce((sum, tx) => sum + tx.amount, 0);
}

function calcCatCashSpending(catId) {
  const key = monthKey(currentYear, currentMonth);
  if (isIncomeCat(catId)) return 0;
  return transactions
    .filter(tx =>
      tx.catId === catId &&
      tx.date?.startsWith(key) &&
      tx.amount < 0 &&
      isCashAccount(tx.accId)
    )
    .reduce((sum, tx) => sum + tx.amount, 0);
}

function calcCatCreditSpending(catId) {
  const key = monthKey(currentYear, currentMonth);
  if (isIncomeCat(catId)) return 0;
  return transactions
    .filter(tx =>
      tx.catId === catId &&
      tx.date?.startsWith(key) &&
      tx.amount < 0 &&
      isCreditAccount(tx.accId)
    )
    .reduce((sum, tx) => sum + tx.amount, 0);
}

function calcCatCashAvailable(catId) {
  if (isIncomeCat(catId)) return 0;
  return getPrevAvailable(catId) + calcCatBudgeted(catId) + calcCatCashSpending(catId);
}

function calcCatAvailable(catId) {
  if (isIncomeCat(catId)) return 0;
  return calcCatAvailableForMonth(catId, currentYear, currentMonth);
}

function getPrevAvailable(catId) {
  let y = currentYear, m = currentMonth - 1;
  if (m < 1) { m = 12; y--; }
  return calcCatAvailableForMonth(catId, y, m);
}

function calcReadyToAssign() {
  // Beginsaldi van budget-rekeningen
  const openingTotal = accounts
    .filter(a => isCashAccount(a.id))
    .reduce((s, a) => s + Math.round((a.openingBalance || 0) * 100), 0);

  // Inkomen-transacties (excl. transfers)
  const totalIncome = transactions
    .filter(tx => tx.amount > 0 && !tx.transferId && isCashAccount(tx.accId))
    .reduce((sum, tx) => sum + tx.amount, 0);

  // Transfers tussen twee budgetrekeningen tellen netto op tot 0. Transfers
  // tussen tracking/off-budget en budgetrekeningen veranderen juist het geld
  // dat verdeeld kan worden, dus tel alleen de budgetrekening-kant mee.
  const budgetTransferMovement = transactions
    .filter(tx => tx.transferId && isCashAccount(tx.accId))
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalBudgeted = Object.values(budgets)
    .flatMap(bm => Object.values(bm))
    .reduce((s, v) => s + Math.round(v * 100), 0);

  const overspending = groups
    .filter(g => g.name !== 'Inkomen')
    .flatMap(g => g.cats)
    .reduce((s, cat) => {
      const avail = calcCatCashAvailable(cat.id);
      return avail < 0 ? s + avail : s;
    }, 0);

  return openingTotal + totalIncome + budgetTransferMovement - totalBudgeted + overspending;
}

function renderAvailabilityMode(rta) {
  const label = document.getElementById('mt-available-label');
  const note  = document.getElementById('mt-available-note');
  if (label) label.textContent = 'Klaar om toe te wijzen';
  if (note)  { note.textContent = ''; note.style.display = 'none'; }

  const banner     = document.getElementById('budget-overspend-banner');
  const amountSpan = document.getElementById('budget-overspend-amount');
  if (!banner) return;
  if (rta < 0) {
    if (amountSpan) amountSpan.textContent = fmt(Math.abs(rta));
    banner.style.display = 'flex';
  } else {
    banner.style.display = 'none';
  }
}

function openFixOverspendModal() {
  // Zoek de meest overschreden categorie
  const overspent = groups
    .filter(g => g.name !== 'Inkomen' && g.name !== _ccGrpName())
    .flatMap(g => g.cats)
    .map(cat => ({ cat, avail: calcCatAvailable(cat.id) }))
    .filter(({ avail }) => avail < 0)
    .sort((a, b) => a.avail - b.avail); // meest rood eerst

  if (typeof openMoveModal === 'function') openMoveModal(null, 'cat', overspent.length ? {
    purpose: 'shortage',
    amount: Math.abs(overspent[0].avail),
    catName: overspent[0].cat.name.replace(/^\S+\s*/, '')
  } : {});

  if (overspent.length) {
    // Pre-selecteer de meest overschreden categorie als "Naar"
    setTimeout(() => {
      const toSel = document.getElementById('move-to');
      if (toSel) {
        toSel.value = overspent[0].cat.id;
        const amountEl = document.getElementById('move-amount');
        if (amountEl && !amountEl.value) {
          const deficit = Math.abs(overspent[0].avail);
          amountEl.value = (deficit / 100).toFixed(2).replace('.', ',');
        }
        if (typeof renderMoveFundingOptions === 'function') renderMoveFundingOptions();
      }
    }, 0);
  }
}

function calcGroupTotals(groupName) {
  const grp = groups.find(g => g.name === groupName);
  if (!grp) return { budgeted: 0, spent: 0, available: 0 };
  return grp.cats.reduce((totals, cat) => {
    totals.budgeted += calcCatBudgeted(cat.id);
    totals.spent    += calcCatSpent(cat.id);
    totals.available+= calcCatAvailable(cat.id);
    return totals;
  }, { budgeted: 0, spent: 0, available: 0 });
}

function isForwardPlanCatId(catId) {
  const cat = groups.flatMap(g => g.cats).find(c => c.id === catId);
  return cleanBudgetLabel(cat?.name || '').toLowerCase() === 'budget voor volgende maand';
}

function calcForwardPlanTotals() {
  return groups.flatMap(g => g.cats)
    .filter(cat => isForwardPlanCatId(cat.id))
    .reduce((totals, cat) => {
      totals.budgeted += calcCatBudgeted(cat.id);
      totals.spent    += calcCatSpent(cat.id);
      totals.available+= calcCatAvailable(cat.id);
      return totals;
    }, { budgeted: 0, spent: 0, available: 0 });
}

function calcBudgetedTotalForMonth(year, month) {
  const bm = budgets[monthKey(year, month)] || {};
  const excludedCatIds = new Set(
    groups
      .filter(g => g.name === 'Inkomen')
      .flatMap(g => g.cats)
      .map(c => c.id)
  );
  groups.flatMap(g => g.cats)
    .filter(cat => cleanBudgetLabel(cat.name).toLowerCase() === 'budget voor volgende maand')
    .forEach(cat => excludedCatIds.add(cat.id));
  return Object.entries(bm)
    .filter(([catId]) => !excludedCatIds.has(catId))
    .reduce((s, [, v]) => s + Math.round((Number(v) || 0) * 100), 0);
}

function shiftMonth(year, month, delta) {
  const d = new Date(year, month - 1 + delta, 1);
  return { year: d.getFullYear(), month: d.getMonth() + 1 };
}

function monthLabelShort(year, month) {
  return maandNaam(year, month).split(' ')[0].slice(0, 3).toUpperCase();
}

function calcIncomeForMonth(year, month) {
  const key = monthKey(year, month);
  return transactions
    .filter(tx =>
      tx.date?.startsWith(key) &&
      tx.amount > 0 &&
      !tx.transferId &&
      isCashAccount(tx.accId)
    )
    .reduce((sum, tx) => sum + tx.amount, 0);
}

function calcCashMovementThroughMonth(year, month) {
  const endKey = monthKey(year, month);
  const income = transactions
    .filter(tx =>
      tx.date?.slice(0, 7) <= endKey &&
      tx.amount > 0 &&
      !tx.transferId &&
      isCashAccount(tx.accId)
    )
    .reduce((sum, tx) => sum + tx.amount, 0);
  const transfers = transactions
    .filter(tx => tx.date?.slice(0, 7) <= endKey && tx.transferId && isCashAccount(tx.accId))
    .reduce((sum, tx) => sum + tx.amount, 0);
  return income + transfers;
}

function calcBudgetedThroughMonth(year, month) {
  const endKey = monthKey(year, month);
  return Object.entries(budgets)
    .filter(([key]) => key <= endKey)
    .reduce((sum, [key, bm]) => {
      const [y, m] = key.split('-').map(Number);
      return sum + calcBudgetedTotalForMonth(y, m);
    }, 0);
}

function calcCatAvailabilityStartMonth(catId) {
  let start = getBudgetStartMonth();

  Object.entries(budgets).forEach(([key, bm]) => {
    if (bm && Object.prototype.hasOwnProperty.call(bm, catId) && key < start) start = key;
  });

  transactions.forEach(tx => {
    const key = tx.catId === catId ? tx.date?.slice(0, 7) : null;
    if (key && key < start) start = key;
  });

  return start;
}

function calcCatAvailableForMonth(catId, year, month, depth = 0) {
  if (depth > 240 || isIncomeCat(catId)) return 0;
  if (isCCPaymentCat(catId)) return calcCCPaymentAvailableForMonth(catId, year, month, depth);
  const key = monthKey(year, month);
  const startKey = calcCatAvailabilityStartMonth(catId);
  if (key < startKey) return 0;
  const prev = shiftMonth(year, month, -1);
  const previous = key <= startKey ? 0 : calcCatAvailableForMonth(catId, prev.year, prev.month, depth + 1);
  return previous + calcCatBudgetedForMonth(catId, year, month) + calcCatSpentForMonth(catId, year, month);
}

function calcOverspentForMonth(year, month) {
  return groups
    .filter(group => group.name !== 'Inkomen' && group.name !== _ccGrpName())
    .flatMap(group => group.cats)
    .reduce((sum, cat) => {
      const available = calcCatAvailableForMonth(cat.id, year, month);
      return available < 0 ? sum + available : sum;
    }, 0);
}

function calcNotBudgetedThroughMonth(year, month) {
  const openingTotal = accounts
    .filter(a => isCashAccount(a.id))
    .reduce((sum, acc) => sum + Math.round((acc.openingBalance || 0) * 100), 0);
  return openingTotal + calcCashMovementThroughMonth(year, month) - calcBudgetedThroughMonth(year, month);
}

function calcAheadMonthSummary(year, month) {
  const prev = shiftMonth(year, month, -1);
  const notBudgetedPrev = calcNotBudgetedThroughMonth(prev.year, prev.month);
  const overspentPrev = calcOverspentForMonth(prev.year, prev.month);
  const income = calcIncomeForMonth(year, month);
  const budgeted = calcBudgetedTotalForMonth(year, month);
  const available = notBudgetedPrev + overspentPrev + income - budgeted;
  return { year, month, prevYear: prev.year, prevMonth: prev.month, notBudgetedPrev, overspentPrev, income, budgeted, available };
}

function aheadPanelExpanded() {
  return localStorage.getItem('keeep_ahead_expanded') === 'true';
}

function toggleAheadPanel() {
  localStorage.setItem('keeep_ahead_expanded', aheadPanelExpanded() ? 'false' : 'true');
  renderAheadPanel();
}

function renderAheadPanel() {
  const panel = document.getElementById('ahead-panel');
  const strip = document.getElementById('ahead-strip');
  const chevron = document.getElementById('ahead-chevron');
  const toggle = panel?.querySelector('.ahead-toggle-main');
  if (!panel || !strip) return;

  const months = [0].map(delta => shiftMonth(currentYear, currentMonth, delta));
  const summaries = months.map(({ year, month }) => calcAheadMonthSummary(year, month));

  const isExpanded = aheadPanelExpanded();
  panel.classList.toggle('is-expanded', isExpanded);
  if (chevron) chevron.textContent = isExpanded ? '⌃' : '⌄';
  if (toggle) toggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');

  strip.innerHTML = summaries.map((item, idx) => {
    const prevName = maandNaam(item.prevYear, item.prevMonth).split(' ')[0].toLowerCase();
    const monthName = maandNaam(item.year, item.month).split(' ')[0].toLowerCase();
    const active = item.year === currentYear && item.month === currentMonth ? ' active' : '';
    const overspentDisplay = item.overspentPrev < 0 ? item.overspentPrev : 0;
    const readyToAssign = window._currentReadyToAssign ?? calcReadyToAssign();
    const readyCls = readyToAssign > 0 ? 'pos' : readyToAssign < 0 ? 'neg' : '';
    return `
      <div class="ahead-month${active}" tabindex="0" role="button" onclick="goToBudgetMonth(${item.year}, ${item.month})" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();goToBudgetMonth(${item.year}, ${item.month});}">
        <div class="ahead-month-top">
          <span>Deze maand</span>
          <strong>${monthLabelShort(item.year, item.month)} ${item.year}</strong>
        </div>
        <button class="ahead-available ${readyCls}" type="button" onclick="event.stopPropagation();toggleAheadPanel()">
          <strong>Beschikbaar</strong>
          <span>${fmt(readyToAssign)}</span>
          <em aria-hidden="true">${isExpanded ? '⌃' : '⌄'}</em>
        </button>
        <button class="ahead-assign-btn" type="button" onclick="event.stopPropagation();toggleAssignMenu(event)">Toewijzen</button>
        <div class="ahead-month-breakdown">
          <span><em>Over van vorige maand</em><strong>${fmt(item.notBudgetedPrev)}</strong></span>
          ${item.overspentPrev < 0 ? `<span>Tekort ${prevName}: <strong class="neg">${fmt(overspentDisplay)}</strong></span>` : ''}
          <span><em>Binnengekomen deze maand</em><strong>${fmt(item.income)}</strong></span>
          <span><em>Al verdeeld</em><strong>${fmt(-item.budgeted)}</strong></span>
          <span class="ahead-breakdown-result"><em>Beschikbaar</em><strong class="${readyCls}">${fmt(readyToAssign)}</strong></span>
        </div>
      </div>`;
  }).join('');
}

function isMobileEntry() {
  return document.body.classList.contains('mobile-entry');
}

function mobileOpenShortfalls() {
  _assignTab = 'shortfalls';
  openAssignMenu();
}

function mobileScrollToBudgetList() {
  document.getElementById('budget-body')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function mobileTodayLabel() {
  const d = new Date();
  const days = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];
  const months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
}

function renderMobileCompanion({ rta, totalIncome, totalSpent, netto }) {
  const wrap = document.getElementById('mobile-companion');
  if (!wrap) return;
  wrap.innerHTML = '';
  wrap.style.display = 'none';
}

function renderCashflowBreakdown(currentKey, totalIncome, totalSpent, netto) {
  const wrap = document.getElementById('mt-flow-breakdown');
  if (!wrap) return;

  const incomeGrp = groups.find(g => g.name === 'Inkomen');
  const rows = (incomeGrp?.cats || [])
    .map(cat => {
      const amount = transactions
        .filter(tx =>
          tx.catId === cat.id &&
          tx.date?.startsWith(currentKey) &&
          tx.amount > 0 &&
          !tx.transferId &&
          isCashAccount(tx.accId)
        )
        .reduce((sum, tx) => sum + tx.amount, 0);
      return { name: cleanBudgetLabel(cat.name), amount };
    })
    .filter(row => row.amount > 0);

  // Bewaar inkomen-inklapstatus
  const incomeExpanded = !(wrap.dataset.incomeCollapsed === 'true');

  if (rows.length === 0) {
    wrap.innerHTML = `
      <div class="month-mini-line month-mini-total">
        <span>Inkomen</span>
        <strong class="${totalIncome > 0 ? 'pos' : ''}">${fmt(totalIncome)}</strong>
      </div>
      <div class="month-mini-line month-mini-section">
        <span>Uitgaven</span>
        <strong>${fmt(Math.abs(totalSpent))}</strong>
      </div>
      <div class="month-mini-line month-mini-total month-mini-section">
        <span>Netto</span>
        <strong class="${netto > 0 ? 'pos' : netto < 0 ? 'neg' : ''}">${fmt(netto)}</strong>
      </div>`;
    return;
  }

  const subRowsHtml = rows.map(row => `
    <div class="month-mini-line month-mini-subline mt-income-subrow" style="${incomeExpanded ? '' : 'display:none'}">
      <span>${escapeHtml(row.name)}</span>
      <strong>${fmt(row.amount)}</strong>
    </div>
  `).join('');

  wrap.innerHTML = `
    <div class="month-mini-line month-mini-total mt-income-toggle-row" onclick="toggleMTIncome(this)" style="cursor:pointer;" title="Inkomen in-/uitklappen">
      <span>Inkomen</span>
      <span class="mt-income-right">
        <strong class="${totalIncome > 0 ? 'pos' : ''}">${fmt(totalIncome)}</strong>
        <svg class="mt-income-chevron${incomeExpanded ? '' : ' mt-chevron-collapsed'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="10" height="10" style="margin-left:4px;vertical-align:middle;flex-shrink:0;transition:transform .18s;${incomeExpanded ? '' : 'transform:rotate(-90deg)'}"><polyline points="6 9 12 15 18 9"/></svg>
      </span>
    </div>
    ${subRowsHtml}
    <div class="month-mini-line month-mini-section">
      <span>Uitgaven</span>
      <strong>${fmt(Math.abs(totalSpent))}</strong>
    </div>
    <div class="month-mini-line month-mini-total month-mini-section">
      <span>Netto</span>
      <strong class="${netto > 0 ? 'pos' : netto < 0 ? 'neg' : ''}">${fmt(netto)}</strong>
    </div>`;
}

function toggleMTIncome(row) {
  const wrap = document.getElementById('mt-flow-breakdown');
  if (!wrap) return;
  const subRows = wrap.querySelectorAll('.mt-income-subrow');
  const chevron = wrap.querySelector('.mt-income-chevron');
  const isCollapsed = wrap.dataset.incomeCollapsed === 'true';
  if (isCollapsed) {
    subRows.forEach(r => r.style.display = '');
    if (chevron) chevron.style.transform = '';
    wrap.dataset.incomeCollapsed = 'false';
  } else {
    subRows.forEach(r => r.style.display = 'none');
    if (chevron) chevron.style.transform = 'rotate(-90deg)';
    wrap.dataset.incomeCollapsed = 'true';
  }
}

function cleanBudgetLabel(name) {
  return /^\p{Emoji}/u.test(name) ? name.replace(/^\S+\s*/, '') : name;
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, ch => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[ch]));
}


function catStatus(available, budgeted) {
  if (available < 0)                     return 'red';
  if (available === 0 && budgeted === 0) return 'grey';
  if (available === 0 && budgeted > 0)   return 'green';
  if (available < budgeted * 0.2)        return 'orange';
  return 'green';
}

function budgetRemainingTone(isOverspent, availPct) {
  if (isOverspent) return 'red';
  return availPct <= 25 ? 'amber' : 'green';
}

function budgetToneColor(tone) {
  if (tone === 'red') return 'var(--red)';
  if (tone === 'amber') return 'var(--amber)';
  return 'var(--green)';
}

function budgetToneTrackColor(tone) {
  if (tone === 'red') return 'rgba(240,79,106,.35)';
  if (tone === 'amber') return 'rgba(245,166,35,.35)';
  return 'rgba(29,201,154,.3)';
}

function calcGoalTarget(catId) {
  const goal = goals[catId];
  if (!goal) return 0;
  if (goal.type === 'manual') return 0;
  if (goal.type === 'targetByDate') {
    const monthsLeft = monthsUntil(goal.targetDate);
    return monthsLeft > 0 ? Math.round(goal.amount / monthsLeft) : goal.amount;
  }
  switch (goal.type) {
    case 'weekly': {
      const weeks = countWeeklyGoalDates(goal, currentYear, currentMonth);
      return Math.round(goal.amount * weeks);
    }
    case 'monthly':   return goal.amount;
    case 'quarterly': return Math.round(goal.amount / 3);
    case 'yearly':    return Math.round(goal.amount / 12);
    case 'target':    return goal.amount;
    case 'custom': {
      // Aanvullen tot bedrag — toon volledig bedrag, gespreid over herhaalfrequentie
      if (goal.repeat && goal.repeatN && goal.repeatUnit) {
        const monthsPerCycle = unitToMonths(goal.repeatUnit, goal.repeatN);
        if (monthsPerCycle > 0) return Math.round(goal.amount / monthsPerCycle);
      }
      // Eenmalig spaarbudget: verdeel over resterende maanden tot datum
      if (goal.targetDate) {
        const monthsLeft = monthsUntil(goal.targetDate);
        if (monthsLeft > 0) return Math.round(goal.amount / monthsLeft);
      }
      return goal.amount;
    }
    default: return goal.amount;
  }
}

function getFundingRule(catId) {
  const goal = goals[catId];
  if (!goal || goal.type === 'manual') return { type: 'manual', source: goal || null };
  if (!isGoalActiveForMonth(goal) || isIncomeCat(catId)) return { type: 'manual', source: goal };

  if (goal.type === 'targetByDate') {
    return {
      type: 'targetByDate',
      targetAmount: goal.amount || 0,
      targetDate: goal.targetDate || goal.date || null,
      source: goal
    };
  }

  if (goal.type === 'target' || (goal.type === 'custom' && goal.mode === 'save')) {
    return {
      type: 'targetByDate',
      targetAmount: goal.amount || 0,
      targetDate: goal.targetDate || goal.date || null,
      source: goal
    };
  }

  if (goal.type === 'yearly' && (goal.targetDate || goal.date)) {
    return {
      type: 'targetByDate',
      targetAmount: goal.amount || 0,
      targetDate: goal.targetDate || goal.date,
      source: goal
    };
  }

  return {
    type: 'monthly',
    monthlyAmount: calcGoalTarget(catId),
    source: goal
  };
}

function calcFundingRuleStatus(catId) {
  const rule = getFundingRule(catId);
  const budgeted = calcCatBudgeted(catId);
  const spent = calcCatSpent(catId);
  const spentAbs = Math.abs(spent);
  const available = calcCatAvailable(catId);
  let monthlyNeed = 0;
  let displayAmount = 0;
  let title = 'Handmatig';
  let headline = '';
  let subline = '';
  let actionLabel = 'Automatisch aanvullen instellen';
  let coverage = budgeted;
  let surplus = 0;
  let targetAmount = 0;
  let targetProgress = Math.max(0, available);
  let targetOver = 0;
  let targetReached = false;

  if (rule.type === 'monthly') {
    monthlyNeed = Math.max(0, rule.monthlyAmount || 0);
    displayAmount = monthlyNeed;
    coverage = Math.max(0, available) + spentAbs;
    title = 'Maandbedrag';
    headline = `${fmt(monthlyNeed)} per maand`;
    actionLabel = 'Maandbedrag aanpassen';
  } else if (rule.type === 'targetByDate') {
    const monthsLeft = monthsUntil(rule.targetDate);
    targetAmount = rule.targetAmount || 0;
    targetProgress = Math.max(0, available);
    targetReached = targetAmount > 0 && targetProgress >= targetAmount;
    targetOver = targetReached ? Math.max(0, targetProgress - targetAmount) : 0;
    monthlyNeed = targetReached ? 0 : (monthsLeft > 0 ? Math.round(targetAmount / monthsLeft) : targetAmount);
    displayAmount = targetAmount;
    title = 'Doelbedrag';
    headline = `${fmt(displayAmount)}${rule.targetDate ? ` vóór ${fmtDateNL(rule.targetDate)}` : ' beschikbaar houden'}`;
    subline = targetReached ? '' : `${fmt(monthlyNeed)} per maand nodig`;
    actionLabel = 'Doel aanpassen';
  }

  const fillNeed = rule.type === 'manual' ? 0 : Math.max(0, monthlyNeed - coverage);
  const shortage = Math.abs(Math.min(0, available));
  const isOverspent = available < 0;
  const isUsedUp = !isOverspent && rule.type !== 'manual' && budgeted > 0 && available === 0 && spentAbs > 0;
  const isFunded = !isOverspent && rule.type !== 'manual' && monthlyNeed > 0 && coverage >= monthlyNeed;
  if (isFunded && rule.type === 'monthly') {
    const remainingNeedAfterSpending = Math.max(0, monthlyNeed - spentAbs);
    surplus = Math.max(0, Math.max(0, available) - remainingNeedAfterSpending);
  }

  return {
    rule,
    budgeted,
    spent,
    spentAbs,
    available,
    monthlyNeed,
    displayAmount,
    coverage,
    surplus,
    targetAmount,
    targetProgress,
    targetOver,
    targetReached,
    fillNeed,
    shortage,
    title,
    headline,
    subline,
    actionLabel,
    isOverspent,
    isUsedUp,
    isFunded,
    isManual: rule.type === 'manual'
  };
}

function daysInMonth(y, m) {
  return new Date(y, m, 0).getDate();
}

function localIsoDate(y, m, d) {
  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

function parseLocalIsoDate(value) {
  const parts = String(value || '').split('-').map(Number);
  if (parts.length !== 3 || parts.some(n => !Number.isFinite(n))) return null;
  const [y, m, d] = parts;
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

function goalStartDateForMonth(goal, year, month) {
  const first = new Date(year, month - 1, 1);
  const startMonth = goal.startMonth || getBudgetStartMonth();
  const monthKeyValue = monthKey(year, month);
  const today = new Date();
  const todayKey = monthKey(today.getFullYear(), today.getMonth() + 1);
  let startDate = parseLocalIsoDate(goal.startDate);

  if (!startDate && startMonth === monthKeyValue && monthKeyValue === todayKey) {
    startDate = parseLocalIsoDate(vandaag());
  }
  if (!startDate && startMonth) {
    const [sy, sm] = startMonth.split('-').map(Number);
    if (sy && sm) startDate = new Date(sy, sm - 1, 1);
  }
  if (!startDate) startDate = first;

  if (monthKeyValue < startMonth) return null;
  return startDate > first ? startDate : first;
}

function countWeeklyGoalDates(goal, year, month) {
  const start = goalStartDateForMonth(goal, year, month);
  if (!start) return 0;
  const end = new Date(year, month, 0);
  const weekday = Number.isInteger(goal.weekday) ? goal.weekday : 6;

  const cursor = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const diff = (weekday - cursor.getDay() + 7) % 7;
  cursor.setDate(cursor.getDate() + diff);

  let count = 0;
  while (cursor <= end) {
    count++;
    cursor.setDate(cursor.getDate() + 7);
  }
  return count;
}

function unitToMonths(unit, n) {
  switch (unit) {
    case 'day':   return Math.max(1, Math.round(n / 30));
    case 'week':  return Math.max(1, Math.round(n / 4.33));
    case 'month': return Math.max(1, n);
    case 'year':  return Math.max(1, n * 12);
    default:      return n || 1;
  }
}

function monthsUntil(yyyymmdd) {
  if (!yyyymmdd) return 0;
  const t = new Date(yyyymmdd);
  if (isNaN(t)) return 0;
  const now = new Date(currentYear, currentMonth - 1, 1);
  return Math.max(1, (t.getFullYear() - now.getFullYear()) * 12 + (t.getMonth() - now.getMonth()) + 1);
}

function goalTypeLabel(type) {
  switch (type) {
    case 'weekly':    return 'Wekelijks bedrag';
    case 'monthly':   return 'Maandelijks bedrag';
    case 'quarterly': return 'Per kwartaal';
    case 'yearly':    return 'Per jaar';
    case 'target':    return 'Streefbedrag';
    case 'custom':    return 'Aangepast budget';
    default:          return 'Budget';
  }
}

// ── YNAB-stijl rij meta: statustekst, pill en voortgangsbalk ──────────────
function buildCatMeta({ cat, income, goal, goalTarget, budgeted, spent, available, isOverspent, fundingStatus = null }) {
  if (income) {
    return { statusHtml: '', pillHtml: '<div class="cat-available"></div>', barHtml: '' };
  }
  // CC betaling: geen chip, geen balk — alleen de beschikbare pill tonen
  if (isCCPaymentCat(cat.id)) {
    const isUnderfunded = available < 0;
    const pillHtml = buildAvailablePill({ available, budgeted, goal: null, goalReached: false, isUrgent: false, isOverspent: isUnderfunded });
    return { statusHtml: '', pillHtml, barHtml: '' };
  }

  const status     = fundingStatus || calcFundingRuleStatus(cat.id);
  const spentAbs   = Math.abs(spent);
  const need       = status.monthlyNeed || goalTarget;
  const goalReached= status.isFunded;
  const isUrgent   = !status.isManual && goal && !(goal.type === 'custom' && goal.mode === 'save' && !goal.repeat) &&
                     !(goal.type === 'target');
  const needLeft   = status.fillNeed;

  // Status-chip naast categorienaam
  let statusText = '';
  let statusKey  = 'idle';
  let statusTitle = '';
  let statusIconOnly = false;
  let statusLeadingIcon = false;
  if (available < 0) {
    // Negatief: overschreden — toon uitgegeven van budget (YNAB-stijl)
    statusKey  = 'over';
    statusText = `Tekort · ${fmt(Math.abs(available))}`;
    statusLeadingIcon = true;
  } else if (!status.isManual && need > 0) {
    if (status.rule.type === 'targetByDate' && status.targetReached) {
      statusKey = 'usedup-ok';
      statusText = 'Doel behaald';
      statusLeadingIcon = true;
    } else if (needLeft > 0) {
      statusKey = isUrgent ? 'need' : 'eventually';
      statusText = `Nodig · ${fmt(needLeft)}`;
      statusLeadingIcon = true;
    } else if (status.isUsedUp) {
      statusKey = status.rule.type === 'monthly' ? 'usedup-ok' : 'usedup';
      statusText = status.rule.type === 'monthly'
        ? `Uitgegeven · ${fmt(spentAbs)}`
        : 'Uitgegeven';
      statusLeadingIcon = status.rule.type === 'monthly';
    } else if (spentAbs > 0) {
      if (status.rule.type === 'monthly') {
        statusKey = 'usedup-ok';
        statusText = `Uitgegeven · ${fmt(spentAbs)}`;
        statusLeadingIcon = true;
      } else {
        statusKey = 'funded';
        statusTitle = 'Gedekt';
        statusIconOnly = true;
      }
    } else {
      statusKey = 'funded';
      statusTitle = 'Gedekt';
      statusIconOnly = true;
    }
  } else if (status.isManual) {
    // Geen budget ingesteld
    statusKey  = 'idle';
    statusText = '';
  } else if (budgeted > 0) {
    // Budget aanwezig: toon beschikbaar bedrag
    if (available === 0) {
      // Geen doel, wel helemaal gebruikt: aandacht nodig, maar geen fout.
      statusKey  = 'usedup';
      statusText = 'Uitgegeven';
    } else {
      statusKey  = 'idle';
      statusText = '';
    }
  }
  const checkIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.3 2.2 2.2 4.8-5"/></svg>';
  const alertIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><circle cx="12" cy="12" r="9"/><line x1="12" y1="7" x2="12" y2="13"/><circle cx="12" cy="16.5" r=".8" fill="currentColor" stroke="none"/></svg>';
  const infoIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><circle cx="12" cy="12" r="9"/><line x1="12" y1="10" x2="12" y2="15.5"/><circle cx="12" cy="7.5" r=".8" fill="currentColor" stroke="none"/></svg>';
  const leadingIcon = statusKey === 'over' ? alertIcon : statusKey === 'need' || statusKey === 'eventually' ? infoIcon : checkIcon;
  const statusHtml = statusIconOnly
    ? `<span class="cat-status-chip cat-status-chip-icon cat-status-chip-${statusKey}" title="${statusTitle}" aria-label="${statusTitle}">${checkIcon}</span>`
    : statusText
    ? `<span class="cat-status-chip cat-status-chip-${statusKey}">${statusLeadingIcon ? `<span class="cat-status-chip-mark">${leadingIcon}</span>` : ''}${escapeHtml(statusText)}</span>`
    : '';

  // Beschikbaar pill
  const pillHtml = buildAvailablePill({ available, budgeted, goal, goalReached, isUrgent, isOverspent, fillNeed: needLeft });

  const barHtml = buildCatBar({ budgeted, available, isOverspent, spent, goal, need, fundingStatus: status });

  return { statusHtml, pillHtml, barHtml };
}

function goalDeadlineShort(goal) {
  if (!goal) return '';
  switch (goal.type) {
    case 'weekly':  return 'deze week';
    case 'monthly': {
      const md = goal.monthDay;
      if (md === 'last' || md == null) {
        const last = daysInMonth(currentYear, currentMonth);
        return `vóór de ${last}e`;
      }
      return `vóór de ${md}e`;
    }
    case 'quarterly': return 'dit kwartaal';
    case 'yearly':    return goal.targetDate ? `vóór ${fmtDateNL(goal.targetDate)}` : 'dit jaar';
    case 'custom':    return goal.targetDate ? `vóór ${fmtDateNL(goal.targetDate)}` : '';
    default:          return '';
  }
}

function buildAvailablePill({ available, budgeted = 0, goal, goalReached, isUrgent, isOverspent, fillNeed = 0 }) {
  let tone, icon;
  const checkIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="8 12 11 15 16 9"/></svg>`;
  const infoIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="10.5" x2="12" y2="16"/><circle cx="12" cy="7.5" r=".8" fill="currentColor" stroke="none"/></svg>`;
  const alertIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="7" x2="12" y2="13"/><circle cx="12" cy="16.5" r=".8" fill="currentColor" stroke="none"/></svg>`;
  const clockIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 7 12 12 15.5 14"/></svg>`;
  if (isOverspent) {
    tone = 'over';
    icon = alertIcon;
  } else if (available > 0 && fillNeed > 0) {
    tone = 'need';
    icon = infoIcon;
  } else if (available > 0) {
    tone = 'funded';
    icon = checkIcon;
  } else if (available === 0 && goal && goalReached) {
    tone = 'spent';
    icon = checkIcon;
  } else if (goal && isUrgent) {
    tone = 'need';
    icon = infoIcon;
  } else {
    tone = 'idle';
    icon = clockIcon;
  }
  // Overspent: toon altijd als negatief bedrag (bijv. -€100,00)
  const displayVal = isOverspent ? fmt(available) : fmt(Math.abs(available));
  return `<div class="cat-available"><span class="cat-pill cat-pill-${tone}"><span class="cat-pill-icon">${icon}</span><span class="cat-pill-val">${displayVal}</span></span></div>`;
}

function buildGroupAvailablePill(available, isOverspent) {
  const cls = (isOverspent || available < 0) ? 'neg' : available === 0 ? 'muted' : '';
  return `<span class="grp-avail-val${cls ? ' ' + cls : ''}">${fmt(available)}</span>`;
}

function buildCatBar({ budgeted, available, isOverspent, spent, goal = null, need = 0, fundingStatus = null }) {
  const spentAbs = Math.abs(spent || 0);

  if (isOverspent) {
    if (budgeted > 0 && spentAbs > 0) {
      const fundedPct = Math.round(Math.min(budgeted / spentAbs, 1) * 100);
      const overPct   = Math.max(0, 100 - fundedPct);
      return `<div class="cat-bar cat-bar-over-split">
                <div class="cat-bar-split-green" style="width:${fundedPct}%"></div>
                <div class="cat-bar-split-red" style="width:${overPct}%"></div>
              </div>`;
    }
    return `<div class="cat-bar cat-bar-over"><div class="cat-bar-fill" style="width:100%"></div></div>`;
  }

  if (fundingStatus?.rule?.type === 'monthly' && need > 0) {
    const coverage = Math.max(0, fundingStatus.coverage || 0);
    const denominator = Math.max(need, coverage, 1);
    const fullyFunded = fundingStatus.isFunded;
    const fullySpent = fullyFunded && available === 0 && spentAbs > 0;
    const availablePct = Math.max(0, Math.min(100, Math.round(Math.max(available, 0) / denominator * 100)));
    const tone = fullySpent ? 'spent' : !fullyFunded ? 'need' : availablePct <= 25 && available > 0 ? 'low' : 'funded';
    if (coverage > 0) return buildCatBudgetSplitBar({ budgeted: coverage, available, spentAbs, denominator, tone });
    return `<div class="cat-bar cat-bar-${tone}"><div class="cat-bar-fill" style="width:0%"></div></div>`;
  }

  if (goal && need > 0) {
    const pct = Math.max(0, Math.min(100, Math.round(budgeted / need * 100)));
    const fullyFunded = budgeted >= need;
    const fullySpent = fullyFunded && available === 0 && spentAbs > 0;
    const tone = fullySpent ? 'spent' : fullyFunded ? 'funded' : 'need';
    if (budgeted > 0) return buildCatBudgetSplitBar({ budgeted, available, spentAbs, denominator: need, tone });
    return `<div class="cat-bar cat-bar-${tone}"><div class="cat-bar-fill" style="width:${pct}%"></div></div>`;
  }

  if (budgeted > 0) {
    const fullySpent = available === 0 && spentAbs > 0;
    const availPct = Math.max(0, Math.min(100, Math.round(Math.max(available, 0) / budgeted * 100)));
    const tone = fullySpent ? 'spent' : availPct <= 25 ? 'low' : 'funded';
    return buildCatBudgetSplitBar({ budgeted, available, spentAbs, denominator: budgeted, tone });
  }

  return `<div class="cat-bar cat-bar-idle"><div class="cat-bar-fill" style="width:0%"></div></div>`;
}

function buildCatBudgetSplitBar({ budgeted, available, spentAbs, denominator, tone }) {
  const base = Math.max(denominator || budgeted || 0, 1);
  const spentPct = Math.max(0, Math.min(100, Math.round(spentAbs / base * 100)));
  const availablePct = Math.max(0, Math.min(100 - spentPct, Math.round(Math.max(available, 0) / base * 100)));
  return `<div class="cat-bar cat-bar-${tone} cat-bar-budget-split" title="Uitgegeven ${fmt(spentAbs)} · Beschikbaar ${fmt(Math.max(available, 0))}">
            <div class="cat-bar-available-seg" style="width:${availablePct}%"></div>
            <div class="cat-bar-spent-seg" style="width:${spentPct}%"></div>
          </div>`;
}

// ── HELPERS ───────────────────────────────────────────────────────────────
function findCat(catId) {
  for (const grp of groups) {
    const cat = grp.cats.find(c => c.id === catId);
    if (cat) return cat;
  }
  return null;
}

function accTypeIcon(type) {
  const icons = {
    checking:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/><line x1="6" y1="15" x2="9" y2="15"/><line x1="11" y1="15" x2="14" y2="15"/></svg>`,
    savings:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="12" rx="9" ry="7"/><path d="M21 12c0 2-4 5-9 5s-9-3-9-5"/><path d="M15 9.5c0 .8-.5 1.5-1.5 2l1 2.5h-5l1-2.5C9.5 11 9 10.3 9 9.5a3 3 0 0 1 6 0z"/></svg>`,
    cash:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 12h.01M18 12h.01"/></svg>`,
    credit:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/><path d="M6 15h4"/></svg>`,
    line_credit:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 10h10M7 14h6"/></svg>`,
    investment: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
    asset:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 12l9 5 9-5"/><path d="M3 16l9 5 9-5"/></svg>`,
    property:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><rect x="9" y="13" width="6" height="8"/></svg>`,
    mortgage:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><path d="M9 21v-8h6v8"/><line x1="8" y1="12" x2="16" y2="6"/></svg>`,
    car:        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 17H3v-5l2-5h14l2 5v5h-2"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="17.5" r="2.5"/><path d="M5 12h14"/></svg>`,
    auto_loan:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 17H3v-5l2-5h14l2 5v5h-2"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="17.5" r="2.5"/><path d="M12 3v18"/></svg>`,
    loan:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    student_loan: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/></svg>`,
    personal_loan: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><path d="M4 22a8 8 0 0 1 16 0"/></svg>`,
    medical_debt: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v18M3 12h18"/><rect x="5" y="5" width="14" height="14" rx="2"/></svg>`,
    other_debt: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 3h10l4 4v14H7z"/><path d="M17 3v5h5"/><path d="M10 13h8M10 17h5"/></svg>`,
    liability:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>`,
  };
  return icons[type] ?? icons.checking;
}

function accTypeLabel(type) {
  return accountTypeLabel(type);
}

// ── BUDGET INPUT ──────────────────────────────────────────────────────────
function setBudget(catId, rawVal) {
  pushUndo();
  const cents = parseBedrag(rawVal);
  const bm    = getBudgetMonth(currentYear, currentMonth);
  bm[catId]   = cents / 100;
  budgets[monthKey(currentYear, currentMonth)] = bm;
  S.set('budgets', budgets);
  refreshBudgetSurfaces();
}

function getGoalFillNeed(catId) {
  if (isIncomeCat(catId)) return 0;
  const status = calcFundingRuleStatus(catId);
  if (status.isManual || status.isOverspent) return 0;
  return status.fillNeed;
}

function getGoalFillPriority(catId) {
  const status = calcFundingRuleStatus(catId);
  if (status.isManual) return 99;
  if (status.rule.type === 'monthly') return 1;
  if (status.rule.type === 'targetByDate') return 2;
  return 99;
}

function getGoalFillCandidates(groupId = null) {
  const candidates = [];
  groups.forEach(group => {
    if (group.name === 'Inkomen') return;
    if (groupId && group.id !== groupId) return;
    group.cats.forEach((cat, catIndex) => {
      const needed = getGoalFillNeed(cat.id);
      if (needed <= 0) return;
      candidates.push({
        catId: cat.id,
        groupId: group.id,
        needed,
        priority: getGoalFillPriority(cat.id),
        order: candidates.length + catIndex / 1000
      });
    });
  });
  return candidates.sort((a, b) => a.priority - b.priority || a.order - b.order);
}

function getGroupGoalFillNeed(groupId) {
  const ruleNeed = getGoalFillCandidates(groupId)
    .reduce((sum, item) => sum + item.needed, 0);
  const shortageNeed = groups
    .filter(group => group.id === groupId)
    .flatMap(group => group.cats)
    .reduce((sum, cat) => sum + Math.abs(Math.min(0, calcCatAvailable(cat.id))), 0);
  return ruleNeed + shortageNeed;
}

function fillAllGoals(groupId = null) {
  let rta = calcReadyToAssign();
  if (rta <= 0) {
    alertModal('Er is niets klaar om toe te wijzen om potjes mee te vullen.');
    return;
  }

  const bm = getBudgetMonth(currentYear, currentMonth);
  const fills = [];
  let totalNeeded = 0;
  const group = groupId ? groups.find(g => g.id === groupId) : null;
  const scopeLabel = group ? `"${group.name.replace(/^\S+\s*/, '')}"` : 'alle potjes';

  groups.forEach(group => {
    if (group.name === 'Inkomen') return;
    if (groupId && group.id !== groupId) return;
    group.cats.forEach(cat => {
      if (rta <= 0 || isIncomeCat(cat.id)) return;
      const shortage = Math.abs(Math.min(0, calcCatAvailable(cat.id)));
      if (shortage <= 0) return;
      totalNeeded += shortage;
      const add = Math.min(shortage, rta);
      if (add <= 0) return;
      fills.push({ catId: cat.id, add });
      rta -= add;
    });
  });

  getGoalFillCandidates(groupId)
    .forEach(item => {
      totalNeeded += item.needed;
      if (rta <= 0) return;
      const add = Math.min(item.needed, rta);
      if (add <= 0) return;
      fills.push({ catId: item.catId, add });
      rta -= add;
    });

  if (!fills.length) {
    toast(group ? `Geen potjes om aan te vullen in ${scopeLabel}.` : 'Er zijn geen potjes om aan te vullen.');
    return;
  }

  pushUndo();
  fills.forEach(({ catId, add }) => {
    const current = Math.round((bm[catId] || 0) * 100);
    bm[catId] = (current + add) / 100;
  });
  budgets[monthKey(currentYear, currentMonth)] = bm;
  S.set('budgets', budgets);
  refreshBudgetSurfaces();

  const totalAdded = fills.reduce((sum, item) => sum + item.add, 0);
  const shortage = Math.max(0, totalNeeded - totalAdded);
  if (shortage > 0) {
    alertModal(`${fmt(totalAdded)} verdeeld. Nog ${fmt(shortage)} tekort om ${scopeLabel} volledig te vullen.`);
  } else {
    toast(group ? `${scopeLabel} gevuld met ${fmt(totalAdded)}.` : `Alle potjes gevuld met ${fmt(totalAdded)}.`);
  }
}

// ── Klaar om toe te wijzen ────────────────────────────────────────────────
let _assignTab = 'smart';

function closeAssignMenu() {
  document.getElementById('assign-popover')?.remove();
}

function toggleAssignMenu(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  const existing = document.getElementById('assign-popover');
  if (existing) {
    closeAssignMenu();
    return;
  }
  openAssignMenu();
}

function openAssignMenu() {
  closeAssignMenu();
  const anchor = document.querySelector('.ahead-assign-btn') || document.querySelector('.month-stat-rta');
  if (!anchor) return;

  const pop = document.createElement('div');
  pop.id = 'assign-popover';
  pop.className = 'assign-popover';
  pop.innerHTML = `
    <div class="assign-head">
      <div>
        <span class="assign-kicker">Budget verdelen</span>
        <span class="assign-available">Beschikbaar: <strong>${fmt(calcReadyToAssign())}</strong></span>
      </div>
      <button type="button" class="assign-close" onclick="closeAssignMenu()">×</button>
    </div>
    <div class="assign-tabs">
      <button class="assign-tab ${_assignTab === 'smart' ? 'active' : ''}" type="button" onclick="setAssignTab('smart')">Slim verdelen</button>
      <button class="assign-tab ${_assignTab === 'manual' ? 'active' : ''}" type="button" onclick="setAssignTab('manual')">Handmatig</button>
    </div>
    <div class="assign-pane" data-assign-pane="smart"></div>
    <div class="assign-pane" data-assign-pane="manual"></div>`;
  document.body.appendChild(pop);

  const rect = anchor.getBoundingClientRect();
  const left = Math.min(window.innerWidth - pop.offsetWidth - 12, Math.max(12, rect.left + 8));
  pop.style.left = `${left}px`;
  pop.style.top = `${rect.bottom + 8}px`;

  renderAssignMenu();
  setTimeout(() => {
    function outsideClick(ev) {
      if (pop.contains(ev.target) || ev.target.closest('.month-stat-rta, .ahead-assign-btn')) return;
      closeAssignMenu();
      document.removeEventListener('click', outsideClick);
    }
    document.addEventListener('click', outsideClick);
  }, 0);
}

function setAssignTab(tab) {
  _assignTab = tab;
  renderAssignMenu();
}

function getAssignableCategories() {
  return groups.flatMap(group =>
    group.cats
      .filter(cat => !isIncomeCat(cat.id) && !(typeof isProtectedBudgetCat === 'function' && isProtectedBudgetCat(cat.id)))
      .map(cat => ({ group, cat }))
  );
}

function calcUnderfundedTotal() {
  return getSmartFillCandidates().reduce((sum, item) => sum + item.need, 0);
}

function getSmartFillNeed(catId) {
  const available = calcCatAvailable(catId);
  if (available < 0) return Math.abs(available);
  return getGoalFillNeed(catId);
}

function getSmartFillCandidates() {
  return getAssignableCategories()
    .map(({ cat }, idx) => ({
      catId: cat.id,
      need: getSmartFillNeed(cat.id),
      priority: calcCatAvailable(cat.id) < 0 ? 0 : getGoalFillPriority(cat.id),
      order: idx,
    }))
    .filter(item => item.need > 0)
    .sort((a, b) => a.priority - b.priority || a.order - b.order);
}

function getPreviousMonthRepeatCandidates() {
  const [py, pm] = prevYM(currentYear, currentMonth);
  return getAssignableCategories()
    .map(({ cat }, idx) => {
      const previous = calcCatBudgetedForMonth(cat.id, py, pm);
      const current = calcCatBudgeted(cat.id);
      return { catId: cat.id, need: Math.max(0, previous - current), order: idx };
    })
    .filter(item => item.need > 0);
}

function calcPreviousMonthRepeatTotal() {
  return getPreviousMonthRepeatCandidates().reduce((sum, item) => sum + item.need, 0);
}

function getAverageMonthCandidates() {
  return getAssignableCategories()
    .map(({ cat }, idx) => {
      const target = Math.max(calcCatAvgAssigned(cat.id), calcCatAvgSpent(cat.id));
      const current = calcCatBudgeted(cat.id);
      return { catId: cat.id, need: Math.max(0, target - current), order: idx };
    })
    .filter(item => item.need > 0);
}

function calcAverageMonthTotal() {
  return getAverageMonthCandidates().reduce((sum, item) => sum + item.need, 0);
}

function distributeAvailableToCandidates(candidates, successLabel) {
  let rta = calcReadyToAssign();
  if (rta <= 0) { toast('Er is niets beschikbaar om te verdelen.'); return; }
  if (!candidates.length) { toast('Geen potjes gevonden om aan te vullen.'); return; }

  pushUndo();
  const bm = getBudgetMonth(currentYear, currentMonth);
  let total = 0;
  candidates.forEach(item => {
    if (rta <= 0) return;
    const add = Math.min(item.need, rta);
    if (add <= 0) return;
    const current = Math.round((bm[item.catId] || 0) * 100);
    bm[item.catId] = (current + add) / 100;
    rta -= add;
    total += add;
  });
  budgets[monthKey(currentYear, currentMonth)] = bm;
  S.set('budgets', budgets);
  refreshBudgetSurfaces();
  toast(`${fmt(total)} ${successLabel}`);
}

function calcAllShortfalls() {
  // Alle categorieën met een negatieve balans, inclusief CC
  return groups.flatMap(g => g.cats).reduce((list, cat) => {
    if (isIncomeCat(cat.id)) return list;
    const avail = calcCatAvailable(cat.id);
    if (avail < 0) list.push({ cat, avail });
    return list;
  }, []);
}

function getOverspentCategories() {
  return calcAllShortfalls()
    .map(({ cat, avail }) => ({ cat, shortage: Math.abs(avail), group: groups.find(g => g.cats.some(c => c.id === cat.id)) }))
    .sort((a, b) => b.shortage - a.shortage);
}

function getTotalShortage() {
  return getOverspentCategories().reduce((sum, item) => sum + item.shortage, 0);
}

function _fundingName(value) {
  return String(value || '').replace(/^\S+\s*/, '').trim().toLowerCase();
}

function _isSafeFundingCat(cat, group) {
  const catName = _fundingName(cat.name);
  const groupName = _fundingName(group?.name);
  return groupName === 'vrije ruimte'
    || catName === 'vrij te besteden'
    || catName === 'buffer'
    || catName === 'nog toe te wijzen';
}

function getSafeFundingSources() {
  const sources = [];
  const rta = calcReadyToAssign();
  if (rta > 0) sources.push({ type: 'rta', id: MOVE_SOURCE_RTA, available: rta, priority: 0 });

  groups.forEach(group => {
    group.cats.forEach(cat => {
      if (isIncomeCat(cat.id)) return;
      if (typeof isProtectedBudgetCat === 'function' && isProtectedBudgetCat(cat.id)) return;
      if (!_isSafeFundingCat(cat, group)) return;
      const available = calcCatAvailable(cat.id);
      if (available > 0) {
        const name = _fundingName(cat.name);
        const priority = name === 'vrij te besteden' ? 2 : name === 'buffer' ? 3 : 1;
        sources.push({ type: 'cat', id: cat.id, cat, group, available, priority });
      }
    });
  });

  return sources.sort((a, b) => a.priority - b.priority || b.available - a.available);
}

function canAutoCoverShortages() {
  const total = getTotalShortage();
  const available = getSafeFundingSources().reduce((sum, source) => sum + source.available, 0);
  return total > 0 && available >= total;
}

function autoCoverShortages() {
  const shortfalls = getOverspentCategories();
  if (!shortfalls.length || !canAutoCoverShortages()) return false;

  pushUndo();
  const bm = getBudgetMonth(currentYear, currentMonth);
  const key = monthKey(currentYear, currentMonth);
  const sources = getSafeFundingSources().map(source => ({ ...source }));

  shortfalls.forEach(({ cat, shortage }) => {
    let remaining = shortage;
    sources.forEach(source => {
      if (remaining <= 0 || source.available <= 0) return;
      const move = Math.min(remaining, source.available);
      if (source.type === 'cat') {
        bm[source.id] = (Math.round((bm[source.id] || 0) * 100) - move) / 100;
      }
      bm[cat.id] = (Math.round((bm[cat.id] || 0) * 100) + move) / 100;
      source.available -= move;
      remaining -= move;
    });
  });

  budgets[key] = bm;
  S.set('budgets', budgets);
  refreshBudgetSurfaces();
  toast('Tekorten gedekt.');
  return true;
}

function openShortageMoveModal(targetCategoryId = null) {
  const target = targetCategoryId
    ? getOverspentCategories().find(item => item.cat.id === targetCategoryId)
    : getOverspentCategories()[0];
  if (!target || typeof openMoveModal !== 'function') return;

  closeAssignMenu();
  openMoveModal(null, 'cat', {
    purpose: 'shortage',
    amount: target.shortage,
    catName: target.cat.name.replace(/^\S+\s*/, '')
  });
  setTimeout(() => {
    const toSel = document.getElementById('move-to');
    const amountEl = document.getElementById('move-amount');
    const fromSel = document.getElementById('move-from');
    if (toSel) toSel.value = target.cat.id;
    if (amountEl) amountEl.value = fmtInput(target.shortage);
    if (fromSel) fromSel.value = suggestMoveSourceForAmount(target.shortage, target.cat.id) || '';
    if (typeof renderMoveFundingOptions === 'function') renderMoveFundingOptions();
  }, 0);
}

function getManualFundingSources(targetCategoryId) {
  return groups.flatMap(group =>
    group.cats
      .filter(cat => cat.id !== targetCategoryId && !isIncomeCat(cat.id))
      .map(cat => ({ group, cat, available: calcCatAvailable(cat.id) }))
      .filter(item => item.available > 0)
  );
}

function coverShortageManually(targetCategoryId, allocations) {
  if (!targetCategoryId || !Array.isArray(allocations) || !allocations.length) return false;
  pushUndo();
  const bm = getBudgetMonth(currentYear, currentMonth);
  const key = monthKey(currentYear, currentMonth);
  let total = 0;
  allocations.forEach(({ fromCatId, cents }) => {
    const move = Math.max(0, Math.round(cents || 0));
    if (!fromCatId || move <= 0) return;
    bm[fromCatId] = (Math.round((bm[fromCatId] || 0) * 100) - move) / 100;
    total += move;
  });
  bm[targetCategoryId] = (Math.round((bm[targetCategoryId] || 0) * 100) + total) / 100;
  budgets[key] = bm;
  S.set('budgets', budgets);
  refreshBudgetSurfaces();
  return true;
}

function assignCoverOne(catId) {
  openShortageMoveModal(catId);
}

function assignCoverAll() {
  if (!autoCoverShortages()) openShortageMoveModal();
}

function refreshBudgetSurfaces() {
  renderBudget();
  renderTransactions();
  if (document.getElementById('assign-popover')) renderAssignMenu();
  if (_cdpCatId) refreshCatDetail();
}

function calcOverfundedTotal() {
  return getAssignableCategories().reduce((sum, { cat }) => {
    const goal = goals[cat.id];
    if (!goal || !isGoalActiveForMonth(goal)) return sum;
    return sum + Math.max(0, calcCatBudgeted(cat.id) - calcGoalTarget(cat.id));
  }, 0);
}

function renderAssignMenu() {
  const pop = document.getElementById('assign-popover');
  if (!pop) return;
  const availableEl = pop.querySelector('.assign-available strong');
  if (availableEl) availableEl.textContent = fmt(calcReadyToAssign());
  pop.querySelectorAll('.assign-tab').forEach(btn => {
    const pane = btn.getAttribute('onclick')?.match(/'(\w+)'/)?.[1];
    btn.classList.toggle('active', pane === _assignTab);
  });
  pop.querySelectorAll('.assign-pane').forEach(pane => {
    pane.classList.toggle('active', pane.dataset.assignPane === _assignTab);
  });

  const smartPane = pop.querySelector('[data-assign-pane="smart"]');
  const manualPane = pop.querySelector('[data-assign-pane="manual"]');
  const rta = calcReadyToAssign();
  const underfunded = calcUnderfundedTotal();
  const overfunded = calcOverfundedTotal();
  const previousTotal = calcPreviousMonthRepeatTotal();
  const averageTotal = calcAverageMonthTotal();

  function smartCard({ title, text, amount, action, button, disabled = false, tone = '' }) {
    return `
      <div class="assign-smart-card ${tone ? `assign-smart-card--${tone}` : ''}">
        <div class="assign-smart-copy">
          <strong>${title}</strong>
          <span>${text}</span>
        </div>
        <div class="assign-smart-side">
          <span>${fmt(amount)}</span>
          <button type="button" onclick="${action}" ${disabled ? 'disabled' : ''}>${button}</button>
        </div>
      </div>`;
  }

  if (smartPane) {
    const underfundedButton = underfunded > rta && rta > 0 ? `Verdeel ${fmt(rta)}` : 'Verdelen';
    const underfundedText = underfunded > rta && rta > 0
      ? `Er is ${fmt(underfunded)} nodig. Je hebt ${fmt(rta)} beschikbaar.`
      : 'Vul potjes aan die nog geld nodig hebben.';
    smartPane.innerHTML = `
      <div class="assign-smart-list">
        ${smartCard({
          title: 'Tekorten aanvullen',
          text: underfundedText,
          amount: underfunded,
          action: 'assignUnderfunded()',
          button: underfundedButton,
          disabled: rta <= 0 || underfunded <= 0,
          tone: underfunded > rta && rta > 0 ? 'warning' : ''
        })}
        ${smartCard({
          title: 'Vorige maand herhalen',
          text: 'Gebruik dezelfde verdeling als vorige maand.',
          amount: previousTotal,
          action: 'assignRepeatPreviousMonth()',
          button: previousTotal > rta && rta > 0 ? `Verdeel ${fmt(rta)}` : 'Toepassen',
          disabled: rta <= 0 || previousTotal <= 0
        })}
        ${smartCard({
          title: 'Gemiddelde maand gebruiken',
          text: 'Verdeel op basis van je normale maand.',
          amount: averageTotal,
          action: 'assignAverageMonth()',
          button: averageTotal > rta && rta > 0 ? `Verdeel ${fmt(rta)}` : 'Toepassen',
          disabled: rta <= 0 || averageTotal <= 0
        })}
        ${smartCard({
          title: 'Te veel budget terughalen',
          text: 'Haal geld terug uit potjes die boven hun doel zitten.',
          amount: overfunded,
          action: 'assignReduceOverfunding()',
          button: 'Terughalen',
          disabled: overfunded <= 0
        })}
      </div>`;
  }

  if (manualPane) {
    const cats = getAssignableCategories();
    manualPane.innerHTML = `
      <div class="assign-manual">
        <div class="assign-manual-note">
          <strong>Handmatig toewijzen</strong>
          <span>Typ een bedrag bij het potje dat je wilt aanpassen.</span>
        </div>
        <div class="assign-field">
          <label>Bedrag</label>
          <input id="assign-manual-amount" type="text" inputmode="decimal" value="${rta > 0 ? fmtInput(rta) : ''}" placeholder="0,00">
        </div>
        <div class="assign-field">
          <label>Naar</label>
          <select id="assign-manual-cat">
            <option value="">Kies potje</option>
            ${cats.map(({ group, cat }) => `<option value="${escapeHtml(cat.id)}">${escapeHtml(group.name)} / ${escapeHtml(cat.name)}</option>`).join('')}
          </select>
        </div>
        <div class="assign-footer">
          <button class="assign-cancel" type="button" onclick="closeAssignMenu()">Annuleren</button>
          <button class="assign-submit" type="button" onclick="assignManual()">Toewijzen</button>
        </div>
      </div>`;
  }
}

function assignManual() {
  const cents = parseBedrag(document.getElementById('assign-manual-amount')?.value || '');
  const catId = document.getElementById('assign-manual-cat')?.value || '';
  const rta = calcReadyToAssign();
  if (!catId) { toast('Kies een potje.'); return; }
  if (cents <= 0) { toast('Vul een bedrag in.'); return; }
  if (cents > rta) { toast('Niet genoeg klaar om toe te wijzen.'); return; }

  pushUndo();
  const bm = getBudgetMonth(currentYear, currentMonth);
  const current = Math.round((bm[catId] || 0) * 100);
  bm[catId] = (current + cents) / 100;
  budgets[monthKey(currentYear, currentMonth)] = bm;
  S.set('budgets', budgets);
  closeAssignMenu();
  refreshBudgetSurfaces();
  toast(`${fmt(cents)} gebudgetteerd.`);
}

function assignUnderfunded() {
  distributeAvailableToCandidates(getSmartFillCandidates(), 'verdeeld over potjes die geld nodig hebben.');
}

function assignRepeatPreviousMonth() {
  distributeAvailableToCandidates(getPreviousMonthRepeatCandidates(), 'verdeeld volgens vorige maand.');
}

function assignAverageMonth() {
  distributeAvailableToCandidates(getAverageMonthCandidates(), 'verdeeld op basis van je gemiddelde maand.');
}

function assignReduceOverfunding() {
  const items = getAssignableCategories()
    .map(({ cat }) => {
      const goal = goals[cat.id];
      if (!goal || !isGoalActiveForMonth(goal)) return null;
      const over = Math.max(0, calcCatBudgeted(cat.id) - calcGoalTarget(cat.id));
      return over > 0 ? { catId: cat.id, over } : null;
    })
    .filter(Boolean);
  if (!items.length) { toast('Geen overfinanciering gevonden.'); return; }

  pushUndo();
  const bm = getBudgetMonth(currentYear, currentMonth);
  let total = 0;
  items.forEach(({ catId, over }) => {
    const current = Math.round((bm[catId] || 0) * 100);
    bm[catId] = Math.max(0, current - over) / 100;
    total += over;
  });
  budgets[monthKey(currentYear, currentMonth)] = bm;
  S.set('budgets', budgets);
  refreshBudgetSurfaces();
  toast(`${fmt(total)} teruggezet naar klaar om toe te wijzen.`);
}



// ── NAVIGATIE ─────────────────────────────────────────────────────────────
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nb').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.mob-bottom-nav a').forEach(b => b.classList.remove('active'));
  const page = document.getElementById('page-' + name);
  const nav  = document.getElementById('nav-' + name);
  const mobNav = document.getElementById('mob-nav-' + name);
  if (page) page.classList.add('active');
  if (nav)  nav.classList.add('active');
  if (mobNav) mobNav.classList.add('active');
  const titleEl = document.getElementById('app-page-title');
  if (titleEl) {
    titleEl.textContent = {
      budget: 'Budget',
      transactions: 'Transacties',
      accounts: 'Rekeningen',
      insights: 'Inzichten'
    }[name] || 'Budget';
  }
  const monthVisible = name === 'budget' || name === 'insights';
  const budgetTopbarVisible = name === 'budget';
  document.querySelector('.app-topbar')?.classList.toggle('is-hidden-page', !monthVisible && !budgetTopbarVisible);
  document.getElementById('ahead-panel')?.classList.toggle('is-hidden-page', !budgetTopbarVisible);
  document.querySelector('.app-topbar-main')?.classList.toggle('topbar-month-hidden', !monthVisible);
  if (monthVisible) {
    const monthTitle = document.getElementById('month-title');
    if (monthTitle) monthTitle.textContent = maandNaam(currentYear, currentMonth);
  }
  if (name === 'transactions') renderTransactions();
  if (name === 'accounts') renderAccounts();
  if (name === 'insights') renderInsights();
  const mobileCompanion = document.getElementById('mobile-companion');
  if (mobileCompanion) {
    mobileCompanion.style.display = name === 'budget' ? '' : 'none';
    if (name === 'budget') renderBudget();
  }
}

// Navigeer naar alle transacties (geen accountfilter)
function navToAllTransactions() {
  const sel = document.getElementById('txn-facc');
  if (sel) sel.value = '';
  showPage('transactions');
  renderSidebar();
}

// Navigeer naar transacties van één rekening
function navToAccount(accId) {
  const sel = document.getElementById('txn-facc');
  if (sel) sel.value = accId || '';
  showPage('transactions');
  const txnNav = document.getElementById('nav-transactions');
  if (txnNav) txnNav.classList.remove('active');
  renderSidebar();
}

// ── DRAG & DROP (pointer events — werkt in Tauri/WebKit) ──────────────────
let _dragCatId  = null;
let _dragGrpId  = null;
let _dragIsGrp  = false;
let _dragClone  = null;
let _dragActive = false;
let _dragOrigin = null; // { x, y } bij mousedown
let _dragCloneStart = null;
let _dragPointerId = null;
let _dragSuppressClick = false;
const DRAG_THRESHOLD = 6; // px bewegen voordat drag start

function _cleanDrag() {
  _dragCatId = null; _dragGrpId = null; _dragIsGrp = false; _dragActive = false; _dragOrigin = null;
  _dragCloneStart = null; _dragPointerId = null;
  if (_dragClone) { _dragClone.remove(); _dragClone = null; }
  document.querySelectorAll('.dragging,.drag-over,.drag-over-group').forEach(el =>
    el.classList.remove('dragging','drag-over','drag-over-group'));
  document.body.classList.remove('drag-select-lock');
  document.body.style.userSelect = '';
  document.body.style.cursor = '';
}

function _getTarget(x, y) {
  // Gebruik elementFromPoint om de target onder de cursor te vinden (clone is pointer-events:none)
  const el = document.elementFromPoint(x, y);
  return {
    row: el?.closest('.cat-row'),
    hdr: el?.closest('.group-header')
  };
}

function initDragDrop() {
  const fresh = document.getElementById('budget-body');
  if (!fresh || fresh.dataset.dragReady === '1') return;
  fresh.dataset.dragReady = '1';

  // ── pointerdown: registreer kandidaat ──
  fresh.addEventListener('pointerdown', e => {
    if (e.button !== 0 || e.isPrimary === false) return;
    if (e.target.closest('button, input, select, textarea')) return;
    const row = e.target.closest('.cat-row');
    const hdr = e.target.closest('.group-header');
    if (!row && !hdr) return;
    _dragOrigin = { x: e.clientX, y: e.clientY };
    _dragPointerId = e.pointerId;
    document.body.classList.add('drag-select-lock');
    if (row) { _dragCatId = row.dataset.catId; _dragGrpId = row.dataset.grpId; _dragIsGrp = false; }
    else     { _dragGrpId = hdr.dataset.grpId; _dragIsGrp = true; }
    try { fresh.setPointerCapture(e.pointerId); } catch (err) {}
  });

  // Voorkom dat de normale klikactie na een sleepactie alsnog opent/inklapt.
  fresh.addEventListener('click', e => {
    if (!_dragSuppressClick) return;
    e.preventDefault();
    e.stopImmediatePropagation();
  }, true);

  // ── pointermove: start of update drag ──
  document.addEventListener('pointermove', e => {
    if (!_dragOrigin) return;
    if (_dragPointerId !== null && e.pointerId !== _dragPointerId) return;
    if (e.pointerType === 'mouse' && (e.buttons & 1) !== 1) {
      _cleanDrag();
      return;
    }
    const dx = e.clientX - _dragOrigin.x;
    const dy = e.clientY - _dragOrigin.y;

    if (!_dragActive) {
      if (Math.sqrt(dx*dx + dy*dy) < DRAG_THRESHOLD) return;
      // Start drag
      _dragActive = true;
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'grabbing';

      const sourceEl = _dragIsGrp
        ? fresh.querySelector(`.group-header[data-grp-id="${_dragGrpId}"]`)
        : fresh.querySelector(`.cat-row[data-cat-id="${_dragCatId}"]`);
      if (sourceEl) {
        sourceEl.classList.add('dragging');
        _dragClone = sourceEl.cloneNode(true);
        const r = sourceEl.getBoundingClientRect();
        _dragCloneStart = { top: r.top, left: r.left };
        Object.assign(_dragClone.style, {
          position: 'fixed', top: r.top + 'px', left: r.left + 'px',
          width: r.width + 'px', opacity: '0.85', pointerEvents: 'none',
          zIndex: 9999, borderRadius: '6px', boxShadow: '0 4px 20px rgba(0,0,0,.4)',
          background: 'var(--surface3)', transition: 'none'
        });
        document.body.appendChild(_dragClone);
      }
    }

    // Sleep de clone mee
    e.preventDefault();
    if (_dragClone && _dragCloneStart) {
      _dragClone.style.top  = (_dragCloneStart.top + dy) + 'px';
      _dragClone.style.left = (_dragCloneStart.left + dx) + 'px';
    }

    // Highlight drop target
    document.querySelectorAll('.drag-over,.drag-over-group').forEach(el =>
      el.classList.remove('drag-over','drag-over-group'));
    const { row, hdr } = _getTarget(e.clientX, e.clientY);
    if (!_dragIsGrp && row && row.dataset.catId !== _dragCatId) row.classList.add('drag-over');
    if (hdr) hdr.classList.add('drag-over-group');
  });

  // ── pointerup: drop ──
  document.addEventListener('pointerup', e => {
    if (!_dragOrigin) return;
    if (_dragPointerId !== null && e.pointerId !== _dragPointerId) return;
    if (_dragActive) {
      e.preventDefault();
      const { row, hdr } = _getTarget(e.clientX, e.clientY);
      if (_dragIsGrp) {
        if (hdr && hdr.dataset.grpId !== _dragGrpId) {
          const fromIdx = groups.findIndex(g => g.id === _dragGrpId);
          const toIdx   = groups.findIndex(g => g.id === hdr.dataset.grpId);
          if (fromIdx >= 0 && toIdx >= 0) {
            pushUndo();
            const [moved] = groups.splice(fromIdx, 1);
            groups.splice(toIdx, 0, moved);
            S.set('groups', groups);
            refreshBudgetSurfaces();
          }
        }
      } else if (_dragCatId) {
        if (row && row.dataset.catId !== _dragCatId) {
          moveCat(_dragCatId, _dragGrpId, row.dataset.grpId, row.dataset.catId);
        } else if (hdr) {
          moveCat(_dragCatId, _dragGrpId, hdr.dataset.grpId, null);
        }
      }
      _dragSuppressClick = true;
      setTimeout(() => { _dragSuppressClick = false; }, 0);
    } else if (_dragCatId) {
      const { row } = _getTarget(e.clientX, e.clientY);
      if (row && row.dataset.catId === _dragCatId) {
        openCatDetail(_dragCatId, _dragGrpId);
        _dragSuppressClick = true;
        setTimeout(() => { _dragSuppressClick = false; }, 0);
      }
    }
    try { fresh.releasePointerCapture(e.pointerId); } catch (err) {}
    _cleanDrag();
  });

  document.addEventListener('pointercancel', e => {
    if (_dragPointerId !== null && e.pointerId !== _dragPointerId) return;
    _cleanDrag();
  });

  // ── contextmenu ──
  fresh.addEventListener('contextmenu', e => {
    const hdr = e.target.closest('.group-header');
    if (hdr) { showGrpCtxMenu(e, hdr.dataset.grpId); return; }
    const row = e.target.closest('.cat-row');
    if (row) showCtxMenu(e, row.dataset.catId, row.dataset.grpId);
  });
}

function moveCat(catId, fromGrpId, toGrpId, beforeCatId) {
  pushUndo();
  const fromGrp = groups.find(g => g.id === fromGrpId);
  const toGrp   = groups.find(g => g.id === toGrpId);
  if (!fromGrp || !toGrp) return;

  const cat = fromGrp.cats.find(c => c.id === catId);
  if (!cat) return;

  fromGrp.cats = fromGrp.cats.filter(c => c.id !== catId);

  if (beforeCatId) {
    const idx = toGrp.cats.findIndex(c => c.id === beforeCatId);
    toGrp.cats.splice(idx, 0, cat);
  } else {
    toGrp.cats.push(cat);
  }

  S.set('groups', groups);
  refreshBudgetSurfaces();
}

// ── ALLES SELECTEREN CHECKBOX ─────────────────────────────────────────────
function toggleAllTxnCb(masterCb) {
  document.querySelectorAll('.txn-cb').forEach(cb => {
    cb.checked = masterCb.checked;
    const id = cb.dataset.id;
    if (masterCb.checked) _txnSelected.add(id);
    else _txnSelected.delete(id);
  });
  _updateDeleteBar();
}

function calcMonthIncomeTotal(key) {
  return transactions
    .filter(t =>
      t.date?.startsWith(key) &&
      t.amount > 0 &&
      !t.transferId &&
      isCashAccount(t.accId)
    )
    .reduce((s, t) => s + t.amount, 0);
}

function calcMonthExpenseTotal(key) {
  return transactions
    .filter(t =>
      t.date?.startsWith(key) &&
      t.amount < 0 &&
      !t.transferId &&
      isBudgetActivityAccount(t.accId)
    )
    .reduce((s, t) => s + Math.abs(t.amount), 0);
}

// ── INZICHTEN ─────────────────────────────────────────────────────────────
function renderInsights() {
  const grid = document.getElementById('insights-grid');
  if (!grid) return;
  grid.innerHTML = '';

  // ── Beschikbare breedte berekenen ─────────────────────────────────────
  const gridW  = grid.clientWidth || (window.innerWidth - 280);
  const innerW = gridW - 40;                       // 20px padding l+r
  const halfW  = Math.floor((innerW - 16) / 2);   // 16px gap

  // ── Data voorbereiden ─────────────────────────────────────────────────
  const months = [];
  let y = currentYear, m = currentMonth;
  for (let i = 0; i < 12; i++) {
    months.unshift({ year: y, month: m, key: monthKey(y, m) });
    m--; if (m < 1) { m = 12; y--; }
  }

  const currentKey = monthKey(currentYear, currentMonth);
  const allMonthData = months.map(({ year, month, key }) => {
    const inc = calcMonthIncomeTotal(key);
    const sp  = calcMonthExpenseTotal(key);
    const nw  = calcNetWorthThrough(key + '-31');
    return { year, month, key, inc, sp, nw, hasData: inc > 0 || sp > 0 || key === currentKey };
  }).filter(d => d.hasData);

  const incomePerMonth   = allMonthData.map(d => d.inc);
  const spentPerMonth    = allMonthData.map(d => d.sp);
  const networthPerMonth = allMonthData.map(d => d.nw);
  const labels = allMonthData.map(({ year, month }) =>
    MAANDEN[month - 1].slice(0, 3) + ' ' + String(year).slice(2)
  );

  const mk = monthKey(currentYear, currentMonth);

  // KPI-waarden
  const incNow  = calcMonthIncomeTotal(mk);
  const spNow   = calcMonthExpenseTotal(mk);
  const nwNow   = calcNetWorth();
  const prevM   = currentMonth - 1 < 1 ? 12 : currentMonth - 1;
  const prevY   = currentMonth - 1 < 1 ? currentYear - 1 : currentYear;
  const nwPrev  = calcNetWorthThrough(monthKey(prevY, prevM) + '-31');
  const nwDelta = nwNow - nwPrev;
  const savings = incNow > 0 ? Math.round((incNow - spNow) / incNow * 100) : null;

  // Uitgaven per groep
  const spendByGroup = groups
    .filter(g => g.name !== 'Inkomen')
    .map(g => ({
      name: g.name,
      total: transactions
        .filter(t => t.date?.startsWith(mk) && t.amount < 0 && !t.transferId && isBudgetActivityAccount(t.accId))
        .filter(t => g.cats.some(c => c.id === t.catId))
        .reduce((s, t) => s + Math.abs(t.amount), 0)
    }))
    .filter(g => g.total > 0)
    .sort((a, b) => b.total - a.total);

  // Top categorieën
  const allCats = groups.flatMap(g =>
    g.cats.map(c => ({ ...c, grpName: g.name, isIncome: g.name === 'Inkomen' }))
  );
  const catTotals = allCats.map(c => ({
    name: c.name, grp: c.grpName, isIncome: c.isIncome,
    total: transactions
      .filter(t => t.date?.startsWith(mk) && t.catId === c.id && !t.transferId &&
        isBudgetActivityAccount(t.accId) && (c.isIncome ? t.amount > 0 : t.amount < 0))
      .reduce((s, t) => s + Math.abs(t.amount), 0)
  })).filter(c => c.total > 0).sort((a, b) => b.total - a.total);

  // ── Grafieken ─────────────────────────────────────────────────────────
  const nwSign = nwDelta >= 0 ? '+' : '';
  const nwSubtitle = nwDelta !== 0
    ? `${nwSign}${fmt(nwDelta)} t.o.v. ${maandNaam(prevY, prevM)}`
    : null;
  grid.appendChild(insightCardNetworth(networthPerMonth, labels, innerW, fmt(nwNow), nwSubtitle, nwNow >= 0 ? 'green' : 'red'));
  grid.appendChild(insightCardIncomeVsSpent(incomePerMonth, spentPerMonth, labels, halfW));
  grid.appendChild(insightCardDonut(spendByGroup));
  grid.appendChild(insightCardTopCats(catTotals));
}

// ── HELPER: canvas maken ──────────────────────────────────────────────────
function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w * window.devicePixelRatio;
  c.height = h * window.devicePixelRatio;
  c.style.width = w + 'px';
  c.style.height = h + 'px';
  c.getContext('2d').scale(window.devicePixelRatio, window.devicePixelRatio);
  return c;
}

function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function insightCard(title, content, extraClass = '') {
  const card = document.createElement('div');
  card.className = 'insight-card' + (extraClass ? ' ' + extraClass : '');
  card.innerHTML = `<div class="insight-card-title">${title}</div>`;
  card.appendChild(content);
  return card;
}

function insightCardKPI(label, value, sub, color) {
  const card = document.createElement('div');
  card.className = 'insight-card insight-kpi';
  card.innerHTML = `
    <div class="insight-card-title">${label}</div>
    <div class="insight-kpi-value" style="color:var(--${color})">${value}</div>
    ${sub ? `<div class="insight-kpi-sub">${sub}</div>` : ''}
  `;
  return card;
}

// ── LIJNDIAGRAM: Netto Vermogen ────────────────────────────────────────────
function insightCardNetworth(data, labels, cardW = 800, valueStr = null, subStr = null, valueColor = 'green') {
  // Bouw dagelijkse datapunten op basis van alle transacties
  const dailyPoints = buildDailyNetworth();
  const useDaily  = dailyPoints.length > 1;
  const chartData   = useDaily ? dailyPoints.map(d => d.nw)    : data;
  const chartLabels = useDaily ? dailyPoints.map(d => d.label)  : labels;
  const chartDates  = useDaily ? dailyPoints.map(d => d.date)   : labels;

  const W = Math.max(400, cardW - 2), H = 220, PAD = { t: 16, r: 20, b: 36, l: 76 };
  const canvas = makeCanvas(W, H);
  const ctx = canvas.getContext('2d');
  const iW = W - PAD.l - PAD.r;
  const iH = H - PAD.t - PAD.b;

  const min = Math.min(0, ...chartData);
  const max = Math.max(1, ...chartData);
  const range = max - min || 1;

  const toX = i => chartData.length < 2 ? PAD.l + iW / 2
                                         : PAD.l + (i / (chartData.length - 1)) * iW;
  const toY = v => PAD.t + (1 - (v - min) / range) * iH;

  function draw(hoverIdx = -1) {
    ctx.clearRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = cssVar('--border');
    ctx.lineWidth = 1;
    [0, .25, .5, .75, 1].forEach(f => {
      const y = PAD.t + f * iH;
      ctx.beginPath(); ctx.moveTo(PAD.l, y); ctx.lineTo(W - PAD.r, y); ctx.stroke();
      ctx.fillStyle = cssVar('--text3');
      ctx.font = '10px ' + cssVar('--font-body');
      ctx.textAlign = 'right';
      ctx.fillText(fmt(Math.round(max - f * range)), PAD.l - 6, y + 4);
    });

    // Zero-lijn
    if (min < 0 && max > 0) {
      const zy = toY(0);
      ctx.strokeStyle = cssVar('--border2');
      ctx.lineWidth = 1; ctx.setLineDash([4, 3]);
      ctx.beginPath(); ctx.moveTo(PAD.l, zy); ctx.lineTo(W - PAD.r, zy); ctx.stroke();
      ctx.setLineDash([]);
    }

    // Gradient fill
    if (max > 0 && chartData.length > 1) {
      const grad = ctx.createLinearGradient(0, PAD.t, 0, H - PAD.b);
      grad.addColorStop(0, 'rgba(29,201,154,0.22)');
      grad.addColorStop(1, 'rgba(29,201,154,0)');
      ctx.beginPath();
      ctx.moveTo(toX(0), toY(chartData[0]));
      chartData.forEach((v, i) => { if (i > 0) ctx.lineTo(toX(i), toY(v)); });
      ctx.lineTo(toX(chartData.length - 1), toY(min));
      ctx.lineTo(toX(0), toY(min));
      ctx.closePath();
      ctx.fillStyle = grad; ctx.fill();
    }

    // Lijn
    if (chartData.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = cssVar('--green');
      ctx.lineWidth = 2; ctx.lineJoin = 'round';
      ctx.moveTo(toX(0), toY(chartData[0]));
      chartData.forEach((v, i) => { if (i > 0) ctx.lineTo(toX(i), toY(v)); });
      ctx.stroke();
    }

    // Punten — bij veel dagpunten alleen hovered tonen
    const showAllDots = chartData.length <= 60;
    chartData.forEach((v, i) => {
      if (!showAllDots && i !== hoverIdx) return;
      ctx.beginPath();
      ctx.arc(toX(i), toY(v), i === hoverIdx ? 5 : 3, 0, Math.PI * 2);
      ctx.fillStyle = cssVar('--green');
      ctx.fill();
      if (i === hoverIdx) {
        ctx.strokeStyle = cssVar('--bg');
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    });

    // Verticale hover-lijn
    if (hoverIdx >= 0) {
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(toX(hoverIdx), PAD.t);
      ctx.lineTo(toX(hoverIdx), H - PAD.b);
      ctx.stroke(); ctx.setLineDash([]);
    }

    // X-labels — slim verspreid
    ctx.fillStyle = cssVar('--text3');
    ctx.font = '9px ' + cssVar('--font-body');
    ctx.textAlign = 'center';
    const maxLbls = Math.floor(iW / 52);
    const lStep = Math.max(1, Math.ceil(chartData.length / maxLbls));
    chartLabels.forEach((l, i) => {
      if (i === 0 || i === chartData.length - 1 || i % lStep === 0)
        ctx.fillText(l, toX(i), H - PAD.b + 16);
    });
  }

  draw();

  // Tooltip
  const tip = makeTooltip();
  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (W / rect.width);
    const step = chartData.length < 2 ? 1 : iW / (chartData.length - 1);
    const i = Math.max(0, Math.min(chartData.length - 1, Math.round((mx - PAD.l) / step)));
    draw(i);
    const change = i > 0 ? chartData[i] - chartData[i - 1] : 0;
    const sign = change >= 0 ? '+' : '';
    const dateStr = useDaily ? fmtDatum(chartDates[i]) : chartLabels[i];
    showTooltip(tip, e.clientX, e.clientY,
      `<strong>${dateStr}</strong><br>
       Netto vermogen: <span style="color:${chartData[i] >= 0 ? 'var(--green)' : 'var(--red)'}">${fmt(chartData[i])}</span><br>
       ${i > 0 ? `Verandering: <span style="color:${change >= 0 ? 'var(--green)' : 'var(--red)'}">${sign}${fmt(change)}</span>` : ''}`
    );
  });
  canvas.addEventListener('mouseleave', () => { draw(); hideTooltip(tip); });

  const wrap = document.createElement('div');
  wrap.style.position = 'relative';
  wrap.appendChild(canvas);
  const titleHtml = valueStr
    ? `Netto Vermogen <span style="color:var(--${valueColor});font-size:18px;font-weight:700;margin-left:10px;text-transform:none;letter-spacing:0">${valueStr}</span>${subStr ? `<span style="color:var(--text3);font-size:11px;font-weight:400;margin-left:10px;text-transform:none;letter-spacing:0">${subStr}</span>` : ''}`
    : 'Netto Vermogen';
  return insightCard(titleHtml, wrap, 'insight-card-full');
}

// ── DAGELIJKS NETTO VERMOGEN BEREKENEN ────────────────────────────────────
function buildDailyNetworth() {
  if (!transactions.length && !accounts.some(a => a.openingBalance)) return [];

  const openingTotal = accounts.reduce((s, a) => s + Math.round((a.openingBalance || 0) * 100), 0);

  // Gebruik lokale datum zodat tijdzone geen rol speelt
  const _now = new Date();
  const todayIso = _now.getFullYear() + '-' +
    String(_now.getMonth() + 1).padStart(2, '0') + '-' +
    String(_now.getDate()).padStart(2, '0');

  // Delta per datum — toekomstige transacties negeren
  const deltaByDate = {};
  transactions.forEach(t => {
    if (!t.date || t.date > todayIso) return;
    deltaByDate[t.date] = (deltaByDate[t.date] || 0) + t.amount;
  });

  const allDates = Object.keys(deltaByDate).sort();
  if (!allDates.length) return [];

  const firstDate = allDates[0];

  const points = [];
  let cumulative = openingTotal;
  let cur = new Date(firstDate + 'T00:00:00');
  const end = new Date(todayIso + 'T00:00:00');

  while (cur <= end) {
    // Datum als lokale string (geen UTC-verschuiving)
    const iso = cur.getFullYear() + '-' +
      String(cur.getMonth() + 1).padStart(2, '0') + '-' +
      String(cur.getDate()).padStart(2, '0');
    if (deltaByDate[iso]) cumulative += deltaByDate[iso];
    const d = cur.getDate();
    const m = MAANDEN[cur.getMonth()].slice(0, 3);
    points.push({ date: iso, nw: cumulative, label: d + ' ' + m });
    cur.setDate(cur.getDate() + 1);
  }

  return points;
}

// ── STAAFDIAGRAM: Inkomen vs Uitgaven ─────────────────────────────────────
function insightCardIncomeVsSpent(income, spent, labels, cardW = 500) {
  const W = Math.max(300, cardW - 2), H = 200, PAD = { t: 16, r: 20, b: 36, l: 76 };
  const canvas = makeCanvas(W, H);
  const ctx = canvas.getContext('2d');
  const iW = W - PAD.l - PAD.r;
  const iH = H - PAD.t - PAD.b;

  const max = Math.max(1, ...income, ...spent);
  const n = labels.length;
  const groupW = iW / n;
  const barW = Math.min(14, groupW * 0.35);

  function draw(hoverIdx = -1) {
    ctx.clearRect(0, 0, W, H);

    // Grid
    [0, .25, .5, .75, 1].forEach(f => {
      const y = PAD.t + f * iH;
      ctx.strokeStyle = cssVar('--border'); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(PAD.l, y); ctx.lineTo(W - PAD.r, y); ctx.stroke();
      ctx.fillStyle = cssVar('--text3');
      ctx.font = '10px ' + cssVar('--font-body');
      ctx.textAlign = 'right';
      ctx.fillText(fmt(Math.round(max * (1 - f))), PAD.l - 6, y + 4);
    });

    income.forEach((inc, i) => {
      const x = PAD.l + i * groupW + groupW / 2;
      const bH_inc = (inc / max) * iH;
      const bH_sp  = (spent[i] / max) * iH;
      const isHov  = i === hoverIdx;

      // Hover achtergrond
      if (isHov) {
        ctx.fillStyle = 'rgba(255,255,255,0.04)';
        ctx.fillRect(x - groupW / 2, PAD.t, groupW, iH);
      }

      ctx.fillStyle = isHov ? '#2ddfa8' : cssVar('--green');
      ctx.beginPath();
      ctx.roundRect(x - barW - 2, PAD.t + iH - bH_inc, barW, bH_inc || 1, [3, 3, 0, 0]);
      ctx.fill();

      ctx.fillStyle = isHov ? '#f5667e' : cssVar('--red');
      ctx.beginPath();
      ctx.roundRect(x + 2, PAD.t + iH - bH_sp, barW, bH_sp || 1, [3, 3, 0, 0]);
      ctx.fill();
    });

    // X-labels — altijd eerste en laatste, tussenliggende slim verspreid
    ctx.font = '9px ' + cssVar('--font-body');
    ctx.textAlign = 'center';
    const maxLabels = Math.floor(iW / 52);
    const step = Math.max(1, Math.ceil(n / maxLabels));
    labels.forEach((l, i) => {
      const showThis = i === 0 || i === n - 1 || i % step === 0;
      if (showThis) {
        ctx.fillStyle = i === hoverIdx ? cssVar('--text') : cssVar('--text3');
        ctx.fillText(l, PAD.l + i * groupW + groupW / 2, H - PAD.b + 16);
      }
    });
  }

  draw();

  const tip = makeTooltip();
  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (W / rect.width);
    const i = Math.floor((mx - PAD.l) / groupW);
    if (i >= 0 && i < n) {
      draw(i);
      const saldo = income[i] - spent[i];
      const sign  = saldo >= 0 ? '+' : '';
      const totalInc = income.reduce((a,b)=>a+b,0);
      const totalSp  = spent.reduce((a,b)=>a+b,0);
      const incPct = totalInc > 0 ? Math.round(income[i]/totalInc*100) : 0;
      const spPct  = totalSp  > 0 ? Math.round(spent[i] /totalSp *100) : 0;
      showTooltip(tip, e.clientX, e.clientY,
        `<strong>${labels[i]}</strong><br>
         Inkomen: <span style="color:var(--green)">${fmt(income[i])}</span> <span style="color:var(--text3)">(${incPct}% v/h jaar)</span><br>
         Uitgaven: <span style="color:var(--red)">${fmt(spent[i])}</span> <span style="color:var(--text3)">(${spPct}% v/h jaar)</span><br>
         Saldo: <span style="color:${saldo >= 0 ? 'var(--green)' : 'var(--red)'}">${sign}${fmt(saldo)}</span>`
      );
    }
  });
  canvas.addEventListener('mouseleave', () => { draw(); hideTooltip(tip); });

  const legend = document.createElement('div');
  legend.style.cssText = 'display:flex;gap:16px;margin-top:8px;font-size:11px;';
  legend.innerHTML = `<span style="color:var(--green)">■ Inkomen</span><span style="color:var(--red)">■ Uitgaven</span>`;

  const wrap = document.createElement('div');
  wrap.style.position = 'relative';
  wrap.appendChild(canvas);
  wrap.appendChild(legend);
  return insightCard('Inkomen & Uitgaven', wrap, 'insight-card-half');
}

// ── TOOLTIP HELPERS ───────────────────────────────────────────────────────
function makeTooltip() {
  const tip = document.createElement('div');
  tip.className = 'chart-tooltip';
  document.body.appendChild(tip);
  return tip;
}
function showTooltip(tip, x, y, html) {
  tip.innerHTML = html;
  tip.classList.add('visible');
  const tw = tip.offsetWidth, th = tip.offsetHeight;
  const vw = window.innerWidth, vh = window.innerHeight;
  tip.style.left = Math.min(x + 12, vw - tw - 8) + 'px';
  tip.style.top  = Math.min(y - th / 2, vh - th - 8) + 'px';
}
function hideTooltip(tip) { tip.classList.remove('visible'); }

// ── DONUTDIAGRAM: Uitgaven per groep ──────────────────────────────────────
const DONUT_COLORS = ['#7c6af7','#1dc99a','#f5a623','#f04f6a','#4ab8f7','#a8e063','#f7c948'];

function insightCardDonut(groups_data) {
  const SIZE = 180;
  const canvas = makeCanvas(SIZE, SIZE);
  const ctx = canvas.getContext('2d');
  const cx = SIZE / 2, cy = SIZE / 2, R = 76, r = 44;

  const total = groups_data.reduce((s, g) => s + g.total, 0);

  // Sla starthoeken op voor hit-test
  const slices = [];
  let angle = -Math.PI / 2;
  groups_data.forEach((g, i) => {
    const slice = total ? (g.total / total) * Math.PI * 2 : 0;
    slices.push({ start: angle, end: angle + slice, color: DONUT_COLORS[i % DONUT_COLORS.length], g });
    angle += slice;
  });

  function draw(hoverIdx = -1) {
    ctx.clearRect(0, 0, SIZE, SIZE);
    if (!total) {
      ctx.fillStyle = cssVar('--text3');
      ctx.font = '12px ' + cssVar('--font-body');
      ctx.textAlign = 'center';
      ctx.fillText('Geen uitgaven', cx, cy + 4);
      return;
    }
    slices.forEach(({ start, end, color }, i) => {
      const isHov = i === hoverIdx;
      ctx.beginPath();
      if (isHov) {
        // Vergroot segment licht
        const mid = (start + end) / 2;
        ctx.save();
        ctx.translate(Math.cos(mid) * 4, Math.sin(mid) * 4);
      }
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, isHov ? R + 5 : R, start, end);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      if (isHov) ctx.restore();
    });

    // Gat
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = cssVar('--surface');
    ctx.fill();

    // Tekst in midden
    ctx.fillStyle = cssVar('--text');
    ctx.font = `bold 13px ${cssVar('--font-body')}`;
    ctx.textAlign = 'center';
    if (hoverIdx >= 0 && slices[hoverIdx]) {
      const g = slices[hoverIdx].g;
      const pct = Math.round(g.total / total * 100);
      ctx.fillText(`${pct}%`, cx, cy + 5);
    } else {
      ctx.fillText(fmt(total), cx, cy + 5);
    }
  }

  draw();

  const tip = makeTooltip();
  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (SIZE / rect.width) - cx;
    const my = (e.clientY - rect.top)  * (SIZE / rect.height) - cy;
    const dist = Math.sqrt(mx * mx + my * my);
    if (dist < r || dist > R + 6) { draw(); hideTooltip(tip); return; }
    let a = Math.atan2(my, mx);
    if (a < -Math.PI / 2) a += Math.PI * 2;
    const idx = slices.findIndex(s => a >= s.start && a < s.end);
    if (idx >= 0) {
      draw(idx);
      const g = slices[idx].g;
      const pct = Math.round(g.total / total * 100);
      showTooltip(tip, e.clientX, e.clientY,
        `<strong>${g.name}</strong><br>${fmt(g.total)} · ${pct}%`);
    }
  });
  canvas.addEventListener('mouseleave', () => { draw(); hideTooltip(tip); });

  // Legenda
  const legend = document.createElement('div');
  legend.style.cssText = 'display:flex;flex-direction:column;gap:5px;font-size:11px;justify-content:center;min-width:140px;';
  groups_data.forEach((g, i) => {
    const pct = total ? Math.round(g.total / total * 100) : 0;
    const item = document.createElement('div');
    item.style.cssText = 'display:flex;align-items:center;gap:6px;cursor:default;';
    item.innerHTML = `<span style="width:10px;height:10px;border-radius:2px;background:${DONUT_COLORS[i % DONUT_COLORS.length]};flex-shrink:0"></span>
      <span style="color:var(--text2);flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${g.name}</span>
      <span style="color:var(--text3);margin-left:auto">${pct}%</span>`;
    legend.appendChild(item);
  });

  const wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;align-items:center;gap:20px;position:relative;';
  wrap.appendChild(canvas);
  wrap.appendChild(legend);

  const mn = maandNaam(currentYear, currentMonth);
  return insightCard(`Uitgaven per groep — ${mn}`, wrap, 'insight-card-half');
}

// ── TOP CATEGORIEËN ───────────────────────────────────────────────────────
function insightCardTopCats(cats) {
  const wrap = document.createElement('div');

  if (!cats.length) {
    wrap.innerHTML = '<p style="color:var(--text3);font-size:12px;">Geen activiteit deze maand.</p>';
    return insightCard(`Top potjes — ${maandNaam(currentYear, currentMonth)}`, wrap, 'insight-card-full');
  }

  const income   = cats.filter(c => c.isIncome);
  const expenses = cats.filter(c => !c.isIncome);
  const maxInc   = income[0]?.total   || 1;
  const maxExp   = expenses[0]?.total || 1;

  function makeCol(items, totalVal, isInc) {
    const col = document.createElement('div');
    col.style.cssText = 'flex:1;min-width:0;';

    const lbl = document.createElement('div');
    lbl.style.cssText = 'font-size:10px;font-weight:700;letter-spacing:.06em;color:var(--text3);text-transform:uppercase;margin-bottom:10px;';
    lbl.textContent = isInc ? 'Inkomen' : 'Uitgaven';
    col.appendChild(lbl);

    if (!items.length) {
      const empty = document.createElement('div');
      empty.style.cssText = 'font-size:11px;color:var(--text3);';
      empty.textContent = 'Geen activiteit';
      col.appendChild(empty);
      return col;
    }

    const tip = makeTooltip();

    items.forEach((c, i) => {
      const pct   = totalVal > 0 ? Math.round(c.total / totalVal * 100) : 0;
      const barPct = Math.round(c.total / items[0].total * 100); // balk relatief aan hoogste
      const color = isInc ? 'var(--green)' : DONUT_COLORS[(i + 2) % DONUT_COLORS.length];
      const row   = document.createElement('div');
      row.style.cssText = 'margin-bottom:10px;cursor:default;';
      row.innerHTML = `
        <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:3px;gap:8px;">
          <span style="color:var(--text2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${c.name} <span style="color:var(--text3);font-size:10px;">${c.grp}</span></span>
          <span style="color:${isInc ? 'var(--green)' : 'var(--text)'};font-weight:600;flex-shrink:0;">${fmt(c.total)} <span class="cat-pct-label">${pct}%</span></span>
        </div>
        <div style="background:var(--surface2);border-radius:3px;height:5px;overflow:hidden;">
          <div style="width:${barPct}%;height:100%;background:${color};border-radius:3px;transition:width .4s;"></div>
        </div>`;
      row.addEventListener('mouseenter', e => {
        row.style.background = 'rgba(255,255,255,0.03)';
        row.style.borderRadius = '4px';
        showTooltip(tip, e.clientX, e.clientY,
          `<strong>${c.name}</strong> <span style="color:var(--text3)">${c.grp}</span><br>
           ${fmt(c.total)} · ${pct}% van totaal`);
      });
      row.addEventListener('mousemove', e => showTooltip(tip, e.clientX, e.clientY,
        `<strong>${c.name}</strong> <span style="color:var(--text3)">${c.grp}</span><br>
         ${fmt(c.total)} · ${pct}% van totaal`));
      row.addEventListener('mouseleave', () => { row.style.background = ''; hideTooltip(tip); });
      col.appendChild(row);
    });
    return col;
  }

  const totalInc = income.reduce((s, c) => s + c.total, 0);
  const totalExp = expenses.reduce((s, c) => s + c.total, 0);

  const cols = document.createElement('div');
  cols.style.cssText = 'display:flex;gap:24px;';
  cols.appendChild(makeCol(expenses, totalExp, false));

  const divider = document.createElement('div');
  divider.style.cssText = 'width:1px;background:var(--border);flex-shrink:0;margin:0 4px;';
  cols.appendChild(divider);

  cols.appendChild(makeCol(income, totalInc, true));
  wrap.appendChild(cols);

  return insightCard(maandNaam(currentYear, currentMonth), wrap, 'insight-card-full');
}

// ── BUDGET FILTER ─────────────────────────────────────────────────────────
let _budgetFilter = 'all';

function setBudgetFilter(filter, btn) {
  _budgetFilter = filter;
  document.querySelectorAll('.bfilter').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderBudget();
}

// ── CATEGORIE DETAIL PANEEL ───────────────────────────────────────────────
let _cdpCatId = null;
let _cdpGrpId = null;

function openCatDetail(catId, grpId) {
  const isMobile = window.innerWidth <= 768;

  // Toggle: sluit als dezelfde categorie nogmaals getapt wordt
  const existingDrawer = document.querySelector('.mob-cat-drawer');
  if (existingDrawer && _cdpCatId === catId) {
    existingDrawer.remove();
    document.querySelectorAll('.cat-row').forEach(r => r.classList.remove('cdp-selected'));
    _cdpCatId = null; _cdpGrpId = null;
    return;
  }
  document.querySelectorAll('.mob-cat-drawer').forEach(d => d.remove());

  _cdpCatId = catId;
  _cdpGrpId = grpId;

  document.querySelectorAll('.cat-row').forEach(r => r.classList.remove('cdp-selected'));
  const row = document.querySelector(`.cat-row[data-cat-id="${catId}"]`);
  if (row) row.classList.add('cdp-selected');

  if (isMobile) {
    refreshCatDetail();
    const content = document.getElementById('cdp-content');
    const drawer = document.createElement('div');
    drawer.className = 'mob-cat-drawer';
    drawer.innerHTML = content.innerHTML;
    drawer.querySelectorAll('.cdp-collapsible').forEach(sec => sec.classList.add('cdp-collapsed'));
    drawer.querySelectorAll('.cdp-collapse-header').forEach(header => {
      header.removeAttribute('onclick');
      header.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        header.closest('.cdp-collapsible')?.classList.toggle('cdp-collapsed');
      });
    });
    drawer.querySelectorAll('[onclick]').forEach(el => {
      const fn = el.getAttribute('onclick');
      if (!fn) return;
      el.addEventListener('click', () => eval(fn));
    });
    if (row) row.after(drawer);
    return;
  }

  document.getElementById('cdp-empty').style.display = 'none';
  document.getElementById('cdp-content').style.display = 'flex';
  document.getElementById('cdp-content').style.flexDirection = 'column';

  refreshCatDetail();
}

function buildMonthlyPaymentNote(catId, cat, available) {
  const key = monthKey(currentYear, currentMonth);
  const paidTxns = transactions.filter(t =>
    t.catId === catId &&
    t.date?.startsWith(key) &&
    Number(t.amount || 0) < 0
  );
  const paidTotal = paidTxns.reduce((sum, t) => sum + Math.abs(Number(t.amount || 0)), 0);

  if (paidTxns.length === 1) {
    const tx = paidTxns[0];
    const fallbackName = cat?.name ? cat.name.replace(/^\S+\s*/, '').trim() : 'dit potje';
    const label = (tx.payee || tx.description || tx.memo || fallbackName || 'dit potje').trim();
    return `Je hebt ${label} deze maand ${fmt(paidTotal)} uitgegeven`;
  }
  if (paidTxns.length > 1) {
    return `Je hebt deze maand ${fmt(paidTotal)} uitgegeven met ${paidTxns.length} transacties`;
  }
  if (available === 0) {
    return 'Dit potje is leeg';
  }
  return '';
}

function refreshCatDetail() {
  if (!_cdpCatId) return;
  const catId = _cdpCatId;
  const cat   = findCat(catId);
  if (!cat) return;

  const budgeted  = calcCatBudgeted(catId);
  const spent     = calcCatSpent(catId);
  const available = calcCatAvailable(catId);
  const prevAvail = getPrevAvailable(catId);
  const cashSpent = calcCatCashSpending(catId);
  const creditSpent = calcCatCreditSpending(catId);
  const income    = isIncomeCat(catId);
  const rawGoal   = goals[catId];
  const activeGoal = !income && isGoalActiveForMonth(rawGoal);
  const goal      = activeGoal ? rawGoal : null;
  const fundingStatus = calcFundingRuleStatus(catId);
  const spentAbs  = Math.abs(spent);
  const budgetSpentPct = budgeted > 0 ? Math.min(100, Math.round(spentAbs / budgeted * 100)) : 0;
  const budgetAvailPct = budgeted > 0 ? Math.max(0, 100 - budgetSpentPct) : 0;
  const budgetTone = budgetRemainingTone(!income && available < 0, budgetAvailPct);

  // Header
  document.getElementById('cdp-name').textContent = cleanBudgetLabel(cat.name);

  // Waarden
  const availEl = document.getElementById('cdp-available');
  availEl.textContent = fmt(available);
  availEl.className = 'cdp-val ' + (!income && budgeted > 0 ? `tone-${budgetTone}` : available < 0 ? 'neg' : available > 0 ? 'pos' : '');
  const isPanelOverspent = !income && available < 0;

  const leftOverEl = document.getElementById('cdp-cash-leftover');
  if (leftOverEl) {
    leftOverEl.textContent = fmt(prevAvail);
    leftOverEl.className = 'cdp-val ' + (prevAvail > 0 ? 'pos' : prevAvail < 0 ? 'neg' : '');
  }
  document.getElementById('cdp-budgeted').textContent = fmt(budgeted);
  const cashSpentEl = document.getElementById('cdp-cash-spent');
  const cashSpentLabel = document.getElementById('cdp-cash-spent-label');
  const showCreditSpent = getBudgetCreditAccounts().length > 0;
  if (cashSpentLabel) cashSpentLabel.textContent = showCreditSpent ? 'Uitgegeven van eigen geld' : 'Uitgegeven deze maand';
  if (cashSpentEl) {
    cashSpentEl.textContent = fmt(cashSpent);
    cashSpentEl.className = 'cdp-val ' + (cashSpent < 0 ? 'neg' : '');
  }
  const creditSpentEl = document.getElementById('cdp-credit-spent');
  const creditSpentRow = document.getElementById('cdp-credit-spent-row');
  if (creditSpentRow) creditSpentRow.style.display = showCreditSpent ? '' : 'none';
  if (creditSpentEl) {
    creditSpentEl.textContent = fmt(creditSpent);
    creditSpentEl.className = 'cdp-val ' + (creditSpent < 0 ? 'neg' : '');
  }
  const overspendWarning = document.getElementById('cdp-overspend-warning');
  const overspendText = document.getElementById('cdp-overspend-text');
  if (overspendWarning && overspendText) {
    overspendWarning.style.display = isPanelOverspent ? 'block' : 'none';
    if (isPanelOverspent) {
      overspendText.innerHTML = `Er is meer uitgegeven dan beschikbaar was. Los het tekort van <strong>${fmt(Math.abs(available))}</strong> op door geld uit een ander potje te verplaatsen.`;
    } else {
      overspendText.textContent = '';
    }
  }

  // ── Budget sectie (YNAB-stijl) ───────────────────────────────────────────
  const goalSec       = document.getElementById('cdp-goal-section');
  const goalProgress  = document.getElementById('cdp-goal-progress');
  const goalEmpty     = document.getElementById('cdp-goal-empty');
  const goalEmptyAct  = document.getElementById('cdp-goal-empty-actions');
  const reachedEl     = document.getElementById('cdp-goal-reached');
  const aanvulInput   = document.getElementById('cdp-aanvul-input');

  const goalTitleLabel = document.getElementById('cdp-goal-title-label');
  if (goalTitleLabel) goalTitleLabel.textContent = fundingStatus.title;
  if (goalSec) goalSec.style.display = income ? 'none' : 'block';

  if (!fundingStatus.isManual) {
    if (goalProgress) goalProgress.style.display = 'block';
    if (goalEmpty)    goalEmpty.style.display    = 'none';
    if (goalEmptyAct) goalEmptyAct.style.display = 'none';

    const need         = fundingStatus.monthlyNeed;
    const funded       = budgeted;
    const togo         = fundingStatus.fillNeed;
    const reached      = fundingStatus.isFunded;

    // Headline
    const headlineEl = document.getElementById('cdp-goal-headline');
    const sublineEl = document.getElementById('cdp-goal-subline');
    if (headlineEl) headlineEl.textContent = fundingStatus.headline;
    if (sublineEl) {
      const subline = fundingStatus.subline;
      sublineEl.textContent = subline;
      sublineEl.style.display = subline ? 'inline-flex' : 'none';
    }

    const isTargetRule = fundingStatus.rule.type === 'targetByDate';
    const isMonthlyRule = fundingStatus.rule.type === 'monthly';
    const showMonthlyStatus = isMonthlyRule && available >= 0 && !isPanelOverspent;
    const monthlySurplus = isMonthlyRule && reached ? fundingStatus.surplus : 0;
    const targetReached = isTargetRule && fundingStatus.targetReached;
    const targetOver = targetReached ? fundingStatus.targetOver : 0;

    // Budgetstatus
    if (reachedEl) reachedEl.style.display = isPanelOverspent || targetReached || ((reached || fundingStatus.isUsedUp) && available >= 0) || showMonthlyStatus ? 'flex' : 'none';
    const reachedBadge = document.getElementById('cdp-goal-reached-badge');
    if (reachedBadge) {
      const isNeeded = ((isMonthlyRule && !reached) || (isTargetRule && !targetReached && togo > 0)) && !fundingStatus.isUsedUp && available >= 0;
      const isShortage = isPanelOverspent;
      reachedBadge.textContent = isShortage
        ? `${fmt(Math.abs(available))} tekort`
        : targetOver > 0
        ? `${fmt(targetOver)} boven doel`
        : targetReached
        ? 'Doel behaald'
        : monthlySurplus > 0
        ? `${fmt(monthlySurplus)} over`
        : fundingStatus.isUsedUp
        ? 'Uitgegeven'
        : isNeeded
        ? `Nog ${fmt(togo)} nodig deze maand`
        : isTargetRule
        ? 'Deze maand op schema'
        : 'Deze maand compleet';
      reachedBadge.classList.toggle('is-needed', isNeeded);
      reachedBadge.classList.toggle('is-shortage', isShortage);
    }

    // Bedragen
    const [prevYear, prevMonth] = prevYM(currentYear, currentMonth);
    const prevSpent = Math.abs(calcCatSpentForMonth(catId, prevYear, prevMonth));
    const prevSpentLabel = document.getElementById('cdp-goal-prev-spent-label');
    const prevSpentEl = document.getElementById('cdp-goal-prev-spent');
    const needLabel = document.getElementById('cdp-goal-need-label');
    const fundedLabel = document.getElementById('cdp-goal-funded-label');
    const rowsEl = document.querySelector('#cdp-goal-progress .cdp-goal-rows');
    const noteEl = document.getElementById('cdp-goal-note');
    const useCompactMonthly = isMonthlyRule && !isPanelOverspent;
    const paidNote = isMonthlyRule ? buildMonthlyPaymentNote(catId, cat, available) : '';
    if (rowsEl) rowsEl.style.display = useCompactMonthly ? 'none' : 'flex';
    if (noteEl) {
      const statusNoteText = isTargetRule && targetReached
        ? targetOver > 0
          ? `Je doel is behaald. Er staat ${fmt(targetOver)} meer in dit potje dan nodig voor dit doel`
          : `Je doel is behaald`
        : isTargetRule && !targetReached && togo === 0
        ? `Je hebt genoeg toegewezen om op schema te blijven voor dit doel`
        : isPanelOverspent
        ? `Er is meer uitgegeven dan beschikbaar was`
        : monthlySurplus > 0
        ? spentAbs >= need
          ? `Je maandbedrag is uitgegeven en ${fmt(monthlySurplus)} blijft extra beschikbaar`
          : `Er staat genoeg in dit potje voor het maandbedrag en ${fmt(monthlySurplus)} blijft extra beschikbaar`
        : reached || fundingStatus.isUsedUp
        ? spentAbs > 0
          ? ''
          : paidNote || `Je hebt genoeg toegewezen voor deze maand`
        : `Je hebt ${fmt(fundingStatus.coverage)} beschikbaar van ${fmt(need)}`;
      noteEl.style.display = (useCompactMonthly || isTargetRule) && statusNoteText ? 'block' : 'none';
      noteEl.textContent = statusNoteText;
    }
    if (prevSpentLabel) prevSpentLabel.textContent = isTargetRule ? 'Deze maand nodig' : 'Toegewezen';
    if (prevSpentEl) prevSpentEl.textContent = isTargetRule ? fmt(targetReached ? 0 : need) : fmt(funded);
    if (needLabel) needLabel.textContent = isTargetRule ? 'Toegewezen' : 'Uitgegeven';
    if (fundedLabel) fundedLabel.textContent = isTargetRule && targetReached ? 'Boven doel' : isTargetRule ? 'Nog toe te wijzen' : 'Beschikbaar';
    document.getElementById('cdp-goal-need').textContent   = fmt(isTargetRule ? fundingStatus.targetProgress : spentAbs);
    document.getElementById('cdp-goal-funded').textContent = fmt(isTargetRule ? targetReached ? targetOver : togo : available);
    const togoLabel = document.getElementById('cdp-goal-togo-label');
    const togoEl = document.getElementById('cdp-goal-togo');
    if (togoLabel) togoLabel.textContent = isPanelOverspent ? 'Tekort' : fundingStatus.rule.type === 'monthly' ? 'Maandbedrag' : 'Per maand nodig';
    togoEl.textContent = isPanelOverspent ? fmt(Math.abs(available)) : fundingStatus.rule.type === 'monthly' ? fundingStatus.headline : fmt(targetReached ? 0 : need);
    togoEl.className   = 'cdp-val ' + (isPanelOverspent ? 'neg' : togo === 0 ? 'pos' : '');

    const aanvulBtn = document.getElementById('cdp-aanvul-btn');
    if (aanvulBtn) {
      aanvulBtn.disabled = isPanelOverspent || monthlySurplus > 0 || targetOver > 0 ? false : togo === 0;
      aanvulBtn.textContent = isPanelOverspent ? 'Tekort oplossen' : targetOver > 0 ? 'Extra bedrag verplaatsen' : monthlySurplus > 0 ? 'Geld verplaatsen' : isMonthlyRule ? 'Automatisch aanvullen' : `Aanvullen met ${fmt(togo)}`;
      aanvulBtn.onclick = isPanelOverspent ? cdpCoverOverspending : targetOver > 0 ? () => openMoveModal(catId, 'cat') : monthlySurplus > 0 ? () => openMoveModal(catId, 'cat') : cdpAanvul;
    }
    const editBtn = document.getElementById('cdp-goal-edit-btn');
    if (editBtn) {
      editBtn.textContent = fundingStatus.actionLabel;
      editBtn.classList.toggle('is-secondary', false);
    }
    if (aanvulInput) aanvulInput.style.display = (!isPanelOverspent && (togo > 0 || monthlySurplus > 0 || targetOver > 0)) ? 'block' : 'none';
  } else {
    if (goalProgress) goalProgress.style.display = 'none';
    if (reachedEl)    reachedEl.style.display    = 'none';
    const sublineEl = document.getElementById('cdp-goal-subline');
    if (sublineEl) sublineEl.style.display = 'none';
    const noteEl = document.getElementById('cdp-goal-note');
    if (noteEl) noteEl.style.display = 'none';
    const rowsEl = document.querySelector('#cdp-goal-progress .cdp-goal-rows');
    if (rowsEl) rowsEl.style.display = 'flex';
    if (goalEmpty) {
      goalEmpty.style.display = income ? 'none' : 'block';
      goalEmpty.innerHTML = `Dit potje wordt nog niet automatisch aangevuld.`;
    }
    if (goalEmptyAct) goalEmptyAct.style.display = income ? 'none' : 'flex';
    document.getElementById('cdp-goal-edit-btn')?.classList.remove('is-secondary');
  }

  // Aanvullen — alleen bij actief automatisch aanvullen met een restant voor deze maand.
  const canMoveSurplus = !income && !fundingStatus.isManual && !isPanelOverspent && fundingStatus.rule.type === 'monthly' && fundingStatus.surplus > 0;
  const canMoveTargetOver = !income && !fundingStatus.isManual && !isPanelOverspent && fundingStatus.rule.type === 'targetByDate' && fundingStatus.targetOver > 0;
  const canAanvul     = !income && !fundingStatus.isManual && (fundingStatus.fillNeed > 0 || canMoveSurplus || canMoveTargetOver);
  if (aanvulInput) aanvulInput.style.display = canAanvul ? 'block' : 'none';
  if (!canAanvul) {
    const aanvulBtn = document.getElementById('cdp-aanvul-btn');
    if (aanvulBtn) {
      aanvulBtn.disabled = false;
      aanvulBtn.textContent = 'Volledig aanvullen';
    }
  }


  // Collapsed state toepassen
  applyCdpCollapsedStates();

  // Notitie
  const noteEl = document.getElementById('cdp-note-input');
  if (noteEl) noteEl.value = catNotes[catId] || '';
  const key = monthKey(currentYear, currentMonth);
  const txns = transactions
    .filter(t => t.catId === catId && t.date?.startsWith(key))
    .sort((a, b) => b.date.localeCompare(a.date));

  const list = document.getElementById('cdp-txn-list');
  if (!txns.length) {
    list.innerHTML = '<div style="color:var(--text3);font-size:11px;padding:4px 0;">Geen transacties deze maand.</div>';
  } else {
    list.innerHTML = txns.map(t => {
      const [dy, dm, dd] = t.date.split('-');
      const datum = `${parseInt(dd)} ${MAANDEN[parseInt(dm)-1]} ${dy}`;
      const who   = t.payee || t.memo || '—';
      return `<div class="cdp-txn-item">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;">
          <div style="min-width:0;">
            <div style="color:var(--text2);font-size:11px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${who}</div>
            <div class="cdp-txn-meta">${datum}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-shrink:0;">
            <span class="cdp-txn-amount" style="color:${t.amount<0?'var(--red)':'var(--green)'};">${fmt(Math.abs(t.amount))}</span>
            <span class="cdp-txn-icons">
              <button class="cdp-txn-icon-btn" onclick="openTxnModal(null,null,'${t.id}')" title="Bewerken">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button class="cdp-txn-icon-btn cdp-txn-icon-del" onclick="deleteTxnInline('${t.id}')" title="Verwijderen">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>
              </button>
            </span>
          </div>
        </div>
      </div>`;
    }).join('');
  }
}

function closeCatDetail() {
  _cdpCatId = null;
  document.querySelectorAll('.cat-row').forEach(r => r.classList.remove('cdp-selected'));
  document.getElementById('cdp-empty').style.display = 'flex';
  document.getElementById('cdp-content').style.display = 'none';
}

function cdpAanvul() {
  if (!_cdpCatId) return;
  const rta = calcReadyToAssign();
  if (rta <= 0) {
    alertModal('Er is niet genoeg klaar om toe te wijzen. Voeg eerst inkomen toe of maak budget vrij.');
    return;
  }
  const status = calcFundingRuleStatus(_cdpCatId);
  const bm = getBudgetMonth(currentYear, currentMonth);
  const current = Math.round((bm[_cdpCatId] || 0) * 100);
  const needed = status.fillNeed;
  if (status.isManual) {
    toast('Dit potje wordt nog niet automatisch aangevuld.');
    return;
  }
  if (needed <= 0) { toast('Dit potje is al volledig aangevuld.'); return; }
  if (rta < needed) {
    alertModal(`Onvoldoende saldo — er is ${fmt(rta)} klaar om toe te wijzen, maar ${fmt(needed)} nodig om dit potje volledig te vullen.`);
    return;
  }
  pushUndo();
  bm[_cdpCatId] = (current + needed) / 100;
  S.set('budgets', budgets);
  refreshBudgetSurfaces();
  toast(`${fmt(needed)} toegewezen — potje gevuld.`);
}

function cdpSetGoal() {
  if (!_cdpCatId) return;
  if (isIncomeCat(_cdpCatId)) {
    toast('Inkomen wordt niet automatisch aangevuld.');
    return;
  }
  openGoalModal(_cdpCatId);
}

function cdpCoverOverspending() {
  if (!_cdpCatId) return;
  const shortage = Math.abs(Math.min(0, calcCatAvailable(_cdpCatId)));
  if (shortage <= 0) {
    toast('Dit potje is niet overschreden.');
    return;
  }
  const cat = findCat(_cdpCatId);
  openMoveModal(null, 'cat', {
    purpose: 'shortage',
    amount: shortage,
    catName: cat ? cat.name.replace(/^\S+\s*/, '') : 'dit potje'
  });
  setTimeout(() => {
    const toSel      = document.getElementById('move-to');
    const fromSel    = document.getElementById('move-from');
    const amountInput = document.getElementById('move-amount');
    if (toSel) toSel.value = _cdpCatId;
    if (amountInput) amountInput.value = fmtInput(shortage);
    if (fromSel) fromSel.value = suggestMoveSourceForAmount(shortage, _cdpCatId) || (calcReadyToAssign() > 0 ? '__ready_to_assign__' : '');
    if (typeof renderMoveFundingOptions === 'function') renderMoveFundingOptions();
  }, 0);
}

function suggestMoveSourceForAmount(amount, targetCatId) {
  const candidates = groups
    .filter(grp => !isProtectedMoveSourceGroup(grp.name))
    .flatMap(grp => grp.cats)
    .filter(cat => cat.id !== targetCatId && !(typeof isProtectedBudgetCat === 'function' && isProtectedBudgetCat(cat.id)))
    .map(cat => ({ id: cat.id, available: calcCatAvailable(cat.id) }))
    .filter(item => item.available > 0)
    .sort((a, b) => {
      const aFull = a.available >= amount ? 0 : 1;
      const bFull = b.available >= amount ? 0 : 1;
      return aFull - bFull || b.available - a.available;
    });
  return candidates[0]?.id || '';
}

// ── Inklapbare secties ────────────────────────────────────────────────────
function cdpToggleSection(name) {
  const id = 'cdp-goal-section';
  const sec = document.getElementById(id);
  if (!sec) return;
  sec.classList.toggle('cdp-collapsed');
  try {
    localStorage.setItem('cdp.collapsed.goal',
      sec.classList.contains('cdp-collapsed') ? '1' : '0');
  } catch (e) {}
  document.querySelectorAll(`.mob-cat-drawer #${id}`).forEach(el => {
    el.classList.toggle('cdp-collapsed', sec.classList.contains('cdp-collapsed'));
  });
}

function applyCdpCollapsedStates() {
  const sec = document.getElementById('cdp-goal-section');
  if (!sec) return;
  let v = null;
  try { v = localStorage.getItem('cdp.collapsed.goal'); } catch (e) {}
  if (v === null) v = '0';
  sec.classList.toggle('cdp-collapsed', v === '1');
}

// ── YNAB-stijl labels ──────────────────────────────────────────────────────
const _WEEKDAYS = ['Zondag','Maandag','Dinsdag','Woensdag','Donderdag','Vrijdag','Zaterdag'];

function goalHeadline(goal) {
  if (!goal) return '';
  const amt = fmt(goal.amount);
  switch (goal.type) {
    case 'weekly':    return `${amt} per week`;
    case 'monthly':   return `${amt} per maand`;
    case 'quarterly': return `${amt} per kwartaal`;
    case 'yearly':    return `${amt} per jaar`;
    case 'target':    return `Spaar ${amt} in totaal`;
    case 'targetByDate': return `${amt}${goal.targetDate ? ` vóór ${fmtDateNL(goal.targetDate)}` : ''}`;
    case 'custom': {
      const verb = goal.mode === 'save' ? 'Spaar' : 'Vul aan tot';
      if (goal.repeat && goal.repeatN && goal.repeatUnit) {
        return `${verb} ${amt} per ${goal.repeatN} ${unitLabel(goal.repeatUnit, goal.repeatN)}`;
      }
      return `${verb} ${amt}`;
    }
    default: return amt;
  }
}

function goalTargetSubline(goal) {
  if (!goal) return '';
  if (goal.type === 'custom' && goal.mode === 'save') {
    return goal.targetDate ? `Voor ${fmtDateNL(goal.targetDate)}` : 'Zonder einddatum';
  }
  if (goal.type === 'target') {
    return goal.date || goal.targetDate ? `Voor ${fmtDateNL(goal.date || goal.targetDate)}` : 'Zonder einddatum';
  }
  if (goal.type === 'targetByDate') return goal.targetDate ? `Voor ${fmtDateNL(goal.targetDate)}` : 'Zonder einddatum';
  return goalDeadline(goal);
}

function unitLabel(u, n) {
  const labels = {
    day:   n === 1 ? 'dag'   : 'dagen',
    week:  n === 1 ? 'week'  : 'weken',
    month: n === 1 ? 'maand' : 'maanden',
    year:  n === 1 ? 'jaar'  : 'jaar',
  };
  return labels[u] || u;
}

function fmtDateNL(input) {
  if (!input) return '';
  const parts = String(input).split('-').map(Number);
  const [y, m, d] = parts;
  if (!y || !m) return String(input);
  const maand = ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december'][m-1];
  return d ? `${d} ${maand} ${y}` : `${maand} ${y}`;
}

function goalDeadline(goal) {
  if (!goal) return '';
  switch (goal.type) {
    case 'weekly':    return `Elke ${_WEEKDAYS[(goal.weekday ?? 6)]}`;
    case 'monthly': {
      const md = goal.monthDay;
      if (md === 'last' || md == null) return 'Voor het einde van de maand';
      return `Op de ${md}e van de maand`;
    }
    case 'quarterly': return 'Voor het einde van het kwartaal';
    case 'yearly':    return goal.targetDate ? `Voor ${fmtDateNL(goal.targetDate)}` : 'Voor het einde van het jaar';
    case 'target':    return goal.date || goal.targetDate ? `Voor ${fmtDateNL(goal.date || goal.targetDate)}` : '';
    case 'targetByDate': return goal.targetDate ? `Voor ${fmtDateNL(goal.targetDate)}` : '';
    case 'custom': {
      if (goal.repeat) return '';
      return goal.targetDate ? `Voor ${fmtDateNL(goal.targetDate)}` : '';
    }
    default: return '';
  }
}

// ── Maand-helpers voor Auto-toewijzen ──────────────────────────────────────
function prevYM(y, m) {
  return m <= 1 ? [y - 1, 12] : [y, m - 1];
}

function calcCatBudgetedForMonth(catId, y, m) {
  const bm = getBudgetMonth(y, m);
  return Math.round((bm[catId] ?? 0) * 100);
}

function calcCatSpentForMonth(catId, y, m) {
  if (isCCPaymentCat(catId)) {
    const accId = getCCPaymentAccId(catId);
    return accId ? -calcCCPayments(accId, y, m) : 0;
  }
  const key = monthKey(y, m);
  const income = isIncomeCat(catId);
  return transactions
    .filter(tx =>
      tx.catId === catId &&
      tx.date?.startsWith(key) &&
      (income ? tx.amount > 0 : tx.amount < 0) &&
      (income ? isCashAccount(tx.accId) : isBudgetActivityAccount(tx.accId))
    )
    .reduce((sum, tx) => sum + tx.amount, 0);
}

function calcCatAvgAssigned(catId) {
  let total = 0, count = 0;
  Object.values(budgets).forEach(bm => {
    if (bm && bm[catId] != null) {
      total += Math.round(bm[catId] * 100);
      count++;
    }
  });
  return count ? Math.round(total / count) : 0;
}

function calcCatAvgSpent(catId) {
  const monthly = {};
  transactions.forEach(tx => {
    if (tx.catId !== catId) return;
    if (tx.amount >= 0) return;
    if (!isBudgetActivityAccount(tx.accId)) return;
    const ym = tx.date?.slice(0, 7);
    if (!ym) return;
    monthly[ym] = (monthly[ym] || 0) + Math.abs(tx.amount);
  });
  const vals = Object.values(monthly);
  return vals.length ? Math.round(vals.reduce((s, v) => s + v, 0) / vals.length) : 0;
}

function setText(id, txt) {
  const el = document.getElementById(id);
  if (el) el.textContent = txt;
}

// ── Auto-toewijzen acties ──────────────────────────────────────────────────
async function cdpReduceOverfunding() {
  if (!_cdpCatId) return;
  const catId = _cdpCatId;
  const goal = goals[catId];
  if (!goal) { toast('Stel eerst een budget in.'); return; }
  const target = calcGoalTarget(catId);
  const current = calcCatBudgeted(catId);
  const over = current - target;
  if (over <= 0) { toast('Geen overbudget om te verminderen.'); return; }
  const ok = await kConfirm(`${fmt(over)} terug naar "Klaar om toe te wijzen"?`, 'Verminder overbudget');
  if (!ok) return;
  pushUndo();
  const bm = getBudgetMonth(currentYear, currentMonth);
  bm[catId] = target / 100;
  budgets[monthKey(currentYear, currentMonth)] = bm;
  S.set('budgets', budgets);
  refreshBudgetSurfaces();
  toast(`${fmt(over)} teruggezet.`);
}

async function cdpResetAvailable() {
  if (!_cdpCatId) return;
  const catId = _cdpCatId;
  const avail = calcCatAvailable(catId);
  if (avail <= 0) { toast('Beschikbaar is al 0 of negatief.'); return; }
  const ok = await kConfirm(`${fmt(avail)} terug naar "Klaar om toe te wijzen"?`, 'Reset beschikbaar');
  if (!ok) return;
  pushUndo();
  const bm = getBudgetMonth(currentYear, currentMonth);
  const current = calcCatBudgeted(catId);
  const newBudget = current - avail;
  bm[catId] = newBudget / 100;
  budgets[monthKey(currentYear, currentMonth)] = bm;
  S.set('budgets', budgets);
  refreshBudgetSurfaces();
  toast(`${fmt(avail)} teruggezet.`);
}

async function cdpResetAssigned() {
  if (!_cdpCatId) return;
  const catId = _cdpCatId;
  const current = calcCatBudgeted(catId);
  if (current <= 0) { toast('Geen budget om te resetten.'); return; }
  const ok = await kConfirm(`${fmt(current)} terug naar "Klaar om toe te wijzen"?`, 'Reset budget');
  if (!ok) return;
  pushUndo();
  const bm = getBudgetMonth(currentYear, currentMonth);
  bm[catId] = 0;
  budgets[monthKey(currentYear, currentMonth)] = bm;
  S.set('budgets', budgets);
  refreshBudgetSurfaces();
  toast(`${fmt(current)} teruggezet.`);
}

function cdpAddTxn() {
  if (_cdpCatId) openTxnModal(_cdpCatId, _cdpGrpId);
}

function cdpRename() {
  if (!_cdpCatId) return;
  inlineRenameCat(_cdpCatId);
  setTimeout(refreshCatDetail, 100);
}

function cdpDelete() {
  if (!_cdpCatId || !_cdpGrpId) return;
  inlineDeleteCat(_cdpCatId, _cdpGrpId);
  closeCatDetail();
}

// ── ZOEKBALK ──────────────────────────────────────────────────────────────
let _budgetSearch = '';

// Zoekterm ophalen in renderBudget via element
function getBudgetSearch() {
  return (document.getElementById('budget-search')?.value || '').toLowerCase().trim();
}

// ── MAANDNOTITIES ─────────────────────────────────────────────────────────
let monthNotes = S.get('monthNotes', {});

function saveMonthNote(val) {
  const key = monthKey(currentYear, currentMonth);
  monthNotes[key] = val;
  S.set('monthNotes', monthNotes);
}

function toggleMonthNote() {
  const bar = document.getElementById('month-note-bar');
  if (!bar) return;
  const isOpen = bar.style.display !== 'none';
  bar.style.display = isOpen ? 'none' : 'block';
  if (!isOpen) {
    const key = monthKey(currentYear, currentMonth);
    const inp = document.getElementById('month-note-input');
    if (inp) { inp.value = monthNotes[key] || ''; inp.focus(); }
  }
  const btn = document.getElementById('btn-month-note');
  if (btn) btn.classList.toggle('active', !isOpen);
}

function refreshMonthNote() {
  const key = monthKey(currentYear, currentMonth);
  const inp = document.getElementById('month-note-input');
  const bar = document.getElementById('month-note-bar');
  if (inp) inp.value = monthNotes[key] || '';
  // Toon notitie-balk automatisch als er een notitie is
  const hasNote = !!(monthNotes[key]?.trim());
  if (bar) bar.style.display = hasNote ? 'block' : 'none';
  const btn = document.getElementById('btn-month-note');
  if (btn) btn.classList.toggle('active', hasNote);
}

// ── BUDGET KOPIËREN ───────────────────────────────────────────────────────
async function copyPrevMonthBudget() {
  let py = currentYear, pm = currentMonth - 1;
  if (pm < 1) { pm = 12; py--; }
  const prevBm = getBudgetMonth(py, pm);
  const curBm  = getBudgetMonth(currentYear, currentMonth);

  const prevHasData = Object.keys(prevBm).length > 0;
  if (!prevHasData) { toast('Geen budget gevonden voor vorige maand.'); return; }

  const ok = await kConfirm(
    `Budgetbedragen van ${maandNaam(py, pm)} kopiëren naar ${maandNaam(currentYear, currentMonth)}? Bestaande bedragen worden overschreven.`,
    'Kopieer budget'
  );
  if (!ok) return;

  pushUndo();
  Object.entries(prevBm).forEach(([catId, val]) => {
    curBm[catId] = val;
  });
  S.set('budgets', budgets);
  refreshBudgetSurfaces();
  toast(`Budget gekopieerd van ${maandNaam(py, pm)}.`);
}

// ── CATEGORIE NOTITIES ────────────────────────────────────────────────────
let catNotes = S.get('catNotes', {});

function saveCatNote(val) {
  if (!_cdpCatId) return;
  catNotes[_cdpCatId] = val;
  S.set('catNotes', catNotes);
}
