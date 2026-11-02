<script lang="ts">
	import { fade } from 'svelte/transition';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import Section from '#lib/components/Section.svelte';
	import InstagramEmbed from '#lib/components/InstagramEmbed.svelte';
	import { gallery } from '#lib/content/gallery.ts';
	import { site } from '#lib/content/site.ts';
	import { reveal } from '#lib/motion/reveal.ts';

	let openIndex = $state<number | null>(null);
	const current = $derived(openIndex === null ? null : gallery[openIndex]);

	function step(by: number) {
		if (openIndex === null) return;
		openIndex = (openIndex + by + gallery.length) % gallery.length;
	}

	function onkeydown(e: KeyboardEvent) {
		if (openIndex === null) return;
		if (e.key === 'Escape') openIndex = null;
		if (e.key === 'ArrowRight') step(1);
		if (e.key === 'ArrowLeft') step(-1);
	}
</script>

<svelte:head>
	<title>Gallery · {site.name}</title>
</svelte:head>

<svelte:window {onkeydown} />

<PageHeader title="Gallery" intro="Moments from previous editions." />

<Section>
	{#if gallery.length}
		<div class="columns-1 gap-4 sm:columns-2 lg:columns-3">
			{#each gallery as image, i (image.src)}
				<button
					class="mb-4 block w-full overflow-hidden rounded-2xl"
					aria-label="Open {image.alt}"
					onclick={() => (openIndex = i)}
					{@attach reveal({ delay: (i % 3) * 60 })}
				>
					<enhanced:img
						src={image.src}
						alt={image.alt}
						sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
						loading="lazy"
						class="w-full transition-transform duration-500 hover:scale-105"
					/>
				</button>
			{/each}
		</div>
	{:else}
		<p class="rounded-2xl border border-dashed border-line p-10 text-center text-muted">
			Add photos to <code>src/lib/assets/gallery/</code> and they will appear here.
		</p>
	{/if}
</Section>

{#if site.instagram.embedPermalink}
	<Section class="mt-24">
		<h2 class="mb-8 font-display text-3xl font-black sm:text-5xl" {@attach reveal()}>
			On Instagram
		</h2>
		<InstagramEmbed permalink={site.instagram.embedPermalink} />
	</Section>
{/if}

{#if current}
	<div
		class="fixed inset-0 z-50 grid place-items-center bg-ink/95 p-4"
		role="dialog"
		aria-modal="true"
		aria-label={current.alt}
		transition:fade={{ duration: 150 }}
	>
		<button
			class="absolute inset-0 cursor-zoom-out"
			aria-label="Close"
			onclick={() => (openIndex = null)}
		></button>
		<enhanced:img
			src={current.src}
			alt={current.alt}
			sizes="100vw"
			class="relative max-h-[90svh] w-auto rounded-xl object-contain"
		/>
		<div class="absolute inset-x-0 bottom-4 flex justify-center gap-3">
			<button class="rounded-full border border-line bg-surface px-4 py-2" onclick={() => step(-1)}>
				Previous
			</button>
			<button class="rounded-full border border-line bg-surface px-4 py-2" onclick={() => step(1)}>
				Next
			</button>
		</div>
	</div>
{/if}
