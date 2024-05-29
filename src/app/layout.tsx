'use client';

import { Inter } from 'next/font/google';
import QueryProvider from 'components/provider/QueryProvider';
import WalletProvider from 'components/provider/WalletProvider';

import 'styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className="h-full overflow-hidden sm:overflow-auto bg-dark-bg">
			<body className={`h-full ${inter.className}`}>
				<WalletProvider>
					<QueryProvider>
						<main className="h-full p-5">{children}</main>
					</QueryProvider>
				</WalletProvider>
			</body>
		</html>
	);
}
