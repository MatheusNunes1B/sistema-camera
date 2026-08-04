// A chave anon é própria para uso no navegador. As regras do bucket continuam
// sendo a proteção real: nunca use uma service_role key aqui.
const SupabasePhotos = (() => {
  const URL = 'https://unlcufqasyzatnfdjwjs.supabase.co';
  const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVubGN1ZnFhc3l6YXRuZmRqd2pzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4MjM0MTAsImV4cCI6MjEwMTM5OTQxMH0.wbZl2xLV4NnaeLztfwYsvpgVp96rywZEnS8E3sFdVS0';
  const BUCKET = 'student-photos';

  async function upload(studentId, photoData) {
    if (!photoData) return null;
    const blob = await (await fetch(photoData)).blob();
    const fileName = `${studentId}.jpg`;
    const response = await fetch(`${URL}/storage/v1/object/${BUCKET}/${fileName}`, {
      method: 'POST',
      headers: {
        apikey: ANON_KEY,
        Authorization: `Bearer ${ANON_KEY}`,
        'Content-Type': 'image/jpeg',
        'x-upsert': 'true'
      },
      body: blob
    });
    if (!response.ok) throw new Error('Não foi possível enviar a foto ao Supabase.');
    return `${URL}/storage/v1/object/public/${BUCKET}/${fileName}`;
  }

  async function remove(studentId) {
    const response = await fetch(`${URL}/storage/v1/object/${BUCKET}/${studentId}.jpg`, {
      method: 'DELETE',
      headers: { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` }
    });
    // Uma foto que não chegou a ser enviada não deve impedir a exclusão local.
    if (!response.ok && response.status !== 404) throw new Error('Não foi possível excluir a foto do Supabase.');
  }

  return { upload, remove };
})();

const SupabaseAccessLogs = (() => {
  const URL = 'https://unlcufqasyzatnfdjwjs.supabase.co';
  const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpYXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVubGN1ZnFhc3l6YXRuZmRqd2pzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4MjM0MTAsImV4cCI6MjEwMTM5OTQxMH0.wbZl2xLV4NnaeLztfwYsvpgVp96rywZEnS8E3sFdVS0';
  const headers = { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}`, 'Content-Type': 'application/json' };
  const endpoint = `${URL}/rest/v1/access_logs`;

  function toRemote(log) { return { id: log.id, student_id: log.studentId, student_name: log.studentName, registration: log.registration, class_name: log.class, occurred_at: log.timestamp, status: log.status }; }
  function fromRemote(log) { return { id: log.id, studentId: log.student_id, studentName: log.student_name, registration: log.registration, class: log.class_name, timestamp: log.occurred_at, status: log.status }; }
  async function insert(log) { const response = await fetch(endpoint, { method: 'POST', headers: { ...headers, Prefer: 'return=minimal' }, body: JSON.stringify(toRemote(log)) }); if (!response.ok) throw new Error('Não foi possível salvar o histórico no Supabase.'); }
  async function getAll() { const response = await fetch(`${endpoint}?select=*&order=occurred_at.desc&limit=100`, { headers }); if (!response.ok) throw new Error('Não foi possível carregar o histórico do Supabase.'); return (await response.json()).map(fromRemote); }
  async function clear() { const response = await fetch(`${endpoint}?id=not.is.null`, { method: 'DELETE', headers: { ...headers, Prefer: 'return=minimal' } }); if (!response.ok) throw new Error('Não foi possível limpar o histórico no Supabase.'); }
  return { insert, getAll, clear };
})();
