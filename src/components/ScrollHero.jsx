import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { translations } from '../utils/translations';

export default function ScrollHero({ setCurrentRoute, language }) {
  const t = (key) => {
    const lang = language || 'en';
    if (translations[lang] && translations[lang][key]) {
      return translations[lang][key];
    }
    return key;
  };
  const trackRef = useRef(null);
  const canvasRef = useRef(null);
  const scrollProgressRef = useRef(0);
  const imagesRef = useRef([]);

  const [loadProgress, setLoadProgress] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // 1. Preload images
  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    const frameCount = mobile ? 48 : 192;
    let loadedCount = 0;
    const loadedImages = [];

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      // Format number to 6 digits, e.g. frame_000000.jpg
      const frameIndex = mobile ? i * 4 : i;
      const frameNum = String(frameIndex).padStart(6, '0');
      img.src = `/frames/frame_${frameNum}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        const pct = Math.round((loadedCount / frameCount) * 100);
        setLoadProgress(pct);
        if (loadedCount === frameCount) {
          setAllLoaded(true);
        }
      };

      img.onerror = () => {
        // Fallback for failed loads
        loadedCount++;
        const pct = Math.round((loadedCount / frameCount) * 100);
        setLoadProgress(pct);
        if (loadedCount === frameCount) {
          setAllLoaded(true);
        }
      };

      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;
  }, []);

  // 2. Draw canvas frame
  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgIndex = window.innerWidth < 768 
      ? Math.min(Math.max(Math.floor(index / 4), 0), 47) 
      : Math.min(Math.max(index, 0), imagesRef.current.length - 1);
    const img = imagesRef.current[imgIndex];
    if (!img || !img.complete) return;

    const w = canvas.width;
    const h = canvas.height;

    // Clear frame
    ctx.clearRect(0, 0, w, h);

    // Natural dimensions
    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;

    // cover fit logic
    const ratio = Math.max(w / iw, h / ih);
    const nw = iw * ratio;
    const nh = ih * ratio;

    const x = (w - nw) / 2;
    const y = (h - nh) / 2;

    ctx.drawImage(img, 0, 0, iw, ih, x, y, nw, nh);
  };

  // 3. Handle canvas resizing with high DPI support
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    // Scale canvas dimensions to retina/high-DPI resolution
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Redraw the current active frame immediately after size change
    const progress = scrollProgressRef.current || 0;
    const frameIndex = Math.min(Math.max(Math.floor(progress * 191), 0), 191);
    drawFrame(frameIndex);
  };

  // 4. Scroll tracking
  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const stickyHeight = window.innerHeight - 80;
    const scrollableDistance = rect.height - stickyHeight;

    // scrolled calculates progress after sticking offset (80px header height)
    const scrolled = -rect.top + 80;
    const progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);

    scrollProgressRef.current = progress;
    setScrollProgress(progress);

    // Use requestAnimationFrame for high performance 60fps rendering
    requestAnimationFrame(() => {
      const frameIndex = Math.min(Math.max(Math.floor(progress * 191), 0), 191);
      drawFrame(frameIndex);
    });
  };

  // 5. Initialize listeners
  useEffect(() => {
    if (!allLoaded) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', resizeCanvas);

    // Set initial size and render first frame
    resizeCanvas();
    drawFrame(0);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [allLoaded]);

  // Phase opacity calculations
  const getPhase1Opacity = (p) => {
    if (p < 0.15) return 1;
    if (p > 0.25) return 0;
    return 1 - (p - 0.15) / 0.10;
  };

  const getPhase1Translate = (p) => {
    if (p < 0.15) return 0;
    const fraction = (p - 0.15) / 0.10;
    return -50 * fraction;
  };

  const getPhase2Opacity = (p) => {
    if (p < 0.30) return 0;
    if (p > 0.65) return 0;
    if (p >= 0.30 && p < 0.42) {
      return (p - 0.30) / 0.12;
    }
    if (p >= 0.42 && p <= 0.52) {
      return 1;
    }
    return 1 - (p - 0.52) / 0.13;
  };

  const getPhase2Translate = (p) => {
    if (p < 0.30) return 50;
    if (p > 0.65) return -50;
    if (p >= 0.30 && p < 0.42) {
      const fraction = (p - 0.30) / 0.12;
      return 50 * (1 - fraction);
    }
    if (p >= 0.42 && p <= 0.52) {
      return 0;
    }
    const fraction = (p - 0.52) / 0.13;
    return -50 * fraction;
  };

  const getPhase3Opacity = (p) => {
    if (p < 0.70) return 0;
    if (p >= 0.85) return 1;
    return (p - 0.70) / 0.15;
  };

  const getPhase3Translate = (p) => {
    if (p < 0.70) return 50;
    if (p >= 0.85) return 0;
    const fraction = (p - 0.70) / 0.15;
    return 50 * (1 - fraction);
  };

  return (
    <div className="scroll-hero-track" ref={trackRef}>
      <div className="scroll-hero-sticky">
        {/* Loader panel while cache mounts */}
        {!allLoaded && (
          <div className="scroll-loading-overlay">
            <div className="loading-spinner-container">
              <div className="loading-spinner"></div>
              <span className="loading-text">{t('loading')} {loadProgress}%</span>
            </div>
          </div>
        )}

        {/* Animation Display */}
        <canvas className="scroll-hero-canvas" ref={canvasRef} />

        {/* Ambient Dark Overlay */}
        <div className="scroll-hero-vignette" />

        {/* Narrative Overlays */}
        {allLoaded && (
          <>
            {/* Phase 1: Landing Header */}
            <div
              className="scroll-narrative-overlay"
              style={{
                opacity: getPhase1Opacity(scrollProgress),
                transform: `translateY(${getPhase1Translate(scrollProgress)}px)`,
                pointerEvents: scrollProgress < 0.25 ? 'auto' : 'none',
              }}
            >
              <div className="narrative-content container">
                <span className="narrative-badge">Maxx Fit Club</span>
                <h1 className="narrative-title">{t('heroTitle')}</h1>
                <p className="narrative-subtitle">
                  {t('heroSubtitle')}
                </p>
                <div className="scroll-indicator-mouse">
                  <div className="mouse-wheel-wrap">
                    <div className="wheel-line"></div>
                  </div>
                  <span>{t('scrollToBegin')}</span>
                </div>
              </div>
            </div>

            {/* Phase 2: Form Description */}
            <div
              className="scroll-narrative-overlay"
              style={{
                opacity: getPhase2Opacity(scrollProgress),
                transform: `translateY(${getPhase2Translate(scrollProgress)}px)`,
                pointerEvents: scrollProgress >= 0.30 && scrollProgress <= 0.65 ? 'auto' : 'none',
              }}
            >
              <div className="narrative-content container text-center max-w-xl">
                <span className="narrative-badge">{t('trulyPersonalTitle')}</span>
                <h1 className="narrative-title text-gradient">{t('biomechanicsTitle')}</h1>
                <p className="narrative-subtitle">
                  {t('biomechanicsDesc')}
                </p>
              </div>
            </div>

            {/* Phase 3: CTAs */}
            <div
              className="scroll-narrative-overlay"
              style={{
                opacity: getPhase3Opacity(scrollProgress),
                transform: `translateY(${getPhase3Translate(scrollProgress)}px)`,
                pointerEvents: scrollProgress > 0.70 ? 'auto' : 'none',
              }}
            >
              <div className="narrative-content container">
                <span className="narrative-badge">{t('yourTurnNow')}</span>
                <h1 className="narrative-title">{t('ctaTitle')}</h1>
                <p className="narrative-subtitle">
                  {t('ctaDesc')}
                </p>
                <div className="narrative-actions">
                  <button className="btn btn-primary" onClick={() => setCurrentRoute('plans')}>
                    <span>{t('joinMaxx')}</span>
                    <ArrowRight size={18} />
                  </button>
                  <button className="btn btn-secondary" onClick={() => setCurrentRoute('programs')}>
                    <span>{t('explorePrograms')}</span>
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
