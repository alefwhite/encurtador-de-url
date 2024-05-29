import { describe, expect, it } from "vitest"
import { generateIdentifier } from "@/utils/generate-identifier"

describe("Create Short Urls Use Case", () => {
  it("should be able a short url", async () => {
    const LENGTH_IDENTIFIER = 6
    const identifier = generateIdentifier(LENGTH_IDENTIFIER)
    expect(identifier.length).toEqual(LENGTH_IDENTIFIER)
  })
})
