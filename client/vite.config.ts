import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import svgr from 'vite-plugin-svgr'
import reactJsx from 'vite-react-jsx'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  build: {
    outDir: 'build',
  },
  plugins: [checker({ typescript: true }), tsconfigPaths(), reactJsx(), svgr()],
})
