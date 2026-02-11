-- Supabase Setup for Priyanka's Valentine's Website
-- Run this in the Supabase SQL Editor (https://supabase.com/dashboard/project/xzdpllkxouwaqfqbeipp/sql)
-- Copy-paste the entire file and click "Run"

-- 1. boyfriend_notes table
CREATE TABLE IF NOT EXISTS boyfriend_notes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- 2. diary_entries table
CREATE TABLE IF NOT EXISTS diary_entries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  author text NOT NULL CHECK (author IN ('kishor', 'priyanka')),
  content text NOT NULL,
  mood text,
  created_at timestamptz DEFAULT now()
);

-- 3. memories table
CREATE TABLE IF NOT EXISTS memories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  image_url text,
  date date,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE boyfriend_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE diary_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;

-- RLS Policies for boyfriend_notes
CREATE POLICY "Anyone can insert boyfriend_notes" ON boyfriend_notes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can select boyfriend_notes" ON boyfriend_notes
  FOR SELECT USING (true);

-- RLS Policies for diary_entries
CREATE POLICY "Anyone can insert diary_entries" ON diary_entries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can select diary_entries" ON diary_entries
  FOR SELECT USING (true);

-- RLS Policies for memories
CREATE POLICY "Anyone can insert memories" ON memories
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can select memories" ON memories
  FOR SELECT USING (true);
