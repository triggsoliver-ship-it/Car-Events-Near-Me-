"use client";
import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "cenm-install-dismissed";
const DISMISS_DAYS = 14;

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

function isIOS() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function recentlyDismissed() {
  try {
    const t = localStorage.getItem(DISMISS_KEY);
    return !!t && Date.now() - Number(t) < DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

export default function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [mode, setMode] = useState<"hidden" | "android" | "ios">("hidden");

  useEffect(() => {
    if (isStandalone() || recentlyDismissed()) return;

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setMode("android");
    };
    window.addEventListener("beforeinstallprompt", onPrompt);

    // iOS never fires beforeinstallprompt — show instructions instead.
    if (isIOS()) setMode("ios");

    const onInstalled = () => setMode("hidden");
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (mode === "hidden") return null;

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {}
    setMode("hidden");
  };

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
    setMode("hidden");
  };

  return (
    <div style={styles.banner} role="dialog" aria-label="Install the Car Events app">
      <div style={styles.icon}>📍</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={styles.title}>Get the Car Events app</div>
        <div style={styles.hint}>
          {mode === "ios"
            ? "Tap the Share button, then “Add to Home Screen”."
            : "Add it to your home screen — free, no app store needed."}
        </div>
      </div>
      {mode === "android" && (
        <button style={styles.installBtn} onClick={install}>
          Install
        </button>
      )}
      <button style={styles.closeBtn} onClick={dismiss} aria-label="Dismiss">
        ×
      </button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  banner: {
    position: "fixed",
    left: "50%",
    bottom: 18,
    transform: "translateX(-50%)",
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    gap: 14,
    width: "100%",
    maxWidth: "min(480px, calc(100vw - 28px))",
    padding: "14px 16px",
    background: "#141b26",
    border: "1px solid #26303f",
    borderRadius: 16,
    boxShadow: "0 20px 50px -20px rgba(0,0,0,.7)",
    color: "#eef2f7",
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: "linear-gradient(135deg,#ff5118,#ffb800)",
    display: "grid",
    placeItems: "center",
    fontSize: 22,
    flexShrink: 0,
  },
  title: { fontWeight: 700, fontSize: 14.5 },
  hint: { fontSize: 12.5, color: "#93a1b3" },
  installBtn: {
    background: "#ff5118",
    color: "#fff",
    border: "none",
    padding: "11px 20px",
    borderRadius: 11,
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    flexShrink: 0,
  },
  closeBtn: {
    background: "none",
    border: "none",
    color: "#93a1b3",
    fontSize: 20,
    padding: "4px 8px",
    cursor: "pointer",
    flexShrink: 0,
  },
};
