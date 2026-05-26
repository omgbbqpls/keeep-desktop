// ── ONBOARDING.JS — Persoonlijke setup wizard ────────────────────────────

const ONBOARDING_KEY = 'keeep_onboarded';

// ── SETUP CATEGORIEËN ────────────────────────────────────────────────────

const BASE_CATEGORIES = [
  // VASTE LASTEN
  { group: 'Vaste lasten', name: '🏦 Bankkosten', selected: true, goalType: 'monthly', description: 'Kosten voor betaalrekening en bankdiensten' },
  { group: 'Vaste lasten', name: '⚡ Energie', selected: true, goalType: 'monthly', description: 'Gas en stroom' },
  { group: 'Vaste lasten', name: '🏛️ Gemeentelijke heffingen', selected: true, goalType: 'monthly', description: 'Afvalstoffenheffing, rioolheffing en lokale lasten' },
  { group: 'Vaste lasten', name: '🏠 Huur / Hypotheek', selected: true, goalType: 'monthly', description: 'Huur, hypotheek of woonlasten' },
  { group: 'Vaste lasten', name: '📺 Internet & TV', selected: true, goalType: 'monthly', description: 'Internet, televisie en vaste telefonie' },
  { group: 'Vaste lasten', name: '📱 Mobiele telefoon', selected: true, goalType: 'monthly', description: 'Mobiel abonnement of prepaid' },
  { group: 'Vaste lasten', name: '🏢 Servicekosten / VvE', selected: false, goalType: 'monthly', description: 'Servicekosten of VvE-bijdrage' },
  { group: 'Vaste lasten', name: '🛡️ Verzekeringen algemeen', selected: true, goalType: 'monthly', description: 'Overige verzekeringen' },
  { group: 'Vaste lasten', name: '💧 Water', selected: true, goalType: 'monthly', description: 'Waterrekening' },
  { group: 'Vaste lasten', name: '🏡 Waterschapsbelasting', selected: false, goalType: 'monthly', description: 'Waterschapsbelasting' },
  { group: 'Vaste lasten', name: '🏥 Zorgverzekering', selected: true, goalType: 'monthly', description: 'Basisverzekering en aanvullende zorgverzekering' },

  // DAGELIJKS LEVEN
  { group: 'Dagelijks leven', name: '🛒 Boodschappen', selected: true, goalType: 'monthly', description: 'Supermarkt, drogist en basisboodschappen' },
  { group: 'Dagelijks leven', name: '👓 Bril / Lenzen', selected: false, goalType: 'target', description: 'Bril, lenzen en oogzorg' },
  { group: 'Dagelijks leven', name: '🧴 Drogist & verzorging', selected: true, goalType: 'monthly', description: 'Persoonlijke verzorging en huishoudelijke drogistartikelen' },
  { group: 'Dagelijks leven', name: '🚲 Fiets', selected: false, goalType: 'target', description: 'Fiets, onderhoud en accessoires' },
  { group: 'Dagelijks leven', name: '🧘 Fysio / Therapie', selected: false, goalType: 'monthly', description: 'Fysiotherapie, psycholoog of andere zorg' },
  { group: 'Dagelijks leven', name: '🧼 Huishouden', selected: true, goalType: 'monthly', description: 'Schoonmaakmiddelen en huishoudelijke spullen' },
  { group: 'Dagelijks leven', name: '👕 Kleding', selected: true, goalType: 'monthly', description: 'Kleding en schoenen' },
  { group: 'Dagelijks leven', name: '💊 Medicijnen', selected: false, goalType: 'monthly', description: 'Medicatie en apotheekkosten' },
  { group: 'Dagelijks leven', name: '🚆 OV', selected: false, goalType: 'monthly', description: 'Trein, bus, tram, metro en OV-chipkaart' },
  { group: 'Dagelijks leven', name: '🦷 Tandarts', selected: false, goalType: 'target', description: 'Tandarts en mondzorg' },
  { group: 'Dagelijks leven', name: '🐾 Voeding huisdieren', selected: false, goalType: 'monthly', description: 'Dierenvoeding en snacks' },

  // VRIJE RUIMTE
  { group: 'Vrije ruimte', name: '💇 Beauty / kapper', selected: false, goalType: 'monthly', description: 'Beauty en kapper' },
  { group: 'Vrije ruimte', name: '📚 Boeken', selected: false, goalType: 'monthly', description: 'Boeken en lezen' },
  { group: 'Vrije ruimte', name: '🎁 Cadeaus', selected: false, goalType: 'monthly', description: 'Cadeaus en attenties' },
  { group: 'Vrije ruimte', name: '🎤 Concerten / evenementen', selected: false, goalType: 'monthly', description: 'Concerten en evenementen' },
  { group: 'Vrije ruimte', name: '🎡 Dagjes weg', selected: false, goalType: 'monthly', description: 'Dagjes weg' },
  { group: 'Vrije ruimte', name: '🔌 Elektronica', selected: false, goalType: 'monthly', description: 'Elektronica' },
  { group: 'Vrije ruimte', name: '🎮 Games & apps', selected: false, goalType: 'monthly', description: 'Games en apps' },
  { group: 'Vrije ruimte', name: '🎨 Hobby’s', selected: false, goalType: 'monthly', description: 'Hobby’s' },
  { group: 'Vrije ruimte', name: '🛋️ Interieur', selected: false, goalType: 'monthly', description: 'Interieur' },
  { group: 'Vrije ruimte', name: '👗 Kleding extra', selected: false, goalType: 'monthly', description: 'Extra kleding' },
  { group: 'Vrije ruimte', name: '☕ Koffie buiten de deur', selected: false, goalType: 'monthly', description: 'Koffie buiten de deur' },
  { group: 'Vrije ruimte', name: '🧸 Speelgoed', selected: false, goalType: 'monthly', description: 'Speelgoed' },
  { group: 'Vrije ruimte', name: '🏋️ Sport / fitness', selected: false, goalType: 'monthly', description: 'Sport en fitness' },
  { group: 'Vrije ruimte', name: '🍽️ Uit eten & afhalen', selected: false, goalType: 'monthly', description: 'Uit eten en afhalen' },
  { group: 'Vrije ruimte', name: '✈️ Vakantie', selected: false, goalType: 'monthly', description: 'Vakantie' },
  { group: 'Vrije ruimte', name: '💸 Vrij te besteden', selected: false, goalType: 'monthly', description: 'Vrij te besteden' },
  { group: 'Vrije ruimte', name: '🧳 Weekend weg', selected: false, goalType: 'monthly', description: 'Weekend weg' },

  // VOOR LATER
  { group: 'Voor later', name: '🔧 APK / onderhoud', selected: false, goalType: 'target', description: 'APK en onderhoud' },
  { group: 'Voor later', name: '🧾 Belasting', selected: false, goalType: 'target', description: 'Belasting' },
  { group: 'Voor later', name: '🛟 Buffer', selected: true, goalType: 'target', description: 'Buffer' },
  { group: 'Voor later', name: '🐾 Dierenarts', selected: false, goalType: 'target', description: 'Dierenarts' },
  { group: 'Voor later', name: '🏥 Eigen risico zorg', selected: true, goalType: 'target', description: 'Eigen risico zorg' },
  { group: 'Voor later', name: '🎊 Feestdagen', selected: false, goalType: 'target', description: 'Feestdagen' },
  { group: 'Voor later', name: '🛍️ Grote aankopen', selected: false, goalType: 'target', description: 'Grote aankopen' },
  { group: 'Voor later', name: '📅 Jaarlijkse kosten', selected: false, goalType: 'target', description: 'Jaarlijkse kosten' },
  { group: 'Voor later', name: '🎄 Kerst', selected: false, goalType: 'target', description: 'Kerst' },
  { group: 'Voor later', name: '🪑 Meubels', selected: false, goalType: 'target', description: 'Meubels' },
  { group: 'Voor later', name: '💻 Nieuwe laptop / computer', selected: false, goalType: 'target', description: 'Nieuwe laptop of computer' },
  { group: 'Voor later', name: '📱 Nieuwe telefoon', selected: false, goalType: 'target', description: 'Nieuwe telefoon' },
  { group: 'Voor later', name: '🚗 Onderhoud auto', selected: false, goalType: 'target', description: 'Onderhoud auto' },
  { group: 'Voor later', name: '🚲 Onderhoud fiets', selected: false, goalType: 'target', description: 'Onderhoud fiets' },
  { group: 'Voor later', name: '🏠 Onderhoud woning', selected: false, goalType: 'target', description: 'Onderhoud woning' },
  { group: 'Voor later', name: '☔ Onvoorzien', selected: false, goalType: 'target', description: 'Onvoorzien' },
  { group: 'Voor later', name: '🌱 Pensioen / later', selected: false, goalType: 'target', description: 'Pensioen of later' },
  { group: 'Voor later', name: '🏦 Sparen algemeen', selected: false, goalType: 'target', description: 'Sparen algemeen' },
  { group: 'Voor later', name: '🏖️ Vakantiepot', selected: false, goalType: 'target', description: 'Vakantiepot' },
  { group: 'Voor later', name: '🎂 Verjaardagen', selected: false, goalType: 'target', description: 'Verjaardagen' },
];

