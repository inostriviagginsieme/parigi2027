# Parigi 2027 · Rosetta e Concetta

Webapp (PWA, un solo file) con l'itinerario di 4 giorni a Parigi, 17–20 giugno 2027.
Tutto quello che serve sta nella cartella `pwa/`: `index.html`, `sw.js`, `manifest.webmanifest`, icone e le due faccine.

## Pubblicare su Render (sito statico)

1. Su render.com → **New → Static Site** → collega questo repository (`inostriviagginsieme/parigi2027`).
2. Build command: *(vuoto)* · Publish directory: `pwa`.
3. Ogni `git push` su `main` ripubblica da solo. Il file `render.yaml` contiene già questa configurazione.

## Aggiornare l'app

1. Modificare `pwa/index.html` (i dati stanno in cima allo script: `POI`, `DAYS_DEF`, `CENE`, `TODO`, `INFO_CARDS`).
2. Incrementare `APP_VER` in `index.html` **e** `CACHE` in `sw.js` (v2, v3…): è quello che fa arrivare la versione nuova ai telefoni.
3. Documenti nuovi (PDF, foto): in `pwa/docs/`, aggiunti a `docs:[…]` sul POI e all'elenco `ASSETS` di `sw.js`.
4. `git commit` e `git push`.

## Funzioni

Piano modificabile (sposta, riordina, elimina, ripristina) con orari, tragitti e costi ricalcolati · Giorni · Mappa disegnata su coordinate reali · Cene · Wallet offline (PDF e foto) · Spese in comune con il saldo "chi deve a chi" · Album foto con export zip per Journi · Info con checklist, frasi francesi con pronuncia 🔊 · Intro video (reel Instagram) · Cena a sorpresa che si svela da sola venerdì 18 giugno alle 17:00 (o toccando 5 volte il titolo 🎁) · Scheda "Adesso" durante il viaggio · Meteo di Parigi (Open-Meteo, in cache offline) · Avvisi 30 minuti prima di ogni tappa + export calendario .ics con sveglie · Diario di viaggio serale che finisce nei testi dell'album e nel PDF · PDF stampabile · Ricerca.
