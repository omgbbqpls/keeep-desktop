// ── DIALOG.JS — Keeep native dialogen ────────────────────────────────────

(function() {
  // Maak overlay eenmalig aan
  function ensureOverlay() {
    if (document.getElementById('kdialog-overlay')) return;
    const el = document.createElement('div');
    el.id = 'kdialog-overlay';
    el.innerHTML = `
      <div id="kdialog">
        <div id="kdialog-header">
          <span id="kdialog-icon" aria-hidden="true"></span>
          <div id="kdialog-title"></div>
          <button id="kdialog-close" type="button" aria-label="Sluiten">✕</button>
        </div>
        <div id="kdialog-body">
          <div id="kdialog-msg"></div>
        </div>
        <input id="kdialog-input" type="text" style="display:none">
        <select id="kdialog-select" style="display:none"></select>
        <div id="kdialog-footer"></div>
      </div>`;
    document.body.appendChild(el);
  }

  function iconForKind(kind) {
    if (kind === 'danger') {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><circle cx="12" cy="12" r="10"/><path d="M12 7v6"/><path d="M12 17h.01"/></svg>';
    }
    if (kind === 'warning') {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M10.3 4.3 2.6 17.6A2 2 0 0 0 4.3 20h15.4a2 2 0 0 0 1.7-2.4L13.7 4.3a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>';
    }
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><circle cx="12" cy="12" r="10"/><path d="m8.5 12.5 2.2 2.2 4.8-5.4"/></svg>';
  }

  function openDialog({ title, msg, input, buttons, kind = 'info' }) {
    ensureOverlay();
    return new Promise(resolve => {
      const overlay = document.getElementById('kdialog-overlay');
      const titleEl = document.getElementById('kdialog-title');
      const iconEl  = document.getElementById('kdialog-icon');
      const closeEl = document.getElementById('kdialog-close');
      const msgEl   = document.getElementById('kdialog-msg');
      const inputEl = document.getElementById('kdialog-input');
      const selectEl = document.getElementById('kdialog-select');
      const footer  = document.getElementById('kdialog-footer');

      overlay.dataset.kind = kind;
      titleEl.textContent = title || '';
      iconEl.innerHTML    = iconForKind(kind);
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
      function closeWith(value) {
        overlay.classList.remove('active');
        document.removeEventListener('keydown', onKey);
        resolve(value);
      }

      closeEl.onclick = () => {
        closeWith(input !== undefined || buttons.select !== undefined ? null : false);
      };

      buttons.items.forEach(btn => {
        const b = document.createElement('button');
        b.className   = 'kdialog-btn' + (btn.cls ? ' ' + btn.cls : '');
        b.textContent = btn.label;
        b.onclick = () => {
          closeWith(btn.value !== undefined ? btn.value : (
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
          closeWith(buttons.select !== undefined ? selectEl.value : inputEl.value);
        }
        if (e.key === 'Escape') {
          closeWith(input !== undefined || buttons.select !== undefined ? null : false);
        }
      }
      document.addEventListener('keydown', onKey);
      overlay.classList.add('active');
    });
  }

  // kAlert — vervangt alert()
  window.kAlert = function(msg, title = 'Melding') {
    return openDialog({
      title, msg, kind: 'warning',
      buttons: { items: [{ label: 'OK', cls: 'primary', value: true }] }
    });
  };

  // kConfirm — vervangt confirm(), geeft Promise<boolean>
  window.kConfirm = function(msg, title = 'Bevestigen', danger = false) {
    return openDialog({
      title, msg, kind: danger ? 'danger' : 'info',
      buttons: { items: [
        { label: 'Annuleren', value: false },
        { label: 'Bevestigen', cls: danger ? 'danger' : 'primary', value: true }
      ] }
    });
  };

  // kPrompt — vervangt prompt(), geeft Promise<string|null>
  window.kPrompt = function(msg, defaultVal = '', title = '') {
    return openDialog({
      title: title || msg, msg: title ? msg : '', kind: 'info',
      input: defaultVal,
      buttons: { items: [
        { label: 'Annuleren', value: null },
        { label: 'OK', cls: 'primary' }
      ] }
    });
  };

  window.kSelect = function(msg, options, defaultVal = '', title = 'Kies') {
    return openDialog({
      title, msg, kind: 'info',
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
