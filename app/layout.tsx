import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Glory Primary and Secondary Academy',
  description:
    'Welcome to Glory Primary and Secondary Academy — empowering students through academic excellence, skill acquisition, and character development.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
