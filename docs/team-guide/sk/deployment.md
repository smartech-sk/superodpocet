# Návod na nasadenie

Tento návod vysvetľuje, ako sa webová stránka Superodpočet.sk nasadzuje do produkcie pomocou Netlify.

## Prehľad

Stránka používa kontinuálne nasadenie:
- **Push kódu**: Push do `main` vetvy na GitHub
- **Automatické zostavenie**: Netlify automaticky zostáva stránku
- **Automatické nasadenie**: Nová verzia ide automaticky do prevádzky
- **Čas**: Zvyčajne sa dokončí za 2-3 minúty

## Platforma pre nasadenie

Používame **Netlify** (nie GitHub Pages), pretože:
- Podporuje serverless funkcie (potrebné pre OTP/SMS verifikáciu)
- Automatické HTTPS
- Podpora vlastných domén
- Spracovanie formulárov
- Environmentálne premenné
- Náhľady nasadenia pre pull requesty

## Počiatočné nastavenie Netlify

Tieto kroky boli dokončené počas počiatočného nastavenia, ale sú tu zdokumentované pre referenciu:

### 1. Vytvorenie Netlify účtu
- Prejdite na https://www.netlify.com/
- Zaregistrujte sa s GitHub účtom
- Autorizujte Netlify na prístup k repozitárom

### 2. Pripojenie repozitára
1. Kliknite na "Add new site" → "Import an existing project"
2. Vyberte GitHub
3. Vyberte repozitár `smartech-sk/superodpocet`
4. Nakonfigurujte nastavenia zostavenia:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18 alebo vyššia
5. Kliknite na "Deploy site"

### 3. Konfigurácia vlastnej domény
1. V Netlify dashboarde prejdite na "Domain settings"
2. Pridajte vlastnú doménu: `superodpocet.sk`
3. Postupujte podľa inštrukcií pre konfiguráciu DNS:
   - Pridajte CNAME záznam smerujúci na Netlify
   - Alebo aktualizujte A záznam na IP adresu Netlify
4. Počkajte na propagáciu DNS (až 24 hodín)
5. Aktivujte HTTPS (automaticky)

## Workflow nasadenia

### Pre bežné aktualizácie obsahu

Marketingový tým môže aktualizovať obsah bez zapojenia vývojára:

1. **Upravte Markdown súbory** v `src/content/`
2. **Otestujte lokálne**:
   ```bash
   npm run dev
   ```
3. **Uložte zmeny**:
   ```bash
   git add .
   git commit -m "Aktualizácia obsahu VaV stránky"
   git push
   ```
4. **Automatické nasadenie**: Netlify automaticky zostáva a nasadí
5. **Overte**: Skontrolujte https://superodpocet.sk za 2-3 minúty

### Pre zmeny kódu

Vývojári by mali postupovať podľa tohto workflow:

1. **Vytvorte vetvu**:
   ```bash
   git checkout -b feature/nova-kalkulacka
   ```

2. **Vykonajte zmeny a otestujte lokálne**:
   ```bash
   npm run dev
   npm run build
   npm run preview
   ```

3. **Uložte a pushujte**:
   ```bash
   git add .
   git commit -m "Pridanie implementácie VaV kalkulačky"
   git push origin feature/nova-kalkulacka
   ```

4. **Vytvorte Pull Request** na GitHub

5. **Skontrolujte náhľad nasadenia**:
   - Netlify automaticky vytvorí náhľadovú URL
   - Skontrolujte náhľadový link v komentároch PR
   - Dôkladne otestujte pred mergovaním

6. **Merge do main**:
   - Po schválení mergujte PR
   - Automatické nasadenie do produkcie začne

## Proces zostavenia

### Čo sa deje počas zostavenia

1. **Inštalácia závislostí**: `npm install`
2. **Spustenie Astro build**: `npm run build`
   - Kompilácia TypeScript
   - Spracovanie Tailwind CSS
   - Renderovanie Markdown do HTML
   - Generovanie statických súborov
