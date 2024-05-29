import { motion } from 'framer-motion';

import { toFix2 } from 'utils';

type Props = {
	label: string;
	symbol: string;
	balance: number | null;
	children?: React.ReactNode;
};

export default function LabelSection({
	label,
	symbol,
	balance,
	children,
}: Props) {
	return (
		<div className="h-5 flex flex-nowrap justify-between items-center">
			<span className="text-lg font-medium text-white">{label}</span>
			<motion.div
				key={balance}
				layout
				animate={{
					opacity: balance ? 1 : 0,
				}}
				className="overflow-hidden flex gap-2 justify-end items-center">
				<span className="text-base font-medium text-text-opacity">
					Balance {toFix2(balance)} {symbol}
				</span>
				{children}
			</motion.div>
		</div>
	);
}
