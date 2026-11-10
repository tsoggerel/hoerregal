// Hörregal service worker: makes the app installable (needed for the Android share menu).
// It caches nothing, so every update you upload is live immediately.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.mode !== 'navigate') return; // everything else goes straight to the network
  e.respondWith(
    fetch(e.request).catch(() => new Response(
      '<!DOCTYPE html><meta charset="utf-8"><meta name="viewport" content="width=device-width"><body style="background:#16130f;color:#f3ece1;font-family:system-ui;padding:40px;text-align:center"><h2>Keine Internetverbindung</h2><p>Das Hörregal braucht Internet – bitte später nochmal öffnen.</p>',
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } }))
  );
});
