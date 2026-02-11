// Supabase Client for Priyanka's Valentine's Website
const SUPABASE_URL = 'https://xzdpllkxouwaqfqbeipp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_0jBAGXSH7w0YZKE9QaYLsA_MsXGRYgg';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ========================================
// Boyfriend Notes (Supabase-backed)
// ========================================

async function submitBoyfriendNoteSupabase(content) {
    const { data, error } = await supabaseClient
        .from('boyfriend_notes')
        .insert([{ content }]);
    if (error) throw error;
    return data;
}

async function loadBoyfriendNotesSupabase() {
    const { data, error } = await supabaseClient
        .from('boyfriend_notes')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
}

// ========================================
// Diary Entries (Supabase-backed)
// ========================================

async function submitDiaryEntry(author, content, mood) {
    const { data, error } = await supabaseClient
        .from('diary_entries')
        .insert([{ author, content, mood }]);
    if (error) throw error;
    return data;
}

async function loadDiaryEntries() {
    const { data, error } = await supabaseClient
        .from('diary_entries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
    if (error) throw error;
    return data || [];
}

// ========================================
// Relative Time Helper
// ========================================

function relativeTime(dateStr) {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now - date;
    const diffMin = Math.floor(diffMs / 60000);
    const diffHr = Math.floor(diffMs / 3600000);
    const diffDay = Math.floor(diffMs / 86400000);

    if (diffMin < 1) return 'just now';
    if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? '' : 's'} ago`;
    if (diffHr < 24) return `${diffHr} hour${diffHr === 1 ? '' : 's'} ago`;
    if (diffDay < 30) return `${diffDay} day${diffDay === 1 ? '' : 's'} ago`;
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
