-- ============================================================
-- Kawa i Ciasteczko — pełna migracja (DROP + CREATE)
-- ============================================================

-- Usuń istniejące tabele (kolejność: zależne najpierw)
DROP TABLE IF EXISTS contact_submissions CASCADE;
DROP TABLE IF EXISTS newsletter_signups CASCADE;
DROP TABLE IF EXISTS menu_items CASCADE;
DROP TABLE IF EXISTS offers CASCADE;
DROP TABLE IF EXISTS opening_hours CASCADE;

-- ============================================================
-- 1. Menu items
-- ============================================================
CREATE TABLE menu_items (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  emoji TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 2. Offers
-- ============================================================
CREATE TABLE offers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  emoji TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  color TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 3. Opening hours
-- ============================================================
CREATE TABLE opening_hours (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  day TEXT NOT NULL,
  hours TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 4. Contact submissions (formularz kontaktowy)
-- ============================================================
CREATE TABLE contact_submissions (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 5. Newsletter signups (zapis email z OrderModal)
-- ============================================================
CREATE TABLE newsletter_signups (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Seed data
-- ============================================================

-- Oferta (4 karty)
INSERT INTO offers (emoji, title, description, color, sort_order) VALUES
  ('☕', 'Kawa', 'Espresso, latte, cappuccino, flat white – klasyka w najlepszym wydaniu. Wybierz swoje ulubione mleko roślinne.', 'from-amber-700 to-amber-900', 1),
  ('🍵', 'Herbata', 'Zielona, czarna, owocowa i ziołowa – bogata oferta herbacianych kompozycji na każdą porę dnia.', 'from-emerald-600 to-emerald-800', 2),
  ('🍰', 'Ciasta', 'Szarlotka, sernik, brownie, muffiny – wszystkie wypiekane codziennie rano według domowych receptur.', 'from-rose-600 to-rose-800', 3),
  ('🥞', 'Śniadania', 'Tosty, jajka, owsianka i świeże pieczywo – pożywne śniadania serwowane przez cały dzień.', 'from-yellow-600 to-yellow-800', 4);

-- Menu (6 pozycji)
INSERT INTO menu_items (name, price, emoji, description, sort_order) VALUES
  ('Latte z cynamonem', '16 zł', '☕', 'Kremowe latte z nutą cynamonu i miodu', 1),
  ('Szarlotka z lodami', '19 zł', '🥧', 'Domowa szarlotka z gałką lodów waniliowych', 2),
  ('Tosty z awokado', '22 zł', '🥑', 'Chleb na zakwasie, awokado, jajko w koszulce', 3),
  ('Mrożona herbata brzoskwiniowa', '14 zł', '🧊', 'Orzeźwiająca herbata z kawałkami brzoskwini', 4),
  ('Sernik nowojorski', '18 zł', '🧀', 'Kremowy sernik na maślanym spodzie', 5),
  ('Cappuccino klasyczne', '14 zł', '☕', 'Włoskie cappuccino z gęstą pianką', 6);

-- Godziny otwarcia
INSERT INTO opening_hours (day, hours, sort_order) VALUES
  ('Poniedziałek – Piątek', '7:00 – 19:00', 1),
  ('Sobota', '8:00 – 18:00', 2),
  ('Niedziela', '9:00 – 16:00', 3);

-- ============================================================
-- Row Level Security + Polityki
-- ============================================================

ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE opening_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_signups ENABLE ROW LEVEL SECURITY;

-- Publiczny odczyt dla katalogu
CREATE POLICY "Public read access" ON menu_items FOR SELECT USING (true);
CREATE POLICY "Public read access" ON offers FOR SELECT USING (true);
CREATE POLICY "Public read access" ON opening_hours FOR SELECT USING (true);

-- Publiczny insert dla formularzy
CREATE POLICY "Public insert" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert" ON newsletter_signups FOR INSERT WITH CHECK (true);
