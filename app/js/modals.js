// ── REKENING TYPE CHANGE ─────────────────────────────────────────────────
const OFF_BUDGET_TYPES    = Object.keys(ACCOUNT_TYPES).filter(type => !isBudgetActivityAccountType(type));
const ON_BUDGET_TYPES     = Object.keys(ACCOUNT_TYPES).filter(type => isBudgetActivityAccountType(type));

function onAccTypeChange() {
  const sel = document.getElementById('acc-type');
  if (!sel) return;
}

// ── MODALS.JS — Modal open/close/save functies ────────────────────────────

// ── GENERIEK ──────────────────────────────────────────────────────────────
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('active');
}

// Klik buiten modal sluit hem
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
});

// ── TRANSACTIE MODAL ──────────────────────────────────────────────────────
let _editTxnId = null;
const TXN_TARGET_ACCOUNT_PREFIX = '__acc__:';

function getDefaultSpendAccount() {
  return accounts.find(acc => acc.type === 'checking' && isBudgetActivityAccount(acc.id))
    || accounts.find(acc => isCashAccount(acc.id))
    || accounts.find(acc => isBudgetActivityAccount(acc.id))
    || null;
}

function cleanBudgetName(name) {
  return String(name || '').replace(/^\S+\s*/, '').trim().toLowerCase();
}

function normalizePayeeName(name) {
  return String(name || '').trim().replace(/\s+/g, ' ').toLowerCase();
}

function findLastCategoryForPayee(payee) {
  const normalized = normalizePayeeName(payee);
  if (!normalized) return null;

  return transactions
    .filter(tx =>
      tx.id !== _editTxnId &&
      tx.catId &&
      !tx.transferId &&
      normalizePayeeName(tx.payee) === normalized &&
      findCat(tx.catId)
    )
    .sort((a, b) => {
      const byDate = (b.date || '').localeCompare(a.date || '');
      if (byDate !== 0) return byDate;
      return (b.createdAt || '').localeCompare(a.createdAt || '');
    })[0]?.catId || null;
}

function txnTargetAccountValue(accId) {
  return TXN_TARGET_ACCOUNT_PREFIX + accId;
}

function txnTargetAccountId(value) {
  return String(value || '').startsWith(TXN_TARGET_ACCOUNT_PREFIX)
    ? String(value).slice(TXN_TARGET_ACCOUNT_PREFIX.length)
    : null;
}

function onTxnPayeeInput() {
  const payeeEl = document.getElementById('txn-payee');
  const catSel = document.getElementById('txn-cat');
  if (!payeeEl || !catSel || _editTxnId) return;
  if (catSel.dataset.manualCategory === 'true') return;

  const catId = findLastCategoryForPayee(payeeEl.value);
  if (!catId) {
    if (catSel.dataset.autoCategory === 'true') {
      catSel.value = '';
      catSel.dataset.autoCategory = 'false';
      delete catSel.dataset.autoPayee;
      updateTxnForSelectedCategory();
    }
    return;
  }

  if (catSel.value && catSel.dataset.autoCategory !== 'true') return;
  catSel.value = catId;
  catSel.dataset.autoCategory = 'true';
  catSel.dataset.autoPayee = normalizePayeeName(payeeEl.value);
  updateTxnForSelectedCategory();
}

function onTxnAccChange() {
  updateTxnForSelectedCategory();
}

function onTxnCatChange() {
  const catSel = document.getElementById('txn-cat');
  if (catSel) {
    catSel.dataset.manualCategory = 'true';
    catSel.dataset.autoCategory = 'false';
    delete catSel.dataset.autoPayee;
  }
  const catId  = document.getElementById('txn-cat').value;
  const payeeEl = document.getElementById('txn-payee');

  if (!_editTxnId && catId && payeeEl && !payeeEl.value.trim() && categoryMeta?.[catId]?.description) {
    payeeEl.value = categoryMeta[catId].description;
  }
  updateTxnForSelectedCategory();
}

function updateTxnForSelectedCategory() {
  const catId = document.getElementById('txn-cat')?.value || null;
  const accSel = document.getElementById('txn-acc');
  if (!accSel) return;
}

function openTxnModal(catId = null, grpId = null, txnOrId = null) {
  const txn = typeof txnOrId === 'string'
    ? transactions.find(t => t.id === txnOrId) ?? null
    : txnOrId;
  const transferPair = txn?.transferId
    ? transactions.find(t => t.transferId === txn.transferId && t.id !== txn.id)
    : null;
  const formTxn = txn?.transferId && txn.amount > 0 && transferPair ? transferPair : txn;
  const formTransferPair = formTxn?.transferId
    ? transactions.find(t => t.transferId === formTxn.transferId && t.id !== formTxn.id)
    : null;
  _editTxnId = formTxn ? formTxn.id : null;

  document.getElementById('txn-date').value      = formTxn ? formTxn.date : vandaag();
  document.getElementById('txn-payee').value     = formTxn ? (formTxn.payee ?? '') : '';
  document.getElementById('txn-memo').value      = formTxn?.transferId ? '' : (formTxn ? (formTxn.memo ?? '') : '');
  const amountInput = document.getElementById('txn-amount');
  if (amountInput) {
    amountInput.setAttribute('inputmode', 'decimal');
    amountInput.setAttribute('pattern', '[0-9]*[,.]?[0-9]*');
  }

  const absAmount = formTxn ? Math.abs(formTxn.amount) / 100 : 0;
  amountInput.value = absAmount > 0
    ? absAmount.toFixed(2).replace('.', ',')
    : '';

  const accSel = document.getElementById('txn-acc');
  accSel.innerHTML = '<option value="">— Rekening —</option>';
  accounts.forEach(acc => {
    const opt = document.createElement('option');
    opt.value = acc.id;
    opt.textContent = acc.name;
    accSel.appendChild(opt);
  });

  const catSel = document.getElementById('txn-cat');
  const isMobileEntry = document.body.classList.contains('mobile-entry') || window.innerWidth <= 768;
  catSel.innerHTML = `<option value="">${isMobileEntry ? '— Potje —' : '— Naar —'}</option>`;
  catSel.dataset.manualCategory = formTxn || catId ? 'true' : 'false';
  catSel.dataset.autoCategory = 'false';
  delete catSel.dataset.autoPayee;
  groups.forEach(grp => {
    const optGrp = document.createElement('optgroup');
    optGrp.label = grp.name;
    grp.cats.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat.id;
      opt.textContent = typeof txnCategoryOptionLabel === 'function'
        ? txnCategoryOptionLabel(cat)
        : cat.name;
      optGrp.appendChild(opt);
    });
    catSel.appendChild(optGrp);
  });
  const accOptGrp = document.createElement('optgroup');
  accOptGrp.label = isMobileEntry ? 'Overboeking naar eigen rekening' : 'Eigen rekeningen';
  accounts.forEach(acc => {
    const opt = document.createElement('option');
    opt.value = txnTargetAccountValue(acc.id);
    opt.textContent = typeof txnAccountTargetOptionLabel === 'function'
      ? txnAccountTargetOptionLabel(acc)
      : `⇄ ${acc.name}`;
    accOptGrp.appendChild(opt);
  });
  catSel.appendChild(accOptGrp);

  // Rekening en categorie invullen
  if (formTxn) {
    accSel.value = formTxn.accId ?? '';
    catSel.value = formTransferPair ? txnTargetAccountValue(formTransferPair.accId) : (formTxn.catId ?? '');
  } else if (catId) {
    catSel.value = catId;
    if (categoryMeta?.[catId]?.description) {
      document.getElementById('txn-payee').value = categoryMeta[catId].description;
    }
    const defaultAcc = getDefaultSpendAccount();
    accSel.value = defaultAcc?.id || '';
  } else {
    const defaultAcc = getDefaultSpendAccount();
    accSel.value = defaultAcc?.id || '';
    onTxnPayeeInput();
  }

  updateTxnForSelectedCategory();

  document.getElementById('modal-txn-title').textContent =
    formTxn ? 'Transactie bewerken' : (isMobileEntry ? 'Nieuwe transactie' : 'Transactie');

  const deleteBtn = document.getElementById('btn-delete-txn');
  if (deleteBtn) deleteBtn.style.display = formTxn ? 'block' : 'none';

  openModal('modal-txn');
  if (!document.body.classList.contains('mobile-entry') && window.innerWidth > 768) {
    setTimeout(() => document.getElementById('txn-payee').focus(), 50);
  }
}

