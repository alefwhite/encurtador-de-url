import { defineConfig } from "vitest/config"
import tsConfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    dir: "./src", // Essa linha
    coverage: {
      include: ["src/usecases/**/*.ts", "src/test/**/*.ts"],
    },
  },
})
