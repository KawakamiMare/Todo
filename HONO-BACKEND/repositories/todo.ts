import { eq } from "drizzle-orm";
import { db } from "../src/db/index.js";
import { todos } from "../src/db/schema.js";

export function findAll() {
    return db.select().from(todos).all();
}

export function create(data: {
    title: string
    progress: string
    description?: string | null
    deadline?: string | null
    priority?: string | null
    createdAt: string
    updatedAt: string
}) {
    return db.insert(todos).values(data).returning().all()
    // returning()　「挿入した行を返して」と SQL に追記
    // all()　SQLを実行し、返された行を配列で取得（1行挿入されても複数行でも）
}

export function update(
    id: number,
    patch: {
        title: string
        progress?: string
        description?: string | null
        deadline?: string | null
        priority?: string | null
        updatedAt: string
    }) {
    return db.update(todos).set(patch).where(eq(todos.id, id)).returning().all()
}

export function remove(id: number) {
    return db.delete(todos).where(eq(todos.id, id)).returning().all()
}