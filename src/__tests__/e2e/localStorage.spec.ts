import { test, expect } from "@playwright/test"

test.describe("Local Storage Cache E2E", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto("http://localhost:3000")
  })

  test("persists claimed asteroids in local storage", async ({ page }) => {
    // Find an asteroid and claim it
    const claimButton = page.getByRole("button", { name: /File Mining Claim/i })
    
    if (await claimButton.count() > 0) {
      await claimButton.first().click()
      
      // Wait for it to reflect as claimed
      await expect(claimButton.first()).toHaveText(/Release Mining Claim/i)
      
      // Verify local storage is updated
      const claimedState = await page.evaluate(() => {
        return window.localStorage.getItem("astrodex_claimed")
      })
      
      expect(claimedState).not.toBeNull()
      
      // Reload page
      await page.reload()
      
      // Verify it's still claimed
      const releaseButton = page.getByRole("button", { name: /Release Mining Claim/i })
      await expect(releaseButton.first()).toBeVisible()
    }
  })

  test("persists user preferences", async ({ page }) => {
    // Toggle the left sidebar
    const toggleButton = page.getByTitle(/Show Target Panel/i)
    
    if (await toggleButton.count() > 0) {
      await toggleButton.first().click()
      
      const uiState = await page.evaluate(() => {
        return window.localStorage.getItem("astrodex_ui_state")
      })
      
      expect(uiState).toContain("leftSidebarOpen")
    }
  })
})
