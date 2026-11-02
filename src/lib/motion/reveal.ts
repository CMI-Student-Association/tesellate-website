import type { Attachment } from 'svelte/attachments';

/**
 * Fade-and-rise an element the first time it scrolls into view.
 * Pure CSS + IntersectionObserver, so it costs no animation library.
 *
 *   <div {@attach reveal()}>...</div>
 *   <div {@attach reveal({ delay: 120 })}>...</div>
 */
export function reveal({ delay = 0, threshold = 0.15 } = {}): Attachment<HTMLElement> {
	return (node) => {
		node.dataset.reveal = 'hidden';
		if (delay) node.style.setProperty('--reveal-delay', `${delay}ms`);

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						node.dataset.reveal = 'visible';
						observer.disconnect();
					}
				}
			},
			{ threshold }
		);
		observer.observe(node);

		return () => observer.disconnect();
	};
}
