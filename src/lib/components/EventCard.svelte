<script lang="ts">
	import type { FestEvent } from '#lib/content/events.ts';
	import { reveal } from '#lib/motion/reveal.ts';

	let { event, index = 0 }: { event: FestEvent; index?: number } = $props();
</script>

<article
	class="group rounded-2xl border border-line bg-surface p-6 transition-transform duration-300 hover:-translate-y-1"
	{@attach reveal({ delay: (index % 3) * 80 })}
>
	<div class="flex items-center justify-between text-xs tracking-widest text-muted uppercase">
		<span>{event.category}</span>
		<span>Day {event.day} · {event.time}</span>
	</div>
	<h3 class="mt-4 text-2xl font-bold">{event.title}</h3>
	<p class="mt-2 text-muted">{event.description}</p>
	<p class="mt-4 text-sm text-muted">{event.venue}</p>
	{#if event.registerUrl}
		<!-- External link, so resolve() does not apply. -->
		<!-- eslint-disable svelte/no-navigation-without-resolve -->
		<a
			href={event.registerUrl}
			rel="noopener"
			target="_blank"
			class="mt-6 inline-block rounded-full bg-brand px-4 py-2 text-sm font-semibold text-ink"
		>
			Register
		</a>
		<!-- eslint-enable svelte/no-navigation-without-resolve -->
	{/if}
</article>
