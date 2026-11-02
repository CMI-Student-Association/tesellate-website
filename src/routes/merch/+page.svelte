<script lang="ts">
	import PageHeader from '#lib/components/PageHeader.svelte';
	import Section from '#lib/components/Section.svelte';
	import MerchCard from '#lib/components/MerchCard.svelte';
	import { merch } from '#lib/content/merch.ts';
	import { site } from '#lib/content/site.ts';
</script>

<svelte:head>
	<title>Merch · {site.name}</title>
</svelte:head>

<PageHeader
	title="Merch"
	intro="Official fest merchandise. Details on how to order will be announced."
/>

<Section>
	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each merch as item, i (item.name)}
			<MerchCard {item} index={i} />
		{/each}
	</div>
</Section>
