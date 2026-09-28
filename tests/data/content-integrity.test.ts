import { describe, expect, it } from "vitest";

import * as portfolio from "@/data/portfolio";
import { projects } from "@/data/projects";

const FORBIDDEN_PATTERNS = [/\[add/i, /\btodo\b/i, /placeholder/i, /lorem ipsum/i];

function collectStrings(value: unknown, path: string, out: { path: string; value: string }[]) {
  if (typeof value === "string") {
    out.push({ path, value });
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectStrings(item, `${path}[${index}]`, out));
    return;
  }
  if (value && typeof value === "object") {
    for (const [key, nested] of Object.entries(value)) {
      collectStrings(nested, path ? `${path}.${key}` : key, out);
    }
  }
}

describe("public portfolio content", () => {
  it("never exposes placeholder or TODO text to visitors", () => {
    const strings: { path: string; value: string }[] = [];
    collectStrings(portfolio, "portfolio", strings);
    collectStrings(projects, "projects", strings);

    const offenders = strings.filter(({ value }) =>
      FORBIDDEN_PATTERNS.some((pattern) => pattern.test(value)),
    );

    expect(offenders).toEqual([]);
  });
});
