import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { SplashScreen } from "./features/splash/SplashScreen";

const MainLayout = lazy(() => import("@/app/layout/MainLayout"));

export function App() {
  // The app mounts under the splash while it fades out, so the two cross-fade.
  const [appMounted, setAppMounted] = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  // Stable identities: the splash schedules its timers once from these.
  const handleReveal = useCallback(() => setAppMounted(true), []);
  const handleComplete = useCallback(() => setSplashDone(true), []);

  useEffect(() => {
    void import("@/app/layout/MainLayout");
  }, []);

  return (
    <>
      {appMounted && (
        <Suspense fallback={null}>
          <MainLayout />
        </Suspense>
      )}
      {!splashDone && <SplashScreen onReveal={handleReveal} onComplete={handleComplete} />}
    </>
  );
}
