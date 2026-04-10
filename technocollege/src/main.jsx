import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Polyfill window.storage for local deployment (uses localStorage)
if (!window.storage) {
  window.storage = {
    async get(key, shared) {
      try {
        const prefix = shared ? 'shared:' : 'local:';
        const val = localStorage.getItem(prefix + key);
        return val ? { key, value: val, shared: !!shared } : null;
      } catch { return null; }
    },
    async set(key, value, shared) {
      try {
        const prefix = shared ? 'shared:' : 'local:';
        localStorage.setItem(prefix + key, value);
        return { key, value, shared: !!shared };
      } catch { return null; }
    },
    async delete(key, shared) {
      try {
        const prefix = shared ? 'shared:' : 'local:';
        localStorage.removeItem(prefix + key);
        return { key, deleted: true, shared: !!shared };
      } catch { return null; }
    },
    async list(prefix, shared) {
      try {
        const storagePrefix = shared ? 'shared:' : 'local:';
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k.startsWith(storagePrefix + (prefix || ''))) {
            keys.push(k.replace(storagePrefix, ''));
          }
        }
        return { keys, prefix, shared: !!shared };
      } catch { return { keys: [] }; }
    }
  };
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
