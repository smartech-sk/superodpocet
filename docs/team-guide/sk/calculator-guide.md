# Návod na implementáciu kalkulačiek

Tento návod vysvetľuje, ako fungujú kalkulačky daňových odpočtov a ako ich aktualizovať pri zmene daňových sadzieb alebo predpisov.

## Prehľad

Webová stránka obsahuje tri interaktívne kalkulačky:

1. **Kalkulačka superodpočtu VaV** (`/vyskum-a-vyvoj`)
2. **Kalkulačka investícií do Priemyslu 4.0** (`/investicie`)
3. **Kalkulačka Patent Box** (`/patent-box`)

**Aktuálny stav**: Kalkulačky sú zatiaľ v podobe zástupných textov s hláškou "Kalkulačka bude implementovaná v ďalšej fáze".

## Kde sa kalkulačky nachádzajú

Každá sekcia kalkulačky je už definovaná v súboroch stránok:

- `src/pages/vyskum-a-vyvoj.astro` - Riadky 90-104
- `src/pages/investicie.astro` - Riadky 90-101
- `src/pages/patent-box.astro` - Riadky 93-104

## Plánovaná štruktúra kalkulačiek

### Kalkulačka superodpočtu VaV

**Účel**: Vypočítať daňovú úsporu zo superodpočtu na VaV

**Vstupy**:
- Ročné výdavky na VaV (€)
- Typ spoločnosti (malá/stredná/veľká)
- Daňový rok (2024/2025)

**Výpočet**:
- Sadzba odpočtu: 200% pre malé spoločnosti, 150% pre stredné, 125% pre veľké
- Sadzba dane z príjmov: 21% (2024), prípadne upravená pre 2025
- Daňová úspora = Výdavky na VaV × (sadzba odpočtu - 100%) × daňová sadzba

**Príklad**:
```
Výdavky na VaV: 50 000 €
Spoločnosť: Malá (odpočet 200%)
Extra odpočet: 50 000 € (dodatočných 100%)
Daňová úspora: 50 000 € × 0,21 = 10 500 €
```

### Kalkulačka investícií do Priemyslu 4.0

**Účel**: Vypočítať daňovú úsporu zo superodpočtu na investície do Priemyslu 4.0

**Vstupy**:
- Suma investície (€)
- Typ investície (oprávnené technológie)
- Daňový rok (2024/2025)

**Výpočet**:
- Sadzba odpočtu: 150% (podľa § 30e)
- Sadzba dane z príjmov: 21%
- Minimálna investícia: Treba overiť prah
- Daňová úspora = Investícia × 50% × daňová sadzba

**Príklad**:
```
Investícia: 100 000 €
Extra odpočet: 50 000 € (dodatočných 50%)
Daňová úspora: 50 000 € × 0,21 = 10 500 €
```

### Kalkulačka Patent Box

**Účel**: Vypočítať daňovú úsporu zo zníženia príjmov z duševného vlastníctva

**Vstupy**:
- Ročný príjem z duševného vlastníctva (€)
- Typ kvalifikovaného duševného vlastníctva (patent, úžitkový vzor, atď.)
- Nexus pomer (pomer výdavkov na VaV)

**Výpočet**:
- Zníženie dane: Efektívna sadzba 5,25% namiesto 21%
- Sadzba úspory: 75% zníženie na kvalifikovaný príjem
- Daňová úspora = Príjem z duševného vlastníctva × nexus pomer × (21% - 5,25%)

**Príklad**:
```
Príjem z duševného vlastníctva: 200 000 €
Nexus pomer: 100% (plne kvalifikovaný)
Bežná daň: 200 000 € × 0,21 = 42 000 €
Patent Box daň: 200 000 € × 0,0525 = 10 500 €
Daňová úspora: 31 500 €
```

## Plán implementácie

### Krok 1: Vytvorenie komponentov kalkulačiek

Vytvorte interaktívne komponenty kalkulačiek pomocou Astro islands (alebo vanilla JavaScript):

```
src/components/calculators/
├── VavCalculator.astro
├── InvesticieCalculator.astro
└── PatentBoxCalculator.astro
```

### Krok 2: Nahradenie zástupného obsahu

V každom súbore stránky nahraďte:

```astro
<div class="bg-white rounded-lg shadow-md p-8">
  <p class="text-center text-gray-600">
    Kalkulačka bude implementovaná v ďalšej fáze.
  </p>
</div>
```

Týmto:

```astro
<div class="bg-white rounded-lg shadow-md p-8">
  <VavCalculator />
</div>
```

