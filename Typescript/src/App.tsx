import React,{useState} from 'react';
import './App.css';
import { useTodos } from './hooks/useTodos';

function App() {
  // フックを呼び出すだけで、取得、ローディング、更新関数が全部手に入る
  const { todos, isLoading, createTodo, deleteTodo } = useTodos();

  const [title, setTitle] = useState('');

  if (isLoading) 
    return <div>読み込み中... </div>;
  
  // 追加ボタンの処理
  const handleAdd = (e: React.FormEvent) => {
e.preventDefault();
if(!title.trim()) return ;

createTodo({
  title: title,
  progress:"TODO", // 初期値
  description:"",
  deadline: "",
  priority: "B", // 初期値
});

    setTitle(''); // 入力欄をクリア
};

return (
  <div className='APP'>
    <h1>Todo App</h1>
    <form onSubmit={handleAdd}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='タスクを入力して下さい'
      />
      <button type="submit">登録</button>
      </form>

      <ul>
        {todos.map(todo =>(
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => deleteTodo(todo.id)}>削除</button>
          </li>
        ))}
      </ul>

  </div>
);
}

export default App;
