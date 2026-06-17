import { Hono } from 'hono';
import { createTodo, getAllTodos, updateTodo, deleteTodo } from '../service/todo.js';
import type { Todo, TodoInput } from '../types/todo.js';

const todoRoutes = new Hono();

todoRoutes.get('/', (c) => {
    return c.json(getAllTodos())
})

todoRoutes.post('/', async (c) => {
    const body = await c.req.json<TodoInput>();
    // c.reqはリクエストの情報(postメソッド、/api/todoみたいなパス, Content-Type: application/json, body{"title": "できたのかなあ"})。
    // c.req.json()はそのリクエストのbodyであるjsonをJSのオブジェクト形式に変換している。それはTS上では<TodoInput>だよって教えてる

    const created = createTodo(body); // TodoInput型のオブジェクトだからcreatedTodoの引数に入れられる

    return c.json(created, 201)
    // c.jsonは、オブジェクトとして作られたcreatedを、json文字列にしてレスポンスとして返す。
    // c.req.json()はjson -> オブジェクトに変換　　,　　　c.json()はオブジェクト -> jsonに変換
}
)

todoRoutes.put('/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const body = await c.req.json<Todo>(); // 変更前のTodoを受け取る。一度登録されたものだから<TodoInput>じゃなく<Todo>
    const updated = updateTodo(id, body);
    if (!updated) {
        return c.json({ message: `Todo not found: ${id}` }, 404);
    }
    return c.json(updated, 200)
})

todoRoutes.delete('/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const deleted = deleteTodo(id);
    if (!deleted) {
        return c.json({ messege: `Todo not found: ${id}` }, 404)
    }
    return c.json({ ok: true }, 200);
})

export default todoRoutes

