import * as React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const LOCAL_KEY = "noisy-pwa-install";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice?: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const PWAInstallPrompt: React.FC = () => {
  const [deferred, setDeferred] = React.useState<BeforeInstallPromptEvent | null>(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const dismissed = localStorage.getItem(LOCAL_KEY);
    function onBeforeInstall(e: Event) {
      e.preventDefault?.();
      if (dismissed === "dismissed" || dismissed === "installed") return;
      const bip = e as BeforeInstallPromptEvent;
      setDeferred(bip);
      setOpen(true);
    }
    function onInstalled() {
      localStorage.setItem(LOCAL_KEY, "installed");
      setOpen(false);
      setDeferred(null);
      toast({ title: "App installed", description: "Noisy is now on your home screen." });
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstall as any);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall as any);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferred) return;
    await deferred.prompt();
    try {
      const res = await deferred.userChoice;
      if (res?.outcome === "accepted") {
        localStorage.setItem(LOCAL_KEY, "installed");
      } else {
        localStorage.setItem(LOCAL_KEY, "dismissed");
      }
    } catch {}
    setOpen(false);
  };

  const handleDismiss = () => {
    localStorage.setItem(LOCAL_KEY, "dismissed");
    setOpen(false);
  };

  if (!deferred) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent aria-describedby="pwa-install-description">
        <DialogHeader>
          <DialogTitle>Install Noisy</DialogTitle>
          <DialogDescription id="pwa-install-description">
            Install this app for a faster, app-like experience.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={handleDismiss}>Not now</Button>
          <Button onClick={handleInstall}>Install</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PWAInstallPrompt;
