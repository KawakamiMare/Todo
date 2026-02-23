import React, { useState } from 'react';

import { useTodos } from './hooks/useTodos';
import EditModal from './EditModal';
import { Button, } from "@mui/material";
import { Todo } from './types/todo';
import { TODO_PRIORITIES } from './constants/todoConstants';
import { INITIAL_TODO_INPUT, TodoInput } from './types/todo';

function App() {
  // フックを呼び出すだけで、取得、ローディング、更新関数が全部手に入る
  const { todos, isLoading, createTodo, deleteTodo, updateTodo } = useTodos();
  const [showEditModal, setShowEditModal] = useState(false);
  const [inputTodo, setInputTodo] = useState<TodoInput>(INITIAL_TODO_INPUT);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const now = new Date().toISOString().split('T')[0];

  if (isLoading)
    return <div>読み込み中... </div>;

  // 追加ボタンの処理
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault(); //←これがないと、送信時（登録ボタン押下時に勝手に画面リロードされてしまう。）
    if (!inputTodo.title.trim()) return;
    //return;は、それ以降のこの関数を実行しない、という意味。
    // つまり空行を除いてタイトルが空だったら、これより下のcreateTodo(サーバーにデータを送る)やsetNewTodo（入力欄を空にする）は実行されない

    createTodo({
      title: inputTodo.title,
      progress: "TODO", // 初期値　つまり、登録時はこの"TODO"決め打ちで選べない
      description: inputTodo.description,
      deadline: inputTodo.deadline === "" ? undefined : inputTodo.deadline,
      priority: inputTodo.priority === undefined ? undefined : (inputTodo.priority as "A" | "B" | "C")
    });
    setInputTodo(INITIAL_TODO_INPUT)
  };

  const handleOpenModal = (todo: Todo) => {
    // 1. 受け取った todo を State (editorTodo) にセットする
    setEditingTodo(todo);
    setShowEditModal(true);
  };
  const handleCloseModal = () => {
    setShowEditModal(false);
  }

  const handleSaveEdit = (updatedTodo: Todo) => {
    updateTodo({ id: updatedTodo.id, todo: updatedTodo });
    handleCloseModal();
  };

  return (

    <div className='APP'>
      <h1>What's Next?</h1>
      <form onSubmit={handleAdd}>
        <input
          value={inputTodo.title}
          onChange={(e) => setInputTodo({ ...inputTodo, title: e.target.value })}
          placeholder='タスクを入力して下さい'
        />
        <input
          value={inputTodo.description}
          onChange={(e) => setInputTodo({ ...inputTodo, description: e.target.value })}
          placeholder='概要を入力してください'
        />
        <input
          value={inputTodo.deadline}
          onChange={(e) => setInputTodo({ ...inputTodo, deadline: e.target.value })}
          type='datetime-local'
          min={now}
        />
        <select
          value={inputTodo.priority}
          onChange={(e) => setInputTodo({ ...inputTodo, priority: e.target.value as TodoInput["priority"] })}
        >
          <option>

          </option>
          {TODO_PRIORITIES.map((p) => (
            <option key={p.label} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>
        <Button type="submit" variant='contained'>登録</Button>
        {/* type="submit"のボタンが押されると、formタグに送信イベントを発火させる */}
      </form>

      <ul>
        {/* ↑<ul>の直下に<li>がないといけない。urは順序のないリスト */}
        {todos.map(todo => (
          // ↓mapの直下のタグではkeyが必要。画面を書き換える際に、変わりやすい index ではなく、唯一の id を指定しないと適切に処理できない（削除とか）
          <li key={todo.id}>
            <span style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
              onClick={() => handleOpenModal(todo)}
            >
              {todo.title}
            </span>
            {/* divと同じで、グループ化するみたいなやつ。divより短く、一部を装飾する。ここではタイトルだけを青くしている */}
            {todo.description}
            {todo.deadline}
            {todo.priority}
            {todo.progress}
            <Button variant='outlined' onClick={() => { if (window.confirm("本当に削除してよろしいですか？")) deleteTodo(todo.id) }}>削除</Button>
          </li>
        ))}
      </ul>

      <EditModal
        open={showEditModal}
        onClose={handleCloseModal}
        todo={editingTodo}
        onSave={handleSaveEdit}
      />
    </div>
  );
}
export default App;
