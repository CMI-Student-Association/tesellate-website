<script lang="ts">
	import type { Attachment } from 'svelte/attachments';

	let { permalink }: { permalink: string } = $props();

	let scriptPromise: Promise<void> | undefined;

	function loadEmbedScript() {
		scriptPromise ??= new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.src = 'https://www.instagram.com/embed.js';
			script.async = true;
			script.onload = () => resolve();
			script.onerror = () => reject(new Error('Instagram embed script failed to load'));
			document.body.appendChild(script);
		});
		return scriptPromise;
	}

	// Instagram's embed.js is large, so it is only requested once the embed is
	// about to scroll into view. Until then (or if it is blocked) the plain
	// link inside the blockquote is shown.
	const lazyEmbed: Attachment<HTMLElement> = (node) => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (!entries.some((e) => e.isIntersecting)) return;
				observer.disconnect();
				loadEmbedScript()
					.then(() => window.instgrm?.Embeds.process())
					.catch(() => {});
			},
			{ rootMargin: '400px' }
		);
		observer.observe(node);
		return () => observer.disconnect();
	};
</script>

<div class="mx-auto w-full max-w-[540px]" {@attach lazyEmbed}>
	<blockquote
		class="instagram-media m-0! w-full! min-w-0! rounded-2xl! border border-line bg-surface p-6"
		data-instgrm-permalink={permalink}
		data-instgrm-version="14"
	>
		<!-- External link, so resolve() does not apply. -->
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a href={permalink} target="_blank" rel="noopener" class="text-brand underline">
			View this post on Instagram
		</a>
	</blockquote>
</div>
