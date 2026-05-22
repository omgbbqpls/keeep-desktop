// ── ELECTRON MAIN ─────────────────────────────────────────────────────────
const { app, BrowserWindow, Tray, Menu, nativeImage, shell, dialog } = require('electron');
const path   = require('path');
const os     = require('os');

// Start the sync server immediately
const { server, getLocalIP, PORT } = require('./server');

let mainWindow = null;
let tray       = null;

// ── WINDOW ────────────────────────────────────────────────────────────────
function createWindow() {
  mainWindow = new BrowserWindow({
    width:  1280,
    height: 820,
    minWidth: 900,
    minHeight: 600,
    title: 'Keeep',
    titleBarStyle: 'hiddenInset', // macOS native feel
    backgroundColor: '#12131a',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadURL(`http://localhost:${PORT}`);

  mainWindow.on('closed', () => { mainWindow = null; });

  // Open external links in browser, not Electron
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

// ── TRAY ICON ─────────────────────────────────────────────────────────────
function createTray() {
  // Simple monochrome icon — works on macOS menu bar
  const icon = nativeImage.createFromDataURL(
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAAS0lEQVRYhe3SMQoAIAxD0d7/0A4uDl0EoYP/bwstJMFGcGdJAAAAAACAXb319qlHEAAAAAAAAAAAAAAAAAAAAAAAAOA/cgPDFwMDnvkAAAAASUVORK5CYII='
  );
  icon.setTemplateImage(true); // macOS: auto dark/light

  tray = new Tray(icon);
  const ip = getLocalIP();

  const menu = Menu.buildFromTemplate([
    { label: 'Keeep openen', click: () => { if (mainWindow) mainWindow.show(); else createWindow(); } },
    { type: 'separator' },
    { label: `WiFi adres: ${ip}:${PORT}`, enabled: false },
    {
      label: 'Kopieer WiFi adres',
      click: () => {
        require('electron').clipboard.writeText(`http://${ip}:${PORT}`);
      }
    },
    { type: 'separator' },
    {
      label: 'Databestand openen',
      click: () => shell.openPath(path.join(os.homedir(), '.keeep-data.json'))
    },
    { type: 'separator' },
    { label: 'Stoppen', click: () => { app.quit(); } },
  ]);

  tray.setToolTip(`Keeep — sync op ${ip}:${PORT}`);
  tray.setContextMenu(menu);
  tray.on('click', () => { if (mainWindow) mainWindow.show(); else createWindow(); });
}

// ── APP LIFECYCLE ─────────────────────────────────────────────────────────
app.whenReady().then(() => {
  createWindow();
  createTray();

  // macOS: heropen window als op dock-icoon geklikt
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// macOS: sluit app NIET als laatste venster dicht — blijft in tray/menu bar
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => {
  server.close();
});
