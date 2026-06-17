import { Hono } from 'hono'
import todoRoutes from './routes/todo.js'
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';


const app = new Hono()

app.use('*', cors({
  origin: 'https://localhost:3000',
}))

// 子ルータ-(todoRoutes)を親アプリの/api/todoの下に取り付けるtodoRoutesに '/'と書くと '/api/todo'が頭につく
// controllerに書いてた@RequestMapping("/api/todo")がこれ↓
app.route('/api/todo', todoRoutes);


serve({
  fetch: app.fetch,
  port: 8000
}, (info) => {
  console.log(`サーバーがhttps://localhost:${info.port} で開かれています`)
})