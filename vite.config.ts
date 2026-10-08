import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression'
import { gzip } from 'node:zlib'
import { promisify } from 'node:util'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

const gzipAsync = promisify(gzip)

const OUT_DIR = 'dist/personal-website'

// GitHub Pages 没有 SPA 回退机制，刷新/直链子路由会 404。
// 利用其"404 时返回站点根目录 404.html"的约定，把 index.html 复制为 404.html，
// 页面加载后由 vue-router 接管，URL 保持不变。
function spaFallback() {
  return {
    name: 'spa-fallback',
    apply: 'build' as const,
    closeBundle() {
      const out = resolve(process.cwd(), OUT_DIR)
      copyFileSync(resolve(out, 'index.html'), resolve(out, '404.html'))
      console.log('✨ [spa-fallback] - generated 404.html for GitHub Pages SPA fallback')
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 项目页部署在子路径下（https://<user>.github.io/personal-website/）
  base: '/personal-website/',
  plugins: [
    vue(),
    spaFallback(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver({
        importStyle: 'sass',
      })],
    }),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    {
      name: 'manual-gzip',
      apply: 'build',
      async generateBundle(_options, bundle) {
        const files = Object.keys(bundle).filter(key =>
          /\.(js|mjs|json|css|html)$/i.test(key)
        )
        for (const file of files) {
          const chunk = bundle[file] as any
          const content = chunk.type === 'asset' ? chunk.source : chunk.code

          if (!content || content.length < 10240) continue

          try {
            const result = await gzipAsync(Buffer.from(content))
            this.emitFile({
              type: 'asset',
              fileName: file + '.gz',
              source: result
            })
            console.log(`✨ [manual-gzip] - compressed file successfully: ${file}.gz`)
          } catch (e) {
            console.error(e)
          }
        }
      }
    },
  ],
  build: {
    outDir: OUT_DIR,
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && /\.(css|scss|sass)$/.test(assetInfo.name)) {
            return 'assets/css/[name]-[hash][extname]'
          }
          if (assetInfo.name && /\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name)) {
            return 'assets/img/[name]-[hash][extname]'
          }
          if (assetInfo.name && /\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
            return 'assets/fonts/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        },
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('element-plus')) {
              return 'element-plus'
            }
            if (id.includes('@element-plus')) {
              return 'element-plus-icons'
            }
            if (id.includes('vue') || id.includes('vue-router')) {
              return 'vue-vendor'
            }
            if (id.includes('marked')) {
              return 'marked'
            }
            return 'vendor'
          }
        },
      },
    },
    chunkSizeWarningLimit: 1500,
  },
  css: {
    preprocessorOptions: {
      scss: {
        // api: 'modern-compiler', // Removed to fix type error
      },
    },
  },
})
