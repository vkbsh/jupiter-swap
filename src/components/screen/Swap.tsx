'use client';

import { useQuery } from 'react-query';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useCallback, useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

import Input from 'components/Input';
import Button from 'components/Button';
import Receive from 'components/Receive';
import SwapIcon from 'components/SwapIcon';
import RoutePath from 'components/RoutePath';
import BalancePick from 'components/BalancePick';
import LabelSection from 'components/LabelSection';
import RefreshButton from 'components/RefreshButton';

import { Token, getQuote } from 'lib/jupiter';
import { getAssetsByOwner } from 'lib/helius';

import jupiterTokens from 'lib/jupiter/jupiter-strict-tokens.json';

export default function SwapScreen() {
	const { connection } = useConnection();
	const { connected, connecting, publicKey } = useWallet();

	const [value, setValue] = useState('');
	const [toTotal, setToTotal] = useState(null);
	const [fromTotal, setFromTotal] = useState(null);
	const [inputToken, setInputToken] = useState(jupiterTokens[0] as Token);
	const [outputToken, setOutputToken] = useState(jupiterTokens[1] as Token);

	const publicKeyString = publicKey?.toBase58?.() || '';

	const { data: quoteResponse, refetch: fetchQuote } = useQuery(
		['getQuote', inputToken?.address, outputToken?.address, value],
		({ signal }) => {
			return getQuote(
				{
					amount: Math.pow(10, inputToken?.decimals) * Number(value),
					inputMint: inputToken?.address,
					outputMint: outputToken?.address,
				},
				signal as AbortSignal,
			);
		},
		{
			enabled:
				!!Number(value) &&
				!!inputToken?.address &&
				!!outputToken?.address,
		},
	);

	const { data: assetsByOwner } = useQuery(
		['assetsByOwner', publicKeyString],
		({ signal }) =>
			getAssetsByOwner(publicKeyString, signal as AbortSignal),
		{ enabled: !!publicKeyString },
	);

	const swapUI = () => {
		setInputToken(outputToken);
		setOutputToken(inputToken);
	};

	const handleInputChange = useCallback((value: string) => {
		setValue(value);
	}, []);

	useEffect(() => {
		if (publicKey) {
			const setBalance = async (
				token: Token,
				setter: (value: any) => void,
			) => {
				if (token.symbol === 'SOL') {
					const balance = await connection.getBalance(publicKey);
					setter(balance / LAMPORTS_PER_SOL);
				} else {
					const asset = assetsByOwner?.find(
						(asset) => asset.address === token.address,
					);
					setter(
						asset
							? asset.balance / Math.pow(10, asset.decimals)
							: 0,
					);
				}
			};

			setBalance(inputToken, setFromTotal);
			setBalance(outputToken, setToTotal);
		}
	}, [connection, publicKey, assetsByOwner, inputToken, outputToken]);

	return (
		<div className="w-full h-full sm:w-[420px] sm:h-[723px] sm:m-auto flex flex-col gap-2">
			<div className="flex justify-end items-center gap-2">
				<RefreshButton onClick={fetchQuote} />
				{/* <WalletButton /> */}
			</div>
			<div className="w-full h-full rounded-lg bg-screen-bg p-5 flex flex-col gap-3">
				<LabelSection
					label="You pay"
					balance={fromTotal}
					symbol={inputToken.symbol}>
					<BalancePick
						total={fromTotal}
						setValue={handleInputChange}
					/>
				</LabelSection>
				<Input
					value={value}
					src={inputToken.logoURI}
					symbol={inputToken.symbol}
					setValue={handleInputChange}
				/>
				<SwapIcon onClick={swapUI} />
				<LabelSection
					label="You receive"
					balance={toTotal}
					symbol={outputToken.symbol}
				/>
				<Receive token={outputToken} />
				<RoutePath quoteResponse={quoteResponse} />
				<Button
					value={value}
					fromTotal={fromTotal}
					setValue={handleInputChange}
					quoteResponse={quoteResponse}
					publicKeyString={publicKeyString}
				/>
			</div>
		</div>
	);
}
