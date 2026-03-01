import React, { useState } from 'react';

import { useTodos } from './hooks/useTodos';
import EditModal from './EditModal';
import { Button, Table, TableBody, TableRow, TableCell, TableContainer, Paper, TableHead, Box, Card, TextField, Select, Chip } from "@mui/material";
import { ProgressType, Todo } from './types/todo';
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

  const getProgressColor = (progress: ProgressType) => {
    switch (progress) {
      case "TODO":
        return "default"
      case "IN_PROGRESS":
        return "primary"
      case "ALMOST_DONE":
        return "info"
      case "DONE":
        return "success"
      case "STOPPING":
        return "warning"
    }
  }

  return (

    <div className='APP'>
      <h1>What's Next?</h1>
      <form onSubmit={handleAdd}>
        <Box sx={{ margin: '0 auto 32px auto', maxWidth: 588 }} component={Paper}>
          <Card sx={{ p: 2 }}>
            <TextField
              fullWidth
              value={inputTodo.title}
              onChange={(e) => setInputTodo({ ...inputTodo, title: e.target.value })}
              placeholder='タスクを入力して下さい'
              label="タスク名"
              variant='filled'
            />
            {/* <TextField
              fullWidth
              value={inputTodo.description}
              onChange={(e) => setInputTodo({ ...inputTodo, description: e.target.value })}
              placeholder='概要を入力してください'
            /> */}
            <TextField
              value={inputTodo.deadline}
              onChange={(e) => setInputTodo({ ...inputTodo, deadline: e.target.value })}
              type='datetime-local'
              // min={now}
              variant='filled'
              label='締切'
              sx={{ p: 1 }}
            />
            <TextField
              value={inputTodo.priority}
              onChange={(e) => setInputTodo({ ...inputTodo, priority: e.target.value as TodoInput["priority"] })}
              variant='filled'
              select
              slotProps={{
                select: {
                  native: true,
                },
              }}
              sx={{ p: 1 }}
            >
              {TODO_PRIORITIES.map((p) => (
                <option key={p.label} value={p.id}>
                  {p.label}
                </option>
              ))}
            </TextField>
            <Button type="submit" variant='contained'>登録</Button>
            {/* type="submit"のボタンが押されると、formタグに送信イベントを発火させる */}
          </Card>
        </Box>
      </form>

      <TableContainer sx={{ margin: '0 auto', maxWidth: 900 }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '30%' }}>タイトル</TableCell>
              <TableCell sx={{ width: '30%' }}>概要</TableCell>
              <TableCell sx={{ width: '10%' }}>締切</TableCell>
              <TableCell sx={{ width: '9%' }}>優先度</TableCell>
              <TableCell sx={{ width: '10%' }}>進捗状況</TableCell>
            </TableRow>
          </TableHead >
          <TableBody>
            {/* ↑<ul>の直下に<li>がないといけない。urは順序のないリスト */}
            {todos.map(todo => (
              // ↓mapの直下のタグではkeyが必要。画面を書き換える際に、変わりやすい index ではなく、唯一の id を指定しないと適切に処理できない（削除とか）
              <TableRow key={todo.id}>
                <TableCell>
                  <span style={{ cursor: 'pointer', color: 'blue' }}
                    onClick={() => handleOpenModal(todo)}
                  >
                    {todo.title}
                  </span>
                </TableCell>
                {/* divと同じで、グループ化するみたいなやつ。divより短く、一部を装飾する。ここではタイトルだけを青くしている */}
                <TableCell>{todo.description}</TableCell>
                <TableCell>{todo.deadline}</TableCell>
                <TableCell><Chip label={todo.priority} /></TableCell>
                <TableCell><Chip label={todo.progress} color={getProgressColor(todo.progress)} variant='outlined' /></TableCell>
                <Button variant='outlined' onClick={() => { if (window.confirm("本当に削除してよろしいですか？")) deleteTodo(todo.id) }}>削除</Button>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


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
