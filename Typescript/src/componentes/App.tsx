import React, { useEffect, useRef, useState } from 'react';

import { useTodos } from '../hooks/useTodos';
import EditModal from './EditModal';
import { Button, Table, TableBody, TableRow, TableCell, TableContainer, Paper, TableHead, Chip } from "@mui/material";
import { Todo } from '../types/todo';
import { getPriorityColor, getProgressColor } from '../utils/todoUtils';
import { TodoForm } from './TodoForm';
import { TodoTable } from './TodoTable';
import './App.css';

function App() {
  // フックを呼び出すだけで、取得、ローディング、更新関数が全部手に入る
  const { todos, isLoading, createTodo, deleteTodo, updateTodo } = useTodos(); // オブジェクトの分割代入
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const now = new Date().toISOString().split('T')[0];

  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  let intervalRef = useRef<NodeJS.Timeout | null>(null);
  let interval: NodeJS.Timeout | undefined = undefined;


  useEffect(() => {
    if (isActive) {
      interval= setTimeout(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearTimeout(interval);
    }
    // return clearTimeout(interval);
  }, [isActive, time]);

  if (isLoading)
    return <div>読み込み中... </div>;

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



  const handleTimerToggle = () => {
    setIsActive((prev) => !prev);
  };

  const handleTimerReset = () => {
    setTime(0);
    setIsActive(false);
  };

  return (
    <div className='APP'>
      <h1>What's Next?</h1>
      <div>
        ポモドーロ: {time}
        <Button
          variant='outlined'
          onClick={handleTimerToggle}>{isActive ? 'ストップ' : 'スタート'}</Button>
        <Button variant='outlined' onClick={handleTimerReset}>リセット</Button>
      </div>
      <TodoForm createTodo={createTodo} />
      {/* 上これはpropsを渡してると思うけど、右辺と左辺どんな関係？ -> 左辺がTodoFormに渡すprops,右辺が渡す中身*/}
      <TodoTable todos={todos} deleteTodo={deleteTodo} onOpenModal={handleOpenModal} />


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
