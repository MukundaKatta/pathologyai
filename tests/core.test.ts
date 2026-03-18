import { describe, it, expect } from "vitest";
import { Pathologyai } from "../src/core.js";
describe("Pathologyai", () => {
  it("init", () => { expect(new Pathologyai().getStats().ops).toBe(0); });
  it("op", async () => { const c = new Pathologyai(); await c.process(); expect(c.getStats().ops).toBe(1); });
  it("reset", async () => { const c = new Pathologyai(); await c.process(); c.reset(); expect(c.getStats().ops).toBe(0); });
});
