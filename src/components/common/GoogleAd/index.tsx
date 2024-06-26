import { Adsense } from '@ctrl/react-adsense';

declare global {
  interface Window {
    adsbygoogle: { [key: string]: unknown }[];
  }
}

const GoogleAd = () => (
  <div className="adsbygoogle">
    <Adsense
      client="ca-pub-3731091119912055"
      slot="3107955930"
      style={{ display: 'block' }}
      layout="in-article"
      format="auto"
      responsive="true"
    />
  </div>
);

export default GoogleAd;
