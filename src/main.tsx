// Safe fetch descriptor guard for iframe sandboxes
(function() {
  try {
    if (typeof window !== 'undefined') {
      const originalFetch = window.fetch ? window.fetch.bind(window) : null;
      let activeFetch = originalFetch;

      const defineFetch = (target: any) => {
        try {
          Object.defineProperty(target, 'fetch', {
            get() {
              return activeFetch;
            },
            set(newFetch) {
              activeFetch = newFetch;
            },
            configurable: true,
            enumerable: true,
          });
          return true;
        } catch {
          return false;
        }
      };

      if (!defineFetch(window)) {
        let proto = Object.getPrototypeOf(window);
        while (proto) {
          if (defineFetch(proto)) break;
          proto = Object.getPrototypeOf(proto);
        }
      }
    }
  } catch {
    // Ignore sandbox errors
  }
})();

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
