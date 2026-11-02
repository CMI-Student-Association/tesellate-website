<script lang="ts">
	import { resolve } from '$app/paths';
	import Hero from '#lib/components/Hero.svelte';
	import Section from '#lib/components/Section.svelte';
	import EventCard from '#lib/components/EventCard.svelte';
	import { events } from '#lib/content/events.ts';
	import { site } from '#lib/content/site.ts';
	import { reveal } from '#lib/motion/reveal.ts';
</script>

<svelte:head>
	<title>{site.name}</title>
</svelte:head>

<Hero />

<Section class="mt-24">
	<div class="flex items-end justify-between gap-4" {@attach reveal()}>
		<h2 class="font-display text-3xl font-black sm:text-5xl">Highlights</h2>
		<a href={resolve('/events')} class="text-sm text-muted hover:text-paper">All events →</a>
	</div>
	<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each events.slice(0, 3) as event, i (event.slug)}
			<EventCard {event} index={i} />
		{/each}
	</div>
</Section>
