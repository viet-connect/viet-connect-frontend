'use client';

// eslint-disable-next-line import/no-unresolved
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import type { ComponentProps } from 'react';

type AnalyticsProps = ComponentProps<typeof VercelAnalytics>;

export const Analytics: React.FC<AnalyticsProps> = (props) => (
	<VercelAnalytics {...props} />
);
