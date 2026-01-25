import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { useTodos } from './hooks/useTodos';
import EditModal from './EditModal';
import { Button, Modal } from "@mui/material";
import { Todo } from './types/todo';

function App() {
  // フックを呼び出すだけで、取得、ローディング、更新関数が全部手に入る
  const { todos, isLoading, createTodo, deleteTodo, updateTodo } = useTodos();

  const [showEditModal, setShowEditModal] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('');

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const PRIORITIES = ["A", "B", "C"];
  const now = new Date().toISOString().split('T')[0];

  if (isLoading)
    return <div>読み込み中... </div>;

  // 追加ボタンの処理
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createTodo({
      title: title,
      progress: "TODO", // 初期値　つまり、登録時はこの"TODO"決め打ちで選べない
      description: description,
      deadline: deadline === "" ? undefined : deadline,
      priority: priority === "" ? undefined : (priority as "A" | "B" | "C")
    });

    setTitle(''); // 入力欄をクリア
    setDescription('')
    setDeadline('')
    setPriority('')
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
      <Button variant="contained">
        塗りつぶされたボタン
      </Button>
      <h1>What's Next?</h1>
      <form onSubmit={handleAdd}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='タスクを入力して下さい'
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='概要を入力してください'
        />
        <input
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          type='datetime-local'
          min={now}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>

          </option>
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <button type="submit">登録</button>
      </form>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
              onClick={() => handleOpenModal(todo)}
            >
              {todo.title}
            </span>
            {todo.description}
            {todo.deadline}
            {todo.priority}
            {todo.progress}
            <button onClick={() => { if (window.confirm("本当に削除してよろしいですか？")) deleteTodo(todo.id) }}>削除</button>
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
