# Keeep Desktop

Desktop-apps voor Keeep. macOS is nu actief; Windows volgt later.

## Lokaal ontwikkelen

```bash
npm install
npm run tauri:dev
```

## Builds

```bash
npm run tauri:build
```

De build-output blijft lokaal en wordt niet naar GitHub gepusht.

## Wat hoort hier

- `src-tauri/`: Tauri desktop wrapper
- `main.js`: Electron entrypoint zolang die nog relevant is
- `server.js`: lokale sync/webserver
- `app/`: gebundelde webapp voor desktop
- `docs/`: release- en platformnotities

## Releasebeleid

Beta's en stabiele versies worden vastgelegd met Git-tags en GitHub Releases, niet met losse backup-mappen.
