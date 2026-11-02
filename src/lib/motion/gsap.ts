import type { Attachment } from 'svelte/attachments';
import { prefersReducedMotion } from 'svelte/motion';

type Gsap = typeof import('gsap').gsap;
type ScrollTriggerType = typeof import('gsap/ScrollTrigger').ScrollTrigger;

let loading: Promise<{ gsap: Gsap; ScrollTrigger: ScrollTriggerType }> | undefined;

/**
 * Load GSAP and ScrollTrigger on demand. They are code-split out of the main
 * bundle, so pages that do not animate with GSAP never download them.
 */
export function loadGsap() {
	loading ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
		([{ gsap }, { ScrollTrigger }]) => {
			gsap.registerPlugin(ScrollTrigger);
			return { gsap, ScrollTrigger };
		}
	);
	return loading;
}

/**
 * Run a GSAP setup function against an element. Everything created inside the
 * setup (tweens, timelines, ScrollTriggers) is reverted when the element is
 * removed. Skipped entirely when the user prefers reduced motion.
 *
 *   <section {@attach gsapAnimate(({ gsap }, el) => gsap.from(el.children, { y: 40, opacity: 0, stagger: 0.1 }))}>
 */
export function gsapAnimate(
	setup: (lib: { gsap: Gsap; ScrollTrigger: ScrollTriggerType }, node: HTMLElement) => void
): Attachment<HTMLElement> {
	return (node) => {
		if (prefersReducedMotion.current) return;

		let ctx: gsap.Context | undefined;
		let destroyed = false;

		loadGsap().then((lib) => {
			if (destroyed) return;
			ctx = lib.gsap.context(() => setup(lib, node), node);
		});

		return () => {
			destroyed = true;
			ctx?.revert();
		};
	};
}
