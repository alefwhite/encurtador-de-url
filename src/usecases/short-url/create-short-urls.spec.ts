import { afterEach, beforeEach, describe, expect, it } from "vitest"
import sinon from "sinon"
import { InMemoryShortUrlsRepository } from "@/repositories/in-memory/in-memory-short-urls-repository"
import { CreateShortUrlUseCase } from "@/usecases/short-url/create-short-urls"
import { CreateShortUrl } from "@/dtos/short-urls"
import { ShortUrl } from "@/entities/short-url"
import { InvalidURLError } from "@/usecases/errors/invalid-url"
import * as generateIdentifier from "@/utils/generate-identifier"
import * as createUrl from "@/utils/create-url" // Importe o módulo completo

let shortUrlsRepository: InMemoryShortUrlsRepository
let sut: CreateShortUrlUseCase

describe("Create Short Urls Use Case", () => {
  beforeEach(() => {
    shortUrlsRepository = new InMemoryShortUrlsRepository()
    sut = new CreateShortUrlUseCase(shortUrlsRepository)
  })
  afterEach(() => {
    sinon.restore()
  })
  it("should be able a create short url", async () => {
    const user_id = "123"
    const input: CreateShortUrl = {
      original_url: "https://www.google.com",
      user_id,
    }
    const { short_url } = await sut.execute(input)
    expect(short_url).toEqual(expect.any(String))
  })
  it("should be able a create short url if exists a short code", async () => {
    const shortUrlsRepository = new InMemoryShortUrlsRepository()
    const sut = new CreateShortUrlUseCase(shortUrlsRepository)
    const short_code = "abcdefg"
    await shortUrlsRepository.create(
      ShortUrl.create({
        original_url: "https://www.google.com",
        user_id: "123",
        short_code,
        click_count: 0,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      }),
    )
    const user_id = "123"
    const input: CreateShortUrl = {
      original_url: "https://www.google.com",
      user_id,
    }
    sinon.stub(generateIdentifier, "generateIdentifier").returns("abcdefg")
    const { short_url } = await sut.execute(input)
    expect(short_url).toEqual(expect.any(String))
  })
  it.skip("should not be able a create invalid url", async () => {
    const user_id = "123"
    const input: CreateShortUrl = {
      original_url: "https://www.google.com",
      user_id,
    }
    sinon.stub(createUrl, "createUrl").returns("abcdefg")

    // vi.stubGlobal(
    //   "createUrl",
    //   vi.fn(() => ""),
    // )
    await expect(() => {
      sut.execute(input)
    }).rejects.toBeInstanceOf(InvalidURLError)
  })
})