3. **Výstup do `dist/`**: Všetky statické súbory pripravené na poskytovanie
4. **Nasadenie**: Nahratie `dist/` na Netlify CDN

### Čas zostavenia

- Typické zostavenie: 1-2 minúty
- Zahŕňa:
  - Inštalácia závislostí: ~30 sekúnd
  - Astro kompilácia: ~30 sekúnd
  - Optimalizácia assetov: ~30 sekúnd

## Environmentálne premenné

Pre funkcie vyžadujúce citlivé údaje (ako API kľúče):

### Pridanie environmentálnych premenných

1. Prejdite na Netlify dashboard
2. Navigujte na "Site settings" → "Environment variables"
3. Kliknite na "Add a variable"
4. Zadajte kľúč a hodnotu
5. Vyberte "Same value for all deploy contexts" alebo nastavte rôzne hodnoty pre produkciu/náhľad

### Príklad premenných

```
TWILIO_ACCOUNT_SID=vas_account_sid
TWILIO_AUTH_TOKEN=vas_auth_token
TWILIO_PHONE_NUMBER=+421xxxxxxxxx
```

### Použitie v kóde

```typescript
// V serverless funkcii
const accountSid = import.meta.env.TWILIO_ACCOUNT_SID;
```

**Dôležité**: Nikdy neukladajte citlivé hodnoty do Git. Vždy používajte environmentálne premenné.

## Monitorovanie nasadení

### Netlify Dashboard

Prístup k stavu nasadenia:
1. Prejdite na https://app.netlify.com/
2. Vyberte stránku "superodpocet"
3. Pozrite si kartu "Deploys"

Uvidíte:
- Stav nasadenia (building/success/failed)
- Build logy
- Čas nasadenia
- Commit, ktorý spustil nasadenie

### Emailové notifikácie

Nastavenie notifikácií:
1. Prejdite na "Site settings" → "Build & deploy" → "Deploy notifications"
2. Pridajte emailovú notifikáciu pre:
   - Deploy started
   - Deploy succeeded
   - Deploy failed

### Build logy

Ak nasadenie zlyhá:
1. Kliknite na zlyhané nasadenie v dashboarde
2. Pozrite si kompletný build log
3. Hľadajte chybové správy
4. Časté problémy:
   - TypeScript chyby
   - Chýbajúce závislosti
   - Syntaktické chyby v Markdown front matter

## Rollback (návrat)

Ak nasadenie spôsobí problémy:

### Možnosť 1: Rýchly rollback (Netlify)
1. Prejdite na kartu "Deploys"
2. Nájdite posledné fungujúce nasadenie
3. Kliknite na menu "⋯" → "Publish deploy"
4. Potvrďte rollback

### Možnosť 2: Git Revert
```bash
git revert HEAD
git push
```
Toto vytvorí nový commit, ktorý vráti problematické zmeny.

### Možnosť 3: Nasadenie zo starého commitu
1. Nájdite dobrý commit hash: `git log`
2. Vytvorte vetvu z tohto commitu:
   ```bash
   git checkout -b hotfix/rollback abc1234
   git push origin hotfix/rollback
   ```
3. Mergujte do main

## Náhľady nasadenia

Každý pull request automaticky dostane náhľadové nasadenie:

### Prístup k náhľadu
1. Otvorte pull request na GitHub
2. Počkajte na komentár Netlify bota (objaví sa za ~2 minúty)
3. Kliknite na link "Deploy preview"
4. Otestujte na náhľadovej URL

### Výhody
- Otestovanie zmien pred mergovaním
- Zdieľanie náhľadu s tímom pre spätnú väzbu
- Včasné odhalenie problémov

## Optimalizácia výkonu

### Optimalizácia zostavenia

Už nakonfigurované:
- Generovanie statickej stránky (rýchle načítanie)
- Automatická optimalizácia obrázkov
- Minifikácia CSS
- Kompresia HTML

