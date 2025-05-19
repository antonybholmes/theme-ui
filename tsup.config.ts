// tsup.config.ts
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/**/*.ts', 'src/**/*.tsx'],
  outDir: 'dist', // ✅ separate from "src"
  dts: true,
  format: ['esm'],
  clean: true,
  splitting: false,

  //   esbuildOptions(options) {
  //     options.alias = {
  //       '@': './src',
  //     }
  //   },
})
