import type { Picture } from '@sveltejs/enhanced-img';

export type MerchItem = {
	name: string;
	price: string;
	description: string;
	// File name inside src/lib/assets/merch/, e.g. "tee-black.jpg". Optional.
	image?: string;
};

// Showcase only: there is no cart or checkout.
export const merch: MerchItem[] = [
	{
		name: 'Fest T-shirt',
		price: '₹ —',
		description: 'Placeholder. Add the real design and price.'
	},
	{ name: 'Hoodie', price: '₹ —', description: 'Placeholder. Add the real design and price.' },
	{ name: 'Tote Bag', price: '₹ —', description: 'Placeholder. Add the real design and price.' }
];

const merchImages = import.meta.glob<Picture>('/src/lib/assets/merch/*.{avif,jpg,jpeg,png,webp}', {
	eager: true,
	import: 'default',
	query: { enhanced: true }
});

export function merchImage(file?: string): Picture | undefined {
	return file ? merchImages[`/src/lib/assets/merch/${file}`] : undefined;
}
