import { toFix2 } from 'utils';

type Props = {
	name: string;
	price: number;
	selected: boolean;
	route: [string, string];
};

export default function Route({ name, price, route, selected }: Props) {
	const classNParent = selected ? 'special-price' : '';
	const classN = selected
		? 'bg-gradient-to-r from-best-orange-bg to-best-blue-bg'
		: 'bg-input-bg rounded-lg';

	return (
		<div
			style={{ borderRadius: '10px' }}
			className={`${classNParent} border-transparent border-2`}>
			<div
				className={`flex justify-between items-center h-16 px-3 ${classN}`}>
				<div>
					{selected && (
						<span className="text-xs absolute left-0 -top-2.5 px-2 py-0.5 rounded rounded-bl-none text-orange-dark bg-orange">
							Best Price
						</span>
					)}
					<div className="flex flex-col">
						<span className="font-semibold text-white text-xl">
							{name}
						</span>
						<span className="flex flex-row gap-1">
							{route?.map((symbol, i) => {
								return (
									<span
										key={name + symbol + i}
										className="flex flex-row gap-1 items-center font-medium text-sm text-sub-currency">
										<span className="text-sub-currency">
											{symbol}
										</span>
										{i !== route.length - 1 && (
											<span className="inline-block w-3 text-sub-currency fill-sub-currency">
												<svg viewBox="0 0 10 5">
													<path d="M0.612 3.328V2.38H6.516V0.892L9.888 2.848L6.516 4.816V3.328H0.612Z" />
												</svg>
											</span>
										)}
									</span>
								);
							})}
						</span>
					</div>
				</div>
				<span className="text-2xl text-white font-semibold">
					{toFix2(price)}
				</span>
			</div>
		</div>
	);
}
