"use client";

import type { CSSProperties, ReactNode } from "react";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

import "./BubbleMenu.css";

type MenuItem = {
  label: string;
  href: string;
  ariaLabel?: string;
  rotation?: number;
  hoverStyles?: {
    bgColor?: string;
    textColor?: string;
  };
};

export type BubbleMenuProps = {
  logo: ReactNode | string;
  onMenuClick?: (open: boolean) => void;
  className?: string;
  style?: CSSProperties;
  menuAriaLabel?: string;
  menuBg?: string;
  menuContentColor?: string;
  useFixedPosition?: boolean;
  items?: MenuItem[];
  animationEase?: string;
  animationDuration?: number;
  staggerDelay?: number;
};

const DEFAULT_ITEMS: MenuItem[] = [
  {
    label: "Lokacije",
    href: "#lokacije",
    ariaLabel: "Lokacije alkotest aparata",
    rotation: -8,
    hoverStyles: { bgColor: "#3b82f6", textColor: "#ffffff" },
  },
  {
    label: "Kako Koristiti",
    href: "#upute",
    ariaLabel: "Upute za korištenje",
    rotation: 8,
    hoverStyles: { bgColor: "#10b981", textColor: "#ffffff" },
  },
  {
    label: "Vozi Odgovorno",
    href: "#savjeti",
    ariaLabel: "Savjeti za odgovornu vožnju",
    rotation: 8,
    hoverStyles: { bgColor: "#f59e0b", textColor: "#ffffff" },
  },
  {
    label: "Kontakt",
    href: "#kontakt",
    ariaLabel: "Kontakt informacije",
    rotation: -8,
    hoverStyles: { bgColor: "#ef4444", textColor: "#ffffff" },
  },
];

