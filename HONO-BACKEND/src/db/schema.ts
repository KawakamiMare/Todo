import {sql} from 'drizzle-orm';
import {integer, sqliteTable, text} from 'drizzle-orm/sqlite-core';

export const todos = sqliteTable('todos', {
    id: integer().primaryKey({autoIncrement: true}),
    title: text().notNull(),
    progress: text(),
    description: text(),
    deadline: text(),
    priority: text(),
    createdAt: text().notNull(),
    updatedAt: text().notNull()
})