const SUBSCRIPTION_CATEGORIES = [
  { group: 'Vaste lasten', name: '🤖 ChatGPT', selected: false, goalType: 'monthly', description: 'ChatGPT Plus, Pro of Team' },
  { group: 'Vaste lasten', name: '🎧 Spotify', selected: false, goalType: 'monthly', description: 'Muziek, podcasts en audio via Spotify' },
  { group: 'Vaste lasten', name: '🎬 Netflix', selected: false, goalType: 'monthly', description: 'Films en series via Netflix' },
  { group: 'Vaste lasten', name: '📺 Videoland', selected: false, goalType: 'monthly', description: 'Nederlandse en internationale series via Videoland' },
  { group: 'Vaste lasten', name: '▶️ YouTube', selected: false, goalType: 'monthly', description: 'YouTube Premium of YouTube Music' },
  { group: 'Vaste lasten', name: '🏰 Disney+', selected: false, goalType: 'monthly', description: 'Films en series via Disney+' },
  { group: 'Vaste lasten', name: '🎞️ HBO Max', selected: false, goalType: 'monthly', description: 'Films en series via HBO Max' },
  { group: 'Vaste lasten', name: '🍿 Prime Video', selected: false, goalType: 'monthly', description: 'Films, series en Amazon Prime Video' },
  { group: 'Vaste lasten', name: '☁️ Cloudopslag', selected: false, goalType: 'monthly', description: 'iCloud, Google One, Dropbox of OneDrive' },
  { group: 'Vaste lasten', name: '🏅 Contributie', selected: false, goalType: 'monthly', description: 'Vereniging of club' },
  { group: 'Vaste lasten', name: '💻 Software & apps', selected: false, goalType: 'monthly', description: 'Apps, software en online tools' },
  { group: 'Vaste lasten', name: '💪 Sportschool', selected: false, goalType: 'monthly', description: 'Sportschool of fitnessabonnement' },
  { group: 'Vaste lasten', name: '𝕏 Twitter / X', selected: false, goalType: 'monthly', description: 'X Premium of Twitter-abonnement' },
  { group: 'Vaste lasten', name: '📡 Overige abonnementen', selected: false, goalType: 'monthly', description: 'Andere terugkerende abonnementen die niet ergens anders passen' },
];

const CATEGORY_PACKS = {
  car: [
    { group: 'Vaste lasten', name: '🚗 Autoverzekering', selected: true, goalType: 'monthly', description: 'WA, beperkt casco of allrisk' },
    { group: 'Vaste lasten', name: '🛣️ Wegenbelasting', selected: true, goalType: 'monthly', description: 'Motorrijtuigenbelasting' },
    { group: 'Dagelijks leven', name: '⛽ Brandstof', selected: true, goalType: 'monthly', description: 'Benzine, diesel of LPG' },
    { group: 'Dagelijks leven', name: '🔌 Elektrisch laden', selected: false, goalType: 'monthly', description: 'Laadkosten voor elektrische auto' },
    { group: 'Dagelijks leven', name: '🅿️ Parkeren', selected: false, goalType: 'monthly', description: 'Parkeerkosten en vergunningen' },
  ],
  kids: [
    { group: 'Dagelijks leven', name: '🍼 Babyspullen', selected: false, goalType: 'monthly', description: 'Babyspullen' },
    { group: 'Dagelijks leven', name: '👶 Luiers', selected: false, goalType: 'monthly', description: 'Luiers' },
    { group: 'Dagelijks leven', name: '🎒 Schoolkosten', selected: false, goalType: 'target', description: 'Schoolkosten' },
    { group: 'Dagelijks leven', name: '🏫 Schoolkosten kinderen', selected: false, goalType: 'target', description: 'Schoolkosten kinderen' },
    { group: 'Dagelijks leven', name: '⚽ Sport kinderen', selected: false, goalType: 'monthly', description: 'Sport kinderen' },
    { group: 'Dagelijks leven', name: '💰 Zakgeld kinderen', selected: false, goalType: 'monthly', description: 'Zakgeld kinderen' },
  ],
  pets: [
    { group: 'Dagelijks leven', name: '🧸 Huisdier spullen', selected: false, goalType: 'monthly', description: 'Speeltjes, manden, kattenbakvulling en accessoires' },
    { group: 'Dagelijks leven', name: '🛡️ Huisdierenverzekering', selected: false, goalType: 'monthly', description: 'Verzekering voor huisdieren' },
  ],
};

const SETUP_GROUP_ORDER = [
  'Vaste lasten',
  'Dagelijks leven',
  'Vrije ruimte',
  'Voor later',
  'Schulden',
];

