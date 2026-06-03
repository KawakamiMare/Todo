import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/todo', (c) => {
  return c.json([
    {
      id: 1,
      title: 'テスト',
      progress: 'TODO',
      description: '',
      deadline: "再起動しなくて良いの？",
      priority: null,
      createdAt: '2026-03-05T22:12:20.333111',
      updatedAt: '2026-03-05T22:12:20.333111',
    }
  ])
})

serve({
  fetch: app.fetch,
  port: 8000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