function saveTxn() {
  const accId   = document.getElementById('txn-acc').value;
  const target  = document.getElementById('txn-cat').value || '';
  const toAccId = txnTargetAccountId(target);
  const catId   = toAccId ? null : (target || null);
  const payee   = document.getElementById('txn-payee').value.trim();
  const memo    = document.getElementById('txn-memo').value.trim();
  const date    = document.getElementById('txn-date').value;
  const cleared = true;
  const raw     = document.getElementById('txn-amount').value;

  if (!accId) { toast('Kies een rekening.'); return void 0; return; }
  if (!target) { toast('Kies waar het geld naartoe gaat.'); return void 0; return; }
  if (!date)  { toast('Kies een datum.'); return void 0; return; }
  if (!toAccId && !isBudgetActivityAccount(accId)) { toast('Gebruik een on-budget rekening voor budgettransacties.'); return void 0; return; }
  if (toAccId && accId === toAccId) { toast('Van en naar zijn dezelfde rekening.'); return void 0; return; }

  // Teken bepalen op basis van categorie: Inkomen-groep = positief, rest = negatief
  const absCents = parseBedrag(raw);
  if (absCents === 0) { toast('Vul een bedrag in.'); return void 0; return; }
  const incomeGrp = groups.find(g => g.name === 'Inkomen');
  const isTxnIncome = catId && incomeGrp?.cats.some(c => c.id === catId);
  const amount = isTxnIncome ? absCents : -absCents;

  pushUndo();
  if (toAccId) {
    const old = _editTxnId ? transactions.find(t => t.id === _editTxnId) : null;
    const transferId = old?.transferId || genId();
    if (_editTxnId) {
      transactions = old?.transferId
        ? transactions.filter(t => t.transferId !== old.transferId)
        : transactions.filter(t => t.id !== _editTxnId);
    }
    const fromAcc = accounts.find(a => a.id === accId);
    const toAcc = accounts.find(a => a.id === toAccId);
    const transferPayee = payee || `Overboeking naar ${toAcc?.name || 'rekening'}`;
    transactions.push({
      id: genId(), date, accId,
      catId: null, payee: transferPayee,
      memo: memo || `→ ${toAcc?.name ?? ''}`,
      amount: -absCents, cleared,
      transferId, createdAt: new Date().toISOString()
    });
    transactions.push({
      id: genId(), date, accId: toAccId,
      catId: null, payee: transferPayee,
      memo: memo || `← ${fromAcc?.name ?? ''}`,
      amount: absCents, cleared,
      transferId, createdAt: new Date().toISOString()
    });
    S.set('transactions', transactions);
    closeModal('modal-txn');
    refreshDataViews();
    toast(`${fmt(absCents)} overgeboekt naar ${toAcc?.name || 'rekening'}.`);
    return;
  }

  if (_editTxnId) {
    const idx = transactions.findIndex(t => t.id === _editTxnId);
    if (idx > -1) {
      const old = transactions[idx];
      if (old.transferId) transactions = transactions.filter(t => t.transferId !== old.transferId);
      const nextIdx = transactions.findIndex(t => t.id === _editTxnId);
      if (nextIdx > -1) transactions[nextIdx] = { ...old, accId, catId, payee, memo, date, cleared, amount, transferId: undefined };
      else transactions.push({ id: _editTxnId, accId, catId, payee, memo, date, cleared, amount, createdAt: old.createdAt || new Date().toISOString() });
    }
  } else {
    transactions.push({
      id: genId(), date, accId, catId, payee, memo,
      amount, cleared, createdAt: new Date().toISOString()
    });
  }

  S.set('transactions', transactions);
  closeModal('modal-txn');
  refreshDataViews();
}

async function deleteTxn() {
  if (!_editTxnId) return;
  const tx = transactions.find(t => t.id === _editTxnId);
  if (!await kConfirm(tx?.transferId ? 'Overboeking verwijderen?' : 'Transactie verwijderen?','Verwijderen',true)) return;
  pushUndo();
  transactions = tx?.transferId
    ? transactions.filter(t => t.transferId !== tx.transferId)
    : transactions.filter(t => t.id !== _editTxnId);
  S.set('transactions', transactions);
  closeModal('modal-txn');
  refreshDataViews();
}

// ── REKENING MODAL ────────────────────────────────────────────────────────
let _editAccId = null;

function openAccModal() {
  _editAccId = null;
  document.getElementById('acc-name').value     = '';
  document.getElementById('acc-type').value     = 'checking';
  onAccTypeChange();
  document.getElementById('acc-balance').value  = '';
  document.querySelector('#modal-acc .modal-header span').textContent = 'Rekening toevoegen';
  document.querySelector('#modal-acc .modal-footer .btn-primary').textContent = 'Toevoegen';
  openModal('modal-acc');
  setTimeout(() => document.getElementById('acc-name').focus(), 50);
}

function accCtxEdit() {
  closeAccCtxMenu();
  const acc = accounts.find(a => a.id === _ctxAccId);
  if (!acc) return;
  _editAccId = acc.id;
  document.getElementById('acc-name').value = acc.name;
  document.getElementById('acc-type').value = normalizeAccountType(acc.type || 'checking');
  onAccTypeChange();
  document.getElementById('acc-balance').value = fmtInput(calcAccountBalance(acc.id));
  document.querySelector('#modal-acc .modal-header span').textContent = 'Rekening bewerken';
  document.querySelector('#modal-acc .modal-footer .btn-primary').textContent = 'Opslaan';
  openModal('modal-acc');
  setTimeout(() => document.getElementById('acc-name').focus(), 50);
}

function saveAcc() {
  const name = document.getElementById('acc-name').value.trim();
  const type = normalizeAccountType(document.getElementById('acc-type').value);
  const raw  = document.getElementById('acc-balance').value;
  if (!name) { toast('Vul een naam in.'); return; }

  const onBudget = isBudgetActivityAccountType(type);

  pushUndo();

  if (_editAccId) {
    // Bewerken
    const acc = accounts.find(a => a.id === _editAccId);
    if (acc) {
      const currentBal = calcAccountBalance(acc.id);
      const newBal = parseBedrag(raw);
      const diff = newBal - currentBal;
      acc.name = name;
      acc.type = type;
      acc.onBudget = onBudget;
      if (diff !== 0) {
        transactions.push({
          id: genId(),
          date: vandaag(),
          accId: acc.id,
          catId: null,
          payee: 'Saldocorrectie',
          memo: `Aanpassing van ${fmt(currentBal)} naar ${fmt(newBal)}`,
          amount: diff,
          cleared: true,
          createdAt: new Date().toISOString()
        });
        S.set('transactions', transactions);
      }
    }
    _editAccId = null;
  } else {
    // Nieuw — maak rekening aan
    const accId = genId();
    const cents = parseBedrag(raw);
    accounts.push({
      id: accId, name, type, openingBalance: 0,
      onBudget, createdAt: new Date().toISOString()
    });

    const openingCatId = isCashAccountType(type)
      ? (cents >= 0 ? getDefaultIncomeCatId() : getPreKeeepCatId())
      : null;
    transactions.push({
      id: genId(), date: vandaag(), accId,
      catId: openingCatId,
      payee: 'Beginsaldo', memo: '',
      amount: cents, cleared: true,
      isOpeningBalance: true,
      createdAt: new Date().toISOString()
    });
    S.set('transactions', transactions);

    if (isCashAccountType(type) && cents < 0 && openingCatId) {
      goals[openingCatId] = {
        type: 'target',
        amount: Math.abs(cents),
        date: null,
        startMonth: monthKey(currentYear, currentMonth)
      }
      S.set('goals', goals);
    }
  }

  S.set('accounts', accounts);
  if (typeof ensureCreditCardPaymentGroup === 'function') ensureCreditCardPaymentGroup();
  closeModal('modal-acc');
  refreshDataViews();
  rebuildAccFilters();
}

