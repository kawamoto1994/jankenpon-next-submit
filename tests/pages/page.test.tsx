import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Home from "@/app/page";

test("トップページのタイトルが表示される", () => {
  render(<Home />);

  expect(
    screen.getByRole("heading", { level: 1, name: "じゃんけんぽん" }),
  ).toBeDefined();
});
