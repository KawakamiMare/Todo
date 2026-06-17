import { create, findAll, remove, update } from "../../repositories/todo.js";
import type { Todo, TodoInput } from "../types/todo.js";


export function createTodo(input: TodoInput) {
    const now = new Date().toISOString()

    const row = {
        title: input.title,
        progress: 'TODO' as const,
        description: input.description ?? null,
        deadline: input.deadline ?? null,
        priority: input.priority ?? null,
        createdAt: now,
        updatedAt: now,
    }

    const [created] = create(row) // 先頭一件を取得する文法。create(data)は配列を返すから
    return created
}

// フロント (todoService)はgetAll(): Promise<Todo[]>となっているからTodo[]を返す
export function getAllTodos() {
    return findAll();
}

export function updateTodo(id: Todo["id"], body: Todo) {
    const now = new Date().toISOString()
    const [updated] = update(id, {
        title: body.title,
        progress: body.progress,
        description: body.description ?? null,
        deadline: body.deadline ?? null,
        priority: body.priority ?? null,
        updatedAt: now,
    })
    return updated;
}

export function deleteTodo(id: Todo["id"]) {
    const [deleted] = remove(id);
    return deleted;
}