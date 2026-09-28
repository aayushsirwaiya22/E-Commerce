import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Run GSAP code safely inside React (StrictMode-safe cleanup).
// Returns a ref to attach to the section root; `q` selects inside it.
// Usage:
//   const ref = useGsap((q) => { gsap.from(q(".hero-line"), {...}) });
//   return <div ref={ref}>...</div>
export function useGsap(setup, deps = []) {
    const ref = useRef(null);
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            setup(gsap.utils.selector(ref));
        }, ref);
        return () => ctx.revert();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
    return ref;
}

// Batch-reveal children matching selector inside the returned ref on scroll.
// Usage: const ref = useReveal(); <div ref={ref}><div className="reveal"/>
export function useReveal(selector = ".reveal", deps = []) {
    const ref = useRef(null);
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const q = gsap.utils.selector(ref);
            const els = q(selector);
            if (!els.length) return;
            gsap.set(els, { y: 28, opacity: 0 });
            ScrollTrigger.batch(els, {
                start: "top 88%",
                once: true,
                onEnter: (batch) =>
                    gsap.to(batch, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out", overwrite: true }),
            });
        }, ref);
        return () => ctx.revert();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
    return ref;
}

export { gsap, ScrollTrigger };