const SETUP_INCOME_CATEGORIES = [
  { name: '💼 Salaris', selected: true, description: 'Salaris of loon' },
  { name: '🏛️ Toeslagen', selected: false, description: 'Zorgtoeslag, huurtoeslag, kinderopvangtoeslag of kindgebonden budget' },
  { name: '🧾 Uitkering', selected: false, description: 'WW, WIA, bijstand of andere uitkering' },
  { name: '👵 Pensioen / AOW', selected: false, description: 'Pensioen, AOW of lijfrente' },
  { name: '💻 Freelance / onderneming', selected: false, description: 'Inkomsten uit freelancewerk of onderneming' },
  { name: '🎁 Teruggave / extra inkomen', selected: false, description: 'Belastingteruggave, bonus of incidentele inkomsten' },
  { name: '🛍️ Verkoop / Marktplaats', selected: false, description: 'Verkoop van spullen of tweedehands inkomsten' },
  { name: '💰 Overig inkomen', selected: true, description: 'Alle andere inkomsten' },
];

const RECOVERY_CATEGORIES = [
  { group: 'Schulden', name: '🧭 Roodstand aanvullen', selected: true, goalType: 'monthly', description: 'Eerst terug naar nul' },
  { group: 'Schulden', name: '📮 Achterstallige rekeningen', selected: false, goalType: 'monthly', description: 'Rekeningen die eerst aandacht nodig hebben' },
  { group: 'Schulden', name: '🛒 Essentiële uitgaven tot volgende inkomen', selected: true, goalType: 'monthly', description: 'Boodschappen, vervoer en noodzakelijke kosten' },
  { group: 'Schulden', name: '💳 Creditcardschuld', selected: false, goalType: 'monthly', description: 'Aflossen van creditcardschuld' },
  { group: 'Schulden', name: '🎓 DUO', selected: false, goalType: 'monthly', description: 'Studieschuld bij DUO' },
  { group: 'Schulden', name: '🛒 Klarna / AfterPay', selected: false, goalType: 'monthly', description: 'Betaal-later verplichtingen' },
  { group: 'Schulden', name: '👥 Lening familie / vrienden', selected: false, goalType: 'monthly', description: 'Terugbetalen aan familie of vrienden' },
  { group: 'Schulden', name: '🏦 Persoonlijke lening', selected: false, goalType: 'monthly', description: 'Persoonlijke lening of doorlopend krediet' },
  { group: 'Schulden', name: '🆘 Buffer opbouwen', selected: false, goalType: 'target', description: 'Kleine buffer zodat roodstand minder snel terugkomt' },
];

const SETUP_STEPS = ['profile', 'household', 'subscriptions', 'categories', 'accounts', 'assets', 'debts_accounts', 'review'];

const SETUP_ACCOUNT_TYPE_OPTIONS = {
  accounts: [
    { value: 'checking', label: 'Betaalrekening' },
    { value: 'savings', label: 'Spaarrekening' },
    { value: 'cash', label: 'Contant' },
    { value: 'credit', label: 'Creditcard' },
  ],
  assets: [
    { value: 'car', label: 'Auto' },
    { value: 'investment', label: 'Beleggingen' },
    { value: 'property', label: 'Woning' },
    { value: 'other_asset', label: 'Overig bezit' },
  ],
  debts: [
    { value: 'auto_loan', label: 'Autolening' },
    { value: 'mortgage', label: 'Hypotheek' },
    { value: 'student_loan', label: 'Studieschuld DUO' },
    { value: 'other_debt', label: 'Andere schuld' },
  ],
};

const SETUP_ACCOUNT_TEMPLATES = [
  { name: 'Betaalrekening', type: 'checking', onBudget: true, selected: true },
  { name: 'Auto', type: 'car', onBudget: false, selected: false },
];

const _ob = {
  mode: 'first',
  resetData: false,
  name: '',
  clearExisting: false,
  accounts: [],
  incomeSelected: {},
  groupNames: {},
  selected: {},
  details: {},
  household: {
    situation: 'single', // 'single' | 'couple' | 'family'
    car: false,
    pets: false,
    overdraft: 'unknown',
  },
};

let _obStep = 0;

// ── HELPER: actieve categorieën op basis van gezinssituatie ──────────────

function getActiveCategories() {
  const cats = [...BASE_CATEGORIES, ...SUBSCRIPTION_CATEGORIES];
  if (_ob.household.car) cats.push(...CATEGORY_PACKS.car);
  if (_ob.household.situation === 'family') cats.push(...CATEGORY_PACKS.kids);
  if (_ob.household.pets) cats.push(...CATEGORY_PACKS.pets);
  if (_ob.household.overdraft === 'yes') cats.push(...RECOVERY_CATEGORIES);
  return cats;
}

function initActiveCategoryState() {
  const allCats = getActiveCategories();
  allCats.forEach(item => {
    const id = setupCategoryId(item);
    if (!(id in _ob.selected)) {
      const existing = _ob.resetData ? null : findExistingSetupCategory(item);
      const existingGoal = existing ? goals?.[existing.id] : null;
      const existingMeta = existing ? categoryMeta?.[existing.id] : null;
      _ob.selected[id] = existing ? true : item.selected !== false;
      _ob.details[id] = {
        goalType: existingGoal?.type || item.goalType || 'none',
        goalAmount: _ob.resetData ? '' : existingGoal?.amount ? fmtInput(existingGoal.amount) : '',
        description: _ob.resetData ? '' : existingMeta?.description || item.description || cleanCategoryName(item.name),
      };
    }
  });
}

// ── LIFECYCLE ────────────────────────────────────────────────────────────

function needsOnboarding() {
  return !localStorage.getItem(ONBOARDING_KEY);
}

function markOnboarded() {
  localStorage.setItem(ONBOARDING_KEY, '1');
}

function setupCategoryId(item) {
  return `${item.group}::${item.name}`;
}

function resetOnboardingState(options = {}) {
  _ob.mode = options.mode || 'first';
  _ob.resetData = !!options.resetData;
  _ob.clearExisting = !!options.resetData;
  _ob.name = S?.get?.('userName', '') || '';
  _ob.incomeSelected = {};
  _ob.groupNames = {};
  _ob.selected = {};
  _ob.details = {};
  _ob.household = { situation: 'single', car: false, pets: false, overdraft: 'unknown' };
  _ob.accounts = buildSetupAccounts();

  const incomeGroup = !_ob.resetData ? groups.find(g => g.name === 'Inkomen') : null;
  sortSetupItems(SETUP_INCOME_CATEGORIES).forEach(item => {
    const existing = incomeGroup?.cats.some(cat => cat.name === item.name);
    _ob.incomeSelected[item.name] = _ob.resetData ? item.selected !== false : existing || item.selected !== false;
  });

  SETUP_GROUP_ORDER.forEach(groupName => {
    _ob.groupNames[groupName] = _ob.resetData ? groupName : findExistingSetupGroup(groupName)?.name || groupName;
  });

  [...BASE_CATEGORIES, ...SUBSCRIPTION_CATEGORIES].forEach(item => {
    const id = setupCategoryId(item);
    const existing = _ob.resetData ? null : findExistingSetupCategory(item);
    const existingGoal = existing ? goals?.[existing.id] : null;
    const existingMeta = existing ? categoryMeta?.[existing.id] : null;
    _ob.selected[id] = existing ? true : item.selected !== false;
    _ob.details[id] = {
      goalType: existingGoal?.type || item.goalType || 'none',
      goalAmount: _ob.resetData ? '' : existingGoal?.amount ? fmtInput(existingGoal.amount) : '',
      description: _ob.resetData ? '' : existingMeta?.description || item.description || cleanCategoryName(item.name),
    };
  });
}

