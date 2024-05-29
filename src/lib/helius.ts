export const customRpcUrl = `https://mainnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_API_KEY_HELIUS}`;

export type Assets = {
	symbol: string;
	address: string;
	balance: number;
	decimals: number;
};

export const getAssetsByOwner = async (
	ownerAddress: string,
	signal: AbortSignal,
): Promise<Assets[]> => {
	const response = await fetch(customRpcUrl, {
		signal,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			jsonrpc: '2.0',
			id: 'id',
			method: 'getAssetsByOwner',
			params: {
				page: 1,
				limit: 1000,
				ownerAddress,
				displayOptions: {
					showFungible: true,
				},
			},
		}),
	});

	const { result } = await response.json();

	return result?.items
		?.filter(({ token_info }: { token_info: Assets }) => token_info)
		.map(({ id, token_info }: { id: string; token_info: Assets }) => {
			return {
				address: id,
				symbol: token_info.symbol,
				balance: token_info.balance,
				decimals: token_info.decimals,
			};
		});
};
