import { motion } from 'framer-motion';
import { ChevronIcon } from 'components/icons';

type Props = {
	src: string;
	symbol: string;
	init: 'top' | 'bottom';
};
export default function TokenSelect({ src, symbol, init }: Props) {
	const y = init === 'bottom' ? -100 : 100;

	return (
		<div className="h-full w-full flex items-center">
			<motion.div
				initial={false}
				animate={{
					y: [y, 0],
					opacity: [0, 1],
				}}
				transition={{
					duration: 0.3,
				}}
				key={symbol}
				className="relative">
				<div className="flex flex-row items-center gap-2">
					<span className="w-6 h-6">
						<img
							src={src}
							alt={symbol}
							className="w-full h-full object-contain rounded-full"
						/>
					</span>
					<span className="text-xl text-white font-semibold">
						{symbol}
					</span>
					<span className="w-2.5 text-white">
						<ChevronIcon />
					</span>
				</div>
			</motion.div>
		</div>
	);
}
