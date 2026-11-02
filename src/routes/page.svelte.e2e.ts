import { expect, test } from '@playwright/test';

const pages = ['/', '/about', '/events', '/gallery', '/merch'];

for (const path of pages) {
	test(`${path} renders a heading`, async ({ page }) => {
		await page.goto(path);
		await expect(page.locator('h1').first()).toBeVisible();
	});
}

test('navigation reaches every page', async ({ page }) => {
	await page.goto('/');
	await page.waitForLoadState('networkidle');
	await page.setViewportSize({ width: 1280, height: 800 });
	for (const label of ['About', 'Events', 'Gallery', 'Merch']) {
		await page.getByRole('navigation').getByRole('link', { name: label }).click();
		await expect(page).toHaveURL(new RegExp(label.toLowerCase()));
	}
});

test('event filter narrows the list', async ({ page }) => {
	await page.goto('/events');
	// The filter only works after hydration, so wait for the JS to finish loading.
	await page.waitForLoadState('networkidle');
	await page.getByRole('button', { name: 'Sports' }).click();
	await expect(page.getByRole('heading', { level: 3 })).toHaveCount(1);
});
