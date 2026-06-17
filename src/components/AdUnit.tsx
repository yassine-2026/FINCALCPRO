import { useEffect, useRef } from 'react';

export default function AdUnit() {
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    let initialized = false;
    let checkInterval: number;

    const initAd = () => {
      // Check if container has a width > 0 before pushing
      if (insRef.current && insRef.current.offsetWidth > 0 && !insRef.current.getAttribute('data-adsbygoogle-status') && !initialized) {
        try {
          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          initialized = true;
          clearInterval(checkInterval);
        } catch (err) {
          console.error("AdSense push error:", err);
          clearInterval(checkInterval);
        }
      }
    };

    // Delay initialization to ensure layout is complete and width > 0
    // Sometimes it takes a moment for the component to be fully rendered with dimensions
    checkInterval = window.setInterval(initAd, 200);

    // Initial check
    setTimeout(initAd, 50);

    return () => clearInterval(checkInterval);
  }, []);

  return (
    <div className="w-full my-8 text-center flex justify-center items-center bg-slate-50 rounded-lg min-h-[100px] min-w-[250px] overflow-hidden">
      <ins 
        ref={insRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minWidth: '250px' }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-1106363937534854"
        data-ad-slot="1074880306"
      ></ins>
    </div>
  );
}
