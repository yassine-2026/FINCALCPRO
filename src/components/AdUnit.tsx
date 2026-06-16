import { useEffect, useRef } from 'react';

export default function AdUnit() {
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    // Delay initialization to ensure layout is complete and width > 0
    const timer = setTimeout(() => {
      if (insRef.current && !insRef.current.getAttribute('data-adsbygoogle-status')) {
        try {
          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
          console.error("AdSense push error:", err);
        }
      }
    }, 100);

    return () => clearTimeout(timer);
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