// ── GROEP / CATEGORIE ─────────────────────────────────────────────────────
async function addGroup() {
  const name = await kPrompt('Naam van de nieuwe hoofdcategorie:', '', 'Hoofdcategorie toevoegen');
  if (!name?.trim()) return;
  pushUndo();
  const group = { id: genId(), name: name.trim(), cats: [] };
  groups.push(group);
  grpState[group.id] = true;
  localStorage.setItem('keeep_grpState', JSON.stringify(grpState));
  S.set('groups', groups);
  refreshDataViews();
  setTimeout(() => {
    const el = document.querySelector(`.group-header[data-grp-id="${group.id}"]`);
    if (!el) return;
    el.scrollIntoView({ block: 'center', behavior: 'smooth' });
    el.classList.add('group-header-new');
    setTimeout(() => el.classList.remove('group-header-new'), 1400);
  }, 60);
  toast(`Hoofdcategorie "${group.name}" toegevoegd.`);
}
window.addGroup = addGroup;

// Standaard emoji per groepsnaam
const GROUP_DEFAULT_EMOJI = {
  'Vaste Lasten':      ['🏡','🔑','🪟','🛁','🔌','🌡️'],
  'Vaste lasten':      ['🏡','🔑','🪟','🛁','🔌','🌡️'],
  'Dagelijks leven':   ['🛒','💊','🚲','🧽','💇','🩺'],
  'Vrije ruimte':      ['🎁','🎡','🎮','🎨','☕','🍽️'],
  'Voor later':        ['🛡️','📅','🛍️','🔧','🛠️','✈️'],
  'Abonnementen':      ['📱','🎧','📰','🎮','📡','🔔'],
  'Noodzakelijk':      ['🧴','💊','🧹','🪥','🧺','🛍️'],
  'Auto':              ['🅿️','🗺️','🚦','🔋','🛞','🪝'],
  'Leuk & Lekker':     ['🎈','🎭','🎟️','🏖️','🎪','🎠'],
  'Spaardoelen':       ['🎯','💎','🏆','🌟','🪙','📈'],
  'Schulden':          ['📄','🔖','📑','🗂️','📝','💼'],
  'Pre-Keeep Schulden':['📄','🔖','📑','🗂️','📝','💼'],
  'Inkomen':           ['💵','🤝','📊','🏧','💹','🎁'],
  'Transport':         ['🚲','🛵','🚇','✈️','🚢','🛺'],
  'Gezondheid':        ['🧘','🏃','🦷','👁️','🩺','💉'],
  'Gezin':             ['👧','👦','🧒','🐶','🐱','🏫'],
  'Persoonlijk':       ['✂️','💆','🧖','👔','💄','🪮'],
  'Vrijetijd':         ['🎲','🎨','📚','🎸','⚽','🎳'],
  'Huis & Tuin':       ['🪴','🌱','🛋️','🪑','🖼️','🏺'],
};

async function addCategory(grpId) {
  const grp = groups.find(g => g.id === grpId);
  if (!grp) return;
  openCatCreateModal(grpId);
}

// ── GELD VERPLAATSEN MODAL ────────────────────────────────────────────────
let _moveMode = 'cat'; // 'cat' of 'acc'
let _movePurpose = 'move';
const MOVE_SOURCE_RTA = '__ready_to_assign__';

function isProtectedMoveSourceGroup(groupName) {
  const normalized = (groupName || '').toLowerCase();
  return normalized === 'inkomen' || normalized.includes('vaste lasten');
}

function isProtectedMoveSourceCat(catId) {
  if (typeof isProtectedBudgetCat === 'function' && isProtectedBudgetCat(catId)) return true;
  return groups.some(grp =>
    isProtectedMoveSourceGroup(grp.name) &&
    grp.cats.some(cat => cat.id === catId)
  );
}

function setMoveMode(mode) {
  _moveMode = 'cat';
  document.getElementById('move-cat-fields').style.display = '';
  const sourcePanel = document.getElementById('move-source-panel');
  if (sourcePanel) sourcePanel.style.display = '';
  if (_movePurpose !== 'shortage') document.getElementById('modal-move-title').textContent = 'Geld verplaatsen';
  renderMoveFundingOptions();
}

function setMovePurpose(purpose = 'move', details = {}) {
  _movePurpose = purpose;
  const titleEl = document.getElementById('modal-move-title');
  const contextEl = document.getElementById('move-context-text');
  const submitBtn = document.getElementById('move-submit-btn');
  if (purpose === 'shortage') {
    const catName = details.catName || 'dit potje';
    const amount = details.amount || 0;
    if (titleEl) titleEl.textContent = 'Tekort oplossen';
    if (contextEl) {
      contextEl.style.display = 'block';
      contextEl.innerHTML = `Je komt <strong>${fmt(amount)}</strong> tekort in ${escapeHtml(catName)}. Kies uit welk potje je geld wilt verplaatsen.`;
    }
    if (submitBtn) submitBtn.textContent = `Verplaats ${fmt(amount)}`;
  } else {
    if (titleEl) titleEl.textContent = 'Geld verplaatsen';
    if (contextEl) {
      contextEl.style.display = 'none';
      contextEl.textContent = '';
    }
    if (submitBtn) submitBtn.textContent = 'Verplaatsen';
  }
}

function openMoveModal(fromCatId = null, startMode = null, options = {}) {
  setMovePurpose(options.purpose || 'move', options);
  // Categorie-selects vullen
  const fromSel = document.getElementById('move-from');
  const toSel   = document.getElementById('move-to');
  [fromSel, toSel].forEach((sel, idx) => {
    sel.innerHTML = '<option value="">— Potje —</option>';
    if (idx === 0) {
      const rtaOpt = document.createElement('option');
      rtaOpt.value = MOVE_SOURCE_RTA;
      rtaOpt.textContent = `Nog toe te wijzen · ${fmt(calcReadyToAssign())}`;
      sel.appendChild(rtaOpt);
    }
    groups.forEach(grp => {
      if (idx === 0 && isProtectedMoveSourceGroup(grp.name)) return;
      const og = document.createElement('optgroup');
      og.label = grp.name;
      grp.cats.forEach(cat => {
        if (idx === 0 && typeof isProtectedBudgetCat === 'function' && isProtectedBudgetCat(cat.id)) return;
        const opt = document.createElement('option');
        opt.value = cat.id;
        opt.textContent = idx === 0
          ? `${cat.name} · ${fmt(calcCatAvailable(cat.id))} beschikbaar`
          : cat.name;
        og.appendChild(opt);
      });
      sel.appendChild(og);
    });
  });
  if (fromCatId) fromSel.value = fromCatId;

  document.getElementById('move-amount').value = options.amount ? fmtInput(options.amount) : '';

  setMoveMode('cat');

  openModal('modal-move');
  renderMoveFundingOptions();
}

