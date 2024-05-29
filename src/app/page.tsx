import type { Metadata } from 'next';

import SwapScreen from 'components/screen/Swap';

export const metadata: Metadata = {
	title: 'Jupiter Swap',
	description: 'Swap tokens with the Jupiter',
};

export default async function Home() {
	return <SwapScreen />;
}
