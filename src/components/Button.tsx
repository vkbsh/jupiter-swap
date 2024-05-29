'use client';

import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

import { QuoteResponse, swap, trans } from 'lib/jupiter';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { use, useEffect } from 'react';

type Props = {
	value: string;
	publicKeyString: string;
	fromTotal: number | null;
	quoteResponse?: QuoteResponse;
	setValue: (value: any) => void;
};
export default function Button({
	value,
	setValue,
	fromTotal,
	quoteResponse,
	publicKeyString,
}: Props) {
	const { connection } = useConnection();
	const { setVisible } = useWalletModal();
	const { signTransaction, sendTransaction, connected, connecting } =
		useWallet();

	const { data: swapTransaction, refetch } = useQuery(
		['swap', quoteResponse, publicKeyString],
		({ signal }) => {
			if (quoteResponse) {
				return swap(
					{
						quoteResponse,
						publicKey: publicKeyString,
					},
					signal as AbortSignal,
				);
			}
		},
		{ enabled: false },
	);

	const { data: fee } = useQuery(
		['signTransaction', swapTransaction],
		() => {
			if (swapTransaction) {
				return trans({
					connection,
					signTransaction,
					sendTransaction,
					swapTransaction,
				});
			}
		},
		{ enabled: !!swapTransaction },
	);

	useEffect(() => {
		if (fee) {
			setValue(null);
		}
	}, [fee]);

	let label = '';

	if (!connected) {
		label = 'Connect Wallet';
		if (connecting) label = 'Connecting...';
	} else {
		if (!value) {
			label = 'Enter an amount';
		} else {
			if (quoteResponse) label = 'Swap';
			if (!quoteResponse) label = 'Fetching quote...';
		}
	}

	return (
		<div className="flex flex-col gap-2 mt-auto">
			<motion.span
				initial={false}
				animate={{
					y: fromTotal === 0 ? 0 : 10,
					opacity: fromTotal === 0 ? 1 : 0,
					display: fromTotal === 0 ? 'flex' : 'none',
				}}
				className="text-sm p-1 bg-yellow rounded-lg flex justify-center items-center">
				You have not enough balance to swap.
			</motion.span>

			<motion.button
				onClick={() => {
					if (quoteResponse && connected && value) {
						refetch();
					}

					if (!connected) {
						setVisible(true);
					}
				}}
				whileTap={{
					scale: 0.97,
				}}
				whileHover={{
					scale: 1.03,
				}}
				initial={{
					opacity: 0,
					translateY: 20,
				}}
				animate={{
					opacity: 1,
					translateY: 0,
				}}
				className="md:mt-0 w-full h-14 px-5 bg-button-bg rounded-lg">
				<span className="text-xl font-semibold bg-gradient-to-r from-yellow to-blue bg-clip-text text-transparent">
					{label}
				</span>
			</motion.button>
		</div>
	);
}
