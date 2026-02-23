import React, { useEffect, useState } from "react";
import './EditModal.css';
import { Box, Button, Dialog, DialogContent, DialogTitle, Input, MenuItem, Select, TextField } from "@mui/material";
import { Todo, PriorityType, ProgressType } from "./types/todo";
import { TODO_PRIORITIES, TODO_PROGRESS } from "./constants/todoConstants";
import { INITIAL_TODO_INPUT, TodoInput } from './types/todo';

const EditModal = ({ open, onClose, todo, onSave }: {
    open: boolean; onClose: () => void; todo: Todo | null;
    onSave: (updateTodo: Todo) => void;
}) => {
    const [inputTodo, setInputTodo] = useState<TodoInput>(INITIAL_TODO_INPUT)
    useEffect(() => {
        if (todo) {
            setInputTodo(todo)
        };
    }, [todo]);

    const handleSave = () => {
        if (!todo) return;
        const updatedTodo: Todo = {
            ...todo,
            ...inputTodo
        };
        onSave(updatedTodo);
    };
    // 開かれてたら、以下を返す
    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>タスクの編集</DialogTitle>
            <DialogContent>
                <TextField
                    value={inputTodo.title}
                    onChange={(e) => setInputTodo({ ...inputTodo, title: e.target.value })}
                    // e.target.valueについて。eは、ユーザーがブラウザ上で何かの操作をした時に自動でその記録を作る
                    // e.targetは、どのHTML要素を操作したかを表すやつ。e.target.valueは、今その瞬間に入力欄に入っている文字
                    //e　→ 報告書全体（「変更イベントが起きたよ」）
                    // e.target         → どの要素で？
                    // e.target.value   → 今の値は？
                    label="課題名"
                    variant="standard"
                    fullWidth
                />
                <TextField
                    value={inputTodo.description}
                    onChange={(e) => setInputTodo({ ...inputTodo, description: e.target.value })}
                    label="概要"
                    variant="standard"
                    fullWidth
                />
                <TextField
                    value={inputTodo.deadline}
                    onChange={(e) => setInputTodo({ ...inputTodo, deadline: e.target.value })}
                    // label="期限"
                    type='datetime-local'
                    fullWidth
                />
                <Select<PriorityType>
                    value={inputTodo.priority}
                    onChange={(e) => setInputTodo({ ...inputTodo, priority: e.target.value })}
                    label="優先度"
                    fullWidth
                >
                    {TODO_PRIORITIES.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
                <Select<ProgressType>
                    value={inputTodo.progress}
                    onChange={(e) => setInputTodo({ ...inputTodo, progress: e.target.value })}
                    label="進捗"
                    fullWidth
                >
                    {TODO_PROGRESS.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
                <Box my={2} flexDirection="row" justifyContent="flex-end" display="flex">

                    <Button onClick={() => handleSave()}>保存</Button>
                </Box>
            </DialogContent>
        </Dialog >

    )
}
export default EditModal;