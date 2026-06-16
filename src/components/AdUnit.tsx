import { useEffect, useRef } from 'react';

export default function AdUnit() {
  const adRef = useRef<boolean>(false);

  useEffect(() => {
    // Only push the ad once per component mount to prevent multiple pushes error
    if (!adRef.current) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adRef.current = true;
      } catch (err) {
        console.error("AdSense push error:", err);
      }
    }
  }, []);

  return (
    <div className="w-full my-8 text-center overflow-hidden flex justify-center items-center min-h-[100px] bg-slate-50 dark:bg-slate-900 rounded-lg">
      <ins className="adsbygoogle w-full"
           style={{ display: 'block', textAlign: 'center' }}
           data-ad-layout="in-article"
           data-ad-format="fluid"
           data-ad-client="ca-pub-1106363937534854"
           data-ad-slot="1074880306"></ins>
    </div>
  );
}
