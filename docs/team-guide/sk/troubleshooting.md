# Návod na riešenie problémov

Tento návod vám pomôže vyriešiť bežné problémy, ktoré sa môžu vyskytnúť pri práci na projekte Superodpočet.sk.

## Problémy s vývojovým serverom

### Server sa nespustí

**Chyba**: `npm run dev` zlyhá alebo sa nespustí

**Riešenia**:

1. **Skontrolujte verziu Node.js**:
   ```bash
   node --version
   ```
   Musí byť 18.0.0 alebo vyššia. Ak nie, aktualizujte Node.js.

2. **Preinštalujte závislosti**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Skontrolujte konflikty portov**:
   ```bash
   # Na Mac/Linux
   lsof -i :4321

   # Na Windows
   netstat -ano | findstr :4321
   ```
   Ak sa port 4321 používa, ukončite proces alebo použite iný port.

4. **Vymažte Astro cache**:
   ```bash
   rm -rf .astro
   npm run dev
   ```

### Stránka zobrazuje prázdnu/bielu obrazovku

**Symptómy**: Prehliadač zobrazuje prázdnu stránku alebo len text "Astro"

**Riešenia**:

1. **Počkajte na dokončenie zostavenia**: Počiatočné zostavenie môže trvať 30-60 sekúnd
2. **Skontrolujte terminál pre chyby**: Hľadajte kompiláčné chyby
3. **Vymažte cache prehliadača**: Hard refresh s Ctrl+Shift+R (Windows) alebo Cmd+Shift+R (Mac)
4. **Skontrolujte konzolu prehliadača**: Otvorte DevTools (F12) a hľadajte JavaScript chyby

### Zmeny sa nezobrazujú

**Symptómy**: Upravíte súbor, ale prehliadač sa neaktualizuje

**Riešenia**:

1. **Skontrolujte, že ste súbor uložili**: Ctrl+S alebo Cmd+S
2. **Počkajte niekoľko sekúnd**: Hot reload trvá 1-3 sekundy
3. **Manuálne obnovte**: Stlačte F5 alebo kliknite na obnoviť
4. **Reštartujte dev server**:
   ```bash
   # Zastavte pomocou Ctrl+C, potom:
   npm run dev
   ```
5. **Skontrolujte cestu k súboru**: Uistite sa, že upravujete správny súbor

## Chyby zostavenia

### TypeScript chyby

**Chyba**: `error TS2304: Cannot find name 'X'`

**Riešenia**:

1. **Skontrolujte importy**: Uistite sa, že všetky importy sú správne
   ```typescript
   // Zle
   import { Component } from './Component'

   // Správne
   import Component from './Component.astro'
   ```

2. **Skontrolujte definície typov**: Uistite sa, že typy sú správne definované
3. **Reštartujte TypeScript server** vo VS Code: Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"

### Chyby Markdown front matter

**Chyba**: Zostavenie zlyhá s chybou parsovania YAML

**Riešenia**:

1. **Skontrolujte úvodzovky**: Všetky textové hodnoty musia byť v úvodzovkách
   ```yaml
   # Zle
   title: Môj nadpis

   # Správne
   title: "Môj nadpis"
   ```

2. **Skontrolujte odsadenie**: Použite 2 medzery (nie tabulátory)
   ```yaml
   # Zle
   hero:
   heading: "Nadpis"  # 0 medzier

   # Správne
   hero:
     heading: "Nadpis"  # 2 medzery
   ```

3. **Skontrolujte dvojbodky**: Nezabudnite na dvojbodky po názvoch polí
   ```yaml
   # Zle
   title "Môj nadpis"

   # Správne
   title: "Môj nadpis"
   ```

4. **Skontrolujte pomlčky**: Položky zoznamu potrebujú pomlčky
   ```yaml
   # Zle
   benefits:
     "Prínos 1"
     "Prínos 2"

   # Správne
   benefits:
     - "Prínos 1"
     - "Prínos 2"
   ```

### Chyby content collection

**Chyba**: `Error: Content collection "X" does not exist`

**Riešenia**:

1. **Skontrolujte umiestnenie súboru**: FAQ súbory musia byť v `src/content/faq/`, súbory stránok v `src/content/pages/`
2. **Skontrolujte názov súboru**: Musí používať správny slug (napr. `vyskum-a-vyvoj.md` nie `vav.md` pre stránky)
3. **Skontrolujte front matter**: Musí obsahovať všetky povinné polia

### CSS sa nenačíta

**Chyba**: Stránka sa načíta, ale bez štýlovania

**Riešenia**:

