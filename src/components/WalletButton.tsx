import { BaseWalletMultiButton } from '@solana/wallet-adapter-react-ui';

import { WalletIcon } from 'components/icons';

export default function WalletButton() {
	return (
		<div className="group active:scale-95 hover:shadow-base hover:shadow-white transition duration-300 hover:border-white flex border border-refresh-bg justify-center items-center bg-refresh-bg w-7 h-7 rounded-full">
			<span className="group-hover:text-white flex w-3 h-3 text-refresh-text transition duration-300 ">
				<WalletIcon />
			</span>
		</div>
	);
}