function renderMoveFundingOptions() {
  const panel = document.getElementById('move-source-panel');
  const list = document.getElementById('move-source-list');
  if (!panel || !list) return;
  panel.style.display = _moveMode === 'cat' ? '' : 'none';
  if (_moveMode !== 'cat') return;

  const amount = parseBedrag(document.getElementById('move-amount')?.value || '') || 0;
  const toId = document.getElementById('move-to')?.value || '';
  const fromId = document.getElementById('move-from')?.value || '';
  const neededEl = document.getElementById('move-source-needed');
  if (neededEl) neededEl.textContent = amount > 0 ? `Nodig: ${fmt(amount)}` : '';
  const submitBtn = document.getElementById('move-submit-btn');
  if (submitBtn && _movePurpose === 'shortage') submitBtn.textContent = amount > 0 ? `Verplaats ${fmt(amount)}` : 'Verplaats tekort';

  list.innerHTML = '';
  let count = 0;

  const rta = calcReadyToAssign();
  if (rta > 0) {
    const canFullyCover = amount > 0 && rta >= amount;
    const canPartlyCover = amount > 0 && !canFullyCover;
    const button = document.createElement('button');
    button.type = 'button';
    button.className =
      `move-source-item move-source-rta move-source-${amount > 0 ? (canFullyCover ? 'safe' : canPartlyCover ? 'partial' : 'none') : 'safe'}` +
      (fromId === MOVE_SOURCE_RTA ? ' is-selected' : '');

    const nameEl = document.createElement('span');
    nameEl.className = 'move-source-name';
    nameEl.textContent = 'Nog toe te wijzen';
    const amountEl = document.createElement('span');
    amountEl.className = 'move-source-amount';
    amountEl.textContent = fmt(rta);
    const badgeEl = document.createElement('span');
    badgeEl.className = 'move-source-badge';
    badgeEl.textContent = amount > 0
      ? (canFullyCover ? 'Eerst gebruiken' : 'Deels')
      : 'Vrij geld';
    button.append(nameEl, amountEl, badgeEl);
    button.onclick = () => {
      const fromSel = document.getElementById('move-from');
      if (fromSel) fromSel.value = MOVE_SOURCE_RTA;
      renderMoveFundingOptions();
    };
    list.appendChild(button);
    count++;
  }

  groups.forEach(grp => {
    if (isProtectedMoveSourceGroup(grp.name)) return;
    const items = grp.cats
      .filter(cat =>
        cat.id !== toId &&
        !isIncomeCat(cat.id) &&
        !(typeof isProtectedBudgetCat === 'function' && isProtectedBudgetCat(cat.id))
      )
      .map(cat => ({ cat, available: calcCatAvailable(cat.id) }))
      .filter(item => item.available > 0);
    if (!items.length) return;

    const groupEl = document.createElement('div');
    groupEl.className = 'move-source-group';
    groupEl.textContent = grp.name;
    list.appendChild(groupEl);

    items
      .sort((a, b) => b.available - a.available)
      .forEach(({ cat, available }) => {
        const canFullyCover = amount > 0 && available >= amount;
        const canPartlyCover = amount > 0 && !canFullyCover;
        const tone = amount > 0
          ? (canFullyCover ? 'safe' : canPartlyCover ? 'partial' : 'none')
          : 'safe';
        const button = document.createElement('button');
        button.type = 'button';
        button.className =
          `move-source-item move-source-${tone}` +
          (cat.id === fromId ? ' is-selected' : '');
        const nameEl = document.createElement('span');
        nameEl.className = 'move-source-name';
        nameEl.textContent = cat.name;
        const amountEl = document.createElement('span');
        amountEl.className = 'move-source-amount';
        amountEl.textContent = fmt(available);
        const badgeEl = document.createElement('span');
        badgeEl.className = 'move-source-badge';
        badgeEl.textContent = amount > 0
          ? (canFullyCover ? 'Veilig' : canPartlyCover ? 'Deels' : 'Geen ruimte')
          : 'Ruimte';
        button.append(nameEl, amountEl, badgeEl);
        button.onclick = () => {
          const fromSel = document.getElementById('move-from');
          if (fromSel) fromSel.value = cat.id;
          renderMoveFundingOptions();
        };
        list.appendChild(button);
        count++;
      });
  });

  if (!count) {
    list.innerHTML = '<div class="move-source-group">Geen potjes met beschikbare ruimte</div>';
  }
}

function doMove() {
  const cents = parseBedrag(document.getElementById('move-amount').value);
  if (cents <= 0) { toast('Vul een bedrag in.'); return void 0; return; }
  pushUndo();

  const fromId = document.getElementById('move-from').value;
  const toId   = document.getElementById('move-to').value;
  if (!fromId || !toId) { toast('Kies een bron en een budget.'); return void 0; return; }
  if (fromId === toId)  { toast('Van en naar zijn hetzelfde.'); return void 0; return; }
  if (isProtectedMoveSourceCat(fromId)) {
    toast('Vaste lasten zijn beschermd en kunnen niet als bron worden gebruikt.');
    return void 0; return;
  }
  if (fromId === MOVE_SOURCE_RTA && calcReadyToAssign() < cents) {
    toast('Niet genoeg beschikbaar om toe te wijzen.');
    return void 0; return;
  }

  const bm  = getBudgetMonth(currentYear, currentMonth);
  const key = monthKey(currentYear, currentMonth);
  if (fromId !== MOVE_SOURCE_RTA) {
    bm[fromId] = ((bm[fromId] ?? 0) * 100 - cents) / 100;
  }
  bm[toId]   = ((bm[toId]   ?? 0) * 100 + cents) / 100;
  budgets[key] = bm;
  S.set('budgets', budgets);
  closeModal('modal-move');
  setMovePurpose('move');
  if (typeof refreshBudgetSurfaces === 'function') refreshBudgetSurfaces();
  else {
    render();
    if (typeof refreshCatDetail === 'function' && _cdpCatId) refreshCatDetail();
  }
  toast(fromId === MOVE_SOURCE_RTA
    ? `${fmt(cents)} toegewezen.`
    : `${fmt(cents)} verplaatst tussen potjes.`);
}

// ── FILTERS HERBOUWEN ─────────────────────────────────────────────────────
function rebuildAccFilters() {
  const sel = document.getElementById('txn-facc');
  if (!sel) return;
  const current = sel.value;
  sel.innerHTML = '<option value="">Alle rekeningen</option>';
  accounts.forEach(acc => {
    const opt = document.createElement('option');
    opt.value = acc.id;
    opt.textContent = acc.name;
    sel.appendChild(opt);
  });
  sel.value = current;
}

function rebuildCatFilters() {
  const sel = document.getElementById('txn-fcat');
  if (!sel) return;
  const current = sel.value;
  sel.innerHTML = '<option value="">Alle potjes</option>';
  groups.forEach(grp => {
    const og = document.createElement('optgroup');
    og.label = grp.name;
    grp.cats.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat.id;
      opt.textContent = cat.name;
      og.appendChild(opt);
    });
    sel.appendChild(og);
  });
  sel.value = current;
}

// ── INKOMEN MODAL ─────────────────────────────────────────────────────────
function openIncomeModal() {
  document.getElementById('income-date').value   = vandaag();
  document.getElementById('income-payee').value  = '';
  document.getElementById('income-amount').value = '';
  document.getElementById('income-memo').value   = '';

  // Rekeningen
  const accSel = document.getElementById('income-acc');
  accSel.innerHTML = '<option value="">— Rekening —</option>';
  const cashAccounts = accounts.filter(acc => isCashAccount(acc.id));
  const firstChecking = accounts.find(acc => acc.type === 'checking' && isCashAccount(acc.id));
  cashAccounts.forEach(acc => {
    const opt = document.createElement('option');
    opt.value = acc.id;
    opt.textContent = acc.name;
    accSel.appendChild(opt);
  });
  accSel.value = firstChecking?.id || cashAccounts[0]?.id || '';

  openModal('modal-income');
  setTimeout(() => document.getElementById('income-amount').focus(), 50);
}

function saveIncome() {
  const accId = document.getElementById('income-acc').value;
  const catId = groups.find(g => g.name === 'Inkomen')?.cats?.[0]?.id || null;
  const payee = document.getElementById('income-payee').value.trim();
  const memo  = document.getElementById('income-memo').value.trim();
  const date  = document.getElementById('income-date').value || vandaag();
  const cents = parseBedrag(document.getElementById('income-amount').value);

  if (!accId)    { toast('Kies een rekening.'); return; }
  if (cents <= 0){ toast('Vul een bedrag in.'); return; }
  if (!isCashAccount(accId)) { toast('Inkomen kan alleen naar een rekening met eigen geld.'); return; }
  if (!catId) { toast('Maak eerst een inkomenspotje aan.'); return; }

  pushUndo();
  transactions.push({
    id: genId(), date, accId,
    catId, payee, memo,
    amount: cents, cleared: true,
    createdAt: new Date().toISOString()
  });

  S.set('transactions', transactions);
  closeModal('modal-income');
  refreshDataViews();
  toast('✓ Inkomen toegevoegd.');
}


// ── DOEL MODAL ────────────────────────────────────────────────────────────
let _goalCatId = null;
let _goalTab   = 'monthly';

// Map legacy types naar de nieuwe tab-set.
function _mapLegacyGoalType(t) {
  if (t === 'targetByDate') return 'custom';
  if (t === 'manual') return 'manual';
  if (t === 'quarterly') return 'custom';   // wordt herhaald per 3 maanden
  if (t === 'target')    return 'custom';
  if (t === 'weekly' || t === 'monthly' || t === 'yearly' || t === 'custom') return t === 'weekly' || t === 'yearly' ? 'monthly' : t;
  return 'monthly';
}