### Ďalšia optimalizácia

Budúce vylepšenia:
- Pridanie caching headerov pre statické assety
- Implementácia lazy loading pre obrázky
- Efektívne použitie web fontov
- Zváženie CDN pre veľké súbory

## Riešenie problémov s nasadením

### Zostavenie zlyhá s "Command failed"

**Príčina**: TypeScript alebo build chyba

**Riešenie**:
1. Spustite `npm run build` lokálne
2. Opravte všetky zobrazené chyby
3. Uložte a pushujte opravu

### Zostavenie zlyhá s "Out of memory"

**Príčina**: Zostavenie vyžaduje viac pamäte

**Riešenie**:
1. Kontaktujte Netlify podporu pre zvýšenie build pamäte
2. Alebo optimalizujte proces zostavenia

### Nasadenie uspeje, ale stránka zobrazuje starý obsah

**Príčina**: Cache prehliadača

**Riešenie**:
1. Hard refresh: Ctrl+Shift+R (Windows) alebo Cmd+Shift+R (Mac)
2. Vymažte cache prehliadača
3. Skúste inkognito/súkromné okno

### Stránka zobrazuje 404 pre všetky stránky

**Príčina**: Chýbajúce redirect pravidlá

**Riešenie**:
1. Skontrolujte, že existuje súbor `public/_redirects`
2. Uistite sa, že je nakonfigurovaný SPA fallback (ak je potrebný)
3. Overte, že build výstup obsahuje všetky očakávané súbory

### Vlastná doména nefunguje

**Príčina**: DNS nie je správne nakonfigurované

**Riešenie**:
1. Overte DNS záznamy v registrátorovi domén
2. Použite Netlify DNS checker nástroj
3. Počkajte na propagáciu DNS (až 48 hodín)
4. Skontrolujte https://dnschecker.org/ pre stav propagácie

## Osvedčené postupy

### Pred nasadením
- ✅ Otestujte lokálne s `npm run dev`
- ✅ Spustite produkčné zostavenie: `npm run build` && `npm run preview`
- ✅ Skontrolujte chyby v konzole
- ✅ Otestujte na veľkostiach mobil/tablet
- ✅ Overte, že všetky odkazy fungujú

### Stratégia nasadenia
- ✅ Nasadzujte počas hodín s nízkou návštevnosťou, ak je to možné
- ✅ Monitorujte prvých niekoľko minút po nasadení
- ✅ Majte pripravený plán rollbacku
- ✅ Oznámte väčšie aktualizácie tímu

### Bezpečnosť
- ✅ Nikdy neukladajte API kľúče alebo tajomstvá do commitu
- ✅ Používajte environmentálne premenné pre citlivé údaje
- ✅ Udržujte závislosti aktualizované
- ✅ Skontrolujte Netlify security headery

## Užitočné príkazy

```bash
# Otestovanie produkčného zostavenia lokálne
npm run build && npm run preview

# Kontrola veľkosti build výstupu
du -sh dist/

# Overenie, že všetky stránky boli správne zostavené
ls -R dist/

# Test s produkčným serverom
npx serve dist/
```

## Zdroje

- **Netlify dokumentácia**: https://docs.netlify.com/
- **Astro nasadenie**: https://docs.astro.build/en/guides/deploy/netlify/
- **Vlastné domény**: https://docs.netlify.com/domains-https/custom-domains/
- **Environmentálne premenné**: https://docs.netlify.com/environment-variables/overview/

## Získanie pomoci

Ak problémy s nasadením pretrvávajú:
1. Skontrolujte Netlify status stránku: https://www.netlifystatus.com/
2. Prezrite si Netlify komunitné fóra
3. Kontaktujte Netlify podporu (dostupná na všetkých plánoch)
4. Požiadajte senior vývojára o pomoc

Zapamätajte si: Väčšina problémov s nasadením sa zachytí lokálnym testovaním s `npm run build` pred pushovaním na GitHub.
