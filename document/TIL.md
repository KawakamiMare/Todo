# 学習ログ (TIL)

## 運用ルール

- **自分 (User)**: 「一言で言うと何か」「どう感じたか」だけを書く。ここが脳に汗をかく場所。これだけ書けばOK。
- **AI (Agent)**: 面倒な「エラー内容」「コードのbefore/after」「用語解説」を書く。（チャットで「今日のContextをTIL形式でまとめて」と指示すればOK）

---

## 2026-01-23 (Sample)

### 🧠 My Insight (自分の言葉で3行以内)

- テンプレートリテラルでシングルクォート(`'`)を使ってしまい、変数が文字のまま送られていた。
- 「400エラーが出たら、まずは自分の送っているデータを疑え」という基準ができた。次はバッククォートの位置を間違えない。

### 🤖 AI Context (事実・詳細)

- **作業**: 編集モーダルのバックエンド連携
- **Error**: `400 Bad Request` / URLが `.../${id}` の文字列のまま送信された。
- **Fix**: TSの文字列埋め込み記法ミス修正。 `'${id}'` → `${id}`
- **Keywords**: Template Literals, HTTP Status 400

---

## 2026-01-XX (Template)

### 🧠 My Insight

<!--
今日「なるほど！」と思ったこと、ハマったポイントを一言で。
例：Controllerにはロジックを書かずServiceに流すだけにする、というのが分かった。
-->

### 🤖 AI Context

- **作業**: 編集モーダルのフォーム化 (Display only -> Editable Form)
- **変更内容**:
  - `EditModal.tsx` に `useState` による状態管理を追加。
  - 各フィールド (`TextField`, `Select`) に `onChange` イベントハンドラを設定。
  - `handleSave` 関数内でバックエンド更新用のデータオブジェクトを作成し、フック (`useTodos`) 経由で送信する処理を実装。
- **Keywords**: Presentational Component vs Container Component, `onChange`, Two-way binding (擬似的), `defaultValue` vs `value`

---

## 2026-01-27

### 🧠 My Insight

- EditModalで入力した内容を保存する処理を実装し、ブラウザリロードでもデータが残ることを確認した。
- 「なぜ子コンポーネントで直接APIを叩かないのか（関心の分離）」や「JavaのServiceでなぜ引数を使うのか（スレッドセーフ）」など、設計の深い部分を理解できた。

### 🤖 AI Context

- **作業**: 編集モーダルの保存処理実装 & データフロー全体のコードリーディング
- **実装内容**:
  - `EditModal.tsx`: スプレッド構文 `{...todo}` を使用して元データと変更差分をマージする `handleSave` を実装。
  - **型安全性**: 空文字 `""` が `PriorityType` に適合しない問題を、三項演算子で `undefined` に変換することで解決。
  - `App.tsx`: `EditModal` の `onSave` プロップスに、`useTodos` フックの `updateTodo` を呼び出す関数を渡す「バケツリレー」を構築。
- **学習項目**:
  - **Props & Callbacks**: `onSave` を「親から渡されたリモコン（コールバック関数）」として理解。
  - **Spread Syntax**: オブジェクトに対するスプレッド構文 `{...obj}` と配列に対する構文 `[...arr]` の違い。
  - **Backend Architecture**: Controller（窓口）と Service（職人）の役割分担、およびServiceがステートレス（引数ベース）である理由（競合状態の回避）。
- **検証**: ブラウザリロードによる永続化確認、Networkタブでの Payload/Response 確認。
