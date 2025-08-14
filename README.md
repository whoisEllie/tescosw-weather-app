# TescoSW Weather App

## 1. Popis aplikace

Tato aplikace poskytuje uživatelům aktuální informace o počasí pro jakékoli město na celém světě. Uživatelé mohou vyhledat město a zobrazit aktuální stav počasí, včetně teploty, rychlosti větru a obecného stavu počasí. Kromě toho aplikace nabízí **tlačítko geolokace**, které umožňuje rychle zobrazit počasí pro aktuální polohu uživatele. Kromě aktuálního dne aplikace také zobrazuje **5denní předpověď** ve formě denních souhrnů, což umožňuje uživatelům plánovat nadcházející počasí

---

## 2. Spuštění aplikace

Pro spuštění aplikace lokálně postupujte následovně:

1. Naklonujte repozitář:

   ```bash
   git clone https://github.com/whoisEllie/tescosw-weather-app
   cd tescosw-weather-app
   ```
2. Nainstalujte závislosti:

   ```bash
   npm install
   ```
3. Spusťte vývojový server:

   ```bash
   npm run dev
   ```
4. Vytvořte produkční build:

   ```bash
   npm run build
   ```

**Proměnné prostředí:**

* Vytvořte soubor `.env` v kořenovém adresáři repozitáře s následující proměnnou:

  ```text
  VITE_OPENWEATHERMAP_API_KEY=<your_api_key_here>
  ```

Aplikace využívá [OpenWeatherMap API](https://openweathermap.org/api) pro získávání dat o počasí. Žádné další externí služby nejsou potřebné

---

## 3. Podporované prohlížeče

Aplikace byla testována v následujících prohlížečích:

* Google Chrome (nejnovější verze)
* Mozilla Firefox (nejnovější verze)

Ostatní prohlížeče mohou fungovat, ale tyto byly ověřeny pro plnou funkčnost

---

## 4. Vnitřní struktura

Projekt je postaven pomocí **React** pro uživatelské rozhraní, **TypeScript** pro typovou bezpečnost a **React-Redux** pro správu stavu. Hlavní struktura je organizována takto:

* `src/components` — Znovupoužitelné komponenty UI, např. vyhledávací lišta a zobrazení počasí
* `src/state` — Redux slices pro správu dat o počasí a interakcí uživatele
* `src/api` — Funkce pro získávání dat z OpenWeatherMap API
* `src/styles` — Globální a komponentově specifické styly
* `src/utils` — Pomocné funkce pro lokalizaci
* `src/App.tsx` & `src/main.tsx` — Vstupní body aplikace a hlavní layout

**Poznámky:**

* Redux se používá pro uchování aktuálního města a dat o počasí ve centralizovaném store.
* TypeScript zajišťuje typovou bezpečnost ve všech komponentách a logice stavu.
* Struktura složek odděluje UI, stav a logiku API pro přehlednost a škálovatelnost.

## 5. CI/CD a nasazení

Projekt má nastavené CI/CD prostřednictvím služby Vercel, takže každá změna v repozitáři je automaticky nasazena.

Aplikace je dostupná na [weather.elliekelemen.com](weather.elliekelemen.com)
