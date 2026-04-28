import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

const VENDOR_CHUNKS: Record<string, string[]> = {
  'vendor-maplibre': ['maplibre-gl'],
  'vendor-framer-motion': ['framer-motion'],
  'vendor-ui': ['flowbite-react', 'flowbite', 'clsx'],
  'vendor-react': ['react', 'react-dom', 'react-router-dom'],
  'vendor-state': ['zustand', 'zod'],
}

// Pre-build a lookup map: package name -> chunk name
const PKG_TO_CHUNK = new Map<string, string>(
  Object.entries(VENDOR_CHUNKS).flatMap(([chunk, pkgs]) => pkgs.map((pkg) => [pkg, chunk])),
)

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@/pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@/app': fileURLToPath(new URL('./src/app', import.meta.url)),
      '@/processes': fileURLToPath(new URL('./src/processes', import.meta.url)),
      '@/widgets': fileURLToPath(new URL('./src/widgets', import.meta.url)),
      '@/features': fileURLToPath(new URL('./src/features', import.meta.url)),
      '@/entities': fileURLToPath(new URL('./src/entities', import.meta.url)),
      '@/shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
      '@/lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          for (const [pkg, chunk] of PKG_TO_CHUNK) {
            if (id.includes(`/node_modules/${pkg}/`) || id.includes(`/node_modules/.pnpm/${pkg}`)) {
              return chunk
            }
          }
          return undefined
        },
      },
    },
  },
})
