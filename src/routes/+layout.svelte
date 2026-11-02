<script lang="ts">
	import './layout.css';
	import { onNavigate } from '$app/navigation';
	import Nav from '#lib/components/Nav.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import { site } from '#lib/content/site.ts';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	// Cross-fade between pages where the browser supports View Transitions.
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<meta name="description" content="{site.name}: {site.tagline}" />
	<meta name="theme-color" content="#0d0b14" />
	<link rel="icon" href="data:," />
</svelte:head>

<a
	href="#main"
	class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-paper focus:px-3 focus:py-2 focus:text-ink"
>
	Skip to content
</a>

<Nav />
<main id="main">
	{@render children()}
</main>
<Footer />
