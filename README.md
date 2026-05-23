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

## FAQ

### Hoe werkt potje vullen?

**Handmatig** is de standaard. Je kiest zelf wanneer je geld in dit potje zet. Keeep neemt dit potje niet mee met **Vul potjes**, maar waarschuwt wel bij een tekort.

Wil je dat Keeep actief met je meedenkt, dan kun je een maandbedrag of doelbedrag instellen. Keeep vult alleen aan zolang er beschikbaar geld is. Je bepaalt dit per potje en kunt het later altijd aanpassen.

**Maandbedrag** laat Keeep elke maand aanvullen tot een vast bedrag, als er genoeg beschikbaar is. Handig voor vaste lasten en potjes die meestal hetzelfde nodig hebben, zoals huur, abonnementen, verzekering of telefoon.

**Doelbedrag** laat Keeep naar een gewenst bedrag toewerken, als er genoeg beschikbaar is. Met einddatum rekent Keeep uit hoeveel er per maand nodig is; zonder einddatum bewaakt Keeep dat er altijd een bepaald bedrag beschikbaar blijft, zoals bij een buffer of noodfonds.

**Handmatig** laat jou zelf bepalen wanneer en hoeveel je toevoegt. Handig voor potjes die per maand kunnen afwijken, zoals boodschappen, dagjes weg, games of uit eten.
