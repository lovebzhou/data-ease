import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  const isBuild = command === 'build'
  const viteEnv = loadEnv(mode, process.cwd())
  const {VITE_HTTP_SERVER_PORT = 3000, VITE_PUBLIC_PATH, VITE_PROXY_TARGET} = viteEnv

  console.debug('#viteEnv#', viteEnv)

  return {
    base: VITE_PUBLIC_PATH,
    plugins: [react()],
    build: {
      minify: isBuild,
    },
    server: {
      port: VITE_HTTP_SERVER_PORT,
      proxy: {
        '/api': {
          target: VITE_PROXY_TARGET,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp('^/api'), ''),
          configure: (proxy, options) => {
            // 配置此项可在响应头中看到请求的真实地址
            proxy.on('proxyRes', (proxyRes, req) => {
              proxyRes.headers['x-real-url'] = new URL(req.url || '', options.target)?.href || ''
            })
          },
        },
      },
    },
  }
})
