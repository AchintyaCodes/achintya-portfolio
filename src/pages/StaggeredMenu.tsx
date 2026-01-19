import React, { useCallback, useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import './StaggeredMenu.css';

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}

export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}

export interface StaggeredMenuProps {
  position?: 'left' | 'right';
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  changeMenuColorOnOpen?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  isFixed?: boolean;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = 'right',
  colors = [],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = false,
  className,
  logoUrl = '/src/assets/logos/reactbits-gh-white.svg',
  menuButtonColor = '#fff',
  openMenuButtonColor = '#fff',
  changeMenuColorOnOpen = true,
  accentColor = '#5227FF',
  isFixed = false,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);
  
  const l1Ref = useRef<HTMLSpanElement | null>(null);
  const l2Ref = useRef<HTMLSpanElement | null>(null);
  const l3Ref = useRef<HTMLSpanElement | null>(null);
  
  const iconRef = useRef<HTMLSpanElement | null>(null);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const iconTlRef = useRef<gsap.core.Timeline | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const busyRef = useRef(false);
  const gsapContextRef = useRef<gsap.Context | null>(null);

  // Kill all active animations helper
  const killAllAnimations = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    closeTweenRef.current?.kill();
    closeTweenRef.current = null;
    iconTlRef.current?.kill();
    iconTlRef.current = null;
    colorTweenRef.current?.kill();
    colorTweenRef.current = null;
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const l1 = l1Ref.current;
      const l2 = l2Ref.current;
      const l3 = l3Ref.current;
      const icon = iconRef.current;

      if (!panel || !icon || !l1 || !l2 || !l3) return;

      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer')) as HTMLElement[];
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen });
      
      gsap.set([l1, l2, l3], { transformOrigin: 'center center', rotate: 0, y: 0, opacity: 1, scaleX: 1 });

      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    
    gsapContextRef.current = ctx;
    
    return () => {
      killAllAnimations();
      ctx.revert();
    };
  }, [menuButtonColor, position, killAllAnimations]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    // Kill existing animations before building new ones
    openTlRef.current?.kill();
    openTlRef.current = null;
    closeTweenRef.current?.kill();
    closeTweenRef.current = null;

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
    const numberEls = Array.from(
      panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
    ) as HTMLElement[];
    const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];

    const offscreen = position === 'left' ? -100 : 100;

    // Set initial states
    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { '--sm-num-opacity': 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ 
      paused: true,
      onComplete: () => { busyRef.current = false; }
    });

    // Animate layers
    layers.forEach((layer, i) => {
      tl.fromTo(layer, { xPercent: offscreen }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });
    
    const lastTime = layers.length ? (layers.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layers.length ? 0.08 : 0);
    const panelDuration = 0.65;
    
    tl.fromTo(
      panel,
      { xPercent: offscreen },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.15;
      tl.to(itemEls, {
        yPercent: 0,
        rotate: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.1
      }, itemsStart);
      
      if (numberEls.length) {
        tl.to(numberEls, {
          duration: 0.6,
          ease: 'power2.out',
          '--sm-num-opacity': 1,
          stagger: 0.08
        }, itemsStart + 0.1);
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;
      if (socialTitle) {
        tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, socialsStart);
      }
      if (socialLinks.length) {
        tl.to(socialLinks, {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: 'power3.out',
          stagger: 0.08
        }, socialsStart + 0.04);
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    // Kill open animation immediately
    openTlRef.current?.kill();
    openTlRef.current = null;
    closeTweenRef.current?.kill();
    closeTweenRef.current = null;

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) {
      busyRef.current = false;
      return;
    }

    const all: HTMLElement[] = [...layers, panel];
    const offscreen = position === 'left' ? -100 : 100;
    
    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: true,
      onComplete: () => {
        // Reset element states
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
        const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')) as HTMLElement[];
        const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];
        
        gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        gsap.set(numberEls, { '--sm-num-opacity': 0 });
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        gsap.set(socialLinks, { y: 25, opacity: 0 });
        
        busyRef.current = false;
        closeTweenRef.current = null;
      }
    });
  }, [position]);

  const animateIcon = useCallback((opening: boolean) => {
    const l1 = l1Ref.current;
    const l2 = l2Ref.current;
    const l3 = l3Ref.current;
    if (!l1 || !l2 || !l3) return;

    // Kill previous icon animation
    iconTlRef.current?.kill();
    iconTlRef.current = null;
    
    const tl = gsap.timeline();
    
    if (opening) {
      tl.to(l1, { y: 4.5, rotate: 45, duration: 0.3, ease: 'power3.out' }, 0)
        .to(l2, { opacity: 0, scaleX: 0, duration: 0.2, ease: 'power3.out' }, 0)
        .to(l3, { y: -4.5, rotate: -45, duration: 0.3, ease: 'power3.out' }, 0);
    } else {
      tl.to(l1, { y: 0, rotate: 0, duration: 0.3, ease: 'power3.inOut' }, 0)
        .to(l2, { opacity: 1, scaleX: 1, duration: 0.3, ease: 'power3.inOut' }, 0)
        .to(l3, { y: 0, rotate: 0, duration: 0.3, ease: 'power3.inOut' }, 0);
    }
    
    iconTlRef.current = tl;
  }, []);

  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      
      colorTweenRef.current?.kill();
      colorTweenRef.current = null;
      
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, {
          color: targetColor,
          delay: 0.1,
          duration: 0.25,
          ease: 'power2.out'
        });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
  );

  useEffect(() => {
    if (toggleBtnRef.current) {
      const targetColor = changeMenuColorOnOpen && openRef.current ? openMenuButtonColor : menuButtonColor;
      gsap.set(toggleBtnRef.current, { color: targetColor });
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const toggleMenu = useCallback(() => {
    // Prevent rapid clicking
    if (busyRef.current) return;
    
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    
    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      busyRef.current = true;
      playClose();
    }
    
    animateIcon(target);
    animateColor(target);
  }, [playOpen, playClose, animateIcon, animateColor, onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (!openRef.current || busyRef.current) return;
    
    openRef.current = false;
    setOpen(false);
    onMenuClose?.();
    busyRef.current = true;
    playClose();
    animateIcon(false);
    animateColor(false);
  }, [playClose, animateIcon, animateColor, onMenuClose]);

  React.useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeOnClickAway, open, closeMenu]);

  return (
    <div
      className={(className ? className + ' ' : '') + 'staggered-menu-wrapper' + (isFixed ? ' fixed-wrapper' : '')}
      style={accentColor ? { ['--sm-accent' as any]: accentColor } : undefined}
      data-position={position}
      data-open={open || undefined}
    >
      <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
        {(() => {
          const raw = colors && colors.length ? colors.slice(0, 4) : ['#1e1e22', '#35353c'];
          let arr = [...raw];
          if (arr.length >= 3) {
            const mid = Math.floor(arr.length / 2);
            arr.splice(mid, 1);
          }
          return arr.map((c, i) => <div key={i} className="sm-prelayer" style={{ background: c }} />);
        })()}
      </div>
      <header className="staggered-menu-header" aria-label="Main navigation header">
        <div className="sm-logo" aria-label="Logo">
          <img
            src={logoUrl || '/src/assets/logos/reactbits-gh-white.svg'}
            alt="Logo"
            className="sm-logo-img"
            draggable={false}
            width={110}
            height={24}
          />
        </div>
        <button
          ref={toggleBtnRef}
          className="sm-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="staggered-menu-panel"
          onClick={toggleMenu}
          type="button"
        >
          {/* 2. Removed text label and wrapped icon in a container for the circle background */}
          <span className="sm-icon-container">
            <span ref={iconRef} className="sm-icon" aria-hidden="true">
              <span ref={l1Ref} className="sm-icon-line" />
              <span ref={l2Ref} className="sm-icon-line" />
              <span ref={l3Ref} className="sm-icon-line" />
            </span>
          </span>
        </button>
      </header>

      <aside id="staggered-menu-panel" ref={panelRef} className="staggered-menu-panel" aria-hidden={!open}>
        <div className="sm-panel-inner">
          <ul className="sm-panel-list" role="list" data-numbering={displayItemNumbering || undefined}>
            {items && items.length ? (
              items.map((it, idx) => (
                <li className="sm-panel-itemWrap" key={it.label + idx}>
                  <a className="sm-panel-item" href={it.link} aria-label={it.ariaLabel} data-index={idx + 1}>
                    <span className="sm-panel-itemLabel">{it.label}</span>
                  </a>
                </li>
              ))
            ) : (
              <li className="sm-panel-itemWrap" aria-hidden="true">
                <span className="sm-panel-item">
                  <span className="sm-panel-itemLabel">No items</span>
                </span>
              </li>
            )}
          </ul>
          {displaySocials && socialItems && socialItems.length > 0 && (
            <div className="sm-socials" aria-label="Social links">
              <h3 className="sm-socials-title">Socials</h3>
              <ul className="sm-socials-list" role="list">
                {socialItems.map((s, i) => (
                  <li key={s.label + i} className="sm-socials-item">
                    <a href={s.link} target="_blank" rel="noopener noreferrer" className="sm-socials-link">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default StaggeredMenu;