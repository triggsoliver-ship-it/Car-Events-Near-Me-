"use client";
import { useEffect } from "react";

// Registers the service worker on the client so the app is installable & works offline.
export default function PWARegister() {
  useEffect(() => {
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    };
    // The window "load" event has usually already fired by the time React
    // hydrates, so register immediately in that case; otherwise wait for load.
    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register, { once: true });
    }
  }, []);
  return null;
}
