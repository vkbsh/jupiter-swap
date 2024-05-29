import { toFix2 } from 'utils';
import { ChevronIcon } from './icons';

type Props = {
	isShown: boolean;
	toAmount: number;
	fromAmount: number;
	onClick: () => void;
};

export default function ShowMoreSection({
	isShown,
	onClick,
	toAmount,
	fromAmount,
}: Props) {
	const label = isShown ? 'Show less' : 'Show more';

	return (
		<div
			onClick={onClick}
			className="flex justify-between items-center text-text-opacity">
			<span className="flex justify-between items-center gap-2">
				<span className="w-2">
					<ChevronIcon />
				</span>
				<span className="text-base text-opacity font-medium">
					{label}
				</span>
			</span>
			<span className="text-base text-opacity font-medium">
				from {toFix2(fromAmount)} to {toFix2(toAmount)}
			</span>
		</div>
	);
}
