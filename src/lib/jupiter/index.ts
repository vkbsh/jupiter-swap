import {
	WalletAdapterProps,
	SignerWalletAdapterProps,
} from '@solana/wallet-adapter-base';
import { VersionedTransaction, Connection } from '@solana/web3.js';

export type Token = {
	name: string;
	tags: string[];
	symbol: string;
	address: string;
	chainId: number;
	logoURI: string;
	decimals: number;
	extensions: { coingeckoId: string };
};

type RoutePlan = {
	swapInfo: {
		label: string;
		ammKey: string;
		feeMint: string;
		inAmount: string;
		inputMint: string;
		outAmount: string;
		feeAmount: string;
		outputMint: string;
	};
	percent: number;
};

export type QuoteResponse = {
	swapMode: string;
	inAmount: string;
	inputMint: string;
	outAmount: string;
	platformFee: null;
	timeTaken: number;
	outputMint: string;
	slippageBps: number;
	contextSlot: number;
	priceImpactPct: string;
	routePlan: RoutePlan[];
	otherAmountThreshold: string;
};

const baseUrl = 'https://quote-api.jup.ag/v6';

export const getQuote = async (
	{
		amount,
		inputMint,
		outputMint,
	}: {
		amount: number;
		inputMint: string;
		outputMint: string;
	},
	signal: AbortSignal,
): Promise<QuoteResponse> => {
	const quoteUrl = `${baseUrl}/quote`;
	const url = `${quoteUrl}?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=50`;

	const quoteResponse = await fetch(url, { signal });
	const json = await quoteResponse.json();

	return json;
};

export const swap = async (
	{
		publicKey,
		quoteResponse,
	}: {
		publicKey: string;
		quoteResponse: QuoteResponse;
	},
	signal: AbortSignal,
): Promise<string> => {
	const swapUrl = `${baseUrl}/swap`;

	const res = await fetch(swapUrl, {
		signal,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			quoteResponse,
			wrapAndUnwrapSol: true,
			userPublicKey: publicKey,
		}),
	});

	const json = await res.json();

	return json.swapTransaction;
};

export const trans = async ({
	connection,
	signTransaction,
	sendTransaction,
	swapTransaction,
}: {
	connection: Connection;
	swapTransaction: string;
	sendTransaction: WalletAdapterProps['sendTransaction'];
	signTransaction: SignerWalletAdapterProps['signTransaction'] | undefined;
}) => {
	const transactionBuffer = Buffer.from(swapTransaction, 'base64');
	const transaction = VersionedTransaction.deserialize(transactionBuffer);
	const signedTransaction = await signTransaction?.(transaction);

	if (!signedTransaction) return;

	const fee = await sendTransaction(signedTransaction, connection);

	return fee;
};
