"""Generuje gotową stronę w docs/ z plików w src/.

Uruchomienie: python build.py
- src/layout.html   - wspólny szkielet (head, nagłówek, stopka)
- src/pages/*.html  - treść <main> każdej podstrony
- src/pages.json    - lista podstron z tytułami i opisami
- docs/             - wynik; css/, js/, img/ leżą tam na stałe (nie są generowane)

Indeksowanie: INDEXING = False oznacza noindex na całej stronie (decyzja z 07.2026).
Zmień na True dopiero na wyraźne polecenie.
"""
import json
import pathlib
import time
from datetime import date

INDEXING = False

ROOT = pathlib.Path(__file__).parent
SRC = ROOT / "src"
OUT = ROOT / "docs"
BASE_URL = "https://sztab-ads.pl"

SCHEMA = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "SztabAds - Michał Sztabkowski",
    "url": BASE_URL + "/",
    "email": "sztabkowski.michal@gmail.com",
    "description": "Freelancer Google Ads. Kampanie Search, Shopping i Performance Max optymalizowane pod sprzedaż i koszt pozyskania klienta.",
    "image": BASE_URL + "/img/michal-sztabkowski-portret.jpg",
    "areaServed": "PL",
    "founder": {
        "@type": "Person",
        "name": "Michał Sztabkowski",
        "jobTitle": "Specjalista Google Ads",
    },
}


def build():
    layout = (SRC / "layout.html").read_text(encoding="utf-8")
    pages = json.loads((SRC / "pages.json").read_text(encoding="utf-8"))
    version = str(int(time.time()))
    sitemap_urls = []

    for page in pages:
        content = (SRC / "pages" / page["file"]).read_text(encoding="utf-8")
        url = BASE_URL + page["path"]
        robots = page.get("robots") or ("index, follow" if INDEXING else "noindex, nofollow")
        schema = ""
        if page.get("schema"):
            schema = '    <script type="application/ld+json">' + json.dumps(SCHEMA, ensure_ascii=False) + "</script>"
        scripts = "".join(f'<script src="{s}?v={version}"></script>\n' for s in page.get("scripts", []))

        html = layout
        for key, value in {
            "title": page["title"],
            "desc": page["desc"],
            "url": url,
            "robots": robots,
            "schema": schema,
            "content": content,
            "body_class": page.get("body_class", "page"),
            "year": str(date.today().year),
            "version": version,
            "page_scripts": scripts,
        }.items():
            html = html.replace("{{" + key + "}}", value)

        assert "{{" not in html, f"Niezastąpiony placeholder w {page['file']}"

        if page.get("out"):
            target = OUT / page["out"]
        elif page["path"] == "/":
            target = OUT / "index.html"
        else:
            target = OUT / page["path"].strip("/") / "index.html"
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(html, encoding="utf-8")
        print("ok", target.relative_to(ROOT))

        if "noindex" not in robots:
            sitemap_urls.append(url)

    (OUT / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + "".join(f"  <url><loc>{u}</loc></url>\n" for u in sitemap_urls)
        + "</urlset>\n",
        encoding="utf-8",
    )
    robots_txt = "User-agent: *\n" + ("Allow: /\n" if INDEXING else "Disallow: /\n")
    if INDEXING:
        robots_txt += f"\nSitemap: {BASE_URL}/sitemap.xml\n"
    (OUT / "robots.txt").write_text(robots_txt, encoding="utf-8")
    (OUT / "CNAME").write_text("sztab-ads.pl\n", encoding="utf-8")
    (OUT / ".nojekyll").write_text("", encoding="utf-8")
    print("ok sitemap.xml, robots.txt, CNAME, .nojekyll (INDEXING =", INDEXING, ")")


if __name__ == "__main__":
    build()
