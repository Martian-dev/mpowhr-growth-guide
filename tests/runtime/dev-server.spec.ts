import { expect, test } from "@playwright/test";

test("full development server renders the workshop and opens registration", async ({
  page,
}) => {
  const moduleFailures: string[] = [];
  page.on("response", (response) => {
    if (
      response.status() >= 400 &&
      /\.(?:ts|tsx|js)(?:\?|$)/.test(response.url())
    ) {
      moduleFailures.push(`${response.status()} ${response.url()}`);
    }
  });
  await page.goto("/posh");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "POSH ISN’T JUST AN HR MATTER.",
  );
  expect(moduleFailures).toEqual([]);
  await page
    .getByRole("link", { name: "Secure your seat", exact: true })
    .filter({ visible: true })
    .first()
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator("#primary-name")).toBeVisible();
  await expect(page.getByRole("alert")).toHaveCount(0);
});
