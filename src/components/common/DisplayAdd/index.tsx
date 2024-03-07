import React, { useEffect } from 'react';

const DisplayAds = () => {
	useEffect(() => {
		const pushAd = () => {
			try {
				const { adsbygoogle } = window;
				adsbygoogle.push({});
			} catch (e) {
				console.error(e);
			}
		};

		const interval = setInterval(() => {
			if (window.adsbygoogle) {
				pushAd();
				clearInterval(interval);
			}
		}, 300);

		return () => {
			clearInterval(interval);
		};
	}, []);
	return (
		<ins
			className="adsbygoogle"
			style={{ display: 'block' }}
			data-ad-format="auto"
			data-ad-layout-key="-fl+5w+4e-db+86"
			data-ad-client="ca-pub-3731091119912055"
			data-ad-slot="5396148904"
		></ins>
	);
};

export default DisplayAds;
