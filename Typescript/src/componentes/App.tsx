import React, { useState } from 'react';

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
  const { todos, isLoading, createTodo, deleteTodo, updateTodo } = useTodos();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const now = new Date().toISOString().split('T')[0];

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

  return (
    <div className='APP'>
      <h1>What's Next?</h1>
      <TodoForm createTodo={createTodo} />
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
