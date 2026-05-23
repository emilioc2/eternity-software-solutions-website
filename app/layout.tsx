import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const satoshi = localFont({
  src: [
    { path: '../public/fonts/Satoshi-Regular.woff', weight: '400', style: 'normal' },
    { path: '../public/fonts/Satoshi-Medium.woff', weight: '500', style: 'normal' },
    { path: '../public/fonts/Satoshi-Bold.woff', weight: '700', style: 'normal' },
    { path: '../public/fonts/Satoshi-Black.woff', weight: '900', style: 'normal' },
  ],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = localFont({
  src: [
    { path: '../public/fonts/JetBrainsMono-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/JetBrainsMono-Medium.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Eternity Software Solutions',
  description:
    'Building websites and software that grow with your business.',
  icons: {
    icon: '/new_logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${satoshi.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-text-primary grain`}
      >
        <div className="page-enter">
          {children}
        </div>
      </body>
    </html>
  );
}
