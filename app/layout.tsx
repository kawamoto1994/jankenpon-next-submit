import type { Metadata } from "next";
import { Noto_Sans_JP, Darumadrop_One } from "next/font/google";
import "./globals.css";

const siteTitle = "じゃんけんぽん";
const siteDescription =
  "URLを共有して、みんなでじゃんけんできるゲームです。しあいを作って、友だちにURLを送るだけ。作成したしあいは1週間有効です。";
const ogpImage = {
  url: "/images/ogp.png",
  width: 1200,
  height: 630,
  alt: "じゃんけんぽん - URLを共有して、みんなでじゃんけんできるゲームです。",
};
const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
);

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

const darumadropOne = Darumadrop_One({
  variable: "--font-darumadrop-one",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: siteTitle,
  description: siteDescription,
  icons: {
    icon: [
      {
        url: "/images/favicon.png?v=2",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    apple: [
      {
        url: "/images/apple-touch-icon.png?v=2",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName: siteTitle,
    locale: "ja_JP",
    type: "website",
    images: [ogpImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogpImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${darumadropOne.variable}`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}
