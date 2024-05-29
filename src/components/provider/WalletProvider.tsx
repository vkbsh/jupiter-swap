'use client';

import {
	WalletProvider,
	ConnectionProvider,
} from '@solana/wallet-adapter-react';
import '@solana/wallet-adapter-react-ui/styles.css';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { customRpcUrl } from 'lib/helius';

export default function AppWalletProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ConnectionProvider endpoint={customRpcUrl}>
			<WalletProvider wallets={[]} autoConnect>
				<WalletModalProvider>{children}</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
	);
}
