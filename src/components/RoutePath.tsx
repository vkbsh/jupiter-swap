import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Route from 'components/Route';
import ShowMoreSection from 'components/ShowMoreSection';

import { QuoteResponse } from 'lib/jupiter';
import jupiterTokens from 'lib/jupiter/jupiter-strict-tokens.json';

export type Route = {
	name: string;
	price: number;
	route: [string, string];
};

type Props = {
	quoteResponse?: QuoteResponse;
};

export default function RoutePath({ quoteResponse }: Props) {
	const [showMore, setShowMore] = useState(false);

	const listReceive = quoteResponse?.routePlan?.map(({ swapInfo }) => {
		const { label, inputMint, outputMint, outAmount = 0 } = swapInfo;

		const inputToken = jupiterTokens.find(
			({ address }) => address === inputMint,
		);

		const outputToken = jupiterTokens.find(
			({ address }) => address === outputMint,
		);

		return {
			name: label,
			price:
				outputToken?.decimals && outAmount
					? Number(outAmount) / Math.pow(10, outputToken?.decimals)
					: 0,
			route: [inputToken?.symbol, outputToken?.symbol],
		};
	}) as Route[];

	const { from, to } = listReceive?.reduce(
		(acc, item) => {
			return {
				from: item.price < acc.from ? item.price : acc.from,
				to: item.price > acc.to ? item.price : acc.to,
			};
		},
		{ from: 999999, to: 0 },
	) || { from: 0, to: 0 };

	const isMultiRoute = listReceive?.length > 2;

	return (
		<div className="overflow-hidden h-full flex flex-col gap-2">
			<motion.div
				layout
				animate={{
					height: showMore ? 'auto' : '9rem',
				}}
				className="relative">
				<motion.div
					layout
					animate={{
						display: showMore ? 'block' : 'flex',
					}}
					className={`flex flex-col pt-2.5 w-full no-scrollbar ${
						showMore ? 'overflow-y-scroll' : ''
					}`}>
					<AnimatePresence>
						{listReceive
							?.sort((a, b) => Number(b.price) - Number(a.price))
							?.slice(0, showMore ? listReceive?.length * 5 : 2)
							?.map(({ name, price, route }, i) => {
								return (
									<motion.div
										layout
										key={name + price + i}
										exit={{
											opacity: 0,
											height: 0,
										}}
										animate={{
											y: 0,
											opacity: 1,
											height: 'auto',
										}}
										initial={{
											opacity: 0,
											height: 0,
										}}>
										<Route
											name={name}
											price={price}
											route={route}
											selected={i === 0 && isMultiRoute}
										/>
									</motion.div>
								);
							})}
					</AnimatePresence>
				</motion.div>
			</motion.div>
			{isMultiRoute && (
				<ShowMoreSection
					toAmount={to}
					fromAmount={from}
					isShown={showMore}
					onClick={() => setShowMore(!showMore)}
				/>
			)}
		</div>
	);
}
