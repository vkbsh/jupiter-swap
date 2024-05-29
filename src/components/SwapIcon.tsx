import { motion } from 'framer-motion';

type Props = {
	onClick: () => void;
};

export default function SwapButton({ onClick }: Props) {
	return (
		<div className="flex justify-center items-center">
			<motion.span
				whileHover={{
					scale: 1.05,
					color: '#fff',
					fill: '#fff',
					borderColor: '#fff',
					boxShadow: '0px 0px 6px #fff',
				}}
				whileTap={{ scale: 0.95 }}
				onClick={onClick}
				className="p-1.5 w-8 h-8 rounded-full fill-icon border bg-icon-bg border-icon">
				<svg viewBox="0 0 16 17">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M4.29265 8.89714L6.08004 10.6851H1.59998V6.20508L3.38798 7.99247L9.27973 2.1001L10.1851 3.00546L4.29265 8.89714ZM14.4 5.5649V10.045L12.612 8.25757L6.72022 14.1499L5.81485 13.2446L11.7072 7.35282L9.91984 5.56482L14.4 5.5649Z"
					/>
				</svg>
			</motion.span>
		</div>
	);
}