1. **Skontrolujte inštaláciu Tailwind**:
   ```bash
   npm list tailwindcss
   ```

2. **Reštartujte dev server**:
   ```bash
   npm run dev
   ```

3. **Vymažte .astro cache**:
   ```bash
   rm -rf .astro dist
   npm run dev
   ```

## Problémy s Git

### Nie je možné pushnúť na GitHub

**Chyba**: `Permission denied` alebo `Authentication failed`

**Riešenia**:

1. **Skontrolujte, že ste autentifikovaní**:
   ```bash
   git config user.name
   git config user.email
   ```

2. **Použite SSH namiesto HTTPS**: Požiadajte tímového lídra o pomoc s nastavením SSH kľúčov

3. **Skontrolujte prístup k repozitáru**: Uistite sa, že máte právo zápisu do repozitára

### Merge konflikty

**Chyba**: `CONFLICT (content): Merge conflict in X`

**Riešenia**:

1. **Nepanikárte!** Konflikty sú normálne.

2. **Otvorte konfliktný súbor** vo vašom editore. Hľadajte:
   ```
   <<<<<<< HEAD
   Vaše zmeny
   =======
   Ich zmeny
   >>>>>>> branch-name
   ```

3. **Rozhodnite sa, čo ponechať**:
   - Ponechať vaše: Vymažte `<<<`, `===`, `>>>` a ich verziu
   - Ponechať ich: Vymažte `<<<`, `===`, `>>>` a vašu verziu
   - Ponechať oboje: Vymažte značky, zariaďte podľa potreby

4. **Označte ako vyriešené**:
   ```bash
   git add cesta/k/suboru
   git commit
   ```

### Náhodne commitnuté do main

**Chyba**: Commitli ste priamo do `main` namiesto do vetvy

**Riešenia**:

1. **Ak ste ešte nepushnuli**:
   ```bash
   git reset HEAD~1  # Vráti commit, ponechá zmeny
   git checkout -b feature/moja-feature  # Vytvorí vetvu
   git add .
   git commit -m "Vaša správa"
   ```

2. **Ak ste už pushnuli**: Požiadajte tímového lídra o pomoc

### Nesprávna commit správa

**Chyba**: Preklep alebo nesprávna správa v poslednom commite

**Riešenia**:

1. **Ak ste ešte nepushnuli**:
   ```bash
   git commit --amend -m "Správna správa"
   ```

2. **Ak ste už pushnuli**: Nechajte to tak, neoplýva sa to

## Problémy s obsahom

### FAQ sa nezobrazuje

**Symptómy**: Pridali ste FAQ súbor, ale nezobrazuje sa na stránke

**Riešenia**:

1. **Skontrolujte kategóriu**: Musí byť presne `"vav"`, `"investicie"` alebo `"patent-box"` (v úvodzovkách)
2. **Skontrolujte poradie**: Musí byť číslo bez úvodzoviek
   ```yaml
   # Zle
   order: "1"

   # Správne
   order: 1
   ```
3. **Skontrolujte umiestnenie súboru**: Musí byť v `src/content/faq/`
4. **Skontrolujte formát front matter**:
   ```yaml
   ---
   category: "vav"
   order: 1
   question: "Vaša otázka?"
   ---

   Vaša odpoveď tu.
   ```

### Špeciálne znaky rozbíjajú stránku

**Symptómy**: Stránka sa pokazí po pridaní textu so špeciálnymi znakmi

**Riešenia**:

1. **Použite HTML entity** pre špeciálne znaky v Markdown:
   - `&euro;` pre €
   - `&copy;` pre ©
   - `&nbsp;` pre nezlomiteľnú medzeru

2. **Zabezpečte UTF-8 kódovanie**: Ukladajte súbory ako UTF-8 vo vašom editore

3. **Escapujte úvodzovky** vo vnútri textu v úvodzovkách:
   ```yaml
   # Zle
   text: "Povedal "ahoj""

   # Správne
   text: "Povedal \"ahoj\""
   ```

### Odkazy nefungujú

**Symptómy**: Kliknutie na odkaz dá chybu 404

**Riešenia**:

1. **Skontrolujte formát odkazu**:
   ```markdown
   # Zle - chýba úvodná lomka
   [Odkaz](vyskum-a-vyvoj)

   # Správne
   [Odkaz](/vyskum-a-vyvoj)
   ```

2. **Skontrolujte, že stránka existuje**: Overte, že cieľový súbor stránky existuje

3. **Skontrolujte preklepy**: Odkazy rozlišujú veľké a malé písmená

## Problémy s výkonom

