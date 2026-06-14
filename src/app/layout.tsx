import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dropzone/styles.css";
import "~/styles/globals.scss";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import { BottomMessage } from "~/modules";

import { Layout } from "~/modules";
import Providers from "./Providers";

export const metadata: Metadata = {
    title: "Amethist Benefactors",
    description: "Our gratitude to those who help us.",
};

const geist = Geist({
    subsets: ["latin"],
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" {...mantineHtmlProps}>
            <head>
                {/* <link rel="preload" href="/img/bismuth.avif" as="image" /> */}
                <ColorSchemeScript forceColorScheme="dark" defaultColorScheme="dark" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                />
            </head>
            <body className={geist.className}>
                <main>
                    <Providers>
                        <Layout>{children}</Layout>
                        <BottomMessage />
                    </Providers>
                </main>
            </body>
        </html>
    );
}
