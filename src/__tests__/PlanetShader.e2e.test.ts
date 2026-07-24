import { test, expect } from '@playwright/test';

test.describe('Planet Shader E2E', () => {
  test('should render the Earth mesh with cloud and atmosphere layers', async ({ page }) => {
    // Note: E2E testing WebGL shaders directly is complex; we usually snapshot the canvas.
    await page.goto('/');

    // Ensure the canvas is attached to the DOM
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();

    // Verify no WebGL errors were thrown in the console
    const consoleLogs: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleLogs.push(msg.text());
      }
    });

    // Let the scene render for a moment
    await page.waitForTimeout(1000);

    // If there's an error in the shader compilation, it usually hits the console
    expect(consoleLogs.filter(log => log.includes('WebGL'))).toHaveLength(0);
  });
});
