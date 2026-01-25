import React, { use, useEffect, useState } from "react";
import './EditModal.css';
import { Box, Button, Dialog, DialogContent, DialogTitle, Input, MenuItem, Select, TextField } from "@mui/material";
import { Todo, PriorityType, ProgressType } from "./types/todo";
import { TODO_PRIORITIES, TODO_PROGRESS } from "./constants/todoConstants";

const EditModal = ({ open, onClose, todo, onSave }: {
    open: boolean; onClose: () => void; todo: Todo | null;
    onSave: (updateTodo: Todo) => void;
}) => {
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState<string | undefined>("");
    const [editDeadline, setEditDeadline] = useState<string | undefined>("");
    const [editPriority, setEditPriority] = useState<PriorityType | "">("");
    const [editProgress, setEditProgress] = useState<ProgressType | "">("");

    useEffect(() => {
        if (todo) {
            setEditTitle(todo.title);
            setEditDescription(todo.description);
            setEditDeadline(todo.deadline ?? "");
            setEditPriority(todo.priority ?? "");
            setEditProgress(todo.progress);
        };
    }, [todo]);

    const handleSave = () => {
        if(!todo) return;
        const updatedTodo: Todo = {
            ...todo,
            title: editTitle,
            description: editDescription === "" ? undefined : editDescription,
            deadline: editDeadline === "" ? undefined : editDeadline,
            priority: editPriority === "" ? undefined: (editPriority as PriorityType),
            progress: editProgress === "" ? "TODO": (editProgress as ProgressType),
        };
        onSave(updatedTodo);
    };
    // 開かれてたら、以下を返す
    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>タスクの編集</DialogTitle>
            <DialogContent>
                <TextField
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    label="課題名"
                    variant="standard"
                    fullWidth
                />
                <TextField
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    label="概要"
                    variant="standard"
                    fullWidth
                />
                <TextField
                    value={editDeadline}
                    onChange={(e) => setEditDeadline(e.target.value)}
                    // label="期限"
                    type='datetime-local'
                    fullWidth
                />
                <Select
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value as PriorityType)}
                    label="優先度"
                    fullWidth
                >
                    {TODO_PRIORITIES.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
                <Select
                    value={editProgress}
                    onChange={(e) => setEditProgress(e.target.value as ProgressType)}
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