function openGoalModal(catId) {
  if (isIncomeCat(catId)) {
    toast('Inkomen wordt niet automatisch aangevuld.');
    return;
  }
  _goalCatId = catId;
  const cat  = findCat(catId);
  document.getElementById('modal-goal-title').textContent =
    `${cat?.name ?? catId}`;

  const existing = goals[catId] || {};
  const tab      = _mapLegacyGoalType(existing.type);
  _goalTab = tab;

  // Bedrag
  document.getElementById('goal-amount').value = existing.amount
    ? (existing.amount / 100).toFixed(2).replace('.', ',') : '';

  // Wekelijks
  document.getElementById('goal-weekday').value =
    existing.weekday != null ? String(existing.weekday) : '6';
  document.getElementById('goal-weekly-next').value = existing.next || 'refill';

  // Maandelijks
  document.getElementById('goal-monthday').value =
    existing.monthDay != null ? String(existing.monthDay) : 'last';
  document.getElementById('goal-monthly-next').value = existing.next || 'refill';

  // Jaarlijks
  const oneYear = (() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    return d.toISOString().slice(0, 10);
  })();
  document.getElementById('goal-year-date').value =
    existing.targetDate || existing.date || oneYear;
  document.getElementById('goal-yearly-next').value = existing.next || 'refill';

  // Aangepast (custom)
  const customMode = existing.mode || (existing.type === 'target' || existing.type === 'targetByDate' ? 'save' : 'fillup');
  const customHasDate = !!(existing.targetDate || existing.date);
  const isExistingCustom = existing.type === 'custom' || existing.type === 'target' || existing.type === 'targetByDate';
  document.getElementById('goal-custom-mode').value = customMode;
  document.getElementById('goal-custom-date').value =
    isExistingCustom ? (existing.targetDate || existing.date || '') : oneYear;
  const noDateEl = document.getElementById('goal-custom-no-date');
  if (noDateEl) noDateEl.checked = !isExistingCustom || !!customHasDate;
  const repeatOn = existing.repeat === true ||
                   existing.type === 'quarterly' ||
                   (existing.type === 'custom' && existing.repeatN);
  const repeatEl = document.getElementById('goal-custom-repeat');
  if (repeatEl) repeatEl.checked = repeatOn;
  const repeatNEl = document.getElementById('goal-custom-repeat-n');
  if (repeatNEl) repeatNEl.value = existing.repeatN || (existing.type === 'quarterly' ? 3 : 1);
  const repeatUnitEl = document.getElementById('goal-custom-repeat-unit');
  if (repeatUnitEl) repeatUnitEl.value = existing.repeatUnit || 'month';

  goalUpdateCustomRepeat();
  goalUpdateCustomDate();
  goalSwitchTab(tab);
  closeCtxMenu();
  openModal('modal-goal');
}

function goalSwitchTab(tab) {
  _goalTab = tab;
  document.querySelectorAll('#modal-goal .goal-tab').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === tab);
  });
  document.querySelectorAll('#modal-goal .goal-pane').forEach(p => {
    p.style.display = p.dataset.pane === tab ? 'block' : 'none';
  });
  // Pas hoofd-label aan
  const lbl = document.getElementById('goal-amount-label');
  if (lbl) lbl.textContent = tab === 'custom' ? 'Doelbedrag' : tab === 'manual' ? 'Bedrag' : 'Bedrag per maand';
  const amountField = document.getElementById('goal-amount')?.closest('.goal-field');
  if (amountField) amountField.style.display = tab === 'manual' ? 'none' : 'flex';
}

function goalUpdateCustomRepeat() {
  const on = !!document.getElementById('goal-custom-repeat')?.checked;
  const row = document.getElementById('goal-custom-repeat-row');
  if (row) row.style.display = on ? 'flex' : 'none';
}

function goalUpdateCustomDate() {
  const mode = document.getElementById('goal-custom-mode')?.value || 'fillup';
  const dateEl = document.getElementById('goal-custom-date');
  const dateLabel = document.getElementById('goal-custom-date-label');
  const dateOn = document.getElementById('goal-custom-no-date')?.checked !== false;
  if (dateLabel) dateLabel.textContent = mode === 'save' ? 'Doeldatum' : 'Op';
  if (dateEl) {
    dateEl.disabled = !dateOn;
    dateEl.style.opacity = dateOn ? '' : '.45';
    if (!dateOn) dateEl.value = '';
  }
}

function saveGoal() {
  const tab = _goalTab;
  if (tab === 'manual') {
    pushUndo();
    goals[_goalCatId] = {
      type: 'manual',
      startMonth: monthKey(currentYear, currentMonth),
    };
    S.set('goals', goals);
    closeModal('modal-goal');
    refreshDataViews();
    if (_cdpCatId === _goalCatId) refreshCatDetail();
    return;
  }

  const amount = parseBedrag(document.getElementById('goal-amount').value);
  if (amount <= 0) { toast('Vul een bedrag in.'); return; }

  const today = new Date();
  const viewingCurrentMonth =
    currentYear === today.getFullYear() &&
    currentMonth === today.getMonth() + 1;
  const startDate = viewingCurrentMonth
    ? vandaag()
    : `${currentYear}-${String(currentMonth).padStart(2, '0')}-01`;

  const goal = {
    type: tab,
    amount,
    startMonth: monthKey(currentYear, currentMonth),
    startDate,
  };

  if (tab === 'weekly') {
    goal.weekday = parseInt(document.getElementById('goal-weekday').value, 10);
    goal.next    = document.getElementById('goal-weekly-next').value;
  } else if (tab === 'monthly') {
    const md = document.getElementById('goal-monthday').value;
    goal.monthDay = (md === 'last') ? 'last' : parseInt(md, 10);
    goal.next     = document.getElementById('goal-monthly-next').value;
  } else if (tab === 'yearly') {
    goal.targetDate = document.getElementById('goal-year-date').value || null;
    goal.next       = document.getElementById('goal-yearly-next').value;
  } else if (tab === 'custom') {
    goal.type       = 'targetByDate';
    const useDate = document.getElementById('goal-custom-no-date')?.checked !== false;
    goal.targetDate = useDate ? (document.getElementById('goal-custom-date').value || null) : null;
  }

  pushUndo();
  goals[_goalCatId] = goal;
  S.set('goals', goals);
  closeModal('modal-goal');
  refreshDataViews();
  if (_cdpCatId === _goalCatId) refreshCatDetail();
}

function deleteGoal() {
  if (!_goalCatId) return;
  delete goals[_goalCatId];
  S.set('goals', goals);
  closeModal('modal-goal');
  refreshDataViews();
  if (_cdpCatId === _goalCatId) refreshCatDetail();
}

// ── CONTEXTMENU ───────────────────────────────────────────────────────────
let _ctxCatId = null;
let _ctxGrpId = null;
let _editCatId = null;
let _editCatGrpId = null;
let _editCatMode = 'edit';
let _editCatIconKey = '';

function splitCategoryDisplayName(name) {
  const hasIcon = /^\p{Emoji}/u.test(name || '');
  return {
    icon: hasIcon ? [...name][0] : '',
    label: hasIcon ? String(name).replace(/^\S+\s*/, '').trim() : String(name || '').trim()
  };
}

function showCtxMenu(e, catId, grpId) {
  e.preventDefault();
  e.stopPropagation();
  _ctxCatId = catId;
  _ctxGrpId = grpId;
  const menu = document.getElementById('ctx-menu');
  // Verberg budget-knop voor inkomen-categorieën
  const goalBtn = menu.querySelector('button[onclick="ctxSetGoal()"]');
  if (goalBtn) goalBtn.style.display = isIncomeCat(catId) ? 'none' : '';
  menu.classList.add('visible');
  menu.style.left = e.clientX + 'px';
  menu.style.top  = e.clientY + 'px';
}

function closeCtxMenu() {
  document.getElementById('ctx-menu')?.classList.remove('visible');
}

function inlineRenameCat(catId, grpId) {
  _ctxCatId = catId;
  _ctxGrpId = grpId;
  openCatEditModal(catId, grpId);
}

async function inlineDeleteCat(catId, grpId) {
  _ctxCatId = catId;
  _ctxGrpId = grpId;
  await ctxDelete();
}

