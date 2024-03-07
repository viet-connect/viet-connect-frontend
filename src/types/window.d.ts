export {};

declare global {
	interface Window {
		adsbygoogle: { [key: string]: unknown }[];
	}
}
