import MainLayout from "@/app/layout/MainLayout";
import { useState } from "react";
import { SplashScreen } from "./features/splash/SplashScreen";

export function App() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      {!splashDone && (
        <SplashScreen onComplete={() => setSplashDone(true)} />
      )}
      {splashDone && <MainLayout />}
    </>
  );
}
