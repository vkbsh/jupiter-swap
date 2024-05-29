import { Token } from 'lib/jupiter';
import TokenSelect from 'components/TokenSelect';

type Props = {
	token: Token;
};
export default function Receive({ token }: Props) {
	return (
		<div className="h-7 shrink-0 flex gap-4 items-center w-full px-4 pb-0">
			<TokenSelect
				init="bottom"
				src={token.logoURI}
				symbol={token.symbol}
			/>
		</div>
	);
}
