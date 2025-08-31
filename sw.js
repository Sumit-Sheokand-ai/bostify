/**
 * Bostify Enhanced Service Worker
 * Premium caching and offline functionality for SEO website
 */

const CACHE_NAME = 'bostify-v1.0.0';
const OFFLINE_PAGE = './offline.html';

// Resources to cache immediately
const PRECACHE_URLS = [
  './',
  './index.html',
  './pages/services.html',
  './pages/pricing.html',
  './pages/monthly-audit.html',
  './pages/contact.html',
  './assets/css/main.css',
  './assets/js/main.js',
  './assets/js/config.js',
  './offline.html',
  './sitemap.xml',
  './robots.txt'
];

// Install event - cache essential resources
self.addEventListener('install', event => {
  console.log('[SW] Install event');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Precaching resources');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => {
        console.log('[SW] Skip waiting');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activate event');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME)
            .map(cacheName => {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('[SW] Claiming clients');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip external domains
  if (!event.request.url.startsWith(self.location.origin)) return;
  
  // Skip payment and API endpoints
  if (event.request.url.includes('/api/') || 
      event.request.url.includes('paypal.com') || 
      event.request.url.includes('stripe.com') ||
      event.request.url.includes('emailjs.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Return cached version if available
        if (cachedResponse) {
          console.log('[SW] Serving from cache:', event.request.url);
          return cachedResponse;
        }

        // Otherwise fetch from network
        return fetch(event.request)
          .then(response => {
            // Don't cache error responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Cache successful responses
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                console.log('[SW] Caching new resource:', event.request.url);
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(error => {
            console.log('[SW] Fetch failed:', error);
            
            // Return offline page for navigation requests
            if (event.request.destination === 'document') {
              return caches.match(OFFLINE_PAGE);
            }
            
            // Return cached fallback for other requests (use an existing local image)
            return caches.match('/assets/images/pexels-photo-3756679.jpeg');
          });
      })
  );
});

// Background sync for form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'contact-form') {
    event.waitUntil(
      syncFormSubmissions()
    );
  }
});

// Handle form submissions when offline
async function syncFormSubmissions() {
  try {
    const db = await openDB();
    const tx = db.transaction(['pending-forms'], 'readonly');
    const store = tx.objectStore('pending-forms');
    const forms = await store.getAll();
    
    for (const form of forms) {
      try {
        await submitForm(form.data);
        // Remove from pending after successful submission
        const deleteTx = db.transaction(['pending-forms'], 'readwrite');
        const deleteStore = deleteTx.objectStore('pending-forms');
        await deleteStore.delete(form.id);
      } catch (error) {
        console.log('[SW] Failed to sync form:', error);
      }
    }
  } catch (error) {
    console.log('[SW] Sync error:', error);
  }
}

// Push notification handling
self.addEventListener('push', event => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/assets/images/icon-192.png',
    badge: '/assets/images/badge-72.png',
    vibrate: [100, 50, 100],
    data: data,
    actions: [
      {
        action: 'view',
        title: 'View Details',
        icon: '/assets/images/view-icon.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/assets/images/close-icon.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url || '/')
    );
  }
});

// Performance optimization: Preload critical resources
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'PRELOAD_RESOURCES') {
    event.waitUntil(
      preloadResources(event.data.urls)
    );
  }
});

async function preloadResources(urls) {
  const cache = await caches.open(CACHE_NAME);
  
  for (const url of urls) {
    try {
      await cache.add(url);
      console.log('[SW] Preloaded resource:', url);
    } catch (error) {
      console.log('[SW] Failed to preload:', url, error);
    }
  }
}

// Analytics tracking for offline events
function trackOfflineEvent(eventName, data = {}) {
  // Store analytics events for later sync
  const event = {
    name: eventName,
    data: data,
    timestamp: Date.now()
  };
  
  // This would be sent when connection is restored
  storeAnalyticsEvent(event);
}

async function storeAnalyticsEvent(event) {
  try {
    const db = await openDB();
    const tx = db.transaction(['analytics'], 'readwrite');
    const store = tx.objectStore('analytics');
    await store.add(event);
  } catch (error) {
    console.log('[SW] Failed to store analytics event:', error);
  }
}

// Simple IndexedDB wrapper
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('bostifyDB', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = () => {
      const db = request.result;
      
      if (!db.objectStoreNames.contains('pending-forms')) {
        db.createObjectStore('pending-forms', { keyPath: 'id', autoIncrement: true });
      }
      
      if (!db.objectStoreNames.contains('analytics')) {
        db.createObjectStore('analytics', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

console.log('[SW] Service Worker loaded successfully');