### Pomalé časy zostavenia

**Symptómy**: `npm run build` trvá veľmi dlho

**Riešenia**:

1. **Vymažte cache**:
   ```bash
   rm -rf .astro dist node_modules/.vite
   ```

2. **Aktualizujte závislosti**:
   ```bash
   npm update
   ```

3. **Skontrolujte veľké súbory**: Odstráňte náhodne commitnuté veľké súbory

### Pomalé načítanie stránok

**Symptómy**: Stránka je pomalá v prehliadači

**Riešenia**:

1. **Optimalizujte obrázky**: Skomprimujte obrázky pred pridaním do `public/`
2. **Skontrolujte záložku network**: Otvorte DevTools → Network, aby ste videli, co je pomalé
3. **Otestujte produkčné zostavenie**:
   ```bash
   npm run build
   npm run preview
   ```
   Dev režim je pomalší ako produkcia

## Problémy s editorom

### VS Code nedetekuje TypeScript

**Symptómy**: Žiadne automatické dopĺňanie alebo kontrola typov

**Riešenia**:

1. **Nainštalujte odporúčané rozšírenia**:
   - Astro
   - Tailwind CSS IntelliSense

2. **Reštartujte TypeScript server**: Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"

3. **Skontrolujte workspace trust**: VS Code možno nedôveruje priečinku

### Zlyhala syntax highlighting

**Symptómy**: Kód sa zobrazuje neštýlovaný alebo so zlými farbami

**Riešenia**:

1. **Nainštalujte Astro rozšírenie** pre VS Code
2. **Reload VS Code**: Cmd/Ctrl + Shift + P → "Developer: Reload Window"

## Problémy s nasadením

Pozrite si [Návod na nasadenie](./deployment.md#riešenie-problémov-s-nasadením) pre problémy špecifické pre nasadenie.

## Získanie ďalšej pomoci

### Pred žiadosťou o pomoc:

1. ✅ Pozorne si prečítajte chybovú hlášku
2. ✅ Skontrolujte tento návod na riešenie problémov
3. ✅ Vyhľadajte chybu na Google
4. ✅ Skontrolujte, či majú iní rovnaký problém: https://github.com/withastro/astro/issues

### Pri žiadosti o pomoc:

Uveďte:
- Čo ste sa pokúšali urobiť
- Čo ste očakávali, že sa stane
- Čo sa skutočne stalo
- Úplná chybová správa (screenshot alebo copy-paste)
- Vaša verzia Node.js (`node --version`)
- Váš operačný systém

### Zdroje:

- **Astro Discord**: https://astro.build/chat
- **Astro dokumentácia**: https://docs.astro.build/
- **Stack Overflow**: Označte svoju otázku s `astro`
- **Tímový chat**: Opýtajte sa vo vašom tímovom kanáli

## Referencia bežných chybových správ

### `EADDRINUSE: address already in use`
**Význam**: Port 4321 sa už používa
**Riešenie**: Ukončite druhý proces alebo použite iný port

### `Cannot find module 'X'`
**Význam**: Chýbajúca závislosť
**Riešenie**: `npm install`

### `Unexpected token '<'` v konzole prehliadača
**Význam**: Pokus o import HTML ako JavaScript
**Riešenie**: Skontrolujte cesty importov a prípony súborov

### `Failed to fetch dynamically imported module`
**Význam**: Prehliadač nemôže načítať komponent
**Riešenie**: Hard refresh, vymazanie cache, reštart dev servera

### `Error: ENOENT: no such file or directory`
**Význam**: Súbor alebo priečinok neexistuje
**Riešenie**: Skontrolujte cestu k súboru, vytvorte chýbajúci priečinok

### `SyntaxError: Unexpected end of JSON input`
**Význam**: Neplatný JSON, pravdepodobne v front matter
**Riešenie**: Skontrolujte chýbajúce čiarky, úvodzovky alebo zátvorky v YAML

## Tipy na prevenciu

Aby ste sa vyhli problémom:

- ✅ Vždy `git pull` pred začatím práce
- ✅ Testujte lokálne pred commitovaním
- ✅ Spustite `npm run build` pre zachytenie chýb zostavenia
- ✅ Používajte VS Code built-in problems panel
- ✅ Udržujte závislosti aktualizované s `npm update`
- ✅ Neupravujte súbory priamo v `dist/` alebo `.astro/`
- ✅ Používajte `git status` často, aby ste videli, čo sa zmenilo

Zapamätajte si: Každý sa stretáva s týmito problémami! Nebojte sa požiadať o pomoc.
