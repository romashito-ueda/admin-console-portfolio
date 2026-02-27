import { expect, test } from '@playwright/test';

test('users list search and navigate detail', async ({ page }) => {
  await page.goto('/users');

  await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible();
  await page.getByPlaceholder('Search users').fill('user 2');
  await page.getByRole('button', { name: 'Search' }).click();

  await expect(page).toHaveURL(/q=user%202/);

  await page.getByRole('link', { name: 'User 2' }).first().click();
  await expect(page).toHaveURL(/\/users\/2$/);
  await expect(page.getByText('user2@example.com')).toBeVisible();
});
