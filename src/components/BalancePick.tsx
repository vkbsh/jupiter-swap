'use client';

import { motion } from 'framer-motion';

type Props = {
	total: number | null;
	setValue: (value: string) => void;
};

export default function BalancePick({ total, setValue }: Props) {
	const _total = Number(total);

	const setEasyBalance = (type: 'max' | 'half') => {
		if (total === null) return;

		switch (type) {
			default:
				return setValue('');
			case 'max':
				return setValue(_total.toString());
			case 'half':
				return setValue((_total / 2).toString());
		}
	};

	return (
		<motion.div
			animate={{
				opacity: total === null ? 0 : 1,
				display: total === null ? 'none' : 'flex',
			}}
			className="flex gap-2">
			<Button onClick={() => setEasyBalance('half')}>half</Button>
			<Button onClick={() => setEasyBalance('max')}>max</Button>
		</motion.div>
	);
}

function Button({
	children,
	onClick,
}: {
	children: React.ReactNode;
	onClick: () => void;
}) {
	return (
		<span
			className="bg-tag-bg uppercase font-semibold text-xs rounded-xl px-2 py-0.5 text-text-opacity border border-tag-bg active:scale-95 hover:shadow-base hover:shadow-white transition duration-300 hover:border-white"
			onClick={onClick}>
			{children}
		</span>
	);
}
