import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { Buffer } from 'buffer'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    define: {
      'process.env': {}, // avoids undefined error
      'process.env.SOME_KEY': JSON.stringify(env.SOME_KEY), // optional
      'global': {}, // required if Buffer or crypto-polyfills are needed
    },
    plugins: [react()],
    resolve: {
      alias: {
        buffer: 'buffer', // enable Buffer import
      },
    },
    optimizeDeps: {
      include: ['buffer'], // make sure buffer is included in the build
    },
  }
})
