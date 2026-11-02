<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, class: className = '' }: { children: Snippet; class?: string } = $props();
</script>

<section class="mx-auto max-w-6xl px-4 sm:px-6 {className}">
	{@render children()}
</section>