function startOnboarding(options = {}) {
  resetOnboardingState(options);
  _obStep = 0;
  const overlay = document.getElementById('ob-overlay');
  if (overlay) {
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
  }
  renderObStep();
}

function closeOnboarding() {
  const overlay = document.getElementById('ob-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
  }
}

function obNext() {
  if (_obStep === 0 && !_ob.name.trim()) {
    toast('Geef je budget eerst een naam.');
    return;
  }
  if (SETUP_STEPS[_obStep] === 'categories' && !getSelectedSetupItems().length) {
    toast('Kies minimaal één potje om mee te starten.');
    return;
  }
  if (_obStep < SETUP_STEPS.length - 1) {
    _obStep++;
    initActiveCategoryState();
    renderObStep();
  } else {
    finishOnboarding();
  }
}

function obBack() {
  if (_obStep > 0) {
    _obStep--;
    renderObStep();
  }
}

function renderObStep() {
  const body = document.getElementById('ob-body');
  const prog = document.getElementById('ob-progress');
  const backBtn = document.getElementById('ob-back');
  const nextBtn = document.getElementById('ob-next');
  if (!body || !prog || !backBtn || !nextBtn) return;

  const step = SETUP_STEPS[_obStep];
  prog.style.width = Math.round(((_obStep + 1) / SETUP_STEPS.length) * 100) + '%';
  backBtn.style.display = _obStep === 0 ? 'none' : 'inline-flex';
  nextBtn.textContent = _obStep === SETUP_STEPS.length - 1 ? 'Budget maken' : 'Volgende';

  if (step === 'profile')    renderSetupProfile(body);
  if (step === 'household')  renderSetupHousehold(body);
  if (step === 'subscriptions') renderSetupSubscriptionStep(body);
  if (step === 'categories') renderSetupCategories(body);
  if (step === 'accounts')   renderSetupAccountsStep(body, 'accounts');
  if (step === 'assets')     renderSetupAccountsStep(body, 'assets');
  if (step === 'debts_accounts') renderSetupAccountsStep(body, 'debts');
  if (step === 'review')     renderSetupReview(body);
}

function renderSetupTitle(body, title, sub = '') {
  body.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'ob-title-wrap';
  wrap.innerHTML = `<h2 class="ob-title" id="ob-title">${title}</h2>${sub ? `<p class="ob-sub">${sub}</p>` : ''}`;
  body.appendChild(wrap);
}

// ── STAP: PROFIEL ────────────────────────────────────────────────────────

function renderSetupProfile(body) {
  renderSetupTitle(body, 'Geef je budget een naam', 'Daarna helpen we je met een paar korte vragen om de basis goed in te stellen.');
  const field = document.createElement('label');
  field.className = 'ob-field-label';
  field.innerHTML = '<span>Naam van je budget</span>';
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'ob-text-input';
  input.placeholder = 'Naam van je budget...';
  input.value = _ob.name;
  input.oninput = e => { _ob.name = e.target.value; };
  input.onkeydown = e => { if (e.key === 'Enter') obNext(); };
  field.appendChild(input);
  body.appendChild(field);

  if (_ob.resetData && _ob.mode !== 'first') {
    const note = document.createElement('p');
    note.className = 'ob-sub ob-inline-note';
    note.textContent = 'Je maakt een nieuw budget. Maak eerst een back-up als je je huidige budget wilt bewaren.';
    body.appendChild(note);
  }

  setTimeout(() => input.focus(), 80);
}

// ── STAP: GEZINSSITUATIE ─────────────────────────────────────────────────

function renderSetupHousehold(body) {
  renderSetupTitle(body, 'Jouw situatie', 'Zo stemmen we de categorieën af op jouw leven.');

  // Gezinssituatie
  const situationWrap = document.createElement('div');
  situationWrap.className = 'ob-household-section';
  situationWrap.innerHTML = '<p class="ob-household-label">Wat is jouw woonsituatie?</p>';

  const situations = [
    { value: 'single', label: '🧍 Eenpersoonshuishouden' },
    { value: 'couple', label: '👫 Tweepersoonshuishouden' },
    { value: 'family', label: '👨‍👩‍👧 Gezin met kinderen' },
  ];

  const situationGrid = document.createElement('div');
  situationGrid.className = 'ob-household-grid';
  situations.forEach(s => {
    const btn = document.createElement('button');
    btn.className = 'ob-household-btn' + (_ob.household.situation === s.value ? ' selected' : '');
    btn.textContent = s.label;
    btn.onclick = () => {
      _ob.household.situation = s.value;
      initActiveCategoryState();
      situationGrid.querySelectorAll('.ob-household-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    };
    situationGrid.appendChild(btn);
  });
  situationWrap.appendChild(situationGrid);
  body.appendChild(situationWrap);

  // Auto
  const carWrap = document.createElement('div');
  carWrap.className = 'ob-household-section';
  carWrap.innerHTML = '<p class="ob-household-label">Heb je een auto?</p>';
  const carGrid = document.createElement('div');
  carGrid.className = 'ob-household-grid ob-household-grid-2';

  [{ value: true, label: '🚗 Ja' }, { value: false, label: '🚶 Nee' }].forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'ob-household-btn' + (_ob.household.car === opt.value ? ' selected' : '');
    btn.textContent = opt.label;
    btn.onclick = () => {
      _ob.household.car = opt.value;
      initActiveCategoryState();
      syncSetupAccountDefaults();
      carGrid.querySelectorAll('.ob-household-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    };
    carGrid.appendChild(btn);
  });
  carWrap.appendChild(carGrid);
  body.appendChild(carWrap);

  // Huisdieren
  const petsWrap = document.createElement('div');
  petsWrap.className = 'ob-household-section';
  petsWrap.innerHTML = '<p class="ob-household-label">Heb je huisdieren?</p>';
  const petsGrid = document.createElement('div');
  petsGrid.className = 'ob-household-grid ob-household-grid-2';

  [{ value: true, label: '🐾 Ja' }, { value: false, label: '🚫 Nee' }].forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'ob-household-btn' + (_ob.household.pets === opt.value ? ' selected' : '');
    btn.textContent = opt.label;
    btn.onclick = () => {
      _ob.household.pets = opt.value;
      initActiveCategoryState();
      petsGrid.querySelectorAll('.ob-household-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    };
    petsGrid.appendChild(btn);
  });
  petsWrap.appendChild(petsGrid);
  body.appendChild(petsWrap);

  const overdraftWrap = document.createElement('div');
  overdraftWrap.className = 'ob-household-section';
  overdraftWrap.innerHTML = '<p class="ob-household-label">Sta je op dit moment rood?</p>';
  const overdraftGrid = document.createElement('div');
  overdraftGrid.className = 'ob-household-grid';
  [
    { value: 'no', label: 'Nee, ik begin met mijn huidige saldo' },
    { value: 'yes', label: 'Ja, ik wil eerst uit de roodstand komen' },
    { value: 'unknown', label: 'Ik weet het niet / later instellen' },
  ].forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'ob-household-btn' + (_ob.household.overdraft === opt.value ? ' selected' : '');
    btn.textContent = opt.label;
    btn.onclick = () => {
      _ob.household.overdraft = opt.value;
      initActiveCategoryState();
      overdraftGrid.querySelectorAll('.ob-household-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    };
    overdraftGrid.appendChild(btn);
  });
  overdraftWrap.appendChild(overdraftGrid);
  const note = document.createElement('p');
  note.className = 'ob-sub ob-inline-note';
  note.textContent = 'Als je rood staat, kun je nog steeds plannen. Je volgende inkomen vult eerst het tekort aan; daarna verdeel je wat overblijft.';
  overdraftWrap.appendChild(note);
  body.appendChild(overdraftWrap);
}

// ── STAP: INKOMEN ───────────────────────────────────────────────────────

function renderSetupIncome(body) {
  renderSetupTitle(body, 'Waar komt jouw inkomen maandelijks vandaan?', 'Kies de inkomstenbronnen die je wilt terugzien in je budgetoverzicht.');
  const grid = document.createElement('div');
  grid.className = 'ob-grid';
  sortSetupItems(SETUP_INCOME_CATEGORIES).forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'ob-option' + (_ob.incomeSelected[item.name] ? ' selected' : '');
    btn.textContent = item.name;
    btn.onclick = () => {
      _ob.incomeSelected[item.name] = !_ob.incomeSelected[item.name];
      btn.classList.toggle('selected', _ob.incomeSelected[item.name]);
    };
    grid.appendChild(btn);
  });
  body.appendChild(grid);
}

