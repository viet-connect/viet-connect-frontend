import { Adsense } from '@ctrl/react-adsense';

declare global {
  interface Window {
    adsbygoogle: { [key: string]: unknown }[];
  }
}

const GoogleAd = ({ adId = '3107955930' }: { adId?: string }) => (
  <div className="adsbygoogle">
    <Adsense
      client="ca-pub-3731091119912055"
      slot={adId}
      style={{ display: 'block' }}
      layout="in-article"
      format="auto"
      responsive="true"
    />
  </div>
);

export default GoogleAd;
