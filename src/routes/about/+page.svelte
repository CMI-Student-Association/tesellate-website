<script lang="ts">
	import PageHeader from '#lib/components/PageHeader.svelte';
	import Section from '#lib/components/Section.svelte';
	import { site } from '#lib/content/site.ts';
	import { reveal } from '#lib/motion/reveal.ts';
</script>

<svelte:head>
	<title>About · {site.name}</title>
</svelte:head>

<PageHeader
	title="About us"
	intro="Placeholder text. Describe the fest, its history and the people behind it."
/>

<Section>
	<div class="grid gap-10 md:grid-cols-2">
		<div class="space-y-4 text-lg text-muted" {@attach reveal()}>
			<p>Placeholder paragraph about what {site.name} is and who it is for.</p>
			<p>Placeholder paragraph about the organising team.</p>
		</div>
		<dl class="grid grid-cols-2 gap-4" {@attach reveal({ delay: 120 })}>
			{#each [['Days', '—'], ['Events', '—'], ['Participants', '—'], ['Editions', '—']] as [label, value] (label)}
				<div class="rounded-2xl border border-line bg-surface p-6">
					<dt class="text-sm text-muted">{label}</dt>
					<dd class="mt-2 text-4xl font-black">{value}</dd>
				</div>
			{/each}
		</dl>
	</div>
</Section>
