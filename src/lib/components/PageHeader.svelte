<script lang="ts">
	import { reveal } from '#lib/motion/reveal.ts';

	let { title, intro }: { title: string; intro?: string } = $props();
</script>

<header class="mx-auto max-w-6xl px-4 pt-16 pb-10 sm:px-6 sm:pt-24">
	<h1 class="font-display text-4xl font-black tracking-tight sm:text-6xl" {@attach reveal()}>
		{title}
	</h1>
	{#if intro}
		<p class="mt-4 max-w-2xl text-lg text-muted" {@attach reveal({ delay: 100 })}>{intro}</p>
	{/if}
</header>
