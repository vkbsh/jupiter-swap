import { RefreshIcon } from 'components/icons';

type Props = {
	onClick: () => void;
};

export default function RefreshButton({ onClick }: Props) {
	return (
		<div
			onClick={onClick}
			className="group active:scale-95 hover:shadow-base hover:shadow-white transition duration-300 hover:border-white flex border border-refresh-bg justify-center items-center bg-refresh-bg w-7 h-7 rounded-full">
			<span className="group-hover:text-white flex w-3 h-3 text-refresh-text transition duration-300 ">
				<RefreshIcon />
			</span>
		</div>
	);
}
