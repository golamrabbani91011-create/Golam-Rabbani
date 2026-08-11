import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Golam Rabbani - Video Editor, Graphic Designer & Meta Marketer',
  description: 'Official portfolio website of Golam Rabbani — Video Editor, Graphic Designer, and Meta Ads Marketer.',
  metadataBase: new URL('https://portfolio.local'),
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="bn" className="scroll-smooth">
      <body suppressHydrationWarning className="bg-slate-950 text-slate-100 antialiased font-sans">{children}</body>
    </html>
  );
}
