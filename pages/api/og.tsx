import { ImageResponse } from '@vercel/og';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
	runtime: 'edge',
};

export default async function handler(request: NextApiRequest) {
	return new ImageResponse(
		(
			<div
				style={{
					display: 'flex',
					background: '#f6f6f6',
					width: '100%',
					height: '100%',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			></div>
		),
		{
			width: 1200,
			height: 630,
		},
	);
}
