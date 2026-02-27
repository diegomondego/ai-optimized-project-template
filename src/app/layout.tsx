/**
 * layout.tsx — Root layout (Next.js App Router)
 *
 * The root layout wraps every page. Keep it minimal:
 * - HTML shell (lang, meta)
 * - Global providers (theme, analytics, toast)
 * - No business logic — delegate to features
 */

import type { Metadata, ReactNode } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | [Your App Name]",
    default: "[Your App Name]",
  },
  description: "[Your app description]",
};

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        {/* Add global providers here: ThemeProvider, ToastProvider, etc. */}
        {children}
      </body>
    </html>
  );
}
