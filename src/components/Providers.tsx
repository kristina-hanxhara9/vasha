"use client";

import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { SmoothScroll } from "@/components/SmoothScroll";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AuthProvider>
        <SmoothScroll />
        {children}
      </AuthProvider>
    </LanguageProvider>
  );
}
