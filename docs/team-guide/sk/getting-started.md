# Začíname s projektom Superodpočet.sk

Vitajte v projekte Superodpočet.sk! Tento návod vám pomôže nastaviť vaše vývojové prostredie a oboznámiť sa s projektom.

## Predpoklady

Pred začatím sa uistite, že máte na svojom počítači nainštalované nasledovné:

1. **Node.js** (verzia 18 alebo vyššia)
   - Stiahnite z: https://nodejs.org/
   - Kontrola inštalácie: Otvorte Terminál/Príkazový riadok a napíšte `node --version`

2. **Git**
   - Stiahnite z: https://git-scm.com/
   - Kontrola inštalácie: Napíšte `git --version`

3. **Editor kódu**
   - Odporúčame **VS Code**: https://code.visualstudio.com/
   - Alternatíva: Akýkoľvek textový editor, s ktorým ste spokojní

4. **GitHub účet**
   - Zaregistrujte sa na: https://github.com/
   - Uistite sa, že máte prístup k repozitáru `smartech-sk/superodpocet`

## Nastavenie vývojového prostredia

### Krok 1: Klonovanie repozitára

1. Otvorte Terminál (Mac/Linux) alebo Príkazový riadok (Windows)
2. Prejdite tam, kde chcete uložiť projekt:
   ```bash
   cd ~/Projects
   ```
3. Naklonujte repozitár:
   ```bash
   git clone https://github.com/smartech-sk/superodpocet.git
   cd superodpocet
   ```

### Krok 2: Inštalácia závislostí

V adresári projektu spustite:
```bash
npm install
```

Toto nainštaluje všetky potrebné balíčky. Môže to trvať niekoľko minút.

### Krok 3: Spustenie vývojového servera

Spustite:
```bash
npm run dev
```

Mali by ste vidieť výstup ako:
```
  🚀  astro  v5.14.1 started in 123ms

  ┃ Local    http://localhost:4321/
  ┃ Network  use --host to expose
```

Otvorte webový prehliadač a prejdite na `http://localhost:4321/`

**Gratulujeme!** Teraz by ste mali vidieť webovú stránku Superodpočet.sk spustenú lokálne.

## Pochopenie štruktúry projektu

Tu je to, čo obsahujú hlavné priečinky:

```
superodpocet/
├── src/                    # Všetok zdrojový kód
│   ├── content/           # Markdown súbory s obsahom (EDITUJTE TIETO!)
│   │   ├── pages/         # Obsah stránok
│   │   └── faq/           # FAQ položky
│   ├── components/        # Znovupoužiteľné UI komponenty
│   ├── layouts/           # Šablóny stránok
│   ├── pages/             # Definície routes
│   └── styles/            # CSS štýly
├── public/                # Statické súbory (obrázky, sťahovania)
├── docs/                  # Dokumentácia (práve ju čítate!)
└── package.json          # Závislosti projektu
```

## Kľúčové technológie

### Astro
- **Čo to je**: Moderný webový framework na tvorbu rýchlych webových stránok
- **Čo potrebujete vedieť**: Generuje statické HTML súbory pre lepší výkon
- **Súbory**: Stránky končiace na `.astro` sú Astro komponenty

### Markdown
- **Čo to je**: Jednoduchý spôsob písania formátovaného textu
- **Čo potrebujete vedieť**: Obsah v `src/content/` používa Markdown
- **Príklad**: `# Nadpis`, `**tučné**`, `*kurzíva*`

### Tailwind CSS
- **Čo to je**: CSS framework pre štýlovanie
- **Čo potrebujete vedieť**: Triedy ako `text-blue-600`, `p-4`, `mb-8` ovládajú vzhľad
- **Pravdepodobne sa toho nebudete musieť dotýkať**: Dizajnér sa postará o štýlovanie

## Vykonanie prvej zmeny

Urobme jednoduchú zmenu, aby sme videli, ako to funguje:

1. Otvorte `src/content/pages/home.md` vo vašom editore
2. Nájdite riadok s `heading:`
3. Zmeňte text na niečo nové
4. Uložte súbor
5. Pozrite sa do prehliadača - mal by sa automaticky aktualizovať!

Toto sa nazýva "hot reload" - zmeny sa objavia okamžite bez obnovenia.

## Bežné príkazy

Spustite tieto v Termináli/Príkazovom riadku z adresára projektu:

| Príkaz | Čo robí |
|--------|---------|
| `npm run dev` | Spustí vývojový server |
| `npm run build` | Zostaví pre produkciu |
| `npm run preview` | Náhľad produkčnej verzie |
| `git status` | Zobrazí, ktoré súbory ste zmenili |
| `git pull` | Získa najnovšie zmeny z GitHubu |
| `git add .` | Pripraví všetky vaše zmeny |
| `git commit -m "správa"` | Uloží vaše zmeny lokálne |
| `git push` | Nahrá vaše zmeny na GitHub |

## Git workflow pre začiatočníkov

Pri práci na projekte:

1. **Pred začatím práce:**
   ```bash
   git pull
   ```
   Toto získa najnovšie zmeny od ostatných členov tímu.

2. **Vykonajte svoje zmeny**
   Upravte súbory vo vašom editore

3. **Skontrolujte, čo ste zmenili:**
   ```bash
   git status
   ```

4. **Uložte svoje zmeny:**
   ```bash
   git add .
   git commit -m "Stručný popis toho, čo ste zmenili"
   git push
   ```

**Dôležité:** Vždy spustite `git pull` pred začatím práce, aby ste sa vyhli konfliktom!

## Získanie pomoci

### Ak niečo nefunguje:

1. Pozorne si prečítajte chybovú hlášku
2. Prečítajte si príručku na riešenie problémov: `docs/team-guide/sk/troubleshooting.md`
3. Požiadajte o pomoc člena tímu
4. Vyhľadajte chybu na Google

### Zdroje:

- **Dokumentácia Astro**: https://docs.astro.build/
- **Príručka Markdown**: https://www.markdownguide.org/
- **Git tutoriál**: https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control

## Čo ďalej?

Teraz, keď máte projekt spustený, môžete:

1. **Naučiť sa upravovať obsah**: Prečítajte si `content-editing.md`
2. **Pochopiť kalkulačky**: Prečítajte si `calculator-guide.md`
3. **Dozvedieť sa o nasadení**: Prečítajte si `deployment.md`

Vitajte v tíme! Neváhajte klásť otázky.
