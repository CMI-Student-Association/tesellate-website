// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	// Set by Instagram's embed.js (see InstagramEmbed.svelte).
	interface Window {
		instgrm?: { Embeds: { process(): void } };
	}
}

export {};