### Krok 3: Pridanie konfigurácie daňových sadzieb

Vytvorte konfiguračný súbor pre daňové sadzby a percentá odpočtov:

```typescript
// src/config/tax-rates.ts
export const TAX_RATES = {
  2024: {
    corporate: 0.21,
    patentBox: 0.0525,
  },
  2025: {
    corporate: 0.21, // Aktualizovať pri oznámení sadzieb pre 2025
    patentBox: 0.0525,
  },
};

export const DEDUCTION_RATES = {
  vav: {
    small: 2.0,    // 200%
    medium: 1.5,   // 150%
    large: 1.25,   // 125%
  },
  investicie: 1.5, // 150%
};
```

## Aktualizácia daňových sadzieb

Keď sa zmenia daňové sadzby (zvyčajne sa oznamujú v decembri pre nasledujúci rok):

1. **Otvorte** `src/config/tax-rates.ts`
2. **Aktualizujte** sadzby pre nový rok
3. **Otestujte** všetky tri kalkulačky s príkladovými hodnotami
4. **Uložte** zmeny s jasným popisom:
   ```bash
   git add src/config/tax-rates.ts
   git commit -m "Aktualizácia daňových sadzieb pre rok 2026"
   git push
   ```

## Funkcie kalkulačiek

### Základné funkcie
- Výpočet v reálnom čase počas písania
- Validácia vstupov (len kladné čísla)
- Prehľadné formátovanie hodnot v menách
- Responzívny dizajn pre mobil/tablet

### Pokročilé funkcie (budúce)
- Porovnanie viacerých rokov
- Export výsledkov do PDF
- Uloženie výpočtov na neskôr
- Odoslanie výsledkov emailom konzultantovi

## Testovanie kalkulačiek

Pred nasadením aktualizácií kalkulačiek:

1. **Test so známymi hodnotami**:
   - Použite príklady z dokumentácie Finančnej správy SR
   - Overte, že výpočty zodpovedajú oficiálnym príkladom

2. **Test hraničných prípadov**:
   - Nulové hodnoty
   - Veľmi veľké čísla
   - Maximálne limity odpočtov

3. **Test na viacerých zariadeniach**:
   - Desktop (Chrome, Firefox, Safari)
   - Mobil (iOS Safari, Android Chrome)
   - Tablet

## Pravidlá validácie kalkulačiek

### Kalkulačka VaV
- Výdavky musia byť > 0
- Typ spoločnosti je povinný
- Rok musí byť aktuálny alebo budúci

### Kalkulačka investícií
- Suma investície musí spĺňať minimálny prah
- Musí byť vybraná kategória oprávnenej technológie
- Nesmie prekročiť ročné maximum (ak sa uplatňuje)

### Kalkulačka Patent Box
- Príjem z duševného vlastníctva musí byť > 0
- Nexus pomer musí byť medzi 0-100%
- Musí byť vybraný typ kvalifikovaného duševného vlastníctva

## Riešenie problémov

### Kalkulačka sa neaktualizuje
**Problém**: Výsledky sa nemenia pri zmene vstupov
**Riešenie**: Skontrolujte konzolu prehliadača pre chyby JavaScript

### Nesprávne výsledky výpočtu
**Problém**: Výsledky nesúhlasia s ručnými výpočtami
**Riešenie**:
1. Overte daňové sadzby v `tax-rates.ts`
2. Skontrolujte výpočtový vzorec v komponente kalkulačky
3. Uistite sa, že vstupné hodnoty sa správne parsujú (reťazec na číslo)

### Problémy s rozložením na mobile
**Problém**: Kalkulačka vyzerá rozbitá na mobile
**Riešenie**: Otestujte responzívne triedy v Tailwind, uistite sa o správnej veľkosti kontajnerov

## Zdroje

- **Finančná správa SR**: https://www.financnasprava.sk/
- **Zákon o superodpočte VaV**: § 30c zákona o dani z príjmov
- **Zákon o Priemysle 4.0**: § 30e zákona o dani z príjmov
- **Zákon o Patent Box**: § 12a zákona o dani z príjmov

## Získanie pomoci

Ak potrebujete upraviť logiku kalkulačky:
1. Pozrite si príklady výpočtov v tomto návode
2. Poraďte sa s daňovým poradcom pri regulačných zmenách
3. Dôkladne otestujte pred nasadením
4. Požiadajte senior vývojára o code review

**Poznámka**: Logika kalkulačiek by mala byť vždy skontrolovaná daňovým odborníkom, aby sa zabezpečila presnosť a súlad s aktuálnym slovenským daňovým právom.
