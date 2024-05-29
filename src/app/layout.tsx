'use client';

import { Inter } from 'next/font/google';
import { QueryClientProvider, QueryClient } from 'react-query';
import WalletProvider from 'components/provider/WalletProvider';

import 'styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

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
					<QueryClientProvider client={queryClient}>
						<main className="h-full p-5">{children}</main>
					</QueryClientProvider>
				</WalletProvider>
			</body>
		</html>
	);
}
