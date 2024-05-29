'use client';

import { motion } from 'framer-motion';

type Props = {
	children: React.ReactNode;
};
export default function Template({ children }: Props) {
	return (
		<motion.div
			className="h-full"
			// initial={{
			// 	opacity: 0,
			// 	scale: 0.1,
			// }}
			// animate={{
			// 	opacity: 1,
			// 	scale: 1,
			// }}
			// exit={{
			// 	opacity: 0,
			// 	scale: 0.1,
			// }}
			transition={{
				duration: 0.3,
			}}>
			{children}
		</motion.div>
	);
}
