<script lang="ts">
	import { resolve } from '$app/paths';
	import { site } from '#lib/content/site.ts';
	import { gsapAnimate } from '#lib/motion/gsap.ts';
	import Logo from './Logo.svelte';

	// The entrance animation is pure CSS so the headline paints immediately
	// (no waiting on JavaScript). GSAP only drives the scroll parallax of the
	// tessellation background, and it is loaded after the page is interactive.
	const parallax = gsapAnimate(({ gsap }, node) => {
		const layers = node.querySelectorAll<HTMLElement>('[data-depth]');
		layers.forEach((layer) => {
			const depth = Number(layer.dataset.depth);
			gsap.to(layer, {
				yPercent: depth * 30,
				rotate: depth * 8,
				ease: 'none',
				scrollTrigger: { trigger: node, start: 'top top', end: 'bottom top', scrub: true }
			});
		});
	});
</script>

<section
	class="relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden"
	{@attach parallax}
>
	<div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
		<svg class="absolute -inset-1/4 h-[150%] w-[150%] opacity-25" data-depth="1">
			<defs>
				<pattern id="tess-a" width="80" height="138.56" patternUnits="userSpaceOnUse">
					<path
						d="M0 0 L40 69.28 L80 0 Z M40 69.28 L0 138.56 L80 138.56 Z"
						fill="none"
						stroke="var(--color-brand)"
						stroke-width="1"
					/>
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill="url(#tess-a)" />
		</svg>
		<div
			class="absolute top-1/4 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-brand/30 blur-3xl"
			data-depth="0.6"
		></div>
		<div
			class="absolute right-0 bottom-0 h-[28rem] w-[28rem] rounded-full bg-brand-2/20 blur-3xl"
			data-depth="1.4"
		></div>
	</div>

	<div class="mx-auto w-full max-w-6xl px-4 sm:px-6">
		<p class="hero-in text-sm tracking-[0.3em] text-muted uppercase" style="--i: 0">
			{site.dates}
		</p>
		<h1 class="hero-in mt-4 text-6xl leading-none sm:text-8xl lg:text-9xl" style="--i: 1">
			<Logo />
		</h1>
		<p class="hero-in mt-6 max-w-xl text-lg text-muted sm:text-xl" style="--i: 2">
			{site.tagline}
		</p>
		<div class="hero-in mt-10 flex flex-wrap gap-3" style="--i: 3">
			<a
				href={resolve('/events')}
				class="rounded-full bg-brand px-6 py-3 font-semibold text-ink transition-transform hover:scale-105"
			>
				See events
			</a>
			<a
				href={resolve('/about')}
				class="rounded-full border border-line px-6 py-3 font-semibold transition-colors hover:border-paper"
			>
				About the fest
			</a>
		</div>
	</div>
</section>

<style>
	.hero-in {
		animation: hero-in 0.9s var(--ease-out-expo) both;
		animation-delay: calc(var(--i) * 90ms);
	}

	@keyframes hero-in {
		from {
			opacity: 0;
			transform: translateY(2rem);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-in {
			animation: none;
		}
	}
</style>
