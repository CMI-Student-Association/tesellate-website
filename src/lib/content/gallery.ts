import type { Picture } from '@sveltejs/enhanced-img';

// Every image dropped into src/lib/assets/gallery/ shows up on the gallery page,
// sorted by file name. Images are converted to AVIF/WebP at build time.
const modules = import.meta.glob<Picture>('/src/lib/assets/gallery/*.{avif,jpg,jpeg,png,webp}', {
	eager: true,
	import: 'default',
	query: { enhanced: true, w: '1600;800;400' }
});

export const gallery = Object.entries(modules)
	.sort(([a], [b]) => a.localeCompare(b))
	.map(([path, src]) => ({
		src,
		alt: path
			.split('/')
			.pop()!
			.replace(/\.[^.]+$/, '')
			.replace(/[-_]+/g, ' ')
	}));
