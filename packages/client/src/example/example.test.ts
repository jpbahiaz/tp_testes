import { describe, expect, it } from "vitest";
import { add } from "../shared/functions/math";

describe("Example Test Suite", () => {
  it("Should work", () => {
    expect(add(1, 1)).toEqual(2);
  });
});
