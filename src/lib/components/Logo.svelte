<script lang="ts">
	// Placeholder wordmark. Replace the markup with the real logo SVG once it arrives;
	// keep it inline so it can be animated and needs no extra request.
	let { class: className = '' }: { class?: string } = $props();
</script>

<span class="font-display font-black tracking-tight {className}" aria-label="Tesellate">
	tesellate<span class="text-brand">.</span>
</span>
