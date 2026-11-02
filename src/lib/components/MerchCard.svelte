<script lang="ts">
	import { merchImage, type MerchItem } from '#lib/content/merch.ts';
	import { reveal } from '#lib/motion/reveal.ts';

	let { item, index = 0 }: { item: MerchItem; index?: number } = $props();
	const image = $derived(merchImage(item.image));
</script>

<article
	class="overflow-hidden rounded-2xl border border-line bg-surface"
	{@attach reveal({ delay: (index % 3) * 80 })}
>
	<div class="aspect-square overflow-hidden bg-line/40">
		{#if image}
			<enhanced:img
				src={image}
				alt={item.name}
				sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
				loading="lazy"
				class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
			/>
		{:else}
			<div class="grid h-full place-items-center text-sm text-muted">Image coming soon</div>
		{/if}
	</div>
	<div class="p-5">
		<div class="flex items-baseline justify-between gap-4">
			<h3 class="text-lg font-bold">{item.name}</h3>
			<span class="text-muted">{item.price}</span>
		</div>
		<p class="mt-2 text-sm text-muted">{item.description}</p>
	</div>
</article>