function renderSetupCategoryStep(body, groupName, title, sub) {
  renderSetupTitle(body, title, sub);
  initActiveCategoryState();
  const subscriptionNames = new Set(SUBSCRIPTION_CATEGORIES.map(item => item.name));
  const items = getActiveCategories().filter(item =>
    item.group === groupName &&
    !subscriptionNames.has(item.name)
  );
  const grid = document.createElement('div');
  grid.className = 'ob-grid';
  sortSetupItems(items).forEach(item => {
    const id = setupCategoryId(item);
    const btn = document.createElement('button');
    btn.className = 'ob-option' + (_ob.selected[id] ? ' selected' : '');
    btn.textContent = item.name;
    btn.onclick = () => {
      _ob.selected[id] = !_ob.selected[id];
      btn.classList.toggle('selected', _ob.selected[id]);
    };
    grid.appendChild(btn);
  });
  body.appendChild(grid);
}

function renderSetupSubscriptionStep(body) {
  renderSetupTitle(
    body,
    'Welke abonnementen heb je?',
    'Kies wat elke maand terugkomt. Keeep zet deze onder Vaste lasten, zodat je maandelijkse verplichtingen compleet zijn.'
  );
  initActiveCategoryState();
  const grid = document.createElement('div');
  grid.className = 'ob-grid';
  sortSetupItems(SUBSCRIPTION_CATEGORIES).forEach(item => {
    const id = setupCategoryId(item);
    const btn = document.createElement('button');
    btn.className = 'ob-option' + (_ob.selected[id] ? ' selected' : '');
    btn.textContent = item.name;
    btn.onclick = () => {
      _ob.selected[id] = !_ob.selected[id];
      btn.classList.toggle('selected', _ob.selected[id]);
    };
    grid.appendChild(btn);
  });
  body.appendChild(grid);
}

function renderSetupDebts(body) {
  renderSetupTitle(body, 'Heb je schulden of roodstand?', 'Wanneer je schulden hebt, willen we je helpen om financieel fit te worden. Dit is niet moraliserend: eerst overzicht, daarna herstel.');

  const intro = document.createElement('div');
  intro.className = 'ob-recovery-note';
  intro.innerHTML = `
    <strong>Herstelmodus</strong>
    <p>Je kunt altijd budgetteren. Geld uitgeven zonder plan heeft consequenties, maar plannen mag juist ook als je saldo negatief is.</p>
    <p>Als je rood staat, maakt Keeep een tijdelijk herstelplan: eerst terug naar nul, daarna vooruit plannen.</p>`;
  body.appendChild(intro);

  const choiceGrid = document.createElement('div');
  choiceGrid.className = 'ob-household-grid';
  [
    { value: 'no', label: 'Geen herstelplan nodig' },
    { value: 'yes', label: 'Maak herstelplan' },
    { value: 'unknown', label: 'Later instellen' },
  ].forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'ob-household-btn' + (_ob.household.overdraft === opt.value ? ' selected' : '');
    btn.textContent = opt.label;
    btn.onclick = () => {
      _ob.household.overdraft = opt.value;
      initActiveCategoryState();
      renderSetupDebts(body);
    };
    choiceGrid.appendChild(btn);
  });
  body.appendChild(choiceGrid);

  if (_ob.household.overdraft === 'yes') {
    const label = document.createElement('p');
    label.className = 'ob-household-label ob-section-label';
    label.textContent = 'Wat moet je herstelplan meenemen?';
    body.appendChild(label);
    const grid = document.createElement('div');
    grid.className = 'ob-grid';
    sortSetupItems(getActiveCategories().filter(item => item.group === 'Schulden')).forEach(item => {
      const id = setupCategoryId(item);
      const btn = document.createElement('button');
      btn.className = 'ob-option' + (_ob.selected[id] ? ' selected' : '');
      btn.textContent = item.name;
      btn.onclick = () => {
        _ob.selected[id] = !_ob.selected[id];
        btn.classList.toggle('selected', _ob.selected[id]);
      };
      grid.appendChild(btn);
    });
    body.appendChild(grid);
  }
}

// ── STAP: REKENINGEN ─────────────────────────────────────────────────────

function buildSetupAccounts() {
  if (!_ob.resetData && accounts.length) {
    return accounts.map(acc => ({
      id: acc.id,
      name: acc.name,
      type: normalizeAccountType(acc.type || 'checking'),
      onBudget: isBudgetActivityAccountType(normalizeAccountType(acc.type || 'checking')),
      balance: fmtInput(calcAccountBalance(acc.id)),
      selected: true,
      existing: true,
    }));
  }
  const setupAccounts = [
    makeSetupAccount('accounts', { name: 'Betaalrekening', selected: true }),
  ];
  if (_ob.household.car) {
    setupAccounts.push(makeSetupAccount('assets', { name: 'Auto', type: 'car', selected: true }));
  }
  return setupAccounts;
}

