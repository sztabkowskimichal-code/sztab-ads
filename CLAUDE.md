# SztabAds - sztab-ads.pl (strona statyczna)

Strona własna Michała Sztabkowskiego (freelancer Google Ads). Od 10.2026 czysty HTML/CSS/JS
na GitHub Pages - bez WordPressa, bez PHP, bez bazy. Stary motyw WP leży w `wordpress/sztab-ads/` (archiwum).

## Zasady

- NIGDY nie używaj en-dash (`–`) ani em-dash (`—`) - zawsze zwykły łącznik (`-`).
- Indeksowanie wyłączone CELOWO (`INDEXING = False` w `build.py` -> noindex + robots Disallow).
  Włączaj tylko na wyraźne polecenie.
- Nie publikuj liczb-wyników (ROAS, CPA, % wzrostu) niepotwierdzonych przez użytkownika.
  Metryki na /realizacje/ i w sekcji "Wyniki" na home pochodzą ze starej strony i NIE są potwierdzone.
- Pisz po polsku z polskimi znakami.

## Struktura

- `src/layout.html` - wspólny szkielet (head, GTM, nagłówek, stopka, baner cookies)
- `src/pages/*.html` - treść `<main>` każdej podstrony
- `src/pages.json` - lista podstron: ścieżka, title, description, skrypty
- `build.py` - generuje `docs/` (`python build.py`)
- `docs/` - gotowa strona publikowana przez GitHub Pages (folder `/docs`, gałąź `main`)
  - `docs/css/style.css`, `docs/js/*.js`, `docs/img/*` - zasoby statyczne, edytowane bezpośrednio
  - `docs/CNAME` - domena `sztab-ads.pl` (generowany przez build)
- `foto/` - źródłowe zdjęcia AI (nie w repo, `.gitignore`)

## Workflow publikacji

1. Edytuj `src/` (treść) albo `docs/css|js|img` (zasoby).
2. `python build.py`
3. `git add -A && git commit -m "..." && git push`
4. GitHub Pages publikuje w ~1 min.

## Integracje

- GTM: `GTM-KR2CGSWQ` (konto GTM "sztab-ads.pl" 6234524566, kontener 187128858). W nim GA4 `G-P0WF5085PB` + tag łączący konwersje.
- Consent Mode v2: default denied w `src/layout.html`, baner orestbida/CookieConsent 3.1.0 w `docs/js/consent.js`,
  po decyzji push `cookie_consent_update`.
- Formularz kontaktowy: Web3Forms (`docs/js/form.js`, klucz w `src/pages/kontakt.html`), po sukcesie redirect na `/dziekuje/`
  i push `form_submit_success` do dataLayer.
- Domena: domeny.tv (rejestracja 20.10.2026). DNS: 4 x A na IP GitHub Pages + CNAME www -> sztabkowskimichal-code.github.io.
- GitHub: `sztabkowskimichal-code/sztab-ads`.