function ctxSetGoal() {
  if (!_ctxCatId) return;
  if (isIncomeCat(_ctxCatId)) {
    toast('Inkomen wordt niet automatisch aangevuld.');
    return;
  }
  openGoalModal(_ctxCatId);
}

function defaultCategoryIconForGroup(grp) {
  const fallback = typeof DEFAULT_CATEGORY_ICON_KEY !== 'undefined' ? DEFAULT_CATEGORY_ICON_KEY : 'wallet';
  if (!grp) return fallback;
  if (typeof GROUP_DEFAULT_ICON_KEY !== 'undefined' && GROUP_DEFAULT_ICON_KEY[grp.name]) {
    return GROUP_DEFAULT_ICON_KEY[grp.name];
  }
  return fallback;
}

function renderCatIconPicker(selectedKey) {
  const grid = document.getElementById('cat-edit-icon-grid');
  const label = document.getElementById('cat-edit-icon-label');
  if (!grid || typeof CATEGORY_SVG_ICONS === 'undefined') return;
  const keys = typeof CATEGORY_ICON_KEYS !== 'undefined' ? CATEGORY_ICON_KEYS : Object.keys(CATEGORY_SVG_ICONS);
  const nextSelected = selectedKey && CATEGORY_SVG_ICONS[selectedKey]
    ? selectedKey
    : (typeof DEFAULT_CATEGORY_ICON_KEY !== 'undefined' ? DEFAULT_CATEGORY_ICON_KEY : keys[0]);
  _editCatIconKey = nextSelected;
  if (label) label.textContent = CATEGORY_SVG_ICONS[nextSelected]?.label || '';
  grid.innerHTML = keys.map(key => {
    const icon = CATEGORY_SVG_ICONS[key];
    return `
      <button type="button" class="cat-icon-choice ${key === nextSelected ? 'active' : ''}" data-cat-icon="${key}" title="${icon.label}" aria-label="${icon.label}">
        ${icon.svg}
      </button>`;
  }).join('');
  grid.querySelectorAll('.cat-icon-choice').forEach(btn => {
    btn.addEventListener('click', () => {
      _editCatIconKey = btn.dataset.catIcon;
      grid.querySelectorAll('.cat-icon-choice').forEach(item => item.classList.toggle('active', item === btn));
      if (label) label.textContent = CATEGORY_SVG_ICONS[_editCatIconKey]?.label || '';
    });
  });
}

function openCatCreateModal(grpId) {
  const grp = groups.find(g => g.id === grpId);
  if (!grp || grp.name === 'Inkomen') return;
  _editCatMode = 'new';
  _editCatId = null;
  _editCatGrpId = grpId;
  const titleEl = document.getElementById('cat-edit-title');
  const saveEl = document.getElementById('cat-edit-save');
  const nameEl = document.getElementById('cat-edit-name');
  if (titleEl) titleEl.textContent = 'Nieuw potje';
  if (saveEl) saveEl.textContent = 'Potje toevoegen';
  if (nameEl) nameEl.value = '';
  renderCatIconPicker(defaultCategoryIconForGroup(grp));
  openModal('modal-cat-edit');
  setTimeout(() => nameEl?.focus(), 40);
}

async function renameGroup(grpId) {
  const grp = groups.find(g => g.id === grpId);
  if (!grp) return;
  if (grp.name === 'Inkomen') { toast('De Inkomen-groep kan niet hernoemd worden.'); return; }
  if (grp.name === 'Vooruit plannen') { toast('Deze groep is onderdeel van de maand-vooruit methode.'); return; }
  const name = await kPrompt('', grp.name, 'Hoofdcategorie hernoemen');
  if (!name?.trim() || name.trim() === grp.name) return;
  pushUndo();
  grp.name = name.trim();
  S.set('groups', groups);
  refreshDataViews();
  rebuildCatFilters();
}

async function ctxRename() {
  closeCtxMenu();
  openCatEditModal(_ctxCatId, _ctxGrpId);
}

function openCatEditModal(catId, grpId) {
  const cat = findCat(catId || _ctxCatId);
  if (!cat) return;
  if (typeof isProtectedBudgetCat === 'function' && isProtectedBudgetCat(cat.id)) {
    toast('Deze buffer is beschermd en kan niet bewerkt worden.');
    return;
  }
  _editCatId = catId || _ctxCatId;
  _editCatGrpId = grpId || _ctxGrpId;
  _editCatMode = 'edit';
  const parts = splitCategoryDisplayName(cat.name);
  const titleEl = document.getElementById('cat-edit-title');
  const saveEl = document.getElementById('cat-edit-save');
  const nameEl = document.getElementById('cat-edit-name');
  if (titleEl) titleEl.textContent = 'Potje bewerken';
  if (saveEl) saveEl.textContent = 'Opslaan';
  if (nameEl) nameEl.value = parts.label || cat.name;
  renderCatIconPicker(categoryMeta?.[cat.id]?.icon || defaultCategoryIconForGroup(groups.find(g => g.id === _editCatGrpId)));
  openModal('modal-cat-edit');
  setTimeout(() => nameEl?.focus(), 40);
}

function saveCatEdit() {
  const isNew = _editCatMode === 'new';
  const cat = isNew ? null : findCat(_editCatId);
  if (!isNew && !cat) return;
  const grp = groups.find(g => g.id === _editCatGrpId);
  if (isNew && !grp) return;
  const nameEl = document.getElementById('cat-edit-name');
  const nextLabel = (nameEl?.value || '').trim();
  if (!nextLabel) { toast('Geef het potje een naam.'); return; }

  pushUndo();
  const targetCat = isNew ? { id: genId(), name: nextLabel } : cat;
  targetCat.name = nextLabel;
  const nextMeta = { ...(categoryMeta[targetCat.id] || {}) };
  if (_editCatIconKey && typeof CATEGORY_SVG_ICONS !== 'undefined' && CATEGORY_SVG_ICONS[_editCatIconKey]) {
    nextMeta.icon = _editCatIconKey;
  }
  if (Object.keys(nextMeta).length) categoryMeta[targetCat.id] = nextMeta;
  else delete categoryMeta[targetCat.id];
  if (isNew) {
    grp.cats.push(targetCat);
    grp.cats.sort((a, b) => cleanBudgetLabel(a.name).localeCompare(cleanBudgetLabel(b.name), 'nl'));
  }
  S.set('groups', groups);
  S.set('categoryMeta', categoryMeta);
  closeModal('modal-cat-edit');
  refreshDataViews();
  rebuildCatFilters();
  if (!isNew && _cdpCatId === targetCat.id) openCatDetail(targetCat.id, _editCatGrpId);
  toast(isNew
    ? `Potje "${targetCat.name}" toegevoegd.`
    : `Potje "${targetCat.name}" bijgewerkt.`);
}

async function deleteCategoryWithBudgetMove(catId, grpId) {
  const cat = findCat(catId);
  const grp = groups.find(g => g.id === grpId);
  if (!cat || !grp) return false;
  if (typeof isProtectedBudgetCat === 'function' && isProtectedBudgetCat(catId)) {
    toast('Dit potje is beschermd en kan niet verwijderd worden.');
    return false;
  }

  const assignedCents = calcCatBudgeted(catId);
  const bm = getBudgetMonth(currentYear, currentMonth);

  if (assignedCents > 0) {
    const targets = groups.flatMap(group =>
      group.cats
        .filter(target => target.id !== catId && !isIncomeCat(target.id))
        .map(target => ({
          value: target.id,
          label: `${group.name} / ${target.name}`
        }))
    );

    if (!targets.length) {
      await kAlert(
        `"${cat.name}" heeft ${fmt(assignedCents)} toegewezen. Voeg eerst een ander potje toe of maak het budget vrij.`,
        'Potje niet verwijderd'
      );
      return false;
    }

    const targetId = await kSelect(
      `"${cat.name}" heeft ${fmt(assignedCents)} toegewezen. Verplaats dit bedrag eerst naar een ander potje.`,
      targets,
      targets[0].value,
      'Budget verplaatsen'
    );
    if (!targetId) return false;

    const targetCat = findCat(targetId);
    if (!targetCat) return false;

    const ok = await kConfirm(
      `${fmt(assignedCents)} verplaatsen naar "${targetCat.name}" en "${cat.name}" verwijderen?`,
      'Potje verwijderen',
      true
    );
    if (!ok) return false;

    pushUndo();
    bm[targetId] = ((bm[targetId] ?? 0) * 100 + assignedCents) / 100;
    delete bm[catId];
  } else {
    if (!await kConfirm(`Potje "${cat.name}" verwijderen?`,"Verwijderen",true)) return false;
    pushUndo();
    delete bm[catId];
  }

  grp.cats = grp.cats.filter(c => c.id !== catId);
  delete categoryMeta[catId];
  S.set('budgets', budgets);
  S.set('groups', groups);
  S.set('categoryMeta', categoryMeta);
  refreshDataViews();
  rebuildCatFilters();
  toast(`Potje "${cat.name}" verwijderd.`);
  return true;
}