export default function BubbleMenu({
  logo,
  onMenuClick,
  className,
  style,
  menuAriaLabel = "Toggle menu",
  menuBg = "#fff",
  menuContentColor = "#111",
  useFixedPosition = false,
  items,
  animationEase = "back.out(1.5)",
  animationDuration = 0.5,
  staggerDelay = 0.12,
}: BubbleMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const isScrollingProgrammatically = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const overlayRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLAnchorElement[]>([]);
  const labelRefs = useRef<HTMLSpanElement[]>([]);

  const menuItems = items?.length ? items : DEFAULT_ITEMS;
  const containerClassName = [
    "bubble-menu",
    useFixedPosition ? "fixed" : "absolute",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Očisti postojeći timeout ako postoji
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Postavi flag da se scroll događa programski
      isScrollingProgrammatically.current = true;

      // Postavi aktivnu sekciju odmah
      setActiveSection(sectionId);

      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Resetiraj flag nakon što se scroll završi i provjeri poziciju
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingProgrammatically.current = false;
        scrollTimeoutRef.current = null;

        // Provjeri i postavi ispravnu aktivnu sekciju nakon scrolla
        const sections = ["hero", "lokacije", "upute", "savjeti", "kontakt"];
        const scrollPosition = window.scrollY + 100;

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = document.getElementById(sections[i]);
          if (section) {
            const sectionTop = section.offsetTop;
            if (scrollPosition >= sectionTop) {
              setActiveSection(sections[i]);
              break;
            }
          }
        }
      }, 1000);
    }
  };

  const handleToggle = () => {
    const nextState = !isMenuOpen;
    if (nextState) setShowOverlay(true);
    setIsMenuOpen(nextState);
    onMenuClick?.(nextState);
  };

  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);

    if (!overlay || !bubbles.length) return;

    if (isMenuOpen) {
      gsap.set(overlay, { display: "flex" });
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.set(bubbles, { scale: 0, transformOrigin: "50% 50%" });
      gsap.set(labels, { y: 24, autoAlpha: 0 });

      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay + gsap.utils.random(-0.05, 0.05);
        const tl = gsap.timeline({ delay });

        tl.to(bubble, {
          scale: 1,
          duration: animationDuration,
          ease: animationEase,
        });
        if (labels[i]) {
          tl.to(
            labels[i],
            {
              y: 0,
              autoAlpha: 1,
              duration: animationDuration,
              ease: "power3.out",
            },
            `-=${animationDuration * 0.9}`
          );
        }
      });
    } else if (showOverlay) {
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.to(labels, {
        y: 24,
        autoAlpha: 0,
        duration: 0.2,
        ease: "power3.in",
      });
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(overlay, { display: "none" });
          setShowOverlay(false);
        },
      });
    }
  }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay]);

  useEffect(() => {
    const handleResize = () => {
      if (isMenuOpen) {
        const bubbles = bubblesRef.current.filter(Boolean);
        const isDesktop = window.innerWidth >= 900;

        bubbles.forEach((bubble, i) => {
          const item = menuItems[i];
          if (bubble && item) {
            const rotation = isDesktop ? item.rotation ?? 0 : 0;
            gsap.set(bubble, { rotation });
          }
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen, menuItems]);

  // Scroll handling useEffect
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Set new timeout to detect when scrolling stops
      scrollTimeout = setTimeout(() => {
        // Ako se scroll događa programski, ne mijenjaj aktivnu sekciju
        if (isScrollingProgrammatically.current) {
          return;
        }

        const sections = ["hero", "lokacije", "upute", "savjeti", "kontakt"];
        const scrollPosition = window.scrollY + 100; // Offset za navbar

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = document.getElementById(sections[i]);
          if (section) {
            const sectionTop = section.offsetTop;
            if (scrollPosition >= sectionTop) {
              setActiveSection(sections[i]);
              break;
            }
          }
        }
      }, 0); // Kratka pauza za brzu responsivnost
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      // Očisti i programski scroll timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <nav
        className={containerClassName}
        style={style}
        aria-label="Main navigation"
      >
        <div
          className="bubble logo-bubble"
          aria-label="Logo"
          style={{ background: menuBg }}
        >
          <span className="logo-content">
            {typeof logo === "string" ? logo : logo}
          </span>
        </div>

        <button
          type="button"
          className={`bubble toggle-bubble menu-btn ${
            isMenuOpen ? "open" : ""
          }`}
          onClick={handleToggle}
          aria-label={menuAriaLabel}
          aria-pressed={isMenuOpen}
          style={{ background: menuBg }}
        >
          <span
            className="menu-line"
            style={{ background: menuContentColor }}
          />
          <span
            className="menu-line short"
            style={{ background: menuContentColor }}
          />
        </button>
      </nav>
      {showOverlay && (
        <div
          ref={overlayRef}
          className={`bubble-menu-items ${
            useFixedPosition ? "fixed" : "absolute"
          }`}
          aria-hidden={!isMenuOpen}
        >
          <ul className="pill-list" role="menu" aria-label="Menu links">
            {menuItems.map((item, idx) => (
              <li key={idx} role="none" className="pill-col">
                <button
                  role="menuitem"
                  onClick={() => {
                    const sectionId = item.href.replace("#", "");
                    scrollToSection(sectionId);
                    setIsMenuOpen(false);
                    setShowOverlay(false);
                  }}
                  aria-label={item.ariaLabel || item.label}
                  className="pill-link"
                  style={
                    {
                      "--item-rot": `${item.rotation ?? 0}deg`,
                      "--pill-bg": menuBg,
                      "--pill-color": menuContentColor,
                      "--hover-bg": item.hoverStyles?.bgColor || "#f3f4f6",
                      "--hover-color":
                        item.hoverStyles?.textColor || menuContentColor,
                    } as CSSProperties
                  }
                  ref={(el) => {
                    if (el) bubblesRef.current[idx] = el;
                  }}
                >
                  <span
                    className="pill-label"
                    ref={(el) => {
                      if (el) labelRefs.current[idx] = el;
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
