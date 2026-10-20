# Historia działań - SztabAds

## 2026-10-20/21 - Migracja z WordPressa na stronę statyczną (GitHub Pages)

**Powód:** domena sztab-ads.pl wygasła, hosting hosting24.pl nieopłacony, SSL (darmowy 90 dni) wygasł. WordPress nie był do niczego potrzebny.

**Decyzje:**
- Domena odkupiona na domeny.tv (14,99 zł netto pierwszy rok, odnowienie 99 zł netto).
- Hosting: GitHub Pages (0 zł), konto `sztabkowskimichal-code`, repo `sztab-ads`, publikacja z folderu `docs/` na gałęzi `main`. SSL Let's Encrypt automatycznie.
- Nowy folder projektu `D:/claude-code/sztab-ads/` (stary `wordpress/sztab-ads/` zostaje jako archiwum motywu i zdjęć).

**Co zrobione:**
- Cała treść motywu v3.0.0 przeniesiona 1:1 do statycznego HTML (`src/pages/`), wspólny layout w `src/layout.html`, generator `build.py`.
- CSS skopiowany bez zmian designu; usunięte selektory CF7, dodane style formularza i banera cookies.
- Formularz CF7 zastąpiony przez Web3Forms (fetch + redirect na /dziekuje/), dodany checkbox zgody RODO i honeypot.
- Nowa polityka prywatności (stara była w bazie WP i przepadła).
- GTM `GTM-KR2CGSWQ` wklejony bezpośrednio + Consent Mode v2 default denied + baner CookieConsent 3.1.0 (PL).
- Strona 404, sitemap.xml, robots.txt, CNAME, .nojekyll.
- Noindex zachowany (INDEXING = False) zgodnie z decyzją z 07.2026.

**Stan na 21.10.2026 (koniec sesji):**
- Repo `sztabkowskimichal-code/sztab-ads` założone (publiczne), kod wypchnięty, `gh` zainstalowany i zalogowany.
- GitHub Pages włączone: gałąź `main`, folder `/docs`, domena `sztab-ads.pl` przypisana, HTTPS jeszcze niewymuszony (czeka na DNS).
- Klucz Web3Forms wstawiony do formularza.

**Do zrobienia:**
- Rekordy DNS na domeny.tv (A: 185.199.108.153, .109.153, .110.153, .111.153; CNAME www -> sztabkowskimichal-code.github.io; usunąć parking A 185.221.110.23).
- Po propagacji: `gh api -X PUT repos/sztabkowskimichal-code/sztab-ads/pages -F https_enforced=true` i test https://sztab-ads.pl.
- Podmiana niepotwierdzonych metryk na /realizacje/ i w sekcji "Wyniki" na home.

---


## 2026-07-12/13 - Pełny audyt + redesign strony i treści

**Audyt - najważniejsze znaleziska:**
- Cała strona ma `noindex, nofollow` (opcja "Proś wyszukiwarki o nieindeksowanie" w WP). Włączyłem indeksowanie podczas audytu, ale użytkownik cofnął decyzję (13.07.2026) - noindex jest CELOWY do czasu ukończenia strony. `blog_public = 0`. Włączyć dopiero na wyraźne polecenie.
- Brak polityki prywatności przy działającym formularzu CF7 i GTM - utworzona strona `/polityka-prywatnosci/` (ID 30) + notka pod formularzem.
- Meta description tylko na home, brak OG tagów, brak schema.org, brak favicony, błędy heading-order, opublikowana "Sample Page" (usunięta), tytuł "Dziekuje" bez PL znaków (poprawiony).
- Dwie wtyczki GTM naraz (GTM4WP + GTM Kit) - DO ZROBIENIA: zostawić jedną. Elementor + GP Premium + Hello Dolly nieużywane - DO ZROBIENIA: usunąć.
- Brak banera cookie consent mimo GTM/GA4 - DO ZROBIENIA (mamy gotowy wzorzec CookieConsent + stub gtag).
- Checkbox zgody w formularzu CF7 - DO ZROBIENIA w wp-admin (edycja formularza ID 2678078).

**Redesign motywu (v3.0.0):**
- Nowa identyfikacja: granat sztabowy (#10233c) + żółty sygnałowy marker (#ffc42e), zamiast szablonowego niebieskiego SaaS.
- Typografia: Bricolage Grotesque (nagłówki) + Instrument Sans (tekst) + IBM Plex Mono (etykiety, metryki).
- Element podpisu: żółty highlight-marker na kluczowych słowach + mono-eyebrows sekcji; logo z żółtym blokiem na "Ads".
- Przebudowana strona główna: hero z nowym copy, sekcja "Dlaczego ja" (optymalizacja pod wynik / pułapki Google / budżet jak własny - z wniosków ze spotkań sprzedażowych), teaser usług, ciemna sekcja wyników, skrót "O mnie" z branżami (bez nazw klientów), proces 3 kroki, narzędzia, CTA.
- Menu "O mnie" wskazuje na /o-mnie/ (wcześniej /#o-mnie), stopka + link do polityki prywatności.
- functions.php: meta description i title per podstrona, OG tagi, JSON-LD (ProfessionalService), favicon.svg, preconnect fonts.
- Nowe zdjęcie: `img/michal-sztabkowski-portret.jpg` (z foto/tshirt-barki-przod-bezrak/wariant_2_1.png, 928x1152, JPG 71 KB); stare michal-sztabkowski.jpg usunięte lokalnie i z serwera.

**Wyniki Lighthouse (desktop, home):** SEO 69 -> 100, Accessibility 89 -> 97, Best Practices 77 (blokuje third-party cookies Google - do poprawy przy consent mode).

**Deployment:** `deploy.py` (FTP, dane z .env) - `python deploy.py [pliki...]`, bez argumentów wgrywa cały motyw.