function setupAccountStepConfig(kind) {
  if (kind === 'assets') {
    return {
      title: 'Wil je bezittingen meenemen?',
      sub: 'Voeg alleen toe wat je wilt volgen in je financiële positie. Dit kan later ook.',
      addLabel: '+ Bezitting toevoegen',
      defaultType: 'investment',
      types: SETUP_ACCOUNT_TYPE_OPTIONS.assets,
    };
  }
  if (kind === 'debts') {
    return {
      title: 'Wil je schulden meenemen?',
      sub: 'Voeg leningen of andere schulden toe als je ze wilt volgen. Vul bedragen positief in; Keeep rekent ze als schuld.',
      addLabel: '+ Schuld toevoegen',
      defaultType: 'other_debt',
      types: SETUP_ACCOUNT_TYPE_OPTIONS.debts,
    };
  }
  return {
    title: 'Welke rekeningen gebruik je?',
    sub: 'Voeg je betaalrekening, spaarrekening, contant geld of creditcard toe. Lege regels slaan we over.',
    addLabel: '+ Rekening toevoegen',
    defaultType: 'checking',
    types: SETUP_ACCOUNT_TYPE_OPTIONS.accounts,
  };
}

function setupAccountTypeBelongsToKind(type, kind) {
  const normalized = normalizeAccountType(type || 'checking');
  return setupAccountStepConfig(kind).types.some(option => option.value === normalized);
}

function getSetupAccountsForKind(kind) {
  return _ob.accounts.filter(acc => setupAccountTypeBelongsToKind(acc.type, kind));
}

function makeSetupAccount(kind, overrides = {}) {
  const config = setupAccountStepConfig(kind);
  const type = overrides.type || config.defaultType;
  return {
    id: genId(),
    name: overrides.name || '',
    type,
    onBudget: isBudgetActivityAccountType(type),
    balance: overrides.balance || '',
    selected: overrides.selected === true,
    existing: false,
  };
}

function syncSetupAccountDefaults() {
  if (!_ob.household.car) {
    _ob.accounts = _ob.accounts.filter(acc =>
      acc.existing ||
      normalizeAccountType(acc.type) !== 'car' ||
      acc.name.trim() !== 'Auto' ||
      parseBedrag(acc.balance || '') !== 0
    );
    return;
  }
  const hasAuto = _ob.accounts.some(acc => normalizeAccountType(acc.type) === 'car');
  if (!hasAuto) {
    _ob.accounts.push(makeSetupAccount('assets', { name: 'Auto', type: 'car', selected: true }));
  }
}

function renderSetupAccountsStep(body, kind = 'accounts') {
  const config = setupAccountStepConfig(kind);
  renderSetupTitle(body, config.title, config.sub);

  const wrap = document.createElement('div');
  wrap.className = 'ob-account-list';
  getSetupAccountsForKind(kind).forEach(acc => wrap.appendChild(renderSetupAccountRow(acc, config.types)));
  body.appendChild(wrap);

  const addBtn = document.createElement('button');
  addBtn.className = 'ob-add-row';
  addBtn.textContent = config.addLabel;
  addBtn.onclick = () => {
    _ob.accounts.push(makeSetupAccount(kind));
    renderSetupAccountsStep(body, kind);
  };
  body.appendChild(addBtn);
}

function renderSetupAccountRow(acc, typeOptions = SETUP_ACCOUNT_TYPE_OPTIONS.accounts) {
  const row = document.createElement('div');
  row.className = 'ob-account-row';
  row.dataset.id = acc.id;
  const typeOptionsHtml = typeOptions
    .map(option => `<option value="${option.value}">${option.label}</option>`)
    .join('');
  row.innerHTML = `
    <div class="ob-account-row-top">
      <label class="ob-account-field ob-account-name-field">
        <span>Naam</span>
      <input class="ob-account-name" value="${acc.name || ''}" placeholder="Bijv. Rabobank">
      </label>
    <button class="ob-account-remove" title="Verwijderen">×</button>
    </div>
    <div class="ob-account-row-fields">
      <label class="ob-account-field">
        <span>Type</span>
        <select class="ob-account-type">
          ${typeOptionsHtml}
        </select>
      </label>
      <label class="ob-account-field">
        <span>Saldo</span>
        <input class="ob-account-balance" value="${acc.balance || ''}" inputmode="decimal" placeholder="0,00">
      </label>
    </div>
  `;
  row.querySelector('.ob-account-type').value = normalizeAccountType(acc.type || 'checking');
  row.querySelector('.ob-account-type').onchange = e => {
    acc.type = e.target.value;
    acc.onBudget = isBudgetActivityAccountType(acc.type);
    renderObStep();
  };
  row.querySelector('.ob-account-name').oninput = e => {
    acc.name = e.target.value;
    if (acc.name.trim()) acc.selected = true;
  };
  row.querySelector('.ob-account-balance').oninput = e => {
    acc.balance = e.target.value;
    if (parseBedrag(acc.balance || '') !== 0) acc.selected = true;
  };
  row.querySelector('.ob-account-remove').onclick = () => {
    _ob.accounts = _ob.accounts.filter(item => item.id !== acc.id);
    renderObStep();
  };
  return row;
}

// ── STAP: CATEGORIEËN ────────────────────────────────────────────────────

function renderSetupCategories(body) {
  renderSetupTitle(body, 'Welke potjes wil je gebruiken?', 'Kies de potjes waarmee je wilt starten. Je kunt later altijd potjes toevoegen, aanpassen of verwijderen.');

  const list = document.createElement('div');
  list.className = 'ob-category-groups';

  // Inkomsten
  const incomeSection = document.createElement('section');
  const incomeSelectedCount = SETUP_INCOME_CATEGORIES.filter(item => _ob.incomeSelected[item.name]).length;
  incomeSection.className = 'ob-category-group' + (incomeSelectedCount === 0 ? ' is-empty' : '');
  incomeSection.innerHTML = `
    <div class="ob-category-group-head">
      <input class="ob-category-group-name" value="Inkomsten" disabled>
      <button class="ob-group-toggle ${incomeSelectedCount === SETUP_INCOME_CATEGORIES.length ? 'is-on' : ''}" data-group="Inkomen">
        ${incomeSelectedCount === 0 ? 'Hoofdcategorie toevoegen' : 'Hoofdcategorie weghalen'}
      </button>
    </div>`;
  const incomeGrid = document.createElement('div');
  incomeGrid.className = 'ob-grid';
  SETUP_INCOME_CATEGORIES.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'ob-option' + (_ob.incomeSelected[item.name] ? ' selected' : '');
    btn.textContent = item.name;
    btn.onclick = () => {
      _ob.incomeSelected[item.name] = !_ob.incomeSelected[item.name];
      btn.classList.toggle('selected', _ob.incomeSelected[item.name]);
    };
    incomeGrid.appendChild(btn);
  });
  incomeSection.appendChild(incomeGrid);
  incomeSection.querySelector('.ob-group-toggle').onclick = () => {
    const shouldSelect = incomeSelectedCount === 0;
    SETUP_INCOME_CATEGORIES.forEach(item => { _ob.incomeSelected[item.name] = shouldSelect; });
    renderSetupCategories(body);
  };
  list.appendChild(incomeSection);

  // Uitgavencategorieën per groep
  const activeCategories = getActiveCategories();
  const subscriptionNames = new Set(SUBSCRIPTION_CATEGORIES.map(item => item.name));
  SETUP_GROUP_ORDER.forEach(groupName => {
    const items = sortSetupItems(activeCategories.filter(item => item.group === groupName && !subscriptionNames.has(item.name)));
    if (!items.length) return;
    const selectedCount = items.filter(item => _ob.selected[setupCategoryId(item)]).length;
    const allSelected = selectedCount === items.length;
    const noneSelected = selectedCount === 0;
    const section = document.createElement('section');
    section.className = 'ob-category-group' + (noneSelected ? ' is-empty' : '');
    section.innerHTML = `
      <div class="ob-category-group-head">
        <input class="ob-category-group-name" data-group="${groupName}" value="${_ob.groupNames[groupName] || groupName}">
        <button class="ob-group-toggle ${allSelected ? 'is-on' : ''}" data-group="${groupName}">
          ${noneSelected ? 'Hoofdcategorie toevoegen' : 'Hoofdcategorie weghalen'}
        </button>
      </div>`;

    const grid = document.createElement('div');
    grid.className = 'ob-grid';
    items.forEach(item => {
      const id = setupCategoryId(item);
      const btn = document.createElement('button');
      btn.className = 'ob-option' + (_ob.selected[id] ? ' selected' : '');
      btn.textContent = item.name;
      btn.onclick = () => {
        _ob.selected[id] = !_ob.selected[id];
        btn.classList.toggle('selected', _ob.selected[id]);
      };
      grid.appendChild(btn);
    });
    section.appendChild(grid);
    section.querySelector('.ob-category-group-name').oninput = e => {
      _ob.groupNames[groupName] = e.target.value.trim() || groupName;
    };
    section.querySelector('.ob-group-toggle').onclick = () => {
      const shouldSelect = noneSelected;
      items.forEach(item => { _ob.selected[setupCategoryId(item)] = shouldSelect; });
      renderSetupCategories(body);
    };
    list.appendChild(section);
  });

  body.appendChild(list);
}

