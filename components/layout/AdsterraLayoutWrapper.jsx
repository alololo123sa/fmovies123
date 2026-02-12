// components/layout/AdsterraLayoutWrapper.jsx
"use client";

import { useEffect, useRef } from 'react';
import { getAIOptimizer } from '../../utils/adsterra';

export default function AdsterraLayoutWrapper({ children, countryCode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !initialized.current) {
        const optimizer = getAIOptimizer();
        if (optimizer) {
            optimizer.setGeo(countryCode);
        }

        const nativeContainer = document.getElementById('container-d4de704600e3814b18939474fd18f80b');

        const visibleAds = [
            { id: 'native', src: '//fundingfashioned.com/d4de704600e3814b18939474fd18f80b/invoke.js' },
            { id: 'social', src: '//fundingfashioned.com/51/fa/68/51fa68d171b6357bdf3858b3fded43cc.js' }
        ];

        visibleAds.forEach(s => {
            if(document.querySelector(`script[src="${s.src}"]`)) return;
            const el = document.createElement('script');
            el.src = s.src;
            el.async = true;
            
            // PERBAIKAN: Masukkan script native ke kontainer footer jika ada
            if (s.id === 'native' && nativeContainer) {
                nativeContainer.appendChild(el);
            } else {
                document.body.appendChild(el);
            }
        });

        setTimeout(() => {
            if(document.querySelector(`script[src*="7eacb0c6c355b3d236e8f4e399c56034"]`)) return;
            const popunder = document.createElement('script');
            popunder.src = '//fundingfashioned.com/7e/ac/b0/7eacb0c6c355b3d236e8f4e399c56034.js'; 
            document.head.appendChild(popunder);
        }, 3500);

        initialized.current = true;
    }
  }, [countryCode]);

  return <>{children}</>;
}