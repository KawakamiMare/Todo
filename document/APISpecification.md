# Todo API 仕様書

- ベースURL: `/api/todo`
- Content-Type: `application/json`
- CORS: `https://localhost:3000` からのアクセスを許可（`TodoController` の `@CrossOrigin`）
- 参照: `JAVA/.../TodoController.java`, `JAVA/.../model/Todo.java`, `TYPESCRIPT/src/types/todo.ts`

---

## 共通: Todo（1件の形）

```json
{
  "id": number,
  "title": string,
  "progress": "TODO" | "IN_PROGRESS" | "ALMOST_DONE" | "DONE" | "STOPPING",
  "description": string,
  "deadline": string | null,
  "priority": "A" | "B" | "C" | null,
  "createdAt": string,
  "updatedAt": string
}
```

- 日付フィールド（`deadline`, `createdAt`, `updatedAt`）は JSON 上では ISO 8601 形式の **string**
- `deadline` / `priority` は未設定の場合 **null** になりうる
- `description` は空文字 `""` になりうる

---

### GET /api/todo

- 説明: Todo を全件取得
- Request Headers: なし
- Request Body: なし
- Response 200: `Todo[]`

#### Response 例

```json

```

---

### GET /api/todo/:id

- 説明: 指定 id の Todo を1件取得
- Request Headers: なし
- Request Body: なし
- Path Parameters:
  - `id`: number（必須）
- Response 200: `Todo`（1件）
- Response 404: Todo が存在しない場合（`Todo not found: {id}`）

#### Response 例

```json

```

- 備考: フロントの `todoService.ts` では現在未使用。バックエンドのみ実装あり。

---

### POST /api/todo

- 説明: Todo を1件作成
- Request Headers: `Content-Type: application/json`
- Request Body:

```json
{
  "title": string (必須),
  "progress": "TODO" | "IN_PROGRESS" | "ALMOST_DONE" | "DONE" | "STOPPING" (任意),
  "description": string (任意),
  "deadline": string (任意, ISO形式),
  "priority": "A" | "B" | "C" (任意)
}
```

- Response 200: `Todo`（1件。`id`, `createdAt`, `updatedAt` はサーバー側で付与）
- 備考:
  - サーバー側（`TodoService.create`）で `progress` は常に `"TODO"` に上書きされる
  - フロントは `id`, `createdAt`, `updatedAt` を送らない
  - `title` は `@NotBlank` により空文字はバリデーションエラーになりうる

#### Request 例

```json

```

#### Response 例

```json

```

---

### PUT /api/todo/:id

- 説明: 指定 id の Todo を更新
- Request Headers: `Content-Type: application/json`
- Path Parameters:
  - `id`: number（必須）
- Request Body:

```json
{
  "id": number,
  "title": string,
  "progress": "TODO" | "IN_PROGRESS" | "ALMOST_DONE" | "DONE" | "STOPPING",
  "description": string,
  "deadline": string | null,
  "priority": "A" | "B" | "C" | null,
  "createdAt": string,
  "updatedAt": string
}
```

- Response 200: 更新後の `Todo`（1件）
- Response 404: Todo が存在しない場合（`Todo not found: {id}`）

#### Request 例

```json

```

#### Response 例

```json

```

---

### DELETE /api/todo/:id

- 説明: 指定 id の Todo を削除
- Request Headers: なし
- Request Body: なし
- Path Parameters:
  - `id`: number（必須）
- Response 200: body なし（`void`）
- 備考: フロントの `todoService.delete` はレスポンス body を使用しない

#### Response 例

```json

```

---

## エンドポイント一覧

| メソッド | パス | 説明 | フロント使用 |
|---------|------|------|-------------|
| GET | `/api/todo` | 全件取得 | 使用 |
| GET | `/api/todo/:id` | 1件取得 | 未使用 |
| POST | `/api/todo` | 作成 | 使用 |
| PUT | `/api/todo/:id` | 更新 | 使用 |
| DELETE | `/api/todo/:id` | 削除 | 使用 |
