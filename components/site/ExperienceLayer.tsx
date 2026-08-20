"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const GSAP_SRC = "https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js";
const SCROLL_TRIGGER_SRC = "https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js";
const LENIS_SRC = "https://cdn.jsdelivr.net/npm/lenis@1.3.26/dist/lenis.min.js";

type AnyWindow = Window & {
  gsap?: any;
  ScrollTrigger?: any;
  Lenis?: any;
};

export default function ExperienceLayer() {
  const pathname = usePathname();
  const [loaded, setLoaded] = useState(0);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      cleanupRef.current?.();
      cleanupRef.current = null;

      const w = window as AnyWindow;
      const gsap = w.gsap;
      const ScrollTrigger = w.ScrollTrigger;
      const Lenis = w.Lenis;

      if (!gsap || !ScrollTrigger) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.registerPlugin(ScrollTrigger);

      const progress = document.querySelector<HTMLElement>("[data-scroll-progress]");
      const header = document.querySelector<HTMLElement>("[data-site-header]");

      if (reducedMotion) {
        document.querySelectorAll<HTMLElement>("[data-reveal], [data-hero-line]").forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "none";
        });
        if (progress) progress.style.transform = "scaleX(0)";
        return;
      }

      let lenis: any = null;
      let ticker: ((time: number) => void) | null = null;

      const canSmooth = window.matchMedia("(pointer: fine)").matches && window.innerWidth >= 900;
      if (Lenis && canSmooth) {
        lenis = new Lenis({
          lerp: 0.085,
          smoothWheel: true,
          syncTouch: false,
          anchors: true
        });
        lenis.on("scroll", ScrollTrigger.update);
        ticker = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(ticker);
        gsap.ticker.lagSmoothing(0);
      }

      const ctx = gsap.context(() => {
        gsap.fromTo(
          "[data-hero-line]",
          { y: 42, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.05,
            stagger: 0.09,
            ease: "power3.out",
            delay: 0.12,
            clearProps: "transform"
          }
        );

        gsap.utils.toArray("[data-reveal]").forEach((node: unknown) => {
          const el = node as HTMLElement;
          gsap.fromTo(
            el,
            { y: 52, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.95,
              ease: "power3.out",
              clearProps: "transform",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                once: true
              }
            }
          );
        });

        gsap.utils.toArray("[data-stagger]").forEach((node: unknown) => {
          const el = node as HTMLElement;
          const children = Array.from(el.children);
          gsap.fromTo(
            children,
            { y: 38, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.82,
              stagger: 0.08,
              ease: "power3.out",
              clearProps: "transform",
              scrollTrigger: {
                trigger: el,
                start: "top 86%",
                once: true
              }
            }
          );
        });

        gsap.utils.toArray("[data-parallax]").forEach((node: unknown) => {
          const el = node as HTMLElement;
          gsap.fromTo(
            el,
            { yPercent: -5, scale: 1.06 },
            {
              yPercent: 5,
              scale: 1.06,
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement || el,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.7
              }
            }
          );
        });

        gsap.utils.toArray("[data-float]").forEach((node: unknown, index: number) => {
          const el = node as HTMLElement;
          gsap.to(el, {
            y: index % 2 === 0 ? -10 : 10,
            rotate: index % 2 === 0 ? -1.5 : 1.5,
            duration: 3.4 + index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        });

        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self: any) => {
            if (progress) progress.style.transform = `scaleX(${self.progress})`;
            if (header) header.dataset.scrolled = window.scrollY > 24 ? "true" : "false";
          }
        });
      });

      ScrollTrigger.refresh();

      cleanupRef.current = () => {
        ctx.revert();
        ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
        if (ticker) gsap.ticker.remove(ticker);
        lenis?.destroy?.();
      };
    }, 120);

    return () => {
      window.clearTimeout(timer);
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [pathname, loaded]);

  const notifyLoaded = () => setLoaded((value) => value + 1);

  return (
    <>
      <Script src={GSAP_SRC} strategy="afterInteractive" onLoad={notifyLoaded} />
      <Script src={SCROLL_TRIGGER_SRC} strategy="afterInteractive" onLoad={notifyLoaded} />
      <Script src={LENIS_SRC} strategy="afterInteractive" onLoad={notifyLoaded} />
      <div className="site-scroll-progress" data-scroll-progress aria-hidden="true" />
    </>
  );
}
