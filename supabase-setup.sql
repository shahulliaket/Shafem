-- =============================================
-- Shafem Technical Solution LLC — Supabase Setup Script
-- Run this in your Supabase SQL Editor
-- (Dashboard → SQL Editor → New Query)
-- =============================================

-- 1. Create the certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id          TEXT PRIMARY KEY,
  organization TEXT NOT NULL,
  initials    TEXT NOT NULL,
  standard    TEXT NOT NULL,
  scope       TEXT NOT NULL,
  status      TEXT NOT NULL CHECK (status IN ('active', 'pending', 'expired')),
  issue_date  DATE NOT NULL,
  expiry_date DATE NOT NULL,
  country     TEXT NOT NULL,
  category    TEXT NOT NULL,
  tags        TEXT[] NOT NULL DEFAULT '{}'
);

-- 2. Enable Row Level Security
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- 3. Create policy for public read access (anon users can SELECT)
CREATE POLICY "Allow public read access"
  ON certificates
  FOR SELECT
  TO anon
  USING (true);

-- 4. Seed data — matches the original hardcoded certificates
INSERT INTO certificates (id, organization, initials, standard, scope, status, issue_date, expiry_date, country, category, tags)
VALUES
  ('AV-2026-001', 'MedTech Solutions Inc.', 'MS', 'ISO 13485:2016', 'Medical Device Quality Management', 'active', '2025-03-15', '2028-03-14', 'United States', 'Healthcare', ARRAY['Medical Devices', 'Quality']),
  ('AV-2026-002', 'GreenBuild Architects', 'GA', 'ISO 14001:2015', 'Environmental Management Systems', 'active', '2024-11-01', '2027-10-31', 'United Kingdom', 'Construction', ARRAY['Environmental', 'Sustainability']),
  ('AV-2026-003', 'DataVault Security Ltd.', 'DV', 'ISO 27001:2022', 'Information Security Management', 'active', '2025-06-20', '2028-06-19', 'Germany', 'Technology', ARRAY['Cybersecurity', 'InfoSec']),
  ('AV-2026-004', 'NutriCare Laboratories', 'NL', 'ISO 22000:2018', 'Food Safety Management Systems', 'pending', '2026-07-01', '2029-06-30', 'Canada', 'Food & Beverage', ARRAY['Food Safety', 'HACCP']),
  ('AV-2026-005', 'Stellar Aerospace Corp.', 'SA', 'AS9100D', 'Aerospace Quality Management', 'active', '2024-01-10', '2027-01-09', 'France', 'Aerospace', ARRAY['Aerospace', 'Defense']),
  ('AV-2026-006', 'PharmaSync Global', 'PG', 'ISO 9001:2015', 'Quality Management Systems', 'active', '2023-09-15', '2026-09-14', 'Switzerland', 'Pharmaceutical', ARRAY['Quality', 'Pharma']),
  ('AV-2026-007', 'EcoMotors GmbH', 'EM', 'IATF 16949:2016', 'Automotive Quality Management', 'expired', '2022-04-01', '2025-03-31', 'Germany', 'Automotive', ARRAY['Automotive', 'Quality']),
  ('AV-2026-008', 'CloudNine Hosting', 'CH', 'SOC 2 Type II', 'Service Organization Controls', 'active', '2025-08-01', '2026-07-31', 'United States', 'Technology', ARRAY['Cloud', 'Compliance']),
  ('AV-2026-009', 'BioGen Research', 'BR', 'GLP Compliance', 'Good Laboratory Practice', 'pending', '2026-06-15', '2029-06-14', 'Japan', 'Biotechnology', ARRAY['Biotech', 'Laboratory']),
  ('AV-2026-010', 'SafeSteel Manufacturing', 'SM', 'ISO 45001:2018', 'Occupational Health & Safety', 'active', '2024-05-20', '2027-05-19', 'Australia', 'Manufacturing', ARRAY['Safety', 'OHS']),
  ('AV-2026-011', 'FinTrust Banking', 'FB', 'PCI DSS v4.0', 'Payment Card Data Security', 'active', '2025-01-10', '2026-01-09', 'Singapore', 'Finance', ARRAY['Finance', 'PCI']),
  ('AV-2026-012', 'AquaPure Water Systems', 'AW', 'ISO 14001:2015', 'Environmental Management', 'expired', '2021-11-01', '2024-10-31', 'India', 'Utilities', ARRAY['Environmental', 'Water'])
ON CONFLICT (id) DO NOTHING;

-- 5. Verify: run this to check the data was inserted
-- SELECT * FROM certificates ORDER BY id;
