import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useDebounce } from 'react-use';

import TokenSelect from 'components/TokenSelect';

type Props = {
	src: string;
	value: string;
	symbol: string;
	setValue: (value: string) => void;
};

export default function Input({ src, value, symbol, setValue }: Props) {
	const [isFocused, setIsFocused] = useState(false);
	const [localValue, setLocalValue] = useState(value);

	useDebounce(() => setValue(localValue), 500, [localValue, setValue]);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setLocalValue(
				e.target.value
					.replace(/[^0-9.,]/g, '')
					.replace(/,/g, '.')
					.replace(/^0+(?=\d)/, '')
					.replace(/(\..*?)\..*/g, '$1')
					.replace(/(\.\d*).*$/, '$1')
					.replace(/^(\d*\.?\d*).*$/, '$1'),
			);
		},
		[],
	);

	useEffect(() => {
		setLocalValue(value);
	}, [value]);

	return (
		<motion.div
			className="flex gap-4 items-center w-full px-4 shrink-0 grow-0 h-16 bg-input-bg rounded-lg"
			animate={{
				boxShadow: isFocused ? '0px 0px 6px #fff' : '0px 0px 2px #000',
			}}>
			<TokenSelect init="top" src={src} symbol={symbol} />
			<input
				type="tel"
				autoComplete="off"
				placeholder="0.00"
				inputMode="decimal"
				value={localValue}
				onChange={handleChange}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				className="w-full h-full outline-none text-2xl text-white font-semibold bg-transparent text-right"
			/>
		</motion.div>
	);
}
