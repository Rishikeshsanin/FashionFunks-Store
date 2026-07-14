import { expect, test } from "@playwright/test";

test("customer can filter and explicitly choose a quick-add size", async ({ page }) => {
  await page.goto("/shop?category=Women");
  await expect(page.getByRole("heading", { level: 1, name: "Women" })).toBeVisible();
  await expect(page).toHaveURL(/category=Women/);
  await page.getByRole("button", { name: "Quick add" }).first().click();
  await expect(page.getByText("Choose a size").first()).toBeVisible();
  await page.locator(".quick-picker .size-grid button").first().click();
  await page.getByRole("link", { name: /Shopping bag with 1 item/ }).click();
  await page.waitForURL("**/cart");
  await expect(page.getByRole("heading", { name: /Shopping bag/ })).toBeVisible();
});

test("guest can complete the payment-free checkout", async ({ page }) => {
  await page.goto("/product/oxford-ease-shirt");
  await page.getByRole("button", { name: "S", exact: true }).click();
  await page.getByRole("button", { name: "Add to bag" }).click();
  await page.goto("/checkout");
  await page.getByLabel("Name").fill("Rishi");
  await page.getByPlaceholder("you@example.com").fill("rishi@example.com");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: /Place demo order/ }).click();
  await expect(page.getByRole("heading", { name: /officially/ })).toBeVisible();
  await expect(page.getByText(/no money was charged/i)).toBeVisible();
});

test("mobile navigation exposes every shopping and account route", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"), "mobile breakpoint only");
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("link", { name: /Babies/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "Log in or create an account" })).toBeVisible();
});
