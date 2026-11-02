<script lang="ts">
	import { site } from '#lib/content/site.ts';
	import Logo from './Logo.svelte';
</script>

<footer class="mt-24 border-t border-line">
	<div
		class="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6"
	>
		<div>
			<Logo class="text-lg text-paper" />
			<p class="mt-1">{site.venue}</p>
		</div>
		<div class="flex gap-4">
			{#if site.instagram.handle}
				<a
					class="hover:text-paper"
					href="https://www.instagram.com/{site.instagram.handle}/"
					rel="noopener"
					target="_blank">Instagram</a
				>
			{/if}
			{#if site.email}
				<a class="hover:text-paper" href="mailto:{site.email}">{site.email}</a>
			{/if}
		</div>
	</div>
</footer>