// ── STAP: DETAILS ────────────────────────────────────────────────────────

function renderSetupDetails(body) {
  renderSetupTitle(body, 'Doelen en begunstigde(n)', 'Optioneel: vul alleen in wat je nu al weet.');

  const rows = document.createElement('div');
  rows.className = 'ob-detail-list';

  const selectedItems = getSelectedSetupItems();
  if (!selectedItems.length) {
    const empty = document.createElement('div');
    empty.className = 'ob-review';
    empty.textContent = 'Kies eerst categorieën in de vorige stap.';
    body.appendChild(empty);
    return;
  }

  selectedItems.forEach(item => {
    const id = setupCategoryId(item);
    const detail = _ob.details[id];
    const row = document.createElement('div');
    row.className = 'ob-detail-row';
    row.innerHTML = `
      <div class="ob-detail-name">
        <strong>${item.name}</strong>
        <span>${getSetupGroupName(item.group)}</span>
      </div>
      <select class="ob-detail-type" data-id="${id}">
        <option value="none">Geen doel</option>
        <option value="monthly">Maandelijks</option>
        <option value="quarterly">Per kwartaal</option>
        <option value="yearly">Per jaar</option>
        <option value="target">Streefbedrag</option>
      </select>
      <input class="ob-detail-amount" data-id="${id}" type="text" inputmode="decimal" placeholder="Doelbedrag">
      <input class="ob-detail-desc" data-id="${id}" type="text" placeholder="Begunstigde(n)?">
    `;
    row.querySelector('.ob-detail-type').value = detail?.goalType || 'monthly';
    row.querySelector('.ob-detail-amount').value = detail?.goalAmount || '';
    row.querySelector('.ob-detail-desc').value = detail?.description || '';
    rows.appendChild(row);
  });

  rows.oninput = syncSetupDetailFromEvent;
  rows.onchange = syncSetupDetailFromEvent;
  body.appendChild(rows);
}

function syncSetupDetailFromEvent(e) {
  const id = e.target.dataset.id;
  if (!id || !_ob.details[id]) return;
  if (e.target.classList.contains('ob-detail-type')) _ob.details[id].goalType = e.target.value;
  if (e.target.classList.contains('ob-detail-amount')) _ob.details[id].goalAmount = e.target.value;
  if (e.target.classList.contains('ob-detail-desc')) _ob.details[id].description = e.target.value;
}

// ── STAP: SAMENVATTING ───────────────────────────────────────────────────

function renderSetupReview(body) {
  const selected = getSelectedSetupItems();
  const selectedIncome = getSelectedSetupIncomeItems();
  const groupCount = new Set(selected.map(item => item.group)).size;

  renderSetupTitle(body, 'Klaar om te beginnen', 'Keeep zet je startpotjes klaar. Daarna kun je rekeningen toevoegen en je eerste geld een plan geven.');
  const summary = document.createElement('div');
  summary.className = 'ob-review';
  summary.innerHTML = `
    <div><strong>${_ob.name.trim()}</strong></div>
    <div>${selectedIncome.length || 1} inkomenscategorieën</div>
    <div>${groupCount} hoofdcategorieën</div>
    <div>${selected.length} potjes zichtbaar</div>
    ${_ob.resetData ? '<div>Oude data wordt gewist bij opslaan</div>' : ''}
  `;
  body.appendChild(summary);
}

// ── HELPER FUNCTIES ──────────────────────────────────────────────────────

function getSelectedSetupItems() {
  return sortSetupItems(getActiveCategories().filter(item => _ob.selected[setupCategoryId(item)]));
}

function getSelectedSetupIncomeItems() {
  return sortSetupItems(SETUP_INCOME_CATEGORIES.filter(item => _ob.incomeSelected[item.name]));
}

function getSetupAccountsToSave() {
  return _ob.accounts.filter(acc =>
    acc.existing || acc.selected || parseBedrag(acc.balance || '') !== 0
  );
}

function cleanCategoryName(name) {
  return name.replace(/^\P{L}+/u, '').trim();
}

function sortSetupItems(items) {
  return [...items].sort((a, b) =>
    cleanCategoryName(a.name).localeCompare(cleanCategoryName(b.name), 'nl', { sensitivity: 'base' })
  );
}

function getSetupGroupName(groupName) {
  return (_ob.groupNames[groupName] || groupName).trim() || groupName;
}

function setupGroupAliases(groupName) {
  if (groupName === 'Voor later') return ['Spaardoelen / vrije ruimte', 'Spaardoelen'];
  if (groupName === 'Vrije ruimte') return ['Wants', 'Vrije tijd', 'Leuk & lekker', 'Nog te plaatsen'];
  return [];
}

function findExistingSetupCategory(item) {
  const group = groups.find(g => g.name === item.group);
  return group?.cats.find(cat => cat.name === item.name)
    || groups.flatMap(g => g.cats).find(cat => cat.name === item.name)
    || null;
}

function findExistingSetupGroup(groupName) {
  const direct = groups.find(g => g.name === groupName);
  if (direct) return direct;
  const alias = setupGroupAliases(groupName).map(name => name.toLowerCase());
  const aliasMatch = groups.find(g => alias.includes(String(g.name || '').toLowerCase()));
  if (aliasMatch) return aliasMatch;
  const allCatNames = [...BASE_CATEGORIES, ...SUBSCRIPTION_CATEGORIES, ...Object.values(CATEGORY_PACKS).flat()]
    .filter(item => item.group === groupName)
    .map(item => item.name);
  return groups.find(group => {
    const normalizedName = String(group.name || '').toLowerCase();
    if (groupName === 'Vrije ruimte' && (normalizedName.includes('spaar') || normalizedName.includes('voor later'))) return false;
    return group.cats.some(cat => allCatNames.includes(cat.name));
  }) || null;
}

