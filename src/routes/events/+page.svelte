<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import { prefersReducedMotion } from 'svelte/motion';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import Section from '#lib/components/Section.svelte';
	import EventCard from '#lib/components/EventCard.svelte';
	import { events } from '#lib/content/events.ts';
	import { site } from '#lib/content/site.ts';

	const categories = ['All', ...new Set(events.map((e) => e.category))];
	let active = $state('All');

	const shown = $derived(
		[...events]
			.filter((e) => active === 'All' || e.category === active)
			.sort((a, b) => a.day - b.day || a.time.localeCompare(b.time))
	);
	const duration = $derived(prefersReducedMotion.current ? 0 : 300);
</script>

<svelte:head>
	<title>Events · {site.name}</title>
</svelte:head>

<PageHeader title="Events" intro="Everything happening across the fest." />

<Section>
	<h2 class="sr-only">Event list</h2>
	<div class="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
		{#each categories as category (category)}
			<button
				class="rounded-full border px-4 py-1.5 text-sm transition-colors {active === category
					? 'border-brand bg-brand text-ink'
					: 'border-line text-muted hover:text-paper'}"
				aria-pressed={active === category}
				onclick={() => (active = category)}
			>
				{category}
			</button>
		{/each}
	</div>

	<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each shown as event, i (event.slug)}
			<div animate:flip={{ duration }} transition:fade={{ duration }}>
				<EventCard {event} index={i} />
			</div>
		{/each}
	</div>
</Section>
