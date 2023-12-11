import { test, expect } from '@playwright/test';

test('should have error when email is not valid', async ({ page }) => {
	await page.goto('/contact');
	await page.locator('#contact').fill('Hello');
	await page.getByRole('button', { name: 'envoyer' }).click();

	const errorMessage = await page.getByText('Invalid email');
	await expect(errorMessage).toBeVisible();
	await expect(errorMessage).toHaveCSS('color', 'rgb(255, 0, 0)');
});

test('should have error when title is not long enough', async ({ page }) => {
	await page.goto('/contact');
	await page.locator('#title').fill('Ho ho ho');
	await page.getByRole('button', { name: 'envoyer' }).click();

	const errorMessages = await page.getByText('String must contain at least');
	await expect(errorMessages).toHaveCount(2);
	await expect(errorMessages.first()).toHaveCSS('color', 'rgb(255, 0, 0)');
});

test('should have error when content is not long enough', async ({ page }) => {
	await page.goto('/contact');
	await page.locator('#content').fill('Hello!');
	await page.getByRole('button', { name: 'envoyer' }).click();

	const errorMessages = await page.getByText('String must contain at least');
	await expect(errorMessages).toHaveCount(2);
	await expect(errorMessages.last()).toHaveCSS('color', 'rgb(255, 0, 0)');
});

test('should able to send email succesfully', async ({ page }) => {
	await page.goto('/contact');
	await page.locator('#contact').fill('hello@test.fr');
	await page.locator('#title').fill('Ho Ho Ho !!!');
	await page.locator('#content').fill('Hello there!');
	await page.getByRole('button', { name: 'envoyer' }).click();

	await expect(page.getByText('Message envoyé avec succès')).toBeVisible();
});
