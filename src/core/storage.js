let prefix = 'webverkstedet:';
export function configureStorage(id) { prefix = `${id}:`; }
export function read(key, fallback) {
  try { const value = localStorage.getItem(prefix + key); return value === null ? fallback : JSON.parse(value); } catch { return fallback; }
}
export function write(key, value) {
  try { localStorage.setItem(prefix + key, JSON.stringify(value)); return true; } catch { return false; }
}
export function remove(key) { try { localStorage.removeItem(prefix + key); return true; } catch { return false; } }
export function clear() {
  try { Object.keys(localStorage).filter(k => k.startsWith(prefix)).forEach(k => localStorage.removeItem(k)); return true; } catch { return false; }
}
