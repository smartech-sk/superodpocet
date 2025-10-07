# Návod na úpravu obsahu

Tento návod vysvetľuje, ako upravovať obsah webovej stránky pomocou Markdown súborov. Ideálne pre členov marketingového tímu, ktorí potrebujú aktualizovať text bez nutnosti zasahovať do kódu.

## Čo môžete upravovať

Všetok upraviteľný obsah je v **Markdown súboroch** (.md) umiestnených v `src/content/`:

- **Obsah stránok**: `src/content/pages/` (home.md, vyskum-a-vyvoj.md, atď.)
- **FAQ položky**: `src/content/faq/` (vav-01.md, investicie-01.md, atď.)

## Úprava obsahu stránok

### Príklad: Zmena domovskej stránky

1. Otvorte `src/content/pages/home.md`
2. Uvidíte túto štruktúru:

```yaml
---
title: "Domov"
description: "Váš popis"
hero:
  heading: "Uvítací nadpis"
  text: "Uvítací text"
cards:
  - title: "Karta 1"
    description: "Popis"
    link: "/vyskum-a-vyvoj"
    linkText: "Zistiť viac"
---
```

3. Upravte text medzi úvodzovkami
4. Uložte súbor
5. Pozrite sa do prehliadača (automaticky sa obnoví)

### Čo môžete meniť

- **title**: Názov stránky (zobrazuje sa v karte prehliadača)
- **description**: SEO popis
- **hero.heading**: Hlavný nadpis na stránke
- **hero.text**: Text pod nadpisom
- **cards**: Navigačné karty (názov, popis, text odkazu)
- **benefits**: Zoznamy s odrážkami
- **warning**: Text upozornenia/oznámenia

## Markdown syntax - stručný prehľad

### Nadpisy
```markdown
# Veľký nadpis
## Stredný nadpis
### Malý nadpis
```

### Formátovanie textu
```markdown
**tučný text**
*kurzíva*
[text odkazu](https://example.com)
```

### Zoznamy
```markdown
- Odrážka 1
- Odrážka 2

1. Číslovaná položka 1
2. Číslovaná položka 2
```

## Pridávanie FAQ položiek

### Krok 1: Vytvorenie nového súboru

Vytvorte nový súbor v `src/content/faq/` s týmto pomenovaním:
- VaV: `vav-11.md` (ďalšie číslo)
- Investície: `investicie-05.md`
- Patent Box: `patent-box-07.md`

### Krok 2: Použite túto šablónu

```markdown
---
category: "vav"
order: 11
question: "Vaša otázka tu?"
---

Vaša odpoveď tu. Môžete použiť **tučné**, *kurzívu* a zoznamy.

- Bod 1
- Bod 2
```

### Krok 3: Uložte a skontrolujte

FAQ sa automaticky objaví na správnej stránke, zoradené podľa čísla `order`.

## Bežné úlohy

### Zmena hlavného nadpisu

Súbor: `src/content/pages/vyskum-a-vyvoj.md`

Nájdite:
```yaml
hero:
  heading: "Aktuálny nadpis"
```

Zmeňte na:
```yaml
hero:
  heading: "Nový nadpis"
```

### Pridanie položky prínosu

Nájdite sekciu `benefits:`:

```yaml
benefits:
  - "Existujúci prínos 1"
  - "Existujúci prínos 2"
  - "NOVÝ: Pridajte svoj nový prínos tu"
```

### Odstránenie karty (domovská stránka)

V `home.md` nájdite sekciu `cards:` a odstráňte celý blok karty:

```yaml
cards:
  - title: "Ponechať toto"
    # ... ponechať
  - title: "Vymazať toto"  # VYMAZAŤ CELÝ TENTO BLOK
    description: "..."
    link: "..."
    linkText: "..."
  - title: "Ponechať toto"
    # ... ponechať
```

## Osvedčené postupy

### Robiť
- ✅ Vždy používajte správne úvodzovky: `"text"` nie `text`
- ✅ Zachovajte konzistentné medzery (2 medzery pre odsadenie)
- ✅ Ukladajte súbory v kódovaní UTF-8
- ✅ Otestujte zmeny v prehliadači pred uložením do gitu
- ✅ Použite `git pull` pred úpravou

### Nerobiť
- ❌ Neupravujte súbory s kódom (.astro, .ts, .js)
- ❌ Neodstraňujte oddeľovače `---`
- ❌ Nemeňte názvy polí (ako `title:`, `hero:`)
- ❌ Nezabudnite uložiť súbor
- ❌ Nepoužívajte typografické úvodzovky („ ") - použite rovné úvodzovky (" ")

## Riešenie problémov

### Stránka sa po mojej zmene nenačíta

**Príčina**: Chyba syntaxe v YAML hlavičke

**Riešenie**:
1. Skontrolujte, či ste neodstránili alebo nepridali extra `-` alebo `:`
2. Uistite sa, že všetky úvodzovky sa zhodujú
3. Vráťte svoju zmenu a skúste to znova

### Moje zmeny sa nezobrazujú

**Príčina**: Súbor neuložený alebo nesprávny súbor

**Riešenie**:
1. Uistite sa, že ste uložili (Ctrl+S / Cmd+S)
2. Skontrolujte, či upravujete správny súbor
3. Vymažte cache prehliadača (Ctrl+Shift+R / Cmd+Shift+R)

### FAQ sa nezobrazuje

**Príčina**: Nesprávna kategória alebo chýbajúce polia

**Riešenie**:
1. Skontrolujte, že `category` sa zhoduje: "vav", "investicie" alebo "patent-box"
2. Uistite sa, že `order` je číslo (nie v úvodzovkách)
3. Skontrolujte, že oddeľovače `---` sú prítomné

## Príklad: Kompletná úprava stránky

Zmeňme nadpis stránky VaV:

1. Otvorte `src/content/pages/vyskum-a-vyvoj.md`
2. Nájdite:
   ```yaml
   hero:
     heading: "Premeňte inováciu na konkurenčnú výhodu"
   ```
3. Zmeňte na:
   ```yaml
   hero:
     heading: "Nový nadpis pre VaV stránku"
   ```
4. Uložte (Ctrl+S)
5. Skontrolujte prehliadač na `http://localhost:4321/vyskum-a-vyvoj`

## Git workflow pre úpravy obsahu

```bash
# 1. Získajte najnovšie zmeny
git pull

# 2. Vykonajte svoje úpravy

# 3. Skontrolujte, čo sa zmenilo
git status

# 4. Uložte zmeny
git add .
git commit -m "Aktualizácia nadpisu VaV stránky"
git push
```

## Potrebujete pomoc?

- Opýtajte sa vývojára v tíme
- Skontrolujte návod na riešenie problémov
- Pozrite si vzorové FAQ súbory ako referenciu

Zapamätajte si: **Nemôžete nič pokaziť!** Git uchováva celú históriu, takže zmeny sa vždy dajú vrátiť späť.
