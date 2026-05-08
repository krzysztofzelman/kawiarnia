# Kawa i Ciasteczko 🍪☕

Responsywna strona internetowa dla kawiarni **Kawa i Ciasteczko** — przytulnego miejsca z domowymi wypiekami, najlepszą kawą i wyjątkową atmosferą.

🌐 **Strona live:** [kawiarnia-swart.vercel.app](https://kawiarnia-swart.vercel.app)

---

## 🧱 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Język:** TypeScript
- **Stylizacja:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Baza danych:** [Supabase](https://supabase.com/) (PostgreSQL)
- **Hosting:** [Vercel](https://vercel.com/)
- **Czcionki:** Geist (via `next/font`)

---

## ✨ Funkcjonalności

| Sekcja | Opis |
|--------|------|
| 🏠 **Hero** | Powitanie z przyciskiem "Zamów online" |
| 📖 **About** | Opis kawiarni z wyróżnieniami (ręcznie palona kawa, domowe wypieki, kameralna atmosfera, darmowe Wi-Fi) |
| 🛒 **Offer** | 4 karty oferty: Kawa, Herbata, Ciasta, Śniadania |
| 📋 **Menu** | 6 pozycji menu z nazwą, ceną i opisem |
| 📞 **Contact** | Dane kontaktowe + formularz wiadomości (zapis do Supabase) + godziny otwarcia |
| 🛵 **OrderModal** | Modal "Zamów online" — zapis email na powiadomienia (zapis do Supabase) |
| 🎬 **Animacje** | Fade-in podczas scrollowania (`useInView` hook) |
| 📱 **PWA** | Service Worker, manifest, możliwość instalacji na telefonie |
| ♿ **Dostępność** | Skip-to-content link, role aria, responsywność |

---

## 🗄️ Supabase — struktura bazy

5 tabel w Supabase (PostgreSQL):

| Tabela | Opis | RLS |
|--------|------|-----|
| `menu_items` | Pozycje menu (6 domyślnych) | Public SELECT |
| `offers` | Karty oferty (4 domyślne) | Public SELECT |
| `opening_hours` | Godziny otwarcia (3 domyślne) | Public SELECT |
| `contact_submissions` | Wiadomości z formularza kontaktowego | Public INSERT |
| `newsletter_signups` | Zapisy email z OrderModal (unikalne) | Public INSERT |

---

## 🚀 Uruchomienie lokalne

```bash
# 1. Sklonuj repozytorium
git clone https://github.com/krzysztofzelman/kawiarnia.git
cd kawiarnia

# 2. Zainstaluj zależności
npm install

# 3. Skonfiguruj zmienne środowiskowe
#    Utwórz plik .env.local w katalogu głównym:
cp .env.example .env.local

# 4. Wypełnij .env.local danymi z Supabase:
#    NEXT_PUBLIC_SUPABASE_URL=https://twoj-projekt.supabase.co
#    NEXT_PUBLIC_SUPABASE_ANON_KEY=twoj_anon_key

# 5. Uruchom serwer deweloperski
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce.

---

## 🗺️ Struktura projektu

```
├── app/
│   ├── layout.tsx      # Root layout (meta, fonty, PWA)
│   ├── page.tsx        # Strona główna (async, fetch z Supabase)
│   └── globals.css     # Tailwind + zmienne kolorów
├── components/
│   ├── Header.tsx      # Nawigacja + przycisk "Zamów online"
│   ├── Hero.tsx        # Sekcja powitalna
│   ├── About.tsx       # O kawiarni
│   ├── Offer.tsx       # Karty oferty (dynamiczne z Supabase)
│   ├── Menu.tsx        # Lista menu (dynamiczne z Supabase)
│   ├── Contact.tsx     # Dane kontaktowe + formularz (Server Action)
│   ├── OrderModal.tsx  # Modal zapisu email (Server Action)
│   ├── Footer.tsx      # Stopka
│   ├── FadeIn.tsx      # Animacja scroll (Client Component)
│   ├── OfflineNotice.tsx
│   ├── PwaInstallPrompt.tsx
│   └── ServiceWorkerRegister.tsx
├── data/
│   ├── menu.ts         # Statyczne dane menu (fallback)
│   ├── offer.ts        # Statyczne dane oferty (fallback)
│   ├── contact.ts      # Dane kontaktowe
│   └── openingHours.ts # Statyczne godziny (fallback)
├── hooks/
│   └── useInView.ts    # Hook do animacji scroll
├── lib/supabase/
│   ├── server.ts       # Klient Supabase (server-only)
│   ├── actions.ts      # Server Actions (formularze)
│   └── types.ts        # Typy TypeScript dla tabel
├── public/
│   ├── icons/          # Ikony PWA
│   ├── manifest.json   # Manifest PWA
│   └── sw.js           # Service Worker
└── supabase/
    └── migration.sql   # Schemat bazy + seed danych
```

---

## 🧪 Build

```bash
npm run build    # Kompilacja produkcyjna
npm run lint     # ESLint
npm run dev      # Serwer deweloperski
```

---

## 🌍 Deployment na Vercel

Projekt jest skonfigurowany do automatycznego deployu z brancha `main` przez Vercel.

**Wymagane zmienne środowiskowe na Vercelu:**

| Zmienna | Wartość |
|---------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL twojego projektu Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon/public key z Supabase |

Po pushu na `main` Vercel automatycznie buduje i deployuje nową wersję.

---

## 📄 Licencja

MIT