async function ctxDelete() {
  closeCtxMenu();
  await deleteCategoryWithBudgetMove(_ctxCatId, _ctxGrpId);
}

// Klik buiten contextmenu sluit hem
document.addEventListener('click', () => closeCtxMenu());
// ── REKENING CONTEXTMENU (sidebar rechtsklik) ─────────────────────────────
let _ctxAccId = null;

function showAccCtxMenu(e, accId) {
  e.preventDefault();
  e.stopPropagation();
  _ctxAccId = accId;

  let menu = document.getElementById('acc-ctx-menu');
  if (!menu) {
    menu = document.createElement('div');
    menu.id = 'acc-ctx-menu';
    menu.className = 'ctx-menu';
    menu.innerHTML = `
      <button onclick="accCtxEdit()">✏️ Bewerken</button>
      <button onclick="accCtxAdjust()">💰 Saldo aanpassen</button>
      <button onclick="accCtxDelete()" style="color:var(--red)">🗑 Verwijderen</button>`;
    document.body.appendChild(menu);
  }

  menu.classList.add('visible');
  menu.style.left = e.clientX + 'px';
  menu.style.top  = e.clientY + 'px';
}

function closeAccCtxMenu() {
  document.getElementById('acc-ctx-menu')?.classList.remove('visible');
}

document.addEventListener('click', closeAccCtxMenu);

async function accCtxRename() {
  closeAccCtxMenu();
  const acc = accounts.find(a => a.id === _ctxAccId);
  if (!acc) return;
  const name = await kPrompt('', acc.name, 'Rekening hernoemen');
  if (!name?.trim()) return;
  acc.name = name.trim();
  S.set("accounts", accounts);
  refreshDataViews();
  rebuildAccFilters();
  toast(`Rekening hernoemd naar "${acc.name}".`);
}

async function accCtxAdjust() {
  closeAccCtxMenu();
  const acc = accounts.find(a => a.id === _ctxAccId);
  if (!acc) return;

  const currentBal = calcAccountBalance(_ctxAccId);
  const rawInput = await kPrompt(`Nieuw saldo voor "${acc.name}" (huidig: ${fmt(currentBal)})`, fmtInput(currentBal), "Saldo aanpassen");
  if (rawInput === null) return;

  const newBal  = parseBedrag(rawInput);
  const diff    = newBal - currentBal;
  if (diff === 0) return;

  // Boek een correctietransactie
  pushUndo();
  transactions.push({
    id: genId(),
    date: vandaag(),
    accId: _ctxAccId,
    catId: null,
    payee: 'Saldocorrectie',
    memo: `Aanpassing van ${fmt(currentBal)} naar ${fmt(newBal)}`,
    amount: diff,
    cleared: true,
    createdAt: new Date().toISOString()
  });

  S.set('transactions', transactions);
  refreshDataViews();
  toast(`Saldo "${acc.name}" aangepast naar ${fmt(newBal)}.`);
}

async function accCtxDelete() {
  closeAccCtxMenu();
  const acc = accounts.find(a => a.id === _ctxAccId);
  if (!acc) return;

  const balance = calcAccountBalance(acc.id);

  // Als er een saldo is, verplicht eerst overboeken
  if (balance !== 0) {
    const others = accounts.filter(a => a.id !== acc.id);
    if (!others.length) {
      await kAlert(`Verplaats eerst het saldo van "${acc.name}" (${fmt(balance)}) — er zijn geen andere rekeningen beschikbaar.`, 'Saldo verplaatsen');
      return;
    }
    const options = others.map(a => ({ value: a.id, label: `${a.name} (${fmt(calcAccountBalance(a.id))})` }));
    const targetId = await kSelect(
      `"${acc.name}" heeft een saldo van ${fmt(balance)}. Naar welke rekening wil je dit verplaatsen?`,
      options, options[0].value,
      'Saldo verplaatsen voor verwijdering'
    );
    if (!targetId) return; // geannuleerd

    const targetAcc = accounts.find(a => a.id === targetId);
    pushUndo();
    const id1 = genId(), id2 = genId();
    const today = vandaag();
    transactions.push({
      id: id1, date: today, accId: acc.id,
      payee: `Overboeking naar ${targetAcc.name}`,
      memo: 'Saldo verplaatst bij verwijderen rekening',
      amount: -balance, cleared: true, transferId: id2,
      createdAt: new Date().toISOString()
    });
    transactions.push({
      id: id2, date: today, accId: targetId,
      payee: `Overboeking van ${acc.name}`,
      memo: 'Saldo verplaatst bij verwijderen rekening',
      amount: balance, cleared: true, transferId: id1,
      createdAt: new Date().toISOString()
    });
    S.set('transactions', transactions);
    toast(`${fmt(balance)} verplaatst naar "${targetAcc.name}".`);
  }

  const typed = await kPrompt(
    `⚠️ Dit kan niet ongedaan worden gemaakt.\n\nType de naam van de rekening om te bevestigen:`,
    '',
    `Rekening permanent verwijderen`
  );
  if (typed === null) return;
  if (typed.trim() !== acc.name.trim()) {
    await kAlert(`De naam komt niet overeen. Rekening is niet verwijderd.`, 'Verkeerde naam');
    return;
  }

  pushUndo();
  accounts = accounts.filter(a => a.id !== _ctxAccId);
  S.set('accounts', accounts);
  refreshDataViews();
  rebuildAccFilters();
  toast(`Rekening "${acc.name}" verwijderd.`);
}
// ── GROEP CONTEXTMENU ─────────────────────────────────────────────────────
let _ctxGrpMenuId = null;

function showGrpCtxMenu(e, grpId) {
  e.preventDefault();
  e.stopPropagation();
  _ctxGrpMenuId = grpId;

  let menu = document.getElementById('grp-ctx-menu');
  if (!menu) {
    menu = document.createElement('div');
    menu.id = 'grp-ctx-menu';
    menu.className = 'ctx-menu';
    menu.innerHTML = `
      <button onclick="grpCtxRename()">✏️ Hernoemen</button>
      <button onclick="grpCtxDelete()">🗑 Verwijderen</button>`;
    document.body.appendChild(menu);
  }

  menu.classList.add('visible');
  menu.style.left = e.clientX + 'px';
  menu.style.top  = e.clientY + 'px';
}

function closeGrpCtxMenu() {
  document.getElementById('grp-ctx-menu')?.classList.remove('visible');
}

document.addEventListener('click', closeGrpCtxMenu);

function grpCtxRename() {
  closeGrpCtxMenu();
  renameGroup(_ctxGrpMenuId);
}

function isProtectedGroupDelete(grp) {
  const ccName = typeof _ccGrpName === 'function' ? _ccGrpName() : 'Creditcardbetalingen';
  return !grp || grp.name === 'Inkomen' || grp.name === 'Vooruit plannen' || grp.name === ccName;
}

function getFilledGroupCats(grp) {
  if (!grp) return [];
  return grp.cats.filter(cat => {
    const catId = cat.id;
    const hasVisibleValue =
      Math.abs(calcCatBudgeted(catId)) > 0 ||
      Math.abs(calcCatSpent(catId)) > 0 ||
      Math.abs(calcCatAvailable(catId)) > 0;
    const hasTransactions = transactions.some(tx => tx.catId === catId);
    const hasBudgetHistory = Object.values(budgets || {}).some(monthBudget =>
      Math.abs(Number(monthBudget?.[catId]) || 0) > 0
    );
    return hasVisibleValue || hasTransactions || hasBudgetHistory;
  });
}