function findExistingIncomeCategory(name) {
  const group = groups.find(g => g.name === 'Inkomen');
  return group?.cats.find(cat => cat.name === name) || null;
}

// ── AFRONDEN ─────────────────────────────────────────────────────────────

function finishOnboarding() {
  if (_ob.resetData && typeof clearBudgetDataForOnboardingReset === 'function') {
    clearBudgetDataForOnboardingReset();
  }

  const selected = getSelectedSetupItems();
  const setupAccounts = getSetupAccountsToSave();
  const newGroups = [];
  const newGoals = {};
  const newMeta = {};
  const setupStartMonth = monthKey(new Date().getFullYear(), new Date().getMonth() + 1);
  const selectedIncome = getSelectedSetupIncomeItems();
  const incomeCats = (selectedIncome.length ? selectedIncome : [{ name: '💰 Overig inkomen' }]).map(item => {
    const existing = !_ob.resetData ? findExistingIncomeCategory(item.name) : null;
    return { id: existing?.id || genId(), name: item.name };
  });
  const existingIncomeGroup = !_ob.resetData ? groups.find(g => g.name === 'Inkomen') : null;
  newGroups.push({ id: existingIncomeGroup?.id || genId(), name: 'Inkomen', cats: incomeCats });

  SETUP_GROUP_ORDER.forEach(groupName => {
    const cats = selected
      .filter(item => item.group === groupName)
      .map(item => {
        const existing = !_ob.resetData ? findExistingSetupCategory(item) : null;
        const cat = { id: existing?.id || genId(), name: item.name };
        const detail = _ob.details[setupCategoryId(item)] || {};
        const amount = parseBedrag(detail.goalAmount || '');
        const description = (detail.description || '').trim();
        if (amount > 0 && detail.goalType !== 'none') {
          newGoals[cat.id] = {
            type: detail.goalType || item.goalType || 'monthly',
            amount,
            date: null,
            startMonth: setupStartMonth,
          };
        }
        if (description) {
          newMeta[cat.id] = { description };
        }
        return cat;
      });

    if (cats.length) {
      const existingGroup = !_ob.resetData ? findExistingSetupGroup(groupName) : null;
      newGroups.push({ id: existingGroup?.id || genId(), name: getSetupGroupName(groupName), cats });
    }
  });

  groups = newGroups;
  budgets = {};
  goals = newGoals;
  categoryMeta = newMeta;
  ensureIncomeGroup();
  if (typeof ensureForwardPlanInSavings === 'function') ensureForwardPlanInSavings();
  const accountResult = buildAccountsFromSetup(setupAccounts);
  accounts = accountResult.accounts;
  if (_ob.resetData) transactions = accountResult.transactions;
  if (typeof ensureCreditCardPaymentCategory === 'function') ensureCreditCardPaymentCategory();
  if (typeof syncCreditCardPaymentBudget === 'function') syncCreditCardPaymentBudget();
  if (_ob.name.trim()) S.set('userName', _ob.name.trim());
  setBudgetStartMonth(setupStartMonth);

  S.set('accounts', accounts);
  S.set('transactions', transactions);
  S.set('groups', groups);
  S.set('budgets', budgets);
  S.set('goals', goals);
  S.set('categoryMeta', categoryMeta);

  closeOnboarding();
  markOnboarded();
  render();
  rebuildAccFilters();
  rebuildCatFilters();
  toast('Setup opgeslagen.');
}

function buildAccountsFromSetup(setupAccounts) {
  if (!_ob.resetData) {
    const keepIds = new Set(setupAccounts.map(acc => acc.id));
    const nextTransactions = [...transactions];
    const nextAccounts = accounts
      .filter(acc => keepIds.has(acc.id))
      .map(acc => {
        const setup = setupAccounts.find(item => item.id === acc.id);
        if (!setup) return acc;
        const resolvedType = normalizeAccountType(setup.type || acc.type || 'checking');
        const resolvedOnBudget = isBudgetActivityAccountType(resolvedType);
        return {
          ...acc,
          name: setup.name.trim() || acc.name,
          type: resolvedType,
          onBudget: resolvedOnBudget,
        };
      });

    setupAccounts.filter(acc => !acc.existing).forEach(acc => {
      if (!acc.name.trim()) return;
      const resolvedType = normalizeAccountType(acc.type || 'checking');
      const resolvedOnBudget = isBudgetActivityAccountType(resolvedType);
      let cents = parseBedrag(acc.balance || '');
      if (isLoanAccountType(resolvedType) && cents > 0) cents = -cents;
      nextAccounts.push({
        id: acc.id,
        name: acc.name.trim(),
        type: resolvedType,
        openingBalance: 0,
        onBudget: resolvedOnBudget,
        createdAt: new Date().toISOString(),
      });
      nextTransactions.push({
        id: genId(),
        date: vandaag(),
        accId: acc.id,
        catId: isCashAccountType(resolvedType) ? (cents >= 0 ? getDefaultIncomeCatId() : getPreKeeepCatId()) : null,
        payee: 'Beginsaldo',
        memo: '',
        amount: cents,
        cleared: true,
        isOpeningBalance: true,
        createdAt: new Date().toISOString(),
      });
    });
    return { accounts: nextAccounts, transactions: nextTransactions };
  }

  const nextAccounts = [];
  const nextTransactions = [];
  setupAccounts.forEach(acc => {
    if (!acc.name.trim()) return;
    const resolvedType = normalizeAccountType(acc.type || 'checking');
    const resolvedOnBudget = isBudgetActivityAccountType(resolvedType);
    let cents = parseBedrag(acc.balance || '');
    if (isLoanAccountType(resolvedType) && cents > 0) cents = -cents;
    nextAccounts.push({
      id: acc.id,
      name: acc.name.trim(),
      type: resolvedType,
      openingBalance: 0,
      onBudget: resolvedOnBudget,
      createdAt: new Date().toISOString(),
    });
    const openingCatId = isCashAccountType(resolvedType) ? (cents >= 0 ? getDefaultIncomeCatId() : getPreKeeepCatId()) : null;
    nextTransactions.push({
      id: genId(),
      date: vandaag(),
      accId: acc.id,
      catId: openingCatId,
      payee: 'Beginsaldo',
      memo: '',
      amount: cents,
      cleared: true,
      isOpeningBalance: true,
      createdAt: new Date().toISOString(),
    });
    if (isCashAccountType(resolvedType) && cents < 0 && openingCatId) {
      goals[openingCatId] = {
        type: 'target',
        amount: Math.abs(cents),
        date: null,
        startMonth: monthKey(new Date().getFullYear(), new Date().getMonth() + 1),
      };
    }
  });
  return { accounts: nextAccounts, transactions: nextTransactions };
}
