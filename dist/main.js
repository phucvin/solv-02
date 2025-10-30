async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.bundle.js", {
        scope: "/",
      });
      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
}

registerServiceWorker();

async function dispatch(action) {
  const res = await fetch('/api', { method: 'POST', body: JSON.stringify(action) });
  if (!res.ok) {
    console.error('dispatch response error', res);
  } else {
    console.log('dispatch returned', await res.json());
  }
}
