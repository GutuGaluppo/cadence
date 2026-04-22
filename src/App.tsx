import { lazy, Suspense, useEffect, useState } from "react";
import { SplashScreen } from "./features/splash/SplashScreen";

const MainLayout = lazy(() => import("@/app/layout/MainLayout"));

export function App() {
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    void import("@/app/layout/MainLayout");
  }, []);

  return (
    <>
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
      {splashDone && (
        <Suspense fallback={null}>
          <MainLayout />
        </Suspense>
      )}
    </>
  );
}
