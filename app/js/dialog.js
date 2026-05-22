// ── DIALOG.JS — Keeep native dialogen ────────────────────────────────────

(function() {
  // Maak overlay eenmalig aan
  function ensureOverlay() {
    if (document.getElementById('kdialog-overlay')) return;
    const el = document.createElement('div');
    el.id = 'kdialog-overlay';
    el.innerHTML = `
      <div id="kdialog">
        <div id="kdialog-title"></div>
        <div id="kdialog-msg"></div>
        <input id="kdialog-input" type="text" style="display:none">
        <select id="kdialog-select" style="display:none"></select>
        <div id="kdialog-footer"></div>
      </div>`;
    document.body.appendChild(el);
  }

  function openDialog({ title, msg, input, buttons }) {
    ensureOverlay();
    return new Promise(resolve => {
      const overlay = document.getElementById('kdialog-overlay');
      const titleEl = document.getElementById('kdialog-title');
      const msgEl   = document.getElementById('kdialog-msg');
      const inputEl = document.getElementById('kdialog-input');
      const selectEl = document.getElementById('kdialog-select');
      const footer  = document.getElementById('kdialog-footer');

      titleEl.textContent = title || '';
      msgEl.innerHTML     = msg ? msg.replace(/\n/g, '<br>') : '';
      msgEl.style.display = msg   ? 'block' : 'none';

      if (input !== undefined) {
        inputEl.value        = input;
        inputEl.style.display = 'block';
        setTimeout(() => { inputEl.focus(); inputEl.select(); }, 80);
      } else {
        inputEl.style.display = 'none';
      }

      if (buttons.select !== undefined) {
        selectEl.innerHTML = '';
        buttons.select.options.forEach(opt => {
          const el = document.createElement('option');
          el.value = opt.value;
          el.textContent = opt.label;
          selectEl.appendChild(el);
        });
        selectEl.value = buttons.select.defaultVal ?? '';
        selectEl.style.display = 'block';
        setTimeout(() => selectEl.focus(), 80);
      } else {
        selectEl.style.display = 'none';
      }

      footer.innerHTML = '';
      buttons.items.forEach(btn => {
        const b = document.createElement('button');
        b.className   = 'kdialog-btn' + (btn.cls ? ' ' + btn.cls : '');
        b.textContent = btn.label;
        b.onclick = () => {
          overlay.classList.remove('active');
          document.removeEventListener('keydown', onKey);
          resolve(btn.value !== undefined ? btn.value : (
            buttons.select !== undefined ? selectEl.value :
            input !== undefined ? inputEl.value :
            true
          ));
        };
        footer.appendChild(b);
      });

      // Enter bevestigt, Escape annuleert
      function onKey(e) {
        if (e.key === 'Enter' && (input !== undefined || buttons.select !== undefined)) {
          overlay.classList.remove('active');
          document.removeEventListener('keydown', onKey);
          resolve(buttons.select !== undefined ? selectEl.value : inputEl.value);
        }
        if (e.key === 'Escape') {
          overlay.classList.remove('active');
          document.removeEventListener('keydown', onKey);
          resolve(input !== undefined || buttons.select !== undefined ? null : false);
        }
      }
      document.addEventListener('keydown', onKey);
      overlay.classList.add('active');
    });
  }

  // kAlert — vervangt alert()
  window.kAlert = function(msg, title = 'Melding') {
    return openDialog({
      title, msg,
      buttons: { items: [{ label: 'OK', cls: 'primary', value: true }] }
    });
  };

  // kConfirm — vervangt confirm(), geeft Promise<boolean>
  window.kConfirm = function(msg, title = 'Bevestigen', danger = false) {
    return openDialog({
      title, msg,
      buttons: { items: [
        { label: 'Annuleren', value: false },
        { label: 'Bevestigen', cls: danger ? 'danger' : 'primary', value: true }
      ] }
    });
  };

  // kPrompt — vervangt prompt(), geeft Promise<string|null>
  window.kPrompt = function(msg, defaultVal = '', title = '') {
    return openDialog({
      title: title || msg, msg: title ? msg : '',
      input: defaultVal,
      buttons: { items: [
        { label: 'Annuleren', value: null },
        { label: 'OK', cls: 'primary' }
      ] }
    });
  };

  window.kSelect = function(msg, options, defaultVal = '', title = 'Kies') {
    return openDialog({
      title, msg,
      buttons: {
        select: { options, defaultVal },
        items: [
          { label: 'Annuleren', value: null },
          { label: 'OK', cls: 'primary' }
        ]
      }
    });
  };
})();
