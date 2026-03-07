import { expect, test } from "@playwright/test";

test("navigation works across core pages", async ({ page }) => {
  await page.goto("/");
  const nav = page.locator("header nav");

  await nav.getByRole("link", { name: "Projects", exact: true }).click();
  await expect(page).toHaveURL(/\/projects$/);

  await nav.getByRole("link", { name: "Experience", exact: true }).click();
  await expect(page).toHaveURL(/\/experience$/);

  await nav.getByRole("link", { name: "Contact", exact: true }).click();
  await expect(page).toHaveURL(/\/contact$/);
});

test("project filtering and project detail links are visible", async ({ page }) => {
  await page.goto("/projects");
  await page.getByRole("button", { name: "React" }).click();

  const cards = page.getByTestId("project-card");
  await expect(cards.first()).toBeVisible();
  await expect(page.getByRole("link", { name: "View details" }).first()).toBeVisible();
});

// Temporarily skipped: relies on /api/contact submission behavior and mail-delivery flow
// that is not finalized until backend/contact API implementation is complete.
test.skip("contact form success and validation error", async ({ page }) => {
  await page.goto("/contact");

  await page.getByPlaceholder("Your name").fill("Harsha");
  await page.getByPlaceholder("you@example.com").fill("harsha@example.com");
  await page
    .getByPlaceholder("How can I help?")
    .fill("I want to discuss a software engineering opportunity and timeline.");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByTestId("contact-status")).toContainText("Message sent successfully");

  await page.getByPlaceholder("Your name").fill("H");
  await page.getByPlaceholder("you@example.com").fill("invalid-email");
  await page.getByPlaceholder("How can I help?").fill("short");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByTestId("contact-status")).toContainText("valid name");
});
