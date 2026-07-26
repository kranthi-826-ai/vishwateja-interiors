-- Migration: Add Multi-Step Quote Wizard fields to existing leads table in Supabase
alter table leads add column if not exists home_type text;
alter table leads add column if not exists requirement_type text;
alter table leads add column if not exists material_quality text;
alter table leads add column if not exists budget_range text;
alter table leads add column if not exists rooms_selected jsonb;
alter table leads add column if not exists pincode text;
alter table leads add column if not exists email text;
alter table leads add column if not exists verified boolean default false;
