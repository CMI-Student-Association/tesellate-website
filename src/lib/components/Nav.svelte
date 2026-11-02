<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { navLinks } from '#lib/content/site.ts';
	import Logo from './Logo.svelte';

	let open = $state(false);

	const isActive = (href: string) =>
		href === '/'
			? page.url.pathname === resolve('/')
			: page.url.pathname.startsWith(resolve(href as '/'));
</script>

<header class="sticky top-0 z-40 border-b border-line/60 bg-ink/80 backdrop-blur">
	<nav class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
		<a href={resolve('/')} class="text-xl" onclick={() => (open = false)}><Logo /></a>

		<button
			class="rounded-md p-2 sm:hidden"
			aria-expanded={open}
			aria-controls="nav-links"
			onclick={() => (open = !open)}
		>
			<span class="sr-only">Menu</span>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				aria-hidden="true"
			>
				{#if open}
					<path d="M6 6l12 12M18 6L6 18" />
				{:else}
					<path d="M4 7h16M4 12h16M4 17h16" />
				{/if}
			</svg>
		</button>

		<ul
			id="nav-links"
			class="absolute inset-x-0 top-full flex-col gap-1 border-b border-line bg-ink px-4 py-3 sm:static sm:flex sm:flex-row sm:border-0 sm:bg-transparent sm:p-0 {open
				? 'flex'
				: 'hidden'}"
		>
			{#each navLinks as link (link.href)}
				<li>
					<a
						href={resolve(link.href)}
						aria-current={isActive(link.href) ? 'page' : undefined}
						onclick={() => (open = false)}
						class="block rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-paper aria-[current=page]:text-paper"
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>