async function deleteGroupIfEmpty(grpId) {
  const grp = groups.find(g => g.id === grpId);
  if (!grp) return false;
  if (isProtectedGroupDelete(grp)) {
    toast('Deze hoofdcategorie kan niet verwijderd worden.');
    return false;
  }

  const filledCats = getFilledGroupCats(grp);
  if (filledCats.length) {
    const names = filledCats.slice(0, 4).map(cat => `"${cleanBudgetLabel(cat.name)}"`).join(', ');
    const more = filledCats.length > 4 ? ` en ${filledCats.length - 4} meer` : '';
    await kAlert(
      `Deze hoofdcategorie kan pas weg als alle potjes leeg zijn.\n\nMaak eerst leeg: ${names}${more}.`,
      'Hoofdcategorie niet verwijderd'
    );
    return false;
  }

  const catCount = grp.cats.length;
  if (!await kConfirm(
    catCount
      ? `Hoofdcategorie "${grp.name}" en ${catCount} lege potje${catCount === 1 ? '' : 's'} verwijderen?`
      : `Hoofdcategorie "${grp.name}" verwijderen?`,
    'Hoofdcategorie verwijderen',
    true
  )) return false;

  pushUndo();
  grp.cats.forEach(cat => {
    Object.values(budgets || {}).forEach(monthBudget => {
      if (monthBudget) delete monthBudget[cat.id];
    });
    delete goals[cat.id];
    delete categoryMeta[cat.id];
  });
  groups = groups.filter(g => g.id !== grp.id);
  delete grpState[grp.id];
  localStorage.setItem('keeep_grpState', JSON.stringify(grpState));
  S.set('groups', groups);
  S.set('budgets', budgets);
  S.set('goals', goals);
  S.set('categoryMeta', categoryMeta);
  refreshDataViews();
  rebuildCatFilters();
  toast(`Hoofdcategorie "${grp.name}" verwijderd.`);
  return true;
}

async function grpCtxDelete() {
  closeGrpCtxMenu();
  await deleteGroupIfEmpty(_ctxGrpMenuId);
}

// ── ALFABETISCH SORTEREN ──────────────────────────────────────────────────
function sortCatsAlpha(grpId) {
  const grp = groups.find(g => g.id === grpId);
  if (!grp) return;
  pushUndo();
  grp.cats.sort((a, b) => a.name.localeCompare(b.name, 'nl'));
  S.set('groups', groups);
  refreshDataViews();
  toast(`Potjes in "${grp.name}" alfabetisch gesorteerd.`);
}

// ── ALERT MODAL ───────────────────────────────────────────────────────────
function alertModal(msg) {
  if (typeof kAlert === 'function') {
    return kAlert(msg, 'Niet genoeg beschikbaar');
  }
  let overlay = document.getElementById('alert-modal-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'alert-modal-overlay';
    overlay.innerHTML = `
      <div id="alert-modal">
        <div id="alert-modal-icon">⚠️</div>
        <div id="alert-modal-msg"></div>
        <button id="alert-modal-close" onclick="closeAlertModal()">Sluiten</button>
      </div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeAlertModal(); });
  }
  document.getElementById('alert-modal-msg').textContent = msg;
  overlay.classList.add('active');
}

function closeAlertModal() {
  document.getElementById('alert-modal-overlay')?.classList.remove('active');
}

// ── AANVULLEN BUDGET ──────────────────────────────────────────────────────
async function aanvulGoal(e, catId, manualCents = null) {
  e.stopPropagation();

  const rta = calcReadyToAssign();
  if (rta <= 0) {
    alertModal('Er is geen saldo beschikbaar om toe te wijzen. Voeg eerst inkomen toe of maak budget vrij.');
    return;
  }

  const status = calcFundingRuleStatus(catId);
  if (status.isManual) { toast('Dit potje wordt niet automatisch aangevuld.'); return; }
  const bm      = getBudgetMonth(currentYear, currentMonth);
  const current = Math.round((bm[catId] || 0) * 100);

  let needed;
  if (manualCents && manualCents > 0) {
    needed = manualCents;
  } else {
    needed = status.fillNeed;
  }

  if (needed <= 0) { toast('Dit potje is al volledig aangevuld.'); return; }

  const toAdd = Math.min(needed, rta);
  pushUndo();
  bm[catId] = (current + toAdd) / 100;
  S.set('budgets', budgets);
  refreshDataViews();

  if (toAdd < needed) {
    alertModal(`Gedeeltelijk aangevuld — ${fmt(needed - toAdd)} tekort om dit potje volledig te vullen.`);
  } else {
    toast(`${fmt(toAdd)} toegewezen!`);
  }
}

// ── INLINE CAT ACTIES ─────────────────────────────────────────────────────
async function inlineRenameCat(catId) {
  const grp = groups.find(g => g.cats.some(c => c.id === catId));
  openCatEditModal(catId, grp?.id || null);
}

async function inlineDeleteCat(catId, grpId) {
  await deleteCategoryWithBudgetMove(catId, grpId);
}

async function grpCtxDelete2(grpId) {
  await deleteGroupIfEmpty(grpId);
}

// ── TRANSACTIE VERWIJDEREN INLINE ─────────────────────────────────────────
async function deleteTxnInline(txnId) {
  const t = transactions.find(t => t.id === txnId);
  if (!t) return;
  const desc = t.payee || t.memo || fmt(Math.abs(t.amount));
  if (!await kConfirm(`Transactie "${desc}" verwijderen?`,"Verwijderen",true)) return;
  pushUndo();
  transactions = transactions.filter(t => t.id !== txnId);
  S.set('transactions', transactions);
  refreshDataViews();
  toast('Transactie verwijderd.');
}

// ── SORTEERMENU ───────────────────────────────────────────────────────────
let _sortGrpId = null;

function openSortMenu(e, grpId) {
  e.stopPropagation();
  _sortGrpId = grpId;

  let menu = document.getElementById('sort-ctx-menu');
  if (!menu) {
    menu = document.createElement('div');
    menu.id = 'sort-ctx-menu';
    menu.className = 'ctx-menu';
    menu.innerHTML = `
      <button onclick="sortCats('alpha')">A → Z &nbsp;<span style="color:var(--text3);font-size:10px;">Alfabetisch</span></button>
      <button onclick="sortCats('alpha-desc')">Z → A &nbsp;<span style="color:var(--text3);font-size:10px;">Omgekeerd</span></button>
      <button onclick="sortCats('budget-desc')">↓ Hoogste budget</button>
      <button onclick="sortCats('budget-asc')">↑ Laagste budget</button>
      <button onclick="sortCats('spent-desc')">↓ Meeste activiteit</button>
      <button onclick="sortCats('available-desc')">↓ Meest beschikbaar</button>
      <button onclick="sortCats('available-asc')">↑ Minst beschikbaar</button>`;
    document.body.appendChild(menu);
    document.addEventListener('click', () => menu.classList.remove('visible'));
  }

  menu.classList.add('visible');
  const r = e.target.getBoundingClientRect();
  menu.style.left = r.left + 'px';
  menu.style.top  = (r.bottom + 4) + 'px';
}

function sortCats(mode) {
  document.getElementById('sort-ctx-menu')?.classList.remove('visible');
  const grp = groups.find(g => g.id === _sortGrpId);
  if (!grp) return;

  const bm = getBudgetMonth(currentYear, currentMonth);

  pushUndo();
  grp.cats.sort((a, b) => {
    switch (mode) {
      case 'alpha':          return a.name.localeCompare(b.name, 'nl');
      case 'alpha-desc':     return b.name.localeCompare(a.name, 'nl');
      case 'budget-desc':    return (bm[b.id] || 0) - (bm[a.id] || 0);
      case 'budget-asc':     return (bm[a.id] || 0) - (bm[b.id] || 0);
      case 'spent-desc':     return Math.abs(calcCatSpent(b.id)) - Math.abs(calcCatSpent(a.id));
      case 'available-desc': return calcCatAvailable(b.id) - calcCatAvailable(a.id);
      case 'available-asc':  return calcCatAvailable(a.id) - calcCatAvailable(b.id);
      default: return 0;
    }
  });

  S.set('groups', groups);
  refreshDataViews();
  toast('Potjes gesorteerd.');
}
