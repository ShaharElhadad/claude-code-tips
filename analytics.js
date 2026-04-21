// Shared analytics tracker - reads config from window.__ANALYTICS_CONFIG__
// Requires analytics-config.js to be loaded first.
(function() {
  var config = window.__ANALYTICS_CONFIG__;
  if (!config || !config.SUPABASE_URL || !config.SUPABASE_KEY ||
      config.SUPABASE_KEY === 'YOUR_SUPABASE_ANON_KEY') {
    return; // Analytics not configured
  }

  var meta = window.__TIP_META__ || {};
  var tipId    = meta.id    || 'unknown';
  var tipTitle = meta.title || 'unknown';
  var tipUrl   = window.location.href;

  fetch(config.SUPABASE_URL + '/rest/v1/tip_analytics', {
    method: 'POST',
    headers: {
      'apikey': config.SUPABASE_KEY,
      'Authorization': 'Bearer ' + config.SUPABASE_KEY,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({
      tip_id: tipId,
      tip_title: tipTitle,
      tip_url: tipUrl,
      screen_width: window.innerWidth
    })
  }).catch(function() {});
})();
