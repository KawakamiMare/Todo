import React,{useState} from 'react';
import './App.css';
import { useTodos } from './hooks/useTodos';

function App() {
  // フックを呼び出すだけで、取得、ローディング、更新関数が全部手に入る
  const { todos, isLoading, createTodo, deleteTodo } = useTodos();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('');
  
  const PRIORITIES = ["A", "B", "C"];
  const now  = new Date().toISOString().split('T')[0];

  if (isLoading) 
    return <div>読み込み中... </div>;
  
  // 追加ボタンの処理
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if(!title.trim()) return ;

  createTodo({
    title: title,
    progress:"TODO", // 初期値　つまり、登録時はこの"TODO"決め打ちで選べない
    description: description,
    deadline: deadline === "" ? undefined: deadline,
    priority: priority ==="" ? undefined : (priority as "A" | "B" | "C") 
  });

  setTitle(''); // 入力欄をクリア
  setDescription('') 
  setDeadline('')
  setPriority('') 
};

return (
  <div className='APP'>
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
            <option key ={p} value={p}>
              {p}
            </option>
          ))}
      </select>
      <button type="submit">登録</button>
      </form>

      <ul>
        {todos.map(todo =>(
          <li key={todo.id}>
            {todo.title}
            {todo.description}
            {todo.deadline}
            {todo.priority}
            {todo.progress}
            <button onClick={() => deleteTodo(todo.id)}>削除</button>
          </li>
        ))}
      </ul>

  </div>
);
}

export default App;
